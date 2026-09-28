import React, { useState } from 'react';
import {
  SAT_OVERVIEW,
  SAT_SECTIONS,
  SAT_ADAPTIVE_EXPLAINED,
  SAT_TEST_DATES_2025_2026,
  UNIVERSITY_BENCHMARKS,
  SAT_QUIZ_QUESTIONS,
  SAT_STUDY_PLANS
} from '../data/satData';
import {
  Calculator,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calendar,
  Layers,
  Search,
  Sparkles,
  Flame,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const SATGuide: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'sections' | 'quiz' | 'benchmarks' | 'plans'>('overview');
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [benchmarkSearch, setBenchmarkSearch] = useState('');
  const [targetGpa, setTargetGpa] = useState('3.8');
  const [targetTier, setTargetTier] = useState('top20');

  const currentQ = SAT_QUIZ_QUESTIONS[quizQuestionIndex];

  const handleSelectAnswer = (questionId: number, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [questionId]: true }));
  };

  const filteredBenchmarks = UNIVERSITY_BENCHMARKS.filter(u =>
    u.university.toLowerCase().includes(benchmarkSearch.toLowerCase()) ||
    u.country.toLowerCase().includes(benchmarkSearch.toLowerCase())
  );

  // Score recommendation logic
  const getTargetScoreAdvice = () => {
    const gpa = parseFloat(targetGpa) || 3.5;
    if (targetTier === 'ivy') {
      return {
        target: '1530 – 1580',
        mathTarget: '780 – 800',
        rwTarget: '750 – 780',
        advice: gpa < 3.8
          ? 'With a GPA below 3.8, a 1550+ SAT is critical to validate academic rigor against holistic competition.'
          : 'Competitive for Harvard, MIT, Stanford, Yale, and Princeton. Focus on maximizing Module 1 accuracy.'
      };
    } else if (targetTier === 'top20') {
      return {
        target: '1480 – 1540',
        mathTarget: '750 – 790',
        rwTarget: '720 – 760',
        advice: 'Puts you in the 50th-75th percentile for NYU, Michigan, Carnegie Mellon, and Georgia Tech.'
      };
    } else if (targetTier === 'top50') {
      return {
        target: '1360 – 1460',
        mathTarget: '690 – 740',
        rwTarget: '670 – 720',
        advice: 'Very solid range for major state flagships like Purdue, Penn State, Ohio State, and UMass Amherst.'
      };
    } else {
      return {
        target: '1220 – 1350',
        mathTarget: '620 – 680',
        rwTarget: '600 – 670',
        advice: 'Exceeds general admissions thresholds for hundreds of accredited international and US state universities.'
      };
    }
  };

  const scoreAdvice = getTargetScoreAdvice();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header and Sub-navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <BookOpen className="w-3.5 h-3.5" />
          <span>Official Digital SAT Testing Suite</span>
          <span aria-hidden="true">·</span>
          <span>College Board Bluebook Standards</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          Digital SAT: Structure, Adaptive Engine & Mastery Strategy
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          The SAT is a 2-hour-14-minute digital multistage adaptive test delivered on laptop or tablet. Master the question archetypes, adaptive routing thresholds, and built-in Desmos graphing strategies.
        </p>

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200/60 pt-4">
          {[
            { id: 'overview', label: '1. Test Overview & Adaptive Engine' },
            { id: 'sections', label: '2. Section Breakdown & Desmos' },
            { id: 'quiz', label: '3. Interactive Diagnostic Quiz' },
            { id: 'benchmarks', label: '4. University Score Benchmarks' },
            { id: 'plans', label: '5. 3-Mo & 6-Mo Study Roadmaps' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Overview & Adaptive Engine */}
      {activeSubTab === 'overview' && (
        <div className="space-y-10">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Total Duration</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-1 tabular-nums">
                {SAT_OVERVIEW.totalTime}
              </div>
              <p className="text-xs text-stone-500 mt-1">Shortened by 45+ minutes compared to old paper test.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Score Range</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-1 tabular-nums">
                {SAT_OVERVIEW.scoreRange}
              </div>
              <p className="text-xs text-stone-500 mt-1">Equally split: 800 RW + 800 Math.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Question Total</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-1 tabular-nums">
                {SAT_OVERVIEW.totalQuestions} Questions
              </div>
              <p className="text-xs text-stone-500 mt-1">54 Reading/Writing + 44 Math questions.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Calculator Policy</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-1">
                Desmos Built-In
              </div>
              <p className="text-xs text-stone-500 mt-1">Allowed throughout the entire math section.</p>
            </div>
          </div>

          {/* Adaptive Engine Architecture Card */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-8 relative overflow-hidden border border-stone-800">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-2">
              <Layers className="w-4 h-4" />
              <span>THE DIGITAL ADAPTIVE MECHANIC</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-serif-display">
              {SAT_ADAPTIVE_EXPLAINED.title}
            </h3>
            <p className="text-stone-300 text-sm mt-2 max-w-2xl">
              Unlike the GMAT or GRE which adapt question-by-question, the Digital SAT is <strong>multistage adaptive</strong>. Your accuracy in Module 1 determines whether you get the Upper or Lower Module 2.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mt-6">
              {SAT_ADAPTIVE_EXPLAINED.stages.map((stage, idx) => (
                <div key={idx} className="bg-stone-800/80 p-4 rounded-lg border border-stone-700/80">
                  <div className="text-xs font-mono text-amber-400">Step {idx + 1}</div>
                  <div className="text-sm font-semibold text-white mt-1">{stage.step}</div>
                  <div className="text-xs text-stone-300 mt-2 leading-relaxed">{stage.detail}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3.5 bg-amber-950/40 border border-amber-800/60 rounded-md text-xs text-amber-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Critical Scoring Invariant:</strong> If you are routed to Lower Module 2 in either section, your score in that section is mathematically capped around ~590–610, even with 100% accuracy on Module 2. Therefore, Module 1 demands your highest precision.
              </div>
            </div>
          </div>

          {/* Test Dates & Registration Table */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-stone-700" />
                  <span>Digital SAT Testing Calendar (2025 – 2026)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Registration closes approximately 2 to 3 weeks prior to each Saturday administration.
                </p>
              </div>
              <div className="text-xs text-stone-500 font-mono hidden sm:block">
                Fee: {SAT_OVERVIEW.feesInternational} Int.
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-stone-700">
                    <th className="py-2.5 px-3 font-semibold">Test Date</th>
                    <th className="py-2.5 px-3 font-semibold">Registration Deadline</th>
                    <th className="py-2.5 px-3 font-semibold">Late Registration</th>
                    <th className="py-2.5 px-3 font-semibold">Expected Score Release</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {SAT_TEST_DATES_2025_2026.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-stone-900">{item.testDate}</td>
                      <td className="py-2.5 px-3 text-stone-600">{item.registrationDeadline}</td>
                      <td className="py-2.5 px-3 text-stone-500">{item.lateDeadline}</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-medium">{item.scoresReleased}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Target Score Estimator Tool */}
          <div className="bg-stone-100 rounded-xl p-6 border border-stone-200">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Interactive SAT Target Score Calculator</span>
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Select your high school GPA and your university selectivity ambition to view the target score band needed.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  High School GPA (Unweighted 4.0 Scale)
                </label>
                <select
                  value={targetGpa}
                  onChange={(e) => setTargetGpa(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-stone-300 rounded-md p-2 bg-white text-stone-900"
                >
                  <option value="4.0">3.90 – 4.00 (Near Perfect / Top 5%)</option>
                  <option value="3.8">3.70 – 3.89 (Strong Honors / APs)</option>
                  <option value="3.5">3.40 – 3.69 (Above Average)</option>
                  <option value="3.2">3.00 – 3.39 (Average)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  University Target Ambition
                </label>
                <select
                  value={targetTier}
                  onChange={(e) => setTargetTier(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-stone-300 rounded-md p-2 bg-white text-stone-900"
                >
                  <option value="ivy">Tier 1: Ivy League & MIT / Stanford / CMU (&lt;7% admit rate)</option>
                  <option value="top20">Tier 2: Top 25 National (NYU, Michigan, Georgia Tech, USC)</option>
                  <option value="top50">Tier 3: Top 50–70 (Purdue, Wisconsin, Penn State, Ohio State)</option>
                  <option value="general">Tier 4: General International Admissions (Top 100–200)</option>
                </select>
              </div>
            </div>

            <div className="mt-5 p-4 bg-white rounded-lg border border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-stone-500 font-medium">Recommended Composite Target Score:</div>
                <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
                  {scoreAdvice.target}
                </div>
                <div className="text-xs text-stone-600 mt-1 flex items-center gap-3">
                  <span>Math: <strong>{scoreAdvice.mathTarget}</strong></span>
                  <span>·</span>
                  <span>Reading & Writing: <strong>{scoreAdvice.rwTarget}</strong></span>
                </div>
              </div>
              <div className="text-xs text-stone-600 max-w-md border-t sm:border-t-0 sm:border-l border-stone-200 pt-2 sm:pt-0 sm:pl-4">
                {scoreAdvice.advice}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sections Breakdown & Desmos */}
      {activeSubTab === 'sections' && (
        <div className="space-y-8">
          {SAT_SECTIONS.map((sec) => (
            <div key={sec.id} className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 font-serif-display">{sec.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                    <span>{sec.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{sec.questionCount} Questions</span>
                    <span aria-hidden="true">·</span>
                    <span>{sec.modules}</span>
                  </div>
                </div>
                <div className="text-xs font-mono bg-stone-100 px-3 py-1.5 rounded text-stone-700">
                  {sec.id === 'rw' ? '25–150 word passages' : 'Free response + Multiple choice'}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 mt-4 leading-relaxed">
                {sec.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                    Domains & Skills Tested
                  </h4>
                  <ul className="space-y-2">
                    {sec.skillsTested.map((skill, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-stone-600 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-600" />
                    <span>High-Yield Examination Tips</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {sec.keyTips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-stone-700 leading-relaxed flex items-start gap-2">
                        <span className="font-mono text-amber-600 font-bold shrink-0">{idx + 1}.</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Desmos Power Cheat Sheet */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-8 border border-stone-800">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-2">
              <Calculator className="w-4 h-4" />
              <span>THE BUILT-IN GRAPHING CALCULATOR (DESMOS)</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-serif-display">
              Unlocking the SAT Math Secret Weapon
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
              On the Digital SAT, the full Desmos graphing calculator is embedded into the test interface for all 44 math questions. Students who master Desmos shortcuts can solve up to 40% of questions in under 30 seconds without algebra.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-stone-800 p-4 rounded-lg border border-stone-700">
                <div className="text-xs font-semibold text-amber-300">1. Systems of Equations</div>
                <div className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Type both equations directly into Line 1 and Line 2. Desmos will plot them; simply tap or hover over the gray intersection dot to read the (x, y) coordinates instantly.
                </div>
              </div>
              <div className="bg-stone-800 p-4 rounded-lg border border-stone-700">
                <div className="text-xs font-semibold text-amber-300">2. Real Roots / Zeros</div>
                <div className="text-xs text-stone-300 mt-2 leading-relaxed">
                  For complex polynomials or quadratics with fractions, graph y = f(x). The x-intercepts immediately yield the real solutions without factoring or quadratic formulas.
                </div>
              </div>
              <div className="bg-stone-800 p-4 rounded-lg border border-stone-700">
                <div className="text-xs font-semibold text-amber-300">3. Sliders for Constants</div>
                <div className="text-xs text-stone-300 mt-2 leading-relaxed">
                  When a question asks "For what value of c does the line have one solution?", graph the equation with "c" and click "add slider: c". Move the slider to see which value satisfies the condition.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Diagnostic Quiz */}
      {activeSubTab === 'quiz' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
            <div>
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                Question {quizQuestionIndex + 1} of {SAT_QUIZ_QUESTIONS.length}
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-serif-display">
                {currentQ.section} · {currentQ.domain}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-0.5 rounded font-medium ${
                currentQ.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                currentQ.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                {currentQ.difficulty} Difficulty
              </span>
            </div>
          </div>

          {/* Question Passage & Content */}
          <div className="mt-6 space-y-4">
            {currentQ.passage && (
              <div className="p-4 bg-stone-50 border-l-4 border-stone-400 rounded-r text-stone-800 text-sm leading-relaxed font-serif">
                {currentQ.passage}
              </div>
            )}

            <div className="text-stone-900 font-medium text-sm sm:text-base">
              {currentQ.question}
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const answered = selectedAnswers[currentQ.id] !== undefined;

                let btnStyle = 'border-stone-200 hover:border-stone-400 bg-white text-stone-800';
                if (answered) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                  } else {
                    btnStyle = 'border-stone-200 opacity-60 bg-stone-50 text-stone-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(currentQ.id, idx)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm flex items-start gap-3 transition-colors ${btnStyle}`}
                  >
                    <span className="font-mono font-semibold shrink-0 uppercase text-xs mt-0.5">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="flex-1">{option}</span>
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

            {/* Detailed Explanation Drawer */}
            {showExplanation[currentQ.id] && (
              <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Comprehensive Official Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded border border-amber-200 flex items-start gap-2">
                  <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Pro Test Strategy:</strong> {currentQ.examTip}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Question Pager */}
          <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
            <button
              onClick={() => setQuizQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={quizQuestionIndex === 0}
              className="px-3.5 py-1.5 text-xs border border-stone-300 rounded font-medium disabled:opacity-40 hover:bg-stone-50"
            >
              Previous Question
            </button>
            <div className="flex gap-1.5">
              {SAT_QUIZ_QUESTIONS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuizQuestionIndex(idx)}
                  className={`w-7 h-7 text-xs font-mono rounded flex items-center justify-center transition-colors ${
                    quizQuestionIndex === idx
                      ? 'bg-stone-900 text-white font-bold'
                      : selectedAnswers[SAT_QUIZ_QUESTIONS[idx].id] !== undefined
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setQuizQuestionIndex(prev => Math.min(SAT_QUIZ_QUESTIONS.length - 1, prev + 1))}
              disabled={quizQuestionIndex === SAT_QUIZ_QUESTIONS.length - 1}
              className="px-3.5 py-1.5 text-xs bg-stone-900 text-white rounded font-medium disabled:opacity-40 hover:bg-stone-800"
            >
              Next Question
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Benchmarks */}
      {activeSubTab === 'benchmarks' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-stone-900 font-serif-display">
                Top University SAT & TOEFL Admittance Thresholds
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                25th to 75th percentile middle 50% score ranges of admitted freshmen.
              </p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search university or country..."
                value={benchmarkSearch}
                onChange={(e) => setBenchmarkSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-stone-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-700">
                  <th className="py-2.5 px-3 font-semibold">University</th>
                  <th className="py-2.5 px-3 font-semibold">Acceptance Rate</th>
                  <th className="py-2.5 px-3 font-semibold">SAT 25th – 75th</th>
                  <th className="py-2.5 px-3 font-semibold">TOEFL Minimum</th>
                  <th className="py-2.5 px-3 font-semibold">Testing Policy Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredBenchmarks.map((u, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-3 font-medium text-stone-900">
                      <div>{u.university}</div>
                      <span className="text-[11px] text-stone-500 font-normal">{u.country}</span>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-rose-700 tabular-nums">
                      {u.acceptanceRate}
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-900 tabular-nums">
                      {u.sat25th === 0 ? 'Test-Blind' : `${u.sat25th} – ${u.sat75th}`}
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-700 tabular-nums">
                      {u.toeflMin}+
                    </td>
                    <td className="py-3 px-3 text-stone-600 text-xs">
                      {u.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Plans */}
      {activeSubTab === 'plans' && (
        <div className="grid md:grid-cols-2 gap-8">
          {SAT_STUDY_PLANS.map((plan, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-amber-700 font-bold uppercase tracking-wider">
                  {plan.commitment}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mt-1 font-serif-display">{plan.name}</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4 italic">
                  Best for: {plan.target}
                </p>

                <div className="space-y-3 border-t border-stone-100 pt-4">
                  {plan.weeks.map((w, wIdx) => (
                    <div key={wIdx} className="text-xs flex items-start gap-2.5">
                      <span className="font-mono font-semibold text-stone-800 shrink-0 w-20">
                        {w.week}:
                      </span>
                      <span className="text-stone-600 leading-relaxed">{w.focus}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
                Official free platform: Khan Academy + 6 full-length tests in the College Board Bluebook app.
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
