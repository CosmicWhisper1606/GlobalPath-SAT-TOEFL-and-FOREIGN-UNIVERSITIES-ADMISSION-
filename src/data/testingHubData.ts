export interface ExamCostBreakdown {
  examName: string;
  shortCode: 'SAT' | 'ACT' | 'TOEFL' | 'IELTS' | 'DET';
  baseRegistrationUSD: number;
  internationalSurchargeUSD: number;
  totalRegistrationUSD: number;
  scoreReportPerSchoolUSD: number;
  freeScoreReportsIncluded: number;
  freeReportDeadline: string;
  lateRegistrationFeeUSD: number;
  cancellationRefundUSD: string;
  reschedulingFeeUSD: number;
  currencyBufferNote: string;
  hiddenCosts: string[];
}

export const EXAM_COSTS_DATA: ExamCostBreakdown[] = [
  {
    examName: 'Digital SAT (College Board)',
    shortCode: 'SAT',
    baseRegistrationUSD: 68,
    internationalSurchargeUSD: 43,
    totalRegistrationUSD: 111,
    scoreReportPerSchoolUSD: 15,
    freeScoreReportsIncluded: 4,
    freeReportDeadline: 'Up to 9 days after test date (before seeing scores)',
    lateRegistrationFeeUSD: 34,
    cancellationRefundUSD: 'Cancel before regular deadline: $68 refund ($25 fee retained). Cancel before late deadline: $39 fee retained.',
    reschedulingFeeUSD: 29,
    currencyBufferNote: 'Most international cards incur 2.5%–3.5% foreign transaction fee (FX markup) from domestic issuing banks.',
    hiddenCosts: [
      '$43 non-US regional fee charged automatically at online checkout.',
      '$15 per official score report per university if ordered after the 9-day post-exam window.',
      'Rush score delivery fee: $31 extra per order.',
      'Device borrowing: Free from College Board, but device request must be submitted 30 days prior and travel to pickup center is at student expense.'
    ]
  },
  {
    examName: 'ACT (Computer-Based Outside US)',
    shortCode: 'ACT',
    baseRegistrationUSD: 69,
    internationalSurchargeUSD: 112.50,
    totalRegistrationUSD: 181.50,
    scoreReportPerSchoolUSD: 19,
    freeScoreReportsIncluded: 4,
    freeReportDeadline: 'Before the exam day (must select colleges blindly)',
    lateRegistrationFeeUSD: 38,
    cancellationRefundUSD: 'Registration fees are strictly non-refundable. Test date changes incur a $44 change fee.',
    reschedulingFeeUSD: 44,
    currencyBufferNote: 'Charged in USD; requires international Visa/Mastercard enabled for 3D Secure foreign OTP authentication.',
    hiddenCosts: [
      '$112.50 international surcharge makes ACT substantially more expensive for international students than the SAT.',
      '$19 score send fee per test date per university ($19 x 10 universities = $190 in score reporting).',
      'Test Information Release (TIR) not available for international computer-based administrations.'
    ]
  },
  {
    examName: 'TOEFL iBT (ETS)',
    shortCode: 'TOEFL',
    baseRegistrationUSD: 205, // e.g. India $205 / ₹16,900; US/Europe $245; UAE $270; China $290
    internationalSurchargeUSD: 0, // Built into localized country price
    totalRegistrationUSD: 235, // Global average
    scoreReportPerSchoolUSD: 25,
    freeScoreReportsIncluded: 4,
    freeReportDeadline: 'By 10:00 PM on the day before the test date',
    lateRegistrationFeeUSD: 40,
    cancellationRefundUSD: 'Cancel at least 4 full days in advance: 50% refund. Cancel later: 0% refund.',
    reschedulingFeeUSD: 60,
    currencyBufferNote: 'Local currency pricing in India and select countries, but still subject to local GST/VAT (18% tax in India = ₹3,042 extra).',
    hiddenCosts: [
      '$25 per additional official score report sent to universities.',
      '$40 late registration fee if booking within 7 days of exam date.',
      'Rescheduling requires minimum 4 days advance notice plus $60 fee.'
    ]
  },
  {
    examName: 'IELTS Academic (British Council / IDP)',
    shortCode: 'IELTS',
    baseRegistrationUSD: 225,
    internationalSurchargeUSD: 0,
    totalRegistrationUSD: 245,
    scoreReportPerSchoolUSD: 15,
    freeScoreReportsIncluded: 5,
    freeReportDeadline: 'At time of initial test booking only',
    lateRegistrationFeeUSD: 0,
    cancellationRefundUSD: 'Cancel >5 weeks before test: 75% refund. Cancel <5 weeks: 0% refund unless certified medical emergency.',
    reschedulingFeeUSD: 45,
    currencyBufferNote: 'Payable in local currency at authorized test center or via local debit/credit card.',
    hiddenCosts: [
      'Additional Test Report Forms (e-TRF or hardcopy): $15–$35 per institution including courier charges.',
      'Enquiry on Results (re-marking fee): $120–$140 (refunded only if band score increases).'
    ]
  },
  {
    examName: 'Duolingo English Test (DET)',
    shortCode: 'DET',
    baseRegistrationUSD: 65,
    internationalSurchargeUSD: 0,
    totalRegistrationUSD: 65,
    scoreReportPerSchoolUSD: 0,
    freeScoreReportsIncluded: 999, // Unlimited free score reports!
    freeReportDeadline: 'Anytime (Score reports are 100% free forever)',
    lateRegistrationFeeUSD: 0,
    cancellationRefundUSD: 'Tests can be taken anytime within 21 days of purchase; non-refundable once proctoring begins.',
    reschedulingFeeUSD: 0,
    currencyBufferNote: 'Charged in USD or select local currencies. Can buy 2-test bundle for $110 ($55/test).',
    hiddenCosts: [
      '$0 score-send fee (UNLIMITED free score reports to 4,500+ institutions).',
      'Faster 12-hour score upgrade available for optional $40 fee.',
      'High rate of test invalidation if eyes leave screen or lighting fluctuates; requires re-test within coupon window.'
    ]
  }
];

