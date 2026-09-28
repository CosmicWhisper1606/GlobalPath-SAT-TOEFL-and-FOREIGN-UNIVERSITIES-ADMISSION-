import React, { useState, useEffect } from 'react';
import {
  Globe2,
  Search,
  Flag,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Info,
  Sliders,
  Check,
  Copy,
  Layers,
  HelpCircle,
  Loader2,
  Plane
} from 'lucide-react';
import {
  GLOBAL_ORIGIN_PROFILES,
  OriginCountryProfile
} from '../data/globalStudentData';

interface GlobalStudentHubProps {
  onGoToTracker?: () => void;
  onGoToConverter?: () => void;
}

export const GlobalStudentHub: React.FC<GlobalStudentHubProps> = ({
  onGoToTracker,
  onGoToConverter,
}) => {
  // Selected origin nation
  const [selectedCountryId, setSelectedCountryId] = useState<string>('india');
  const [targetDestination, setTargetDestination] = useState<'usa' | 'uk' | 'germany' | 'canada' | 'australia'>('usa');
  const [activeTab, setActiveTab] = useState<'curriculum' | 'visa-embassy' | 'funds' | 'scholarships' | 'custom-ai'>('curriculum');

  // Custom nationality AI query
  const [customNationInput, setCustomNationInput] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiCustomGuidance, setAiCustomGuidance] = useState<any>(null);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Grade interactive calculator state
  const [userGradeScore, setUserGradeScore] = useState<number>(85);

  // Current active profile
  const activeProfile = GLOBAL_ORIGIN_PROFILES.find((c) => c.id === selectedCountryId) || GLOBAL_ORIGIN_PROFILES[0];

  // Request custom guidance from backend
  const handleQueryCustomNation = async () => {
    if (!customNationInput.trim()) return;
    setIsAiLoading(true);
    setActiveTab('custom-ai');
    try {
      const res = await fetch('/api/global-country-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originCountry: customNationInput.trim(),
          targetCountry: targetDestination.toUpperCase(),
          educationLevel: 'undergraduate & graduate',
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch country guidance');
      const data = await res.json();
      if (data.guidance) {
        setAiCustomGuidance(data.guidance);
      }
    } catch (err) {
      console.error('Error fetching custom country guidance:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Convert destination target cost to local currency
  const getProofOfFundsLocalAmount = () => {
    let usdEquivalent = 45000;
    if (targetDestination === 'germany') usdEquivalent = 13500; // Blocked account €11,904
    else if (targetDestination === 'uk') usdEquivalent = 38000; // Tuition + £12,000 living
    else if (targetDestination === 'canada') usdEquivalent = 35000; // Tuition + GIC $20,635 CAD
    else if (targetDestination === 'australia') usdEquivalent = 40000;

    const localAmount = usdEquivalent * activeProfile.exchangeRateToUSD;
    return {
      usd: usdEquivalent,
      local: localAmount.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      symbol: activeProfile.currencySymbol,
      code: activeProfile.currencyCode,
    };
  };

  const fundsData = getProofOfFundsLocalAmount();

  // Copy nationality dossier
  const handleCopyDossier = () => {
    const text = `[GlobalPath Universal International Student Dossier]
• Origin Nation: ${activeProfile.name} ${activeProfile.flag}
• Target Destination: ${targetDestination.toUpperCase()}
• Primary Local Curriculum: ${activeProfile.nationalCurriculum.primaryBoard}
• Grade Equivalency: ${activeProfile.nationalCurriculum.conversionToUsGpa}
• English Waiver Policy: ${activeProfile.englishWaiverPolicy.conditions}
• Proof of Funds Needed: ~${fundsData.symbol}${fundsData.local} (${fundsData.code}) / $${fundsData.usd.toLocaleString()} USD
• Key Embassy Verification: ${
      targetDestination === 'germany' && activeProfile.destinationEmbassyRules.germany.apsCertificateMandatory
        ? '⚠️ APS Certificate is STRICTLY MANDATORY before visa appointment'
        : targetDestination === 'uk' && activeProfile.destinationEmbassyRules.uk.tbTestMandatory
        ? '⚠️ Tuberculosis (TB) test certificate is mandatory'
        : 'Standard consular visa and financial evaluation'
    }
• Exclusive Scholarships: ${activeProfile.exclusiveScholarships.map((s) => s.name).join(', ')}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
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
          <Globe2 className="w-4 h-4" />
          <span>Universal International Student Authority</span>
          <span aria-hidden="true">·</span>
          <span>Tailored Guidance for 195+ Nationalities</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          Global Student Advisory & Origin Intelligence Hub
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Applying to study abroad involves radically different rules depending on your home country. Access localized high school curriculum conversions, English language waiver (MOI) eligibility, mandatory embassy verification checks (like the German APS or UK TB test), local currency solvency calculations, and exclusive bilateral scholarships.
        </p>

        {/* Origin Country Selector Strip */}
        <div className="mt-6 space-y-3">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            Step 1: Select Your Home / Origin Country
          </span>
          <div className="flex flex-wrap gap-2">
            {GLOBAL_ORIGIN_PROFILES.map((profile) => (
              <button
                key={profile.id}
                onClick={() => {
                  setSelectedCountryId(profile.id);
                  if (activeTab === 'custom-ai') setActiveTab('curriculum');
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCountryId === profile.id && activeTab !== 'custom-ai'
                    ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className="text-base">{profile.flag}</span>
                <span>{profile.name}</span>
              </button>
            ))}
          </div>

          {/* Any other nation on Earth custom query input */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="From another nation? (e.g. Nepal, Ghana, Bangladesh, Indonesia, Turkey, Colombia, Egypt, etc.)"
                value={customNationInput}
                onChange={(e) => setCustomNationInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQueryCustomNation()}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              onClick={handleQueryCustomNation}
              disabled={isAiLoading || !customNationInput.trim()}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 disabled:opacity-40 cursor-pointer"
            >
              {isAiLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing Nation...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                  <span>Generate AI Advisory</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Target Study Destination Selector */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wide">
              Step 2: Destination Country:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'usa', label: '🇺🇸 United States' },
                { id: 'uk', label: '🇬🇧 United Kingdom' },
                { id: 'germany', label: '🇩🇪 Germany' },
                { id: 'canada', label: '🇨🇦 Canada' },
                { id: 'australia', label: '🇦🇺 Australia' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setTargetDestination(d.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    targetDestination === d.id
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCopyDossier}
            className="text-xs text-stone-700 hover:text-stone-900 flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 cursor-pointer"
          >
            {copiedSummary ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Dossier Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Nationality Dossier</span>
              </>
            )}
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-stone-200 pb-2">
          {[
            { id: 'curriculum', label: '1. Curriculum & Board Equivalency' },
            { id: 'visa-embassy', label: '2. Embassy & Mandatory Verification' },
            { id: 'funds', label: '3. Proof of Funds & Solvency in Local Currency' },
            { id: 'scholarships', label: '4. Dedicated Nationality Scholarships' },
            ...(aiCustomGuidance ? [{ id: 'custom-ai', label: `5. Custom Advisory (${aiCustomGuidance.originCountry})` }] : []),
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Profile Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{activeProfile.flag}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-stone-900 font-serif-display">
                {activeProfile.name} Student Passport Pathway
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono">
                {activeProfile.region}
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Evaluating academic transition from {activeProfile.name} to {targetDestination.toUpperCase()} higher education.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs bg-stone-50 p-2.5 rounded-xl border border-stone-200 shrink-0">
          <div>
            <span className="text-stone-500 block text-[10px] uppercase font-semibold">Local Currency</span>
            <span className="font-mono font-bold text-stone-900 text-sm">
              {activeProfile.currencySymbol} ({activeProfile.currencyCode})
            </span>
          </div>
          <span className="text-stone-300">|</span>
          <div>
            <span className="text-stone-500 block text-[10px] uppercase font-semibold">FX Benchmark</span>
            <span className="font-mono font-bold text-amber-700 text-sm">
              $1 USD ≈ {activeProfile.exchangeRateToUSD} {activeProfile.currencyCode}
            </span>
          </div>
        </div>
      </div>

      {/* Tab 1: Curriculum & Grade Equivalency */}
      {activeTab === 'curriculum' && (
        <div className="space-y-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: National Grading Breakdown */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-6">
              <h4 className="text-lg font-bold text-stone-900 font-serif-display flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-700" />
                <span>National Secondary & Bachelor’s Credentials</span>
              </h4>

              <div className="space-y-4">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">
                    Primary Recognized National Board
                  </span>
                  <span className="text-sm font-bold text-stone-900 mt-1 block">
                    {activeProfile.nationalCurriculum.primaryBoard}
                  </span>
                  <p className="text-xs text-stone-500 mt-1">
                    Grading Scale: {activeProfile.nationalCurriculum.gradingScale}
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 uppercase block">US Equivalent GPA</span>
                    <span className="text-xs font-semibold text-stone-800 mt-1 block">
                      {activeProfile.nationalCurriculum.conversionToUsGpa}
                    </span>
                  </div>
                  <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 uppercase block">UK Honours Class</span>
                    <span className="text-xs font-semibold text-stone-800 mt-1 block">
                      {activeProfile.nationalCurriculum.conversionToUkClass}
                    </span>
                  </div>
                  <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 uppercase block">German Anabin Note</span>
                    <span className="text-xs font-semibold text-stone-800 mt-1 block">
                      {activeProfile.nationalCurriculum.conversionToGermanNote}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-stone-800 space-y-1">
                  <span className="font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Mandatory Credential Evaluation Agency</span>
                  </span>
                  <p className="leading-relaxed">
                    {activeProfile.nationalCurriculum.credentialEvaluationService}
                  </p>
                </div>
              </div>

              {/* Interactive Score Normalizer */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Check Your Score Standing ({activeProfile.name}):
                  </label>
                  <span className="font-mono font-bold text-amber-700 text-sm">
                    {userGradeScore}% / 100%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={userGradeScore}
                  onChange={(e) => setUserGradeScore(parseInt(e.target.value))}
                  className="w-full accent-stone-900"
                />
                <div className="p-3 bg-stone-100 rounded-lg text-xs text-stone-700 flex items-center justify-between">
                  <span>Estimated Global Standing:</span>
                  <strong className="font-mono text-stone-900">
                    {userGradeScore >= 85
                      ? 'Top Tier (Competitive for Ivy League, Oxbridge, G5, Russell Group)'
                      : userGradeScore >= 70
                      ? 'Solid Direct Admission Tier (Top 100 Global & Public Flagships)'
                      : 'Foundation / Pathway Pathway Admissible'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Right: English Language Waiver Policy */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-stone-900 font-serif-display flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-700" />
                  <span>English Waiver & MOI Rules</span>
                </h4>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                  activeProfile.englishWaiverPolicy.moiAccepted
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {activeProfile.englishWaiverPolicy.moiAccepted ? 'MOI Waivers Available' : 'Exam Strictly Mandated'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <strong className="text-xs font-bold text-stone-800 uppercase block">
                    Can You Waive TOEFL / IELTS?
                  </strong>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {activeProfile.englishWaiverPolicy.conditions}
                  </p>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <strong className="text-xs font-bold text-stone-800 uppercase block">
                    Recommended Testing Route
                  </strong>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {activeProfile.englishWaiverPolicy.recommendedExams}
                  </p>
                </div>

                {onGoToConverter && (
                  <button
                    onClick={onGoToConverter}
                    className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Open Score Converter (TOEFL ⇄ IELTS ⇄ Duolingo)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Visa & Mandatory Embassy Verification */}
      {activeTab === 'visa-embassy' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Country-Specific Embassy Flag Cards */}
            {/* 1. Germany APS Check */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-3 ${
              activeProfile.destinationEmbassyRules.germany.apsCertificateMandatory
                ? 'bg-rose-50/50 border-rose-300 ring-2 ring-rose-400/20'
                : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase font-mono text-stone-600">
                  🇩🇪 Germany Requirements
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  activeProfile.destinationEmbassyRules.germany.apsCertificateMandatory
                    ? 'bg-rose-200 text-rose-900'
                    : 'bg-stone-100 text-stone-700'
                }`}>
                  {activeProfile.destinationEmbassyRules.germany.apsCertificateMandatory
                    ? '⚠️ APS Mandatory'
                    : 'Standard Anabin'}
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                APS & Blocked Account Protocol
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {activeProfile.destinationEmbassyRules.germany.specialNotes}
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-stone-800 border-t border-stone-100">
                Blocked Account: €{activeProfile.destinationEmbassyRules.germany.blockedAccountAmountEur.toLocaleString()}/year
              </div>
            </div>

            {/* 2. UK TB Screening & CAS */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-3 ${
              activeProfile.destinationEmbassyRules.uk.tbTestMandatory
                ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-400/20'
                : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase font-mono text-stone-600">
                  🇬🇧 UK Requirements
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  activeProfile.destinationEmbassyRules.uk.tbTestMandatory
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {activeProfile.destinationEmbassyRules.uk.tbTestMandatory
                    ? '⚠️ TB Test Required'
                    : 'No TB Test Required'}
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                CAS & IOM Medical Certificate
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {activeProfile.destinationEmbassyRules.uk.tbTestMandatory
                  ? `Students from ${activeProfile.name} residing for >6 months must obtain an official Tuberculosis clearance certificate from an IOM-approved clinic prior to visa submission.`
                  : `Citizens residing in ${activeProfile.name} are exempt from mandatory UK TB screening.`}
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-stone-800 border-t border-stone-100">
                Holding Period: 28 consecutive days in approved bank
              </div>
            </div>

            {/* 3. USA 214(b) & I-20 */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase font-mono text-stone-600">
                  🇺🇸 United States
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                  INA 214(b) Scrutiny
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                F-1 Non-Immigrant Intent Strategy
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {activeProfile.destinationEmbassyRules.usa.proofOfFundsTips}
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-stone-800 border-t border-stone-100">
                SEVIS I-901 ($350) + DS-160 ($185)
              </div>
            </div>

            {/* 4. Canada PAL & GIC */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase font-mono text-stone-600">
                  🇨🇦 Canada Requirements
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                  PAL + GIC Mandatory
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                Provincial Attestation Letter (PAL)
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {activeProfile.destinationEmbassyRules.canada.studyPermitNotes}
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-stone-800 border-t border-stone-100">
                GIC Deposit: CAD ${activeProfile.destinationEmbassyRules.canada.gicAmountCad.toLocaleString()}
              </div>
            </div>

            {/* 5. Australia Genuine Student Check */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase font-mono text-stone-600">
                  🇦🇺 Australia Subclass 500
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                  {activeProfile.destinationEmbassyRules.australia.assessmentLevel}
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                Genuine Student (GS) Criterion
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {activeProfile.destinationEmbassyRules.australia.genuineStudentCheck}
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-stone-800 border-t border-stone-100">
                Living Funds: AUD $29,710/year proof
              </div>
            </div>

            {/* 6. Critical Consular Rejection Traps */}
            <div className="p-6 rounded-2xl border border-stone-900 bg-stone-900 text-stone-100 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase font-mono text-amber-400">
                ⚠️ Common Pitfalls for {activeProfile.name}
              </span>
              <h4 className="text-base font-bold text-white font-serif-display">
                Critical Embassy Warnings
              </h4>
              <ul className="text-xs text-stone-300 space-y-1.5 list-disc pl-4">
                {activeProfile.criticalAdvisories.map((adv, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Proof of Funds in Local Currency */}
      {activeTab === 'funds' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                  Financial Solvency Calculator
                </span>
                <h3 className="text-2xl font-bold text-stone-900 font-serif-display mt-0.5">
                  1-Year Required Financial Proof in {activeProfile.currencyCode}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-500 block">Calculated Total</span>
                <span className="text-3xl font-extrabold font-mono text-stone-900">
                  {fundsData.symbol}{fundsData.local} {fundsData.code}
                </span>
                <span className="text-xs text-stone-500 block">≈ ${fundsData.usd.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-xs text-stone-500 block">Target Destination</span>
                <span className="text-lg font-bold text-stone-900 mt-1 block uppercase">
                  {targetDestination}
                </span>
                <p className="text-xs text-stone-500 mt-1">
                  Tuition + 12-month living maintenance benchmark
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-xs text-stone-500 block">Official Mechanism</span>
                <span className="text-base font-bold text-stone-900 mt-1 block">
                  {targetDestination === 'germany'
                    ? 'Sperrkonto (Blocked Account)'
                    : targetDestination === 'canada'
                    ? 'GIC + Tuition Receipt'
                    : targetDestination === 'uk'
                    ? '28-Day Bank Statement'
                    : 'I-20 Bank Letter / Loan'}
                </span>
                <p className="text-xs text-stone-500 mt-1">
                  Must be held in student’s or parent’s name
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-xs text-stone-500 block">Accepted Financial Proof</span>
                <span className="text-xs font-bold text-emerald-800 mt-1 block">
                  Sanctioned Education Loans, Fixed Deposits, Liquid Savings
                </span>
                <p className="text-xs text-rose-600 mt-1">
                  ❌ Stocks, mutual funds, or real estate values NOT accepted as primary liquid proof
                </p>
              </div>
            </div>

            {/* Specific advice for this origin country */}
            <div className="p-5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs sm:text-sm text-stone-800 space-y-2">
              <strong className="font-bold text-amber-950 uppercase tracking-wide block">
                Official Currency Remittance & Banking Advice ({activeProfile.name}):
              </strong>
              <p className="leading-relaxed">
                {activeProfile.destinationEmbassyRules.usa.proofOfFundsTips}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Dedicated Nationality Scholarships */}
      {activeTab === 'scholarships' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-stone-900 font-serif-display flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-700" />
              <span>Exclusive Scholarships for Citizens of {activeProfile.name}</span>
            </h3>
            <span className="text-xs text-stone-500">
              {activeProfile.exclusiveScholarships.length} Bilateral Programs
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {activeProfile.exclusiveScholarships.map((sch, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-stone-900 font-serif-display">
                      {sch.name}
                    </h4>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                      National Grant
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-800">
                    Award: {sch.awardType}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Eligibility: {sch.eligibility}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">
                    Deadline: <strong>{sch.deadline}</strong>
                  </span>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(sch.name + ' scholarship application')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-900 font-semibold hover:text-amber-700 flex items-center gap-1"
                  >
                    <span>View Guidelines</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Custom AI Generated Dossier for Any Country */}
      {activeTab === 'custom-ai' && aiCustomGuidance && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>AI-Synthesized Global Nationality Dossier</span>
              </span>
              <h3 className="text-2xl font-bold text-stone-900 font-serif-display mt-0.5">
                Advisory for Citizens of {aiCustomGuidance.originCountry} applying to {aiCustomGuidance.targetCountry}
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-stone-100 text-stone-800">
              Generated via Gemini 3.8 Flash
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* National Board Conversion */}
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <span className="text-xs font-bold text-stone-800 uppercase block">
                Local Curriculum & Grading System:
              </span>
              <p className="text-sm font-semibold text-stone-900">
                {aiCustomGuidance.nationalCurriculumConversion?.localBoard}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                {aiCustomGuidance.nationalCurriculumConversion?.conversionSummary}
              </p>
              <div className="text-[11px] text-amber-800 pt-1 font-medium">
                Agency: {aiCustomGuidance.nationalCurriculumConversion?.evaluationAgency}
              </div>
            </div>

            {/* English Waiver Eligibility */}
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <span className="text-xs font-bold text-stone-800 uppercase block">
                English Proficiency Waiver Assessment:
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded inline-block ${
                aiCustomGuidance.englishWaiverEligibility?.canWaive
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-rose-100 text-rose-900'
              }`}>
                {aiCustomGuidance.englishWaiverEligibility?.canWaive
                  ? 'Waiver Potential Available'
                  : 'Formal Test (TOEFL/IELTS) Required'}
              </span>
              <p className="text-xs text-stone-600 leading-relaxed mt-1">
                {aiCustomGuidance.englishWaiverEligibility?.explanation}
              </p>
            </div>
          </div>

          {/* Embassy Checklist & Solvency */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-800 uppercase block">
                Essential Embassy Visa Checklist ({aiCustomGuidance.originCountry}):
              </span>
              <ul className="text-xs text-stone-700 space-y-2">
                {aiCustomGuidance.embassyVisaChecklist?.map((req: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-800 uppercase block">
                Proof of Funds in Local Currency:
              </span>
              <div className="text-lg font-bold font-mono text-stone-900">
                {aiCustomGuidance.proofOfFundsGuidance?.localCurrencyEstimatedAmount} ({aiCustomGuidance.proofOfFundsGuidance?.localCurrencyCode})
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Accepted: {aiCustomGuidance.proofOfFundsGuidance?.acceptedFinancialInstruments}
              </p>
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-xs text-rose-950 mt-2">
                <strong>Critical Visa Trap: </strong>
                {aiCustomGuidance.criticalVisaTrap}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
