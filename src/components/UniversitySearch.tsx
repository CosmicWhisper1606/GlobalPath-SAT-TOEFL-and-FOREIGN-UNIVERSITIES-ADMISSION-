import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  UNIVERSITIES_DATABASE,
  STUDY_PROGRAMS_LIST,
  COUNTRIES_LIST,
  UniversityRecord
} from '../data/universitySearchData';
import {
  Search,
  Filter,
  DollarSign,
  GraduationCap,
  Globe2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Plus,
  BookOpen,
  Award,
  Sparkles,
  SlidersHorizontal,
  X,
  Building,
  RotateCcw,
  ArrowRight,
  UserCheck,
  Briefcase,
  Layers,
  HelpCircle,
  Clock,
  ShieldCheck,
  Check,
  Calculator,
  ShieldAlert,
  Info
} from 'lucide-react';

interface UniversitySearchProps {
  onAddToTimeline?: (university: UniversityRecord) => void;
  onGoToTimeline?: () => void;
}

export type DegreeLevelFilter = 'all' | 'first-year' | 'transfer' | 'masters';

export const UniversitySearch: React.FC<UniversitySearchProps> = ({
  onAddToTimeline,
  onGoToTimeline
}) => {
  const { toggleSaveCollege, isCollegeSaved } = useAuth();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [maxTuition, setMaxTuition] = useState<number>(70000);
  const [acceptanceFilter, setAcceptanceFilter] = useState<'all' | 'under10' | '10to25' | '25to50' | 'above50'>('all');
  const [satFilter, setSatFilter] = useState<'all' | 'Required' | 'Test-Optional' | 'Test-Blind'>('all');
  const [greFilter, setGreFilter] = useState<'all' | 'Required' | 'Optional' | 'Waived for STEM' | 'Not Required'>('all');
  const [admissionModelFilter, setAdmissionModelFilter] = useState<'all' | 'holistic' | 'direct_entry'>('all');
  const [aidFilter, setAidFilter] = useState<'all' | 'need_blind' | 'need_aware' | 'zero_aid'>('all');
  const [showFullCoa, setShowFullCoa] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rank' | 'acceptance_asc' | 'acceptance_desc' | 'tuition_asc' | 'tuition_desc' | 'coa_asc'>('rank');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [degreeLevel, setDegreeLevel] = useState<DegreeLevelFilter>('all');

  // Selected University for Deep-Dive Modal Drawer
  const [selectedDossierUni, setSelectedDossierUni] = useState<UniversityRecord | null>(null);
  const [dossierActiveTab, setDossierActiveTab] = useState<'first-year' | 'transfer' | 'masters' | 'blueprint'>('first-year');

  // Track added feedback
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Filter & Sort Logic
  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES_DATABASE.filter((u) => {
      // Text Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(query) || u.shortName.toLowerCase().includes(query);
        const matchesCity = u.city.toLowerCase().includes(query);
        const matchesCountry = u.country.toLowerCase().includes(query);
        const matchesPrograms = u.programs.some(p => p.toLowerCase().includes(query));
        const matchesPopularMasters = u.masters.popularMastersPrograms.some(p => p.toLowerCase().includes(query));
        if (!matchesName && !matchesCity && !matchesCountry && !matchesPrograms && !matchesPopularMasters) {
          return false;
        }
      }

      // Country filter
      if (selectedCountry !== 'All Countries' && u.country !== selectedCountry) {
        return false;
      }

      // Program filter
      if (selectedProgram !== 'All Programs' && !u.programs.includes(selectedProgram)) {
        return false;
      }

      // Tuition / Cost filter
      const costToCheck = showFullCoa ? u.financial_profiles.coa_total_annual_usd : u.tuitionUSD;
      if (costToCheck > maxTuition && maxTuition < 70000) {
        return false;
      }

      // Acceptance rate filter (applies to first-year or transfer depending on view)
      const rateToCheck = degreeLevel === 'transfer' ? u.transfer.transferAcceptanceRate : u.acceptanceRate;
      if (acceptanceFilter === 'under10' && rateToCheck >= 10) return false;
      if (acceptanceFilter === '10to25' && (rateToCheck < 10 || rateToCheck > 25)) return false;
      if (acceptanceFilter === '25to50' && (rateToCheck < 25 || rateToCheck > 50)) return false;
      if (acceptanceFilter === 'above50' && rateToCheck <= 50) return false;

      // SAT policy filter (undergraduate)
      if (satFilter !== 'all' && u.satRequirement !== satFilter) {
        return false;
      }

      // GRE filter (masters)
      if (degreeLevel === 'masters' && greFilter !== 'all' && u.masters.grePolicy !== greFilter) {
        return false;
      }

      // Admission Model filter
      if (admissionModelFilter === 'holistic' && !u.admission_model.includes('Holistic')) {
        return false;
      }
      if (admissionModelFilter === 'direct_entry' && !u.admission_model.includes('Direct Course')) {
        return false;
      }

      // Financial Aid / Need-Blind filter
      if (aidFilter === 'need_blind' && !u.financial_profiles.need_blind_for_intl) {
        return false;
      }
      if (aidFilter === 'need_aware' && u.financial_profiles.intl_aid_classification !== 'Need-Aware with Institutional Aid') {
        return false;
      }
      if (aidFilter === 'zero_aid' && u.financial_profiles.intl_aid_classification !== 'Zero Institutional Aid for Non-US Citizens') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rank') return a.worldRanking - b.worldRanking;
      if (sortBy === 'acceptance_asc') {
        const rateA = degreeLevel === 'transfer' ? a.transfer.transferAcceptanceRate : a.acceptanceRate;
        const rateB = degreeLevel === 'transfer' ? b.transfer.transferAcceptanceRate : b.acceptanceRate;
        return rateA - rateB;
      }
      if (sortBy === 'acceptance_desc') {
        const rateA = degreeLevel === 'transfer' ? a.transfer.transferAcceptanceRate : a.acceptanceRate;
        const rateB = degreeLevel === 'transfer' ? b.transfer.transferAcceptanceRate : b.acceptanceRate;
        return rateB - rateA;
      }
      if (sortBy === 'tuition_asc') return a.tuitionUSD - b.tuitionUSD;
      if (sortBy === 'tuition_desc') return b.tuitionUSD - a.tuitionUSD;
      if (sortBy === 'coa_asc') return a.financial_profiles.coa_total_annual_usd - b.financial_profiles.coa_total_annual_usd;
      return 0;
    });
  }, [searchQuery, selectedCountry, selectedProgram, maxTuition, acceptanceFilter, satFilter, greFilter, admissionModelFilter, aidFilter, showFullCoa, sortBy, degreeLevel]);

  // Handle adding university to timeline tracker
  const handleAdd = (uni: UniversityRecord) => {
    if (onAddToTimeline) {
      onAddToTimeline(uni);
    }

    try {
      const stored = localStorage.getItem('globalpath_universities');
      const list = stored ? JSON.parse(stored) : [];
      const exists = list.some((item: any) => item.id === uni.id);
      if (!exists) {
        const newEntry = {
          id: uni.id,
          name: uni.name,
          country: uni.country,
          deadline: uni.regularDeadline,
          status: 'Researching',
          tuition: uni.tuitionUSD,
          targetSat: uni.satMiddle50,
          targetToefl: `${uni.toeflMin}+`
        };
        localStorage.setItem('globalpath_universities', JSON.stringify([...list, newEntry]));
      }

      // Also add key deadline to custom timeline items
      const storedTimeline = localStorage.getItem('globalpath_custom_deadlines');
      const timelineList = storedTimeline ? JSON.parse(storedTimeline) : [];
      const hasDeadline = timelineList.some((t: any) => t.title.includes(uni.name));
      if (!hasDeadline) {
        timelineList.push({
          id: `dl-${uni.id}-${Date.now()}`,
          title: `${uni.name} Regular Application Deadline`,
          date: uni.regularDeadline.includes('-') ? uni.regularDeadline : '2026-01-05',
          category: 'Application Deadline',
          university: uni.name,
          reminderNote: `Submit through ${uni.applicationPortal}. Target SAT: ${uni.satMiddle50}, TOEFL: ${uni.toeflMin}+.`,
          completed: false
        });
        localStorage.setItem('globalpath_custom_deadlines', JSON.stringify(timelineList));
      }

      // Also sync to Firebase Firestore for authenticated user
      toggleSaveCollege({
        id: uni.id,
        name: uni.name,
        country: uni.country,
        satRequirement: uni.satMiddle50,
        toeflRequirement: `${uni.toeflMin}+`,
        deadline: uni.regularDeadline
      });

      setAddedIds((prev) => ({ ...prev, [uni.id]: true }));
      setTimeout(() => {
        setAddedIds((prev) => ({ ...prev, [uni.id]: false }));
      }, 2500);
    } catch {
      // ignore
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('All Countries');
    setSelectedProgram('All Programs');
    setMaxTuition(70000);
    setAcceptanceFilter('all');
    setSatFilter('all');
    setGreFilter('all');
    setAdmissionModelFilter('all');
    setAidFilter('all');
    setShowFullCoa(false);
    setSortBy('rank');
    setDegreeLevel('all');
  };

  const openDossier = (uni: UniversityRecord, tab: 'first-year' | 'transfer' | 'masters' | 'blueprint' = 'first-year') => {
    setSelectedDossierUni(uni);
    setDossierActiveTab(tab);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full max-w-full overflow-x-hidden">
      {/* Header Banner with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <Globe2 className="w-3.5 h-3.5" />
          <span>Stage 2 of the Admissions Journey</span>
          <span aria-hidden="true">·</span>
          <span>Verified 2026–2027 Academic Catalog</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display text-white">
          University & Major Matcher: SAT, TOEFL & Admissions Requirements
        </h2>
        <p className="mt-2 text-stone-300 max-w-3xl text-sm sm:text-base leading-relaxed">
          Structured for how international students evaluate universities: filter by <strong>Admission Model</strong> (US Holistic vs. UK/Europe Direct Course Entry), calculate <strong>Total Cost of Attendance (COA)</strong>, track <strong>Need-Blind international aid</strong>, and access dedicated requirements for <strong>First-Year, Transfer, and Master’s</strong> applicants.
        </p>

        {/* Degree Level Selector Tabs */}
        <div className="mt-6 pt-4 border-t border-[var(--theme-border)]">
          <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Select Your Applicant Pathway (Tailors Scores, Deadlines & Policies):</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'all', label: 'All Applicants', subtitle: 'General Overview & Blueprint' },
              { id: 'first-year', label: 'First-Year Undergrad', subtitle: 'SAT, High School GPA, ED/RD' },
              { id: 'transfer', label: 'Transfer Students', subtitle: 'College Credits, Waivers, Housing' },
              { id: 'masters', label: 'Master’s / Graduate', subtitle: 'GRE, TA Stipends, STEM OPT' },
            ].map((lvl) => {
              const isActive = degreeLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setDegreeLevel(lvl.id as DegreeLevelFilter)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[var(--theme-accent)] text-stone-950 font-bold border-[var(--theme-accent)] shadow-md scale-[1.01]'
                      : 'bg-[var(--theme-surface-subtle)] text-stone-300 border-[var(--theme-border)] hover:text-white hover:bg-[var(--theme-surface-elevated)]'
                  }`}
                >
                  <span className="text-xs font-bold leading-tight">{lvl.label}</span>
                  <span className={`text-[10px] mt-0.5 ${isActive ? 'text-stone-950 font-medium' : 'text-stone-400'}`}>
                    {lvl.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter & Search Command Center */}
      <div className="theme-card p-6 shadow-sm space-y-6">
        {/* Top Search Bar & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search university name, city, program, MS degree (e.g. Stanford, MIT, CS, Data Science)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-[var(--theme-border)] rounded-lg bg-[var(--theme-surface-subtle)] text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-stone-400 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs sm:text-sm border border-[var(--theme-border)] rounded-lg px-3 py-2 bg-[var(--theme-surface-subtle)] text-stone-200 font-medium focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
            >
              <option value="rank">World Ranking (QS/THE)</option>
              <option value="acceptance_asc">Acceptance Rate (Most Selective First)</option>
              <option value="acceptance_desc">Acceptance Rate (High to Low)</option>
              <option value="tuition_asc">Annual Tuition (Lowest First / Free)</option>
              <option value="coa_asc">Total Cost of Attendance (COA Lowest First)</option>
              <option value="tuition_desc">Annual Tuition (Highest First)</option>
            </select>
          </div>
        </div>

        {/* Row 1: Core Geographical & Academic Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-[var(--theme-border)]">
          {/* 1. Country Filter */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>Target Country</span>
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full text-xs sm:text-sm border border-[var(--theme-border)] rounded-lg p-2 bg-[var(--theme-surface-subtle)] text-stone-200 font-medium focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
            >
              {COUNTRIES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Program of Study Filter */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>Field of Study</span>
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full text-xs sm:text-sm border border-[var(--theme-border)] rounded-lg p-2 bg-[var(--theme-surface-subtle)] text-stone-200 font-medium focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
            >
              {STUDY_PROGRAMS_LIST.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Admission Model Filter (US Holistic vs UK/Europe Direct Entry) */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>Admission Model</span>
            </label>
            <select
              value={admissionModelFilter}
              onChange={(e) => setAdmissionModelFilter(e.target.value as any)}
              className="w-full text-xs sm:text-sm border border-[var(--theme-border)] rounded-lg p-2 bg-[var(--theme-surface-subtle)] text-stone-200 font-medium focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
            >
              <option value="all">All Models (Holistic & Direct)</option>
              <option value="holistic">US/Canada (Holistic & Flexible Majors)</option>
              <option value="direct_entry">UK/Europe/Singapore (Direct Course Entry)</option>
            </select>
          </div>

          {/* 4. Financial Aid & Scholarship Indicator */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>Financial Aid Policy</span>
            </label>
            <select
              value={aidFilter}
              onChange={(e) => setAidFilter(e.target.value as any)}
              className="w-full text-xs sm:text-sm border border-[var(--theme-border)] rounded-lg p-2 bg-[var(--theme-surface-subtle)] text-stone-200 font-medium focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
            >
              <option value="all">All Financial Aid Types</option>
              <option value="need_blind">Need-Blind for International (e.g. MIT, Harvard, Yale)</option>
              <option value="need_aware">Need-Aware with Institutional Aid</option>
              <option value="zero_aid">Zero Institutional Aid for Non-US</option>
            </select>
          </div>
        </div>

        {/* Row 2: Testing Policies & Budget Control */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-[var(--theme-border)]">
          {/* Exam Policy Filter */}
          <div>
            {degreeLevel === 'masters' ? (
              <>
                <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>GRE Graduate Policy</span>
                </label>
                <select
                  value={greFilter}
                  onChange={(e) => setGreFilter(e.target.value as any)}
                  className="w-full text-xs sm:text-sm border border-[var(--theme-border)] rounded-lg p-2 bg-[var(--theme-surface-subtle)] text-stone-200 font-medium focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                >
                  <option value="all">All GRE Policies</option>
                  <option value="Required">GRE Required</option>
                  <option value="Optional">GRE Optional</option>
                  <option value="Waived for STEM">Waived for STEM / Relevant</option>
                  <option value="Not Required">GRE Not Required</option>
                </select>
              </>
            ) : (
              <>
                <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>SAT Testing Policy</span>
                </label>
                <select
                  value={satFilter}
                  onChange={(e) => setSatFilter(e.target.value as any)}
                  className="w-full text-xs sm:text-sm border border-[var(--theme-border)] rounded-lg p-2 bg-[var(--theme-surface-subtle)] text-stone-200 font-medium focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                >
                  <option value="all">All Testing Policies</option>
                  <option value="Required">SAT Required (MIT, Dartmouth, Yale, UT Austin, Purdue)</option>
                  <option value="Test-Optional">Test-Optional</option>
                  <option value="Test-Blind">Test-Blind (UC Berkeley, UCLA)</option>
                </select>
              </>
            )}
          </div>

          {/* Selectivity Filter */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>{degreeLevel === 'transfer' ? 'Transfer Selectivity' : 'Acceptance Selectivity'}</span>
            </label>
            <select
              value={acceptanceFilter}
              onChange={(e) => setAcceptanceFilter(e.target.value as any)}
              className="w-full text-xs sm:text-sm border border-[var(--theme-border)] rounded-lg p-2 bg-[var(--theme-surface-subtle)] text-stone-200 font-medium focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
            >
              <option value="all">All Selectivity Ranges</option>
              <option value="under10">Ultra-Selective (&lt; 10%)</option>
              <option value="10to25">Selective (10% – 25%)</option>
              <option value="25to50">Moderate (25% – 50%)</option>
              <option value="above50">High Admit (&gt; 50%)</option>
            </select>
          </div>

          {/* Cost Mode Toggle */}
          <div className="sm:col-span-2 flex items-center justify-between p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)]">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white block flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                <span>Cost Calculation Mode:</span>
              </span>
              <p className="text-[11px] text-stone-400">
                {showFullCoa ? 'Displaying Full Cost of Attendance (Tuition + Insurance + Living)' : 'Displaying Base Tuition Only'}
              </p>
            </div>

            <button
              onClick={() => setShowFullCoa(!showFullCoa)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                showFullCoa
                  ? 'bg-[var(--theme-accent)] text-stone-950 shadow-sm'
                  : 'bg-[var(--theme-surface-elevated)] text-stone-300 border border-[var(--theme-border)] hover:text-white'
              }`}
            >
              {showFullCoa ? 'Showing Total COA' : 'Show Full COA'}
            </button>
          </div>
        </div>

        {/* Tuition Range Slider Sub-row */}
        <div className="pt-2 border-t border-[var(--theme-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 max-w-xl">
            <div className="flex justify-between text-xs font-semibold text-stone-300 mb-1">
              <span>{showFullCoa ? 'Maximum Total Cost of Attendance (COA):' : 'Maximum Annual Tuition Budget:'}</span>
              <span className="font-mono text-[var(--theme-accent)] font-bold tabular-nums">
                {maxTuition >= 70000 ? 'Any Budget ($70,000+)' : `$${maxTuition.toLocaleString()} USD / yr`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="70000"
              step="2500"
              value={maxTuition}
              onChange={(e) => setMaxTuition(parseInt(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-stone-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-mono">
              <span>$0 (Germany / ETH ~€0)</span>
              <span>$35,000 (Global Public Flagships)</span>
              <span>$70,000+ (Private Ivy Tier)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 text-xs text-stone-400 hover:text-white hover:bg-[var(--theme-surface-elevated)] rounded-lg flex items-center gap-1.5 transition-colors font-medium border border-[var(--theme-border)] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>

            <div className="flex rounded-lg border border-[var(--theme-border)] overflow-hidden text-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  viewMode === 'cards' ? 'bg-[var(--theme-accent)] text-stone-950 font-bold' : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white'
                }`}
              >
                Cards View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-[var(--theme-accent)] text-stone-950 font-bold' : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white'
                }`}
              >
                Table View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Results Counter */}
      <div className="flex items-center justify-between text-xs text-stone-400">
        <div>
          Showing <strong>{filteredUniversities.length}</strong> of {UNIVERSITIES_DATABASE.length} verified universities
          {selectedCountry !== 'All Countries' && ` in ${selectedCountry}`}
          {selectedProgram !== 'All Programs' && ` for ${selectedProgram}`}
          {aidFilter === 'need_blind' && ' (Need-Blind for International Applicants)'}
        </div>
        <div className="text-[11px] font-mono text-[var(--theme-accent)]">
          Effective Cycle: 2026–2027 Admissions
        </div>
      </div>

      {/* CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              className="theme-card p-6 flex flex-col justify-between hover:border-[var(--theme-border-strong)] transition-all relative overflow-hidden"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                      <span className="text-lg">{uni.flag}</span>
                      <span className="font-semibold text-white">{uni.country}</span>
                      <span>·</span>
                      <span>{uni.city}</span>
                      <span>·</span>
                      <span className="px-1.5 py-0.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-[var(--theme-accent)] text-[10px] font-bold">
                        Rank #{uni.worldRanking}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-serif-display text-white mt-1.5">
                      {uni.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-surface-elevated)] text-[var(--theme-accent)] font-semibold border border-[var(--theme-border)]">
                      {uni.effective_admission_cycle}
                    </span>
                    {uni.financial_profiles.need_blind_for_intl && (
                      <span className="mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                        Need-Blind Intl Aid
                      </span>
                    )}
                  </div>
                </div>

                {/* Admission Model & Aid Badges */}
                <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] text-stone-300">
                    Model: <strong>{uni.admission_model.split('(')[0].trim()}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] text-stone-300">
                    Self-Report: <strong>{uni.testing_policies.accepts_self_reported_scores ? 'Free ($0)' : 'Official Send Required'}</strong>
                  </span>
                </div>

                <p className="text-xs text-stone-300 mt-2.5 leading-relaxed line-clamp-2">
                  {uni.description}
                </p>

                {/* Quantitative Baseline Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-[var(--theme-border)]">
                  <div className="p-2 bg-[var(--theme-surface-subtle)] rounded-lg border border-[var(--theme-border)]">
                    <div className="text-[10px] text-stone-400 font-medium">
                      {degreeLevel === 'transfer' ? 'Transfer Admit' : 'First-Year Admit'}
                    </div>
                    <div className="text-sm font-bold font-mono text-rose-400 mt-0.5 tabular-nums">
                      {degreeLevel === 'transfer' ? `${uni.transfer.transferAcceptanceRate}%` : `${uni.acceptanceRate}%`}
                    </div>
                  </div>

                  <div className="p-2 bg-[var(--theme-surface-subtle)] rounded-lg border border-[var(--theme-border)]">
                    <div className="text-[10px] text-stone-400 font-medium">
                      {showFullCoa ? 'Total Annual COA' : 'Annual Tuition'}
                    </div>
                    <div className="text-sm font-bold font-mono text-white mt-0.5 tabular-nums">
                      {showFullCoa 
                        ? `$${uni.financial_profiles.coa_total_annual_usd.toLocaleString()}`
                        : uni.tuitionUSD === 0 ? '€0 Tuition' : `$${uni.tuitionUSD.toLocaleString()}`
                      }
                    </div>
                  </div>

                  <div className="p-2 bg-[var(--theme-surface-subtle)] rounded-lg border border-[var(--theme-border)]">
                    <div className="text-[10px] text-stone-400 font-medium">
                      {degreeLevel === 'masters' ? 'GRE Policy' : 'SAT Policy'}
                    </div>
                    <div className="text-xs font-bold font-mono text-amber-300 mt-0.5 truncate">
                      {degreeLevel === 'masters' ? uni.masters.grePolicy : uni.satRequirement}
                    </div>
                  </div>

                  <div className="p-2 bg-[var(--theme-surface-subtle)] rounded-lg border border-[var(--theme-border)]">
                    <div className="text-[10px] text-stone-400 font-medium">
                      {degreeLevel === 'masters' ? 'Grad TOEFL (TA)' : 'TOEFL Minimum'}
                    </div>
                    <div className="text-sm font-bold font-mono text-amber-400 mt-0.5 tabular-nums">
                      {degreeLevel === 'masters' ? `${uni.masters.toeflMinGrad}+ (TA ${uni.masters.toeflTaSpeakingCutoff})` : `${uni.toeflMin}+`}
                    </div>
                  </div>
                </div>

                {/* SPECIFIC REQUIREMENTS MODULE: Dynamic by Active Degree Level */}
                {degreeLevel === 'first-year' && (
                  <div className="mt-4 p-3.5 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[var(--theme-accent)] font-bold font-mono text-[11px] pb-1 border-b border-[var(--theme-border)]">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>First-Year Requirements</span>
                      </span>
                      <span>{uni.firstYear.regularDeadline}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-stone-300 text-[11px]">
                      <div><strong className="text-white">SAT Middle 50%:</strong> {uni.firstYear.satMiddle50}</div>
                      <div><strong className="text-white">Average GPA:</strong> {uni.firstYear.averageGpa}</div>
                      <div><strong className="text-white">TOEFL Recommended:</strong> {uni.firstYear.toeflRecommended}+</div>
                      <div><strong className="text-white">Early Deadline:</strong> {uni.firstYear.earlyDeadline || 'N/A'}</div>
                    </div>
                    <div className="text-[11px] text-stone-400 pt-1">
                      <span className="font-semibold text-amber-300">Financial Aid:</span> {uni.firstYear.aidPolicy}
                    </div>
                  </div>
                )}

                {degreeLevel === 'transfer' && (
                  <div className="mt-4 p-3.5 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[var(--theme-accent)] font-bold font-mono text-[11px] pb-1 border-b border-[var(--theme-border)]">
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Transfer Student Requirements</span>
                      </span>
                      <span>Fall: {uni.transfer.fallDeadline}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-stone-300 text-[11px]">
                      <div><strong className="text-white">Min Credits:</strong> {uni.transfer.minCollegeCredits}</div>
                      <div><strong className="text-white">Transfer Admit Rate:</strong> {uni.transfer.transferAcceptanceRate}%</div>
                      <div><strong className="text-white">SAT for Transfers:</strong> {uni.transfer.satPolicyTransfer}</div>
                      <div><strong className="text-white">College GPA:</strong> {uni.transfer.minCollegeGpa}</div>
                    </div>
                    <div className="text-[11px] text-stone-400 pt-1">
                      <span className="font-semibold text-amber-300">English Waiver:</span> {uni.transfer.toeflPolicyTransfer}
                    </div>
                  </div>
                )}

                {degreeLevel === 'masters' && (
                  <div className="mt-4 p-3.5 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[var(--theme-accent)] font-bold font-mono text-[11px] pb-1 border-b border-[var(--theme-border)]">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Master’s & Graduate Requirements</span>
                      </span>
                      <span>STEM OPT: {uni.masters.stemOptDuration.split(' ')[0]} mo</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-stone-300 text-[11px]">
                      <div><strong className="text-white">GRE Target:</strong> {uni.masters.greTargetScores || uni.masters.grePolicy}</div>
                      <div><strong className="text-white">Min Undergrad GPA:</strong> {uni.masters.minUndergradGpa}</div>
                      <div><strong className="text-white">TA Speaking Cutoff:</strong> {uni.masters.toeflTaSpeakingCutoff}/30 on TOEFL</div>
                      <div><strong className="text-white">Deadlines:</strong> {uni.masters.applicationDeadlines.split('|')[0]}</div>
                    </div>
                    <div className="text-[11px] text-stone-400 pt-1">
                      <span className="font-semibold text-amber-300">Funding / Stipend:</span> {uni.masters.assistantshipsFunding}
                    </div>
                  </div>
                )}

                {degreeLevel === 'all' && (
                  <div className="mt-4 p-3 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-stone-300 text-[11px]">
                      <span className="font-semibold text-[var(--theme-accent)]">Available Pathways:</span>
                      <span>First-Year · Transfer · Master's / PhD</span>
                    </div>
                    <div className="text-[11px] text-stone-400">
                      <strong>English Waiver:</strong> {uni.testing_policies.english_waiver_conditions}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Row */}
              <div className="mt-6 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between gap-3">
                <button
                  onClick={() => openDossier(uni, degreeLevel === 'all' ? 'first-year' : degreeLevel)}
                  className="px-3.5 py-2 rounded-lg bg-[var(--theme-surface-elevated)] hover:bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Full Admissions Dossier</span>
                </button>

                <button
                  onClick={() => handleAdd(uni)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                    addedIds[uni.id]
                      ? 'bg-emerald-500 text-stone-950'
                      : 'bg-[var(--theme-accent)] text-stone-950 hover:opacity-90'
                  }`}
                >
                  {addedIds[uni.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Timeline!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Shortlist</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="theme-card p-6 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300 border-collapse">
              <thead>
                <tr className="border-b border-[var(--theme-border)] text-[11px] text-stone-400 font-mono uppercase bg-[var(--theme-surface-subtle)]">
                  <th className="py-3 px-3">University</th>
                  <th className="py-3 px-3">Country</th>
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-3">Admit %</th>
                  <th className="py-3 px-3">SAT Policy</th>
                  <th className="py-3 px-3">TOEFL Min</th>
                  <th className="py-3 px-3">{showFullCoa ? 'Total COA' : 'Tuition'}</th>
                  <th className="py-3 px-3">Intl Aid</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--theme-border)]">
                {filteredUniversities.map((uni) => (
                  <tr key={uni.id} className="hover:bg-[var(--theme-surface-subtle)] transition-colors">
                    <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                      <span>{uni.flag}</span>
                      <span>{uni.name}</span>
                    </td>
                    <td className="py-3 px-3">{uni.country}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[var(--theme-accent)]">#{uni.worldRanking}</td>
                    <td className="py-3 px-3 font-mono text-rose-400">{uni.acceptanceRate}%</td>
                    <td className="py-3 px-3 font-mono">{uni.satRequirement}</td>
                    <td className="py-3 px-3 font-mono">{uni.toeflMin}+</td>
                    <td className="py-3 px-3 font-mono text-white">
                      {showFullCoa ? `$${uni.financial_profiles.coa_total_annual_usd.toLocaleString()}` : `$${uni.tuitionUSD.toLocaleString()}`}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        uni.financial_profiles.need_blind_for_intl
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[var(--theme-surface-elevated)] text-stone-400'
                      }`}>
                        {uni.financial_profiles.intl_aid_classification.split(' ')[0]}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => openDossier(uni, 'first-year')}
                        className="text-[var(--theme-accent)] hover:underline font-semibold"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FULL DEEP-DIVE DOSSIER MODAL DRAWER */}
      {selectedDossierUni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="theme-card max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-stone-100 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDossierUni(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-[var(--theme-surface-elevated)] transition-colors cursor-pointer"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dossier Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-accent)] mb-1">
                <span className="text-xl">{selectedDossierUni.flag}</span>
                <span className="font-bold">{selectedDossierUni.country}</span>
                <span>·</span>
                <span>{selectedDossierUni.city}</span>
                <span>·</span>
                <span className="font-bold bg-[var(--theme-accent)] text-stone-950 px-2 py-0.2 rounded">
                  QS World Rank #{selectedDossierUni.worldRanking}
                </span>
                <span>·</span>
                <span className="font-mono text-stone-300">
                  {selectedDossierUni.effective_admission_cycle}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
                {selectedDossierUni.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedDossierUni.description}
              </p>
            </div>

            {/* Pathway Tabs Inside Dossier */}
            <div className="flex rounded-xl bg-[var(--theme-surface-subtle)] p-1 border border-[var(--theme-border)]">
              <button
                onClick={() => setDossierActiveTab('first-year')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  dossierActiveTab === 'first-year'
                    ? 'bg-[var(--theme-accent)] text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>1. First-Year Undergrad</span>
              </button>

              <button
                onClick={() => setDossierActiveTab('transfer')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  dossierActiveTab === 'transfer'
                    ? 'bg-[var(--theme-accent)] text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>2. Transfer Student</span>
              </button>

              <button
                onClick={() => setDossierActiveTab('masters')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  dossierActiveTab === 'masters'
                    ? 'bg-[var(--theme-accent)] text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>3. Master’s & Graduate</span>
              </button>

              <button
                onClick={() => setDossierActiveTab('blueprint')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  dossierActiveTab === 'blueprint'
                    ? 'bg-[var(--theme-accent)] text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>4. Data Schema Blueprint</span>
              </button>
            </div>

            {/* TAB CONTENT 1: FIRST-YEAR */}
            {dossierActiveTab === 'first-year' && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      <span>SAT & Testing Requirements</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">SAT Policy:</strong> {selectedDossierUni.firstYear.satPolicy}</div>
                      <div><strong className="text-white">SAT Middle 50%:</strong> {selectedDossierUni.firstYear.satMiddle50}</div>
                      <div><strong className="text-white">Average High School GPA:</strong> {selectedDossierUni.firstYear.averageGpa}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>English Proficiency (TOEFL)</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">Minimum TOEFL iBT:</strong> {selectedDossierUni.firstYear.toeflMin}</div>
                      <div><strong className="text-white">Recommended Score:</strong> {selectedDossierUni.firstYear.toeflRecommended}+</div>
                      <div><strong className="text-white">Subscore Requirements:</strong> {selectedDossierUni.firstYear.toeflSubscores}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Application Timelines & Portal</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">Regular Decision Deadline:</strong> {selectedDossierUni.firstYear.regularDeadline}</div>
                      <div><strong className="text-white">Early Deadline (ED/EA):</strong> {selectedDossierUni.firstYear.earlyDeadline || 'None'}</div>
                      <div><strong className="text-white">Application Portal:</strong> {selectedDossierUni.firstYear.applicationPortal}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4" />
                      <span>Financial Aid & Costs</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">Annual Tuition:</strong> {selectedDossierUni.tuitionDisplay}</div>
                      <div><strong className="text-white">Full Cost of Attendance (COA):</strong> ${selectedDossierUni.financial_profiles.coa_total_annual_usd.toLocaleString()} / year</div>
                      <div><strong className="text-white">Aid Classification:</strong> {selectedDossierUni.financial_profiles.intl_aid_classification}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-300 block">Admissions Officer Tip for First-Year Applicants:</span>
                  <p className="text-stone-300">{selectedDossierUni.firstYear.keyAdmissionsTips}</p>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: TRANSFER */}
            {dossierActiveTab === 'transfer' && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4" />
                      <span>Transfer Eligibility & Selectivity</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">Transfer Acceptance Rate:</strong> {selectedDossierUni.transfer.transferAcceptanceRate}%</div>
                      <div><strong className="text-white">Minimum College Credits:</strong> {selectedDossierUni.transfer.minCollegeCredits}</div>
                      <div><strong className="text-white">Max Transferable Credits:</strong> {selectedDossierUni.transfer.maxTransferableCredits}</div>
                      <div><strong className="text-white">Minimum College GPA:</strong> {selectedDossierUni.transfer.minCollegeGpa}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      <span>SAT & English Waiver Rules</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">SAT Policy for Transfers:</strong> {selectedDossierUni.transfer.satPolicyTransfer}</div>
                      <div><strong className="text-white">TOEFL Waiver Rules:</strong> {selectedDossierUni.transfer.toeflPolicyTransfer}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Transfer Application Deadlines</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">Fall Transfer Deadline:</strong> {selectedDossierUni.transfer.fallDeadline}</div>
                      <div><strong className="text-white">Spring Transfer Deadline:</strong> {selectedDossierUni.transfer.springDeadline || 'Not offered'}</div>
                      <div><strong className="text-white">Transfer Portal:</strong> {selectedDossierUni.transfer.transferPortal}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <Building className="w-4 h-4" />
                      <span>Campus Housing & Life</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">Transfer Housing Guarantee:</strong> {selectedDossierUni.transfer.housingGuarantee}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-300 block">Critical Transfer Advice:</span>
                  <p className="text-stone-300">{selectedDossierUni.transfer.transferTip}</p>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: MASTER'S */}
            {dossierActiveTab === 'masters' && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      <span>GRE / GMAT & GPA Standards</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">GRE Policy:</strong> {selectedDossierUni.masters.grePolicy}</div>
                      <div><strong className="text-white">Target GRE Quant / Verbal:</strong> {selectedDossierUni.masters.greTargetScores || 'Not required'}</div>
                      <div><strong className="text-white">Undergraduate GPA Requirement:</strong> {selectedDossierUni.masters.minUndergradGpa}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Graduate TOEFL & TA Speaking Cutoff</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">Graduate TOEFL Minimum:</strong> {selectedDossierUni.masters.toeflMinGrad}+</div>
                      <div><strong className="text-white">Teaching Assistantship (TA) Cutoff:</strong> {selectedDossierUni.masters.toeflTaSpeakingCutoff}/30 on Speaking</div>
                      <p className="text-[10px] text-stone-400">Score of {selectedDossierUni.masters.toeflTaSpeakingCutoff}+ on Speaking qualifies non-native graduates for TA tuition waivers and monthly stipends.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4" />
                      <span>Assistantships, RA/TA & STEM OPT</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">Funding / Assistantships:</strong> {selectedDossierUni.masters.assistantshipsFunding}</div>
                      <div><strong className="text-white">Post-Grad Work Duration:</strong> {selectedDossierUni.masters.stemOptDuration}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                    <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Application Deadlines</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <div><strong className="text-white">Program Deadlines:</strong> {selectedDossierUni.masters.applicationDeadlines}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-2">
                  <span className="text-xs font-bold text-white block">Popular Master’s Degree Programs:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDossierUni.masters.popularMastersPrograms.map((prog, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-stone-200">
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-300 block">Graduate Admissions Director Tip:</span>
                  <p className="text-stone-300">{selectedDossierUni.masters.mastersTip}</p>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: DATA SCHEMA BLUEPRINT */}
            {dossierActiveTab === 'blueprint' && (
              <div className="space-y-4">
                <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-3 text-xs">
                  <span className="font-bold text-[var(--theme-accent)] uppercase text-[11px] block">
                    [Testing_Policies] Schema
                  </span>
                  <div className="grid sm:grid-cols-2 gap-3 text-stone-300">
                    <div><strong>SAT Policy:</strong> {selectedDossierUni.testing_policies.sat_policy}</div>
                    <div><strong>Self-Reported Scores ($0):</strong> {selectedDossierUni.testing_policies.accepts_self_reported_scores ? 'Accepted' : 'Official Send Required'}</div>
                    <div className="sm:col-span-2"><strong>English Proficiency Minimums:</strong> {selectedDossierUni.testing_policies.min_toefl_ielts_score}</div>
                    <div className="sm:col-span-2"><strong>English Waiver Rules:</strong> {selectedDossierUni.testing_policies.english_waiver_conditions}</div>
                  </div>
                </div>

                <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-3 text-xs">
                  <span className="font-bold text-[var(--theme-accent)] uppercase text-[11px] block">
                    [Programs_Majors] Schema
                  </span>
                  <div className="space-y-2">
                    {selectedDossierUni.programs_majors.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                        <span className="font-semibold text-white">{p.degree_name}</span>
                        <div className="flex gap-2 text-[10px]">
                          <span className={`px-1.5 py-0.5 rounded ${p.direct_entry ? 'bg-amber-950 text-amber-300 border border-amber-500/30' : 'bg-stone-800 text-stone-300'}`}>
                            {p.direct_entry ? 'Direct Entry' : 'Flexible/Undeclared'}
                          </span>
                          {p.stem_designated && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                              36-mo STEM OPT
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[var(--theme-surface-subtle)] rounded-xl border border-[var(--theme-border)] space-y-3 text-xs">
                  <span className="font-bold text-[var(--theme-accent)] uppercase text-[11px] block">
                    [Financial_Profiles] Schema (COA Breakdown)
                  </span>
                  <div className="grid sm:grid-cols-3 gap-3 text-stone-300">
                    <div className="p-2.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                      <span className="text-stone-400 block text-[10px]">Tuition (Annual)</span>
                      <span className="font-mono text-white font-bold">${selectedDossierUni.financial_profiles.coa_tuition_usd.toLocaleString()}</span>
                    </div>
                    <div className="p-2.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                      <span className="text-stone-400 block text-[10px]">Compulsory Insurance</span>
                      <span className="font-mono text-white font-bold">${selectedDossierUni.financial_profiles.coa_health_insurance_usd.toLocaleString()}</span>
                    </div>
                    <div className="p-2.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                      <span className="text-stone-400 block text-[10px]">Living Expenses</span>
                      <span className="font-mono text-white font-bold">${selectedDossierUni.financial_profiles.coa_living_expenses_usd.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-2 text-stone-300 space-y-1">
                    <div><strong>Total Cost of Attendance:</strong> <span className="text-[var(--theme-accent)] font-bold">${selectedDossierUni.financial_profiles.coa_total_annual_usd.toLocaleString()} USD / yr</span></div>
                    <div><strong>Need-Blind for Non-US:</strong> {selectedDossierUni.financial_profiles.need_blind_for_intl ? 'YES (100% Full demonstrated need met)' : 'NO (Need-Aware)'}</div>
                    <div><strong>CSS Profile Required:</strong> {selectedDossierUni.financial_profiles.css_profile_required ? 'Yes (College Board CSS Profile)' : 'No'}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Modal Actions */}
            <div className="pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
              <a
                href={selectedDossierUni.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-stone-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Visit Official Admissions Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedDossierUni(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleAdd(selectedDossierUni)}
                  className="px-4 py-2 rounded-lg bg-[var(--theme-accent)] text-stone-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to My Application Tracker</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