export interface TestCenterRadarItem {
  id: string;
  name: string;
  city: string;
  country: string;
  examsOffered: ('SAT' | 'ACT' | 'TOEFL' | 'IELTS')[];
  reliabilityRating: 'A+ (High)' | 'A (Verified)' | 'B (Caution)' | 'C (High Cancellation Risk)';
  deviceRequirements: string;
  cancellationNotes: string;
  facilityFeeNote?: string;
  address: string;
}

export const TEST_CENTERS_RADAR: TestCenterRadarItem[] = [
  {
    id: 'tc-bom-01',
    name: 'Bombay Teachers’ Training College / USIEF Partner',
    city: 'Mumbai',
    country: 'India',
    examsOffered: ['SAT', 'TOEFL'],
    reliabilityRating: 'A+ (High)',
    deviceRequirements: 'Bring personal laptop/iPad with Bluebook pre-installed; battery must hold 3+ hrs charge; limited power sockets.',
    cancellationNotes: 'Zero cancellations in past 24 months. Dedicated diesel backup generators on site for power stability.',
    facilityFeeNote: 'None. Authorized official testing facility.',
    address: 'Colaba, Mumbai, Maharashtra'
  },
  {
    id: 'tc-del-02',
    name: 'Delhi Public School R.K. Puram',
    city: 'New Delhi',
    country: 'India',
    examsOffered: ['SAT'],
    reliabilityRating: 'A+ (High)',
    deviceRequirements: 'Bluebook app required; student must bring charging adapter (standard 3-pin Indian socket).',
    cancellationNotes: 'Highly reliable; 250+ capacity per test session. Early arrival at 7:15 AM recommended.',
    facilityFeeNote: 'None.',
    address: 'Sector XII, R.K. Puram, New Delhi'
  },
  {
    id: 'tc-dxb-03',
    name: 'GEMS Dubai American Academy',
    city: 'Dubai',
    country: 'United Arab Emirates',
    examsOffered: ['SAT', 'ACT'],
    reliabilityRating: 'A+ (High)',
    deviceRequirements: 'Strict Bluebook test lock requirements. MacBooks, Windows laptops, iPads permitted.',
    cancellationNotes: 'State-of-the-art gigabit optical wifi network. Zero technical disruptions recorded.',
    facilityFeeNote: 'None.',
    address: 'Al Barsha, Dubai'
  },
  {
    id: 'tc-sin-04',
    name: 'Singapore Management University (SMU) Test Suite',
    city: 'Singapore',
    country: 'Singapore',
    examsOffered: ['SAT', 'TOEFL', 'IELTS'],
    reliabilityRating: 'A+ (High)',
    deviceRequirements: 'Bluebook app for SAT; enterprise desktop terminals provided for TOEFL/IELTS.',
    cancellationNotes: 'Gold-standard testing infrastructure. Strict adherence to ETS/College Board ID verification.',
    facilityFeeNote: 'None.',
    address: 'Bras Basah Road, Singapore'
  },
  {
    id: 'tc-sel-05',
    name: 'Seoul Foreign School',
    city: 'Seoul',
    country: 'South Korea',
    examsOffered: ['SAT'],
    reliabilityRating: 'A+ (High)',
    deviceRequirements: 'Bring fully charged laptop/tablet. Bluebook exam ticket must be downloaded 1 day in advance.',
    cancellationNotes: 'Extremely popular center; seats fill within 48 hours of registration opening.',
    facilityFeeNote: 'None.',
    address: 'Yeonhui-dong, Seodaemun-gu, Seoul'
  },
  {
    id: 'tc-nbo-06',
    name: 'Brookhouse School Runda',
    city: 'Nairobi',
    country: 'Kenya',
    examsOffered: ['SAT', 'IELTS'],
    reliabilityRating: 'A (Verified)',
    deviceRequirements: 'Bluebook on laptop/tablet. Secondary power backup on-premise.',
    cancellationNotes: 'Occasional traffic congestion on Limuru Road; candidates must depart early.',
    facilityFeeNote: 'None.',
    address: 'Runda, Nairobi'
  },
  {
    id: 'tc-sao-07',
    name: 'Graded - The American School of São Paulo',
    city: 'São Paulo',
    country: 'Brazil',
    examsOffered: ['SAT', 'TOEFL'],
    reliabilityRating: 'A (Verified)',
    deviceRequirements: 'Bring laptop or iPad with Bluebook 2025.2+. Power outlets available in library hall.',
    cancellationNotes: 'Consistent administration across all Saturday testing windows.',
    facilityFeeNote: 'None.',
    address: 'Av. José Galante, São Paulo'
  },
  {
    id: 'tc-cai-08',
    name: 'Cairo American College (CAC)',
    city: 'Cairo',
    country: 'Egypt',
    examsOffered: ['SAT', 'ACT'],
    reliabilityRating: 'B (Caution)',
    deviceRequirements: 'Bluebook testing on personal devices. Ensure hotspot capability as backup.',
    cancellationNotes: 'Occasional security delays at front gate. Allow 45 minutes for security clearance.',
    facilityFeeNote: 'Extra $10 facility security fee charged by local third-party contractor on-site.',
    address: 'Maadi, Cairo'
  },
  {
    id: 'tc-lag-09',
    name: 'Lagos International School / Ikeja Partner Center',
    city: 'Lagos',
    country: 'Nigeria',
    examsOffered: ['SAT', 'TOEFL'],
    reliabilityRating: 'B (Caution)',
    deviceRequirements: 'Fully charged battery is MANDATORY. Bring power bank with AC inverter if possible.',
    cancellationNotes: 'Frequent municipal grid outages. Center relies on dual generators; short delays have occurred.',
    facilityFeeNote: '₦5,000 cash administrative/generator fuel levy requested at entry at some sittings.',
    address: 'Ikeja GRA, Lagos'
  }
];

