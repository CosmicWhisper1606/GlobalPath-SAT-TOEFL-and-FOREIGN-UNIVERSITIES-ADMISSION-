export interface ConcordanceRow {
  toeflRange: string;
  toeflMin: number;
  toeflMax: number;
  ieltsBand: number;
  ieltsLabel: string;
  duolingoRange: string;
  duolingoMin: number;
  duolingoMax: number;
  cefrLevel: 'C2 Proficient' | 'C1 Advanced' | 'B2 Upper-Int' | 'B1 Intermediate' | 'A2 Elementary';
  competitivenessTier: 'Elite / Ivy / Oxbridge' | 'Top 30-50 Global' | 'Selective Tier 1' | 'Direct Standard' | 'Pathway / Conditional' | 'Below Direct Minimum';
  sampleColleges: string[];
  admissibilitySummary: string;
}

export interface SectionScoreConcordance {
  section: 'Reading' | 'Listening' | 'Speaking' | 'Writing';
  toeflScore: number;
  ieltsBand: number;
  descriptor: string;
}

export interface ConversionResult {
  sourceTest: 'TOEFL' | 'IELTS' | 'Duolingo';
  toeflScore: number;
  ieltsBand: number;
  duolingoScore: number;
  ieltsRangeLabel: string;
  duolingoRangeLabel: string;
  cefrLevel: string;
  competitivenessTier: string;
  summary: string;
  sampleColleges: string[];
  sectionBreakdown?: SectionScoreConcordance[];
  duolingoSubscores?: {
    literacy: number;
    comprehension: number;
    conversation: number;
    production: number;
  };
  policyNotes: string[];
}

