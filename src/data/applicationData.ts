export interface ApplicationStage {
  stageNumber: number;
  timeframe: string;
  title: string;
  description: string;
  keyChecklist: string[];
  insiderTips: string;
  pitfallsToAvoid: string;
}

export interface CountryAdmissionProfile {
  id: string;
  country: string;
  flag: string;
  topIntakes: string[];
  averageTuitionUSD: string;
  averageLivingUSD: string;
  applicationPortal: string;
  satRequirement: string;
  englishReq: string;
  postStudyWorkVisa: string;
  partTimeWorkRules: string;
  studentVisaName: string;
  proofOfFundsEstimate: string;
  prPathwaySummary: string;
  popularUniversities: string[];
  uniqueAdvantages: string[];
}

export interface DocumentGuide {
  title: string;
  purpose: string;
  idealLength: string;
  coreComponents: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  sampleOutline: string[];
}

export const APPLICATION_STAGES: ApplicationStage[] = [
  {
    stageNumber: 1,
    timeframe: '18 - 14 Months Before Intake (Grade 11 / Pre-final Year)',
    title: 'Profile Building, Academics & Initial Discovery',
    description: 'Establish high academic GPA and curate 2-3 deep extracurricular spikes (leadership, research, community initiatives, hackathons, arts).',
    keyChecklist: [
      'Maintain peak GPA (admissions committees look heavily at 9th-11th grade upward trends).',
      'Take initial diagnostic practice tests for SAT and TOEFL to evaluate your baseline score.',
      'Build extracurricular depth: Lead a school club, conduct independent research, or win regional/national competitions.',
      'Research target degree majors, course curriculum, and target country systems (US liberal arts vs UK specialized single-subject).'
    ],
    insiderTips: 'Top US universities look for a "hook" or "spike"—being exceptional at one or two areas—rather than a generic well-rounded applicant with 10 shallow clubs.',
    pitfallsToAvoid: 'Joining 15 different clubs for one week each. Quality and demonstrated impact always triumph over quantity.'
  },
  {
    stageNumber: 2,
    timeframe: '14 - 10 Months Before Intake (Spring & Summer)',
    title: 'Standardized Exams & University Shortlisting',
    description: 'Sit for your SAT and TOEFL examinations. Develop a balanced college list of Reach, Target, and Safety institutions.',
    keyChecklist: [
      'Take official Digital SAT test (March, May, or June administration). Schedule retake for August/October if needed.',
      'Take the TOEFL iBT examination and ensure score reports are available.',
      'Draft a balanced 10-15 university list: 3-4 Reaches (<15% acceptance rate), 4-5 Targets (20-40%), 3-4 Safeties (>50%).',
      'Attend virtual university information sessions, contact student ambassadors on LinkedIn, and connect with faculty.'
    ],
    insiderTips: 'Take your SAT early so you have the option of a second attempt before application essay season starts in August.',
    pitfallsToAvoid: 'Applying to only Ivy League or ultra-selective schools without realistic targets and verified safeties where you would genuinely be happy.'
  },
  {
    stageNumber: 3,
    timeframe: '9 - 6 Months Before Intake (August - November)',
    title: 'Document Dossier & Early Applications',
    description: 'Craft high-impact Statements of Purpose (SOP), Common App essays, request Letters of Recommendation (LORs), and prepare financial forms.',
    keyChecklist: [
      'Write the primary personal statement (Common App 650 words / UCAS 4,000 characters). Complete 4-6 revisions.',
      'Request 2-3 academic Letters of Recommendation from teachers who know your work ethic and character intimately.',
      'Prepare university-specific supplemental essays (Why this college? Why this major? Community contribution).',
      'Submit Early Decision (ED - binding) or Early Action (EA - non-binding) applications by November 1 / November 15 deadlines.'
    ],
    insiderTips: 'Early Decision (ED) acceptance rates at many US universities are 2x to 3x higher than Regular Decision. Use your single ED slot strategically!',
    pitfallsToAvoid: 'Writing generic essays where you simply replace the college name. Mention specific professors, lab facilities, and distinct courses.'
  },
  {
    stageNumber: 4,
    timeframe: '5 - 3 Months Before Intake (December - January)',
    title: 'Regular Decision Submissions & Financial Aid',
    description: 'Finalize all Regular Decision (RD) applications, submit CSS Profile / institutional scholarship applications, and submit official transcripts.',
    keyChecklist: [
      'Submit all Regular Decision applications before January 1 - January 15 deadlines.',
      'Complete the CSS Profile and upload required tax returns and bank certificates for institutional financial aid.',
      'Ensure official test score reports (College Board SAT code & ETS TOEFL code) have been sent and verified by admissions portals.',
      'Submit mid-year senior grade reports via school counselor.'
    ],
    insiderTips: 'Regularly log into each university\'s applicant portal (Applicant Status Portal) to ensure no documents are flagged as missing.',
    pitfallsToAvoid: 'Waiting until 11:59 PM on the deadline day. Server crashes, payment gateway errors, and timezone confusion happen frequently.'
  },
  {
    stageNumber: 5,
    timeframe: '2 - 0 Months Before Intake (March - May)',
    title: 'Admissions Decisions, Offer Selection & Visa Filing',
    description: 'Review acceptance letters and financial aid packages, submit enrollment deposit by May 1 (National Candidates Reply Date), and initiate student visa filing.',
    keyChecklist: [
      'Compare financial aid awards and net price cost of attendance across your accepted colleges.',
      'Accept your final offer and pay the tuition enrollment deposit by May 1.',
      'Receive immigration certificate: Form I-20 (USA), CAS Letter (UK), LOA (Canada), or Zulassungsbescheid (Germany).',
      'Book your student visa interview appointment (F-1 / Subclass 500 / Study Permit) and pay SEVIS / Visa fees.',
      'Secure on-campus housing, arrange immunizations, and book international flight tickets.'
    ],
    insiderTips: 'You can politely negotiate financial aid with university financial aid offices if you have a competing offer from a similarly ranked school.',
    pitfallsToAvoid: 'Depositing at multiple universities simultaneously (double depositing). This is unethical and universities can rescind your admissions.'
  }
];

