import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  BookmarkCheck,
  Plus,
  ShieldCheck,
  Sparkles,
  Info,
  ExternalLink,
  ChevronRight,
  Filter,
  Check,
  Layers
} from 'lucide-react';
import {
  ALL_UPCOMING_SAT_DATES,
  ALL_UPCOMING_TOEFL_DATES,
  ALL_UPCOMING_IELTS_DATES,
  FUTURE_EXAM_POLICY_UPDATES,
  UpcomingExamDate
} from '../data/upcomingExamsData';

interface UpcomingExamDatesProps {
  onGoToTimeline?: () => void;
  onCountChange?: (count: number) => void;
}

export const UpcomingExamDates: React.FC<UpcomingExamDatesProps> = ({
  onGoToTimeline,
  onCountChange,
}) => {
  const [yearFilter, setYearFilter] = useState<'All' | '2026-2027' | '2027-2028'>('2026-2027');
  const [examFilter, setExamFilter] = useState<'All' | 'SAT' | 'TOEFL' | 'IELTS'>('All');
  const [seasonFilter, setSeasonFilter] = useState<string>('All');
  const [targetIntake, setTargetIntake] = useState<'fall2027' | 'fall2028' | 'spring2028'>('fall2027');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Combine dates
  const allDates: UpcomingExamDate[] = [
    ...ALL_UPCOMING_SAT_DATES,
    ...ALL_UPCOMING_TOEFL_DATES,
    ...ALL_UPCOMING_IELTS_DATES
  ].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Filter dates
  const filteredDates = allDates.filter((item) => {
    if (yearFilter !== 'All' && item.academicYear !== yearFilter) return false;
    if (examFilter !== 'All' && item.exam !== examFilter) return false;
    if (seasonFilter !== 'All' && item.season !== seasonFilter) return false;
    return true;
  });

  // Add date to localStorage timeline
  const handleAddToTimeline = (examDate: UpcomingExamDate) => {
    try {
      const saved = localStorage.getItem('globalpath_milestones');
      let currentMilestones: any[] = [];
      if (saved) {
        currentMilestones = JSON.parse(saved);
      }

      // Check if already exists
      const existing = currentMilestones.find((m) => m.id === examDate.id);
      if (!existing) {
        const newMilestone = {
          id: examDate.id,
          title: `${examDate.exam} Exam: ${examDate.displayDate}`,
          date: examDate.date,
          category: examDate.exam === 'SAT' ? 'SAT Exam' : examDate.exam === 'TOEFL' ? 'TOEFL Exam' : 'IELTS Exam',
          completed: false,
          notes: `Registration Deadline: ${examDate.regularDeadline}. Late Deadline: ${examDate.lateDeadline}. Expected Score Release: ${examDate.scoreReleaseDate}. Target: ${examDate.targetIntake}. Academic Year: ${examDate.academicYear}.`,
          priority: examDate.status === 'Priority Deadline' ? 'High' : 'Medium',
          reminderDays: 14,
        };

        const updated = [...currentMilestones, newMilestone];
        localStorage.setItem('globalpath_milestones', JSON.stringify(updated));
        onCountChange?.(updated.length);
      }

      setAddedIds((prev) => ({ ...prev, [examDate.id]: true }));
      setTimeout(() => {
        setAddedIds((prev) => ({ ...prev, [examDate.id]: false }));
      }, 3000);
    } catch (err) {
      console.error('Error adding milestone to timeline:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header and Sub-navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <Calendar className="w-3.5 h-3.5" />
          <span>Official Registration Calendars</span>
          <span aria-hidden="true">·</span>
          <span>Academic Years 2026–2027 & 2027–2028 Testing Schedules</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          Latest Exam Dates & Schedules (2026–2027 & 2027–2028)
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Plan your testing runway across the **2026–2027** and **2027–2028** academic admission cycles. Review registration deadlines, late cutoffs, score release timelines, and test-optional/test-mandatory university policies. Add any date to your personalized Timeline Tracker with one click.
        </p>

        {/* Academic Year Cycle Switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 rounded-xl border border-stone-200 w-fit">
          <span className="text-xs font-bold text-stone-500 px-2 uppercase">Testing Cycle:</span>
          {[
            { id: '2026-2027', label: '2026–2027 Cycle (Fall 2027 Admissions)' },
            { id: '2027-2028', label: '2027–2028 Cycle (Fall 2028 Admissions)' },
            { id: 'All', label: 'All Future Cycles (Combined)' },
          ].map((y) => (
            <button
              key={y.id}
              onClick={() => setYearFilter(y.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                yearFilter === y.id
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              {y.label}
            </button>
          ))}
        </div>

        {/* Filter controls: Exam Type & Season */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/60 pt-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: 'All Exam Types' },
              { id: 'SAT', label: 'Digital SAT Dates' },
              { id: 'TOEFL', label: 'TOEFL iBT Dates' },
              { id: 'IELTS', label: 'IELTS Academic Dates' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setExamFilter(f.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  examFilter === f.id
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="font-semibold">Season:</span>
            <select
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              className="py-1 px-2.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="All">All Seasons</option>
              <option value="Fall">Fall (Sept – Nov)</option>
              <option value="Winter">Winter (Dec – Feb)</option>
              <option value="Spring">Spring (Mar – May)</option>
              <option value="Summer">Summer (Jun – Aug)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Target Intake Strategic Test Planner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Target Admissions Runway Calculator</span>
            </span>
            <h3 className="text-xl font-bold text-stone-900 font-serif-display mt-0.5">
              Which test dates correspond to your intended start term?
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'fall2027', label: 'Fall 2027 Admissions (Seniors)' },
              { id: 'spring2028', label: 'Spring 2028 Intake' },
              { id: 'fall2028', label: 'Fall 2028 Admissions (Juniors)' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTargetIntake(t.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  targetIntake === t.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Advice based on Intake */}
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          {targetIntake === 'fall2027' ? (
            <>
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1">
                <span className="text-xs font-bold text-amber-900 uppercase">Primary Early SAT Target</span>
                <p className="text-sm font-bold text-stone-900">October 3, 2026</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Last viable test date for US November 1 Early Decision 1 (ED1) and Early Action (EA). Scores release October 16.
                </p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="text-xs font-bold text-stone-600 uppercase">Final Regular Decision SAT</span>
                <p className="text-sm font-bold text-stone-900">December 5, 2026</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Guarantees score delivery before January 1–15 Regular Decision deadlines for Harvard, Yale, Columbia, and Stanford.
                </p>
              </div>
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-900 uppercase">Recommended TOEFL Window</span>
                <p className="text-sm font-bold text-stone-900">Oct 10 – Nov 14, 2026</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Fulfills October 15 Oxford/Cambridge UCAS and November 1 US requirements with 4–8 day reporting turnaround.
                </p>
              </div>
            </>
          ) : targetIntake === 'spring2028' ? (
            <>
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1">
                <span className="text-xs font-bold text-amber-900 uppercase">Primary SAT Sitting</span>
                <p className="text-sm font-bold text-stone-900">March 13 or May 8, 2027</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Ensures all scores are finalized before July 1 Spring application deadlines and rolling evaluations.
                </p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="text-xs font-bold text-stone-600 uppercase">Final Spring SAT Retake</span>
                <p className="text-sm font-bold text-stone-900">June 5, 2027</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Scores release June 18, 2027, meeting final late Spring intake cutoff files.
                </p>
              </div>
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-900 uppercase">Recommended TOEFL Target</span>
                <p className="text-sm font-bold text-stone-900">March 20 – May 15, 2027</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Allows adequate buffer to obtain university unconditional offer and clear summer student visa processing.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1">
                <span className="text-xs font-bold text-amber-900 uppercase">Junior Diagnostic SAT</span>
                <p className="text-sm font-bold text-stone-900">March 13, 2027</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Take in Grade 11 / Year 12 to establish your baseline score. Retake in May or June if aiming for 1550+.
                </p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="text-xs font-bold text-stone-600 uppercase">Senior Kickoff SAT</span>
                <p className="text-sm font-bold text-stone-900">August 28 or Oct 2, 2027</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Lock in your score before senior fall workload and college essay drafting begins.
                </p>
              </div>
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-900 uppercase">Recommended TOEFL Target</span>
                <p className="text-sm font-bold text-stone-900">July 17 – Sept 11, 2027</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Prepare over summer vacation when free from high school coursework; scores remain valid for 24 months.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Grid: Official Test Dates */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-serif-display flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-700" />
              <span>
                Official Testing Schedules ({filteredDates.length} Dates Available for {yearFilter})
              </span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Dates match official College Board Bluebook & ETS International test administrations.
            </p>
          </div>
          {onGoToTimeline && (
            <button
              onClick={onGoToTimeline}
              className="text-xs text-stone-700 hover:text-stone-950 flex items-center gap-1 font-semibold underline cursor-pointer"
            >
              <span>View in Timeline Tracker</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {filteredDates.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:border-stone-300 transition-all space-y-4"
            >
              {/* Header: Exam Tag, Display Date, Status */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase ${
                      item.exam === 'SAT'
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : item.exam === 'TOEFL'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    }`}>
                      {item.exam === 'SAT' ? 'Digital SAT' : item.exam === 'TOEFL' ? 'TOEFL iBT' : 'IELTS Academic'}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono">
                      Cycle {item.academicYear}
                    </span>
                    <span className="text-xs font-medium text-stone-500">
                      {item.dayOfWeek} · {item.season}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 font-serif-display">
                    {item.displayDate}
                  </h4>
                </div>

                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  item.status === 'Priority Deadline'
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Deadlines Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
                <div>
                  <span className="block text-[10px] text-stone-500 uppercase font-semibold">
                    Regular Registration
                  </span>
                  <span className="font-bold text-stone-800 mt-0.5 block">
                    {item.regularDeadline}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-500 uppercase font-semibold">
                    Late Reg (Fee)
                  </span>
                  <span className="font-bold text-stone-800 mt-0.5 block">
                    {item.lateDeadline}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-500 uppercase font-semibold">
                    Score Release
                  </span>
                  <span className="font-bold text-amber-800 mt-0.5 block">
                    {item.scoreReleaseDate}
                  </span>
                </div>
              </div>

              {/* Relevance & Note */}
              <div className="text-xs text-stone-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                  <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Target: {item.targetIntake}</span>
                </div>
                <p className="text-stone-500 leading-relaxed pl-5">
                  {item.notes}
                </p>
              </div>

              {/* Action: Add to Application Timeline */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <a
                  href={
                    item.exam === 'SAT'
                      ? 'https://satsuite.collegeboard.org/sat/registration/dates-deadlines'
                      : item.exam === 'TOEFL'
                      ? 'https://www.ets.org/toefl/test-takers/ibt/schedule.html'
                      : 'https://ielts.idp.com'
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 transition-colors"
                >
                  <span>Register on Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleAddToTimeline(item)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    addedIds[item.id]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {addedIds[item.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Tracker!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to My Timeline</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Policy Updates & Testing Protocols for 2026–2028 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-stone-900 font-serif-display flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <span>Crucial Exam Architecture & Policy Updates for 2026–2027 & 2027–2028</span>
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FUTURE_EXAM_POLICY_UPDATES.map((policy, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800 uppercase font-mono">
                    {policy.category}
                  </span>
                  <span className="text-[11px] text-amber-800 font-semibold">{policy.effectiveDate}</span>
                </div>
                <h4 className="text-base font-bold text-stone-900 font-serif-display">
                  {policy.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {policy.summary}
                </p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                <strong className="block text-[11px] uppercase font-bold text-amber-900">
                  Student Action Required:
                </strong>
                <p className="text-stone-700 leading-relaxed text-[11px]">
                  {policy.actionRequired}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
