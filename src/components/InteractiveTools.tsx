import React, { useState } from 'react';
import {
  DollarSign,
  Calculator,
  Compass,
  CheckCircle2,
  RefreshCw,
  Building,
  Plane,
  Home,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';
import { ScoreConverter } from './ScoreConverter';

interface InteractiveToolsProps {
  initialTool?: 'cost' | 'matcher' | 'converter';
}

export const InteractiveTools: React.FC<InteractiveToolsProps> = ({ initialTool = 'cost' }) => {
  const [activeTool, setActiveTool] = useState<'cost' | 'matcher' | 'converter'>(initialTool);

  // Cost calculator states
  const [country, setCountry] = useState<'usa' | 'uk' | 'canada' | 'germany' | 'australia'>('usa');
  const [institutionType, setInstitutionType] = useState<'private' | 'public'>('private');
  const [housingType, setHousingType] = useState<'dorm' | 'shared_apt' | 'studio'>('dorm');
  const [cityTier, setCityTier] = useState<'metro' | 'college_town'>('metro');
  const [degreeYears, setDegreeYears] = useState<number>(4);

  // Profile Matcher states
  const [userSat, setUserSat] = useState<number>(1450);
  const [userToefl, setUserToefl] = useState<number>(100);
  const [userGpa, setUserGpa] = useState<number>(3.8);

  // Dynamic cost calculation logic
  const calculateCosts = () => {
    let baseTuition = 0;
    let baseHousing = 0;
    let baseInsurance = 1500;
    let baseFlightExam = 2200; // SAT ($111) + TOEFL ($220) + Visa + Flights

    if (country === 'usa') {
      baseTuition = institutionType === 'private' ? 58000 : 32000;
      baseHousing = housingType === 'dorm' ? 16000 : housingType === 'shared_apt' ? 12000 : 20000;
      if (cityTier === 'metro') baseHousing *= 1.25;
      baseInsurance = 2800;
    } else if (country === 'uk') {
      baseTuition = institutionType === 'private' ? 36000 : 26000;
      baseHousing = housingType === 'dorm' ? 13000 : housingType === 'shared_apt' ? 10000 : 16000;
      if (cityTier === 'metro') baseHousing *= 1.35; // London weight
      baseInsurance = 1000; // NHS surcharge
    } else if (country === 'canada') {
      baseTuition = institutionType === 'private' ? 38000 : 28000;
      baseHousing = housingType === 'dorm' ? 14000 : housingType === 'shared_apt' ? 10500 : 17000;
      if (cityTier === 'metro') baseHousing *= 1.2;
      baseInsurance = 1200;
    } else if (country === 'germany') {
      baseTuition = institutionType === 'private' ? 12000 : 600; // Public universities tuition is essentially free!
      baseHousing = housingType === 'dorm' ? 6000 : housingType === 'shared_apt' ? 7500 : 11000;
      if (cityTier === 'metro') baseHousing *= 1.2;
      baseInsurance = 1400; // German public health insurance (TK/AOK)
    } else if (country === 'australia') {
      baseTuition = institutionType === 'private' ? 38000 : 30000;
      baseHousing = housingType === 'dorm' ? 16000 : housingType === 'shared_apt' ? 13000 : 19000;
      if (cityTier === 'metro') baseHousing *= 1.2;
      baseInsurance = 1600;
    }

    const annualTotal = baseTuition + baseHousing + baseInsurance;
    const fullDegreeTotal = (annualTotal * degreeYears) + baseFlightExam;

    return {
      tuition: Math.round(baseTuition),
      housing: Math.round(baseHousing),
      insurance: Math.round(baseInsurance),
      oneTimeFees: baseFlightExam,
      annualTotal: Math.round(annualTotal),
      fullDegreeTotal: Math.round(fullDegreeTotal)
    };
  };

  const costs = calculateCosts();

  // Matcher tier logic
  const getMatcherResults = () => {
    let reaches: string[] = [];
    let targets: string[] = [];
    let safeties: string[] = [];

    if (userSat >= 1520 && userGpa >= 3.85 && userToefl >= 100) {
      reaches = ['MIT', 'Stanford University', 'Harvard University', 'Yale University', 'Princeton'];
      targets = ['Carnegie Mellon (CMU)', 'Columbia University', 'Cornell University', 'Duke University', 'Northwestern'];
      safeties = ['New York University (NYU)', 'Georgia Tech', 'Univ of Michigan', 'Purdue University', 'UIUC'];
    } else if (userSat >= 1430 && userGpa >= 3.65 && userToefl >= 95) {
      reaches = ['Carnegie Mellon', 'UC Berkeley', 'Cornell', 'Brown', 'Johns Hopkins'];
      targets = ['NYU', 'University of Michigan', 'Georgia Tech', 'Boston University', 'Univ of Toronto'];
      safeties = ['Purdue University', 'UW Seattle', 'Penn State', 'Ohio State University', 'Texas A&M'];
    } else if (userSat >= 1320 && userGpa >= 3.4 && userToefl >= 85) {
      reaches = ['NYU', 'Boston University', 'Univ of Southern California (USC)', 'Univ of Edinburgh'];
      targets = ['Purdue University', 'University of Wisconsin-Madison', 'University of Maryland', 'Rutgers'];
      safeties = ['University of Arizona', 'Arizona State (ASU)', 'Michigan State', 'University of Utah'];
    } else {
      reaches = ['Purdue University', 'Penn State', 'Indiana University Bloomington'];
      targets = ['Arizona State University (ASU)', 'University of Texas at Dallas', 'SUNY Buffalo', 'Iowa State'];
      safeties = ['University of South Florida', 'University of North Texas', 'Wichita State', 'UT Arlington'];
    }

    return { reaches, targets, safeties };
  };

  const matcherResults = getMatcherResults();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header and Sub-navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Student Simulation Suite</span>
          <span aria-hidden="true">·</span>
          <span>Financial Planning & Admissions Targeting</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          Study Abroad Cost Estimator, Matcher & Score Converter
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Accurately forecast your full multi-year financial investment, translate TOEFL iBT scores to approximate IELTS or Duolingo equivalents, or match your academic profile to realistic Reach, Target, and Safety universities.
        </p>

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200/60 pt-4">
          <button
            onClick={() => setActiveTool('cost')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTool === 'cost'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            1. Total Cost of Attendance (COA) Calculator
          </button>
          <button
            onClick={() => setActiveTool('matcher')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTool === 'matcher'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            2. SAT & TOEFL University Matcher
          </button>
          <button
            onClick={() => setActiveTool('converter')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'converter'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
            <span>3. English Score Converter (TOEFL ⇄ IELTS ⇄ Duolingo)</span>
          </button>
        </div>
      </div>

      {/* Tool 1: Cost of Attendance Calculator */}
      {activeTool === 'cost' && (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Controls Deck */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 font-serif-display">
              <Calculator className="w-5 h-5 text-amber-700" />
              <span>Select Your Study Parameters</span>
            </h3>

            {/* Destination Country */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Target Study Destination
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'usa', label: '🇺🇸 USA' },
                  { id: 'uk', label: '🇬🇧 UK' },
                  { id: 'canada', label: '🇨🇦 Canada' },
                  { id: 'germany', label: '🇩🇪 Germany' },
                  { id: 'australia', label: '🇦🇺 Australia' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCountry(c.id as any)}
                    className={`py-2 px-2 text-xs font-medium rounded border transition-colors ${
                      country === c.id
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* University Type */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Institution Classification
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setInstitutionType('private')}
                  className={`py-2 px-3 text-xs rounded border text-left transition-colors ${
                    institutionType === 'private'
                      ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="font-semibold">Private University</div>
                  <div className="text-[11px] opacity-80">
                    {country === 'germany' ? 'Private business/tech school' : 'e.g. Ivy League, NYU, Stanford, USC'}
                  </div>
                </button>
                <button
                  onClick={() => setInstitutionType('public')}
                  className={`py-2 px-3 text-xs rounded border text-left transition-colors ${
                    institutionType === 'public'
                      ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="font-semibold">Public State University</div>
                  <div className="text-[11px] opacity-80">
                    {country === 'germany' ? '€0 Tuition (TUM, LMU, RWTH)' : 'e.g. Purdue, Michigan, UC Berkeley'}
                  </div>
                </button>
              </div>
            </div>

            {/* Housing Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Accommodation Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'dorm', label: 'On-Campus Dorm', sub: 'Meal plan included' },
                  { id: 'shared_apt', label: 'Shared Apartment', sub: 'Off-campus flatshare' },
                  { id: 'studio', label: 'Private Studio', sub: 'Independent living' },
                ].map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setHousingType(h.id as any)}
                    className={`py-2 px-2.5 text-xs rounded border text-left transition-colors ${
                      housingType === h.id
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div>{h.label}</div>
                    <div className="text-[10px] opacity-75">{h.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* City Tier & Duration */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Location Tier
                </label>
                <select
                  value={cityTier}
                  onChange={(e) => setCityTier(e.target.value as any)}
                  className="w-full text-xs sm:text-sm border border-stone-300 rounded p-2 bg-white text-stone-900"
                >
                  <option value="metro">Major Global Metro (NYC, London, Sydney, Toronto, Munich)</option>
                  <option value="college_town">Suburban / College Town (Ann Arbor, West Lafayette, Oxford)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Program Duration
                </label>
                <select
                  value={degreeYears}
                  onChange={(e) => setDegreeYears(parseInt(e.target.value))}
                  className="w-full text-xs sm:text-sm border border-stone-300 rounded p-2 bg-white text-stone-900"
                >
                  <option value={1}>1-Year Master's Degree</option>
                  <option value={2}>2-Year Master's Degree</option>
                  <option value={3}>3-Year Bachelor's (Standard UK/Europe)</option>
                  <option value={4}>4-Year Bachelor's (Standard US/Canada)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Real-time Calculation Summary Stage */}
          <div className="lg:col-span-5 bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-7 border border-stone-800 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>ANNUAL ESTIMATED BUDGET (USD)</span>
              </div>

              <div className="mt-3">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white tabular-nums">
                  ${costs.annualTotal.toLocaleString()}
                  <span className="text-sm font-sans font-normal text-stone-400"> / year</span>
                </div>
                <div className="text-xs text-stone-400 mt-1">
                  Full {degreeYears}-Year Total Investment: <strong className="text-amber-300 font-mono">${costs.fullDegreeTotal.toLocaleString()} USD</strong>
                </div>
              </div>

              {/* Line-item breakdown */}
              <div className="mt-6 space-y-3 border-t border-stone-800 pt-4 text-xs sm:text-sm">
                <div className="flex justify-between text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-stone-400" />
                    <span>Tuition & Campus Fees:</span>
                  </span>
                  <span className="font-mono text-white font-semibold tabular-nums">
                    ${costs.tuition.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-stone-400" />
                    <span>Housing, Utilities & Food:</span>
                  </span>
                  <span className="font-mono text-white font-semibold tabular-nums">
                    ${costs.housing.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-stone-400" />
                    <span>Mandatory Health Insurance:</span>
                  </span>
                  <span className="font-mono text-white font-semibold tabular-nums">
                    ${costs.insurance.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-stone-400" />
                    <span>Testing, Visa & Flights (One-time):</span>
                  </span>
                  <span className="font-mono text-stone-300 tabular-nums">
                    ${costs.oneTimeFees.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-stone-800/80 rounded border border-stone-700 text-xs text-stone-300">
              {country === 'germany' && institutionType === 'public' ? (
                <span className="text-emerald-400 font-semibold">
                  Germany Tuition Advantage: Public university tuition is €0. Your primary cost is the €11,904 blocked account requirement.
                </span>
              ) : (
                <span>
                  Tip: Working the allowed 20 hours/week on campus typically yields $4,000–$8,000 annually to offset food and personal expenses.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tool 2: Profile & University Matcher */}
      {activeTool === 'matcher' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-7 shadow-sm">
            <h3 className="text-lg font-bold text-stone-900 font-serif-display mb-1">
              Input Your Academic Metrics
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Our algorithm maps your standardized exam scores and GPA against historical middle 50% admission brackets.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>SAT Score:</span>
                  <span className="font-mono text-amber-700 font-bold tabular-nums">{userSat} / 1600</span>
                </div>
                <input
                  type="range"
                  min="900"
                  max="1600"
                  step="10"
                  value={userSat}
                  onChange={(e) => setUserSat(parseInt(e.target.value))}
                  className="w-full accent-stone-900"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>TOEFL iBT:</span>
                  <span className="font-mono text-amber-700 font-bold tabular-nums">{userToefl} / 120</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="120"
                  step="1"
                  value={userToefl}
                  onChange={(e) => setUserToefl(parseInt(e.target.value))}
                  className="w-full accent-stone-900"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>Unweighted GPA:</span>
                  <span className="font-mono text-amber-700 font-bold tabular-nums">{userGpa.toFixed(2)} / 4.0</span>
                </div>
                <input
                  type="range"
                  min="2.5"
                  max="4.0"
                  step="0.05"
                  value={userGpa}
                  onChange={(e) => setUserGpa(parseFloat(e.target.value))}
                  className="w-full accent-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Tri-Tier University Matrix */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Reaches */}
            <div className="bg-white rounded-xl border border-rose-200 p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-700 uppercase">Ambition Tier</span>
                <span className="text-xs px-2 py-0.5 rounded bg-rose-50 text-rose-800 font-medium">&lt;15% Admit Rate</span>
              </div>
              <h4 className="text-xl font-bold text-stone-900 font-serif-display">Reach Schools</h4>
              <p className="text-xs text-stone-500">
                Highly competitive; requires standout essays, leadership spikes, and stellar recommendation letters.
              </p>
              <div className="space-y-1.5 pt-2">
                {matcherResults.reaches.map((r, idx) => (
                  <div key={idx} className="p-2.5 bg-rose-50/50 rounded border border-rose-100 text-xs font-medium text-stone-800">
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Targets */}
            <div className="bg-white rounded-xl border border-amber-200 p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700 uppercase">Competitive Tier</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium">20%–45% Admit Rate</span>
              </div>
              <h4 className="text-xl font-bold text-stone-900 font-serif-display">Target / Match Schools</h4>
              <p className="text-xs text-stone-500">
                Your SAT and GPA sit securely within the middle 50% range of enrolled students.
              </p>
              <div className="space-y-1.5 pt-2">
                {matcherResults.targets.map((t, idx) => (
                  <div key={idx} className="p-2.5 bg-amber-50/50 rounded border border-amber-100 text-xs font-medium text-stone-800">
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Safeties */}
            <div className="bg-white rounded-xl border border-emerald-200 p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase">High Probability Tier</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium">&gt;50% Admit Rate</span>
              </div>
              <h4 className="text-xl font-bold text-stone-900 font-serif-display">Safety / Foundation Schools</h4>
              <p className="text-xs text-stone-500">
                Your credentials exceed the upper 75th percentile; strong probability of merit scholarships.
              </p>
              <div className="space-y-1.5 pt-2">
                {matcherResults.safeties.map((s, idx) => (
                  <div key={idx} className="p-2.5 bg-emerald-50/50 rounded border border-emerald-100 text-xs font-medium text-stone-800">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool 3: English Test Score Converter */}
      {activeTool === 'converter' && <ScoreConverter />}
    </div>
  );
};