export interface SelfReportedScorePolicy {
  universityName: string;
  acceptsSelfReportedSat: boolean;
  acceptsSelfReportedToefl: boolean;
  policyDetails: string;
  officialReportWhenRequired: string;
  estimatedScoreReportingCostUSD: number; // $0 if self-reported, $15-$25 if paid
}

export const SELF_REPORTED_SCORE_POLICIES: SelfReportedScorePolicy[] = [
  {
    universityName: 'Harvard University',
    acceptsSelfReportedSat: true,
    acceptsSelfReportedToefl: true,
    policyDetails: 'Applicants may self-report all SAT, ACT, and English test scores on the Common App or applicant portal for $0.',
    officialReportWhenRequired: 'Official score report required ONLY upon matriculation in July prior to enrollment.',
    estimatedScoreReportingCostUSD: 0
  },
  {
    universityName: 'Stanford University',
    acceptsSelfReportedSat: true,
    acceptsSelfReportedToefl: true,
    policyDetails: 'Self-reported scores from the Common Application testing section are fully accepted for evaluation.',
    officialReportWhenRequired: 'Official score verification required only if admitted and student chooses to enroll.',
    estimatedScoreReportingCostUSD: 0
  },
  {
    universityName: 'Columbia University',
    acceptsSelfReportedSat: true,
    acceptsSelfReportedToefl: true,
    policyDetails: 'Allows 100% free self-reported test scores on Common App or Coalition application.',
    officialReportWhenRequired: 'Only admitted students who commit to matriculating submit official College Board/ETS reports.',
    estimatedScoreReportingCostUSD: 0
  },
  {
    universityName: 'Yale University',
    acceptsSelfReportedSat: true,
    acceptsSelfReportedToefl: true,
    policyDetails: 'Accepts self-reported scores for admissions review via application form or update form.',
    officialReportWhenRequired: 'Official scores required upon matriculation.',
    estimatedScoreReportingCostUSD: 0
  },
  {
    universityName: 'Massachusetts Institute of Technology (MIT)',
    acceptsSelfReportedSat: true,
    acceptsSelfReportedToefl: false,
    policyDetails: 'MIT accepts self-reported SAT scores on the MIT application, BUT requires official TOEFL/IELTS directly from testing agency.',
    officialReportWhenRequired: 'Official English test score required at time of application ($25 ETS fee).',
    estimatedScoreReportingCostUSD: 25
  },
  {
    universityName: 'University of Texas at Austin',
    acceptsSelfReportedSat: false,
    acceptsSelfReportedToefl: false,
    policyDetails: 'UT Austin strictly REQUIRES official score reports sent directly from College Board (Code 6882) or ACT.',
    officialReportWhenRequired: 'Must arrive by December 1 deadline. Self-reported scores are NOT accepted for evaluation.',
    estimatedScoreReportingCostUSD: 40 // $15 SAT + $25 TOEFL
  },
  {
    universityName: 'Georgetown University',
    acceptsSelfReportedSat: false,
    acceptsSelfReportedToefl: false,
    policyDetails: 'Georgetown requires ALL official testing scores directly from the testing agency; expects full testing history.',
    officialReportWhenRequired: 'Official score report required at initial application deadline.',
    estimatedScoreReportingCostUSD: 40
  },
  {
    universityName: 'University of California (Berkeley, UCLA, UCSD)',
    acceptsSelfReportedSat: false, // Test-blind
    acceptsSelfReportedToefl: true,
    policyDetails: 'SAT/ACT are completely test-blind (not reviewed). TOEFL/IELTS can be self-reported on the UC application.',
    officialReportWhenRequired: 'Send 1 official TOEFL report to 1 UC campus; scores automatically share across all UC campuses applied to!',
    estimatedScoreReportingCostUSD: 25 // Single $25 report covers all 9 UC campuses
  }
];

