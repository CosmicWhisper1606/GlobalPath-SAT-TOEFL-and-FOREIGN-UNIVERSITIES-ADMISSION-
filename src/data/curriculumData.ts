export type CurriculumType = 
  | 'IBDP' 
  | 'Cambridge_A_Levels' 
  | 'CBSE' 
  | 'CISCE' 
  | 'State_Board' 
  | 'US_HighSchool' 
  | 'French_Bac' 
  | 'German_Abitur' 
  | 'National_Other';

export type GradeReportingFormat = 
  | 'Percentage_100' 
  | 'Letter_Grades_A_to_F' 
  | 'IB_Scale_45' 
  | 'GPA_4_Scale' 
  | 'Scale_20_Points' 
  | 'German_1_to_6';

export type AcademicYear = 'Grade_9' | 'Grade_10' | 'Grade_11' | 'Grade_12' | 'Gap_Year';

export type TargetMajorField = 
  | 'Engineering_CS' 
  | 'Business_Finance_Econ' 
  | 'PreMed_LifeSciences' 
  | 'Humanities_SocialSciences' 
  | 'Undeclared';

export interface CurriculumComparisonItem {
  id: CurriculumType;
  name: string;
  tagline: string;
  nativeScale: string;
  reportingFormat: GradeReportingFormat;
  structureAndAssessment: string;
  strengthsInAdmissions: string[];
  mainPitfallsAndFriction: string[];
  usEvaluationMethod: string;
  ukEvaluationMethod: string;
  transcriptExpectations: string;
  predictedGradesRisk: string;
  satMathSynergy: string;
  satRwSynergy: string;
  recommendedExternalRigor: string;
}

