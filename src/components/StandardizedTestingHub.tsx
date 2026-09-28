import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Laptop,
  MapPin,
  RefreshCw,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  Filter,
  Check,
  Building,
  HelpCircle,
  SlidersHorizontal,
  FileCheck
} from 'lucide-react';
import {
  EXAM_COSTS_DATA,
  TEST_CENTERS_RADAR,
  SELF_REPORTED_SCORE_POLICIES,
  LIVE_CURRENCY_RATES,
  ExamCostBreakdown,
  TestCenterRadarItem,
  SelfReportedScorePolicy,
  LiveCurrencyRate
} from '../data/testingHubData';
import { TestCenterStatus } from './TestCenterStatus';

interface StandardizedTestingHubProps {
  onGoToTracker?: () => void;
  onGoToUniversitySearch?: () => void;
  onGoToCurriculum?: () => void;
}

export const StandardizedTestingHub: React.FC<StandardizedTestingHubProps> = ({
  onGoToTracker,
  onGoToUniversitySearch,
  onGoToCurriculum,
}) => {
  // Hub sub-tab - Defaults to real-time status and alerts
  const [activeTab, setActiveTab] = useState<
    'status' | 'costs' | 'radar' | 'fee-waiver' | 'policies'
  >('status');

  // Currency Converter State
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('INR');
  const [includeBankForexBuffer, setIncludeBankForexBuffer] = useState<boolean>(true);

  // Test Center Filter State
  const [centerSearch, setCenterSearch] = useState<string>('');
  const [selectedCenterCountry, setSelectedCenterCountry] = useState<string>('All');
  const [selectedExamType, setSelectedExamType] = useState<string>('All');

  // Fee Waiver Interactive Checker State
  const [isUsCitizenOrResident, setIsUsCitizenOrResident] = useState<'yes' | 'no' | 'unsure'>('no');
  const [isEnrolledInUsHighSchool, setIsEnrolledInUsHighSchool] = useState<'yes' | 'no'>('no');
  const [isUsTerritoryResident, setIsUsTerritoryResident] = useState<'yes' | 'no'>('no');

  // Policy Search State
  const [policySearch, setPolicySearch] = useState<string>('');
  const [policyFilter, setPolicyFilter] = useState<'all' | 'free' | 'paid'>('all');

  // Get active currency
  const activeCurrency: LiveCurrencyRate =
    LIVE_CURRENCY_RATES.find((c) => c.currencyCode === selectedCurrencyCode) || LIVE_CURRENCY_RATES[0];

  // Price conversion helper
  const convertUSD = (usdAmount: number): { formatted: string; raw: number } => {
    let effectiveRate = activeCurrency.ratePerUSD;
    if (includeBankForexBuffer && activeCurrency.bankForexBufferPercent > 0) {
      effectiveRate = effectiveRate * (1 + activeCurrency.bankForexBufferPercent / 100);
    }
    const total = usdAmount * effectiveRate;
    return {
      raw: total,
      formatted: `${activeCurrency.symbol}${total.toLocaleString('en-US', {
        minimumFractionDigits: activeCurrency.ratePerUSD > 100 ? 0 : 2,
        maximumFractionDigits: activeCurrency.ratePerUSD > 100 ? 0 : 2,
      })}`,
    };
  };

  // Filter test centers
  const filteredCenters = useMemo(() => {
    return TEST_CENTERS_RADAR.filter((center) => {
      const matchesSearch =
        centerSearch.trim() === '' ||
        center.name.toLowerCase().includes(centerSearch.toLowerCase()) ||
        center.city.toLowerCase().includes(centerSearch.toLowerCase()) ||
        center.country.toLowerCase().includes(centerSearch.toLowerCase());

      const matchesCountry = selectedCenterCountry === 'All' || center.country === selectedCenterCountry;
      const matchesExam =
        selectedExamType === 'All' || (center.examsOffered as string[]).includes(selectedExamType);

      return matchesSearch && matchesCountry && matchesExam;
    });
  }, [centerSearch, selectedCenterCountry, selectedExamType]);

  // Center countries list
  const centerCountries = useMemo(() => {
    const list = Array.from(new Set(TEST_CENTERS_RADAR.map((c) => c.country)));
    return ['All', ...list];
  }, []);

  // Filter policies
  const filteredPolicies = useMemo(() => {
    return SELF_REPORTED_SCORE_POLICIES.filter((p) => {
      const matchesSearch =
        policySearch.trim() === '' ||
        p.universityName.toLowerCase().includes(policySearch.toLowerCase()) ||
        p.policyDetails.toLowerCase().includes(policySearch.toLowerCase());

      const matchesType =
        policyFilter === 'all' ||
        (policyFilter === 'free' && p.estimatedScoreReportingCostUSD === 0) ||
        (policyFilter === 'paid' && p.estimatedScoreReportingCostUSD > 0);

      return matchesSearch && matchesType;
    });
  }, [policySearch, policyFilter]);

  // Fee waiver eligibility verdict
  const feeWaiverVerdict = useMemo(() => {
    if (isUsCitizenOrResident === 'yes' || isEnrolledInUsHighSchool === 'yes' || isUsTerritoryResident === 'yes') {
      return {
        eligible: true,
        title: 'Potentially Eligible for College Board / ACT Fee Waivers',
        summary:
          'Because you are a US Citizen, Permanent Resident, or enrolled in a US-accredited high school / territory, you qualify for 2 free SAT registrations, unlimited score reports, and Common App fee waiver consideration.',
        action: 'Contact your high school guidance counselor to generate your College Board waiver code in the K-12 educator portal.',
      };
    }
    return {
      eligible: false,
      title: 'Not Eligible for College Board US Fee Waivers',
      summary:
        'College Board, ACT, and ETS strictly restrict standard testing fee waivers to US citizens, permanent residents, or students residing in US territories. Foreign nationals residing abroad cannot receive direct test registration fee waivers.',
      action:
        'Save hundreds of dollars by targeting universities that accept 100% FREE self-reported scores (see our database below) instead of spending $15–$25 per school sending official reports.',
    };
  }, [isUsCitizenOrResident, isEnrolledInUsHighSchool, isUsTerritoryResident]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full max-w-full overflow-x-hidden">
      {/* Header Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Stage 1 of the Admissions Journey</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
          Standardized Testing Hub (SAT, ACT, TOEFL, IELTS, Duolingo)
        </h2>
        <p className="mt-2 text-stone-300 text-sm max-w-3xl leading-relaxed">
          The ultimate control center for testing costs, international surcharges, verified test center seats, fee waiver verification, and official testing policies across world-class universities.
        </p>

        {/* Sub-navigation tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[var(--theme-border)]">
          <button
            onClick={() => setActiveTab('status')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'status'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-sm'
                : 'bg-[var(--theme-surface-elevated)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>1. Test Center Status & Alerts (GPS Travel)</span>
          </button>

          <button
            onClick={() => setActiveTab('costs')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'costs'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-sm'
                : 'bg-[var(--theme-surface-elevated)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>2. All-Inclusive Cost Breakdown & FX Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'radar'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-sm'
                : 'bg-[var(--theme-surface-elevated)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>3. Test Center Directory & Seat Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('fee-waiver')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'fee-waiver'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-sm'
                : 'bg-[var(--theme-surface-elevated)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>4. Fee Waiver Eligibility Checker</span>
          </button>

          <button
            onClick={() => setActiveTab('policies')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'policies'
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold shadow-sm'
                : 'bg-[var(--theme-surface-elevated)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>5. Test Policy & Self-Reporting Database</span>
          </button>
        </div>
      </div>

      {/* TAB 1: REAL-TIME TEST CENTER STATUS & TRAVEL ALERTS */}
      {activeTab === 'status' && (
        <TestCenterStatus
          onGoToTracker={onGoToTracker}
          onGoToDates={() => setActiveTab('radar')}
        />
      )}

      {/* TAB 1: ALL-INCLUSIVE COST BREAKDOWN */}
      {activeTab === 'costs' && (
        <div className="space-y-8">
          {/* Dynamic Currency Selection Toolbar */}
          <div className="theme-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                <span>Display in Local Currency:</span>
              </span>
              <select
                value={selectedCurrencyCode}
                onChange={(e) => setSelectedCurrencyCode(e.target.value)}
                className="text-xs p-2 rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white font-medium focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
              >
                {LIVE_CURRENCY_RATES.map((curr) => (
                  <option key={curr.currencyCode} value={curr.currencyCode}>
                    {curr.currencyCode} ({curr.name} - {curr.symbol})
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300">
              <input
                type="checkbox"
                checked={includeBankForexBuffer}
                onChange={(e) => setIncludeBankForexBuffer(e.target.checked)}
                className="rounded text-amber-500 focus:ring-0"
              />
              <span>
                Include bank foreign transaction fee buffer (
                {activeCurrency.bankForexBufferPercent}%)
              </span>
            </label>
          </div>

          {/* Cards for each major exam */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXAM_COSTS_DATA.map((exam) => {
              const baseConverted = convertUSD(exam.baseRegistrationUSD);
              const surchargeConverted = convertUSD(exam.internationalSurchargeUSD);
              const totalConverted = convertUSD(exam.totalRegistrationUSD);
              const scoreSendConverted = convertUSD(exam.scoreReportPerSchoolUSD);

              return (
                <div
                  key={exam.shortCode}
                  className="theme-card p-6 space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-[var(--theme-accent)] font-semibold">
                          {exam.shortCode}
                        </span>
                        <h3 className="text-lg font-bold text-white font-serif-display mt-1.5">
                          {exam.examName}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-stone-400 block">Total Out-of-Pocket</span>
                        <span className="text-xl font-bold font-mono text-[var(--theme-accent)]">
                          {totalConverted.formatted}
                        </span>
                        <span className="text-[10px] text-stone-400 block">
                          (${exam.totalRegistrationUSD} USD)
                        </span>
                      </div>
                    </div>

                    {/* Cost Decomposition Table */}
                    <div className="p-3.5 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] text-xs space-y-2">
                      <div className="flex justify-between text-stone-300">
                        <span>Base Exam Registration:</span>
                        <span className="font-mono text-white">
                          {baseConverted.formatted} (${exam.baseRegistrationUSD})
                        </span>
                      </div>

                      <div className="flex justify-between text-stone-300">
                        <span>Regional Intl Surcharge:</span>
                        <span className="font-mono text-amber-300">
                          +{surchargeConverted.formatted} (${exam.internationalSurchargeUSD})
                        </span>
                      </div>

                      <div className="flex justify-between text-stone-300 pt-1.5 border-t border-[var(--theme-border)]">
                        <span>Score Send per University:</span>
                        <span className="font-mono text-white">
                          {exam.scoreReportPerSchoolUSD === 0 ? (
                            <span className="text-emerald-400 font-bold">FREE ($0)</span>
                          ) : (
                            `${scoreSendConverted.formatted} ($${exam.scoreReportPerSchoolUSD})`
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between text-stone-300">
                        <span>Free Reports Included:</span>
                        <span className="font-mono text-emerald-400 font-semibold">
                          {exam.freeScoreReportsIncluded > 50
                            ? 'Unlimited Free'
                            : `${exam.freeScoreReportsIncluded} schools`}
                        </span>
                      </div>
                    </div>

                    {/* Hidden Costs & Operational Insights */}
                    <div className="space-y-1.5 text-xs">
                      <span className="text-stone-300 font-semibold block flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Hidden Surcharges to Plan For:</span>
                      </span>
                      <ul className="space-y-1 text-stone-400 pl-4 list-disc text-[11px]">
                        {exam.hiddenCosts.map((cost, idx) => (
                          <li key={idx}>{cost}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--theme-border)] text-[11px] text-stone-400 italic">
                    {exam.currencyBufferNote}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real Score Send Cost Calculator */}
          <div className="theme-card p-6 sm:p-8 space-y-4">
            <h4 className="font-bold text-white text-base font-serif-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
              <span>Score-Sending Real Math (10 Applications Example)</span>
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-2">
                <span className="font-bold text-white block">Digital SAT</span>
                <p className="text-stone-300">
                  4 free reports before score release. Sending scores to remaining 6 colleges costs <strong>6 x $15 = $90 USD</strong>.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-2">
                <span className="font-bold text-white block">TOEFL iBT</span>
                <p className="text-stone-300">
                  4 free reports before exam day. Remaining 6 universities cost <strong>6 x $25 = $150 USD</strong> extra.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-2">
                <span className="font-bold text-white block">Duolingo English Test (DET)</span>
                <p className="text-stone-300">
                  Includes <strong>unlimited free score reporting</strong> to all 4,500+ accepting institutions forever. Total cost: <strong>$0</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TEST CENTER DIRECTORY & SEAT RADAR */}
      {activeTab === 'radar' && (
        <div className="space-y-6">
          {/* Quick link to live GPS status alerts */}
          <div className="theme-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border border-yellow-400/40 bg-stone-900">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse shrink-0" />
              <div>
                <span className="font-bold text-white block">Need real-time cancellation alerts &amp; location-based commute times?</span>
                <span className="text-stone-300">View live status alerts, transit buffers, and power backup status on the new GPS Test Center Status radar.</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('status')}
              className="px-3 py-1.5 rounded-lg bg-yellow-400 text-stone-950 font-bold hover:bg-yellow-300 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer text-xs"
            >
              <span>Switch to Live Status Radar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Filter Toolbar */}
          <div className="theme-card p-5 grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Search Test Center or City:
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="e.g. Mumbai, Dubai, Seoul, Lagos..."
                  value={centerSearch}
                  onChange={(e) => setCenterSearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Filter by Country:
              </label>
              <select
                value={selectedCenterCountry}
                onChange={(e) => setSelectedCenterCountry(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
              >
                {centerCountries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Exams Administered:
              </label>
              <select
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
              >
                <option value="All">All Exams (SAT, TOEFL, ACT, IELTS)</option>
                <option value="SAT">Digital SAT</option>
                <option value="TOEFL">TOEFL iBT</option>
                <option value="ACT">ACT</option>
                <option value="IELTS">IELTS</option>
              </select>
            </div>
          </div>

          {/* Test Center Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCenters.map((center) => (
              <div
                key={center.id}
                className="theme-card p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-400">
                        <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                        <span>
                          {center.city}, {center.country}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-base font-serif-display mt-1">
                        {center.name}
                      </h4>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 shrink-0">
                      {center.reliabilityRating}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {center.examsOffered.map((ex) => (
                      <span
                        key={ex}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-stone-300 font-semibold"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] text-xs space-y-2">
                    <div className="space-y-1">
                      <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                        <Laptop className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                        <span>Device & Technical Requirements:</span>
                      </span>
                      <p className="text-stone-400 text-[11px] leading-relaxed">
                        {center.deviceRequirements}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[var(--theme-border)] space-y-1">
                      <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Cancellation & Facility Notes:</span>
                      </span>
                      <p className="text-stone-400 text-[11px] leading-relaxed">
                        {center.cancellationNotes}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--theme-border)] text-[11px] text-stone-400">
                  <strong>Address:</strong> {center.address}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FEE WAIVER ELIGIBILITY CHECKER */}
      {activeTab === 'fee-waiver' && (
        <div className="space-y-8">
          {/* Clarification Notice */}
          <div className="p-5 rounded-xl border border-amber-500/40 bg-amber-950/20 text-amber-200 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm">
              <h4 className="font-bold text-base text-amber-300 font-serif-display">
                Important Clarity: College Board Fee Waiver Realities for Foreign Nationals
              </h4>
              <p className="text-stone-300 leading-relaxed">
                A common point of confusion is whether international students can receive College Board fee waivers for the SAT. <strong>Official College Board testing fee waivers are strictly legally restricted to US Citizens, US Permanent Residents, and students testing inside the 50 US states or US territories.</strong> Foreign students studying abroad do not qualify for registration exam waivers directly from the testing agency.
              </p>
            </div>
          </div>

          {/* Interactive Questionnaire */}
          <div className="theme-card p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold font-serif-display text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--theme-accent)]" />
              <span>Verify Your Standardized Testing Fee Waiver Eligibility</span>
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Question 1 */}
              <div className="p-4 rounded-xl bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-3">
                <span className="font-semibold text-stone-200 text-xs block">
                  1. Are you a US Citizen or Permanent Resident (Green Card holder)?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsUsCitizenOrResident('yes')}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border transition-colors ${
                      isUsCitizenOrResident === 'yes'
                        ? 'bg-[var(--theme-accent)] text-stone-950 border-[var(--theme-accent)]'
                        : 'border-[var(--theme-border)] text-stone-300 hover:text-white'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setIsUsCitizenOrResident('no')}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border transition-colors ${
                      isUsCitizenOrResident === 'no'
                        ? 'bg-[var(--theme-accent)] text-stone-950 border-[var(--theme-accent)]'
                        : 'border-[var(--theme-border)] text-stone-300 hover:text-white'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Question 2 */}
              <div className="p-4 rounded-xl bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-3">
                <span className="font-semibold text-stone-200 text-xs block">
                  2. Are you enrolled in a high school located within the 50 US States?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEnrolledInUsHighSchool('yes')}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border transition-colors ${
                      isEnrolledInUsHighSchool === 'yes'
                        ? 'bg-[var(--theme-accent)] text-stone-950 border-[var(--theme-accent)]'
                        : 'border-[var(--theme-border)] text-stone-300 hover:text-white'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setIsEnrolledInUsHighSchool('no')}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border transition-colors ${
                      isEnrolledInUsHighSchool === 'no'
                        ? 'bg-[var(--theme-accent)] text-stone-950 border-[var(--theme-accent)]'
                        : 'border-[var(--theme-border)] text-stone-300 hover:text-white'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Question 3 */}
              <div className="p-4 rounded-xl bg-[var(--theme-surface-subtle)] border border-[var(--theme-border)] space-y-3">
                <span className="font-semibold text-stone-200 text-xs block">
                  3. Do you reside in Puerto Rico or a US Territory (Guam, USVI)?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsUsTerritoryResident('yes')}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border transition-colors ${
                      isUsTerritoryResident === 'yes'
                        ? 'bg-[var(--theme-accent)] text-stone-950 border-[var(--theme-accent)]'
                        : 'border-[var(--theme-border)] text-stone-300 hover:text-white'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setIsUsTerritoryResident('no')}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border transition-colors ${
                      isUsTerritoryResident === 'no'
                        ? 'bg-[var(--theme-accent)] text-stone-950 border-[var(--theme-accent)]'
                        : 'border-[var(--theme-border)] text-stone-300 hover:text-white'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Verdict Box */}
            <div
              className={`p-6 rounded-xl border ${
                feeWaiverVerdict.eligible
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                  : 'bg-[var(--theme-surface-subtle)] border-[var(--theme-border)] text-stone-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {feeWaiverVerdict.eligible ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-6 h-6 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                )}
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-base font-serif-display">
                    {feeWaiverVerdict.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {feeWaiverVerdict.summary}
                  </p>
                  <div className="p-3 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-xs font-medium text-stone-200">
                    <strong>Recommended Next Action:</strong> {feeWaiverVerdict.action}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TEST POLICY & SELF-REPORTING DATABASE */}
      {activeTab === 'policies' && (
        <div className="space-y-6">
          {/* Policy Filter Toolbar */}
          <div className="theme-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search university policy (e.g. Harvard, MIT, UC)..."
                value={policySearch}
                onChange={(e) => setPolicySearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-subtle)] text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPolicyFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  policyFilter === 'all'
                    ? 'bg-[var(--theme-accent)] text-stone-950 font-bold'
                    : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
                }`}
              >
                All Policies
              </button>
              <button
                onClick={() => setPolicyFilter('free')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  policyFilter === 'free'
                    ? 'bg-[var(--theme-accent)] text-stone-950 font-bold'
                    : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
                }`}
              >
                100% Free Self-Reporting ($0)
              </button>
              <button
                onClick={() => setPolicyFilter('paid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  policyFilter === 'paid'
                    ? 'bg-[var(--theme-accent)] text-stone-950 font-bold'
                    : 'bg-[var(--theme-surface-subtle)] text-stone-300 hover:text-white border border-[var(--theme-border)]'
                }`}
              >
                Paid Official Score Required
              </button>
            </div>
          </div>

          {/* Policy Database Cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {filteredPolicies.map((item) => (
              <div
                key={item.universityName}
                className="theme-card p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-white text-base font-serif-display">
                      {item.universityName}
                    </h4>
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold shrink-0 ${
                        item.estimatedScoreReportingCostUSD === 0
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {item.estimatedScoreReportingCostUSD === 0
                        ? '$0 Free Self-Report'
                        : `~$${item.estimatedScoreReportingCostUSD} Official Send`}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed bg-[var(--theme-surface-subtle)] p-3 rounded-lg border border-[var(--theme-border)]">
                    {item.policyDetails}
                  </p>

                  <div className="text-xs text-stone-400 space-y-1">
                    <strong className="text-white block">Official Report Requirement:</strong>
                    <p>{item.officialReportWhenRequired}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--theme-border)] flex items-center justify-between text-xs">
                  <span className="text-stone-400">
                    Self-Report SAT: <strong>{item.acceptsSelfReportedSat ? 'Yes' : 'No'}</strong> | TOEFL:{' '}
                    <strong>{item.acceptsSelfReportedToefl ? 'Yes' : 'No'}</strong>
                  </span>
                  <button
                    onClick={onGoToUniversitySearch}
                    className="text-[var(--theme-accent)] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View University</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