export const COUNTRY_PROFILES: CountryAdmissionProfile[] = [
  {
    id: 'usa',
    country: 'United States of America',
    flag: '🇺🇸',
    topIntakes: ['Fall (August/September) - Major', 'Spring (January) - Moderate'],
    averageTuitionUSD: '$25,000 - $65,000 / year (Public vs Private)',
    averageLivingUSD: '$12,000 - $22,000 / year',
    applicationPortal: 'Common App (over 1,000 colleges), Coalition App, UC Application (University of California system)',
    satRequirement: 'Widely required or test-optional (Top schools like MIT, Harvard, Stanford, Dartmouth, UT Austin require SAT)',
    englishReq: 'TOEFL iBT 80-105+ (or IELTS 6.5-7.5+ / Duolingo 115-135+)',
    postStudyWorkVisa: 'OPT (1 year) + 24-month STEM extension = Up to 3 full years of US work authorization',
    partTimeWorkRules: 'Up to 20 hours/week on-campus during academic terms; 40 hours/week during summer breaks',
    studentVisaName: 'F-1 Student Visa (Requires Form I-20 and SEVIS fee $350)',
    proofOfFundsEstimate: 'Minimum 1 full year tuition + living costs on Form I-20 ($45,000 - $85,000 USD)',
    prPathwaySummary: 'Employer-sponsored H-1B lottery leading to EB-2/EB-3 permanent residency (Green Card), or EB-1 extraordinary ability',
    popularUniversities: ['MIT', 'Stanford', 'Harvard', 'UC Berkeley', 'NYU', 'Georgia Tech', 'Purdue', 'Columbia', 'Michigan'],
    uniqueAdvantages: [
      'Unmatched flexibility: Undeclared major option for first 2 years and easy double-majoring',
      'Largest global research endowment and top venture capital ecosystems',
      'Extensive STEM OPT 36-month work authorization in Silicon Valley, NYC, Boston, and Austin'
    ]
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    flag: '🇬🇧',
    topIntakes: ['Autumn (September/October) - Primary'],
    averageTuitionUSD: '$18,000 - $45,000 / year (£15,000 - £38,000)',
    averageLivingUSD: '$12,000 - $18,000 / year (£10,000 - £15,000)',
    applicationPortal: 'UCAS (Universities and Colleges Admissions Service) - Maximum 5 choices on one application',
    satRequirement: 'Often accepted for US-curriculum students alongside AP exams (e.g. SAT 1400+ and 3-4 AP scores of 5)',
    englishReq: 'TOEFL iBT 88-110+ (Oxford/Cambridge require 110 with 25+ in all sections) or IELTS 6.5-7.5+',
    postStudyWorkVisa: 'Graduate Route Visa: 2 years for Bachelor/Master graduates (3 years for PhD)',
    partTimeWorkRules: 'Up to 20 hours/week during term time; full-time during official vacations',
    studentVisaName: 'UK Student Visa (Points-based system, requires CAS number and £490 fee)',
    proofOfFundsEstimate: 'Tuition fees + living costs (£1,483/month in London or £1,136/month outside London for up to 9 months)',
    prPathwaySummary: 'Graduate Route followed by Skilled Worker Visa sponsorship, eligible for Indefinite Leave to Remain (ILR) after 5 years',
    popularUniversities: ['Oxford', 'Cambridge', 'Imperial College London', 'UCL', 'LSE', 'Edinburgh', 'Manchester', 'King\'s College'],
    uniqueAdvantages: [
      'Shorter degree duration: 3-year Bachelor degrees and 1-year Master degrees (saves substantial tuition and living cost)',
      'Single-subject specialization right from Day 1 without extraneous general education distribution courses',
      'Universal application through UCAS allows streamlined submissions to 5 elite institutions'
    ]
  },
  {
    id: 'canada',
    country: 'Canada',
    flag: '🇨🇦',
    topIntakes: ['Fall (September) - Primary', 'Winter (January) - Secondary'],
    averageTuitionUSD: '$18,000 - $42,000 / year (CAD $25,000 - $55,000)',
    averageLivingUSD: '$15,000 - $20,000 / year (CAD $20,635 mandatory GIC requirement)',
    applicationPortal: 'OUAC (for Ontario universities like U of T, Waterloo) or direct university portals',
    satRequirement: 'Generally optional for high school students; strong Canadian/IB/CBSE/A-Level grades prioritized',
    englishReq: 'TOEFL iBT 86-100+ (Writing 22+) or IELTS 6.5-7.0+',
    postStudyWorkVisa: 'PGWP (Post-Graduation Work Permit): Up to 3 years open work permit upon graduation from eligible DLI programs',
    partTimeWorkRules: 'Up to 24 hours/week off-campus during academic sessions; full-time during scheduled breaks',
    studentVisaName: 'Canadian Study Permit (Requires Provincial Attestation Letter PAL and GIC account)',
    proofOfFundsEstimate: '1 year tuition + CAD $20,635 living funds deposited into a Canadian Guaranteed Investment Certificate (GIC)',
    prPathwaySummary: 'Express Entry (Canadian Experience Class) and Provincial Nominee Programs (PNP) award points for Canadian degrees',
    popularUniversities: ['University of Toronto', 'UBC', 'McGill University', 'Waterloo', 'McMaster', 'Alberta', 'Montreal'],
    uniqueAdvantages: [
      'World-famous Co-op programs (notably Waterloo) where students alternate 4 months of study with 4 months of paid tech/business work',
      'Post-Graduation Work Permit (PGWP) provides an open work permit not tied to a single employer',
      'Safe, welcoming multicultural society with high quality of life'
    ]
  },
  {
    id: 'germany',
    country: 'Germany & Continental Europe',
    flag: '🇩🇪',
    topIntakes: ['Winter Semester (October) - Primary', 'Summer Semester (April) - Secondary'],
    averageTuitionUSD: '$0 - $3,500 / year (Almost tuition-free at public universities! Nominal semester fee €150-€350)',
    averageLivingUSD: '$12,000 - $14,000 / year (€11,904 locked in German Blocked Account)',
    applicationPortal: 'Uni-Assist (centralized evaluation portal) or direct university portals',
    satRequirement: 'Accepted by some English-medium universities, but Abitur equivalency (High school diploma + entrance exam/13th year) is standard',
    englishReq: 'TOEFL iBT 80-95+ for English-taught programs; TestDaF/Goethe C1 for German-taught programs',
    postStudyWorkVisa: '18-month Job Seeker Visa post-graduation with full right to work',
    partTimeWorkRules: 'Up to 140 full days or 280 half days per calendar year',
    studentVisaName: 'German National Visa (Type D) - Requires Sperrkonto (Blocked Bank Account)',
    proofOfFundsEstimate: '€11,904 per year deposited into an official German Blocked Account (e.g. Expatrio, Coracle, Fintiba)',
    prPathwaySummary: 'EU Blue Card or German Permanent Residence permit achievable in as few as 21-24 months of qualified employment',
    popularUniversities: ['Technical University of Munich (TUM)', 'LMU Munich', 'Heidelberg University', 'RWTH Aachen', 'TU Berlin', 'Karlsruhe (KIT)'],
    uniqueAdvantages: [
      'Virtually zero tuition fees at world-renowned public universities in the heart of Europe',
      'Powerhouse engineering, automotive, industrial robotics, and physics research infrastructure',
      'Free travel within the 29 Schengen zone countries on a German student visa'
    ]
  },
  {
    id: 'australia',
    country: 'Australia',
    flag: '🇦🇺',
    topIntakes: ['Semester 1 (February/March) - Primary', 'Semester 2 (July/August) - Major'],
    averageTuitionUSD: '$20,000 - $38,000 / year (AUD $30,000 - $55,000)',
    averageLivingUSD: '$16,000 - $22,000 / year (AUD $29,710 government requirement)',
    applicationPortal: 'Direct application through university portal or certified international education agents (e.g. IDP)',
    satRequirement: 'Accepted by Group of Eight (Go8) universities for direct bachelor entry (typically 1250-1400+)',
    englishReq: 'TOEFL iBT 79-94+ or IELTS 6.5 (no band below 6.0) / PTE Academic 58-65',
    postStudyWorkVisa: 'Temporary Graduate Visa (Subclass 485): 2-4 years depending on degree level and regional campus study',
    partTimeWorkRules: 'Up to 48 hours per fortnight (2 weeks) during study sessions; unlimited during breaks',
    studentVisaName: 'Student Visa (Subclass 500) - Requires Confirmation of Enrolment (CoE) and OSHC health cover',
    proofOfFundsEstimate: '1 year tuition + AUD $29,710 living allowance + AUD $2,000 travel allowance',
    prPathwaySummary: 'Points-based Skilled Migration (Subclass 189 / 190 / 491) rewarding Australian study and regional residence',
    popularUniversities: ['University of Melbourne', 'University of Sydney', 'UNSW Sydney', 'ANU', 'Monash', 'UQ', 'Adelaide'],
    uniqueAdvantages: [
      'Group of Eight (Go8) research universities consistently ranked in top 50 worldwide',
      'High minimum wage for student jobs (over AUD $24/hr) helping offset living expenses',
      'Southern hemisphere academic calendar (February-November) aligns smoothly with international graduation cycles'
    ]
  }
];

