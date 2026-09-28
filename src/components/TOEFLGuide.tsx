import React, { useState } from 'react';
import {
  TOEFL_OVERVIEW,
  TOEFL_SECTIONS,
  TOEFL_SCORE_BENCHMARKS,
  TOEFL_QUIZ_QUESTIONS,
  TOEFL_WRITING_TEMPLATE
} from '../data/toeflData';
import {
  Clock,
  Mic,
  Headphones,
  FileText,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Award,
  Sparkles,
  HelpCircle,
  Home,
  Building2
} from 'lucide-react';

export const TOEFLGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sections' | 'writing-template' | 'quiz' | 'centers'>('overview');
  const [activeSectionId, setActiveSectionId] = useState<string>('reading');
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const currentQ = TOEFL_QUIZ_QUESTIONS[quizIdx];

  const handleSelectQuiz = (qId: number, optIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const selectedSection = TOEFL_SECTIONS.find(s => s.id === activeSectionId) || TOEFL_SECTIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header and Sub-navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Official ETS Standards</span>
          <span aria-hidden="true">·</span>
          <span>1 Hour 56 Min Modern Streamlined Format</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          TOEFL iBT: Exam Architecture, Section Strategies & Templates
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Accepted by 100% of US universities and 12,500+ institutions worldwide. Learn the modern test format, scoring rubrics, high-scoring speaking formulas, and Academic Discussion writing templates.
        </p>

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200/60 pt-4">
          {[
            { id: 'overview', label: '1. Exam Overview & Benchmarks' },
            { id: 'sections', label: '2. 4 Sections Breakdown' },
            { id: 'writing-template', label: '3. Academic Discussion Template' },
            { id: 'quiz', label: '4. Interactive TOEFL Practice' },
            { id: 'centers', label: '5. Test Center vs Home Edition' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Overview & Benchmarks */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Duration</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-1 tabular-nums">
                ~1h 56m
              </div>
              <p className="text-xs text-stone-500 mt-1">Shortened by 1 hour in July 2023 update.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Scoring Scale</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-1 tabular-nums">
                0 – 120 Total
              </div>
              <p className="text-xs text-stone-500 mt-1">4 equal sections of 30 points each.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Validity</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-1 tabular-nums">
                2 Years
              </div>
              <p className="text-xs text-stone-500 mt-1">Valid from the date of the test administration.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">MyBest® Scores</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-1">
                Superscore Ready
              </div>
              <p className="text-xs text-stone-500 mt-1">ETS automatically combines your best section scores.</p>
            </div>
          </div>

          {/* Streamlined Format Callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Modernized July 2023 Test Enhancements</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-3 text-xs text-stone-800">
              <div className="p-3 bg-white rounded border border-amber-200/80">
                <strong>No Unscored Experimental Tasks:</strong> All questions in Reading and Listening count toward your score.
              </div>
              <div className="p-3 bg-white rounded border border-amber-200/80">
                <strong>Writing for Academic Discussion:</strong> Replaced the 30-minute independent essay with a modern 10-minute classroom post.
              </div>
              <div className="p-3 bg-white rounded border border-amber-200/80">
                <strong>Same-Day Unofficial Scores:</strong> View your unofficial Reading and Listening scaled scores immediately on screen upon submitting.
              </div>
            </div>
          </div>

          {/* University Score Tiers */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-stone-900 mb-2 font-serif-display">
              International University TOEFL Cutoffs & Standards
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Universities set both overall minimums and sectional subscore requirements (especially in Speaking and Writing for teaching assistantships).
            </p>

            <div className="space-y-3">
              {TOEFL_SCORE_BENCHMARKS.map((bench, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors bg-stone-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-stone-900 text-sm">{bench.tier}</span>
                    <span className="font-mono font-bold text-amber-800 text-sm tabular-nums">
                      Minimum: {bench.minScore}
                    </span>
                  </div>
                  <div className="text-xs text-stone-600 mt-1">
                    <span className="font-medium text-stone-800">Subscores:</span> {bench.subscoreMinimums}
                  </div>
                  <div className="text-xs text-stone-500 mt-1 italic">
                    Examples: {bench.examples}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 4 Sections Breakdown */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          {/* Section selector buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'reading', label: 'Reading (35m)', icon: BookOpen },
              { id: 'listening', label: 'Listening (36m)', icon: Headphones },
              { id: 'speaking', label: 'Speaking (16m)', icon: Mic },
              { id: 'writing', label: 'Writing (29m)', icon: FileText },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSectionId(item.id)}
                  className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-colors text-xs sm:text-sm font-semibold ${
                    activeSectionId === item.id
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Section Detail Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <h3 className="text-2xl font-bold text-stone-900 font-serif-display">
                {selectedSection.name}
              </h3>
              <div className="flex flex-wrap gap-3 text-xs text-stone-500 mt-1 font-mono">
                <span>Time Limit: {selectedSection.timeLimit}</span>
                <span>·</span>
                <span>Questions: {selectedSection.questionCount}</span>
                <span>·</span>
                <span>Scaled: 0 – 30 points</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {selectedSection.formatDescription}
            </p>

            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                  Tasks & Content Structure
                </h4>
                <ul className="space-y-2.5">
                  {selectedSection.tasksBreakdown.map((task, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-stone-600 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                  Examiner Scoring Advice & Tactics
                </h4>
                <ul className="space-y-2.5">
                  {selectedSection.provenStrategies.map((strat, idx) => (
                    <li key={idx} className="text-xs text-stone-700 leading-relaxed flex items-start gap-2">
                      <span className="font-mono text-amber-600 font-bold shrink-0">{idx + 1}.</span>
                      <span>{strat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Writing for Academic Discussion Template */}
      {activeTab === 'writing-template' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs font-mono text-amber-700 font-bold uppercase">10-Minute Writing Task</span>
            <h3 className="text-2xl font-bold text-stone-900 mt-1 font-serif-display">
              {TOEFL_WRITING_TEMPLATE.task}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Evaluated on intellectual contribution, cohesion, syntactic range, and lexical choice (Target: 120–150 words).
            </p>
          </div>

          <div className="p-4 bg-stone-100 rounded-lg border border-stone-200">
            <span className="text-xs font-bold text-stone-600 uppercase">Sample Professor Prompt</span>
            <p className="text-xs sm:text-sm text-stone-900 mt-1 font-medium italic">
              {TOEFL_WRITING_TEMPLATE.samplePrompt}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5 mb-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Band 5.0 (Top Score) Model Response:</span>
            </span>
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line font-serif">
              {TOEFL_WRITING_TEMPLATE.sampleHighScoringResponse}
            </div>
          </div>

          <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
              Why This Response Scores Perfect 5.0:
            </h4>
            <ul className="space-y-1.5">
              {TOEFL_WRITING_TEMPLATE.breakdown.map((item, idx) => (
                <li key={idx} className="text-xs text-stone-600 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 4: Interactive Diagnostic Quiz */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase">
                TOEFL Practice Question {quizIdx + 1} of {TOEFL_QUIZ_QUESTIONS.length}
              </span>
              <h3 className="text-xl font-bold text-stone-900 font-serif-display">
                {currentQ.section} Section · {currentQ.type}
              </h3>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {currentQ.passage && (
              <div className="p-4 bg-stone-50 border-l-4 border-amber-600 rounded-r text-stone-800 text-sm leading-relaxed font-serif">
                {currentQ.passage}
              </div>
            )}

            <div className="text-stone-900 font-medium text-sm sm:text-base">
              {currentQ.question}
            </div>

            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const answered = selectedAnswers[currentQ.id] !== undefined;

                let style = 'border-stone-200 hover:border-stone-400 bg-white text-stone-800';
                if (answered) {
                  if (isCorrect) {
                    style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                  } else if (isSelected) {
                    style = 'border-rose-500 bg-rose-50 text-rose-950';
                  } else {
                    style = 'border-stone-200 opacity-60 bg-stone-50 text-stone-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuiz(currentQ.id, idx)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm flex items-start gap-3 transition-colors ${style}`}
                  >
                    <span className="font-mono font-semibold shrink-0 uppercase text-xs mt-0.5">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="flex-1">{opt}</span>
                    {answered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {answered && isSelected && !isCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedAnswers[currentQ.id] !== undefined && (
              <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2 text-xs sm:text-sm">
                <div className="font-bold text-stone-800 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>ETS Answer Explanation:</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{currentQ.explanation}</p>
                <div className="text-amber-800 bg-amber-50 p-2 rounded text-xs border border-amber-200">
                  <strong>Examiner Advice:</strong> {currentQ.expertAdvice}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-stone-200 flex justify-between">
            <button
              onClick={() => setQuizIdx(p => Math.max(0, p - 1))}
              disabled={quizIdx === 0}
              className="px-3.5 py-1.5 text-xs border border-stone-300 rounded font-medium disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setQuizIdx(p => Math.min(TOEFL_QUIZ_QUESTIONS.length - 1, p + 1))}
              disabled={quizIdx === TOEFL_QUIZ_QUESTIONS.length - 1}
              className="px-3.5 py-1.5 text-xs bg-stone-900 text-white rounded font-medium disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Tab 5: Test Center vs Home Edition */}
      {activeTab === 'centers' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold">
              <Building2 className="w-5 h-5 text-amber-700" />
              <h3 className="text-lg font-serif-display">Official Test Center Administration</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Taken at an ETS-authorized testing lab with verified computer equipment, noise-canceling headsets, and on-site proctors.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-stone-50 rounded border border-stone-100">
                <strong>Pros:</strong> Zero risk of home internet failure or room environment disqualification; standardized hardware provided.
              </div>
              <div className="p-2.5 bg-stone-50 rounded border border-stone-100">
                <strong>Cons:</strong> Must travel to center; testing room can have background speaking noise when other students begin Speaking section.
              </div>
              <div className="p-2.5 bg-stone-50 rounded border border-stone-100">
                <strong>Required:</strong> Valid unexpired government Passport, confirmation printout, early arrival 30 mins prior.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold">
              <Home className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-serif-display">TOEFL iBT Home Edition</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Identical content and scoring, proctored live online 24/7 by ProctorU / Guardian Browser.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-stone-50 rounded border border-stone-100">
                <strong>Equipment:</strong> Desktop or laptop with Windows or Mac. Headsets are strictly FORBIDDEN—must use external speakers & microphone.
              </div>
              <div className="p-2.5 bg-stone-50 rounded border border-stone-100">
                <strong>Room Policy:</strong> Must be alone in a private room; desk cleared of all papers. 360-degree webcam scan before starting.
              </div>
              <div className="p-2.5 bg-stone-50 rounded border border-stone-100">
                <strong>Note-Taking:</strong> Regular paper is forbidden; you must use a small whiteboard with erasable marker or a plastic sheet protector.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