export const OFFICIAL_CONCORDANCE_TABLE: ConcordanceRow[] = [
  {
    toeflRange: '118 - 120',
    toeflMin: 118,
    toeflMax: 120,
    ieltsBand: 9.0,
    ieltsLabel: '9.0 (Expert)',
    duolingoRange: '155 - 160',
    duolingoMin: 155,
    duolingoMax: 160,
    cefrLevel: 'C2 Proficient',
    competitivenessTier: 'Elite / Ivy / Oxbridge',
    sampleColleges: ['Harvard University', 'Oxford University', 'Cambridge University', 'MIT', 'Stanford University'],
    admissibilitySummary: 'Exceeds every university threshold globally. Perfect command of nuanced academic discourse.'
  },
  {
    toeflRange: '115 - 117',
    toeflMin: 115,
    toeflMax: 117,
    ieltsBand: 8.5,
    ieltsLabel: '8.5 (Very Good / Expert)',
    duolingoRange: '145 - 150',
    duolingoMin: 145,
    duolingoMax: 150,
    cefrLevel: 'C2 Proficient',
    competitivenessTier: 'Elite / Ivy / Oxbridge',
    sampleColleges: ['Columbia University', 'Yale University', 'Princeton', 'Imperial College London', 'LSE'],
    admissibilitySummary: 'Qualifies for highly selective graduate programs, law schools, and prestigious undergraduate honors.'
  },
  {
    toeflRange: '110 - 114',
    toeflMin: 110,
    toeflMax: 114,
    ieltsBand: 8.0,
    ieltsLabel: '8.0 (Very Good)',
    duolingoRange: '135 - 140',
    duolingoMin: 135,
    duolingoMax: 140,
    cefrLevel: 'C1 Advanced',
    competitivenessTier: 'Elite / Ivy / Oxbridge',
    sampleColleges: ['Carnegie Mellon', 'University of Chicago', 'Cornell University', 'UCL', 'ETH Zurich (English)'],
    admissibilitySummary: 'Firmly exceeds the standard 100 cut-off for Ivy League, Cambridge, and Oxford postgraduate admissions.'
  },
  {
    toeflRange: '102 - 109',
    toeflMin: 102,
    toeflMax: 109,
    ieltsBand: 7.5,
    ieltsLabel: '7.5 (Good / Very Good)',
    duolingoRange: '125 - 130',
    duolingoMin: 125,
    duolingoMax: 130,
    cefrLevel: 'C1 Advanced',
    competitivenessTier: 'Top 30-50 Global',
    sampleColleges: ['UC Berkeley', 'UCLA', 'NYU Stern', 'University of Toronto', 'Univ of Edinburgh'],
    admissibilitySummary: 'Meets requirements for over 98% of all degree programs worldwide without ESL prerequisites.'
  },
  {
    toeflRange: '94 - 101',
    toeflMin: 94,
    toeflMax: 101,
    ieltsBand: 7.0,
    ieltsLabel: '7.0 (Good)',
    duolingoRange: '120 - 125',
    duolingoMin: 120,
    duolingoMax: 125,
    cefrLevel: 'C1 Advanced',
    competitivenessTier: 'Top 30-50 Global',
    sampleColleges: ['University of Michigan', 'Georgia Tech', 'King\'s College London', 'Univ of Melbourne', 'UBC'],
    admissibilitySummary: 'The gold standard baseline for competitive US top-50 universities and Canadian U15 research schools.'
  },
  {
    toeflRange: '79 - 93',
    toeflMin: 79,
    toeflMax: 93,
    ieltsBand: 6.5,
    ieltsLabel: '6.5 (Competent / Good)',
    duolingoRange: '110 - 115',
    duolingoMin: 110,
    duolingoMax: 115,
    cefrLevel: 'B2 Upper-Int',
    competitivenessTier: 'Selective Tier 1',
    sampleColleges: ['Purdue University', 'UW Seattle', 'Ohio State', 'Univ of Manchester', 'Univ of Sydney'],
    admissibilitySummary: 'Standard baseline admission threshold for major public universities, engineering colleges, and UK Russell Group.'
  },
  {
    toeflRange: '60 - 78',
    toeflMin: 60,
    toeflMax: 78,
    ieltsBand: 6.0,
    ieltsLabel: '6.0 (Competent)',
    duolingoRange: '95 - 105',
    duolingoMin: 95,
    duolingoMax: 105,
    cefrLevel: 'B2 Upper-Int',
    competitivenessTier: 'Direct Standard',
    sampleColleges: ['Arizona State University', 'Texas A&M', 'SUNY Buffalo', 'Univ of Leeds', 'Monash University'],
    admissibilitySummary: 'Direct entry for many regional institutions; some premier programs may require an introductory ESL booster course.'
  },
  {
    toeflRange: '46 - 59',
    toeflMin: 46,
    toeflMax: 59,
    ieltsBand: 5.5,
    ieltsLabel: '5.5 (Modest)',
    duolingoRange: '80 - 90',
    duolingoMin: 80,
    duolingoMax: 90,
    cefrLevel: 'B1 Intermediate',
    competitivenessTier: 'Pathway / Conditional',
    sampleColleges: ['International Year One Pathways', 'Community Colleges (e.g. Santa Monica, De Anza)', 'Navitas / INTO Centers'],
    admissibilitySummary: 'Sufficient for foundation pathways, community colleges, and conditional university acceptance.'
  },
  {
    toeflRange: '35 - 45',
    toeflMin: 35,
    toeflMax: 45,
    ieltsBand: 5.0,
    ieltsLabel: '5.0 (Modest)',
    duolingoRange: '70 - 75',
    duolingoMin: 70,
    duolingoMax: 75,
    cefrLevel: 'B1 Intermediate',
    competitivenessTier: 'Pathway / Conditional',
    sampleColleges: ['Intensive English Programs (IEP)', 'ESL Preparatory Academies', 'Pre-sessional English courses'],
    admissibilitySummary: 'Requires intensive pre-sessional English language coursework prior to degree matriculation.'
  },
  {
    toeflRange: '32 - 34',
    toeflMin: 32,
    toeflMax: 34,
    ieltsBand: 4.5,
    ieltsLabel: '4.5 (Limited)',
    duolingoRange: '60 - 65',
    duolingoMin: 60,
    duolingoMax: 65,
    cefrLevel: 'A2 Elementary',
    competitivenessTier: 'Below Direct Minimum',
    sampleColleges: ['Dedicated Language Institutes', 'Language Immersion Schools'],
    admissibilitySummary: 'Below regular collegiate admissions criteria; intensive academic English required.'
  },
  {
    toeflRange: '0 - 31',
    toeflMin: 0,
    toeflMax: 31,
    ieltsBand: 4.0,
    ieltsLabel: '≤ 4.0 (Very Limited)',
    duolingoRange: '< 60',
    duolingoMin: 10,
    duolingoMax: 55,
    cefrLevel: 'A2 Elementary',
    competitivenessTier: 'Below Direct Minimum',
    sampleColleges: ['Foundational Language Centers'],
    admissibilitySummary: 'Beginner foundation stage; not currently admissible to English-taught academic degrees.'
  }
];