export const GLOBAL_CURRICULA_DATABASE: CurriculumComparisonItem[] = [
  {
    id: 'IBDP',
    name: 'IB Diploma Programme (IBDP)',
    tagline: 'Rigorous 6-subject holistic curriculum with inquiry-based critical writing and core research',
    nativeScale: 'Total points out of 45 (6 subjects x 7 pts + 3 bonus core pts for EE & TOK)',
    reportingFormat: 'IB_Scale_45',
    structureAndAssessment: '6 subjects chosen across groups: 3 to 4 at Higher Level (HL, 240 instructional hours) and remainder at Standard Level (SL, 150 hours). Core components include the 4,000-word Extended Essay (EE), Theory of Knowledge (TOK) exhibition/essay, and Creativity, Activity, Service (CAS).',
    strengthsInAdmissions: [
      'Globally standardized across 150+ countries; instantly recognized and celebrated by all elite admissions committees.',
      'Exceptional preparation for university research, college-level analytical writing, and independent time management.',
      'High scores on Higher Level (HL) subjects (grade 5, 6, or 7) frequently earn up to 30+ semester credits (full sophomore standing) at top US universities.'
    ],
    mainPitfallsAndFriction: [
      'Crushing workload with concurrent internal assessments (IAs), EE, TOK deadlines, and oral commentaries.',
      'Significant gap risk: admissions offers in the UK/Canada/Europe are conditional on final July IB results. A drop from a predicted 42 to a 34 can result in an immediate offer cancellation.',
      'SL subjects demand substantial effort even if unrelated to the student’s intended college major.'
    ],
    usEvaluationMethod: 'Admissions readers evaluate HL subjects for field-specific rigor. A 38+ out of 45 is competitive for Top-30 colleges; 42+ for Ivies and Stanford.',
    ukEvaluationMethod: 'UK universities (UCAS) set strict conditional entry based on total points (e.g. 39–41 points overall) with specific HL subject requirements (e.g., 7, 6, 6 with 7 in HL Math AA for Imperial/Cambridge).',
    transcriptExpectations: 'Submit official semester transcripts for Grades 9 and 10 (MYP or local pre-IB), Grade 11 DP1 official transcripts, and official Counselor Predicted DP2 Grades.',
    predictedGradesRisk: 'Extreme for UK/Europe (seat revoked if conditions are missed by even 1 point). Moderate for US (tolerance is typically ~3–4 points; severe drops trigger inquiry letters).',
    satMathSynergy: 'Students taking Math: Analysis & Approaches (AA) HL or SL easily exceed SAT Math scope. The challenge is adjusting to rapid 1-minute pace and tricky word problem phrasing.',
    satRwSynergy: 'Exceptional synergy. IB students routinely score in the 700–780 range on SAT Reading & Writing due to extensive literary analysis and essay writing.',
    recommendedExternalRigor: 'AP exams are usually unnecessary for full IB diploma holders. However, self-studying AP Calculus BC or AP Physics C can provide standalone validation if taking SL Math or non-physics HL.'
  },
  {
    id: 'Cambridge_A_Levels',
    name: 'Cambridge International A-Levels',
    tagline: 'Deep subject specialization; gold standard across the UK, Europe, and Commonwealth systems',
    nativeScale: 'Letter grades: A*, A, B, C, D, E per subject (A* = 90%+, A = 80%+)',
    reportingFormat: 'Letter_Grades_A_to_F',
    structureAndAssessment: 'Deep specialization in 3 to 4 subjects across Grades 11 and 12 (Years 12–13) following IGCSEs. High-stakes terminal external written papers administered by Cambridge (CAIE), Edexcel, or OxfordAQA.',
    strengthsInAdmissions: [
      'Gold standard for UK, Europe, Singapore, and Canada; demonstrates unmatched technical depth in chosen fields.',
      'Top US universities award substantial course credits for grades of A* or A (e.g., 8–10 semester credits per subject).',
      'Allows students to completely drop subjects they dislike or struggle with (e.g., dropping humanities to focus purely on Further Math, Math, Physics, and Chemistry).'
    ],
    mainPitfallsAndFriction: [
      'Narrow breadth: dropping humanities or languages after Grade 10 can handicap holistic US admissions profiles that prize multidimensional intellectual curiosity.',
      'High-stakes exam pressure: 100% of final grade depends on terminal exam sessions; little credit for sustained daily coursework or classroom participation.',
      'IGCSE transcripts (Grade 9–10) are scrutinized closely by US admissions officers to verify general academic baseline.'
    ],
    usEvaluationMethod: 'US universities value A* and A predictions highly, but cross-examine Grade 9 and 10 IGCSE results to ensure well-rounded foundations.',
    ukEvaluationMethod: 'Primary determinant of admission. Offers are strictly conditional on achieving specific grades (e.g., A*A*A for Oxford Computer Science with A* in Mathematics).',
    transcriptExpectations: 'Submit certified copies of all IGCSE / GCSE certificates (Grades 9–10) plus Grade 11 AS-Level results or internal school transcripts and official Grade 12 Predicted A-Level grades.',
    predictedGradesRisk: 'Critical for UCAS applications. If final August results are lower than the conditional offer (e.g., received AAB instead of AAA), the university is legally entitled to reject the student.',
    satMathSynergy: 'A-Level Mathematics and Further Mathematics cover calculus, differential equations, and vectors far beyond the SAT. Students must practice SAT Desmos graphing hacks and avoid computational overthinking.',
    satRwSynergy: 'Strong if studying A-Level English Literature or History; students studying pure STEM (Math/Physics/Chemistry/Bio) often need targeted practice with US historical speeches and vocabulary-in-context.',
    recommendedExternalRigor: 'Students applying to US engineering or CS programs should ensure they take A-Level Further Mathematics if available at their school.'
  },
  {
    id: 'CBSE',
    name: 'Indian National Board: CBSE',
    tagline: 'Rigorous national STEM curriculum; heavily computational with high-stakes external board exams',
    nativeScale: 'Percentage out of 100% (or raw marks 0–100 per subject across 5 subjects)',
    reportingFormat: 'Percentage_100',
    structureAndAssessment: 'Strict stream segregation in Grade 11: Science (PCM/PCB), Commerce, or Humanities. Assessment is dominated by the All India Senior School Certificate Examination (AISSCE) in March of Grade 12, administered by the central board.',
    strengthsInAdmissions: [
      'Exceptional quantitative and computational rigor in Mathematics, Physics, and Chemistry.',
      'Admissions officers worldwide are intimately familiar with CBSE standards and benchmark raw percentages against top 1% percentiles.',
      'Strong performance in CBSE Class 10 Board exams provides an unimpeachable standardized verification of core knowledge.'
    ],
    mainPitfallsAndFriction: [
      'Internal Grade 9 and Grade 11 marks are heavily deflated by high schools to instill exam discipline; an 80% in Grade 11 can alarm students unaware that US colleges examine all 4 years.',
      'Little to no emphasis on critical argumentative essay writing, historical source analysis, or classroom seminar debate.',
      'Indian schools prioritize only the 10th and 12th external exams, leading to confusion when US colleges demand certified transcripts for Grades 9 and 11.'
    ],
    usEvaluationMethod: 'Holistic review conducted by dedicated South Asia admissions officers who understand school-specific grade deflation. An aggregate of 92%+ in Class 12 (and predicted) is competitive for Top-20 institutions.',
    ukEvaluationMethod: 'UK universities require specific Class 12 Board percentages (e.g., 90%–95% aggregate with 95% in Mathematics) as conditional entry requirements.',
    transcriptExpectations: 'MANDATORY 4-YEAR TRANSCRIPT: Certified Class 9 internal report, official Class 10 Board Certificate (AISSE), Class 11 internal report, and Class 12 Mid-Term / Predicted Board marks.',
    predictedGradesRisk: 'High for UK conditional offers. For US universities, offers are rarely rescinded unless final Class 12 board marks fall drastically (e.g., below 75% aggregate or failing a core subject).',
    satMathSynergy: 'CBSE students find the core mathematical concepts of the SAT straightforward. However, they frequently lose points on word-problem interpretation, phrasing traps, and pacing under the Digital SAT adaptive format.',
    satRwSynergy: 'Requires targeted preparation. CBSE English focuses on prescribed literature and formal business letters, rather than fast-paced critical reading of academic research papers and 19th-century speeches.',
    recommendedExternalRigor: 'External AP exams (AP Calculus BC, AP Physics C: Mechanics, AP Computer Science A) are highly recommended to provide external US validation of academic prowess.'
  },
  {
    id: 'CISCE',
    name: 'Indian National Board: CISCE (ICSE / ISC)',
    tagline: 'Distinguished Indian board combining rigorous STEM with intensive Shakespearean English literature',
    nativeScale: 'Percentage out of 100% (ICSE Class 10; ISC Class 12)',
    reportingFormat: 'Percentage_100',
    structureAndAssessment: 'Administered by the Council for the Indian School Certificate Examinations. Similar stream selection to CBSE for Grades 11–12, but with an internationally recognized, rigorous English literature and language curriculum based on classic texts.',
    strengthsInAdmissions: [
      'Superb English language foundation: ISC English requirements prepare students thoroughly for Western university reading demands.',
      'High computational rigor in STEM streams comparable to CBSE.',
      'Class 10 ICSE board exam is widely considered the most rigorous 10th-grade national exam in South Asia.'
    ],
    mainPitfallsAndFriction: [
      'Internal Class 11 grade deflation is notorious in top ICSE/ISC schools (grades often drop by 15–20% compared to Class 10).',
      'Heavy laboratory practical and project documentation demands consume significant time in the fall of Grade 12, conflicting with early college application deadlines.',
      'Students frequently fail to obtain official Class 9 transcripts until right before deadlines.'
    ],
    usEvaluationMethod: 'Admissions readers recognize ISC graduates as having stronger written English and analytical comprehension than many other national board applicants.',
    ukEvaluationMethod: 'Direct equivalence recognized by UCAS; conditional offers typically mandate 88%–95% across best 4 academic subjects with English and Mathematics.',
    transcriptExpectations: 'Class 9 school transcript, Class 10 ICSE official pass certificate & marksheet, Class 11 school transcript, and Class 12 school predicted score sheet signed by the Principal.',
    predictedGradesRisk: 'Strict for UK offers. Moderate for US schools.',
    satMathSynergy: 'Strong mathematical foundation; students excel on Algebra and Advanced Math modules.',
    satRwSynergy: 'Noticeably smoother transition to SAT Reading and Writing compared to other national curricula due to mandatory study of classic prose and poetry.',
    recommendedExternalRigor: 'AP Calculus BC and AP Micro/Macro Economics to expand business or quantitative credentials.'
  },
  {
    id: 'US_HighSchool',
    name: 'US High School Diploma + AP Exams',
    tagline: 'Credit-based modular system with 4.0 GPA and Advanced Placement college-level courses',
    nativeScale: '4.0 Unweighted GPA scale (or 5.0 Weighted for Honors/AP) with AP exam scores (1–5)',
    reportingFormat: 'GPA_4_Scale',
    structureAndAssessment: 'Modular credits accumulated across 4 years (English, Math, Science, Social Studies, Foreign Language, Electives). Coursework graded continuously through homework, quizzes, projects, and semester exams.',
    strengthsInAdmissions: [
      'Seamless alignment with the US holistic admissions process, Common App structures, and counselor reporting forms.',
      'AP scores of 4 or 5 provide undeniable, externally benchmarked proof of college-level mastery and earn direct college credits.',
      'Teachers are trained to write detailed, personal letters of recommendation and construct informative School Profiles.'
    ],
    mainPitfallsAndFriction: [
      'Outside of international or American schools, private candidates face high AP exam center surcharge fees ($200–$250 per exam).',
      'Significant variance in grading standards between different international American-style academies.',
      'UK universities will not accept a US high school diploma alone; they strictly demand 3 to 5 AP exam scores of 5 in relevant subjects.'
    ],
    usEvaluationMethod: 'Evaluated in direct comparison to peers at the same school, with heavy scrutiny of "course rigor" (taking the most demanding AP/Honors classes offered).',
    ukEvaluationMethod: 'UK universities require specific AP exam results: for example, Oxford requires at least three AP scores of 5 (or SAT 1480+ plus two AP 5s) in course-related subjects.',
    transcriptExpectations: 'Official high school transcript covering all 4 years with cumulative unweighted/weighted GPA and counselor School Profile.',
    predictedGradesRisk: 'Low for US admissions (unless grades drop to D or F in senior spring). High for UK conditional offers relying on May AP exam scores.',
    satMathSynergy: 'Curriculum maps 1:1 with SAT Math concepts.',
    satRwSynergy: '1:1 alignment with SAT Reading and Writing conventions.',
    recommendedExternalRigor: 'Max out the number of AP courses offered by your school in your target academic area (e.g., AP Calculus BC, AP Physics C, AP Chem, AP Lang).'
  },
  {
    id: 'French_Bac',
    name: 'French Baccalauréat (Bac Général)',
    tagline: 'Demanding French national system featuring rigorous philosophical analysis and specialized streams',
    nativeScale: '0 – 20 points (Grading is exceptionally strict; 16+ is "Mention Très Bien" / highest honors)',
    reportingFormat: 'Scale_20_Points',
    structureAndAssessment: 'Administered under the French Ministry of National Education. Grades 11 and 12 feature common core subjects (including Philosophy, French, Scientific Culture) and 2 or 3 intensive specialties (Spécialités) such as Mathematics, Physics-Chemistry, SES, or HGGSP.',
    strengthsInAdmissions: [
      'Worldwide reputation for rigorous philosophical reasoning, critical dissertation writing, and high mathematical standards.',
      'Admissions officers know that a 15/20 in the French Bac represents elite performance, not mediocre work.'
    ],
    mainPitfallsAndFriction: [
      'The GPA Conversion Disaster: students who divide their 14/20 by 5 arrive at a 2.8 GPA, which would utterly destroy their US admissions prospects! Never convert raw 20-point grades.',
      'French teachers are culturally reluctant to award grades above 16/20 or write effusive American-style recommendation letters.',
      'Requires certified English translations of Bulletins de Notes (transcripts) for every trimester.'
    ],
    usEvaluationMethod: 'Specialist readers evaluate on the French scale: 14–15 is considered roughly equivalent to a 3.7–3.9 US GPA; 16+ is a 4.0 equivalent.',
    ukEvaluationMethod: 'UCAS recognizes the French Baccalaureate directly: conditional offers typically demand an overall average of 14 to 16/20, with 15–17 in specific specialty subjects.',
    transcriptExpectations: 'Trimester report cards (Bulletins) for Seconde (Grade 10), Première (Grade 11), and Terminale (Grade 12), plus official Baccalauréat certificate.',
    predictedGradesRisk: 'Moderate for US; strict for UK/European conditional admission.',
    satMathSynergy: 'Spécialité Mathématique and Mathématiques Expertes prepare students brilliantly for quantitative problem solving.',
    satRwSynergy: 'Students must adapt to English-language timed reading passages and grammatical convention testing.',
    recommendedExternalRigor: 'TOEFL/IELTS to prove English fluency; AP exams are optional but helpful if applying to US Ivy/top institutions.'
  },
  {
    id: 'German_Abitur',
    name: 'German Abitur (Zeugnis der Allgemeinen Hochschulreife)',
    tagline: 'Comprehensive secondary certificate with in-depth advanced courses (Leistungskurse)',
    nativeScale: '1.0 to 6.0 scale (1.0 is the highest possible grade; 4.0 is minimum passing grade)',
    reportingFormat: 'German_1_to_6',
    structureAndAssessment: 'Two-year qualification phase in Gymnasiale Oberstufe (Grades 11–12 or 12–13). Students choose intensive Leistungskurse (advanced courses) and Grundkurse (basic courses), evaluated through cumulative course points and written/oral Abitur examinations.',
    strengthsInAdmissions: [
      'Exceptional depth and academic independence; recognized throughout Europe and North America as equivalent to freshman college coursework.',
      'Direct pathway to top public universities in Germany, Switzerland, and Austria.'
    ],
    mainPitfallsAndFriction: [
      'Inverted numerical scale: in Germany, 1.0 is best and 4.0 is passing. If entered into an automated US portal that expects 4.0 as the top grade, system errors can occur!',
      'Requires certified translations and official credential assessment for many North American public institutions.'
    ],
    usEvaluationMethod: 'Holistic review: an Abitur score between 1.0 and 1.3 is equivalent to a top-tier 4.0 GPA; 1.4–1.9 is equivalent to a 3.7–3.9 GPA.',
    ukEvaluationMethod: 'Directly accepted by UCAS: typical conditional offers range from 1.2 to 1.6 overall, with 13–15 points (out of 15) in relevant Leistungskurse.',
    transcriptExpectations: 'Semester reports for Halbjahr 1 to 4 of the Oberstufe, plus the official Abiturzeugnis certificate.',
    predictedGradesRisk: 'Standard conditional risk for UK universities.',
    satMathSynergy: 'Strong mathematical foundation from Leistungskurs Mathematik.',
    satRwSynergy: 'Requires practice with American idiomatic phrasing and rhetorical strategies.',
    recommendedExternalRigor: 'English proficiency certification (TOEFL 100+ or IELTS 7.5+) and optional AP exams for specialized engineering credits.'
  }
];

