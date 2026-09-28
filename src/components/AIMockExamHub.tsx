import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Flag,
  Award,
  BookOpen,
  ArrowRight,
  Send,
  Loader2,
  Sliders,
  Check,
  Zap,
  ExternalLink,
  PenTool,
  AlertCircle
} from 'lucide-react';

export interface MockQuestion {
  id: string;
  exam: 'SAT' | 'TOEFL';
  section: string;
  skillCategory: string;
  passage: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  testHacks: string;
  timeTargetSeconds: number;
}

export const AIMockExamHub: React.FC = () => {
  // Test generator configuration
  const [selectedExam, setSelectedExam] = useState<'SAT' | 'TOEFL'>('SAT');
  const [selectedSection, setSelectedSection] = useState<string>('Reading & Writing');
  const [difficulty, setDifficulty] = useState<'Medium' | 'Hard' | 'Adaptive'>('Medium');
  
  // Test runtime state
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(600); // 10 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [instantFeedbackMode, setInstantFeedbackMode] = useState<boolean>(true);
  
  // Generation & AI loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sourceType, setSourceType] = useState<string>('');

  // AI Writing Lab states
  const [activeSubTab, setActiveSubTab] = useState<'mcq' | 'writing' | 'resources'>('mcq');
  const [writingPrompt, setWritingPrompt] = useState<string>(
    'Your professor is teaching a class on public policy. Write a post responding to the professor\'s question:\n\n"Governments often have to choose between investing public revenue into public transportation (such as trains and subways) versus subsidizing electric vehicles (EVs) for individual citizens. Which approach do you believe is more beneficial for society and the environment, and why?"'
  );
  const [studentEssay, setStudentEssay] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  // Sync available section options when exam switches
  useEffect(() => {
    if (selectedExam === 'SAT') {
      setSelectedSection('Reading & Writing');
    } else {
      setSelectedSection('Reading');
    }
  }, [selectedExam]);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0 && isTestActive && !isTestSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTestActive && !isTestSubmitted) {
      handleSubmitTest();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, isTestActive, isTestSubmitted]);

  // Load / Generate mock questions via backend API
  const handleGenerateTest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-mock-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam: selectedExam,
          section: selectedSection,
          difficulty,
          questionCount: 4,
        }),
      });

      if (!response.ok) {
        throw new Error('Network error generating mock test');
      }

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setSourceType(data.source === 'gemini-ai' ? 'Gemini 3.8 AI' : 'Official Format Bank');
        setCurrentIndex(0);
        setUserAnswers({});
        setFlaggedQuestions({});
        setIsTestActive(true);
        setIsTestSubmitted(false);
        setTimerSeconds(selectedExam === 'SAT' ? 32 * 60 : 25 * 60); // standard module length
        setIsTimerRunning(true);
      }
    } catch (err) {
      console.error('Failed to generate mock test:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnswer = (optionId: string) => {
    if (isTestSubmitted) return;
    const currentQ = questions[currentIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleToggleFlag = () => {
    const currentQ = questions[currentIndex];
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleSubmitTest = () => {
    setIsTimerRunning(false);
    setIsTestSubmitted(true);
  };

  // Evaluate essay with AI
  const handleEvaluateEssay = async () => {
    if (!studentEssay.trim() || studentEssay.trim().split(/\s+/).length < 25) {
      return;
    }
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/evaluate-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essay: studentEssay,
          prompt: writingPrompt,
          taskType: 'toefl_discussion',
        }),
      });
      const data = await res.json();
      if (data.evaluation) {
        setEvaluationResult(data.evaluation);
      }
    } catch (err) {
      console.error('Error evaluating essay:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Calculate score summary
  const scoreSummary = React.useMemo(() => {
    if (questions.length === 0) return { correct: 0, total: 0, percentage: 0 };
    let correct = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  }, [questions, userAnswers]);

  // Format time string MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header and Sub-Navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold mb-1" style={{ color: 'var(--theme-accent)' }}>
              <Sparkles className="w-4 h-4" />
              <span>Free AI Exam Simulator & Practice Arena</span>
            </div>
            <h3 className="text-2xl font-bold font-serif-display tracking-tight">
              AI-Generated Mock Tests & Authentic Test Resources
            </h3>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Take realistic, timed digital mock tests with instant scoring and in-depth answer explanations, or submit your essays to the AI writing examiner.
            </p>
          </div>

          {/* Sub-tab selection */}
          <div className="flex items-center bg-stone-100 p-1.5 rounded-xl border border-stone-200">
            <button
              onClick={() => setActiveSubTab('mcq')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'mcq'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              Timed Mock Tests
            </button>
            <button
              onClick={() => setActiveSubTab('writing')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'writing'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              AI Writing Evaluator
            </button>
            <button
              onClick={() => setActiveSubTab('resources')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'resources'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              Official Resource Vault
            </button>
          </div>
        </div>

        {/* Sub-Tab 1: MCQ Mock Test Simulator */}
        {activeSubTab === 'mcq' && (
          <div className="pt-6 space-y-6">
            {/* Control Bar: Exam, Section, Difficulty, Generate */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  Target Exam
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedExam('SAT')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      selectedExam === 'SAT'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    Digital SAT
                  </button>
                  <button
                    onClick={() => setSelectedExam('TOEFL')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      selectedExam === 'TOEFL'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    TOEFL iBT
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  Exam Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full py-2 px-3 text-xs font-medium bg-white text-stone-800 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {selectedExam === 'SAT' ? (
                    <>
                      <option value="Reading & Writing">Reading & Writing (Craft & Structure)</option>
                      <option value="Standard English Conventions">Standard English Conventions (Grammar)</option>
                      <option value="Math">Math (Algebra & Advanced Math)</option>
                      <option value="Math - Problem Solving">Math (Problem Solving & Geometry)</option>
                    </>
                  ) : (
                    <>
                      <option value="Reading">Reading (Academic Texts & Vocabulary)</option>
                      <option value="Listening">Listening (Lectures & Dialogue Comprehension)</option>
                      <option value="Academic Discussion">Academic Discussion Synthesis</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  Question Difficulty
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Medium', 'Hard', 'Adaptive'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setDifficulty(lvl)}
                      className={`py-2 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                        difficulty === lvl
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateTest}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                      <span>Generating with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-stone-950" />
                      <span>{questions.length > 0 ? 'Regenerate Fresh Test' : 'Generate AI Mock Test'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Test Simulation Arena */}
            {isTestActive && questions.length > 0 ? (
              <div className="space-y-6">
                {/* Active Test Navigation & Status Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-stone-900 text-stone-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-stone-800 text-amber-300 border border-stone-700">
                      {selectedExam} · {selectedSection}
                    </span>
                    {sourceType && (
                      <span className="text-[11px] text-stone-400 hidden sm:inline">
                        Powered by {sourceType}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Countdown Timer */}
                    <div className="flex items-center gap-2 font-mono text-sm bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="tabular-nums font-bold">{formatTime(timerSeconds)}</span>
                      <button
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className="text-[10px] text-stone-400 hover:text-white uppercase font-sans ml-1 underline cursor-pointer"
                      >
                        {isTimerRunning ? 'Pause' : 'Resume'}
                      </button>
                    </div>

                    {/* Question Flag Button */}
                    <button
                      onClick={handleToggleFlag}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        flaggedQuestions[currentQ?.id]
                          ? 'bg-amber-400 text-stone-950'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {flaggedQuestions[currentQ?.id] ? 'Flagged' : 'Flag'}
                      </span>
                    </button>

                    {/* Submit Test Button */}
                    {!isTestSubmitted ? (
                      <button
                        onClick={handleSubmitTest}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Submit Test
                      </button>
                    ) : (
                      <button
                        onClick={handleGenerateTest}
                        className="px-3.5 py-1.5 bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Take Another Test
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Numbers Strip */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {questions.map((q, idx) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isFlagged = !!flaggedQuestions[q.id];
                    const isCurrent = idx === currentIndex;
                    const isCorrect = isTestSubmitted && userAnswers[q.id] === q.correctAnswer;
                    const isIncorrect = isTestSubmitted && userAnswers[q.id] && userAnswers[q.id] !== q.correctAnswer;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative w-9 h-9 shrink-0 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                          isCurrent
                            ? 'ring-2 ring-amber-500 bg-stone-900 text-white'
                            : isCorrect
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : isIncorrect
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : isAnswered
                            ? 'bg-stone-200 text-stone-900 font-semibold'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        <span>{idx + 1}</span>
                        {isFlagged && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Question Card Arena */}
                {currentQ && (
                  <div className="grid lg:grid-cols-12 gap-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
                    {/* Left Column: Stimulus Passage */}
                    <div className="lg:col-span-6 space-y-4 lg:border-r lg:border-stone-200 lg:pr-6">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="font-semibold text-amber-800 uppercase tracking-wider font-mono">
                          {currentQ.skillCategory}
                        </span>
                        <span>Target: ~{currentQ.timeTargetSeconds}s</span>
                      </div>

                      <div className="bg-stone-50/70 p-5 rounded-xl border border-stone-200 text-stone-800 text-sm sm:text-base leading-relaxed font-serif">
                        {currentQ.passage}
                      </div>

                      {/* Test Hacks Advice Card */}
                      {currentQ.testHacks && (
                        <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs text-stone-800 space-y-1">
                          <span className="font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-amber-600" />
                            <span>Official Exam Pacing & Strategy Hack</span>
                          </span>
                          <p className="leading-relaxed text-stone-700">{currentQ.testHacks}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Question Prompt & Options */}
                    <div className="lg:col-span-6 space-y-5 lg:pl-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-500 font-mono">
                          Question {currentIndex + 1} of {questions.length}
                        </span>
                        {userAnswers[currentQ.id] && !isTestSubmitted && (
                          <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                            <Check className="w-3.5 h-3.5" />
                            Answer Saved
                          </span>
                        )}
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                        {currentQ.question}
                      </h4>

                      {/* Options List */}
                      <div className="space-y-3">
                        {currentQ.options.map((opt) => {
                          const isSelected = userAnswers[currentQ.id] === opt.id;
                          const isCorrect = isTestSubmitted && opt.id === currentQ.correctAnswer;
                          const isWrongSelection = isTestSubmitted && isSelected && !isCorrect;

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectAnswer(opt.id)}
                              disabled={isTestSubmitted}
                              className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-3 cursor-pointer ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium ring-1 ring-emerald-500'
                                  : isWrongSelection
                                  ? 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400'
                                  : isSelected
                                  ? 'bg-stone-900 border-stone-900 text-white font-medium shadow-sm'
                                  : 'bg-white border-stone-200 text-stone-800 hover:border-stone-400'
                              }`}
                            >
                              <span className={`w-6 h-6 shrink-0 rounded-md font-bold text-xs flex items-center justify-center font-mono ${
                                isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isWrongSelection
                                  ? 'bg-rose-600 text-white'
                                  : isSelected
                                  ? 'bg-amber-400 text-stone-950'
                                  : 'bg-stone-100 text-stone-700'
                              }`}>
                                {opt.id}
                              </span>
                              <span className="text-sm leading-relaxed pt-0.5">{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Reveal (Immediate Feedback or Post-Submit) */}
                      {(isTestSubmitted || (instantFeedbackMode && userAnswers[currentQ.id])) && (
                        <div className={`p-5 rounded-xl border text-xs sm:text-sm space-y-2 mt-4 transition-all ${
                          userAnswers[currentQ.id] === currentQ.correctAnswer
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                            : 'bg-rose-50/60 border-rose-200 text-stone-900'
                        }`}>
                          <div className="flex items-center gap-2 font-bold text-sm">
                            {userAnswers[currentQ.id] === currentQ.correctAnswer ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span className="text-emerald-800">Correct Answer: Option {currentQ.correctAnswer}</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-rose-600" />
                                <span className="text-rose-800">Correct Answer is Option {currentQ.correctAnswer}</span>
                              </>
                            )}
                          </div>
                          <p className="text-stone-700 leading-relaxed text-xs">
                            {currentQ.explanation}
                          </p>
                        </div>
                      )}

                      {/* Prev / Next controls */}
                      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                        <button
                          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                          disabled={currentIndex === 0}
                          className="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-30 cursor-pointer"
                        >
                          Previous Question
                        </button>
                        <button
                          onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                          disabled={currentIndex === questions.length - 1}
                          className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-30 cursor-pointer"
                        >
                          Next Question
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Score Summary Banner if test is submitted */}
                {isTestSubmitted && (
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                      <div>
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                          Test Complete
                        </span>
                        <h4 className="text-2xl font-bold text-stone-900 font-serif-display mt-0.5">
                          Performance Diagnostic
                        </h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs text-stone-500 block">Accuracy Score</span>
                          <span className="text-3xl font-extrabold font-mono text-stone-900">
                            {scoreSummary.correct} / {scoreSummary.total} ({scoreSummary.percentage}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 pt-6">
                      <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-center">
                        <span className="text-xs text-stone-500 block">Estimated Section Band</span>
                        <span className="text-xl font-bold font-mono text-stone-900 mt-1 block">
                          {selectedExam === 'SAT'
                            ? `${Math.round(400 + (scoreSummary.percentage / 100) * 400)} / 800`
                            : `${Math.round((scoreSummary.percentage / 100) * 30)} / 30`}
                        </span>
                      </div>
                      <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-center">
                        <span className="text-xs text-stone-500 block">Readiness Tier</span>
                        <span className="text-xl font-bold text-amber-700 mt-1 block">
                          {scoreSummary.percentage >= 75 ? 'Competitive Tier 1' : 'Core Foundation'}
                        </span>
                      </div>
                      <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-center">
                        <span className="text-xs text-stone-500 block">Next Recommended Step</span>
                        <span className="text-xs font-semibold text-stone-800 mt-2 block">
                          Review flagged questions and practice the official Desmos shortcuts.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Idle state when test has not been started */
              <div className="bg-stone-50 rounded-2xl border border-dashed border-stone-300 p-8 sm:p-12 text-center space-y-4">
                <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <Play className="w-6 h-6 text-amber-700 ml-1" />
                </div>
                <h4 className="text-xl font-bold text-stone-900 font-serif-display">
                  Ready to test your knowledge with AI?
                </h4>
                <p className="text-stone-600 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
                  Click <strong>"Generate AI Mock Test"</strong> above to instantly build an exam-authentic practice module with real-time countdown timing, instant explanations, and official scoring rubrics.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleGenerateTest}
                    disabled={isLoading}
                    className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Start Quick 4-Question Diagnostic
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sub-Tab 2: AI Writing Evaluator */}
        {activeSubTab === 'writing' && (
          <div className="pt-6 space-y-6">
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-amber-700" />
                  <span>TOEFL Academic Discussion Writing Prompt (10 Minutes)</span>
                </span>
                <span className="text-xs text-stone-500">Benchmark: 100–140 words</span>
              </div>
              <p className="text-sm font-serif text-stone-900 leading-relaxed bg-white p-4 rounded-lg border border-stone-200">
                {writingPrompt}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span>Compose your response below:</span>
                <span className="font-mono font-bold text-stone-900">
                  {studentEssay.trim() ? studentEssay.trim().split(/\s+/).length : 0} words
                </span>
              </div>
              <textarea
                rows={8}
                value={studentEssay}
                onChange={(e) => setStudentEssay(e.target.value)}
                placeholder="In my perspective, prioritizing public transportation infrastructure yields vastly superior societal benefits because..."
                className="w-full p-4 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed font-sans"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Powered by Gemini 3.8 Flash official scoring rubric
                </span>
                <button
                  onClick={handleEvaluateEssay}
                  disabled={isEvaluating || studentEssay.trim().split(/\s+/).length < 20}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 disabled:opacity-40 cursor-pointer"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Grading Response...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Grade with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Evaluation Diagnostic Card */}
            {evaluationResult && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      Official ETS Rubric Evaluation
                    </span>
                    <h4 className="text-2xl font-bold text-stone-900 font-serif-display mt-0.5">
                      Writing Diagnostic Report
                    </h4>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold font-mono text-stone-900">
                      {evaluationResult.estimatedScore}
                    </span>
                    <span className="text-stone-500 font-bold">/ 30</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 ml-2">
                      {evaluationResult.cefrLevel}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                    <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Demonstrated Strengths</span>
                    </h5>
                    <ul className="text-xs text-stone-700 space-y-1.5">
                      {evaluationResult.strengths?.map((s: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas for Improvement */}
                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
                    <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      <span>Recommended Refinements</span>
                    </h5>
                    <ul className="text-xs text-stone-700 space-y-1.5">
                      {evaluationResult.areasForImprovement?.map((a: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-700 font-bold">•</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Detailed Feedback & Exemplar Rewrite */}
                <div className="space-y-4 pt-2">
                  <div className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <strong className="block text-xs font-bold text-stone-900 uppercase mb-1">
                      Examiner Analysis:
                    </strong>
                    {evaluationResult.detailedFeedback}
                  </div>

                  {evaluationResult.revisedSampleSnippet && (
                    <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 text-xs text-purple-950 space-y-1">
                      <strong className="block text-[11px] font-bold text-purple-900 uppercase">
                        High-Scoring Stylistic Rewrite Sample:
                      </strong>
                      <p className="italic font-serif leading-relaxed text-sm">
                        "{evaluationResult.revisedSampleSnippet}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sub-Tab 3: Official Resource Vault */}
        {activeSubTab === 'resources' && (
          <div className="pt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* SAT Official Resources */}
              <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h4 className="text-lg font-bold text-stone-900 font-serif-display">
                    Digital SAT Official Portals
                  </h4>
                  <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono">
                    College Board
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      title: 'College Board Bluebook App',
                      desc: 'Official testing app containing 6 full-length adaptive practice tests with real-time scoring.',
                      link: 'https://bluebook.collegeboard.org/',
                    },
                    {
                      title: 'Khan Academy Official Digital SAT',
                      desc: 'Free 100% official curriculum partnered directly with College Board with thousands of practice items.',
                      link: 'https://www.khanacademy.org/digital-sat',
                    },
                    {
                      title: 'College Board Educator Question Bank',
                      desc: 'Filterable archive of thousands of genuine active Digital SAT questions categorized by domain.',
                      link: 'https://satsuite.collegeboard.org/k-12-educators/question-bank',
                    },
                    {
                      title: 'Official Desmos Calculator Practice',
                      desc: 'Interactive simulator of the exact built-in graphing calculator used during test day.',
                      link: 'https://www.desmos.com/testing',
                    },
                  ].map((res, i) => (
                    <a
                      key={i}
                      href={res.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-stone-50 hover:bg-amber-50/50 rounded-xl border border-stone-200 hover:border-amber-300 transition-colors block group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 group-hover:text-amber-800">
                          {res.title}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700" />
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                        {res.desc}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {/* TOEFL Official Resources */}
              <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h4 className="text-lg font-bold text-stone-900 font-serif-display">
                    TOEFL iBT Official Portals
                  </h4>
                  <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono">
                    ETS Official
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      title: 'ETS TOEFL TestReady Portal',
                      desc: 'Personalized prep platform with daily free activity questions, mock tests, and SpeechRater feedback.',
                      link: 'https://www.ets.org/toefl/test-takers/ibt/prepare/testready.html',
                    },
                    {
                      title: 'Free Full-Length TOEFL iBT Practice Test',
                      desc: 'Official 1h 56m simulated test with authentic past questions and performance review.',
                      link: 'https://www.ets.org/toefl/test-takers/ibt/prepare/tests.html',
                    },
                    {
                      title: 'TOEFL Official Speaking Audio & Rubrics',
                      desc: 'Hear high-scoring 26–30 responses with commentary directly from senior ETS raters.',
                      link: 'https://www.ets.org/toefl/test-takers/ibt/about/scoring.html',
                    },
                    {
                      title: 'ETS TOEFL Official Guide & eBooks',
                      desc: 'Official comprehensive study guides and authentic past test volumes.',
                      link: 'https://www.ets.org/toefl',
                    },
                  ].map((res, i) => (
                    <a
                      key={i}
                      href={res.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-stone-50 hover:bg-amber-50/50 rounded-xl border border-stone-200 hover:border-amber-300 transition-colors block group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 group-hover:text-amber-800">
                          {res.title}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700" />
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                        {res.desc}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
