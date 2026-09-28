import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Sparkles,
  Award,
  Filter,
  Layers,
  BookOpen,
  DollarSign,
  GraduationCap,
  ShieldCheck,
  Plane,
  ChevronRight,
  RotateCcw,
  Check,
  Edit2,
  FileDown,
  Copy,
  AlertTriangle,
  FileText,
  UserCheck,
  Building,
  Zap,
  HelpCircle
} from 'lucide-react';
import { exportTimelineToPdf } from '../utils/exportTimelinePdf';

export interface TimelineDeadlineItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: 'Exam Date' | 'Application Deadline' | 'Financial Aid' | 'Visa & Travel' | 'Document & Essay';
  university?: string;
  reminderNote?: string;
  completed?: boolean;
}

export interface ShortlistedUniversity {
  id: string;
  name: string;
  country: string;
  portal: string;
  deadline: string;
  status: 'Researching' | 'Drafting' | 'Submitted' | 'Accepted' | 'Waitlisted';
  targetSat: string;
  targetToefl: string;
}

export interface AdmissionRoundAlert {
  roundName: string;
  shortCode: string;
  typicalDeadline: string;
  bindingNature: 'Binding Agreement' | 'Non-Binding' | 'Rolling Evaluation';
  decisionRelease: string;
  strategicPros: string;
  internationalRisks: string;
  sampleColleges: string[];
}

export const ADMISSION_ROUND_ALERTS: AdmissionRoundAlert[] = [
  {
    roundName: 'Early Decision I (ED I)',
    shortCode: 'ED I',
    typicalDeadline: 'November 1 (Annually)',
    bindingNature: 'Binding Agreement',
    decisionRelease: 'Mid-December (Dec 12–15)',
    strategicPros: 'Significantly higher acceptance rates (often 2x–3x Regular Decision). Demonstrates maximum demonstrated interest.',
    internationalRisks: 'CRITICAL RISK FOR FINANCIAL AID: You are legally bound to enroll before seeing your financial aid package. Only apply ED to a Need-Blind school (Harvard, Princeton, MIT, Yale, Dartmouth, Amherst, Bowdoin) or if your family can afford full tuition without aid.',
    sampleColleges: ['Dartmouth', 'Brown', 'Columbia', 'Penn', 'Duke', 'Northwestern', 'Cornell', 'Amherst']
  },
  {
    roundName: 'Early Action (EA / REA)',
    shortCode: 'EA',
    typicalDeadline: 'November 1 / November 15',
    bindingNature: 'Non-Binding',
    decisionRelease: 'Mid-December to January',
    strategicPros: 'Hear back early without any legal commitment to attend. Allows comparing financial aid packages in the spring.',
    internationalRisks: 'Single-Choice / Restrictive Early Action (REA) at Harvard, Princeton, Yale, and Stanford forbids applying Early Decision to any private US university.',
    sampleColleges: ['MIT (Non-Binding EA)', 'Harvard (REA)', 'Stanford (REA)', 'Purdue (Priority EA)', 'Georgia Tech', 'Caltech']
  },
  {
    roundName: 'University of California (UC) Filing Window',
    shortCode: 'UC System',
    typicalDeadline: 'November 30 (Strict annual system close)',
    bindingNature: 'Non-Binding',
    decisionRelease: 'Throughout March',
    strategicPros: 'Single unified application covers all 9 UC campuses (Berkeley, UCLA, UCSD, etc.). Completely Test-Blind (no SAT/ACT required).',
    internationalRisks: 'Hard non-negotiable deadline of Nov 30; no extensions granted. Zero need-based financial aid for non-California residents.',
    sampleColleges: ['UC Berkeley', 'UCLA', 'UC San Diego', 'UC Santa Barbara', 'UC Irvine', 'UC Davis']
  },
  {
    roundName: 'Early Decision II (ED II)',
    shortCode: 'ED II',
    typicalDeadline: 'January 1 to January 15',
    bindingNature: 'Binding Agreement',
    decisionRelease: 'Mid-February',
    strategicPros: 'Second chance at binding early admissions boost if deferred or rejected from your November ED I choice.',
    internationalRisks: 'Same financial aid lock-in as ED I. Must immediately withdraw all other pending Regular Decision applications upon acceptance.',
    sampleColleges: ['NYU', 'University of Chicago', 'Vanderbilt', 'Emory', 'Boston University', 'Tufts']
  },
  {
    roundName: 'Regular Decision (RD)',
    shortCode: 'RD',
    typicalDeadline: 'January 1 to January 15',
    bindingNature: 'Non-Binding',
    decisionRelease: 'Late March (Ivy Day: late March)',
    strategicPros: 'Allows applying to unlimited universities, including fall semester senior grades to prove academic momentum.',
    internationalRisks: 'Lowest historical acceptance rates of any round due to massive international applicant pool density.',
    sampleColleges: ['All Ivy League institutions', 'Stanford', 'MIT', 'UT Austin', 'Northwestern']
  },
  {
    roundName: 'Rolling Admissions',
    shortCode: 'Rolling',
    typicalDeadline: 'October through July (Until seats fill)',
    bindingNature: 'Rolling Evaluation',
    decisionRelease: '2 to 6 weeks after submission',
    strategicPros: 'Rapid decisions; seats evaluated on a first-come, first-served basis. Great safeties to lock in an admission early.',
    internationalRisks: 'Applying late (after January) severely reduces chances for competitive STEM majors, university housing, and merit scholarships.',
    sampleColleges: ['Purdue University', 'Penn State', 'Arizona State', 'University of Pittsburgh', 'Michigan State']
  }
];

