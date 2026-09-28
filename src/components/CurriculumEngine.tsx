import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  FileText,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldAlert,
  Clock,
  ExternalLink,
  ChevronRight,
  Award,
  Zap,
  Globe2,
  Info,
  DollarSign,
  Check,
  XCircle,
  Copy
} from 'lucide-react';
import {
  GLOBAL_CURRICULA_DATABASE,
  MAJOR_PREREQUISITE_RULES,
  CREDENTIAL_EVALUATION_SERVICES,
  CurriculumType,
  GradeReportingFormat,
  AcademicYear,
  TargetMajorField,
  CurriculumComparisonItem
} from '../data/curriculumData';

interface CurriculumEngineProps {
  onGoToUniversitySearch?: () => void;
  onGoToTracker?: () => void;
  onGoToTestingHub?: () => void;
}

export const CurriculumEngine: React.FC<CurriculumEngineProps> = ({
  onGoToUniversitySearch,
  onGoToTracker,
  onGoToTestingHub,
}) => {
  // Navigation tabs within Curriculum Engine
  const [activeTab, setActiveTab] = useState<
    'comparator' | 'profile-checker' | 'evaluations-transcript' | 'sat-synergy'
  >('profile-checker');

  // Interactive Student Profile State
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType>('CBSE');
  const [reportingFormat, setReportingFormat] = useState<GradeReportingFormat>('Percentage_100');
  const [academicYear, setAcademicYear] = useState<AcademicYear>('Grade_12');
  const [targetMajor, setTargetMajor] = useState<TargetMajorField>('Engineering_CS');
  const [userScoreInput, setUserScoreInput] = useState<string>('93');
  
  // Specific course checks for prerequisites
  const [hasCalculus, setHasCalculus] = useState<boolean>(true);
  const [hasPhysics, setHasPhysics] = useState<boolean>(true);
  const [hasChemistry, setHasChemistry] = useState<boolean>(true);
  const [hasBiology, setHasBiology] = useState<boolean>(false);
  const [hasAdvancedEnglish, setHasAdvancedEnglish] = useState<boolean>(true);

  // Selected curriculum in comparator tab
  const [comparatorCurriculumId, setComparatorCurriculumId] = useState<CurriculumType>('IBDP');

  // Copy feedback
  const [copiedRule, setCopiedRule] = useState<boolean>(false);

  // Active curriculum profile item
  const activeCurriculumItem: CurriculumComparisonItem =
    GLOBAL_CURRICULA_DATABASE.find((c) => c.id === selectedCurriculum) || GLOBAL_CURRICULA_DATABASE[0];

  const comparatorItem: CurriculumComparisonItem =
    GLOBAL_CURRICULA_DATABASE.find((c) => c.id === comparatorCurriculumId) || GLOBAL_CURRICULA_DATABASE[0];

  const activePrereqRule =
    MAJOR_PREREQUISITE_RULES.find((r) => r.majorField === targetMajor) || MAJOR_PREREQUISITE_RULES[0];

  // Prerequisite evaluation logic
  const checkPrerequisiteStatus = () => {
    if (targetMajor === 'Engineering_CS') {
      const passed = hasCalculus && hasPhysics;
      return {
        passed,
        missing: [!hasCalculus ? 'Calculus / Advanced Mathematics' : null, !hasPhysics ? 'Physics' : null].filter(Boolean),
        warning: 'Engineering & CS direct admission in the UK, Canada, and Europe requires secondary Calculus and Physics. Missing these will trigger immediate rejection.'
      };
    }
    if (targetMajor === 'Business_Finance_Econ') {
      const passed = hasCalculus;
      return {
        passed,
        missing: [!hasCalculus ? 'High-School Mathematics through Calculus/Pre-Calculus' : null].filter(Boolean),
        warning: 'Top economics and finance faculties (e.g. LSE, Wharton, Warwick, Chicago) require pure calculus; descriptive business courses cannot replace math.'
      };
    }
    if (targetMajor === 'PreMed_LifeSciences') {
      const passed = hasChemistry && hasBiology;
      return {
        passed,
        missing: [!hasChemistry ? 'Chemistry' : null, !hasBiology ? 'Biology' : null].filter(Boolean),
        warning: 'Undergraduate medicine (MBBS) in the UK/Australia and elite US pre-med tracks require both Chemistry and Biology at the highest secondary level.'
      };
    }
    if (targetMajor === 'Humanities_SocialSciences') {
      const passed = hasAdvancedEnglish;
      return {
        passed,
        missing: [!hasAdvancedEnglish ? 'Advanced English / Literature' : null].filter(Boolean),
        warning: 'High-stamina essay writing and critical source analysis are compulsory.'
      };
    }
    return { passed: true, missing: [], warning: 'Undeclared entry is permitted only in US and select Canadian universities.' };
  };

  const prereqCheck = checkPrerequisiteStatus();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full max-w-full overflow-x-hidden">
      {/* Header Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <BookOpen className="w-3.5 h-3.5" />
          <span>Secondary Curriculum & Credential Evaluation Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
          Global High School Boards & Admissions Contextual Review
        </h2>
        <p className="mt-2 text-stone-300 text-sm max-w-3xl leading-relaxed">
          Curriculum is the single biggest point of confusion for international applicants. Discover how top admissions committees evaluate the IB, A-Levels, CBSE, CISCE, French Bac, and national diplomas; navigate the 4-Year Transcript Rule vs. conditional exit offers; and avoid the disastrous GPA self-conversion trap.
        </p>

        {/* Sub-navigation tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[var(--theme-border)]">
          <button
            onClick={() => setActiveTab('profile-checker')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'profile-checker'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-sm'
                : 'bg-[var(--theme-surface-elevated)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Board & Prerequisite Checker</span>
          </button>

          <button
            onClick={() => setActiveTab('comparator')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'comparator'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-sm'
                : 'bg-[var(--theme-surface-elevated)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Curriculum Comparator (IB, A-Levels, CBSE, Bac)</span>
          </button>

          <button
            onClick={() => setActiveTab('evaluations-transcript')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'evaluations-transcript'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-sm'
                : 'bg-[var(--theme-surface-elevated)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>GPA Trap, WES/ECE & 4-Year Transcript Rule</span>
          </button>

          <button
            onClick={() => setActiveTab('sat-synergy')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'sat-synergy'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-sm'
                : 'bg-[var(--theme-surface-elevated)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Curriculum Alignment with SAT / ACT & APs</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE PROFILE & PREREQUISITE CHECKER */}
      {activeTab === 'profile-checker' && (
        <div className="space-y-8">
          {/* CRITICAL INLINE WARNING: THE DO NOT CONVERT ALERT */}
          <div className="p-5 rounded-xl border border-amber-500/40 bg-amber-950/20 text-amber-200 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-base text-amber-300 font-serif-display">
                Universal Rule: Never Self-Convert Your Marks into a 4.0 US GPA!
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                If you study under CBSE, CISCE, French Baccalauréat, or German Abitur, <strong>do not calculate or enter a 4.0 GPA on the Common App, Coalition, or university portals</strong>. Doing so distorts your profile. Admissions readers have specialized regional evaluation officers who evaluate raw percentages, 1–7 IB scales, or A* grades within the context of your official School Profile.
              </p>
            </div>
          </div>

          {/* Interactive Profile Configurator */}
          <div className="theme-card p-6 sm:p-8 space-y-6">
            <div className="border-b border-[var(--theme-border)] pb-4">
              <h3 className="text-xl font-bold font-serif-display text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[var(--theme-accent)]" />
                <span>Configure Your Secondary Academic Profile</span>
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Select your high-school board and target field of study to run instant automated prerequisite validation and transcript requirement checks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* 1. High School Board */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  1. High School Curriculum
                </label>
                <select
                  value={selectedCurriculum}
                  onChange={(e) => {
                    const c = e.target.value as CurriculumType;
                    setSelectedCurriculum(c);
                    const match = GLOBAL_CURRICULA_DATABASE.find(item => item.id === c);
                    if (match) setReportingFormat(match.reportingFormat);
                  }}
                  className="w-full text-xs p-2.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                >
                  <option value="CBSE">Indian CBSE (Central Board)</option>
                  <option value="CISCE">Indian CISCE (ICSE / ISC)</option>
                  <option value="IBDP">IB Diploma Programme (IBDP)</option>
                  <option value="Cambridge_A_Levels">Cambridge International A-Levels</option>
                  <option value="US_HighSchool">US High School Diploma + APs</option>
                  <option value="French_Bac">French Baccalauréat (0–20 scale)</option>
                  <option value="German_Abitur">German Abitur (1.0–6.0 scale)</option>
                </select>
              </div>

              {/* 2. Target Major */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  2. Target Major / Discipline
                </label>
                <select
                  value={targetMajor}
                  onChange={(e) => setTargetMajor(e.target.value as TargetMajorField)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                >
                  <option value="Engineering_CS">Engineering & Computer Science</option>
                  <option value="Business_Finance_Econ">Business, Finance & Economics</option>
                  <option value="PreMed_LifeSciences">Pre-Med & Biomedical Sciences</option>
                  <option value="Humanities_SocialSciences">Humanities, Law & Social Sciences</option>
                  <option value="Undeclared">Undeclared / General Liberal Arts</option>
                </select>
              </div>

              {/* 3. Current Academic Year */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  3. Current Academic Standing
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value as AcademicYear)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                >
                  <option value="Grade_9">Grade 9 (Freshman)</option>
                  <option value="Grade_10">Grade 10 (Sophomore / 10th Board)</option>
                  <option value="Grade_11">Grade 11 (Junior / Transition Year)</option>
                  <option value="Grade_12">Grade 12 (Senior / Final Board Year)</option>
                  <option value="Gap_Year">Gap Year / Graduated</option>
                </select>
              </div>

              {/* 4. Score Benchmark */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  4. Raw Expected/Predicted Mark
                </label>
                <input
                  type="text"
                  value={userScoreInput}
                  onChange={(e) => setUserScoreInput(e.target.value)}
                  placeholder="e.g. 93% or 41/45 or A*A*A"
                  className="w-full text-xs p-2.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)] font-mono"
                />
              </div>
            </div>

            {/* Senior Secondary Coursework Checklist */}
            <div className="pt-4 border-t border-[var(--theme-border)] space-y-3">
              <label className="block text-xs font-semibold text-stone-300">
                Senior Secondary Subject Enrollment (Grades 11 & 12):
              </label>
              <div className="flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer bg-[var(--theme-surface-subtle)] px-3 py-2 rounded-md border border-[var(--theme-border)]">
                  <input
                    type="checkbox"
                    checked={hasCalculus}
                    onChange={(e) => setHasCalculus(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span>Calculus / Advanced Mathematics (HL / A-Level / PCM)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-[var(--theme-surface-subtle)] px-3 py-2 rounded-md border border-[var(--theme-border)]">
                  <input
                    type="checkbox"
                    checked={hasPhysics}
                    onChange={(e) => setHasPhysics(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span>Physics (HL / A-Level / Lab Science)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-[var(--theme-surface-subtle)] px-3 py-2 rounded-md border border-[var(--theme-border)]">
                  <input
                    type="checkbox"
                    checked={hasChemistry}
                    onChange={(e) => setHasChemistry(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span>Chemistry</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-[var(--theme-surface-subtle)] px-3 py-2 rounded-md border border-[var(--theme-border)]">
                  <input
                    type="checkbox"
                    checked={hasBiology}
                    onChange={(e) => setHasBiology(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span>Biology / Life Sciences</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-[var(--theme-surface-subtle)] px-3 py-2 rounded-md border border-[var(--theme-border)]">
                  <input
                    type="checkbox"
                    checked={hasAdvancedEnglish}
                    onChange={(e) => setHasAdvancedEnglish(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span>English Literature / Language</span>
                </label>
              </div>
            </div>
          </div>

          {/* Automated Evaluation & Prerequisite Verdict Card */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left 2 cols: Prerequisite Analysis */}
            <div className="lg:col-span-2 theme-card p-6 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono text-[var(--theme-accent)] uppercase tracking-wider">
                    Automated Curriculum Audit
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif-display mt-0.5">
                    Prerequisite Verification: {activePrereqRule.majorName}
                  </h3>
                </div>

                <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  prereqCheck.passed 
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
                }`}>
                  {prereqCheck.passed ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Prerequisites Met</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Missing Critical Courses</span>
                    </>
                  )}
                </div>
              </div>

              {!prereqCheck.passed && (
                <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-200 text-xs space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Missing Subject Requirements for Direct Entry:</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {prereqCheck.missing.map((item, idx) => (
                      <li key={idx} className="font-semibold">{item}</li>
                    ))}
                  </ul>
                  <p className="text-stone-300 mt-2">{prereqCheck.warning}</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-2">
                  <div className="font-semibold text-stone-200 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                    <span>Mandatory Secondary Courses:</span>
                  </div>
                  <ul className="list-disc pl-4 text-stone-300 space-y-1">
                    {activePrereqRule.mandatoryHighSchoolCourses.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-2">
                  <div className="font-semibold text-stone-200 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Recommended Competitive Edge:</span>
                  </div>
                  <ul className="list-disc pl-4 text-stone-300 space-y-1">
                    {activePrereqRule.recommendedHighSchoolCourses.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Board-specific guidance */}
              <div className="p-4 rounded-lg bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] space-y-2 text-xs">
                <div className="font-semibold text-[var(--theme-accent)]">
                  Specific Rule for {activeCurriculumItem.name}:
                </div>
                <p className="text-stone-300 leading-relaxed">
                  {selectedCurriculum === 'IBDP' && activePrereqRule.curriculumSpecificNotes.IBDP}
                  {selectedCurriculum === 'Cambridge_A_Levels' && activePrereqRule.curriculumSpecificNotes.A_Levels}
                  {(selectedCurriculum === 'CBSE' || selectedCurriculum === 'CISCE') && activePrereqRule.curriculumSpecificNotes.CBSE_CISCE}
                  {selectedCurriculum === 'US_HighSchool' && activePrereqRule.curriculumSpecificNotes.US_HighSchool}
                  {(selectedCurriculum === 'French_Bac' || selectedCurriculum === 'German_Abitur') && 
                    'Ensure you have selected the intensive specialty stream (e.g. Spécialité Mathématiques / Leistungskurs Mathematik) with high honors.'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs text-amber-200/90 leading-relaxed">
                <strong>Direct Entry Warning:</strong> {activePrereqRule.directEntryWarning}
              </div>
            </div>

            {/* Right col: 4-Year Transcript Checklist for this Student */}
            <div className="theme-card p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-[var(--theme-border)] pb-3">
                  <div className="text-[11px] font-mono text-[var(--theme-accent)] uppercase tracking-wider">
                    Documentation Roadmap
                  </div>
                  <h4 className="text-base font-bold text-white font-serif-display mt-0.5">
                    US 4-Year Transcript Checklist
                  </h4>
                  <p className="text-xs text-stone-400 mt-1">
                    US admissions committees review all 4 years of secondary schooling (Grades 9 through 12).
                  </p>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Grade 9 Transcript:</strong>
                      <p className="text-stone-400 text-[11px]">Official school marksheet/report card stamped by the principal.</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Grade 10 Board / Exam Certificate:</strong>
                      <p className="text-stone-400 text-[11px]">Official external certificate (AISSE, ICSE, IGCSE, Brevet, etc.).</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Grade 11 Internal Transcript:</strong>
                      <p className="text-stone-400 text-[11px]">
                        Internal deflation is expected. Admissions looks for positive trajectories into 12th grade.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Grade 12 Predicted Scores:</strong>
                      <p className="text-stone-400 text-[11px]">
                        Official predicted grades signed by school counselor on school letterhead.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onGoToUniversitySearch}
                className="w-full py-2.5 bg-[var(--theme-accent)] text-stone-950 font-bold text-xs rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Find Universities Matching My Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CURRICULUM COMPARATOR */}
      {activeTab === 'comparator' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white font-serif-display">
                Global Curriculum Comparative Matrix
              </h3>
              <p className="text-xs text-stone-400">
                Detailed breakdowns of how world admissions committees view each secondary framework.
              </p>
            </div>

            {/* Board Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {GLOBAL_CURRICULA_DATABASE.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setComparatorCurriculumId(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    comparatorCurriculumId === item.id
                      ? 'bg-[var(--theme-accent)] text-stone-950 font-bold'
                      : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
                  }`}
                >
                  {item.name.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Deep-Dive Card for Selected Curriculum */}
          <div className="theme-card p-6 sm:p-8 space-y-6">
            <div className="border-b border-[var(--theme-border)] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-[var(--theme-accent)] font-semibold uppercase">
                  Curriculum Profile
                </span>
                <h3 className="text-2xl font-bold text-white font-serif-display">
                  {comparatorItem.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1">{comparatorItem.tagline}</p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] text-xs text-right">
                <span className="text-stone-400 block text-[10px]">Native Grading Scale</span>
                <span className="font-bold text-amber-300 font-mono">{comparatorItem.nativeScale}</span>
              </div>
            </div>

            {/* Assessment Structure & Evaluation Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-stone-200 text-sm flex items-center gap-1.5 mb-2">
                    <BookOpen className="w-4 h-4 text-[var(--theme-accent)]" />
                    <span>Structure & Assessment Methodology</span>
                  </h4>
                  <p className="text-stone-300 leading-relaxed bg-[var(--theme-surface-subtle)] p-3.5 rounded-lg border border-[var(--theme-border)]">
                    {comparatorItem.structureAndAssessment}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Key Strengths in International Admissions</span>
                  </h4>
                  <ul className="space-y-2 bg-[var(--theme-surface-subtle)] p-3.5 rounded-lg border border-[var(--theme-border)]">
                    {comparatorItem.strengthsInAdmissions.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-stone-300">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-rose-300 text-sm flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Pitfalls, Vulnerabilities & Friction Points</span>
                  </h4>
                  <ul className="space-y-2 bg-[var(--theme-surface-subtle)] p-3.5 rounded-lg border border-[var(--theme-border)]">
                    {comparatorItem.mainPitfallsAndFriction.map((pit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-stone-300">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{pit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-amber-300 text-sm flex items-center gap-1.5 mb-2">
                    <Globe2 className="w-4 h-4 text-amber-400" />
                    <span>US Holistic vs. UK UCAS Evaluation Method</span>
                  </h4>
                  <div className="space-y-2 bg-[var(--theme-surface-subtle)] p-3.5 rounded-lg border border-[var(--theme-border)] text-stone-300">
                    <div>
                      <strong className="text-white">US Admissions:</strong> {comparatorItem.usEvaluationMethod}
                    </div>
                    <div className="pt-2 border-t border-[var(--theme-border)]">
                      <strong className="text-white">UK / UCAS Admissions:</strong> {comparatorItem.ukEvaluationMethod}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Synergies row */}
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-[var(--theme-border)] text-xs">
              <div className="p-3.5 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                <span className="font-bold text-white block">SAT Math Synergy:</span>
                <p className="text-stone-400">{comparatorItem.satMathSynergy}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                <span className="font-bold text-white block">SAT Reading & Writing:</span>
                <p className="text-stone-400">{comparatorItem.satRwSynergy}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                <span className="font-bold text-white block">Recommended External Rigor:</span>
                <p className="text-stone-400">{comparatorItem.recommendedExternalRigor}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GPA CONVERSION TRAP, WES/ECE & 4-YEAR TRANSCRIPT RULE */}
      {activeTab === 'evaluations-transcript' && (
        <div className="space-y-8">
          {/* Section 1: The GPA Conversion Trap */}
          <div className="theme-card p-6 sm:p-8 space-y-5">
            <div className="border-b border-[var(--theme-border)] pb-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-[var(--theme-accent)] uppercase tracking-wider font-semibold">
                  Common Application & Portal Rules
                </span>
                <h3 className="text-xl font-bold text-white font-serif-display mt-0.5">
                  The #1 Mistake: Third-Party Internet GPA Conversion
                </h3>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("On portals like the Common App, enter grades exactly as they appear on your report card (e.g., 88/100, 7/7, or A*) and select your native grading scale. Leave the GPA conversion field blank or unweighted unless an official 4.0 scale is provided directly by your school.");
                  setCopiedRule(true);
                  setTimeout(() => setCopiedRule(false), 2000);
                }}
                className="px-3 py-1.5 rounded-md bg-[var(--theme-surface-subtle)] hover:bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-xs text-stone-300 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedRule ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRule ? 'Copied Rule!' : 'Copy Rule'}</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-xs text-stone-300 leading-relaxed">
              <div className="space-y-3">
                <h4 className="font-bold text-rose-300 text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>What Candidates Do Wrong:</span>
                </h4>
                <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <p>
                    Students find an unofficial table online stating that "80%–89% = B = 3.0 GPA". A French student with 14/20 divides by 5 and writes "2.8 GPA", or an Indian student with 88% in rigorous CBSE Science writes "3.3 GPA".
                  </p>
                  <p className="font-semibold text-rose-300">
                    Consequence: The algorithm or human screener misinterprets your performance as mediocre, completely ignoring that 14/20 or 88% is in the top 2% of your nation!
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>What You Must Actually Do:</span>
                </h4>
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <p>
                    Enter your grades <strong>EXACTLY as they appear on your official school report card</strong> (e.g. 88/100, 7/7, 15/20, or A*). Select your native grading scale in the portal dropdown.
                  </p>
                  <p className="font-semibold text-emerald-300">
                    If the portal asks for a 4.0 cumulative GPA and your high school does not officially calculate one on your official transcript, leave it blank or select "None". Admissions officers do in-house recalculation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Third-Party Credential Evaluation (WES, ECE, SpanTran) */}
          <div className="theme-card p-6 sm:p-8 space-y-6">
            <div className="border-b border-[var(--theme-border)] pb-4">
              <span className="text-[11px] font-mono text-[var(--theme-accent)] uppercase tracking-wider font-semibold">
                NACES Accredited Credential Agencies
              </span>
              <h3 className="text-xl font-bold text-white font-serif-display mt-0.5">
                When Do You Need Formal Credential Evaluation (WES / ECE)?
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Elite private colleges evaluate transcripts in-house, but many large US public universities and Canadian schools require external certified course-by-course evaluation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {CREDENTIAL_EVALUATION_SERVICES.map((serv) => (
                <div key={serv.shortCode} className="p-5 rounded-xl bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-4 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[var(--theme-accent)]">{serv.shortCode}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-semibold">
                        NACES Member
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{serv.name}</h4>
                    
                    <div className="text-xs text-stone-300 space-y-1 pt-2 border-t border-[var(--theme-border)]">
                      <div><strong>Est. Cost:</strong> ~${serv.estimatedCostUSD} USD</div>
                      <div><strong>Turnaround:</strong> {serv.typicalTurnaroundWeeks}</div>
                    </div>

                    <div className="pt-2 text-[11px] text-stone-400 space-y-1">
                      <strong className="text-stone-300 block">Commonly Demanded By:</strong>
                      <ul className="list-disc pl-3.5 space-y-0.5">
                        {serv.requiredBySampleColleges.slice(0, 3).map((col, idx) => (
                          <li key={idx}>{col}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--theme-border)] text-[11px] text-amber-200/90 italic">
                    {serv.keyAdvice}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline warning box */}
            <div className="p-4 rounded-lg bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] flex items-start gap-3 text-xs">
              <Clock className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Start Credential Evaluation 6 to 8 Weeks in Advance!</strong>
                <p className="text-stone-300 mt-0.5 leading-relaxed">
                  Evaluation agencies like WES require your high school or examination board (e.g. CBSE/Cambridge) to mail physical stamped documents or dispatch electronic records via a secured institutional portal. Missing the document verification deadline can delay admissions consideration by an entire semester.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: The 4-Year Transcript Rule vs. Final Board Exams */}
          <div className="theme-card p-6 sm:p-8 space-y-5">
            <h3 className="text-xl font-bold text-white font-serif-display border-b border-[var(--theme-border)] pb-4">
              The 4-Year Transcript Rule vs. Conditional Exit Offers
            </h3>

            <div className="grid md:grid-cols-2 gap-6 text-xs text-stone-300 leading-relaxed">
              <div className="p-5 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-3">
                <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-amber-400" />
                  <span>United States: 4-Year Longitudinal Journey</span>
                </h4>
                <p>
                  US colleges demand transcripts for <strong>Grades 9, 10, 11, and 12</strong>. In many countries, Grades 9 and 11 are internal transition years where teachers deliberately grade harshly to intimidate students into studying.
                </p>
                <div className="p-3 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                  <strong className="text-white">How Readers Treat the Grade 11 Dip:</strong>
                  <p className="text-stone-300 mt-1">
                    Admissions officers understand that a drop from 92% in Class 10 to 76% in Class 11 is normal in India or France. What matters is the <em>trajectory</em>: showing a strong rebound in Grade 12 mid-term exams proves resilience.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-3">
                <h4 className="font-bold text-blue-300 text-sm flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>UK (UCAS), Europe & Canada: Conditional Exit Offers</span>
                </h4>
                <p>
                  European and British universities care almost exclusively about <strong>Grade 12 final terminal board exams or predicted scores</strong>. Admissions offers are conditional contracts.
                </p>
                <div className="p-3 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                  <strong className="text-white">Predicted Grades Risk:</strong>
                  <p className="text-stone-300 mt-1">
                    If your conditional offer states "Must achieve 95% in Mathematics and 90% overall" or "39 IB points with 7 in HL Physics", missing that cutoff by even 1 point means your admission offer is automatically revoked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SAT / ACT CURRICULUM ALIGNMENT & APs */}
      {activeTab === 'sat-synergy' && (
        <div className="space-y-6">
          <div className="theme-card p-6 sm:p-8 space-y-6">
            <div className="border-b border-[var(--theme-border)] pb-4">
              <span className="text-[11px] font-mono text-[var(--theme-accent)] uppercase tracking-wider font-semibold">
                Exam Diagnostic & Cross-Alignment
              </span>
              <h3 className="text-xl font-bold text-white font-serif-display mt-0.5">
                How Your High School Curriculum Aligns with SAT, ACT & APs
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Identify where your board gives you an effortless advantage and where hidden traps cause unexpected score losses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-xs text-stone-300">
              {/* Pillar 1: Mathematics */}
              <div className="p-5 rounded-xl bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-3">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Zap className="w-4 h-4 text-[var(--theme-accent)]" />
                  <span>Mathematics Alignment</span>
                </div>
                <p className="leading-relaxed">
                  Students from <strong>CBSE, IB Math AA HL, or Cambridge A-Levels</strong> have already studied topics far beyond the SAT syllabus (differential equations, complex numbers, matrices, calculus).
                </p>
                <div className="p-3 rounded bg-amber-950/20 border border-amber-500/30 text-amber-200">
                  <strong>The Real Trap:</strong> The SAT Math stops at Algebra II, trigonometry, and basic statistics. International students do not lose points because the math is hard; they lose points due to word-problem linguistic parsing, time constraints, and failing to use built-in Desmos shortcuts.
                </div>
              </div>

              {/* Pillar 2: Reading & Writing */}
              <div className="p-5 rounded-xl bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-3">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Reading & Writing Alignment</span>
                </div>
                <p className="leading-relaxed">
                  Students in literature-intensive curricula (<strong>IB English A, Cambridge A-Level Literature, ICSE</strong>) transition rapidly to SAT Reading & Writing and score 700+ with minimal ramp-up.
                </p>
                <div className="p-3 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-stone-300">
                  <strong>Rote-Board Adaptation:</strong> Students from national boards focused on grammar rules must practice timed synthesis of historical arguments, rhetorical shifts, and scientific hypothesis charts.
                </div>
              </div>

              {/* Pillar 3: External AP Exams */}
              <div className="p-5 rounded-xl bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-3">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span>APs for Non-AP Students</span>
                </div>
                <p className="leading-relaxed">
                  International students from standard state or national boards can register independently for external May <strong>Advanced Placement (AP) exams</strong>.
                </p>
                <div className="p-3 rounded bg-blue-950/20 border border-blue-500/30 text-blue-200">
                  <strong>Strategic Advantage:</strong> Earning a 5 on AP Calculus BC, AP Physics C, or AP Microeconomics provides indisputable validation of academic rigor, offsetting unfamiliarity with your national board.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--theme-border)] flex flex-wrap gap-3">
              <button
                onClick={onGoToTestingHub}
                className="px-4 py-2.5 bg-[var(--theme-accent)] text-stone-950 font-bold text-xs rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Go to Standardized Testing Hub</span>
              </button>

              <button
                onClick={onGoToTracker}
                className="px-4 py-2.5 bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white border border-[var(--theme-border)] font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Add Transcript Deadlines to Tracker</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
