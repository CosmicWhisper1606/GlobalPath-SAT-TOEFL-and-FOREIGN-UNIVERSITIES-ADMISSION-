export interface FirstYearDetails {
  satPolicy: 'Required' | 'Test-Optional' | 'Test-Blind' | 'Not Required';
  satMiddle50: string;
  sat25th: number;
  sat75th: number;
  toeflMin: number;
  toeflRecommended: number;
  toeflSubscores: string;
  averageGpa: string;
  regularDeadline: string;
  earlyDeadline?: string;
  applicationPortal: string;
  aidPolicy: string;
  keyAdmissionsTips: string;
}

export interface TransferDetails {
  transferAcceptanceRate: number; // e.g. 1.8 for 1.8%
  minCollegeCredits: string; // e.g. "24 semester credits"
  maxTransferableCredits: string;
  satPolicyTransfer: string;
  toeflPolicyTransfer: string;
  minCollegeGpa: string;
  fallDeadline: string;
  springDeadline?: string;
  housingGuarantee: string;
  transferPortal: string;
  transferTip: string;
}

export interface MastersDetails {
  grePolicy: 'Required' | 'Optional' | 'Waived for STEM' | 'Program-Specific' | 'Not Required';
  greTargetScores?: string;
  toeflMinGrad: number;
  toeflTaSpeakingCutoff: number; // For Teaching Assistantships
  minUndergradGpa: string;
  applicationDeadlines: string;
  assistantshipsFunding: string;
  stemOptDuration: string;
  popularMastersPrograms: string[];
  mastersTip: string;
}

export interface TestingPolicies {
  sat_policy: 'Required' | 'Test-Optional' | 'Test-Blind' | 'Not Required';
  min_toefl_ielts_score: string;
  english_waiver_conditions: string;
  accepts_self_reported_scores: boolean;
}

export interface ProgramMajorItem {
  degree_name: string;
  direct_entry: boolean;
  stem_designated: boolean;
}

export interface FinancialProfile {
  avg_intl_financial_aid: string;
  need_blind_for_intl: boolean;
  css_profile_required: boolean;
  coa_tuition_usd: number;
  coa_health_insurance_usd: number;
  coa_living_expenses_usd: number;
  coa_total_annual_usd: number;
  intl_aid_classification: 'Need-Blind for International' | 'Need-Aware with Institutional Aid' | 'Zero Institutional Aid for Non-US Citizens';
}

export interface UniversityRecord {
  id: string;
  name: string;
  shortName: string;
  country: 'USA' | 'UK' | 'Canada' | 'Germany' | 'Australia' | 'Singapore' | 'Switzerland';
  flag: string;
  city: string;
  worldRanking: number;
  acceptanceRate: number; // First-year overall
  tuitionUSD: number;
  tuitionDisplay: string;
  livingCostUSD: number;
  programs: string[];

  // Architectural Schema Blueprint
  effective_admission_cycle: string; // "2026-2027"
  admission_model: 'US/Canada (Holistic & Flexible Majors)' | 'UK/Europe/Commonwealth (Direct Course Entry)';
  testing_policies: TestingPolicies;
  programs_majors: ProgramMajorItem[];
  financial_profiles: FinancialProfile;

  // Direct properties for backwards compatibility & quick access:
  satRequirement: 'Required' | 'Test-Optional' | 'Test-Blind' | 'Not Required';
  satMiddle50: string;
  sat25th: number;
  sat75th: number;
  toeflMin: number;
  regularDeadline: string;
  earlyDeadline?: string;
  applicationPortal: string;
  scholarshipOpportunities: string;
  description: string;
  website: string;
  featuredTag?: string;

  // The 3 detailed applicant segments:
  firstYear: FirstYearDetails;
  transfer: TransferDetails;
  masters: MastersDetails;
}

export const COUNTRIES_LIST: string[] = [
  'All Countries',
  'USA',
  'UK',
  'Canada',
  'Germany',
  'Singapore',
  'Australia',
  'Switzerland',
];

export const STUDY_PROGRAMS_LIST: string[] = [
  'All Programs',
  'Computer Science',
  'Data Science & AI',
  'Engineering',
  'Business & Finance',
  'Biomedical & Life Sciences',
  'Economics & Social Sciences',
  'Arts & Humanities',
  'Law & Public Policy',
];

