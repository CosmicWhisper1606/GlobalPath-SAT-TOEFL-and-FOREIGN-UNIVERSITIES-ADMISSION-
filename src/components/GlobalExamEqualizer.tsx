import React, { useState } from 'react';
import {
  ShieldAlert,
  DollarSign,
  Laptop,
  BookOpen,
  Mic,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Info,
  HelpCircle,
  Lightbulb,
  Search,
  ArrowRight,
  Layers,
  Award,
  Zap,
  Globe2,
  Cpu,
  FileText
} from 'lucide-react';
import {
  CULTURAL_IDIOMS_GLOSSARY,
  MATH_WORD_PROBLEM_DRILLS,
  ARCHAIC_SYNTAX_SAMPLES,
  NATIONAL_BOARD_TIMELINES,
  FEE_WAIVER_PROGRAMS,
  CulturalIdiom,
  MathWordProblemDrill,
  ArchaicSyntaxSample,
  NationalBoardTimeline,
  FeeWaiverGuidance
} from '../data/examEqualizerData';

interface GlobalExamEqualizerProps {
  onGoToMockTests?: () => void;
  onGoToDates?: () => void;
  onGoToTimeline?: () => void;
}

export const GlobalExamEqualizer: React.FC<GlobalExamEqualizerProps> = ({
  onGoToMockTests,
  onGoToDates,
  onGoToTimeline
}) => {
  // Active Challenge Pillar
  const [activePillar, setActivePillar] = useState<
    'financial' | 'logistics' | 'curriculum' | 'language-culture' | 'calendars'
  >('financial');

  // Math drill interactive selection
  const [selectedDrillId, setSelectedDrillId] = useState<string>(MATH_WORD_PROBLEM_DRILLS[0].id);
  const [showDrillAnswer, setShowDrillAnswer] = useState<boolean>(false);

  // Archaic syntax interactive selection
  const [selectedSyntaxId, setSelectedSyntaxId] = useState<string>(ARCHAIC_SYNTAX_SAMPLES[0].id);

  // Cultural idiom search & category filter
  const [idiomSearch, setIdiomSearch] = useState<string>('');
  const [selectedIdiomCategory, setSelectedIdiomCategory] = useState<string>('All');

  // National board timeline selection
  const [selectedBoardIndex, setSelectedBoardIndex] = useState<number>(0);

  // Quick action states
  const activeDrill =
    MATH_WORD_PROBLEM_DRILLS.find((d) => d.id === selectedDrillId) || MATH_WORD_PROBLEM_DRILLS[0];
  const activeSyntax =
    ARCHAIC_SYNTAX_SAMPLES.find((s) => s.id === selectedSyntaxId) || ARCHAIC_SYNTAX_SAMPLES[0];
  const activeBoardTimeline: NationalBoardTimeline =
    NATIONAL_BOARD_TIMELINES[selectedBoardIndex] || NATIONAL_BOARD_TIMELINES[0];

  // Filtered idioms
  const filteredIdioms = CULTURAL_IDIOMS_GLOSSARY.filter((item) => {
    const matchesCat = selectedIdiomCategory === 'All' || item.category === selectedIdiomCategory;
    const matchesSearch =
      idiomSearch.trim() === '' ||
      item.term.toLowerCase().includes(idiomSearch.toLowerCase()) ||
      item.contextualMeaningOnExams.toLowerCase().includes(idiomSearch.toLowerCase()) ||
      item.confusionTrapForInternationalStudents.toLowerCase().includes(idiomSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header & Editorial Thesis with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            <span>The Global Exam Equalizer</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>Overcoming the 5 Hidden Disparities in Standardized Testing</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          International Student Exam Equalizer: Leveling the Playing Field
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Standardized exams (Digital SAT, ACT, TOEFL, IELTS, GRE) were originally calibrated for domestic Western educational backgrounds. International applicants face profound structural, economic, linguistic, and pedagogical hurdles. Explore battle-tested frameworks and actionable toolkits designed to conquer all five disparities.
        </p>

        {/* 5 Disparity Pillar Navigation Tabs */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200">
          {[
            {
              id: 'financial',
              label: '1. Financial Disparities',
              icon: DollarSign,
              subtitle: 'Fees & Waivers'
            },
            {
              id: 'logistics',
              label: '2. Logistics & Hardware',
              icon: Laptop,
              subtitle: 'Travel & Bluebook'
            },
            {
              id: 'curriculum',
              label: '3. Curriculum Mismatch',
              icon: BookOpen,
              subtitle: 'Word Problems & Syntax'
            },
            {
              id: 'language-culture',
              label: '4. Accent & Idioms',
              icon: Mic,
              subtitle: 'SpeechRater & Nuance'
            },
            {
              id: 'calendars',
              label: '5. Dual Calendars',
              icon: Calendar,
              subtitle: 'Boards vs. SAT/TOEFL'
            }
          ].map((pillar) => {
            const Icon = pillar.icon;
            const isActive = activePillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id as any)}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-500'}`} />
                  <span className="text-xs font-bold truncate">{pillar.label}</span>
                </div>
                <span className={`text-[11px] ${isActive ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>
                  {pillar.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PILLAR 1: FINANCIAL & ECONOMIC DISPARITIES */}
      {activePillar === 'financial' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Executive Overview Banner */}
          <div className="p-6 bg-gradient-to-br from-amber-500/10 via-stone-50 to-amber-500/5 rounded-3xl border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wide">
              <DollarSign className="w-4 h-4 text-amber-700" />
              <span>Pillar 1: Economic Equalization Framework</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-serif-display">
              Breaking the Paywall: High Test Fees, Forex Barriers & $2,000 Prep Academies
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl">
              An international test registration fee of <strong>$111+ (Digital SAT)</strong> or <strong>$220–$280 (TOEFL/IELTS)</strong> represents an exorbitant proportion of monthly household income in developing economies. Combined with blocked domestic debit cards, credit card exchange markups, and exorbitant commercial test prep courses, the testing process creates an unequal starting line. Here is how international students can eliminate these costs.
            </p>
          </div>

          {/* Actionable Strategies Grid */}
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 uppercase">
                Strategy A
              </span>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                International Fee Waivers & Partner Subsidies
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                While the College Board restricts domestic fee waivers to US schools, international students enrolled in <strong>EducationUSA Opportunity Funds</strong> or attending recognized high schools can receive electronic fee waiver codes. Duolingo also grants 100% free test vouchers via counselor requests.
              </p>
              <div className="text-[11px] text-amber-800 font-semibold bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                Action: Inquire with your high school counselor or local EducationUSA center before paying out-of-pocket.
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 uppercase">
                Strategy B
              </span>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                Currency Volatility & Credit Card Access
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Many central banks (e.g. Nigeria, Egypt, Argentina) restrict international foreign currency card transactions. Students frequently face failed checkout errors when attempting to pay the College Board or ETS directly in US Dollars.
              </p>
              <div className="text-[11px] text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Workarounds:</span>
                <span>1. Multi-currency virtual debit accounts (Wise, Payoneer, Chipper Cash).</span><br />
                <span>2. Authorized in-country ETS/IDP test center vouchers paid in cash locally.</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 uppercase">
                Strategy C
              </span>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                The Zero-Cost High-Yield Prep Stack
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Commercial Western prep courses charge $1,500–$3,500 for content that is virtually identical to free official materials. Every top score (1550+ SAT / 110+ TOEFL) can be achieved entirely through verified zero-cost resources.
              </p>
              <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                Stack: 6 Official Bluebook Practice Exams + Khan Academy Official SAT + GlobalPath Mock Exam Simulator + College Board Question Bank.
              </div>
            </div>
          </div>

          {/* Official Fee Waiver & Device Support Programs Directory */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-stone-900 font-serif-display flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-700" />
              <span>Official Subsidies & Fee Waiver Programs</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {FEE_WAIVER_PROGRAMS.map((program, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 uppercase">
                        {program.provider}
                      </span>
                      <span className="text-xs font-bold text-emerald-700">{program.value}</span>
                    </div>
                    <h5 className="text-base font-bold text-stone-900 font-serif-display">
                      {program.programName}
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      <strong className="text-stone-800">Eligibility:</strong> {program.whoIsEligible}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      <strong className="text-stone-800">Procedure:</strong>{' '}
                      {program.applicationProcedure}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <a
                      href={program.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <span>Official Portal & Application</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 2: TESTING LOGISTICS & INFRASTRUCTURE */}
      {activePillar === 'logistics' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Executive Overview Banner */}
          <div className="p-6 bg-gradient-to-br from-blue-500/10 via-stone-50 to-blue-500/5 rounded-3xl border border-blue-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wide">
              <Laptop className="w-4 h-4 text-blue-700" />
              <span>Pillar 2: Logistics, Centers & Hardware Resilience</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-serif-display">
              Test Center Scarcity, Cross-Country Travel & The Digital Device Divide
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl">
              Unlike domestic students who test at their neighborhood high school, international applicants from non-metro regions frequently travel 200–800 km by train or plane, book overnight hotels, and navigate unfamiliar cities just to reach an authorized center. Furthermore, the <strong>Digital SAT Bluebook</strong> app requires specific hardware specs and battery endurance in centers with unreliable power grids.
            </p>
          </div>

          {/* Deep-Dive Action Cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Step-by-Step Device Borrowing */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                Hardware Solution
              </span>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                College Board Device Lending: How to Request
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                If you do not own a laptop or tablet meeting Bluebook requirements, the College Board will lend you a device on test day free of charge.
              </p>
              <ul className="text-[11px] text-stone-700 space-y-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rule #1:</strong> You must register for your SAT test date first.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rule #2:</strong> Submit request at least <strong>30 calendar days</strong> before test day.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Device is shipped directly to your assigned test center for test morning pickup.
                  </span>
                </li>
              </ul>
              <a
                href="https://bluebook.collegeboard.org/students/approved-devices/borrow-a-device"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-amber-700 flex items-center gap-1"
              >
                <span>Request Loaner Device</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Travel & Overnight Strategy */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 uppercase">
                Travel Protocol
              </span>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                The Non-Metro Student Travel Buffer
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Exam gates strictly lock at <strong>7:45 AM or 8:00 AM</strong>. Arriving on a morning train or bus carries a high risk of delays that can cause automatic forfeiture of registration fees.
              </p>
              <div className="text-[11px] text-stone-700 space-y-2 bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-amber-950">
                <strong className="block text-amber-900">Mandatory Travel Rules:</strong>
                <p>1. Arrive in the host city the afternoon prior; visit the exact test center building before sunset.</p>
                <p>2. Book lodging within 15–20 minutes walking radius to avoid morning traffic or taxi cancellations.</p>
                <p>3. Pack all chargers, physical passport, and printed admission tickets the night before.</p>
              </div>
            </div>

            {/* Power Grid & Hardware Glitch Recovery */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 uppercase">
                Technical Disaster Protocol
              </span>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                Power Outages & Bluebook Crash Survival
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Third-party test centers in developing countries frequently experience power cuts, Wi-Fi drops, or device freezing during testing.
              </p>
              <div className="text-[11px] text-stone-700 space-y-1.5 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <p>
                  <strong>How Bluebook Works:</strong> The exam is stored <em>locally</em> on your device drive. A loss of internet connection does NOT stop the exam timer or erase answers.
                </p>
                <p>
                  <strong>If your laptop crashes:</strong> Do not panic. Reboot the laptop, open Bluebook, and enter your room supervisor’s re-entry code. Your timer resumes right where it froze!
                </p>
                <p className="text-rose-700 font-semibold">
                  Rule: Your laptop must be charged to 100% and sustain 3.5 hours on battery alone!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 3: CURRICULUM MISMATCH & PEDAGOGY */}
      {activePillar === 'curriculum' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Executive Overview Banner */}
          <div className="p-6 bg-gradient-to-br from-purple-500/10 via-stone-50 to-purple-500/5 rounded-3xl border border-purple-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-800 uppercase tracking-wide">
              <BookOpen className="w-4 h-4 text-purple-700" />
              <span>Pillar 3: The Pedagogical Divide</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-serif-display">
              Rote Reproduction vs. Critical Synthesis: Bridging National Curricula
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl">
              National curricula around the world (e.g. CBSE in India, Gaokao in China, WASSCE in West Africa) emphasize rigorous calculation, memorization of prescribed formulas, and reproductive accuracy. In contrast, Western standardized tests assess <strong>critical rhetorical analysis, contextual inference, and word-heavy real-world modeling</strong>.
            </p>
          </div>

          {/* Interactive Math Word Problem Deconstructer */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Interactive Math Drill: De-contextualizing Wordy Phrasing</span>
                </span>
                <h4 className="text-xl font-bold text-stone-900 font-serif-display mt-0.5">
                  Translate American Cultural Context into Clean Algebraic Equations
                </h4>
              </div>

              <div className="flex items-center gap-2">
                {MATH_WORD_PROBLEM_DRILLS.map((drill) => (
                  <button
                    key={drill.id}
                    onClick={() => {
                      setSelectedDrillId(drill.id);
                      setShowDrillAnswer(false);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedDrillId === drill.id
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {drill.problemTitle.split(' (')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Drill Display */}
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider block">
                  Original Verbose Question:
                </span>
                <p className="text-sm text-stone-900 font-medium leading-relaxed font-sans">
                  "{activeDrill.wordyAmericanText}"
                </p>
              </div>

              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                <strong className="block font-bold text-amber-900 uppercase text-[10px]">
                  Cultural Clutter Trap for International Students:
                </strong>
                <p className="text-stone-700 leading-relaxed text-xs">
                  {activeDrill.culturalTrapExplanation}
                </p>
              </div>

              {/* Reveal Solution Button */}
              <div className="pt-2">
                <button
                  onClick={() => setShowDrillAnswer((prev) => !prev)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showDrillAnswer ? 'Hide Algebraic Breakdown' : 'Deconstruct into Algebra'}</span>
                </button>
              </div>

              {showDrillAnswer && (
                <div className="p-5 bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                      Step-by-Step Translation Algorithm:
                    </span>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-300 font-mono">
                      {activeDrill.mathematicalTranslationSteps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-stone-400 text-[11px] block">Standard Equation:</span>
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        {activeDrill.algebraicEquation}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-400 text-[11px] block">Correct Answer:</span>
                      <span className="font-mono font-bold text-amber-400 text-sm">
                        {activeDrill.correctAnswer}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Archaic Syntax & High-Lexile Reading Decoder */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wide flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Archaic 18th & 19th Century Historical Prose Decoder</span>
                </span>
                <h4 className="text-xl font-bold text-stone-900 font-serif-display mt-0.5">
                  How to Decode Federalist Papers & Great Global Conversations
                </h4>
              </div>

              <div className="flex items-center gap-2">
                {ARCHAIC_SYNTAX_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => setSelectedSyntaxId(sample.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedSyntaxId === sample.id
                        ? 'bg-purple-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {sample.authorAndWork.split(',')[0]} ({sample.year})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Original 18th/19th Century Passage */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-stone-700 uppercase">
                    Original Test Passage ({activeSyntax.year})
                  </span>
                  <span className="text-[11px] text-stone-500 font-serif italic">
                    {activeSyntax.authorAndWork}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 font-serif italic leading-relaxed">
                  "{activeSyntax.originalPassage}"
                </p>
                <div className="space-y-1.5 pt-2 border-t border-stone-200">
                  <span className="text-[10px] font-bold text-stone-600 uppercase font-mono">
                    Key Archaic Syntax Breakdown:
                  </span>
                  <ul className="text-[11px] text-stone-600 space-y-1">
                    {activeSyntax.archaicSyntaxBreakdown.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modern Plain English Translation & Strategy */}
              <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-purple-900 uppercase">
                    Modern Plain English Translation
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                    {activeSyntax.plainEnglishTranslation}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-purple-200 text-xs text-purple-950 space-y-1">
                  <strong className="block text-[11px] uppercase font-bold text-purple-900">
                    Exam Strategy Takeaway:
                  </strong>
                  <p className="text-stone-700 text-[11px] leading-relaxed">
                    {activeSyntax.keyStrategy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 4: LANGUAGE, ACCENT & CULTURAL NUANCE */}
      {activePillar === 'language-culture' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Executive Overview Banner */}
          <div className="p-6 bg-gradient-to-br from-emerald-500/10 via-stone-50 to-emerald-500/5 rounded-3xl border border-emerald-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
              <Mic className="w-4 h-4 text-emerald-700" />
              <span>Pillar 4: Accent Anxiety, SpeechRater & Cultural Nuance</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-serif-display">
              Demystifying Speaking Bias & Decoding American Cultural Idioms
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl">
              Non-native speakers frequently experience intense anxiety over their regional accent on the <strong>TOEFL iBT Speaking</strong> section (scored by ETS's SpeechRater AI + human evaluators) and <strong>IELTS Speaking</strong>. Furthermore, standardized reading passages frequently lean on everyday American cultural concepts that cause international students to waste valuable seconds.
            </p>
          </div>

          {/* SpeechRater Truth vs. Myth Matrix */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-4">
            <h4 className="text-xl font-bold text-stone-900 font-serif-display flex items-center gap-2">
              <Mic className="w-5 h-5 text-amber-700" />
              <span>The Truth About Accent in TOEFL / IELTS / Duolingo Speaking</span>
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-2">
                <span className="text-xs font-bold text-rose-900 uppercase font-mono flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Myth: "You must fake an American or British accent"</span>
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Trying to imitate an American accent leads to unnatural pauses, strained vocal cords, and erratic intonation. ETS trained SpeechRater on hundreds of thousands of speech samples across 160+ linguistic origins.
                </p>
                <div className="text-[11px] text-rose-800 font-semibold pt-1">
                  Result: Faking an accent drops your score because your discourse coherence degrades.
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-emerald-900 uppercase font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Reality: What SpeechRater Actually Measures</span>
                </span>
                <ul className="text-xs text-stone-700 space-y-1.5">
                  <li>
                    <strong>1. Sustained Fluency:</strong> Steady pace of 110–140 words per minute without sudden 3-second silences.
                  </li>
                  <li>
                    <strong>2. Acoustic Clarity:</strong> Crisp enunciation of consonants (e.g. final 't', 'd', 's' endings).
                  </li>
                  <li>
                    <strong>3. Topical Organization:</strong> Clear transitions (*"First of all...", "In contrast...", "Consequently..."*).
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Searchable American Cultural Idioms & Metaphors Glossary */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                  Contextual Vocabulary Equalizer
                </span>
                <h4 className="text-xl font-bold text-stone-900 font-serif-display mt-0.5">
                  The American Cultural Idioms & Metaphors Glossary
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Concepts commonly assumed on standardized tests that confound international candidates.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={idiomSearch}
                  onChange={(e) => setIdiomSearch(e.target.value)}
                  placeholder="Search idioms or concepts..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'School & Youth Culture', 'Civic & Community', 'Environment & Daily Life', 'Financial & Real Estate'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedIdiomCategory(cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedIdiomCategory === cat
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* Idioms Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredIdioms.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-stone-900 font-serif-display">
                        {item.term}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600 font-bold uppercase">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      <strong className="text-stone-900">Exam Context:</strong>{' '}
                      {item.contextualMeaningOnExams}
                    </p>
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200 text-[11px] text-stone-700 font-serif italic">
                      "{item.examplePassageSnippet}"
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                    <strong className="block text-[10px] uppercase font-bold text-amber-900">
                      Why International Students Get Confused:
                    </strong>
                    <p className="text-stone-700 text-[11px] leading-relaxed">
                      {item.confusionTrapForInternationalStudents}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 5: COMPETING ACADEMIC CALENDARS & BURNOUT */}
      {activePillar === 'calendars' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Executive Overview Banner */}
          <div className="p-6 bg-gradient-to-br from-rose-500/10 via-stone-50 to-rose-500/5 rounded-3xl border border-rose-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wide">
              <Calendar className="w-4 h-4 text-rose-700" />
              <span>Pillar 5: Calendar Synchronization & Anti-Burnout Shield</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-serif-display">
              National Board Exams vs. Standardized Testing: Eliminating the Clashes
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl">
              Unlike US domestic students who focus almost exclusively on high school coursework, international students face rigorous, career-defining national school-leaving examinations (CBSE, Gaokao, WAEC, A-Levels, Baccalauréat) occurring in the exact same window as college application deadlines. Stacking both leads to burnout and compromised scores.
            </p>
          </div>

          {/* Interactive Curriculum Calendar Synchronizer */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">
                  Curriculum Harmonizer
                </span>
                <h4 className="text-xl font-bold text-stone-900 font-serif-display mt-0.5">
                  Select Your National School Board
                </h4>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {NATIONAL_BOARD_TIMELINES.map((board, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedBoardIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedBoardIndex === idx
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {board.country} ({board.curriculumName.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* Active Board Strategy Card */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <h5 className="text-lg font-bold text-stone-900 font-serif-display">
                    {activeBoardTimeline.curriculumName}
                  </h5>
                  <span className="text-xs text-stone-500 font-medium">
                    Region: {activeBoardTimeline.country} · Final Academic Year: {activeBoardTimeline.schoolLeavingYear}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase font-bold text-rose-800 font-mono block">
                    Peak National Board Exam Window:
                  </span>
                  <span className="text-xs font-bold text-stone-800">
                    {activeBoardTimeline.peakBoardExamMonths}
                  </span>
                </div>
              </div>

              {/* Recommended vs Danger Months Grid */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                  <span className="text-xs font-bold text-emerald-900 uppercase font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Safe SAT Testing Windows</span>
                  </span>
                  <ul className="text-xs text-stone-800 space-y-1">
                    {activeBoardTimeline.recommendedSATTesterMonths.map((m, i) => (
                      <li key={i} className="font-semibold text-emerald-950">
                        • {m}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-2">
                  <span className="text-xs font-bold text-blue-900 uppercase font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-700" />
                    <span>Recommended TOEFL/IELTS</span>
                  </span>
                  <ul className="text-xs text-stone-800 space-y-1">
                    {activeBoardTimeline.recommendedTOEFLTesterMonths.map((m, i) => (
                      <li key={i} className="font-semibold text-blue-950">
                        • {m}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-2">
                  <span className="text-xs font-bold text-rose-900 uppercase font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-700" />
                    <span>Danger Zones to Avoid</span>
                  </span>
                  <ul className="text-xs text-stone-800 space-y-1">
                    {activeBoardTimeline.dangerMonthsToAvoid.map((m, i) => (
                      <li key={i} className="font-semibold text-rose-950">
                        ✕ {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tactical Advice Callout */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block font-bold text-amber-900 uppercase text-xs">
                    Strategic Anti-Burnout Rule:
                  </strong>
                  <p className="text-stone-700 leading-relaxed text-xs">
                    {activeBoardTimeline.strategicAdvice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cross-linking to Tools & Mock Exams */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-stone-800 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            Ready to Practice With Realistic Standards?
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-serif-display">
            Put These Strategies into Practice on Free AI Mock Exams
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Take full-length adaptive Digital SAT and TOEFL iBT mock tests with instant section scoring, detailed explanations, and our AI Writing Lab evaluator.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onGoToMockTests && (
            <button
              onClick={onGoToMockTests}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Launch Free AI Mock Exam</span>
            </button>
          )}

          {onGoToDates && (
            <button
              onClick={onGoToDates}
              className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-300" />
              <span>Check 2026–2028 Dates</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