// Section-level conversion mappings based on ETS official Concordance Research
export function convertToeflReadingToIelts(toeflR: number): { band: number; descriptor: string } {
  if (toeflR >= 29) return { band: 9.0, descriptor: 'Expert user / Near-native reading synthesis' };
  if (toeflR >= 27) return { band: 8.5, descriptor: 'Very good user / Complex academic texts' };
  if (toeflR >= 24) return { band: 8.0, descriptor: 'Strong comprehension of subtle rhetoric' };
  if (toeflR >= 22) return { band: 7.5, descriptor: 'Effective grasp of nuanced arguments' };
  if (toeflR >= 18) return { band: 7.0, descriptor: 'Solid understanding of academic articles' };
  if (toeflR >= 13) return { band: 6.5, descriptor: 'Competent; manages main ideas with occasional minor errors' };
  if (toeflR >= 8) return { band: 6.0, descriptor: 'Moderate comprehension with factual details' };
  if (toeflR >= 4) return { band: 5.5, descriptor: 'Partial comprehension of unfamiliar technical text' };
  return { band: 5.0, descriptor: 'Basic reading competence' };
}

export function convertToeflListeningToIelts(toeflL: number): { band: number; descriptor: string } {
  if (toeflL >= 28) return { band: 9.0, descriptor: 'Full comprehension of lectures and fast-paced colloquial dialogue' };
  if (toeflL >= 26) return { band: 8.5, descriptor: 'Easily parses complex academic arguments and implicit stances' };
  if (toeflL >= 24) return { band: 8.0, descriptor: 'Understands implied meanings, nuances, and diverse accents' };
  if (toeflL >= 22) return { band: 7.5, descriptor: 'Strong grasp of conversational context and university lectures' };
  if (toeflL >= 17) return { band: 7.0, descriptor: 'Reliably tracks multi-speaker academic presentations' };
  if (toeflL >= 12) return { band: 6.5, descriptor: 'Competent listener with basic academic vocabulary' };
  if (toeflL >= 9) return { band: 6.0, descriptor: 'Grasps explicit main points but misses idiomatic nuances' };
  if (toeflL >= 6) return { band: 5.5, descriptor: 'Follows slower, clear presentations' };
  return { band: 5.0, descriptor: 'Struggles with rapid natural speech' };
}

export function convertToeflSpeakingToIelts(toeflS: number): { band: number; descriptor: string } {
  if (toeflS >= 28) return { band: 8.5, descriptor: 'Fluent, natural intonation; excellent academic lexical range' };
  if (toeflS >= 26) return { band: 8.0, descriptor: 'Speaks fluently with rare search for vocabulary' };
  if (toeflS >= 24) return { band: 7.5, descriptor: 'Clear pronunciation, minor hesitation on complex abstractions' };
  if (toeflS >= 20) return { band: 7.0, descriptor: 'Communicates clearly on complex topics with adequate cohesion' };
  if (toeflS >= 16) return { band: 6.5, descriptor: 'Comfortable in casual speech; occasional pauses for technical terms' };
  if (toeflS >= 14) return { band: 6.0, descriptor: 'Generally coherent; noticeable pronunciation or grammatical patterns' };
  if (toeflS >= 10) return { band: 5.5, descriptor: 'Basic conversation manageable; limited fluency in discussions' };
  return { band: 5.0, descriptor: 'Frequent hesitations and restricted phrase structures' };
}

export function convertToeflWritingToIelts(toeflW: number): { band: number; descriptor: string } {
  if (toeflW >= 29) return { band: 9.0, descriptor: 'Masterful academic discourse, sophisticated transitions & syntax' };
  if (toeflW >= 27) return { band: 8.5, descriptor: 'High precision in vocabulary and seamless argument development' };
  if (toeflW >= 24) return { band: 8.0, descriptor: 'Well-structured essays with very infrequent grammatical errors' };
  if (toeflW >= 21) return { band: 7.5, descriptor: 'Clear topic development and proficient use of academic connectors' };
  if (toeflW >= 17) return { band: 7.0, descriptor: 'Addresses prompt fully; minor grammatical slip-ups' };
  if (toeflW >= 13) return { band: 6.5, descriptor: 'Adequate organization; occasional sentence structure repetition' };
  if (toeflW >= 10) return { band: 6.0, descriptor: 'Conveys main points with basic cohesive devices' };
  if (toeflW >= 7) return { band: 5.5, descriptor: 'Limited variety of sentence patterns; frequent punctuation flaws' };
  return { band: 5.0, descriptor: 'Difficulty formulating complex arguments in written English' };
}