export const UNIVERSITIES_DATABASE: UniversityRecord[] = [
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology (MIT)',
    shortName: 'MIT',
    country: 'USA',
    flag: '🇺🇸',
    city: 'Cambridge, MA',
    worldRanking: 1,
    acceptanceRate: 4.0,
    tuitionUSD: 60150,
    tuitionDisplay: '$60,150 / year',
    livingCostUSD: 19800,
    programs: ['Computer Science', 'Engineering', 'Data Science & AI', 'Biomedical & Life Sciences', 'Business & Finance'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'US/Canada (Holistic & Flexible Majors)',
    testing_policies: {
      sat_policy: 'Required',
      min_toefl_ielts_score: 'TOEFL 100+ (105+ recommended) or IELTS 7.5+',
      english_waiver_conditions: 'Rarely waived. Waived only if primary language of instruction has been English for 4+ full years.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'B.S. in Computer Science and Engineering (Course 6-3)', direct_entry: false, stem_designated: true },
      { degree_name: 'B.S. in Artificial Intelligence and Decision Making (Course 6-4)', direct_entry: false, stem_designated: true },
      { degree_name: 'B.S. in Mechanical Engineering (Course 2)', direct_entry: false, stem_designated: true },
      { degree_name: 'MFin / Master of Finance', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: '$68,400 / year (Full demonstrated need met with zero loans)',
      need_blind_for_intl: true,
      css_profile_required: true,
      coa_tuition_usd: 60150,
      coa_health_insurance_usd: 3400,
      coa_living_expenses_usd: 19800,
      coa_total_annual_usd: 83350,
      intl_aid_classification: 'Need-Blind for International'
    },
    satRequirement: 'Required',
    satMiddle50: '1520 - 1580',
    sat25th: 1520,
    sat75th: 1580,
    toeflMin: 100,
    applicationPortal: 'MIT Online Application',
    regularDeadline: '2026-01-05',
    earlyDeadline: '2025-11-01 (EA)',
    scholarshipOpportunities: '100% Need-blind for international students; meets full demonstrated need with 0 loans.',
    description: 'World-leading polytechnic research university renowned for pioneering artificial intelligence, robotics, quantum computing, and quantitative finance.',
    website: 'https://mit.edu',
    featuredTag: 'Need-Blind / Top Ranked',
    firstYear: {
      satPolicy: 'Required',
      satMiddle50: '1520 - 1580 (Math: 790-800, RW: 730-780)',
      sat25th: 1520,
      sat75th: 1580,
      toeflMin: 100,
      toeflRecommended: 105,
      toeflSubscores: 'Min 25 on all 4 modules (Reading, Listening, Speaking, Writing)',
      averageGpa: '4.00 unweighted (Top 1% of secondary class)',
      regularDeadline: 'January 5 (Regular Action)',
      earlyDeadline: 'November 1 (Early Action - Non-Binding)',
      applicationPortal: 'Apply.mit.edu (Dedicated MIT portal)',
      aidPolicy: 'Need-blind for all applicants worldwide; covers 100% of demonstrated need.',
      keyAdmissionsTips: 'Math section score of 780-800 is practically standard. Highlight Olympiad participation or independent open-source/hardware builds.'
    },
    transfer: {
      transferAcceptanceRate: 1.5,
      minCollegeCredits: '2 semesters (1 academic year) of full-time calculus-based college coursework',
      maxTransferableCredits: 'Credit evaluated course-by-course; maximum 2 years equivalent',
      satPolicyTransfer: 'Required for all transfer applicants regardless of college credits',
      toeflPolicyTransfer: 'Required (100+ minimum); waived only if secondary schooling was English-medium for 4+ years',
      minCollegeGpa: '3.90+ in rigorous math and physics coursework',
      fallDeadline: 'February 15',
      springDeadline: 'October 15',
      housingGuarantee: 'Housing guaranteed for transfer students in first year',
      transferPortal: 'MIT Transfer Portal',
      transferTip: 'Must have completed university-level Calculus I & II, Multivariable Calculus, and Calculus-based Classical Mechanics and Electromagnetism.'
    },
    masters: {
      grePolicy: 'Program-Specific',
      greTargetScores: 'Quant 168+, Verbal 160+, AWA 4.5+ (EECS strongly recommends or requires)',
      toeflMinGrad: 100,
      toeflTaSpeakingCutoff: 26,
      minUndergradGpa: '3.8 / 4.0 in relevant technical undergraduate major',
      applicationDeadlines: 'December 15 (EECS/MechE) | January 15 (Sloan Business)',
      assistantshipsFunding: 'Virtually 100% of MS/PhD thesis students receive full tuition remission + $42,500/yr RA/TA stipend.',
      stemOptDuration: '36 months (12 mo initial OPT + 24 mo STEM extension)',
      popularMastersPrograms: ['MS in EECS', 'Master of Finance (MFin)', 'MS in Technology and Policy', 'Master of Engineering in CS'],
      mastersTip: 'Direct faculty research alignment is essential. Reach out to Principal Investigators with specific paper citations prior to December deadline.'
    }
  },
  {
    id: 'harvard',
    name: 'Harvard University',
    shortName: 'Harvard',
    country: 'USA',
    flag: '🇺🇸',
    city: 'Cambridge, MA',
    worldRanking: 4,
    acceptanceRate: 3.4,
    tuitionUSD: 59076,
    tuitionDisplay: '$59,076 / year',
    livingCostUSD: 21000,
    programs: ['Economics & Social Sciences', 'Biomedical & Life Sciences', 'Computer Science', 'Arts & Humanities', 'Law & Public Policy'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'US/Canada (Holistic & Flexible Majors)',
    testing_policies: {
      sat_policy: 'Required',
      min_toefl_ielts_score: 'TOEFL 100+ (105+ recommended) or IELTS 7.5+',
      english_waiver_conditions: 'Waived if SAT Reading & Writing section is 700+ or school instruction was entirely in English.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'A.B. in Applied Mathematics / Data Science', direct_entry: false, stem_designated: true },
      { degree_name: 'A.B. in Economics', direct_entry: false, stem_designated: true },
      { degree_name: 'A.B. in Computer Science', direct_entry: false, stem_designated: true },
      { degree_name: 'Master in Public Policy (MPP) / HKS', direct_entry: true, stem_designated: false }
    ],
    financial_profiles: {
      avg_intl_financial_aid: '$71,000 / year (Full demonstrated need met without student loans)',
      need_blind_for_intl: true,
      css_profile_required: true,
      coa_tuition_usd: 59076,
      coa_health_insurance_usd: 4200,
      coa_living_expenses_usd: 21000,
      coa_total_annual_usd: 84276,
      intl_aid_classification: 'Need-Blind for International'
    },
    satRequirement: 'Required',
    satMiddle50: '1510 - 1580',
    sat25th: 1510,
    sat75th: 1580,
    toeflMin: 100,
    applicationPortal: 'Common App / Coalition App',
    regularDeadline: '2026-01-01',
    earlyDeadline: '2025-11-01 (REA)',
    scholarshipOpportunities: '100% Need-Blind for all international students; zero loans; families making under $85,000 pay $0.',
    description: 'Oldest US institution of higher learning, distinguished by massive global alumni endowment, world-renowned library collections, and unmatched humanities and science prestige.',
    website: 'https://harvard.edu',
    featuredTag: 'Need-Blind / Ivy League',
    firstYear: {
      satPolicy: 'Required',
      satMiddle50: '1510 - 1580 (Math: 760-800, RW: 740-780)',
      sat25th: 1510,
      sat75th: 1580,
      toeflMin: 100,
      toeflRecommended: 108,
      toeflSubscores: 'Minimum 26 in Speaking and Writing',
      averageGpa: '4.00 unweighted (Rank 1-2 in school)',
      regularDeadline: 'January 1',
      earlyDeadline: 'November 1 (Restrictive Early Action)',
      applicationPortal: 'Common App / Coalition',
      aidPolicy: 'Need-blind worldwide; 100% full demonstrated need met with grant aid only.',
      keyAdmissionsTips: 'Look beyond academic perfection: Harvard seeks unusual character, creative original initiative, and civic leadership that enriches the residential community.'
    },
    transfer: {
      transferAcceptanceRate: 0.9,
      minCollegeCredits: '1 full continuous year of university degree study (minimum 32 semester credits)',
      maxTransferableCredits: 'Maximum 16 half-courses (2 full years)',
      satPolicyTransfer: 'Required for all transfer candidates',
      toeflPolicyTransfer: 'Required unless secondary instruction was 100% English-medium',
      minCollegeGpa: '3.95+ at current university',
      fallDeadline: 'March 1',
      springDeadline: 'No spring transfer intake',
      housingGuarantee: 'Guaranteed residential House system accommodation',
      transferPortal: 'Common Application for Transfer',
      transferTip: 'Extremely selective. Clearly explain specific academic coursework available at Harvard that does not exist at your current institution.'
    },
    masters: {
      grePolicy: 'Program-Specific',
      greTargetScores: 'Quant 166+, Verbal 163+, AWA 4.5+',
      toeflMinGrad: 100,
      toeflTaSpeakingCutoff: 26,
      minUndergradGpa: '3.8 / 4.0 or First Class with Distinction',
      applicationDeadlines: 'December 1 (GSAS) | January 3 (HKS/SEAS)',
      assistantshipsFunding: 'Doctoral PhD candidates fully funded; professional MS programs (SEAS Data Science) have competitive merit fellowships.',
      stemOptDuration: '36 months (for SEAS Computational Science and Engineering MS)',
      popularMastersPrograms: ['MS in Data Science', 'Master in Public Policy (MPP)', 'MS in Computational Science and Engineering', 'Master of Laws (LLM)'],
      mastersTip: 'Highlight intellectual maturity, interdisciplinary publications, and clear faculty advisor alignment.'
    }
  },
  {
    id: 'princeton',
    name: 'Princeton University',
    shortName: 'Princeton',
    country: 'USA',
    flag: '🇺🇸',
    city: 'Princeton, NJ',
    worldRanking: 6,
    acceptanceRate: 4.4,
    tuitionUSD: 59710,
    tuitionDisplay: '$59,710 / year',
    livingCostUSD: 19500,
    programs: ['Engineering', 'Economics & Social Sciences', 'Computer Science', 'Arts & Humanities', 'Data Science & AI'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'US/Canada (Holistic & Flexible Majors)',
    testing_policies: {
      sat_policy: 'Test-Optional',
      min_toefl_ielts_score: 'TOEFL 100+ or IELTS 7.5+',
      english_waiver_conditions: 'Waived if student completed high school in English or scored 680+ on SAT Reading.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'B.S.E. in Computer Science', direct_entry: false, stem_designated: true },
      { degree_name: 'A.B. in Public and International Affairs (SPIA)', direct_entry: false, stem_designated: false },
      { degree_name: 'B.S.E. in Operations Research and Financial Engineering (ORFE)', direct_entry: false, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: '$72,500 / year (First US college to eliminate student loans from aid packages)',
      need_blind_for_intl: true,
      css_profile_required: true,
      coa_tuition_usd: 59710,
      coa_health_insurance_usd: 3500,
      coa_living_expenses_usd: 19500,
      coa_total_annual_usd: 82710,
      intl_aid_classification: 'Need-Blind for International'
    },
    satRequirement: 'Test-Optional',
    satMiddle50: '1500 - 1570',
    sat25th: 1500,
    sat75th: 1570,
    toeflMin: 100,
    applicationPortal: 'Common App / Coalition App',
    regularDeadline: '2026-01-01',
    earlyDeadline: '2025-11-01 (Single-Choice EA)',
    scholarshipOpportunities: 'Need-Blind for international applicants; meets 100% full demonstrated need without student loans.',
    description: 'Ivy League powerhouse known for undergraduate senior thesis requirement, historic residential colleges, and peerless financial aid.',
    website: 'https://princeton.edu',
    featuredTag: 'Need-Blind / Zero Loans',
    firstYear: {
      satPolicy: 'Test-Optional',
      satMiddle50: '1500 - 1570 (Math: 770-800, RW: 730-780)',
      sat25th: 1500,
      sat75th: 1570,
      toeflMin: 100,
      toeflRecommended: 108,
      toeflSubscores: 'Minimum 25 on all modules',
      averageGpa: '3.95 unweighted',
      regularDeadline: 'January 1',
      earlyDeadline: 'November 1 (Single-Choice Early Action)',
      applicationPortal: 'Common App / Coalition',
      aidPolicy: 'Need-blind for international students; 100% demonstrated need met with grant aid only.',
      keyAdmissionsTips: 'Princeton requires a Graded Written Paper from high school (with teacher comments and grade). Pick a humanities or social studies analytical essay.'
    },
    transfer: {
      transferAcceptanceRate: 1.8,
      minCollegeCredits: 'Must have at least one full year of college credits',
      maxTransferableCredits: 'Up to 2 years (cannot enter with more than 2 years completed)',
      satPolicyTransfer: 'Optional for transfer applicants',
      toeflPolicyTransfer: 'Required for non-native English speakers',
      minCollegeGpa: '3.85+',
      fallDeadline: 'March 15',
      housingGuarantee: 'Housing guaranteed for all 4 years including transfer students',
      transferPortal: 'Princeton Transfer Common App',
      transferTip: 'Princeton actively seeks low-income and community college transfer students. Highlight your untraditional life trajectory.'
    },
    masters: {
      grePolicy: 'Program-Specific',
      greTargetScores: 'Quant 168+ for ORFE and CS',
      toeflMinGrad: 100,
      toeflTaSpeakingCutoff: 27,
      minUndergradGpa: '3.8 / 4.0',
      applicationDeadlines: 'December 1 to January 3 depending on department',
      assistantshipsFunding: 'All admitted PhD students receive full fellowship + stipend. Master in Finance offers merit scholarships.',
      stemOptDuration: '36 months',
      popularMastersPrograms: ['Master in Finance (MFin)', 'MSE in Computer Science', 'MPA / Master in Public Affairs'],
      mastersTip: 'For MSE Computer Science, evidence of advanced research authorship is paramount.'
    }
  },
  {
    id: 'yale',
    name: 'Yale University',
    shortName: 'Yale',
    country: 'USA',
    flag: '🇺🇸',
    city: 'New Haven, CT',
    worldRanking: 9,
    acceptanceRate: 4.5,
    tuitionUSD: 64700,
    tuitionDisplay: '$64,700 / year',
    livingCostUSD: 19600,
    programs: ['Law & Public Policy', 'Arts & Humanities', 'Economics & Social Sciences', 'Biomedical & Life Sciences', 'Computer Science'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'US/Canada (Holistic & Flexible Majors)',
    testing_policies: {
      sat_policy: 'Required',
      min_toefl_ielts_score: 'TOEFL 100+ (25+ subscores) or IELTS 7.5+ or Duolingo 125+',
      english_waiver_conditions: 'Waived if applicant scored 700+ on SAT Reading or attended 3+ years in English-medium high school.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'B.A. in Ethics, Politics and Economics (EP&E)', direct_entry: false, stem_designated: false },
      { degree_name: 'B.S. in Computer Science & Mathematics', direct_entry: false, stem_designated: true },
      { degree_name: 'Master of Advanced Management (MAM)', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: '$73,000 / year (Need-blind worldwide with zero loans)',
      need_blind_for_intl: true,
      css_profile_required: true,
      coa_tuition_usd: 64700,
      coa_health_insurance_usd: 3200,
      coa_living_expenses_usd: 19600,
      coa_total_annual_usd: 87500,
      intl_aid_classification: 'Need-Blind for International'
    },
    satRequirement: 'Required',
    satMiddle50: '1500 - 1580',
    sat25th: 1500,
    sat75th: 1580,
    toeflMin: 100,
    applicationPortal: 'Common App / Coalition App / QuestBridge',
    regularDeadline: '2026-01-02',
    earlyDeadline: '2025-11-01 (Single-Choice EA)',
    scholarshipOpportunities: 'Need-blind for international students; meets 100% full demonstrated need with 0 loans.',
    description: 'Renowned for residential college system, secret societies, dramatic arts, constitutional law, and pioneering test-flexible policy requiring SAT, ACT, APs, or IB.',
    website: 'https://yale.edu',
    featuredTag: 'Need-Blind / Ivy League',
    firstYear: {
      satPolicy: 'Required',
      satMiddle50: '1500 - 1580 (Math: 760-800, RW: 740-780)',
      sat25th: 1500,
      sat75th: 1580,
      toeflMin: 100,
      toeflRecommended: 105,
      toeflSubscores: 'Minimum 25 on all sections',
      averageGpa: '3.95 unweighted',
      regularDeadline: 'January 2',
      earlyDeadline: 'November 1 (Single-Choice Early Action)',
      applicationPortal: 'Common App / Coalition',
      aidPolicy: 'Need-blind for all students worldwide; 100% of demonstrated need met with zero loans.',
      keyAdmissionsTips: 'Yale adopted a Test-Flexible policy: you can submit SAT, ACT, AP subject exams, or IB higher level predictions to satisfy standardized testing.'
    },
    transfer: {
      transferAcceptanceRate: 1.6,
      minCollegeCredits: 'Must have completed at least one full year of university study',
      maxTransferableCredits: 'Maximum 18 course credits (half of 36 required for graduation)',
      satPolicyTransfer: 'Required test-flexible submission for all transfer candidates',
      toeflPolicyTransfer: 'Required (100+ minimum)',
      minCollegeGpa: '3.90+',
      fallDeadline: 'March 1',
      housingGuarantee: 'Housing guaranteed for transfer students',
      transferPortal: 'Common Application for Transfer',
      transferTip: 'Yale values community engagement; articulate how your transfer contributes to vibrant dining-hall discussions in your residential college.'
    },
    masters: {
      grePolicy: 'Program-Specific',
      greTargetScores: 'Quant 166+, Verbal 160+',
      toeflMinGrad: 100,
      toeflTaSpeakingCutoff: 26,
      minUndergradGpa: '3.8 / 4.0',
      applicationDeadlines: 'December 15 (GSAS) | January 15 (Yale School of the Environment)',
      assistantshipsFunding: 'Full tuition and living stipend for all PhD students; merit scholarships at Yale SOM.',
      stemOptDuration: '36 months for STEM designated masters',
      popularMastersPrograms: ['MS in Computer Science', 'Master of Environmental Management (MEM)', 'Master of Advanced Management (MAM)'],
      mastersTip: 'Interdisciplinary scholarship is central to Yale Graduate School. Reference cross-departmental labs.'
    }
  },
  {
    id: 'dartmouth',
    name: 'Dartmouth College',
    shortName: 'Dartmouth',
    country: 'USA',
    flag: '🇺🇸',
    city: 'Hanover, NH',
    worldRanking: 12,
    acceptanceRate: 5.3,
    tuitionUSD: 63684,
    tuitionDisplay: '$63,684 / year',
    livingCostUSD: 19100,
    programs: ['Economics & Social Sciences', 'Engineering', 'Computer Science', 'Biomedical & Life Sciences', 'Arts & Humanities'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'US/Canada (Holistic & Flexible Majors)',
    testing_policies: {
      sat_policy: 'Required',
      min_toefl_ielts_score: 'TOEFL 100+ or IELTS 7.0+ or Duolingo 130+',
      english_waiver_conditions: 'Waived if applicant attended high school where instruction was in English for 3+ years.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'A.B. in Computer Science', direct_entry: false, stem_designated: true },
      { degree_name: 'B.E. in Engineering Sciences (Thayer School)', direct_entry: false, stem_designated: true },
      { degree_name: 'A.B. in Economics', direct_entry: false, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: '$71,500 / year (Need-blind for international students as of 2022)',
      need_blind_for_intl: true,
      css_profile_required: true,
      coa_tuition_usd: 63684,
      coa_health_insurance_usd: 3900,
      coa_living_expenses_usd: 19100,
      coa_total_annual_usd: 86684,
      intl_aid_classification: 'Need-Blind for International'
    },
    satRequirement: 'Required',
    satMiddle50: '1480 - 1560',
    sat25th: 1480,
    sat75th: 1560,
    toeflMin: 100,
    applicationPortal: 'Common App',
    regularDeadline: '2026-01-02',
    earlyDeadline: '2025-11-01 (ED)',
    scholarshipOpportunities: 'Need-Blind for international applicants; meets 100% of demonstrated need with zero loans.',
    description: 'Premier Ivy League undergraduate institution famous for the D-Plan quarter system, Thayer School of Engineering, and outdoor leadership.',
    website: 'https://dartmouth.edu',
    featuredTag: 'Need-Blind / SAT Reinstated',
    firstYear: {
      satPolicy: 'Required',
      satMiddle50: '1480 - 1560',
      sat25th: 1480,
      sat75th: 1560,
      toeflMin: 100,
      toeflRecommended: 105,
      toeflSubscores: 'Minimum 24 in each section',
      averageGpa: '3.92 unweighted',
      regularDeadline: 'January 2',
      earlyDeadline: 'November 1 (Early Decision - Binding)',
      applicationPortal: 'Common App',
      aidPolicy: 'Need-blind for international students; meets 100% demonstrated financial need without loans.',
      keyAdmissionsTips: 'Dartmouth was the first Ivy to reinstate the SAT requirement after internal research proved testing identifies high-potential low-income international students.'
    },
    transfer: {
      transferAcceptanceRate: 1.5,
      minCollegeCredits: '1 full year of college work (minimum 9 Dartmouth credits equivalent)',
      maxTransferableCredits: 'Up to 17 course credits',
      satPolicyTransfer: 'Required for all transfer applicants',
      toeflPolicyTransfer: 'Required unless secondary instruction was in English',
      minCollegeGpa: '3.85+',
      fallDeadline: 'March 1',
      housingGuarantee: 'Housing guaranteed for transfer students',
      transferPortal: 'Common App for Transfer',
      transferTip: 'Demonstrate genuine interest in the D-Plan (quarter system) and experiential research.'
    },
    masters: {
      grePolicy: 'Program-Specific',
      greTargetScores: 'Quant 165+',
      toeflMinGrad: 100,
      toeflTaSpeakingCutoff: 26,
      minUndergradGpa: '3.7 / 4.0',
      applicationDeadlines: 'December 15 (CS) | January 15 (MEM)',
      assistantshipsFunding: 'MS and PhD in Computer Science offer tuition coverage and stipends; Master of Engineering Management offers merit aid.',
      stemOptDuration: '36 months',
      popularMastersPrograms: ['Master of Engineering Management (MEM)', 'MS in Computer Science', 'MS in Health Data Science'],
      mastersTip: 'Thayer School emphasizes industry internships and direct engineering design.'
    }
  },
  {
    id: 'amherst',
    name: 'Amherst College',
    shortName: 'Amherst',
    country: 'USA',
    flag: '🇺🇸',
    city: 'Amherst, MA',
    worldRanking: 15,
    acceptanceRate: 7.0,
    tuitionUSD: 66650,
    tuitionDisplay: '$66,650 / year',
    livingCostUSD: 18200,
    programs: ['Economics & Social Sciences', 'Arts & Humanities', 'Computer Science', 'Biomedical & Life Sciences', 'Law & Public Policy'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'US/Canada (Holistic & Flexible Majors)',
    testing_policies: {
      sat_policy: 'Test-Optional',
      min_toefl_ielts_score: 'TOEFL 100+ or IELTS 7.5+ or Duolingo 130+',
      english_waiver_conditions: 'Waived if student studied in English for 3+ years or scored 700+ on SAT Reading.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'B.A. in Computer Science', direct_entry: false, stem_designated: true },
      { degree_name: 'B.A. in Mathematics & Statistics', direct_entry: false, stem_designated: true },
      { degree_name: 'B.A. in Law, Jurisprudence, and Social Thought', direct_entry: false, stem_designated: false }
    ],
    financial_profiles: {
      avg_intl_financial_aid: '$74,000 / year (One of only 8 US colleges that is need-blind for all international students)',
      need_blind_for_intl: true,
      css_profile_required: true,
      coa_tuition_usd: 66650,
      coa_health_insurance_usd: 3100,
      coa_living_expenses_usd: 18200,
      coa_total_annual_usd: 87950,
      intl_aid_classification: 'Need-Blind for International'
    },
    satRequirement: 'Test-Optional',
    satMiddle50: '1460 - 1560',
    sat25th: 1460,
    sat75th: 1560,
    toeflMin: 100,
    applicationPortal: 'Common App / Coalition App / QuestBridge',
    regularDeadline: '2026-01-03',
    earlyDeadline: '2025-11-01 (ED)',
    scholarshipOpportunities: '100% Need-blind for international students; meets full demonstrated need with 0 loans.',
    description: 'Premier liberal arts college renowned for its Open Curriculum (zero core requirements), intimate faculty mentorship, and exceptional need-blind international aid.',
    website: 'https://amherst.edu',
    featuredTag: 'Need-Blind / Open Curriculum',
    firstYear: {
      satPolicy: 'Test-Optional',
      satMiddle50: '1460 - 1560 (Math: 740-800, RW: 720-770)',
      sat25th: 1460,
      sat75th: 1560,
      toeflMin: 100,
      toeflRecommended: 105,
      toeflSubscores: 'Minimum 25 on all modules',
      averageGpa: '3.93 unweighted',
      regularDeadline: 'January 3',
      earlyDeadline: 'November 1 (Early Decision - Binding)',
      applicationPortal: 'Common App / Coalition',
      aidPolicy: 'Need-blind worldwide; 100% demonstrated financial need met without loans.',
      keyAdmissionsTips: 'Emphasize your passion for the Open Curriculum: explain how you will design an intellectual course of study without mandatory distribution requirements.'
    },
    transfer: {
      transferAcceptanceRate: 4.2,
      minCollegeCredits: '1 full year of college work (minimum 32 semester hours)',
      maxTransferableCredits: 'Up to 2 full years',
      satPolicyTransfer: 'Optional for transfer applicants',
      toeflPolicyTransfer: 'Required unless secondary instruction was in English',
      minCollegeGpa: '3.80+',
      fallDeadline: 'March 1',
      housingGuarantee: 'Housing guaranteed for all enrolled students',
      transferPortal: 'Common Application for Transfer',
      transferTip: 'Amherst welcomes community college and international veterans. Explain how you will contribute to seminar discussions.'
    },
    masters: {
      grePolicy: 'Not Required',
      toeflMinGrad: 0,
      toeflTaSpeakingCutoff: 0,
      minUndergradGpa: 'N/A',
      applicationDeadlines: 'Undergraduate-only institution',
      assistantshipsFunding: 'N/A (Exclusively undergraduate teaching college)',
      stemOptDuration: 'N/A',
      popularMastersPrograms: [],
      mastersTip: 'Amherst is exclusively an undergraduate institution (no graduate degrees offered).'
    }
  },
  {
    id: 'utaustin',
    name: 'University of Texas at Austin',
    shortName: 'UT Austin',
    country: 'USA',
    flag: '🇺🇸',
    city: 'Austin, TX',
    worldRanking: 43,
    acceptanceRate: 11.0, // Non-Texas resident rate is ~11%
    tuitionUSD: 41264,
    tuitionDisplay: '$41,264 / year (Out-of-State / Intl)',
    livingCostUSD: 16500,
    programs: ['Computer Science', 'Engineering', 'Business & Finance', 'Data Science & AI', 'Biomedical & Life Sciences'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'US/Canada (Holistic & Flexible Majors)',
    testing_policies: {
      sat_policy: 'Required',
      min_toefl_ielts_score: 'TOEFL 79+ (100+ recommended for Cockrell/McCombs) or IELTS 6.5+',
      english_waiver_conditions: 'Waived if student studied in US high school for 3+ years or scored 600+ on SAT Reading.',
      accepts_self_reported_scores: false // STRICTLY REQUIRES OFFICIAL SCORE REPORT!
    },
    programs_majors: [
      { degree_name: 'B.S. in Computer Science (Turing Scholars)', direct_entry: true, stem_designated: true },
      { degree_name: 'B.S. in Electrical and Computer Engineering (ECE)', direct_entry: true, stem_designated: true },
      { degree_name: 'B.B.A. in Finance / Canfield Business Honors', direct_entry: true, stem_designated: true },
      { degree_name: 'M.S. in Computer Science', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: 'Limited institutional aid (Competitive $1,000+ scholarships grant in-state tuition waiver)',
      need_blind_for_intl: false,
      css_profile_required: false,
      coa_tuition_usd: 41264,
      coa_health_insurance_usd: 3100,
      coa_living_expenses_usd: 16500,
      coa_total_annual_usd: 60864,
      intl_aid_classification: 'Zero Institutional Aid for Non-US Citizens'
    },
    satRequirement: 'Required',
    satMiddle50: '1370 - 1530',
    sat25th: 1370,
    sat75th: 1530,
    toeflMin: 79,
    applicationPortal: 'Common App / ApplyTexas',
    regularDeadline: '2025-12-01',
    earlyDeadline: '2025-10-15 (Priority)',
    scholarshipOpportunities: 'Competitive merit scholarships. Winning a $1,000+ competitive academic scholarship triggers an In-State Tuition Waiver reducing tuition to ~$12,000/yr!',
    description: 'Top-tier public research flagship with elite engineering (Cockrell), business (McCombs), and computer science programs at the heart of the Austin technology corridor.',
    website: 'https://utexas.edu',
    featuredTag: 'SAT Reinstated / Austin Tech',
    firstYear: {
      satPolicy: 'Required',
      satMiddle50: '1370 - 1530 (CS/Engineering: 1480-1560)',
      sat25th: 1370,
      sat75th: 1530,
      toeflMin: 79,
      toeflRecommended: 100,
      toeflSubscores: 'Minimum 20 in each section',
      averageGpa: '3.90+ (Top 6% automatic Texas admission rule makes non-Texas seats fiercely competitive)',
      regularDeadline: 'December 1 (Strict)',
      earlyDeadline: 'October 15 (Priority)',
      applicationPortal: 'Common App / ApplyTexas',
      aidPolicy: 'Need-aware for international students. Institutional need-based aid is restricted to US citizens.',
      keyAdmissionsTips: 'CRITICAL: UT Austin strictly REQUIRES official score reports directly from College Board (Code 6882) or ACT. Self-reported scores are NOT evaluated!'
    },
    transfer: {
      transferAcceptanceRate: 15.0,
      minCollegeCredits: 'Must have at least 24 transferable semester hours',
      maxTransferableCredits: 'Maximum 60 semester hours',
      satPolicyTransfer: 'Not required for transfer applicants with 24+ credits',
      toeflPolicyTransfer: 'Required unless 2 English composition courses completed with grade of B or better',
      minCollegeGpa: '3.75+ for engineering/business',
      fallDeadline: 'March 1',
      springDeadline: 'October 1',
      housingGuarantee: 'Housing not guaranteed for transfer students (abundant off-campus apartments)',
      transferPortal: 'ApplyTexas / Common App for Transfer',
      transferTip: 'Review the Automated Transfer Equivalency (ATE) system to ensure your courses match UT prerequisites.'
    },
    masters: {
      grePolicy: 'Required',
      greTargetScores: 'Quant 166+, Verbal 155+, AWA 4.0+',
      toeflMinGrad: 79,
      toeflTaSpeakingCutoff: 26,
      minUndergradGpa: '3.5 / 4.0',
      applicationDeadlines: 'December 15 (CS and ECE)',
      assistantshipsFunding: 'Teaching assistantships (TA) and Graduate Research Assistantships (GRA) cover tuition and provide in-state rate waiver + stipend.',
      stemOptDuration: '36 months',
      popularMastersPrograms: ['MS in Computer Science', 'MS in Electrical and Computer Engineering', 'MS in Business Analytics (MSBA)', 'MS in Data Science'],
      mastersTip: 'Austin has immense tech hiring with Dell, Tesla, Apple, and Google. Mention local industry collaboration.'
    }
  },
  {
    id: 'purdue',
    name: 'Purdue University',
    shortName: 'Purdue',
    country: 'USA',
    flag: '🇺🇸',
    city: 'West Lafayette, IN',
    worldRanking: 48,
    acceptanceRate: 50.0, // Overall ~50%, but Engineering/CS is ~18%
    tuitionUSD: 31104,
    tuitionDisplay: '$31,104 / year (Tuition frozen for 12 consecutive years!)',
    livingCostUSD: 12500,
    programs: ['Engineering', 'Computer Science', 'Data Science & AI', 'Biomedical & Life Sciences', 'Business & Finance'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'US/Canada (Holistic & Flexible Majors)',
    testing_policies: {
      sat_policy: 'Required',
      min_toefl_ielts_score: 'TOEFL 80+ (Engineering/CS requires 88+ with 20+ subscores) or IELTS 6.5+',
      english_waiver_conditions: 'Waived if applicant scored 600+ on SAT Reading or completed 3 years in English-medium school.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'B.S. in Computer Science', direct_entry: true, stem_designated: true },
      { degree_name: 'B.S. in Aerospace Engineering', direct_entry: true, stem_designated: true },
      { degree_name: 'B.S. in Mechanical Engineering', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: 'Zero institutional need-based financial aid for international students',
      need_blind_for_intl: false,
      css_profile_required: false,
      coa_tuition_usd: 31104,
      coa_health_insurance_usd: 2100,
      coa_living_expenses_usd: 12500,
      coa_total_annual_usd: 45704,
      intl_aid_classification: 'Zero Institutional Aid for Non-US Citizens'
    },
    satRequirement: 'Required',
    satMiddle50: '1210 - 1440',
    sat25th: 1210,
    sat75th: 1440,
    toeflMin: 80,
    applicationPortal: 'Common App',
    regularDeadline: '2026-01-15',
    earlyDeadline: '2025-11-01 (EA - Priority for Engineering & CS)',
    scholarshipOpportunities: 'Tuition frozen at 2012 levels ($31,104) makes Purdue one of the highest ROI public engineering schools in the world. Limited merit aid.',
    description: 'The "Cradle of Astronauts", renowned for world-class aerospace, mechanical, and electrical engineering, and famous 12-year tuition freeze.',
    website: 'https://purdue.edu',
    featuredTag: '12-Yr Tuition Freeze / SAT Required',
    firstYear: {
      satPolicy: 'Required',
      satMiddle50: '1210 - 1440 (Engineering & CS middle 50% is 1420 - 1530)',
      sat25th: 1210,
      sat75th: 1440,
      toeflMin: 80,
      toeflRecommended: 90,
      toeflSubscores: 'Minimum 20 on all sections for Engineering & Science',
      averageGpa: '3.75 - 4.00 unweighted',
      regularDeadline: 'January 15',
      earlyDeadline: 'November 1 (Early Action - CRITICAL for Engineering & Computer Science)',
      applicationPortal: 'Common App',
      aidPolicy: 'Zero need-based aid for international undergraduates.',
      keyAdmissionsTips: 'MUST APPLY BY NOVEMBER 1 EARLY ACTION: Purdue Computer Science and Engineering majors fill almost 100% of seats in the Early Action round!'
    },
    transfer: {
      transferAcceptanceRate: 35.0,
      minCollegeCredits: 'Must have at least 24 college credit hours',
      maxTransferableCredits: 'Must earn minimum 32 Purdue credits to graduate',
      satPolicyTransfer: 'Required if fewer than 24 college credits completed',
      toeflPolicyTransfer: 'Required (80+ minimum)',
      minCollegeGpa: '3.50+ for College of Engineering',
      fallDeadline: 'June 1 (Engineering deadline is earlier: February 1)',
      springDeadline: 'October 1',
      housingGuarantee: 'On-campus housing limited; off-campus housing accessible',
      transferPortal: 'Purdue Online Application / Common App',
      transferTip: 'Must meet specific course-to-course prerequisites in Calculus, General Chemistry, and Calculus-based Physics.'
    },
    masters: {
      grePolicy: 'Program-Specific',
      greTargetScores: 'Quant 164+, Verbal 153+',
      toeflMinGrad: 80,
      toeflTaSpeakingCutoff: 27,
      minUndergradGpa: '3.3 / 4.0 in engineering or science',
      applicationDeadlines: 'December 15 (CS) | January 1 (ME & ECE)',
      assistantshipsFunding: 'Vast majority of thesis MS/PhD engineering candidates receive graduate research or teaching assistantships.',
      stemOptDuration: '36 months',
      popularMastersPrograms: ['MS in Mechanical Engineering', 'MS in Computer Science', 'MS in Electrical & Computer Engineering', 'MS in Aeronautics and Astronautics'],
      mastersTip: 'Purdue has deep NASA and defense contractor ties. Contact research lab directors directly.'
    }
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    shortName: 'Oxford',
    country: 'UK',
    flag: '🇬🇧',
    city: 'Oxford',
    worldRanking: 2,
    acceptanceRate: 14.5,
    tuitionUSD: 44500,
    tuitionDisplay: '£35,000 - £48,000 / year',
    livingCostUSD: 18000,
    programs: ['Arts & Humanities', 'Law & Public Policy', 'Biomedical & Life Sciences', 'Economics & Social Sciences', 'Computer Science'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'UK/Europe/Commonwealth (Direct Course Entry)',
    testing_policies: {
      sat_policy: 'Required', // SAT 1480+ plus 3 AP 5s for US curriculum students!
      min_toefl_ielts_score: 'IELTS 7.5 (min 7.0 in all) or TOEFL 110 (L:22, R:24, S:25, W:24)',
      english_waiver_conditions: 'Strict. Waived only if applicant completed full secondary schooling in an English-majority nation (UK, US, Canada, Australia).',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'BA in Computer Science', direct_entry: true, stem_designated: true },
      { degree_name: 'BA in Philosophy, Politics and Economics (PPE)', direct_entry: true, stem_designated: false },
      { degree_name: 'BA in Mathematics', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: 'Clarendon Fund (Full graduate tuition + living stipend); Rhodes Scholarship (Full ride)',
      need_blind_for_intl: false,
      css_profile_required: false,
      coa_tuition_usd: 44500,
      coa_health_insurance_usd: 1000,
      coa_living_expenses_usd: 18000,
      coa_total_annual_usd: 63500,
      intl_aid_classification: 'Need-Aware with Institutional Aid'
    },
    satRequirement: 'Required',
    satMiddle50: '1480 - 1560',
    sat25th: 1480,
    sat75th: 1560,
    toeflMin: 110,
    applicationPortal: 'UCAS (Direct course entry)',
    regularDeadline: '2025-10-15',
    scholarshipOpportunities: 'Clarendon Fund (Graduate); Rhodes Scholarship; limited undergraduate international bursaries.',
    description: 'Oldest university in the English-speaking world, featuring collegiate tutorial teaching, direct single-course entry, and world-famous entrance exams (MAT, PAT, TSA).',
    website: 'https://ox.ac.uk',
    featuredTag: 'UCAS Direct / Oct 15 Deadline',
    firstYear: {
      satPolicy: 'Required',
      satMiddle50: '1480 - 1560 (For US students: SAT 1480+ PLUS at least three AP scores of 5)',
      sat25th: 1480,
      sat75th: 1560,
      toeflMin: 110,
      toeflRecommended: 112,
      toeflSubscores: 'Listening 22, Reading 24, Speaking 25, Writing 24',
      averageGpa: 'A*A*A in A-Levels or 39+ in IB with 7,6,6 at HL; or 90%+ in Indian 12th Board',
      regularDeadline: 'October 15 (Strict annual UCAS cutoff)',
      applicationPortal: 'UCAS (Application code OXF O33)',
      aidPolicy: 'International fees are mandatory; few undergraduate full scholarships exist.',
      keyAdmissionsTips: 'October 15 deadline is non-negotiable. You must register for subject admissions tests (MAT, PAT, TSA, LNAT) by late September.'
    },
    transfer: {
      transferAcceptanceRate: 0.0,
      minCollegeCredits: 'Oxford does NOT accept undergraduate transfer credit',
      maxTransferableCredits: '0 credits. All entrants must start in Year 1',
      satPolicyTransfer: 'N/A',
      toeflPolicyTransfer: 'N/A',
      minCollegeGpa: 'N/A',
      fallDeadline: 'October 15 (Must apply as first-year entrant)',
      housingGuarantee: 'Collegiate accommodation guaranteed for Year 1',
      transferPortal: 'UCAS',
      transferTip: 'If already attending college, you can apply as a "Senior Status" student (2-year accelerated BA) or re-apply as a fresh first-year candidate.'
    },
    masters: {
      grePolicy: 'Program-Specific',
      greTargetScores: 'Quant 165+ for Department of Computer Science and Mathematical Institute',
      toeflMinGrad: 110,
      toeflTaSpeakingCutoff: 25,
      minUndergradGpa: 'First Class Honours or 3.8 / 4.0 US equivalent',
      applicationDeadlines: 'December 1 to January 20 (Course dependent)',
      assistantshipsFunding: 'Clarendon Fund automatically considers all eligible applicants applying by the January deadline for full tuition + £18,622 stipend.',
      stemOptDuration: 'UK 2-Year Graduate Route Post-Study Work Visa',
      popularMastersPrograms: ['MSc in Advanced Computer Science', 'MSc in Mathematical and Computational Finance', 'Master of Public Policy (Blavatnik)', 'MSc in Economics for Development'],
      mastersTip: 'Every application must be reviewed by academic department first, then approved by a constituent Oxford College.'
    }
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    shortName: 'Cambridge',
    country: 'UK',
    flag: '🇬🇧',
    city: 'Cambridge',
    worldRanking: 5,
    acceptanceRate: 15.8,
    tuitionUSD: 46000,
    tuitionDisplay: '£37,000 - £63,000 / year',
    livingCostUSD: 17500,
    programs: ['Engineering', 'Computer Science', 'Biomedical & Life Sciences', 'Economics & Social Sciences', 'Arts & Humanities'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'UK/Europe/Commonwealth (Direct Course Entry)',
    testing_policies: {
      sat_policy: 'Required', // SAT 1500+ with 5 AP 5s for US applicants
      min_toefl_ielts_score: 'IELTS 7.5 (minimum 7.0 in all) or TOEFL 110 (25 in all components)',
      english_waiver_conditions: 'Rarely waived. Evaluated strictly during college interview.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'BA in Computer Science', direct_entry: true, stem_designated: true },
      { degree_name: 'BA in Engineering (4-year MEng)', direct_entry: true, stem_designated: true },
      { degree_name: 'BA in Economics (Tripos)', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: 'Gates Cambridge Scholarship (Full cost of study + living allowance for graduate students)',
      need_blind_for_intl: false,
      css_profile_required: false,
      coa_tuition_usd: 46000,
      coa_health_insurance_usd: 1000,
      coa_living_expenses_usd: 17500,
      coa_total_annual_usd: 64500,
      intl_aid_classification: 'Need-Aware with Institutional Aid'
    },
    satRequirement: 'Required',
    satMiddle50: '1500 - 1570',
    sat25th: 1500,
    sat75th: 1570,
    toeflMin: 110,
    applicationPortal: 'UCAS + My Cambridge Application',
    regularDeadline: '2025-10-15',
    scholarshipOpportunities: 'Gates Cambridge Scholarship; Cambridge Trust awards; limited undergraduate bursaries.',
    description: 'Global epicenter of scientific discovery (DNA double helix, Newtonian mechanics, computing theory) featuring world-renowned Tripos system and rigorous collegiate supervisions.',
    website: 'https://cam.ac.uk',
    featuredTag: 'UCAS Direct / Gates Scholarship',
    firstYear: {
      satPolicy: 'Required',
      satMiddle50: '1500 - 1570 (For US students: 5 AP scores of 5 in relevant STEM/humanities subjects)',
      sat25th: 1500,
      sat75th: 1570,
      toeflMin: 110,
      toeflRecommended: 112,
      toeflSubscores: 'Minimum 25 on every section',
      averageGpa: 'A*A*A in A-Levels or 40–42 in IB with 7,7,6 at HL',
      regularDeadline: 'October 15 (UCAS deadline) + October 22 (My Cambridge Application)',
      applicationPortal: 'UCAS + My Cambridge Application',
      aidPolicy: 'International applicants must demonstrate self-funding; limited Cambridge Trust undergraduate bursaries.',
      keyAdmissionsTips: 'Academic interview is decisive. Expect to solve unseen mathematical proofs or scientific problems live on a whiteboard with two professors.'
    },
    transfer: {
      transferAcceptanceRate: 0.0,
      minCollegeCredits: 'Does not accept undergraduate transfer students',
      maxTransferableCredits: '0 credits',
      satPolicyTransfer: 'N/A',
      toeflPolicyTransfer: 'N/A',
      minCollegeGpa: 'N/A',
      fallDeadline: 'October 15 (Must apply as fresh first-year candidate)',
      housingGuarantee: 'Collegiate accommodation guaranteed',
      transferPortal: 'UCAS',
      transferTip: 'Graduates of other universities can apply as "Affiliated Students" to complete a Cambridge BA in two years.'
    },
    masters: {
      grePolicy: 'Program-Specific',
      greTargetScores: 'Quant 167+ for Computer Science and Engineering',
      toeflMinGrad: 110,
      toeflTaSpeakingCutoff: 25,
      minUndergradGpa: 'First Class Honours or 3.85 / 4.0 US equivalent',
      applicationDeadlines: 'Early December (Gates Cambridge deadline) | January 5 (General)',
      assistantshipsFunding: 'Gates Cambridge Scholarship provides full tuition and £20,000 annual maintenance allowance.',
      stemOptDuration: 'UK 2-Year Graduate Route Post-Study Work Visa',
      popularMastersPrograms: ['MPhil in Advanced Computer Science', 'MPhil in Machine Learning and Machine Intelligence', 'MPhil in Finance', 'MPhil in Technology Policy'],
      mastersTip: 'Gates Cambridge emphasizes commitment to improving the lives of others alongside intellectual excellence.'
    }
  },
  {
    id: 'ucberkeley',
    name: 'University of California, Berkeley',
    shortName: 'UC Berkeley',
    country: 'USA',
    flag: '🇺🇸',
    city: 'Berkeley, CA',
    worldRanking: 10,
    acceptanceRate: 11.5,
    tuitionUSD: 48465,
    tuitionDisplay: '$48,465 / year (Non-resident tuition)',
    livingCostUSD: 23500,
    programs: ['Computer Science', 'Data Science & AI', 'Engineering', 'Economics & Social Sciences', 'Business & Finance'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'US/Canada (Holistic & Flexible Majors)',
    testing_policies: {
      sat_policy: 'Test-Blind', // SAT/ACT strictly not evaluated!
      min_toefl_ielts_score: 'TOEFL 80+ (100+ recommended) or IELTS 6.5+ or Duolingo 115+',
      english_waiver_conditions: 'Waived if student completed 3+ years in high school where English was the language of instruction.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'B.S. in Electrical Engineering & Computer Sciences (EECS)', direct_entry: true, stem_designated: true },
      { degree_name: 'B.A. in Computer Science (CDSS)', direct_entry: true, stem_designated: true },
      { degree_name: 'B.S. in Business Administration (Haas)', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: 'Zero need-based financial aid for non-resident and international students',
      need_blind_for_intl: false,
      css_profile_required: false,
      coa_tuition_usd: 48465,
      coa_health_insurance_usd: 4100,
      coa_living_expenses_usd: 23500,
      coa_total_annual_usd: 76065,
      intl_aid_classification: 'Zero Institutional Aid for Non-US Citizens'
    },
    satRequirement: 'Test-Blind',
    satMiddle50: 'Test-Blind (Scores not considered)',
    sat25th: 0,
    sat75th: 0,
    toeflMin: 80,
    applicationPortal: 'University of California Application',
    regularDeadline: '2025-11-30',
    scholarshipOpportunities: 'Regents’ and Chancellor’s Scholarship (merit-based); zero need-based aid for international students.',
    description: 'Preeminent public research university in the world, generating silicon valley unicorns, Nobel laureates, and leaders in free speech and open-source software.',
    website: 'https://berkeley.edu',
    featuredTag: 'Test-Blind / Silicon Valley',
    firstYear: {
      satPolicy: 'Test-Blind',
      satMiddle50: 'Test-Blind (Do NOT send SAT/ACT)',
      sat25th: 0,
      sat75th: 0,
      toeflMin: 80,
      toeflRecommended: 100,
      toeflSubscores: 'Minimum 22 on each section',
      averageGpa: '3.90 - 4.00 unweighted',
      regularDeadline: 'November 30 (Strict UC system-wide filing period: Oct 1 - Nov 30)',
      applicationPortal: 'UC Application portal (apply.universityofcalifornia.edu)',
      aidPolicy: 'Zero institutional need-based aid for international students.',
      keyAdmissionsTips: 'Test-Blind Policy: SAT and ACT scores are not used in admissions decisions. Focus all preparation on the 4 UC Personal Insight Questions (PIQs).'
    },
    transfer: {
      transferAcceptanceRate: 23.0,
      minCollegeCredits: 'Must have completed 60 transferable semester units (90 quarter units)',
      maxTransferableCredits: 'Maximum 70 semester units of lower-division coursework',
      satPolicyTransfer: 'Test-Blind',
      toeflPolicyTransfer: 'Required unless UC-transferable English Composition courses are completed',
      minCollegeGpa: '3.80+ for EECS and Haas Business',
      fallDeadline: 'November 30 (Filing window closes)',
      housingGuarantee: 'Housing guaranteed for transfer students in anchor buildings',
      transferPortal: 'UC Application for Transfer',
      transferTip: 'California Community College students receive immense priority via 7-course breadth pathways. International students should follow ASSIST.org guidelines.'
    },
    masters: {
      grePolicy: 'Program-Specific',
      greTargetScores: 'Quant 167+ for EECS and IEOR',
      toeflMinGrad: 90,
      toeflTaSpeakingCutoff: 26,
      minUndergradGpa: '3.6 / 4.0',
      applicationDeadlines: 'December 1 (EECS) | January 6 (MIMS / Information)',
      assistantshipsFunding: 'PhD students receive full tuition and stipend; professional MEng students are self-funded.',
      stemOptDuration: '36 months',
      popularMastersPrograms: ['Master of Engineering (MEng in EECS)', 'MS in Computer Science', 'Master of Information Management and Systems (MIMS)', 'Master of Financial Engineering (MFE)'],
      mastersTip: 'The Haas MFE program is ranked #1 worldwide for quantitative algorithmic trading. High Python/C++ proficiency expected.'
    }
  },
  {
    id: 'utoronto',
    name: 'University of Toronto',
    shortName: 'U of T',
    country: 'Canada',
    flag: '🇨🇦',
    city: 'Toronto, ON',
    worldRanking: 21,
    acceptanceRate: 43.0,
    tuitionUSD: 44000,
    tuitionDisplay: 'CA$58,000 - CA$64,000 / year',
    livingCostUSD: 16000,
    programs: ['Computer Science', 'Engineering', 'Business & Finance', 'Biomedical & Life Sciences', 'Data Science & AI'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'US/Canada (Holistic & Flexible Majors)',
    testing_policies: {
      sat_policy: 'Not Required', // Test-optional for US curriculum; not required for other boards
      min_toefl_ielts_score: 'TOEFL 100+ (Writing 22+) or IELTS 6.5+ (6.0 in each band) or Duolingo 120+',
      english_waiver_conditions: 'Waived if applicant completed 4 years of full-time study in an English-language school system in an English-majority nation.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'B.A.Sc. in Computer Engineering / TrackOne', direct_entry: true, stem_designated: true },
      { degree_name: 'B.Sc. in Computer Science', direct_entry: true, stem_designated: true },
      { degree_name: 'Rotman Commerce (B.Com.)', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: 'Lester B. Pearson International Scholarship (Full 4-year tuition, books, incidental fees, and full residence support)',
      need_blind_for_intl: false,
      css_profile_required: false,
      coa_tuition_usd: 44000,
      coa_health_insurance_usd: 900, // UHIP mandatory
      coa_living_expenses_usd: 16000,
      coa_total_annual_usd: 60900,
      intl_aid_classification: 'Need-Aware with Institutional Aid'
    },
    satRequirement: 'Not Required',
    satMiddle50: '1380 - 1520 (If submitting)',
    sat25th: 1380,
    sat75th: 1520,
    toeflMin: 100,
    applicationPortal: 'OUAC 105 (Ontario Universities’ Application Centre)',
    regularDeadline: '2026-01-15',
    earlyDeadline: '2025-11-07 (Early Recommended)',
    scholarshipOpportunities: 'Lester B. Pearson International Scholarship covers 100% of 4-year tuition, housing, and books for nominated global leaders.',
    description: 'Canada’s flagship global research powerhouse, renowned for birthplace of insulin, deep learning pioneers (Geoffrey Hinton), and Rotman Commerce.',
    website: 'https://utoronto.ca',
    featuredTag: 'Canada Flagship / Pearson Full-Ride',
    firstYear: {
      satPolicy: 'Not Required',
      satMiddle50: '1380 - 1520 (Optional for US applicants; not required for CBSE/IB/A-Levels)',
      sat25th: 1380,
      sat75th: 1520,
      toeflMin: 100,
      toeflRecommended: 105,
      toeflSubscores: 'Minimum 22 on Writing module',
      averageGpa: 'High 80s to low 90s percentage (Engineering/CS requires 94%+)',
      regularDeadline: 'January 15',
      earlyDeadline: 'November 7 (Early Consideration Deadline)',
      applicationPortal: 'OUAC (Ontario Universities’ Application Centre)',
      aidPolicy: 'Extremely competitive international scholarships; Pearson covers all expenses.',
      keyAdmissionsTips: 'Secondary Mathematics and Calculus are strictly compulsory for Engineering, CS, and Rotman Commerce. Missing Calculus means automatic rejection.'
    },
    transfer: {
      transferAcceptanceRate: 30.0,
      minCollegeCredits: 'Must have completed minimum 4 full-credit university courses (1 year)',
      maxTransferableCredits: 'Maximum 10 full credits (2 years equivalent)',
      satPolicyTransfer: 'Not required',
      toeflPolicyTransfer: 'Required unless university degree was taught in English',
      minCollegeGpa: '3.30+ overall; 3.70+ for computer science',
      fallDeadline: 'January 15',
      housingGuarantee: 'Housing not guaranteed for transfer students',
      transferPortal: 'OUAC 105',
      transferTip: 'Submit detailed syllabus course descriptions for credit evaluation upon application.'
    },
    masters: {
      grePolicy: 'Optional',
      greTargetScores: 'Quant 164+ for CS and ECE',
      toeflMinGrad: 93,
      toeflTaSpeakingCutoff: 25,
      minUndergradGpa: 'Mid-B to A- in senior year undergraduate courses',
      applicationDeadlines: 'December 1 (MSc CS) | January 15 (Applied Computing)',
      assistantshipsFunding: 'All MSc and PhD thesis students receive guaranteed minimum funding package covering tuition + living allowance.',
      stemOptDuration: 'Canada 3-Year Post-Graduation Work Permit (PGWP)',
      popularMastersPrograms: ['Master of Science in Applied Computing (MScAC)', 'MSc in Computer Science', 'Master of Financial Risk Management (MFRM)', 'MEng in Mechanical & Industrial Engineering'],
      mastersTip: 'The Master of Science in Applied Computing (MScAC) includes an 8-month paid industrial internship in downtown Toronto fintech/AI sectors.'
    }
  },
  {
    id: 'nus',
    name: 'National University of Singapore',
    shortName: 'NUS',
    country: 'Singapore',
    flag: '🇸🇬',
    city: 'Singapore',
    worldRanking: 8,
    acceptanceRate: 5.5,
    tuitionUSD: 24500,
    tuitionDisplay: 'S$33,000 / yr (Subsidized with MOE Tuition Grant) | S$44,000 (Non-subsidized)',
    livingCostUSD: 14000,
    programs: ['Computer Science', 'Data Science & AI', 'Engineering', 'Business & Finance', 'Biomedical & Life Sciences'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'UK/Europe/Commonwealth (Direct Course Entry)',
    testing_policies: {
      sat_policy: 'Required', // SAT 1450+ or ACT 32+ required for international applicants with non-Singapore qualifications!
      min_toefl_ielts_score: 'TOEFL 93+ (Writing 22+) or IELTS 6.5+ (Reading 6.5, Writing 6.5)',
      english_waiver_conditions: 'Strict. Waived only if candidate is native English speaker or completed high school in Singapore/UK/US.',
      accepts_self_reported_scores: false // Official score report required
    },
    programs_majors: [
      { degree_name: 'B.Comp. in Computer Science', direct_entry: true, stem_designated: true },
      { degree_name: 'B.Eng. in Computer Engineering', direct_entry: true, stem_designated: true },
      { degree_name: 'B.B.A. (Honours)', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: 'MOE Tuition Grant (Subsidizes ~40% of tuition in exchange for a 3-year service bond working in Singapore)',
      need_blind_for_intl: false,
      css_profile_required: false,
      coa_tuition_usd: 24500,
      coa_health_insurance_usd: 800,
      coa_living_expenses_usd: 14000,
      coa_total_annual_usd: 39300,
      intl_aid_classification: 'Need-Aware with Institutional Aid'
    },
    satRequirement: 'Required',
    satMiddle50: '1450 - 1560',
    sat25th: 1450,
    sat75th: 1560,
    toeflMin: 93,
    applicationPortal: 'NUS Online Application',
    regularDeadline: '2026-02-28',
    scholarshipOpportunities: 'Singapore MOE Tuition Grant subsidizes ~40% of fees in exchange for working in a Singapore-registered entity for 3 years post-graduation. ASEAN & Science & Technology Merit Scholarships.',
    description: 'Premier Asian academic institution ranked #8 globally, famous for School of Computing, Yong Loo Lin School of Medicine, and the Block71 entrepreneurial ecosystem.',
    website: 'https://nus.edu.sg',
    featuredTag: '#1 in Asia / MOE Grant',
    firstYear: {
      satPolicy: 'Required',
      satMiddle50: '1450 - 1560 (SAT Math 750+ practically mandatory for Computing & Engineering)',
      sat25th: 1450,
      sat75th: 1560,
      toeflMin: 93,
      toeflRecommended: 100,
      toeflSubscores: 'Minimum 22 on Reading and Writing',
      averageGpa: 'Top 2% of national cohort (CBSE/ISC: 95%+; IB: 41+; A-Levels: 3-4 A*s)',
      regularDeadline: 'February 28',
      applicationPortal: 'NUS Undergraduate Portal',
      aidPolicy: 'MOE Tuition Grant available to international students in return for 3-year Singapore service bond.',
      keyAdmissionsTips: 'For international qualifications, NUS mandates SAT/ACT plus AP or subject test scores to verify quantitative capability.'
    },
    transfer: {
      transferAcceptanceRate: 3.5,
      minCollegeCredits: 'Must have completed at least 1 full year of degree study',
      maxTransferableCredits: 'Maximum 50% of graduation degree requirements',
      satPolicyTransfer: 'Required for all international transfer candidates',
      toeflPolicyTransfer: 'Required (93+)',
      minCollegeGpa: '3.80+ or CAP 4.5/5.0',
      fallDeadline: 'February 28',
      housingGuarantee: 'On-campus residential colleges allocated via merit lottery',
      transferPortal: 'NUS Admissions Portal',
      transferTip: 'Direct discipline transfers only (e.g. from engineering to engineering). Cannot transfer across unrelated faculties.'
    },
    masters: {
      grePolicy: 'Required',
      greTargetScores: 'Quant 165+, Verbal 155+, AWA 3.5+ for School of Computing',
      toeflMinGrad: 90,
      toeflTaSpeakingCutoff: 26,
      minUndergradGpa: 'Second Class Upper / 3.5 out of 4.0 / CAP 4.0 out of 5.0',
      applicationDeadlines: 'January 15 (PhD / Research) | March 15 (Coursework MS)',
      assistantshipsFunding: 'NUS Research Scholarship covers full tuition + S$2,200 to S$2,800 monthly living stipend.',
      stemOptDuration: 'Singapore Long-Term Visit Pass (LTVP) for job search',
      popularMastersPrograms: ['Master of Computing (Infocomm / AI Specialization)', 'MS in Data Science and Machine Learning', 'MS in Finance', 'Master of Science in Business Analytics (MSBA)'],
      mastersTip: 'NUS School of Computing is ranked among the top 6 computer science schools globally. Strong math foundation expected.'
    }
  },
  {
    id: 'tumunich',
    name: 'Technical University of Munich (TUM)',
    shortName: 'TUM',
    country: 'Germany',
    flag: '🇩🇪',
    city: 'Munich',
    worldRanking: 28,
    acceptanceRate: 20.0,
    tuitionUSD: 6500,
    tuitionDisplay: '€4,000 - €6,000 / year (International tuition) | Zero domestic fees',
    livingCostUSD: 14500,
    programs: ['Engineering', 'Computer Science', 'Data Science & AI', 'Biomedical & Life Sciences', 'Business & Finance'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'UK/Europe/Commonwealth (Direct Course Entry)',
    testing_policies: {
      sat_policy: 'Not Required', // Uses German Abitur equivalence & aptitude assessment
      min_toefl_ielts_score: 'TOEFL 88+ or IELTS 6.5+ (English-taught programs)',
      english_waiver_conditions: 'Waived if previous degree was completely conducted in English.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'B.Sc. in Management & Technology (TUM-BWL)', direct_entry: true, stem_designated: true },
      { degree_name: 'B.Sc. in Information Engineering (Heilbronn)', direct_entry: true, stem_designated: true },
      { degree_name: 'M.Sc. in Robotics, Cognition, Intelligence', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: 'Deutschlandstipendium (€300 / month merit award) + DAAD scholarships',
      need_blind_for_intl: false,
      css_profile_required: false,
      coa_tuition_usd: 6500,
      coa_health_insurance_usd: 1500, // TK / AOK public student insurance
      coa_living_expenses_usd: 14500, // €11,208 Sperrkonto requirement
      coa_total_annual_usd: 22500,
      intl_aid_classification: 'Zero Institutional Aid for Non-US Citizens'
    },
    satRequirement: 'Not Required',
    satMiddle50: 'Evaluated via Uni-Assist & Aptitude Assessment (EV)',
    sat25th: 0,
    sat75th: 0,
    toeflMin: 88,
    applicationPortal: 'TUMonline + Uni-Assist VPD',
    regularDeadline: '2026-07-15',
    scholarshipOpportunities: 'Deutschlandstipendium (€300/month); low tuition compared to US/UK makes total cost very manageable.',
    description: 'Germany’s premier University of Excellence, European center of automotive engineering (BMW), aerospace, and industrial robotics.',
    website: 'https://tum.de',
    featuredTag: 'German Excellence / Uni-Assist VPD',
    firstYear: {
      satPolicy: 'Not Required',
      satMiddle50: 'Aptitude Assessment (Eignungsverfahren) based on high school Math and Science grades',
      sat25th: 0,
      sat75th: 0,
      toeflMin: 88,
      toeflRecommended: 95,
      toeflSubscores: 'Minimum 20 on all sections',
      averageGpa: 'German grade equivalent 1.5 or better (Uni-Assist VPD)',
      regularDeadline: 'July 15 (Winter Semester Intake)',
      applicationPortal: 'TUMonline (Requires prior Uni-Assist Preliminary Review Documentation / VPD)',
      aidPolicy: 'Moderate tuition (€2,000–€3,000/semester for non-EU students introduced in 2024); Deutschlandstipendium covers €3,600/yr.',
      keyAdmissionsTips: 'MANDATORY UNI-ASSIST VPD: You must submit your high school transcripts to Uni-Assist at least 6 weeks before July 15 to receive the VPD required to finalize your TUM application.'
    },
    transfer: {
      transferAcceptanceRate: 18.0,
      minCollegeCredits: 'Must have earned recognized ECTS credits from an accredited university',
      maxTransferableCredits: 'Evaluated module by module by the TUM Examination Board',
      satPolicyTransfer: 'Not required',
      toeflPolicyTransfer: 'Required (88+)',
      minCollegeGpa: 'Equivalent to German 2.0 or better',
      fallDeadline: 'July 15',
      springDeadline: 'January 15 (Summer Semester Intake)',
      housingGuarantee: 'Housing NOT guaranteed (Munich housing market is tight; apply early via Munich Student Union)',
      transferPortal: 'TUMonline',
      transferTip: 'Provide detailed course syllabus and module catalogues in German or English for credit recognition.'
    },
    masters: {
      grePolicy: 'Program-Specific',
      greTargetScores: 'Quant 164+ required for MS Informatics applicants from outside the EU',
      toeflMinGrad: 88,
      toeflTaSpeakingCutoff: 20,
      minUndergradGpa: 'German grade 2.0 or better in relevant BSc degree',
      applicationDeadlines: 'May 31 (Winter Semester) | November 30 (Summer Semester)',
      assistantshipsFunding: 'Students can work up to 20 hrs/week as HiWi (student research assistant) earning €14–€17/hour.',
      stemOptDuration: 'Germany 18-Month Post-Study Job Seeker Visa with pathway to EU Blue Card',
      popularMastersPrograms: ['M.Sc. in Informatics (Computer Science)', 'M.Sc. in Robotics, Cognition, Intelligence', 'M.Sc. in Data Engineering and Analytics', 'M.Sc. in Aerospace Engineering'],
      mastersTip: 'All MS applicants from non-EU countries must complete the GRE General Test with official ETS score delivery.'
    }
  },
  {
    id: 'ethzurich',
    name: 'ETH Zurich (Swiss Federal Institute of Technology)',
    shortName: 'ETH Zurich',
    country: 'Switzerland',
    flag: '🇨🇭',
    city: 'Zurich',
    worldRanking: 7,
    acceptanceRate: 8.0,
    tuitionUSD: 1600,
    tuitionDisplay: 'CHF 1,460 / year (~$1,600 USD! Unbeatable world-class value)',
    livingCostUSD: 24000,
    programs: ['Engineering', 'Computer Science', 'Data Science & AI', 'Biomedical & Life Sciences', 'Economics & Social Sciences'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'UK/Europe/Commonwealth (Direct Course Entry)',
    testing_policies: {
      sat_policy: 'Not Required',
      min_toefl_ielts_score: 'TOEFL 100+ or IELTS 7.0+ (for English graduate programs; Bachelor is German C1)',
      english_waiver_conditions: 'N/A for undergraduate; graduate programs require English proof.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'B.Sc. in Computer Science (German C1 required)', direct_entry: true, stem_designated: true },
      { degree_name: 'M.Sc. in Computer Science (100% English taught)', direct_entry: true, stem_designated: true },
      { degree_name: 'M.Sc. in Quantum Engineering', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: 'Excellence Scholarship & Opportunity Programme (ESOP: Full tuition waiver + CHF 12,000/semester living stipend)',
      need_blind_for_intl: false,
      css_profile_required: false,
      coa_tuition_usd: 1600,
      coa_health_insurance_usd: 1400,
      coa_living_expenses_usd: 24000, // High living cost in Zurich
      coa_total_annual_usd: 27000,
      intl_aid_classification: 'Need-Aware with Institutional Aid'
    },
    satRequirement: 'Not Required',
    satMiddle50: 'Undergraduate requires German C1; Masters is 100% English',
    sat25th: 0,
    sat75th: 0,
    toeflMin: 100,
    applicationPortal: 'eApply (ETH Zurich Online)',
    regularDeadline: '2026-04-30',
    earlyDeadline: '2025-12-15 (Graduate ESOP scholarship)',
    scholarshipOpportunities: 'ESOP (Excellence Scholarship & Opportunity Programme) covers full tuition and CHF 24,000/year living stipend for top-tier graduate students.',
    description: 'Albert Einstein’s alma mater; ranked #7 globally; world leader in quantum computing, cyber-security, and robotics with near-zero tuition.',
    website: 'https://ethz.ch',
    featuredTag: 'Einstein Alma Mater / $1,600 Tuition',
    firstYear: {
      satPolicy: 'Not Required',
      satMiddle50: 'Reduced or Comprehensive ETH Entrance Examination required for non-Swiss diplomas',
      sat25th: 0,
      sat75th: 0,
      toeflMin: 100,
      toeflRecommended: 105,
      toeflSubscores: 'Undergraduate programs are taught in GERMAN (C1 Goethe/TestDaF certificate mandatory)',
      averageGpa: 'Top 1% in Mathematics and Physics',
      regularDeadline: 'April 30',
      applicationPortal: 'ETH Zurich eApply portal',
      aidPolicy: 'Tuition is extremely low (CHF 730/semester); living costs in Zurich are ~CHF 2,000/month.',
      keyAdmissionsTips: 'UNDERGRADUATE LANGUAGE REQUIREMENT: All Bachelor degree lectures at ETH Zurich are conducted in GERMAN in Year 1. English-only applicants should target the Graduate Master programs!'
    },
    transfer: {
      transferAcceptanceRate: 4.0,
      minCollegeCredits: 'Credit transfers rare; evaluated on individual basis',
      maxTransferableCredits: 'Maximum 60 ECTS',
      satPolicyTransfer: 'Not required',
      toeflPolicyTransfer: 'Required',
      minCollegeGpa: 'Top 5% of class',
      fallDeadline: 'April 30',
      housingGuarantee: 'Housing not guaranteed (WOKO student housing available)',
      transferPortal: 'ETH eApply',
      transferTip: 'Must pass the First-Year Qualifying Exam (Basisprüfung) or demonstrate 100% identical syllabus coverage.'
    },
    masters: {
      grePolicy: 'Required',
      greTargetScores: 'Quant 167+ (90th+ percentile practically standard for CS and Mechanical Engineering)',
      toeflMinGrad: 100,
      toeflTaSpeakingCutoff: 24,
      minUndergradGpa: 'First-class honours or 3.85 / 4.0',
      applicationDeadlines: 'December 15 (Strict annual deadline for all international applicants)',
      assistantshipsFunding: 'ESOP provides full study & living stipend (CHF 24,000/yr); student research assistantships paid at CHF 28/hr.',
      stemOptDuration: 'Switzerland 6-month job seeker permit after graduation',
      popularMastersPrograms: ['M.Sc. in Computer Science', 'M.Sc. in Data Science', 'M.Sc. in Quantum Engineering', 'M.Sc. in Robotics, Systems and Control'],
      mastersTip: 'All Masters degree programs are conducted 100% in English. Direct GRE score reporting via ETS Code 3537 is mandatory.'
    }
  },
  {
    id: 'melbourne',
    name: 'University of Melbourne',
    shortName: 'UniMelb',
    country: 'Australia',
    flag: '🇦🇺',
    city: 'Melbourne',
    worldRanking: 13,
    acceptanceRate: 70.0, // Criteria-based admissions
    tuitionUSD: 33000,
    tuitionDisplay: 'A$45,000 - A$52,000 / year',
    livingCostUSD: 17000,
    programs: ['Biomedical & Life Sciences', 'Economics & Social Sciences', 'Engineering', 'Arts & Humanities', 'Computer Science'],
    effective_admission_cycle: '2026-2027',
    admission_model: 'UK/Europe/Commonwealth (Direct Course Entry)',
    testing_policies: {
      sat_policy: 'Required', // SAT 1320-1420 used for US curriculum candidates
      min_toefl_ielts_score: 'TOEFL 79+ (Writing 21, Speaking 18) or IELTS 6.5+ (no band < 6.0)',
      english_waiver_conditions: 'Waived if secondary education was completed in English in Australia/UK/US/Canada/NZ.',
      accepts_self_reported_scores: true
    },
    programs_majors: [
      { degree_name: 'Bachelor of Science (Computing & Software Systems)', direct_entry: true, stem_designated: true },
      { degree_name: 'Bachelor of Commerce', direct_entry: true, stem_designated: true },
      { degree_name: 'Bachelor of Biomedicine', direct_entry: true, stem_designated: true }
    ],
    financial_profiles: {
      avg_intl_financial_aid: 'Melbourne International Undergraduate Scholarship (Up to 100% fee remission)',
      need_blind_for_intl: false,
      css_profile_required: false,
      coa_tuition_usd: 33000,
      coa_health_insurance_usd: 700, // OSHC mandatory
      coa_living_expenses_usd: 17000,
      coa_total_annual_usd: 50700,
      intl_aid_classification: 'Need-Aware with Institutional Aid'
    },
    satRequirement: 'Required',
    satMiddle50: '1320 - 1440 (For US diploma applicants)',
    sat25th: 1320,
    sat75th: 1440,
    toeflMin: 79,
    applicationPortal: 'UniMelb Online Application / VTAC',
    regularDeadline: '2025-11-30',
    scholarshipOpportunities: 'Melbourne International Undergraduate Scholarship awards 50% to 100% fee remission to high-achieving international applicants.',
    description: 'Australia’s #1 ranked institution, pioneering the "Melbourne Model" (broad undergraduate degrees followed by specialized graduate professional master’s).',
    website: 'https://unimelb.edu.au',
    featuredTag: '#1 in Australia / Melbourne Model',
    firstYear: {
      satPolicy: 'Required',
      satMiddle50: '1320 - 1440 (Required for US high school graduates)',
      sat25th: 1320,
      sat75th: 1440,
      toeflMin: 79,
      toeflRecommended: 88,
      toeflSubscores: 'Writing 21, Speaking 18, Reading 13, Listening 13',
      averageGpa: 'ATAR 85.0 - 95.0 equivalent (CBSE: 88%+; IB: 34+ points)',
      regularDeadline: 'November 30 (Semester 1 / February intake) | May 31 (Semester 2 / July intake)',
      applicationPortal: 'Direct UniMelb Portal / VTAC',
      aidPolicy: 'Criteria-based merit scholarships awarded automatically upon admission evaluation.',
      keyAdmissionsTips: 'Australia runs on a February-to-November academic year. You can apply for either Semester 1 (February) or Semester 2 (July) start!'
    },
    transfer: {
      transferAcceptanceRate: 40.0,
      minCollegeCredits: 'Minimum 1 semester of completed university coursework',
      maxTransferableCredits: 'Up to 50% of the degree (1.5 years equivalent)',
      satPolicyTransfer: 'Not required if transferring with 1+ year university study',
      toeflPolicyTransfer: 'Required (79+)',
      minCollegeGpa: '70% / B+ average',
      fallDeadline: 'November 30 (Feb start) | May 31 (July start)',
      housingGuarantee: 'Residential college accommodation available',
      transferPortal: 'UniMelb Online',
      transferTip: 'Apply with official university syllabus course outlines for Advanced Standing credit transfer.'
    },
    masters: {
      grePolicy: 'Optional',
      greTargetScores: 'Quant 162+ recommended for Master of Computer Science',
      toeflMinGrad: 79,
      toeflTaSpeakingCutoff: 22,
      minUndergradGpa: '65%–75% Australian equivalent WAM in related discipline',
      applicationDeadlines: 'November 30 (Semester 1) | April 30 (Semester 2)',
      assistantshipsFunding: 'Graduate Research Scholarships cover 100% of tuition + A$37,000/year living allowance.',
      stemOptDuration: 'Australia 2 to 4-Year Temporary Graduate Visa (Subclass 485)',
      popularMastersPrograms: ['Master of Computer Science', 'Master of Information Technology', 'Master of Management (Finance)', 'Master of Engineering (Software)'],
      mastersTip: 'Graduates in Australia enjoy clear pathways to post-study work rights and regional migration sponsorship.'
    }
  }
];