const DEFAULT_TIMELINE_PRESETS: Record<string, TimelineDeadlineItem[]> = {
  fall2026: [
    {
      id: 'p1',
      title: 'Digital SAT Exam Date (Fall Administration)',
      date: '2025-10-04',
      category: 'Exam Date',
      reminderNote: 'Registration closes 3 weeks prior. Take full Bluebook practice test #4 beforehand.'
    },
    {
      id: 'p2',
      title: 'TOEFL iBT Examination Date',
      date: '2025-10-18',
      category: 'Exam Date',
      reminderNote: 'Ensure passport is valid. Scores take 4-8 business days to reach admissions.'
    },
    {
      id: 'p3',
      title: 'Early Decision / Early Action (ED/EA) Deadline',
      date: '2025-11-01',
      category: 'Application Deadline',
      reminderNote: 'Primary choice university. Ensure counselor submits transcripts and school report.'
    },
    {
      id: 'p4',
      title: 'CSS Profile & Institutional Aid Priority Filing',
      date: '2025-11-15',
      category: 'Financial Aid',
      reminderNote: 'Upload parent tax returns, bank solvency statements, and W-2 equivalents.'
    },
    {
      id: 'p5',
      title: 'Regular Decision (RD) Applications Deadline',
      date: '2026-01-05',
      category: 'Application Deadline',
      reminderNote: 'Submit Common App, Coalition, and UCAS forms before 11:59 PM local timezone.'
    },
    {
      id: 'p6',
      title: 'Final Decision Day & Enrollment Deposit',
      date: '2026-05-01',
      category: 'Application Deadline',
      reminderNote: 'National Candidates Reply Date. Accept single offer, pay tuition deposit, request Form I-20 / CAS.'
    },
    {
      id: 'p7',
      title: 'Student Visa Interview & SEVIS Submission',
      date: '2026-06-15',
      category: 'Visa & Travel',
      reminderNote: 'Pay SEVIS fee ($350) and book consular appointment at US Embassy.'
    }
  ],
  earlySprint: [
    {
      id: 'es1',
      title: 'Final SAT Attempt for Early Rounds',
      date: '2025-10-04',
      category: 'Exam Date',
      reminderNote: 'Last exam date eligible for Nov 1 Early Action / Early Decision.'
    },
    {
      id: 'es2',
      title: 'Request Teacher Letters of Recommendation',
      date: '2025-10-10',
      category: 'Document & Essay',
      reminderNote: 'Provide counselors and 2 teachers with your brag sheet and resume.'
    },
    {
      id: 'es3',
      title: 'Finalize Common App 650-Word Personal Essay',
      date: '2025-10-20',
      category: 'Document & Essay',
      reminderNote: 'Proofread with English faculty and college counselor.'
    },
    {
      id: 'es4',
      title: 'Binding Early Decision (ED) Submission',
      date: '2025-11-01',
      category: 'Application Deadline',
      reminderNote: 'Sign Early Decision agreement with parent and counselor.'
    },
    {
      id: 'es5',
      title: 'ED Admission Results Released',
      date: '2025-12-15',
      category: 'Application Deadline',
      reminderNote: 'Check university applicant portal at 7:00 PM EST.'
    }
  ],
  germanWinter: [
    {
      id: 'gw1',
      title: 'Uni-Assist Vorprüfungsdokumentation (VPD) Submission',
      date: '2026-05-15',
      category: 'Document & Essay',
      reminderNote: 'Requires 4-6 weeks for evaluation of international high school certificates.'
    },
    {
      id: 'gw2',
      title: 'German Public University Application Cutoff',
      date: '2026-07-15',
      category: 'Application Deadline',
      reminderNote: 'Hard deadline for Technical University of Munich (TUM), RWTH Aachen, and LMU.'
    },
    {
      id: 'gw3',
      title: 'Open German Blocked Account (Sperrkonto)',
      date: '2026-08-01',
      category: 'Financial Aid',
      reminderNote: 'Deposit mandatory €11,904 into Expatrio or Fintiba.'
    },
    {
      id: 'gw4',
      title: 'German National Student Visa (Type D) Appointment',
      date: '2026-08-20',
      category: 'Visa & Travel',
      reminderNote: 'Submit university admission letter + blocked account certificate.'
    }
  ]
};