export function getFullConversionFromToefl(
  toeflTotal: number,
  sections?: { reading: number; listening: number; speaking: number; writing: number }
): ConversionResult {
  const clampedTotal = Math.max(0, Math.min(120, Math.round(toeflTotal)));

  // Find matching row in official concordance
  const row = OFFICIAL_CONCORDANCE_TABLE.find(
    (r) => clampedTotal >= r.toeflMin && clampedTotal <= r.toeflMax
  ) || OFFICIAL_CONCORDANCE_TABLE[OFFICIAL_CONCORDANCE_TABLE.length - 1];

  // Calculate Duolingo numerical estimate
  const ratio = row.toeflMax > row.toeflMin 
    ? (clampedTotal - row.toeflMin) / (row.toeflMax - row.toeflMin)
    : 0.5;
  const rawDet = row.duolingoMin + ratio * (row.duolingoMax - row.duolingoMin);
  const detEstimated = Math.round(rawDet / 5) * 5; // DET scores are in multiples of 5

  // Duolingo subscores estimation
  const lit = Math.min(160, Math.max(10, detEstimated + (Math.round((clampedTotal % 6) - 3) * 5)));
  const comp = Math.min(160, Math.max(10, detEstimated + 5));
  const conv = Math.min(160, Math.max(10, detEstimated - 5));
  const prod = Math.min(160, Math.max(10, detEstimated));

  // Section breakdown if provided
  let sectionBreakdown: SectionScoreConcordance[] | undefined = undefined;
  if (sections) {
    const r = convertToeflReadingToIelts(sections.reading);
    const l = convertToeflListeningToIelts(sections.listening);
    const s = convertToeflSpeakingToIelts(sections.speaking);
    const w = convertToeflWritingToIelts(sections.writing);

    sectionBreakdown = [
      { section: 'Reading', toeflScore: sections.reading, ieltsBand: r.band, descriptor: r.descriptor },
      { section: 'Listening', toeflScore: sections.listening, ieltsBand: l.band, descriptor: l.descriptor },
      { section: 'Speaking', toeflScore: sections.speaking, ieltsBand: s.band, descriptor: s.descriptor },
      { section: 'Writing', toeflScore: sections.writing, ieltsBand: w.band, descriptor: w.descriptor },
    ];
  }

  const policyNotes = [
    `TOEFL Score ${clampedTotal}/120 aligns with IELTS Band ${row.ieltsBand.toFixed(1)} and Duolingo score ${detEstimated}/160.`,
    clampedTotal >= 100 
      ? 'Meets standard minimum requirements for Harvard, Oxford, Stanford, Cambridge, MIT, and Columbia.'
      : clampedTotal >= 80 
      ? 'Meets standard minimum requirements for most major public US and UK research universities (e.g. Purdue, Ohio State, Leeds).'
      : 'Consider intensive preparation or foundation/pathway programs if targeting Tier 1 research universities.',
    'Section Cut-off Rule: Many elite universities (e.g., Oxford, CMU, Cambridge) enforce sub-score minimums (typically 25+ in Speaking/Writing for TOEFL, or 7.0+ sub-bands in IELTS).'
  ];

  return {
    sourceTest: 'TOEFL',
    toeflScore: clampedTotal,
    ieltsBand: row.ieltsBand,
    duolingoScore: detEstimated,
    ieltsRangeLabel: row.ieltsLabel,
    duolingoRangeLabel: row.duolingoRange,
    cefrLevel: row.cefrLevel,
    competitivenessTier: row.competitivenessTier,
    summary: row.admissibilitySummary,
    sampleColleges: row.sampleColleges,
    sectionBreakdown,
    duolingoSubscores: {
      literacy: lit,
      comprehension: comp,
      conversation: conv,
      production: prod,
    },
    policyNotes,
  };
}