export interface MajorPrerequisiteRule {
  majorField: TargetMajorField;
  majorName: string;
  mandatoryHighSchoolCourses: string[];
  recommendedHighSchoolCourses: string[];
  curriculumSpecificNotes: {
    IBDP: string;
    A_Levels: string;
    CBSE_CISCE: string;
    US_HighSchool: string;
  };
  directEntryWarning: string;
  consequenceOfMissingPrerequisite: string;
}

export const MAJOR_PREREQUISITE_RULES: MajorPrerequisiteRule[] = [
  {
    majorField: 'Engineering_CS',
    majorName: 'Engineering & Computer Science',
    mandatoryHighSchoolCourses: ['Calculus / Advanced Mathematics', 'Physics'],
    recommendedHighSchoolCourses: ['Chemistry', 'Further Mathematics / Linear Algebra', 'Computer Programming'],
    curriculumSpecificNotes: {
      IBDP: 'MANDATORY: Math: Analysis & Approaches (AA) at Higher Level (HL) is non-negotiable for Imperial, Cambridge, and top US engineering programs. Physics at HL is strongly required.',
      A_Levels: 'MANDATORY: A-Level Mathematics PLUS Physics. Top UK programs (Imperial, Oxford, Edinburgh) explicitly require or strongly prefer A-Level Further Mathematics.',
      CBSE_CISCE: 'MANDATORY: Science Stream with PCM (Physics, Chemistry, Mathematics). Taking only Commerce with Math will disqualify you from most engineering direct admissions.',
      US_HighSchool: 'MANDATORY: AP Calculus BC (or AB at minimum) and AP Physics C: Mechanics. Taking regular/conceptual physics without calculus is a disadvantage at top technical schools.'
    },
    directEntryWarning: 'In the UK, Canada, and Europe, you CANNOT change your major to Engineering after arrival if you lack secondary school Calculus and Physics. Direct entry requirements are legally binding.',
    consequenceOfMissingPrerequisite: 'Your application will be rejected automatically in initial screening rounds at universities with direct-entry admission models (e.g. UCAS, Waterloo, TU Munich).'
  },
  {
    majorField: 'Business_Finance_Econ',
    majorName: 'Business, Finance & Quantitative Economics',
    mandatoryHighSchoolCourses: ['High-School Mathematics through Pre-Calculus or Calculus'],
    recommendedHighSchoolCourses: ['Microeconomics', 'Macroeconomics', 'Statistics', 'Accounting'],
    curriculumSpecificNotes: {
      IBDP: 'Math: Analysis & Approaches (AA) SL/HL or Math: Applications & Interpretation (AI) HL. Elite economics programs (LSE, Chicago, Wharton) reject AI SL due to lack of pure calculus.',
      A_Levels: 'A-Level Mathematics is required by almost all top economics and finance programs (e.g. LSE, Warwick, UCL). Economics A-Level is recommended but secondary to Mathematics.',
      CBSE_CISCE: 'Commerce stream WITH Mathematics, or Science stream. Opting for Commerce WITHOUT Mathematics limits university choices dramatically.',
      US_HighSchool: 'AP Calculus AB/BC, AP Statistics, and AP Micro/Macro Economics.'
    },
    directEntryWarning: 'Economics at European and British universities is heavily mathematical and quantitative, not descriptive. Math prerequisites are strictly enforced.',
    consequenceOfMissingPrerequisite: 'Inability to enroll in foundational econometrics and financial modeling courses.'
  },
  {
    majorField: 'PreMed_LifeSciences',
    majorName: 'Pre-Med, Biomedical & Life Sciences',
    mandatoryHighSchoolCourses: ['Chemistry', 'Biology'],
    recommendedHighSchoolCourses: ['Mathematics / Calculus', 'Physics'],
    curriculumSpecificNotes: {
      IBDP: 'MANDATORY: Chemistry HL AND Biology HL. This combination is universally required for direct-entry medical schools (UK, Australia) and top US pre-med tracks.',
      A_Levels: 'MANDATORY: Chemistry and Biology at full A-Level. Chemistry is universally compulsory for medicine.',
      CBSE_CISCE: 'MANDATORY: Science stream with PCB or PCMB (Physics, Chemistry, Biology, Mathematics).',
      US_HighSchool: 'AP Chemistry and AP Biology, with AP Calculus recommended.'
    },
    directEntryWarning: 'Direct-entry undergraduate Medicine (MBBS) in the UK/Australia/Singapore requires both Chemistry and Biology at the highest secondary level, plus external clinical aptitude exams (UCAT/BMAT).',
    consequenceOfMissingPrerequisite: 'Immediate rejection from direct medicine and biomedical tracks.'
  },
  {
    majorField: 'Humanities_SocialSciences',
    majorName: 'Humanities, Social Sciences, Law & Public Policy',
    mandatoryHighSchoolCourses: ['Advanced English Literature / Language', 'History or Social Science'],
    recommendedHighSchoolCourses: ['Foreign Languages', 'Economics', 'Philosophy / Theory of Knowledge'],
    curriculumSpecificNotes: {
      IBDP: 'English A: Literature or Language & Literature at HL; History or Global Politics at HL.',
      A_Levels: 'Essay-based A-Levels such as History, English Literature, Politics, or Economics.',
      CBSE_CISCE: 'Humanities stream with Political Science, History, Sociology, and Psychology; or any stream with exceptional English marks.',
      US_HighSchool: 'AP English Literature, AP English Language, AP US History, AP World History, AP Government.'
    },
    directEntryWarning: 'For direct-entry LLB Law in the UK (Oxford, UCL, King’s), exceptional critical reading and essay writing scores are required alongside the LNAT test.',
    consequenceOfMissingPrerequisite: 'Difficulty demonstrating the textual analytical stamina demanded by reading-intensive faculties.'
  },
  {
    majorField: 'Undeclared',
    majorName: 'Undeclared / Liberal Arts & Sciences',
    mandatoryHighSchoolCourses: ['4 Years of Mathematics', '4 Years of English', '3-4 Years of Science', '3-4 Years of Social Studies'],
    recommendedHighSchoolCourses: ['Foreign Language sequences', 'Interdisciplinary coursework'],
    curriculumSpecificNotes: {
      IBDP: 'The IB Diploma is the ideal preparation for undeclared entry due to its mandatory breadth across all 6 disciplines.',
      A_Levels: 'A-Level applicants must ensure they have taken diverse subjects if seeking broad US liberal arts admission.',
      CBSE_CISCE: 'Ensure you maintain English and general social awareness alongside your specialized stream.',
      US_HighSchool: 'Standard US college-preparatory curriculum with a balanced distribution of AP courses.'
    },
    directEntryWarning: 'Only US and select Canadian universities allow students to enter as truly "Undeclared". In the UK, Germany, and Singapore, every applicant must declare an exact single course upon application.',
    consequenceOfMissingPrerequisite: 'Limits your university applications to North American holistic liberal arts institutions.'
  }
];

