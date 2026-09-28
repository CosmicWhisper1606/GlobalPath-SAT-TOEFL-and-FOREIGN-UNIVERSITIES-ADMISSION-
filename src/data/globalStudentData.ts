export interface OriginCountryProfile {
  id: string;
  name: string;
  region: 'South Asia' | 'East & SE Asia' | 'Sub-Saharan Africa' | 'MENA' | 'Latin America' | 'Central Asia' | 'Europe & Americas';
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRateToUSD: number; // e.g. 1 USD = X Local Currency
  nationalCurriculum: {
    primaryBoard: string;
    gradingScale: string;
    conversionToUsGpa: string;
    conversionToUkClass: string;
    conversionToGermanNote: string;
    credentialEvaluationService: string;
  };
  englishWaiverPolicy: {
    moiAccepted: boolean;
    conditions: string;
    recommendedExams: string;
  };
  destinationEmbassyRules: {
    usa: {
      keyRequirements: string[];
      proofOfFundsTips: string;
      visaCategory: string;
    };
    uk: {
      keyRequirements: string[];
      tbTestMandatory: boolean;
      casRequirements: string;
    };
    germany: {
      apsCertificateMandatory: boolean;
      blockedAccountAmountEur: number;
      specialNotes: string;
    };
    canada: {
      palRequired: boolean;
      gicAmountCad: number;
      studyPermitNotes: string;
    };
    australia: {
      assessmentLevel: 'Level 1' | 'Level 2' | 'Level 3';
      genuineStudentCheck: string;
    };
  };
  exclusiveScholarships: {
    name: string;
    awardType: string;
    eligibility: string;
    deadline: string;
  }[];
  criticalAdvisories: string[];
}

