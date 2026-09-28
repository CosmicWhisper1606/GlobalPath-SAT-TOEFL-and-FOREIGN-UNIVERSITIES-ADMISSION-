import React, { useState, useMemo } from 'react';
import {
  ArrowRightLeft,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Info,
  Building,
  HelpCircle,
  Sliders,
  Award,
  Layers,
  FileText,
  AlertCircle,
  BookOpen,
  Compass
} from 'lucide-react';
import {
  OFFICIAL_CONCORDANCE_TABLE,
  PRESET_BENCHMARKS,
  getFullConversionFromToefl,
  convertFromIelts,
  convertFromDuolingo,
  ConversionResult
} from '../data/scoreConverterData';

export const ScoreConverter: React.FC = () => {
  // Primary input test selection
  const [sourceTest, setSourceTest] = useState<'TOEFL' | 'IELTS' | 'Duolingo'>('TOEFL');
  
  // TOEFL input modes
  const [toeflInputMode, setToeflInputMode] = useState<'total' | 'sections'>('total');
  const [toeflTotal, setToeflTotal] = useState<number>(100);
  const [toeflSections, setToeflSections] = useState({
    reading: 26,
    listening: 26,
    speaking: 24,
    writing: 24,
  });

  // Alternative tests inputs
  const [ieltsBand, setIeltsBand] = useState<number>(7.5);
  const [duolingoScore, setDuolingoScore] = useState<number>(125);

  // Search/filter in full concordance table
  const [tableSearch, setTableSearch] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Handle section changes
  const handleSectionChange = (section: keyof typeof toeflSections, val: number) => {
    const clamped = Math.max(0, Math.min(30, val));
    const nextSections = { ...toeflSections, [section]: clamped };
    setToeflSections(nextSections);
    const sum = nextSections.reading + nextSections.listening + nextSections.speaking + nextSections.writing;
    setToeflTotal(sum);
  };

  // Compute conversion result dynamically
  const result: ConversionResult = useMemo(() => {
    if (sourceTest === 'TOEFL') {
      return getFullConversionFromToefl(
        toeflTotal,
        toeflInputMode === 'sections' ? toeflSections : undefined
      );
    } else if (sourceTest === 'IELTS') {
      return convertFromIelts(ieltsBand);
    } else {
      return convertFromDuolingo(duolingoScore);
    }
  }, [sourceTest, toeflTotal, toeflInputMode, toeflSections, ieltsBand, duolingoScore]);

  // Apply preset benchmark
  const applyPreset = (score: number) => {
    setSourceTest('TOEFL');
    setToeflTotal(score);
    // allocate balanced sections
    const perSection = Math.floor(score / 4);
    const rem = score % 4;
    setToeflSections({
      reading: Math.min(30, perSection + (rem > 0 ? 1 : 0)),
      listening: Math.min(30, perSection + (rem > 1 ? 1 : 0)),
      speaking: Math.min(30, perSection + (rem > 2 ? 1 : 0)),
      writing: Math.min(30, perSection),
    });
  };

  // Copy standardized conversion string
  const handleCopySummary = () => {
    const summaryText = `[GlobalPath Test Score Standardization]
• TOEFL iBT: ${result.toeflScore}/120
• IELTS Academic Equivalent: ${result.ieltsBand.toFixed(1)} Band (${result.ieltsRangeLabel})
• Duolingo English Test (DET) Equivalent: ~${result.duolingoScore}/160 (${result.duolingoRangeLabel})
• CEFR Level: ${result.cefrLevel}
• Competitiveness Tier: ${result.competitivenessTier}
• Target Admissibility: ${result.summary}
• Typical Target Institutions: ${result.sampleColleges.join(', ')}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Filtered concordance table rows
  const filteredRows = useMemo(() => {
    if (!tableSearch.trim()) return OFFICIAL_CONCORDANCE_TABLE;
    const q = tableSearch.toLowerCase();
    return OFFICIAL_CONCORDANCE_TABLE.filter(
      (r) =>
        r.toeflRange.toLowerCase().includes(q) ||
        r.ieltsLabel.toLowerCase().includes(q) ||
        r.duolingoRange.toLowerCase().includes(q) ||
        r.cefrLevel.toLowerCase().includes(q) ||
        r.competitivenessTier.toLowerCase().includes(q) ||
        r.sampleColleges.some((c) => c.toLowerCase().includes(q))
    );
  }, [tableSearch]);

  return (
    <div className="space-y-10">
      {/* Intro & Mode Selector */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              <ArrowRightLeft className="w-4 h-4 text-amber-600" />
              <span>Official Concordance & Standardization Engine</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-serif-display">
              Standardize English Proficiency Scores
            </h3>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Translate your TOEFL iBT score into precise IELTS Academic and Duolingo English Test (DET) equivalents based on official ETS research and university admission guidelines.
            </p>
          </div>

          {/* Primary Test Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
            <span className="text-xs font-semibold text-stone-500 px-2">Convert From:</span>
            <div className="flex gap-1">
              {[
                { id: 'TOEFL', label: 'TOEFL iBT' },
                { id: 'IELTS', label: 'IELTS Academic' },
                { id: 'Duolingo', label: 'Duolingo (DET)' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSourceTest(t.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    sourceTest === t.id
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-700 hover:bg-stone-200/70'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Interface based on Selected Test */}
        <div className="pt-6">
          {sourceTest === 'TOEFL' && (
            <div className="space-y-6">
              {/* TOEFL Mode Toggle: Total Score vs Sections */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Input Method:
                  </span>
                  <div className="inline-flex rounded-lg border border-stone-200 p-0.5 bg-stone-50">
                    <button
                      onClick={() => setToeflInputMode('total')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        toeflInputMode === 'total'
                          ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Total Score Slider (0 - 120)
                    </button>
                    <button
                      onClick={() => setToeflInputMode('sections')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        toeflInputMode === 'sections'
                          ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Section-by-Section Breakdown (4 x 30)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">Quick Targets:</span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { label: 'Ivy/Oxbridge (110)', val: 110 },
                      { label: 'Top 50 (100)', val: 100 },
                      { label: 'Selective (90)', val: 90 },
                      { label: 'Direct Entry (80)', val: 80 },
                    ].map((p) => (
                      <button
                        key={p.val}
                        onClick={() => applyPreset(p.val)}
                        className={`text-[11px] px-2.5 py-1 rounded border font-medium transition-colors ${
                          toeflTotal === p.val
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total Score Slider View */}
              {toeflInputMode === 'total' ? (
                <div className="bg-stone-50/70 rounded-xl p-5 border border-stone-200">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-stone-800 flex items-center gap-2">
                      <span>TOEFL iBT Total Score</span>
                      <span className="text-xs font-normal text-stone-500">(0 to 120 scale)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={toeflTotal}
                        onChange={(e) => {
                          const v = parseInt(e.target.value) || 0;
                          const clamped = Math.max(0, Math.min(120, v));
                          setToeflTotal(clamped);
                          const perSec = Math.floor(clamped / 4);
                          setToeflSections({
                            reading: perSec,
                            listening: perSec,
                            speaking: perSec,
                            writing: clamped - (perSec * 3),
                          });
                        }}
                        className="w-20 px-2.5 py-1.5 text-center font-mono font-bold text-stone-900 bg-white border border-stone-300 rounded-lg text-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                      <span className="text-sm font-bold text-stone-500">/ 120</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="120"
                    step="1"
                    value={toeflTotal}
                    onChange={(e) => {
                      const v = parseInt(e.target.value);
                      setToeflTotal(v);
                      const perSec = Math.floor(v / 4);
                      setToeflSections({
                        reading: perSec,
                        listening: perSec,
                        speaking: perSec,
                        writing: v - (perSec * 3),
                      });
                    }}
                    className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                  />

                  {/* Range benchmarks indicator line */}
                  <div className="flex justify-between text-[11px] font-mono text-stone-500 mt-2 px-1">
                    <span>0 (Beginner)</span>
                    <span className="hidden sm:inline">60 (Min)</span>
                    <span>80 (US Direct)</span>
                    <span>100 (Top 50)</span>
                    <span>110 (Ivy)</span>
                    <span>120 (Max)</span>
                  </div>
                </div>
              ) : (
                /* Section-by-Section Mode */
                <div className="bg-stone-50/70 rounded-xl p-5 border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <span className="text-xs font-semibold text-stone-700">
                      Configure your 4 sectional scores (0–30 each) to verify specific university sub-score cutoffs:
                    </span>
                    <div className="text-right">
                      <span className="text-xs text-stone-500">Calculated Total: </span>
                      <span className="font-mono font-bold text-stone-900 text-base">{toeflTotal} / 120</span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { key: 'reading', label: 'Reading', value: toeflSections.reading, color: 'text-blue-700 bg-blue-50' },
                      { key: 'listening', label: 'Listening', value: toeflSections.listening, color: 'text-purple-700 bg-purple-50' },
                      { key: 'speaking', label: 'Speaking', value: toeflSections.speaking, color: 'text-emerald-700 bg-emerald-50' },
                      { key: 'writing', label: 'Writing', value: toeflSections.writing, color: 'text-amber-700 bg-amber-50' },
                    ].map((sec) => (
                      <div key={sec.key} className="bg-white p-3.5 rounded-lg border border-stone-200 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${sec.color}`}>
                            {sec.label}
                          </span>
                          <span className="font-mono font-bold text-stone-900 text-sm">
                            {sec.value} / 30
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="30"
                          step="1"
                          value={sec.value}
                          onChange={(e) => handleSectionChange(sec.key as any, parseInt(e.target.value))}
                          className="w-full accent-stone-900"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {sourceTest === 'IELTS' && (
            <div className="bg-stone-50/70 rounded-xl p-5 border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-stone-800">
                    IELTS Academic Overall Band
                  </label>
                  <p className="text-xs text-stone-500">Select your band score on the 0 – 9.0 scale (0.5 increments)</p>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-2xl font-bold text-stone-900">
                  <span>{ieltsBand.toFixed(1)}</span>
                  <span className="text-xs text-stone-500 font-sans">Band</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((b) => (
                  <button
                    key={b}
                    onClick={() => setIeltsBand(b)}
                    className={`flex-1 min-w-[54px] py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                      ieltsBand === b
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {b.toFixed(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sourceTest === 'Duolingo' && (
            <div className="bg-stone-50/70 rounded-xl p-5 border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-stone-800">
                    Duolingo English Test (DET) Score
                  </label>
                  <p className="text-xs text-stone-500">Reported in 5-point increments from 10 to 160</p>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-2xl font-bold text-stone-900">
                  <span>{duolingoScore}</span>
                  <span className="text-xs text-stone-500 font-sans">/ 160</span>
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="160"
                step="5"
                value={duolingoScore}
                onChange={(e) => setDuolingoScore(parseInt(e.target.value))}
                className="w-full accent-stone-900"
              />

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[85, 95, 105, 115, 125, 135, 145, 155].map((s) => (
                  <button
                    key={s}
                    onClick={() => setDuolingoScore(s)}
                    className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
                      duolingoScore === s
                        ? 'bg-stone-900 text-white border-stone-900 font-bold'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {s} pts
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Results Deck: Converted Multi-Exam Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Card 1: TOEFL iBT */}
        <div className={`rounded-2xl border p-6 shadow-sm transition-all ${
          sourceTest === 'TOEFL'
            ? 'bg-amber-50/30 border-amber-300 ring-2 ring-amber-400/20'
            : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <span>TOEFL iBT</span>
              {sourceTest === 'TOEFL' && (
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-medium">Input Test</span>
              )}
            </span>
            <span className="text-[11px] text-stone-500 font-mono">0 - 120 Scale</span>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-4xl font-extrabold text-stone-900 font-mono tracking-tight">
                {result.toeflScore}
              </span>
              <span className="text-stone-500 font-semibold text-sm ml-1">/ 120</span>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-stone-100 text-stone-700">
              ETS Official
            </span>
          </div>

          <p className="mt-3 text-xs text-stone-600 leading-relaxed">
            {result.toeflScore >= 100
              ? 'Meets standard thresholds for Ivy League, Cambridge, Oxford, and top STEM programs.'
              : result.toeflScore >= 80
              ? 'Meets direct university entry criteria for most public US universities and Russell Group.'
              : 'May require conditional English admission or foundational pathway programs.'}
          </p>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Test Duration: 1h 56m</span>
            <span>Validity: 2 Years</span>
          </div>
        </div>

        {/* Card 2: IELTS Academic */}
        <div className={`rounded-2xl border p-6 shadow-sm transition-all ${
          sourceTest === 'IELTS'
            ? 'bg-red-50/30 border-red-300 ring-2 ring-red-400/20'
            : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <span className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
              <span>IELTS Academic</span>
              {sourceTest === 'IELTS' && (
                <span className="text-[10px] bg-red-200 text-red-900 px-1.5 py-0.5 rounded font-medium">Input Test</span>
              )}
            </span>
            <span className="text-[11px] text-stone-500 font-mono">0 - 9.0 Band</span>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-4xl font-extrabold text-stone-900 font-mono tracking-tight">
                {result.ieltsBand.toFixed(1)}
              </span>
              <span className="text-stone-500 font-semibold text-sm ml-1">Band</span>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-red-50 text-red-800 border border-red-200">
              {result.ieltsRangeLabel}
            </span>
          </div>

          <p className="mt-3 text-xs text-stone-600 leading-relaxed">
            {result.ieltsBand >= 7.5
              ? 'Very good/expert user. Fully eligible for premier UK Russell Group & G5 honors courses.'
              : result.ieltsBand >= 6.5
              ? 'Solid competent user. Standard baseline for UK, Australian, Canadian, and European universities.'
              : 'Modest user band. Pathway preparation or pre-sessional English is typically mandated.'}
          </p>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Interview: Human 1-on-1</span>
            <span>UKVI Approved</span>
          </div>
        </div>

        {/* Card 3: Duolingo English Test (DET) */}
        <div className={`rounded-2xl border p-6 shadow-sm transition-all ${
          sourceTest === 'Duolingo'
            ? 'bg-emerald-50/30 border-emerald-300 ring-2 ring-emerald-400/20'
            : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <span>Duolingo (DET)</span>
              {sourceTest === 'Duolingo' && (
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-medium">Input Test</span>
              )}
            </span>
            <span className="text-[11px] text-stone-500 font-mono">10 - 160 Scale</span>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-4xl font-extrabold text-stone-900 font-mono tracking-tight">
                ~{result.duolingoScore}
              </span>
              <span className="text-stone-500 font-semibold text-sm ml-1">/ 160</span>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              {result.duolingoRangeLabel} pts
            </span>
          </div>

          <p className="mt-3 text-xs text-stone-600 leading-relaxed">
            {result.duolingoScore >= 130
              ? 'High proficiency. Satisfies admissions criteria at Yale, Columbia, NYU, Duke, and Dartmouth.'
              : result.duolingoScore >= 115
              ? 'Meets direct admissions cutoffs for 4,000+ US undergraduate colleges and universities.'
              : 'Consider retaking or opting for TOEFL/IELTS if targeting institutions outside North America.'}
          </p>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Turnaround: 48 Hours</span>
            <span>Fee: $65 USD</span>
          </div>
        </div>
      </div>

      {/* Deep Standardization Analysis & University Competitiveness */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Target Tier, CEFR, Colleges & Copy Dossier */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-stone-900 font-serif-display flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-700" />
                <span>Standardized Admissions Evaluation</span>
              </h4>
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
                title="Copy score equivalence breakdown to clipboard"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Equivalence Summary</span>
                  </>
                )}
              </button>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                <span className="block text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                  CEFR Framework
                </span>
                <span className="text-sm font-bold text-stone-900 mt-0.5 block font-mono">
                  {result.cefrLevel}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                <span className="block text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                  Target Tier
                </span>
                <span className="text-sm font-bold text-stone-900 mt-0.5 block">
                  {result.competitivenessTier}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 col-span-2 sm:col-span-1">
                <span className="block text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                  Global Percentile
                </span>
                <span className="text-sm font-bold text-amber-700 mt-0.5 block font-mono">
                  {result.toeflScore >= 110 ? 'Top 5%' : result.toeflScore >= 100 ? 'Top 15%' : result.toeflScore >= 80 ? 'Top 45%' : 'Foundation'}
                </span>
              </div>
            </div>

            {/* Admissibility Summary */}
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/70">
              <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Admissions Verdict</span>
              </h5>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Sample Benchmark Universities */}
            <div>
              <span className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-stone-500" />
                <span>Example Universities Accepting This Profile</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {result.sampleColleges.map((col, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>

            {/* Policy Notes */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <span className="text-xs font-semibold text-stone-600 block">
                Standardization Policy Advice:
              </span>
              {result.policyNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Section Level & Duolingo Subscores */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section Breakdown Equivalency */}
          {result.sectionBreakdown ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-stone-900 font-serif-display flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-700" />
                  <span>Sectional IELTS Bands</span>
                </h4>
                <span className="text-[11px] text-stone-500">Official ETS Grid</span>
              </div>
              <p className="text-xs text-stone-500">
                Admissions committees at Oxford, CMU, and Toronto review sub-scores individually. Verify you do not fall below minimum section thresholds:
              </p>

              <div className="space-y-2.5">
                {result.sectionBreakdown.map((sec) => (
                  <div
                    key={sec.section}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-800">{sec.section}</span>
                        <span className="text-xs font-mono text-stone-500">({sec.toeflScore}/30)</span>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate max-w-[200px] sm:max-w-xs mt-0.5">
                        {sec.descriptor}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-mono">
                        Band {sec.ieltsBand.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-3">
              <h4 className="text-base font-bold text-stone-900 font-serif-display flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-700" />
                <span>Duolingo Estimated Subscores</span>
              </h4>
              <p className="text-xs text-stone-500">
                Duolingo tests four integrated subscores that universities evaluate alongside composite scores:
              </p>
              {result.duolingoSubscores && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                    <span className="text-[11px] font-semibold text-stone-500 block">Literacy</span>
                    <span className="text-lg font-mono font-bold text-stone-900">
                      {result.duolingoSubscores.literacy}
                    </span>
                    <span className="text-[10px] text-stone-400 block">Reading + Writing</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                    <span className="text-[11px] font-semibold text-stone-500 block">Comprehension</span>
                    <span className="text-lg font-mono font-bold text-stone-900">
                      {result.duolingoSubscores.comprehension}
                    </span>
                    <span className="text-[10px] text-stone-400 block">Reading + Listening</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                    <span className="text-[11px] font-semibold text-stone-500 block">Conversation</span>
                    <span className="text-lg font-mono font-bold text-stone-900">
                      {result.duolingoSubscores.conversation}
                    </span>
                    <span className="text-[10px] text-stone-400 block">Listening + Speaking</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                    <span className="text-[11px] font-semibold text-stone-500 block">Production</span>
                    <span className="text-lg font-mono font-bold text-stone-900">
                      {result.duolingoSubscores.production}
                    </span>
                    <span className="text-[10px] text-stone-400 block">Writing + Speaking</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Strategy Cheatcard */}
          <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-amber-300 font-serif-display flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Standardization Strategy Matrix</span>
            </h4>
            <ul className="text-xs text-stone-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>USA Undergrad:</strong> Over 95% of US colleges accept all three exams equally. Duolingo is fast and economical ($65), but check top graduate STEM schools.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>UK Russell Group:</strong> Strongly prefer IELTS or TOEFL. If using Duolingo, confirm your CAS visa eligibility, as some UK visas do not accept home tests.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Canada & Australia:</strong> Canadian SDS visa pathway and Australian Department of Home Affairs strictly require approved IELTS or TOEFL iBT test centre sittings.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preset Target Benchmarks Reference */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-stone-900 font-serif-display flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-700" />
            <span>Target Score Benchmarks for University Applications</span>
          </h4>
          <span className="text-xs text-stone-500">Click any tier to load</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PRESET_BENCHMARKS.map((preset) => (
            <button
              key={preset.title}
              onClick={() => applyPreset(preset.score)}
              className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                toeflTotal === preset.score
                  ? 'ring-2 ring-stone-900 bg-stone-900 text-white border-stone-900 shadow-md'
                  : 'bg-white border-stone-200 text-stone-900 hover:border-stone-300'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                toeflTotal === preset.score ? 'text-amber-300' : 'text-stone-500'
              }`}>
                {preset.title}
              </span>
              <div className="flex items-baseline gap-1.5 my-1">
                <span className="text-2xl font-extrabold font-mono">{preset.score}</span>
                <span className={`text-xs ${toeflTotal === preset.score ? 'text-stone-300' : 'text-stone-500'}`}>TOEFL</span>
              </div>
              <div className={`text-xs space-y-0.5 ${toeflTotal === preset.score ? 'text-stone-200' : 'text-stone-600'}`}>
                <div>IELTS: <strong>{preset.ieltsEquivalent}</strong></div>
                <div>DET: <strong>{preset.detEquivalent}</strong></div>
              </div>
              <p className={`text-[11px] mt-2 line-clamp-2 ${toeflTotal === preset.score ? 'text-stone-300' : 'text-stone-500'}`}>
                {preset.target}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Comprehensive Official Concordance Reference Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-lg font-bold text-stone-900 font-serif-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-700" />
              <span>Complete Official Concordance Matrix (ETS & Duolingo Research)</span>
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Current active score tier is highlighted in amber below.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search score, college, or band..."
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">TOEFL iBT</th>
                <th className="py-2.5 px-3">IELTS Academic</th>
                <th className="py-2.5 px-3">Duolingo (DET)</th>
                <th className="py-2.5 px-3">CEFR</th>
                <th className="py-2.5 px-3">Admissions Tier</th>
                <th className="py-2.5 px-3">Sample Benchmark Schools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredRows.map((row) => {
                const isActive = result.toeflScore >= row.toeflMin && result.toeflScore <= row.toeflMax;
                return (
                  <tr
                    key={row.toeflRange}
                    className={`transition-colors ${
                      isActive
                        ? 'bg-amber-100/70 font-semibold text-stone-950 ring-1 ring-amber-300'
                        : 'hover:bg-stone-50/70 text-stone-700'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold">
                      {row.toeflRange}
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      {row.ieltsLabel}
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      {row.duolingoRange}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-stone-200/70 text-stone-800 text-[10px] font-mono">
                        {row.cefrLevel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {row.competitivenessTier}
                    </td>
                    <td className="py-2.5 px-3 text-stone-500 max-w-xs truncate">
                      {row.sampleColleges.slice(0, 3).join(', ')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