export interface CredentialEvaluationService {
  name: string;
  shortCode: 'WES' | 'ECE' | 'SpanTran' | 'IEE';
  typicalTurnaroundWeeks: string;
  estimatedCostUSD: number;
  nacesAccredited: boolean;
  requiredBySampleColleges: string[];
  notRequiredByColleges: string[];
  keyAdvice: string;
}

export const CREDENTIAL_EVALUATION_SERVICES: CredentialEvaluationService[] = [
  {
    name: 'World Education Services (WES)',
    shortCode: 'WES',
    typicalTurnaroundWeeks: '4 – 6 weeks (plus mailing/courier time)',
    estimatedCostUSD: 240, // WES ICAP Course-by-Course evaluation
    nacesAccredited: true,
    requiredBySampleColleges: [
      'University of Texas at Dallas',
      'SUNY Buffalo',
      'University of Toronto (Graduate School)',
      'Ryerson / TMU',
      'Texas A&M University (select graduate programs)'
    ],
    notRequiredByColleges: [
      'Harvard University',
      'MIT',
      'Stanford University',
      'Yale University',
      'Columbia University',
      'UC Berkeley (all campuses do in-house evaluation)'
    ],
    keyAdvice: 'Start at least 8 weeks before deadlines! Your home institution/examination board must send official transcripts directly to WES in a sealed stamped envelope or via authorized electronic portal.'
  },
  {
    name: 'Educational Credential Evaluators (ECE)',
    shortCode: 'ECE',
    typicalTurnaroundWeeks: '3 – 5 weeks',
    estimatedCostUSD: 195,
    nacesAccredited: true,
    requiredBySampleColleges: [
      'University of Illinois Urbana-Champaign (UIUC - select programs)',
      'University of Wisconsin-Madison',
      'Purdue University (Graduate School)'
    ],
    notRequiredByColleges: [
      'All Ivy League undergraduate schools',
      'UCLA',
      'Georgia Tech'
    ],
    keyAdvice: 'Widely favored by midwestern US public universities. Ensure original language documents are accompanied by certified English translations.'
  },
  {
    name: 'SpanTran: The Evaluation Company',
    shortCode: 'SpanTran',
    typicalTurnaroundWeeks: '10 business days (custom fast-track available)',
    estimatedCostUSD: 180,
    nacesAccredited: true,
    requiredBySampleColleges: [
      'University of Houston',
      'Rutgers University',
      'Various community colleges and state universities'
    ],
    notRequiredByColleges: [
      'MIT',
      'Princeton',
      'Caltech'
    ],
    keyAdvice: 'Often provides customized application portals with institutional discounts for specific partner universities.'
  }
];