export function convertFromIelts(ieltsBand: number): ConversionResult {
  const clamped = Math.max(0, Math.min(9.0, Math.round(ieltsBand * 2) / 2));
  const row = OFFICIAL_CONCORDANCE_TABLE.find((r) => r.ieltsBand === clamped) ||
    OFFICIAL_CONCORDANCE_TABLE[OFFICIAL_CONCORDANCE_TABLE.length - 1];

  const midToefl = Math.round((row.toeflMin + row.toeflMax) / 2);
  const midDet = Math.round((row.duolingoMin + row.duolingoMax) / 10) * 5;

  return {
    sourceTest: 'IELTS',
    toeflScore: midToefl,
    ieltsBand: clamped,
    duolingoScore: midDet,
    ieltsRangeLabel: `${clamped.toFixed(1)} Band`,
    duolingoRangeLabel: row.duolingoRange,
    cefrLevel: row.cefrLevel,
    competitivenessTier: row.competitivenessTier,
    summary: row.admissibilitySummary,
    sampleColleges: row.sampleColleges,
    policyNotes: [
      `IELTS ${clamped.toFixed(1)} corresponds to approximately ${row.toeflRange} on TOEFL iBT.`,
      `Estimated Duolingo English Test equivalent: ${row.duolingoRange} points.`,
      'UK Visa Note: If applying to the UK, confirm whether your institution requires "IELTS for UKVI" (SELT) or accepts regular IELTS Academic / TOEFL.'
    ]
  };
}

export function convertFromDuolingo(detScore: number): ConversionResult {
  const clamped = Math.max(10, Math.min(160, Math.round(detScore / 5) * 5));
  const row = OFFICIAL_CONCORDANCE_TABLE.find(
    (r) => clamped >= r.duolingoMin && clamped <= r.duolingoMax
  ) || OFFICIAL_CONCORDANCE_TABLE[OFFICIAL_CONCORDANCE_TABLE.length - 1];

  const midToefl = Math.round((row.toeflMin + row.toeflMax) / 2);

  return {
    sourceTest: 'Duolingo',
    toeflScore: midToefl,
    ieltsBand: row.ieltsBand,
    duolingoScore: clamped,
    ieltsRangeLabel: row.ieltsLabel,
    duolingoRangeLabel: `${clamped}/160`,
    cefrLevel: row.cefrLevel,
    competitivenessTier: row.competitivenessTier,
    summary: row.admissibilitySummary,
    sampleColleges: row.sampleColleges,
    policyNotes: [
      `Duolingo score ${clamped}/160 translates to approximately ${row.toeflRange} on TOEFL iBT and IELTS Band ${row.ieltsBand.toFixed(1)}.`,
      'Acceptance Check: While 5,000+ colleges accept Duolingo (including Yale, Columbia, Duke), certain UK, Australian, and Canadian universities strictly insist on TOEFL iBT or IELTS Academic.',
      'Validity: Like TOEFL and IELTS, Duolingo scores remain valid for 2 years from test date.'
    ]
  };
}

export const PRESET_BENCHMARKS = [
  {
    title: 'Ivy League / Oxbridge Elite',
    score: 110,
    target: 'Harvard, Oxford, Cambridge, MIT, Stanford',
    ieltsEquivalent: '8.0 Band',
    detEquivalent: '135 - 140',
    color: 'border-purple-300 bg-purple-50 text-purple-900',
  },
  {
    title: 'Top 30-50 Global Tier',
    score: 100,
    target: 'UC Berkeley, UCLA, NYU, Toronto, Edinburgh',
    ieltsEquivalent: '7.5 Band',
    detEquivalent: '125 - 130',
    color: 'border-blue-300 bg-blue-50 text-blue-900',
  },
  {
    title: 'Competitive STEM / Public Flagship',
    score: 90,
    target: 'Purdue, Georgia Tech, Univ of Michigan, Sydney',
    ieltsEquivalent: '7.0 Band',
    detEquivalent: '115 - 120',
    color: 'border-amber-300 bg-amber-50 text-amber-900',
  },
  {
    title: 'Direct University Admissibility',
    score: 80,
    target: 'Arizona State, Ohio State, Leeds, Texas A&M',
    ieltsEquivalent: '6.5 Band',
    detEquivalent: '105 - 110',
    color: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  },
  {
    title: 'Foundation / Pathway / Community College',
    score: 61,
    target: 'Santa Monica College, INTO, Navitas Pathways',
    ieltsEquivalent: '6.0 Band',
    detEquivalent: '95 - 100',
    color: 'border-stone-300 bg-stone-100 text-stone-800',
  },
];