export interface RegionalGradeConversion {
  systemName: string;
  country: string;
  nativeScale: string;
  equivalentGpaRange: string;
  credentialAssessmentAdvice: string;
  selfConversionWarning: string;
}

export const REGIONAL_GRADE_CONVERSIONS: RegionalGradeConversion[] = [
  {
    systemName: 'CBSE & CISCE (ICSE / ISC)',
    country: 'India',
    nativeScale: '0% – 100% Percentage (or 10-point CGPA)',
    equivalentGpaRange: '90%+ is competitive for Ivy/Top-20 (equivalent to 3.9–4.0 US GPA); 80%–89% ≈ 3.4–3.8 GPA.',
    credentialAssessmentAdvice: 'Admissions officers expect Class 9, 10, and 11 official transcripts, plus Class 12 Mid-Term & Predicted Board scores.',
    selfConversionWarning: 'CRITICAL: Never convert your 88% or 95% into a 4.0 GPA on the Common App. Report raw percentage marks. Admissions evaluators specialize in Indian curricula.'
  },
  {
    systemName: 'GCE Advanced Levels (A-Levels)',
    country: 'UK / Commonwealth',
    nativeScale: 'Letter grades: A*, A, B, C, D, E',
    equivalentGpaRange: 'A*A*A or A*AA is competitive for MIT/Harvard/Oxford; AAA/AAB competitive for Top-50.',
    credentialAssessmentAdvice: 'Submit certified GCSE / O-Level results plus official school Predicted Grades signed by Headmaster or Counselor.',
    selfConversionWarning: 'Do NOT convert A-Levels into GPA. American colleges frequently award 1 full year of college credit (8-10 credits per subject) for grades of A* or A.'
  },
  {
    systemName: 'International Baccalaureate (IB Diploma)',
    country: 'Global / International Schools',
    nativeScale: 'Total points out of 45 (6 subjects x 7 + 3 core points for EE/TOK)',
    equivalentGpaRange: '40–45 points competitive for Ivy/Stanford/Oxbridge; 36–39 competitive for Top-30.',
    credentialAssessmentAdvice: 'Colleges evaluate individual Higher Level (HL) subject scores (expecting 7, 7, 6) more heavily than Standard Level (SL).',
    selfConversionWarning: 'Report your official Predicted IB score and registered subjects. High scores on HL modules frequently earn sophomore standing in US universities.'
  },
  {
    systemName: 'French Baccalauréat (Bac)',
    country: 'France / Francophone Nations',
    nativeScale: '0 – 20 points (Grading is notoriously harsh; 16+ is "Mention Très Bien")',
    equivalentGpaRange: '16–20/20 is equivalent to 4.0 GPA; 14–15.9/20 ≈ 3.7–3.9 GPA; 12–13.9/20 ≈ 3.3–3.6 GPA.',
    credentialAssessmentAdvice: 'An American university recognizes that a 15/20 in French Bac is an exceptional achievement, whereas a 75% in a US high school would be a C average.',
    selfConversionWarning: 'Never divide your score by 5 to calculate a GPA (e.g. 15 / 5 = 3.0). That severely damages your profile. Report exact 20-point grades.'
  },
  {
    systemName: 'German Abitur',
    country: 'Germany',
    nativeScale: '1.0 – 6.0 scale (1.0 is best; 4.0 is passing)',
    equivalentGpaRange: '1.0–1.4 is equivalent to 3.9–4.0 GPA; 1.5–2.0 ≈ 3.5–3.8 GPA.',
    credentialAssessmentAdvice: 'Submit officially translated Gymnasiale Oberstufe semester reports from grades 11 and 12 with official school seal.',
    selfConversionWarning: 'German grades invert normal numerical order (1 is highest, 4 is passing). US portals will get confused if self-converted; submit certified English translation.'
  }
];