export const SOP_MASTER_GUIDE: DocumentGuide = {
  title: 'Statement of Purpose (SOP) & Personal Statement',
  purpose: 'To demonstrate your intellectual curiosity, academic readiness, purpose, and why a specific university program is the catalyst for your career.',
  idealLength: '800 - 1,200 words (2 pages single-spaced) or 650 words for the Common App essay.',
  coreComponents: [
    'The Spark / Intellectual Origin: A concrete moment or problem that ignited your passion (avoid "Since childhood, I always loved computers").',
    'Academic & Practical Trajectory: Rigorous courses, research projects, design builds, or real-world internships showing sustained commitment.',
    'Overcoming an Obstacle: How you handled a setback, lab failure, or intellectual dilemma with resilience and self-reflection.',
    'Why This Program Specifically: Precise courses, faculty research labs, centers, and student organizations unique to this university.',
    'Long-Term Vision: Career trajectory (e.g. founder, researcher, policymaker) and the societal impact of your intended work.'
  ],
  dosAndDonts: {
    dos: [
      'Show, don\'t tell: Instead of saying "I am hardworking and passionate", describe staying up till 3 AM debugging an autonomous rover algorithm.',
      'Connect the dots: Explain how your past achievements naturally lead to your future graduate or undergraduate studies.',
      'Tailor the final 2 paragraphs deeply to each university: Name 2 professors whose recent papers you read and 1 campus club you will lead.',
      'Proofread meticulously for tone: Be confident, reflective, and humble, never arrogant or complaining.'
    ],
    donts: [
      'Do not write an expanded chronological resume listing every course and certificate you received.',
      'Do not quote Albert Einstein, Gandhi, or Steve Jobs in your opening sentence.',
      'Do not exaggerate or fabricate experiences; admissions officers verify credentials and cross-reference teacher LORs.',
      'Do not use generic praise: "University of X has great campus grounds, renowned professors, and diverse students."'
    ]
  },
  sampleOutline: [
    'Paragraph 1: Compelling hook centered around a specific intellectual question, engineering challenge, or scientific inquiry.',
    'Paragraph 2: Academic foundation—undergraduate courses, high school AP/IB achievements, and theoretical grounding.',
    'Paragraph 3: Practical execution—research paper, software repository, community venture, or thesis project.',
    'Paragraph 4: Career inflection point—why now? What specific knowledge gap or advanced skill requires this degree?',
    'Paragraph 5: Detailed university fit—professor names, research laboratories, curriculum electives, campus culture.',
    'Paragraph 6: Forward-looking conclusion—immediate post-graduation goals and broader impact.'
  ]
};

export const LOR_REQUEST_GUIDE = {
  title: 'Letter of Recommendation (LOR) Strategy',
  targetCount: '2 Academic Teachers (e.g., Math/Science + Humanities/English) + 1 Counselor/Employer recommendation',
  timing: 'Request 4 to 8 weeks before application deadlines',
  howToRequest: [
    'Schedule a 10-minute in-person meeting or write a polite, structured email explaining your college ambitions.',
    'Provide a "Brag Sheet" or Student Packet containing your resume, intended majors, list of colleges, and 2-3 specific memories from their class.',
    'Remind them of specific projects: "I loved when I presented our renewable energy grid model in your AP Physics class during Unit 4."',
    'Send a polite reminder 10 days before the submission deadline with direct submission links.'
  ]
};