export const GLOBAL_ORIGIN_PROFILES: OriginCountryProfile[] = [
  {
    id: 'india',
    name: 'India',
    region: 'South Asia',
    flag: '🇮🇳',
    currencyCode: 'INR',
    currencySymbol: '₹',
    exchangeRateToUSD: 87.5,
    nationalCurriculum: {
      primaryBoard: 'CBSE / CISCE (ISC) / State Examination Boards',
      gradingScale: '0 – 100% Percentage or 10-point CGPA',
      conversionToUsGpa: '85%+ ≈ 3.8–4.0 GPA | 75–84% ≈ 3.4–3.7 GPA | 60–74% ≈ 3.0–3.3 GPA',
      conversionToUkClass: '75%+ ≈ First Class Honours | 60–74% ≈ Upper Second (2:1)',
      conversionToGermanNote: 'Modified Bavarian Formula: 85% ≈ 1.3–1.7 | 70% ≈ 2.2–2.5 (1.0 is best)',
      credentialEvaluationService: 'WES (World Education Services) or SpanTran for US degrees; APS for Germany',
    },
    englishWaiverPolicy: {
      moiAccepted: true,
      conditions: 'UK universities (e.g. Manchester, Leeds, Warwick) frequently waive IELTS if Class 12 English score is ≥70–75%. In the US, top-50 universities rarely waive without US/IB schooling or 650+ SAT Reading.',
      recommendedExams: 'TOEFL iBT (100+) or IELTS Academic (7.0+) for top tier; Duolingo (125+) for wide US acceptance',
    },
    destinationEmbassyRules: {
      usa: {
        keyRequirements: [
          'Form I-20 issued by university upon submission of financial bank letter',
          'SEVIS I-901 fee payment ($350) + DS-160 visa form ($185)',
          'Two-part US Embassy appointment: OFC Biometrics (VAC) + Consular Interview',
          'Strong non-immigrant intent under INA 214(b) demonstrating parental ties or career in India'
        ],
        proofOfFundsTips: 'Approved Indian Banks (e.g. SBI, HDFC Credila, Avanse, ICICI) loan sanction letters are 100% accepted. Ensure liquid savings or fixed deposits cover at least Year 1 full cost on I-20.',
        visaCategory: 'F-1 Academic Student Visa',
      },
      uk: {
        keyRequirements: [
          'CAS (Confirmation of Acceptance for Studies) from sponsored university',
          'Mandatory IOM-approved Tuberculosis (TB) Medical Clearance Certificate',
          'Immigration Health Surcharge (IHS) £776/year + Visa fee £490',
          'Maintenance funds held in bank account for minimum 28 consecutive days'
        ],
        tbTestMandatory: true,
        casRequirements: 'University issues CAS ~3-6 months prior to course start.',
      },
      germany: {
        apsCertificateMandatory: true,
        blockedAccountAmountEur: 11904,
        specialNotes: 'APS (Akademische Prüfstelle) Certificate from the German Embassy New Delhi is strictly MANDATORY before applying for university admissions and visa. Processing takes 4–8 weeks.',
      },
      canada: {
        palRequired: true,
        gicAmountCad: 20635,
        studyPermitNotes: 'Provincial Attestation Letter (PAL) required from university province (e.g. Ontario, BC). Guaranteed Investment Certificate (GIC) with Scotiabank, CIBC, or ICICI Canada mandatory for living expense proof.',
      },
      australia: {
        assessmentLevel: 'Level 2',
        genuineStudentCheck: 'Genuine Student (GS) 150-word response questions covering reasons for choosing course, career value in India, and economic ties.',
      },
    },
    exclusiveScholarships: [
      {
        name: 'Inlaks Shivdasani Foundation Scholarship',
        awardType: 'Full tuition + living stipend (up to $100,000 USD)',
        eligibility: 'Indian citizens under 30 holding a first-class degree admitted to top global universities (US, UK, Europe).',
        deadline: 'March 15 - March 30 annually',
      },
      {
        name: 'JN Tata Endowment for Higher Education',
        awardType: 'Loan scholarship up to ₹10,00,000 + merit gift scholarship',
        eligibility: 'Graduates from Indian universities proceeding to higher studies abroad.',
        deadline: 'March 7 annually',
      },
      {
        name: 'Narotam Sekhsaria Foundation Scholarship',
        awardType: 'Interest-free loan scholarship up to ₹20,00,000',
        eligibility: 'Indian nationals in top 10% of class pursuing masters/doctorate abroad.',
        deadline: 'March 20 annually',
      },
      {
        name: 'Commonwealth Scholarship (India National Agency)',
        awardType: 'Full airfare, tuition, and monthly stipend in the UK',
        eligibility: 'Applicants nominated via the Indian Ministry of Education.',
        deadline: 'October - November annually',
      },
    ],
    criticalAdvisories: [
      'APS certificate for Germany must be applied for as early as possible—delays at the Delhi office can stall winter intake visas.',
      'For US visa interviews, avoid mentioning plans to work on H-1B or settle abroad; emphasize the rapid economic growth and return on investment in the Indian corporate/tech ecosystem.',
      'Check if your university requires apostilled or certified mark sheets through your state Department of Higher Education.',
    ],
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    region: 'Sub-Saharan Africa',
    flag: '🇳🇬',
    currencyCode: 'NGN',
    currencySymbol: '₦',
    exchangeRateToUSD: 1650.0,
    nationalCurriculum: {
      primaryBoard: 'WAEC (West African Examinations Council) / NECO',
      gradingScale: 'A1 (Excellent 75–100%) to F9 (Fail)',
      conversionToUsGpa: 'A1–B3 ≈ 3.5–4.0 GPA | C4–C6 ≈ 2.8–3.2 GPA',
      conversionToUkClass: 'WAEC Senior Secondary Certificate with minimum 5 credits (A1-C6) equivalent to GCSE / A-Level pathway',
      conversionToGermanNote: 'Direct entry rarely permitted with WAEC alone; typically requires 1-year Studienkolleg or 1-2 years completed at a recognized Nigerian university.',
      credentialEvaluationService: 'WES or ECE (Direct WAEC scratch-card verification required)',
    },
    englishWaiverPolicy: {
      moiAccepted: true,
      conditions: 'Over 60+ universities in the UK, Canada (e.g. Carleton, Memorial), and select US universities waive English testing if WAEC English Language score is C6 or better. Medium of Instruction (MOI) letters from universities like UNILAG, UI, and Covenant are widely accepted.',
      recommendedExams: 'Duolingo English Test (fast & economical at $65 USD) or TOEFL iBT if targeting Ivy League or US graduate funding.',
    },
    destinationEmbassyRules: {
      usa: {
        keyRequirements: [
          'Form I-20 + DS-160 + SEVIS I-901 fee',
          'US Consulate Lagos or Embassy Abuja interview appointment',
          'Proof of genuine funding: Form A / CBN official forex channel or domiciliary accounts',
          'Strong demonstration of socio-economic ties to Nigeria'
        ],
        proofOfFundsTips: 'Consular officers in Lagos/Abuja examine third-party sponsorship critically. Sponsoring bank statements must belong to immediate biological parents or verified institutional employers, accompanied by business registration documents.',
        visaCategory: 'F-1 Student Visa',
      },
      uk: {
        keyRequirements: [
          'CAS from UK University',
          'Mandatory IOM-approved Tuberculosis (TB) test certificate in Lagos or Abuja',
          '28-day funds holding rule in NGN or USD domiciliary account at official CBN conversion rates',
          'Immigration Health Surcharge (IHS)'
        ],
        tbTestMandatory: true,
        casRequirements: 'Universities verify source of deposit funds prior to CAS release.',
      },
      germany: {
        apsCertificateMandatory: false,
        blockedAccountAmountEur: 11904,
        specialNotes: 'No APS required for Nigerian students. Blocked account can be opened via Expatrio, Fintiba, or Coracle.',
      },
      canada: {
        palRequired: true,
        gicAmountCad: 20635,
        studyPermitNotes: 'PAL mandatory. Demonstrating verifiable funds in domiciliary accounts or authorized bank statements is vital due to strict study permit approval criteria.',
      },
      australia: {
        assessmentLevel: 'Level 3',
        genuineStudentCheck: 'Thorough documentation of career outcome and financial capacity required.',
      },
    },
    exclusiveScholarships: [
      {
        name: 'Mastercard Foundation Scholars Program',
        awardType: 'Full tuition, accommodation, books, airfare, and monthly stipend',
        eligibility: 'Economically disadvantaged youth from Sub-Saharan Africa with strong leadership potential.',
        deadline: 'August - January depending on partner university (e.g. Toronto, McGill, Edinburgh, Berkeley)',
      },
      {
        name: 'PTDF Overseas Scholarship Scheme',
        awardType: 'Full funding for MSc and PhD in UK, Germany, France, and Malaysia',
        eligibility: 'Nigerian graduates in engineering, geology, computing, and environmental science.',
        deadline: 'December - January annually',
      },
      {
        name: 'Chevening Scholarship (Nigeria)',
        awardType: 'Full 1-year master’s degree funding in the UK',
        eligibility: 'Nigerian professionals with minimum 2 years of work experience and clear leadership trajectory.',
        deadline: 'Early November annually',
      },
      {
        name: 'Bilateral Education Agreement (BEA) Awards',
        awardType: 'Tuition and living stipends for study in partnering nations (Russia, China, Hungary, Romania)',
        eligibility: 'Nigerian students nominated through Federal Ministry of Education.',
        deadline: 'January annually',
      },
    ],
    criticalAdvisories: [
      'Currency fluctuations (Naira to USD/GBP) can impact visa proof-of-funds calculations. Always verify current embassy conversion rates right before your interview.',
      'Ensure your official university transcripts and WAEC scratch-card details match exactly to prevent fraud detection flags.',
      'For US visa interviews, be prepared to explain the exact mechanics of how tuition will be paid (e.g., Form A via bank or domiciliary transfer).',
    ],
  },
  {
    id: 'china',
    name: 'China',
    region: 'East & SE Asia',
    flag: '🇨🇳',
    currencyCode: 'CNY',
    currencySymbol: '¥',
    exchangeRateToUSD: 7.25,
    nationalCurriculum: {
      primaryBoard: 'Gaokao (National College Entrance Examination) / Huikao / Senior High Diploma',
      gradingScale: 'Gaokao: out of 750 points (or provincial variation) | High school: 0–100%',
      conversionToUsGpa: '85–100% ≈ 3.7–4.0 GPA | Gaokao Tier 1 benchmark (Yiben) highly respected in Australia & UK',
      conversionToUkClass: 'Gaokao scores above Tier 1 line directly accepted by Cambridge, Birmingham, Exeter, Glasgow for direct year 1 bachelor admission.',
      conversionToGermanNote: 'Gaokao score ≥70% of provincial maximum allows direct admission to German universities without Studienkolleg!',
      credentialEvaluationService: 'CHESICC (Center for Student Services and Development / CDGDC) and APS for Germany',
    },
    englishWaiverPolicy: {
      moiAccepted: false,
      conditions: 'Unless student attended an international Sino-foreign university (e.g. NYU Shanghai, Duke Kunshan, Nottingham Ningbo) or an international IB/AP school, formal TOEFL or IELTS is mandatory.',
      recommendedExams: 'TOEFL iBT (95–110+) or IELTS Academic (7.0+). Duolingo accepted by most US private universities.',
    },
    destinationEmbassyRules: {
      usa: {
        keyRequirements: [
          'Form I-20 + DS-160 + SEVIS I-901 fee',
          'Presidential Proclamation 10043 scrutiny for STEM graduates from "Seven Sons of National Defence" universities',
          'Clear, unclassified research plan for master’s and PhD applicants'
        ],
        proofOfFundsTips: 'Bank deposit certificate (Cunkuan Zhengming) frozen for 3–6 months from major Chinese state banks (Bank of China, ICBC, CCB).',
        visaCategory: 'F-1 Student Visa',
      },
      uk: {
        keyRequirements: [
          'CAS + Tuberculosis (TB) test certificate from designated clinic',
          'ATAS (Academic Technology Approval Scheme) clearance required for advanced science and engineering degrees',
          'Proof of living funds for 28 days'
        ],
        tbTestMandatory: true,
        casRequirements: 'University issues CAS following transcript authentication.',
      },
      germany: {
        apsCertificateMandatory: true,
        blockedAccountAmountEur: 11904,
        specialNotes: 'APS Beijing certificate is required. Students with Gaokao score ≥70% can enter German universities directly in subjects matching their Gaokao stream (Math/Science or Humanities).',
      },
      canada: {
        palRequired: true,
        gicAmountCad: 20635,
        studyPermitNotes: 'SDS (Student Direct Stream) discontinued; all applicants follow standard study permit with GIC and upfront medical exam.',
      },
      australia: {
        assessmentLevel: 'Level 1',
        genuineStudentCheck: 'Direct Gaokao admission widely accepted across Australian Group of Eight (Go8). GS statement required.',
      },
    },
    exclusiveScholarships: [
      {
        name: 'China Scholarship Council (CSC) Joint Scholarships',
        awardType: 'Full tuition, living stipend, and roundtrip international airfare',
        eligibility: 'Chinese nationals admitted to partner universities globally (Oxford, Cambridge, Harvard, MIT, Melbourne).',
        deadline: 'March - April annually',
      },
      {
        name: 'Schwarzman Scholars at Tsinghua University',
        awardType: 'Full master’s degree in Global Affairs at Tsinghua for Chinese & international leaders',
        eligibility: 'Undergraduates and young professionals globally.',
        deadline: 'May - September annually',
      },
      {
        name: 'Rhodes Scholarships for China',
        awardType: 'Full postgraduate funding at University of Oxford',
        eligibility: 'Chinese citizens with outstanding academic and leadership achievements.',
        deadline: 'September annually',
      },
    ],
    criticalAdvisories: [
      'For US STEM graduate applicants, prepare detailed CVs with zero military research connotations to minimize administrative processing (221g).',
      'German APS Beijing takes 2–4 months; book your interview or document evaluation early.',
      'Keep notarized and English translated copies of your Gaokao score sheet and Senior Middle School Graduation Certificate.',
    ],
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    region: 'East & SE Asia',
    flag: '🇻🇳',
    currencyCode: 'VND',
    currencySymbol: '₫',
    exchangeRateToUSD: 25400.0,
    nationalCurriculum: {
      primaryBoard: 'Bằng Tốt Nghiệp THPT (National High School Graduation Exam)',
      gradingScale: '0 – 10.0 Grade Point Scale',
      conversionToUsGpa: '8.5–10.0 (Giỏi/Xuất Sắc) ≈ 3.7–4.0 GPA | 7.0–8.4 (Khá) ≈ 3.0–3.5 GPA',
      conversionToUkClass: '8.0+ GPA equivalent to UK 2:1 Honours equivalent for master\'s entry',
      conversionToGermanNote: 'High school graduation alone requires Studienkolleg; completed 4 semesters of university study in Vietnam qualifies for direct entry.',
      credentialEvaluationService: 'WES, SpanTran, and APS Hanoi for Germany',
    },
    englishWaiverPolicy: {
      moiAccepted: false,
      conditions: 'English test required unless graduated from an English-taught international program (e.g. RMIT Vietnam, VinUniversity) or English-speaking country.',
      recommendedExams: 'IELTS Academic (6.5–7.5) is extremely popular; TOEFL iBT and Duolingo widely accepted in the US.',
    },
    destinationEmbassyRules: {
      usa: {
        keyRequirements: [
          'Form I-20 + DS-160 + SEVIS I-901 fee ($350)',
          'Embassy Hanoi or Consulate Ho Chi Minh City interview',
          'Real estate titles (Sổ Đỏ) and business registration (Giấy phép kinh doanh) to demonstrate financial capacity and ties'
        ],
        proofOfFundsTips: 'Savings passbook (Sổ tiết kiệm) opened at least 1–3 months prior with minimum $40,000–$60,000 USD equivalent in VND.',
        visaCategory: 'F-1 Student Visa',
      },
      uk: {
        keyRequirements: [
          'CAS + IOM-approved Tuberculosis (TB) test certificate in Hanoi or HCMC',
          '28-day financial holding requirement',
          'IHS health surcharge'
        ],
        tbTestMandatory: true,
        casRequirements: 'Academic and financial checks by university before CAS issuance.',
      },
      germany: {
        apsCertificateMandatory: true,
        blockedAccountAmountEur: 11904,
        specialNotes: 'APS Hanoi certificate is mandatory for all Vietnamese students applying for Bachelor, Master, or Studienkolleg in Germany.',
      },
      canada: {
        palRequired: true,
        gicAmountCad: 20635,
        studyPermitNotes: 'Regular study permit stream with GIC and comprehensive study plan (kế hoạch học tập).',
      },
      australia: {
        assessmentLevel: 'Level 2',
        genuineStudentCheck: 'Australia is a primary destination for Vietnamese students; GS questions focus on study relevance to Vietnam\'s burgeoning tech and commerce industries.',
      },
    },
    exclusiveScholarships: [
      {
        name: 'Vingroup Science and Technology Scholarship',
        awardType: 'Full tuition, monthly stipend, medical insurance, and airfare for Master’s & PhD at top 50 global universities',
        eligibility: 'Vietnamese talents in science, technology, engineering, and mathematics.',
        deadline: 'December - March annually',
      },
      {
        name: 'Australia Awards Scholarships (Vietnam)',
        awardType: 'Full funding for master’s degree in Australia',
        eligibility: 'Vietnamese government, NGO, and institutional professionals.',
        deadline: 'April 30 annually',
      },
      {
        name: 'AAS / Chevening Vietnam',
        awardType: 'Full tuition and living costs in the UK',
        eligibility: 'Vietnamese emerging leaders with minimum 2 years of work experience.',
        deadline: 'November annually',
      },
    ],
    criticalAdvisories: [
      'APS Hanoi must be undertaken early; interview sessions are conducted only twice a year in May and November for specific disciplines.',
      'For US visa interviews, clearly demonstrate how your intended degree bridges directly into high-growth sectors in Vietnam (e.g., semiconductor engineering, renewable energy, AI).',
      'Ensure all Vietnamese official documents have certified English translations stamped by the Department of Justice (Phòng Tư Pháp).',
    ],
  },
  {
    id: 'brazil',
    name: 'Brazil',
    region: 'Latin America',
    flag: '🇧🇷',
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    exchangeRateToUSD: 5.65,
    nationalCurriculum: {
      primaryBoard: 'Certificado de Conclusão do Ensino Médio / ENEM (Exame Nacional do Ensino Médio)',
      gradingScale: '0 – 10.0 Scale (Passing grade typically 5.0 or 6.0)',
      conversionToUsGpa: '8.5–10.0 ≈ 3.7–4.0 GPA | 7.0–8.4 ≈ 3.0–3.5 GPA',
      conversionToUkClass: 'Brazilian bachelor’s (Bacharelado / Licenciatura 4+ years) with grade 7.5+ equivalent to UK 2:1 Honours',
      conversionToGermanNote: 'High school graduation alone requires Studienkolleg; completed 1-2 years of undergraduate study at a recognized Brazilian university allows direct German entry.',
      credentialEvaluationService: 'WES or ECE (Hague Apostille required for all official transcripts)',
    },
    englishWaiverPolicy: {
      moiAccepted: false,
      conditions: 'Portuguese is the national medium of instruction. Formal English proficiency exam (TOEFL, IELTS, or Duolingo) is mandatory across virtually all universities.',
      recommendedExams: 'TOEFL iBT or IELTS Academic for premier graduate degrees; Duolingo widely recognized in the US.',
    },
    destinationEmbassyRules: {
      usa: {
        keyRequirements: [
          'Form I-20 + DS-160 + SEVIS I-901 fee',
          'Consular interview at Brasilia, São Paulo, Rio de Janeiro, Recife, or Porto Alegre',
          'Demonstration of family ties, assets, or professional opportunities in Brazil'
        ],
        proofOfFundsTips: 'Imposto de Renda (Personal Income Tax Declaration - IRPF) and bank statements from parents showing liquid funds equivalent to first-year expenses.',
        visaCategory: 'F-1 Student Visa',
      },
      uk: {
        keyRequirements: [
          'CAS + 28-day financial proof in BRL or USD',
          'TB test is NOT required for Brazilian residents',
          'IHS health surcharge'
        ],
        tbTestMandatory: false,
        casRequirements: 'Direct submission of apostilled academic credentials.',
      },
      germany: {
        apsCertificateMandatory: false,
        blockedAccountAmountEur: 11904,
        specialNotes: 'No APS required for Brazilian citizens. Public German universities offer virtually tuition-free education in German and English-taught degrees.',
      },
      canada: {
        palRequired: true,
        gicAmountCad: 20635,
        studyPermitNotes: 'High interest destination for Brazilian students. Ensure clean ties and documented financial sponsorship.',
      },
      australia: {
        assessmentLevel: 'Level 1',
        genuineStudentCheck: 'Streamlined visa processing (Level 1 country). GS statement required.',
      },
    },
    exclusiveScholarships: [
      {
        name: 'Fundação Estudar Líderes Estudar Fellowship',
        awardType: 'Scholarships covering up to 95% of tuition and living expenses worldwide',
        eligibility: 'High-performing Brazilian students under 34 admitted to top undergraduate or graduate programs globally.',
        deadline: 'March annually',
      },
      {
        name: 'Instituto Ling Scholarships',
        awardType: 'Partial master\'s and MBA grants (up to $30,000 USD) for top global institutions',
        eligibility: 'Brazilian citizens admitted to leading business, public policy, or law schools.',
        deadline: 'May annually',
      },
      {
        name: 'Fulbright Brazil Doctoral Fellowships',
        awardType: 'Full funding for PhD and sandwich doctoral research in the USA',
        eligibility: 'Brazilian scholars affiliated with Brazilian universities.',
        deadline: 'June - July annually',
      },
    ],
    criticalAdvisories: [
      'All official academic documents (Historico Escolar and Diploma) must have the Hague Apostille (Apostila de Haia) issued by a Brazilian Cartório before traveling.',
      'Income tax declaration (IRPF) is the primary financial document scrutinized by foreign embassies for Brazilian applicants.',
      'German and French universities offer exceptional low-cost alternatives to North American tuition fees.',
    ],
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    region: 'South Asia',
    flag: '🇵🇰',
    currencyCode: 'PKR',
    currencySymbol: '₨',
    exchangeRateToUSD: 279.0,
    nationalCurriculum: {
      primaryBoard: 'BISE (Board of Intermediate and Secondary Education) / FBISE / Cambridge A-Levels',
      gradingScale: 'HSSC / Intermediate: Out of 1100 marks (Grade A-1: 80%+, Grade A: 70–79%)',
      conversionToUsGpa: '80%+ (Grade A-1) ≈ 3.8–4.0 GPA | 70–79% (Grade A) ≈ 3.3–3.7 GPA',
      conversionToUkClass: 'First Division (60%+) equivalent to UK 2:1 Honours from HEC-recognized 4-year degree',
      conversionToGermanNote: 'HSSC requires 1-year Studienkolleg; completed 4-year bachelor\'s from HEC-recognized university qualifies for direct master\'s.',
      credentialEvaluationService: 'IBCC (Inter Board Committee of Chairmen) and HEC (Higher Education Commission) attestation required',
    },
    englishWaiverPolicy: {
      moiAccepted: true,
      conditions: 'UK and Irish universities frequently accept English Proficiency Certificates (MOI) if graduated from top Pakistani universities (e.g., LUMS, NUST, IBA, FAST). US universities require TOEFL/IELTS unless holding Cambridge O/A-Levels.',
      recommendedExams: 'IELTS Academic (6.5–7.5) or TOEFL iBT (90–105). Duolingo widely accepted in North America.',
    },
    destinationEmbassyRules: {
      usa: {
        keyRequirements: [
          'Form I-20 + DS-160 + SEVIS I-901 fee',
          'Embassy Islamabad or Consulate Karachi interview appointment',
          'Proof of liquid funds covering Year 1 + convincing plan for subsequent years'
        ],
        proofOfFundsTips: 'Bank statements with documented source of funds (e.g. business earnings, agricultural income, sale of property). Third-party sponsorships outside immediate family face intense scrutiny.',
        visaCategory: 'F-1 Student Visa',
      },
      uk: {
        keyRequirements: [
          'CAS + Mandatory IOM-approved Tuberculosis (TB) test certificate in Islamabad, Lahore, Karachi, or Mirpur',
          '28-day continuous funds holding rule in SBP-approved bank',
          'IHS health surcharge'
        ],
        tbTestMandatory: true,
        casRequirements: 'Attestation of intermediate and degree certificates through IBCC/HEC prior to CAS.',
      },
      germany: {
        apsCertificateMandatory: false,
        blockedAccountAmountEur: 11904,
        specialNotes: 'No APS required for Pakistani students. Long waiting times for German embassy visa appointments in Islamabad and Karachi (often 6–12 months); book appointment slot immediately upon receiving admission.',
      },
      canada: {
        palRequired: true,
        gicAmountCad: 20635,
        studyPermitNotes: 'PAL mandatory. Demonstrating verifiable economic ties and study intent is crucial for study permit approval.',
      },
      australia: {
        assessmentLevel: 'Level 3',
        genuineStudentCheck: 'Detailed GS evidence required, including career outcomes in Pakistan and full financial sponsorship verification.',
      },
    },
    exclusiveScholarships: [
      {
        name: 'Fulbright Pakistan Foreign Student Program',
        awardType: 'World’s largest Fulbright program! Covers full tuition, monthly stipend, textbooks, airfare, and health insurance for Master’s & PhD in the US',
        eligibility: 'Pakistani citizens with 16 years of formal education; applications managed via USEFP.',
        deadline: 'April - May annually',
      },
      {
        name: 'HEC Overseas Scholarships for PhD in Top 25 Universities',
        awardType: 'Full tuition, maintenance allowance, and return air ticket',
        eligibility: 'Pakistani/AJK nationals with minimum 16 years education and strong research proposal.',
        deadline: 'Annually via HEC portal',
      },
      {
        name: 'Chevening Scholarship (Pakistan)',
        awardType: 'Full master’s degree in the UK',
        eligibility: 'Pakistani professionals with minimum 2 years of work experience.',
        deadline: 'Early November annually',
      },
      {
        name: 'Scotland Pakistan Scholarships for Women',
        awardType: 'Full tuition for female students for master’s degrees',
        eligibility: 'Pakistani female students in STEM, education, agriculture, or health.',
        deadline: 'August - September annually',
      },
    ],
    criticalAdvisories: [
      'Degree attestation from HEC and secondary school certificates from IBCC must be done in advance; unauthorized documents lead to direct visa refusal.',
      'German student visa waitlists in Pakistan can exceed 9 months—register on the German mission appointment waitlist as soon as admission is confirmed.',
      'Ensure bank statements reflect stable, legitimate deposits rather than sudden bulk transfers right before the 28-day window.',
    ],
  },
  {
    id: 'mena',
    name: 'Middle East & North Africa (MENA / GCC & Egypt)',
    region: 'MENA',
    flag: '🌍',
    currencyCode: 'USD',
    currencySymbol: '$',
    exchangeRateToUSD: 1.0,
    nationalCurriculum: {
      primaryBoard: 'General Secondary Certificate (Thanaweya Amma / Tawjihi / Thanawiya)',
      gradingScale: 'Percentage scale 0 – 100% (Passing 50% or 60%)',
      conversionToUsGpa: '85%+ ≈ 3.7–4.0 GPA | 75–84% ≈ 3.2–3.6 GPA',
      conversionToUkClass: 'Egyptian / Jordanian / Saudi bachelor\'s degree (Very Good / Jayyid Jiddan) equivalent to UK 2:1 Honours',
      conversionToGermanNote: 'Thanaweya Amma typically requires 1-year Studienkolleg or 1-2 years of recognized local university attendance.',
      credentialEvaluationService: 'WES, ECE, or cultural mission evaluation',
    },
    englishWaiverPolicy: {
      moiAccepted: false,
      conditions: 'Unless holding a degree from an American university in the region (e.g. AUC Cairo, AUB Beirut, AUS Sharjah) or an English-medium IB/American curriculum, TOEFL/IELTS is required.',
      recommendedExams: 'IELTS Academic (6.5–7.5) or TOEFL iBT (90–105). Duolingo widely accepted in North America.',
    },
    destinationEmbassyRules: {
      usa: {
        keyRequirements: [
          'Form I-20 + DS-160 + SEVIS I-901 fee',
          'Consular interview at local US Embassy/Consulate',
          'Government financial guarantee (Financial Guarantee Letter) or family bank statements'
        ],
        proofOfFundsTips: 'Government-sponsored students (e.g. Saudi MOE, Kuwait Cultural Mission, UAE scholarship) only need to submit their official Financial Guarantee Letter without private bank statements.',
        visaCategory: 'F-1 Student Visa',
      },
      uk: {
        keyRequirements: [
          'CAS + 28-day financial proof or official embassy sponsor guarantee letter',
          'TB test certificate mandatory for Egypt and Morocco residents',
          'IHS health surcharge'
        ],
        tbTestMandatory: true,
        casRequirements: 'Official cultural bureau or private sponsor confirmation.',
      },
      germany: {
        apsCertificateMandatory: false,
        blockedAccountAmountEur: 11904,
        specialNotes: 'No APS required for MENA nations. Blocked account required unless holding a recognized government scholarship.',
      },
      canada: {
        palRequired: true,
        gicAmountCad: 20635,
        studyPermitNotes: 'Demonstrating ties to home country and clear post-study integration in national development visions (e.g., Vision 2030).',
      },
      australia: {
        assessmentLevel: 'Level 1',
        genuineStudentCheck: 'Gulf countries are primarily Assessment Level 1; Egypt/North Africa are Level 2/3.',
      },
    },
    exclusiveScholarships: [
      {
        name: 'Al Ghurair Foundation STEM Scholars Program',
        awardType: 'Full tuition, housing, and living stipend for top Arab youth in STEM',
        eligibility: 'Citizens of an Arab League country with financial need and high academic achievement.',
        deadline: 'Check partner universities annually',
      },
      {
        name: 'Saudi Custodian of the Two Holy Mosques Scholarship',
        awardType: 'Full tuition, healthcare, allowances, and monthly stipends for Saudi citizens at top 30 global universities',
        eligibility: 'Saudi citizens in priority fields (AI, clean energy, medicine, finance).',
        deadline: 'Continuous / Annual rounds',
      },
      {
        name: 'Chevening MENA & Fulbright Foreign Student Program',
        awardType: 'Full master’s scholarships for Egypt, Jordan, Lebanon, Morocco, and Gulf nations',
        eligibility: 'Emerging regional leaders.',
        deadline: 'Autumn annually',
      },
    ],
    criticalAdvisories: [
      'If sponsored by a national ministry or royal decree, ensure your Financial Guarantee letter explicitly names the exact university and program to satisfy the I-20 / CAS officer.',
      'Egyptian students must verify military service status (Tasreeh Al-Safar) before booking flight tickets or visa appointments.',
      'Check certified Arabic-to-English translations with Ministry of Foreign Affairs (MFA) stamps.',
    ],
  },
  {
    id: 'global-universal',
    name: 'All Other Global Nationalities (Universal Reference)',
    region: 'Europe & Americas',
    flag: '🌐',
    currencyCode: 'USD',
    currencySymbol: '$',
    exchangeRateToUSD: 1.0,
    nationalCurriculum: {
      primaryBoard: 'National Secondary School Certificate / International Baccalaureate (IB) / A-Levels / French Bac / Abitur',
      gradingScale: 'Converted via standard international credential frameworks (WES / NARIC / Anabin)',
      conversionToUsGpa: 'Top 10% class rank ≈ 3.8–4.0 GPA | Top 25% ≈ 3.5–3.7 GPA | Average ≈ 3.0 GPA',
      conversionToUkClass: 'Verified via UK ENIC (National Recognition Information Centre) database',
      conversionToGermanNote: 'Check the official DAAD Anabin database (anabin.kmk.org) for exact direct entry vs Studienkolleg requirements.',
      credentialEvaluationService: 'WES (World Education Services) or ECE for US; UK ENIC for UK; Anabin for Germany',
    },
    englishWaiverPolicy: {
      moiAccepted: false,
      conditions: 'Exempt if citizenship is from designated English-majority nations (US, UK, Canada, Australia, NZ, Ireland). All other international applicants require TOEFL iBT, IELTS Academic, or Duolingo unless secondary education was 100% in English.',
      recommendedExams: 'TOEFL iBT (100+) or IELTS Academic (7.0+) provide universal acceptance across 100% of global institutions.',
    },
    destinationEmbassyRules: {
      usa: {
        keyRequirements: [
          'Form I-20 from SEVP-certified institution',
          'SEVIS I-901 fee payment ($350) + DS-160 application ($185)',
          'Proof of non-immigrant intent under INA 214(b)',
          'Liquid funds covering full first-year tuition + living costs'
        ],
        proofOfFundsTips: 'Consulates require liquid financial documents (bank statements, sanctioned education loans, government grants). Avoid unverified real estate values as primary funds.',
        visaCategory: 'F-1 Student Visa',
      },
      uk: {
        keyRequirements: [
          'CAS from student sponsor',
          'Tuberculosis (TB) test required if resident in a listed TB-risk nation for >6 months',
          '28-day financial maintenance rule (£1,483/mo London or £1,136/mo outside London; max 9 months)',
          'Immigration Health Surcharge (IHS) £776/year + Student visa fee £490'
        ],
        tbTestMandatory: false,
        casRequirements: 'University issues CAS ~3-6 months prior to start date.',
      },
      germany: {
        apsCertificateMandatory: false,
        blockedAccountAmountEur: 11904,
        specialNotes: 'APS is ONLY mandatory for students with degrees from India, China, or Vietnam. All other nationalities apply with standard document recognition.',
      },
      canada: {
        palRequired: true,
        gicAmountCad: 20635,
        studyPermitNotes: 'Provincial Attestation Letter (PAL) required for all undergraduate and master’s applicants.',
      },
      australia: {
        assessmentLevel: 'Level 1',
        genuineStudentCheck: 'Genuine Student (GS) evaluation assessing academic background, course logic, and career ROI. Subclass 500 visa fee AUD $1,600; living cost evidence AUD $29,710/year.',
      },
    },
    exclusiveScholarships: [
      {
        name: 'Fulbright Foreign Student Program (160+ Countries)',
        awardType: 'Full tuition, stipend, health insurance, and airfare for Master\'s & PhD',
        eligibility: 'Citizens of participating countries worldwide with academic excellence.',
        deadline: 'Varies by local US Embassy (Feb - Oct annually)',
      },
      {
        name: 'Chevening Scholarships (160+ Countries)',
        awardType: 'Full funding for 1-year master’s degree in the UK',
        eligibility: 'Global emerging leaders with minimum 2 years of professional experience.',
        deadline: 'Early November annually',
      },
      {
        name: 'DAAD Scholarships (Germany)',
        awardType: 'Monthly stipend (€934–€1,200), health insurance, travel grant, plus free public university tuition',
        eligibility: 'Graduates with at least 2 years of work experience or outstanding academic merit.',
        deadline: 'Varies by program (July - November annually)',
      },
      {
        name: 'Erasmus Mundus Joint Masters Scholarships (European Union)',
        awardType: 'Full funding covering tuition across 2-3 European countries, monthly stipend of €1,400, and travel allowance',
        eligibility: 'Open to all students worldwide regardless of nationality.',
        deadline: 'December - February annually',
      },
      {
        name: 'Knight-Hennessy Scholars at Stanford University',
        awardType: 'Full funding for any graduate degree at Stanford University',
        eligibility: 'High-impact citizens from any nation worldwide.',
        deadline: 'Early October annually',
      },
    ],
    criticalAdvisories: [
      'Always verify whether your destination country requires the Hague Apostille or consular legalization for your diplomas.',
      'Check if your home bank provides foreign exchange remittances (wire transfers) easily for tuition fees or if special central bank permissions are needed.',
      'Review whether your passport has at least 6 months of validity beyond your intended period of stay abroad.',
    ],
  },
];