const DEFAULT_MILESTONES = [
  { id: 'sat_diag', category: 'Standardized Exams', title: 'Take full-length Digital SAT diagnostic on College Board Bluebook' },
  { id: 'sat_book', category: 'Standardized Exams', title: 'Register for official SAT exam date (Spring/Summer)' },
  { id: 'sat_target', category: 'Standardized Exams', title: 'Achieve target score (1450+ or 1500+)' },
  { id: 'toefl_book', category: 'Standardized Exams', title: 'Register and complete TOEFL iBT (Target: 100+)' },
  { id: 'shortlist', category: 'College Selection', title: 'Finalize balanced 10–12 university list (Reaches, Targets, Safeties)' },
  { id: 'commonapp', category: 'Portals & Profiles', title: 'Create Common App & UCAS student accounts' },
  { id: 'sop_draft1', category: 'Essays & Dossier', title: 'Write first rough draft of Common App Personal Statement (650 words)' },
  { id: 'sop_revision', category: 'Essays & Dossier', title: 'Complete 3+ rounds of SOP revision with counselors/teachers' },
  { id: 'lor_request', category: 'Essays & Dossier', title: 'Request 2 Academic Letters of Recommendation + provide Brag Sheets' },
  { id: 'transcripts', category: 'Documents', title: 'Request official high school transcripts and counselor school report' },
  { id: 'supplements', category: 'Essays & Dossier', title: 'Draft college-specific supplemental essays (Why this college/major)' },
  { id: 'css_profile', category: 'Financial Aid', title: 'Complete CSS Profile and gather parent tax return certificates' },
  { id: 'apps_submit', category: 'Submissions', title: 'Submit all Early Action / Early Decision / Regular Decision applications' },
  { id: 'portal_check', category: 'Submissions', title: 'Check university Applicant Status Portals for missing documents' },
  { id: 'i20_receive', category: 'Visa & Departure', title: 'Accept admission offer, pay deposit & receive Form I-20 / CAS Letter' },
  { id: 'visa_appointment', category: 'Visa & Departure', title: 'Pay SEVIS / Visa fee and book student visa interview appointment' },
  { id: 'housing', category: 'Visa & Departure', title: 'Secure on-campus student housing & complete campus medical immunization' },
  { id: 'pre_departure', category: 'Visa & Departure', title: 'Book international flight tickets & connect with international student office' },
];