export interface LiveCurrencyRate {
  currencyCode: string;
  name: string;
  symbol: string;
  ratePerUSD: number; // e.g. 86.8 for INR
  bankForexBufferPercent: number; // standard 2.5% markup
}

export const LIVE_CURRENCY_RATES: LiveCurrencyRate[] = [
  { currencyCode: 'USD', name: 'US Dollar', symbol: '$', ratePerUSD: 1.0, bankForexBufferPercent: 0 },
  { currencyCode: 'INR', name: 'Indian Rupee', symbol: '₹', ratePerUSD: 87.2, bankForexBufferPercent: 2.5 },
  { currencyCode: 'GBP', name: 'British Pound', symbol: '£', ratePerUSD: 0.79, bankForexBufferPercent: 2.5 },
  { currencyCode: 'EUR', name: 'Euro', symbol: '€', ratePerUSD: 0.95, bankForexBufferPercent: 2.5 },
  { currencyCode: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', ratePerUSD: 1.42, bankForexBufferPercent: 2.5 },
  { currencyCode: 'AUD', name: 'Australian Dollar', symbol: 'A$', ratePerUSD: 1.57, bankForexBufferPercent: 2.5 },
  { currencyCode: 'SGD', name: 'Singapore Dollar', symbol: 'S$', ratePerUSD: 1.34, bankForexBufferPercent: 2.0 },
  { currencyCode: 'CNY', name: 'Chinese Yuan', symbol: '¥', ratePerUSD: 7.24, bankForexBufferPercent: 2.5 },
  { currencyCode: 'NGN', name: 'Nigerian Naira', symbol: '₦', ratePerUSD: 1540.0, bankForexBufferPercent: 3.5 },
  { currencyCode: 'BRL', name: 'Brazilian Real', symbol: 'R$', ratePerUSD: 5.78, bankForexBufferPercent: 3.0 },
];