export const ApplicationTracker: React.FC<{ onCountChange?: (count: number) => void }> = ({ onCountChange }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'rounds' | 'checklist-gen' | 'shortlist' | 'checklist'>('timeline');

  // Document Checklist Generator State
  const [docCurriculum, setDocCurriculum] = useState<string>('CBSE');
  const [docTargetCountry, setDocTargetCountry] = useState<string>('USA');
  const [copiedDocChecklist, setCopiedDocChecklist] = useState<boolean>(false);

  // Timeline Deadlines State
  const [timelineItems, setTimelineItems] = useState<TimelineDeadlineItem[]>(() => {
    try {
      const saved = localStorage.getItem('globalpath_custom_deadlines');
      return saved ? JSON.parse(saved) : DEFAULT_TIMELINE_PRESETS.fall2026;
    } catch {
      return DEFAULT_TIMELINE_PRESETS.fall2026;
    }
  });

  // Shortlisted Universities State
  const [universities, setUniversities] = useState<ShortlistedUniversity[]>(() => {
    try {
      const saved = localStorage.getItem('globalpath_universities');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 18-step checklist completed IDs
  const [completedMilestones, setCompletedMilestones] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('globalpath_milestones');
      return saved ? JSON.parse(saved) : ['sat_diag'];
    } catch {
      return ['sat_diag'];
    }
  });

  // Form states for adding custom deadline
  const [showAddDeadlineModal, setShowAddDeadlineModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState<TimelineDeadlineItem['category']>('Application Deadline');
  const [newReminder, setNewReminder] = useState('');
  const [newUni, setNewUni] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  // Save updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('globalpath_custom_deadlines', JSON.stringify(timelineItems));
    } catch {
      // ignore
    }
  }, [timelineItems]);

  useEffect(() => {
    try {
      localStorage.setItem('globalpath_universities', JSON.stringify(universities));
    } catch {
      // ignore
    }
  }, [universities]);

  useEffect(() => {
    try {
      localStorage.setItem('globalpath_milestones', JSON.stringify(completedMilestones));
      if (onCountChange) {
        onCountChange(completedMilestones.length);
      }
    } catch {
      // ignore
    }
  }, [completedMilestones, onCountChange]);

  const toggleDeadlineCompleted = (id: string) => {
    setTimelineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const removeDeadlineItem = (id: string) => {
    setTimelineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) return;

    const newItem: TimelineDeadlineItem = {
      id: `custom_${Date.now()}`,
      title: newTitle.trim(),
      date: newDate,
      category: newCategory,
      university: newUni.trim() || undefined,
      reminderNote: newReminder.trim() || undefined,
      completed: false,
    };

    setTimelineItems((prev) => [...prev, newItem].sort((a, b) => a.date.localeCompare(b.date)));
    setNewTitle('');
    setNewDate('');
    setNewReminder('');
    setNewUni('');
    setShowAddDeadlineModal(false);
  };

  const loadPresetTimeline = (presetKey: string) => {
    if (DEFAULT_TIMELINE_PRESETS[presetKey]) {
      setTimelineItems(DEFAULT_TIMELINE_PRESETS[presetKey]);
    }
  };

  const toggleMilestone = (id: string) => {
    setCompletedMilestones((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getDaysRemaining = (targetDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Next upcoming urgent deadline
  const nextUpcoming = useMemo(() => {
    const uncompleted = timelineItems
      .filter((item) => !item.completed)
      .sort((a, b) => a.date.localeCompare(b.date));
    return uncompleted[0] || null;
  }, [timelineItems]);

  const urgentCount = useMemo(() => {
    return timelineItems.filter((item) => {
      if (item.completed) return false;
      const days = getDaysRemaining(item.date);
      return days >= 0 && days <= 30;
    }).length;
  }, [timelineItems]);

  const filteredItems = useMemo(() => {
    if (filterCategory === 'All') return timelineItems;
    return timelineItems.filter((i) => i.category === filterCategory);
  }, [timelineItems, filterCategory]);

  const handleExportPdf = () => {
    setIsExporting(true);
    try {
      exportTimelineToPdf({
        timelineItems,
        universities,
        completedMilestones,
        totalChecklistMilestones: DEFAULT_MILESTONES
      });
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full max-w-full overflow-x-hidden">
      {/* Header and Sub-navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden space-y-4">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
              <Clock className="w-3.5 h-3.5" />
              <span>Stage 3 of the Admissions Journey</span>
              <span aria-hidden="true">·</span>
              <span>Intake Alerts & Document Architecture</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight font-serif-display text-white">
              Dynamic Application Tracker & Timeline Engine
            </h2>
            <p className="mt-2 text-stone-300 max-w-3xl text-sm sm:text-base leading-relaxed">
              Track deadlines across Early Decision (ED), Early Action (EA), UC System, and Regular Decision. Generate verified <strong>Document Checklists</strong> (transcripts, board marksheets, counselor vs. teacher LORs, ISFAA/CSS Profile, and SOP vs. Personal Essay) tailored to your curriculum.
            </p>
          </div>

          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="px-4 py-2.5 bg-[var(--theme-accent)] text-stone-950 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm shrink-0 self-start md:self-auto cursor-pointer"
            title="Download saved milestones and deadlines as a PDF document for offline reference"
          >
            <FileDown className="w-4 h-4 text-stone-950" />
            <span>{isExporting ? 'Generating PDF...' : 'Export Timeline as PDF'}</span>
          </button>
        </div>

        {exportSuccess && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Your admissions timeline, deadlines & university shortlist have been exported to <strong>GlobalPath_Admissions_Timeline_Roadmap.pdf</strong>!
            </span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--theme-border)] pt-4">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-xs'
                : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>1. Personalized Timeline & Deadlines</span>
            {urgentCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-mono">
                {urgentCount} Urgent
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('rounds')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'rounds'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-xs'
                : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>2. Intake & Round Alerts Engine (ED / EA / UC / RD)</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist-gen')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'checklist-gen'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-xs'
                : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Document Checklist Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('shortlist')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'shortlist'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-xs'
                : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>4. Shortlisted Colleges ({universities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'checklist'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-xs'
                : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>5. 18-Step Application Milestones</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Personalized Timeline & Deadlines */}
      {activeTab === 'timeline' && (
        <div className="space-y-8">
          {/* Urgent Next Deadline Banner */}
          {nextUpcoming && (
            <div className="p-5 bg-stone-900 text-white rounded-2xl border border-stone-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>NEXT UPCOMING TARGET MILESTONE</span>
                </div>
                <h3 className="text-xl font-bold font-serif-display text-white">
                  {nextUpcoming.title}
                </h3>
                <p className="text-xs text-stone-300">
                  Target Date: <strong>{nextUpcoming.date}</strong> {nextUpcoming.reminderNote && `· ${nextUpcoming.reminderNote}`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center p-3 bg-stone-800 rounded-xl border border-stone-700">
                  <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    {getDaysRemaining(nextUpcoming.date)}
                  </div>
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Days Remaining</div>
                </div>
                <button
                  onClick={() => toggleDeadlineCompleted(nextUpcoming.id)}
                  className="px-3.5 py-2 text-xs font-semibold bg-amber-400 text-stone-950 rounded-lg hover:bg-amber-300 transition-colors shrink-0 cursor-pointer"
                >
                  Mark Complete
                </button>
              </div>
            </div>
          )}

          {/* Quick Presets & Add Deadline Toolbar */}
          <div className="theme-card p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-semibold text-stone-400">Quick Cycle Presets:</span>
              <button
                onClick={() => loadPresetTimeline('fall2026')}
                className="px-3 py-1.5 rounded bg-[var(--theme-surface-subtle)] hover:bg-[var(--theme-surface-elevated)] text-stone-200 border border-[var(--theme-border)] font-medium transition-colors cursor-pointer"
              >
                Fall 2026 Regular Cycle
              </button>
              <button
                onClick={() => loadPresetTimeline('earlySprint')}
                className="px-3 py-1.5 rounded bg-[var(--theme-surface-subtle)] hover:bg-[var(--theme-surface-elevated)] text-stone-200 border border-[var(--theme-border)] font-medium transition-colors cursor-pointer"
              >
                Early Action / Decision Sprint
              </button>
              <button
                onClick={() => loadPresetTimeline('germanWinter')}
                className="px-3 py-1.5 rounded bg-[var(--theme-surface-subtle)] hover:bg-[var(--theme-surface-elevated)] text-stone-200 border border-[var(--theme-border)] font-medium transition-colors cursor-pointer"
              >
                German Uni-Assist Cycle
              </button>
            </div>

            <button
              onClick={() => setShowAddDeadlineModal(true)}
              className="px-4 py-2 bg-[var(--theme-accent)] text-stone-950 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Milestone</span>
            </button>
          </div>

          {/* Add Deadline Modal / Form Drawer */}
          {showAddDeadlineModal && (
            <form onSubmit={handleAddDeadline} className="theme-card p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--theme-accent)]" />
                  <span>Add Target Exam Date or Application Deadline</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddDeadlineModal(false)}
                  className="text-stone-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Milestone Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SAT October Exam / Harvard RD Deadline"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 border border-[var(--theme-border)] rounded-lg bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Target Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 border border-[var(--theme-border)] rounded-lg bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs sm:text-sm p-2.5 border border-[var(--theme-border)] rounded-lg bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                  >
                    <option value="Exam Date">Exam Date</option>
                    <option value="Application Deadline">Application Deadline</option>
                    <option value="Financial Aid">Financial Aid</option>
                    <option value="Document & Essay">Document & Essay</option>
                    <option value="Visa & Travel">Visa & Travel</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    University / Program (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stanford University / Common App"
                    value={newUni}
                    onChange={(e) => setNewUni(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 border border-[var(--theme-border)] rounded-lg bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Reminder Note / Actionable Advice (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Request recommendation 4 weeks prior"
                    value={newReminder}
                    onChange={(e) => setNewReminder(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 border border-[var(--theme-border)] rounded-lg bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDeadlineModal(false)}
                  className="px-4 py-2 border border-[var(--theme-border)] rounded-lg text-xs font-semibold text-stone-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[var(--theme-accent)] text-stone-950 rounded-lg text-xs font-bold hover:opacity-90"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          )}

          {/* Deadlines List */}
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const days = getDaysRemaining(item.date);
              const isUrgent = days >= 0 && days <= 30 && !item.completed;
              const isPassed = days < 0 && !item.completed;

              return (
                <div
                  key={item.id}
                  className={`theme-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    item.completed ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={() => toggleDeadlineCompleted(item.id)}
                      className="mt-0.5 text-stone-400 hover:text-[var(--theme-accent)] transition-colors cursor-pointer shrink-0"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-500" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-[var(--theme-accent)] font-semibold">
                          {item.category}
                        </span>
                        {item.university && (
                          <span className="text-xs text-stone-300 font-medium">
                            {item.university}
                          </span>
                        )}
                        {isUrgent && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30">
                            {days === 0 ? 'DUE TODAY' : `${days} DAYS LEFT`}
                          </span>
                        )}
                        {isPassed && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-stone-800 text-stone-400">
                            PASSED
                          </span>
                        )}
                      </div>

                      <h4 className={`text-base font-bold text-white font-serif-display ${item.completed ? 'line-through text-stone-500' : ''}`}>
                        {item.title}
                      </h4>

                      <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
                        <span className="flex items-center gap-1 text-stone-300">
                          <Calendar className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                          {item.date}
                        </span>
                        {item.reminderNote && (
                          <>
                            <span>·</span>
                            <span className="text-stone-300 italic font-sans">{item.reminderNote}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => toggleDeadlineCompleted(item.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                        item.completed
                          ? 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white'
                          : 'bg-[var(--theme-accent)] text-stone-950 font-bold hover:opacity-90'
                      }`}
                    >
                      {item.completed ? 'Undo' : 'Mark Done'}
                    </button>

                    <button
                      onClick={() => removeDeadlineItem(item.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-400 transition-colors rounded cursor-pointer"
                      title="Delete Milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Intake & Round Alerts Engine */}
      {activeTab === 'rounds' && (
        <div className="space-y-6">
          <div className="theme-card p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold font-serif-display text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--theme-accent)]" />
              <span>Admissions Rounds & Intake Deadlines Matrix</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
              Understanding the strategic trade-offs between binding Early Decision (ED), non-binding Early Action (EA), the strict University of California deadline, and Regular Decision (RD).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {ADMISSION_ROUND_ALERTS.map((rnd) => (
              <div
                key={rnd.shortCode}
                className="theme-card p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-[var(--theme-accent)] font-semibold">
                        {rnd.shortCode}
                      </span>
                      <h4 className="text-lg font-bold text-white font-serif-display mt-1">
                        {rnd.roundName}
                      </h4>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                      rnd.bindingNature === 'Binding Agreement'
                        ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {rnd.bindingNature}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] text-xs space-y-1.5">
                    <div><strong>Typical Filing Deadline:</strong> <span className="font-mono text-white">{rnd.typicalDeadline}</span></div>
                    <div><strong>Decision Release:</strong> <span className="font-mono text-[var(--theme-accent)]">{rnd.decisionRelease}</span></div>
                  </div>

                  <div className="space-y-2 text-xs text-stone-300">
                    <div>
                      <strong className="text-emerald-400 block mb-0.5">Strategic Advantage:</strong>
                      <p className="text-[11px] leading-relaxed">{rnd.strategicPros}</p>
                    </div>

                    <div className="pt-2 border-t border-[var(--theme-border)]">
                      <strong className="text-rose-400 block mb-0.5">International Student Risk:</strong>
                      <p className="text-[11px] leading-relaxed">{rnd.internationalRisks}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--theme-border)] text-[11px] text-stone-400">
                  <strong className="text-stone-300 block">Prominent Adopters:</strong>
                  <span>{rnd.sampleColleges.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Document Checklist Generator */}
      {activeTab === 'checklist-gen' && (
        <div className="space-y-8">
          {/* Configurator Box */}
          <div className="theme-card p-6 sm:p-8 space-y-6">
            <div className="border-b border-[var(--theme-border)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-[var(--theme-accent)] uppercase tracking-wider font-semibold">
                  Personalized Application Dossier
                </span>
                <h3 className="text-xl font-bold font-serif-display text-white mt-0.5">
                  Document Checklist Generator for International Applicants
                </h3>
              </div>

              <button
                onClick={() => {
                  const summary = `[GlobalPath Document Checklist - ${docCurriculum} to ${docTargetCountry}]
1. Transcripts & Board Marksheets:
• 4-Year Academic Transcripts (Grades 9, 10, 11, and 12 Mid-Term)
• Official Board Certificates (CBSE/ICSE Class 10 Board marksheet / IGCSE / Brevet)
• Counselor Predicted Grades for Grade 12 external exams
2. Letters of Recommendation (LORs):
• Counselor Recommendation & School Profile Document
• STEM Teacher LOR (Math / Physics / Chemistry)
• Humanities / English Teacher LOR
3. Financial Verification Documents:
• College Board CSS Profile or ISFAA
• Bank Solvency Certificate stamped with liquid balance >= 1 year COA
• Parent Tax Returns / W-2 equivalents with certified English translation
4. Written Essays & Dossier:
• Statement of Purpose (SOP) or Common App Personal Statement (650 words)
• College-Specific Supplemental Essays`;
                  navigator.clipboard.writeText(summary);
                  setCopiedDocChecklist(true);
                  setTimeout(() => setCopiedDocChecklist(false), 2000);
                }}
                className="px-3.5 py-2 rounded-lg bg-[var(--theme-surface-subtle)] hover:bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-xs text-white font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedDocChecklist ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDocChecklist ? 'Checklist Copied!' : 'Copy Full Checklist'}</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Your High School Curriculum:
                </label>
                <select
                  value={docCurriculum}
                  onChange={(e) => setDocCurriculum(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                >
                  <option value="CBSE">Indian CBSE (Central Board of Secondary Education)</option>
                  <option value="CISCE">Indian CISCE (ICSE / ISC)</option>
                  <option value="IBDP">International Baccalaureate (IB Diploma)</option>
                  <option value="A_Levels">Cambridge International A-Levels</option>
                  <option value="French_Bac">French Baccalauréat</option>
                  <option value="US_Diploma">US High School Diploma + APs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Target Destination Country:
                </label>
                <select
                  value={docTargetCountry}
                  onChange={(e) => setDocTargetCountry(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                >
                  <option value="USA">United States (Common App / Coalition / QuestBridge)</option>
                  <option value="UK">United Kingdom (UCAS Direct Entry)</option>
                  <option value="Canada">Canada (OUAC / Direct Institutional Portals)</option>
                  <option value="Germany">Germany (Uni-Assist & TUMonline)</option>
                  <option value="Singapore">Singapore (NUS / NTU)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4 Pillars of the Dossier */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pillar 1: Transcripts & Marksheets */}
            <div className="theme-card p-6 space-y-4">
              <div className="flex items-center gap-2 font-bold text-white text-base font-serif-display border-b border-[var(--theme-border)] pb-3">
                <FileText className="w-5 h-5 text-[var(--theme-accent)]" />
                <span>1. Official vs. Unofficial Transcripts & Marksheets</span>
              </div>

              <div className="space-y-3 text-xs text-stone-300 leading-relaxed">
                <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                  <strong className="text-white block">Official vs. Unofficial Transcripts:</strong>
                  <p className="text-stone-400">
                    An "Official" transcript is submitted <strong>directly by your high school counselor or headmaster</strong> via electronic portal (Common App counselor portal, Naviance, Parchment, or Cialfo). Any PDF uploaded directly by the student is considered "Unofficial".
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                  <strong className="text-white block">Board Marksheet Specifics for {docCurriculum}:</strong>
                  <p className="text-stone-400">
                    {docCurriculum === 'CBSE' && 'Submit official Class 10 Board Exam Pass Certificate (AISSE) plus Class 9 & 11 school transcripts and Class 12 Predicted Board percentages.'}
                    {docCurriculum === 'CISCE' && 'Submit Class 10 ICSE official pass certificate & marksheet plus Class 11 internal transcript and Class 12 Predicted ISC scores.'}
                    {docCurriculum === 'IBDP' && 'Submit Grade 9 & 10 MYP or pre-IB transcripts, DP1 final transcripts, and official DP2 Predicted Grades (out of 45) signed by DP Coordinator.'}
                    {docCurriculum === 'A_Levels' && 'Submit certified IGCSE certificates (Grades 9-10), AS-Level marks, and official school Predicted A-Level grades signed by Headmaster.'}
                    {docCurriculum === 'French_Bac' && 'Submit official Bulletins de Notes for Seconde, Première, and Terminale with certified English translation.'}
                    {docCurriculum === 'US_Diploma' && 'Submit complete 4-year transcript with cumulative unweighted/weighted GPA and counselor School Profile.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2: Letters of Recommendation */}
            <div className="theme-card p-6 space-y-4">
              <div className="flex items-center gap-2 font-bold text-white text-base font-serif-display border-b border-[var(--theme-border)] pb-3">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <span>2. Letters of Recommendation (Counselor vs. Teachers)</span>
              </div>

              <div className="space-y-3 text-xs text-stone-300 leading-relaxed">
                <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                  <strong className="text-white block">Counselor Recommendation & School Report:</strong>
                  <p className="text-stone-400">
                    Provides macro-context: explains your school’s grading rigor, class rank policy, extracurricular offerings, and any extenuating family circumstances.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                  <strong className="text-white block">Academic Subject Teacher 1 (STEM) & 2 (Humanities):</strong>
                  <p className="text-stone-400">
                    Elite colleges prefer letters from teachers who taught you in 11th or 12th grade in core academic subjects (e.g., Calculus/Physics teacher + English/History teacher). Letters should cite specific classroom seminars, projects, and intellectual curiosity.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3: Financial Verification Documents */}
            <div className="theme-card p-6 space-y-4">
              <div className="flex items-center gap-2 font-bold text-white text-base font-serif-display border-b border-[var(--theme-border)] pb-3">
                <DollarSign className="w-5 h-5 text-amber-400" />
                <span>3. Financial Verification (CSS Profile, ISFAA, Bank Solvency)</span>
              </div>

              <div className="space-y-3 text-xs text-stone-300 leading-relaxed">
                <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                  <strong className="text-white block">CSS Profile vs. ISFAA:</strong>
                  <p className="text-stone-400">
                    Most private US universities use the College Board CSS Profile. Universities that do not charge CSS Profile submission fees provide the International Student Financial Aid Application (ISFAA) as a free downloadable PDF.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                  <strong className="text-white block">Bank Solvency Letters for Visa & Form I-20:</strong>
                  <p className="text-stone-400">
                    Must be printed on official bank stationery, signed and stamped by the bank manager, certifying available liquid funds (savings, fixed deposits, liquid mutual funds) covering at least 1 full academic year of the university’s Total Cost of Attendance (COA).
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 4: Essays & SOP */}
            <div className="theme-card p-6 space-y-4">
              <div className="flex items-center gap-2 font-bold text-white text-base font-serif-display border-b border-[var(--theme-border)] pb-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>4. Statement of Purpose (SOP) vs. Common App Essay</span>
              </div>

              <div className="space-y-3 text-xs text-stone-300 leading-relaxed">
                <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                  <strong className="text-white block">Statement of Purpose (SOP):</strong>
                  <p className="text-stone-400">
                    Required for UK (UCAS personal statement), European programs, and Graduate Master's applications. Focus is 80%+ on academic trajectory, specific research literature, laboratory methods, and technical preparation for the chosen degree.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-1">
                  <strong className="text-white block">Common App Personal Essay (650 words):</strong>
                  <p className="text-stone-400">
                    Required for US undergraduate admissions. Focus is personal, reflective, and storytelling-driven. Demonstrates character, intellectual vitality, voice, and how you think and grow from challenge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Shortlisted Colleges */}
      {activeTab === 'shortlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-serif-display">
                My Target University Shortlist ({universities.length})
              </h3>
              <p className="text-xs text-stone-400">
                Colleges added from the University Search Engine or entered manually.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {universities.map((uni) => (
              <div key={uni.id} className="theme-card p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-base font-serif-display">{uni.name}</h4>
                      <span className="text-xs text-stone-400">{uni.country} · {uni.portal}</span>
                    </div>
                    <button
                      onClick={() => setUniversities(prev => prev.filter(u => u.id !== uni.id))}
                      className="text-stone-400 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[var(--theme-border)] text-xs text-stone-300 space-y-1">
                    <div><strong>Target Deadline:</strong> {uni.deadline}</div>
                    <div><strong>Target SAT:</strong> {uni.targetSat} | <strong>TOEFL:</strong> {uni.targetToefl}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-stone-400 mb-1">Application Status:</label>
                  <select
                    value={uni.status}
                    onChange={(e) => {
                      const val = e.target.value as ShortlistedUniversity['status'];
                      setUniversities(prev => prev.map(u => u.id === uni.id ? { ...u, status: val } : u));
                    }}
                    className="w-full text-xs p-2 border border-[var(--theme-border)] rounded bg-[var(--theme-surface-subtle)] font-medium text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                  >
                    <option value="Researching">Researching / Shortlisted</option>
                    <option value="Drafting">Drafting Essays & Dossier</option>
                    <option value="Submitted">Submitted Application</option>
                    <option value="Accepted">Accepted / Admitted 🎉</option>
                    <option value="Waitlisted">Waitlisted</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: 18-Step Application Milestones */}
      {activeTab === 'checklist' && (
        <div className="theme-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-4">
            <div>
              <h3 className="text-xl font-bold text-white font-serif-display">
                Comprehensive 18-Step Readiness Checklist
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {completedMilestones.length} of {DEFAULT_MILESTONES.length} milestones complete ({Math.round((completedMilestones.length / DEFAULT_MILESTONES.length) * 100)}%)
              </p>
            </div>
            <button
              onClick={() => setCompletedMilestones([])}
              className="text-xs text-stone-400 hover:text-white underline cursor-pointer"
            >
              Reset All
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {DEFAULT_MILESTONES.map((m) => {
              const isDone = completedMilestones.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleMilestone(m.id)}
                  className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm flex items-start gap-3 transition-colors cursor-pointer ${
                    isDone
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-200 font-medium'
                      : 'bg-[var(--theme-surface-subtle)] border-[var(--theme-border)] hover:border-[var(--theme-border-strong)] text-stone-300'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-[10px] font-mono text-stone-400 uppercase">{m.category}</div>
                    <div className={`mt-0.5 ${isDone ? 'line-through text-stone-500' : ''}`}>
                      {m.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
