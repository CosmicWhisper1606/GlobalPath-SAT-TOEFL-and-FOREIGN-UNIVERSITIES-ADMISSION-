export interface MockField {
  label: string;
  fieldKey: string;
  placeholder: string;
  exampleValue: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'date';
  options?: string[];
  validationTip: string;
  isRequired: boolean;
  isMistakeProne?: boolean;
}

export interface VideoChapter {
  id: string;
  chapterNumber: number;
  title: string;
  durationSeconds: number;
  narration: string;
  screenMockupType:
    | 'common-app-profile'
    | 'common-app-education'
    | 'common-app-activities'
    | 'common-app-essay'
    | 'ds160-personal'
    | 'ds160-sevis'
    | 'ucas-courses'
    | 'ucas-statement'
    | 'uni-assist-documents'
    | 'css-profile-finances';
  mockFields: MockField[];
  mistakeCallout?: {
    title: string;
    explanation: string;
    solution: string;
  };
  proTip: string;
}

export interface FormVideoGuide {
  id: string;
  title: string;
  shortTitle: string;
  category: 'University Application' | 'Visa & Immigration' | 'Financial Aid & CSS' | 'Country-Specific Portals' | 'Document Prep';
  platform: string;
  targetAudience: string;
  totalDuration: string;
  thumbnailGradient: string;
  badge: string;
  overview: string;
  chapters: VideoChapter[];
  officialPortalUrl: string;
  requiredDocuments: string[];
}

export const FORM_VIDEO_GUIDES: FormVideoGuide[] = [
  // 1. Common Application Video Guide
  {
    id: 'common-app-masterclass',
    title: 'Common Application 2026–2028: Complete Step-by-Step Form Walkthrough',
    shortTitle: 'Common App 2026–2028',
    category: 'University Application',
    platform: 'Common App (commonapp.org)',
    targetAudience: 'All Undergraduate Applicants to 1,000+ US, Canadian & Global Universities',
    totalDuration: '18 min total (6 Chapters)',
    thumbnailGradient: 'from-amber-700 via-amber-900 to-stone-900',
    badge: 'Most Watched (Undergraduate)',
    overview: 'An AI-created visual walkthrough demonstrating every required section of the Common App: legal identity matching, high school grade scale reporting, standardized test self-reporting, mastering the 150-character activity constraints, and the FERPA confidentiality waiver.',
    officialPortalUrl: 'https://www.commonapp.org',
    requiredDocuments: [
      'Original International Passport (for exact name order)',
      'Official Secondary School Transcript (Grades 9–12 / Form 3–6)',
      'School Counselor Contact Details (Official Work Email)',
      'List of 10 Extracurricular Activities with hours/weeks',
      'Final 650-word Personal Statement'
    ],
    chapters: [
      {
        id: 'ca-ch1',
        chapterNumber: 1,
        title: 'Profile & Legal Name Identity (Passport Match)',
        durationSeconds: 150,
        narration: 'Welcome to Chapter 1. The number one reason international student files get delayed by university admissions offices is a discrepancy between their Common Application name and their international passport. In the Given Name field, type your legal first name exactly as printed on the machine-readable passport stripe. If your passport has no surname, or lists all names in a single line, consult the official guidance to avoid duplicate SEVIS identity records later during visa issuance.',
        screenMockupType: 'common-app-profile',
        mockFields: [
          {
            label: 'Legal First / Given Name',
            fieldKey: 'givenName',
            placeholder: 'e.g. Aarav / Mei / Olumide',
            exampleValue: 'Aarav',
            type: 'text',
            validationTip: 'Must match passport character-for-character. No nicknames or Anglicized abbreviations.',
            isRequired: true
          },
          {
            label: 'Legal Last / Family Name (Surname)',
            fieldKey: 'familyName',
            placeholder: 'e.g. Sharma / Chen / Adeleke',
            exampleValue: 'Sharma',
            type: 'text',
            validationTip: 'Crucial for College Board test report linking and I-20 generation.',
            isRequired: true
          },
          {
            label: 'Date of Birth (MM/DD/YYYY)',
            fieldKey: 'dob',
            placeholder: 'MM/DD/YYYY',
            exampleValue: '08/14/2008',
            type: 'date',
            validationTip: 'US date format: Month FIRST, then Day, then Year. Do not invert Month and Day!',
            isRequired: true,
            isMistakeProne: true
          },
          {
            label: 'Primary Citizenship Nation',
            fieldKey: 'citizenship',
            placeholder: 'Select country',
            exampleValue: 'India',
            type: 'select',
            options: ['India', 'China', 'Nigeria', 'Vietnam', 'Brazil', 'United Kingdom', 'Canada', 'Other Country'],
            validationTip: 'Dictates whether you need international financial affidavits and visa sponsorship.',
            isRequired: true
          }
        ],
        mistakeCallout: {
          title: 'Critical Date of Birth Inversion Warning',
          explanation: 'Most nations write Day/Month/Year (e.g., 14/08/2008), but the Common App strictly uses Month/Day/Year (08/14/2008). Inverting this will desync your SAT scores and trigger visa rejection.',
          solution: 'Double-check that the first two digits represent your BIRTH MONTH (01–12).'
        },
        proTip: 'Use a permanent personal email address (like Gmail or Proton) rather than a high school email that may be deactivated upon graduation.'
      },
      {
        id: 'ca-ch2',
        chapterNumber: 2,
        title: 'Education, Grading Scales & Class Rank',
        durationSeconds: 160,
        narration: 'In the Education tab, students frequently make the catastrophic mistake of trying to convert their national grading system into a US 4.0 GPA scale. The Common App instruction is crystal clear: report your grading scale exactly as your high school reports it. If your school uses 100 percentage points, select 100. If your school does not rank students, select None. University admissions officers possess regional evaluation specialists who recalculate your grades using your official school profile.',
        screenMockupType: 'common-app-education',
        mockFields: [
          {
            label: 'Grading Scale System',
            fieldKey: 'gradingScale',
            placeholder: 'Select scale',
            exampleValue: '100 (Percentage System)',
            type: 'select',
            options: ['100 (Percentage System)', '4.0 Scale', '7.0 (IB System)', 'Letter Grades (A-F)', 'Other System'],
            validationTip: 'Select what appears on your official physical grade sheet. Never self-convert to 4.0!',
            isRequired: true,
            isMistakeProne: true
          },
          {
            label: 'Cumulative GPA / Overall Percentage',
            fieldKey: 'cumulativeScore',
            placeholder: 'e.g. 94.2 or 3.92',
            exampleValue: '93.8',
            type: 'text',
            validationTip: 'Enter exact numerical value from your official school transcript.',
            isRequired: true
          },
          {
            label: 'GPA Weighting',
            fieldKey: 'weighting',
            placeholder: 'Select weighting',
            exampleValue: 'Unweighted',
            type: 'select',
            options: ['Unweighted', 'Weighted', 'None'],
            validationTip: 'Most international boards (CBSE, Cambridge A-Levels, WAEC) are unweighted.',
            isRequired: true
          },
          {
            label: 'Class Rank Reporting',
            fieldKey: 'classRank',
            placeholder: 'Select rank reporting',
            exampleValue: 'None (School does not calculate rank)',
            type: 'select',
            options: ['Exact Rank', 'Decile', 'Quintile', 'Quartile', 'None (School does not calculate rank)'],
            validationTip: 'Only report if your school explicitly publishes rank on the official transcript.',
            isRequired: true
          }
        ],
        mistakeCallout: {
          title: 'The GPA Self-Conversion Trap',
          explanation: 'Never use an online calculator to convert your CBSE 92% or Cambridge A*AA to 4.0. Admissions committees will mark your application as fraudulent or inaccurate.',
          solution: 'Choose your native grading scale (e.g. 100) and let the university admissions evaluation team handle regional conversions.'
        },
        proTip: 'Ensure your counselor uses their official school institutional email domain (e.g., name@school.edu.org) rather than a personal Yahoo or Gmail address.'
      },
      {
        id: 'ca-ch3',
        chapterNumber: 3,
        title: 'The 10 Activities: Mastering the 150-Character Limit',
        durationSeconds: 180,
        narration: 'The Activities section is where applications are won or lost. You have up to 10 slots, arranged in strict order of personal significance. Notice the severe constraints: 50 characters for your Position or Leadership role, 100 characters for the Organization name, and only 150 characters for the Activity Description. You must eliminate filler phrases like "I was responsible for" or "I helped to". Instead, lead with punchy past-tense active verbs, quantify your impact with numbers, and highlight tangible outcomes.',
        screenMockupType: 'common-app-activities',
        mockFields: [
          {
            label: 'Activity Type',
            fieldKey: 'actType',
            placeholder: 'Select type',
            exampleValue: 'Science / Math / Research',
            type: 'select',
            options: ['Science / Math / Research', 'Community Service (Volunteer)', 'Computer / Technology', 'Athletics / Sports', 'Music / Arts', 'Student Government', 'Family Responsibilities'],
            validationTip: 'Group related pursuits or elevate your primary spike activity to Slot 1.',
            isRequired: true
          },
          {
            label: 'Position / Leadership Role (Max 50 Characters)',
            fieldKey: 'actRole',
            placeholder: 'Max 50 chars',
            exampleValue: 'Lead Researcher & Co-Founder',
            type: 'text',
            validationTip: 'Be specific. Use titles that convey initiative and authority.',
            isRequired: true
          },
          {
            label: 'Organization Name (Max 100 Characters)',
            fieldKey: 'actOrg',
            placeholder: 'Max 100 chars',
            exampleValue: 'Regional Clean Water Initiative & High School STEM Club',
            type: 'text',
            validationTip: 'State the name of the lab, school club, non-profit, or independent venture.',
            isRequired: true
          },
          {
            label: 'Activity Description & Impact (STRICT 150 CHAR LIMIT)',
            fieldKey: 'actDesc',
            placeholder: 'Max 150 chars: Action verb + metric + outcome',
            exampleValue: 'Engineered low-cost filtration device; deployed across 4 rural clinics; trained 60 health workers; published paper in peer-reviewed youth journal.',
            type: 'textarea',
            validationTip: 'Every character counts! Semicolons save space. Quantify with exact metrics (clinics, people, dollars).',
            isRequired: true,
            isMistakeProne: true
          },
          {
            label: 'Timing & Participation Hours',
            fieldKey: 'actTiming',
            placeholder: 'e.g. 6 hrs/week, 36 weeks/year',
            exampleValue: '8 hrs/wk, 40 wks/yr (Grades 10, 11, 12)',
            type: 'text',
            validationTip: 'Be realistic. Total weekly hours across 10 activities cannot exceed 40–50 hours/week during school.',
            isRequired: true
          }
        ],
        mistakeCallout: {
          title: 'Passive Voice & Wasted Character Space',
          explanation: 'Writing "I was responsible for organizing meetings and helping my peers learn science" wastes 72 characters with zero evidence of leadership or measurable outcomes.',
          solution: 'Rewrite as: "Organized 24 weekly workshops; mentored 45 students; boosted regional Olympiad pass rate by 35%." (97 characters).'
        },
        proTip: 'If family responsibilities (caring for siblings, elderly relatives, or working in a family business) took substantial time, list them! Colleges deeply value family contribution.'
      },
      {
        id: 'ca-ch4',
        chapterNumber: 4,
        title: 'Personal Essay & Recommender FERPA Waiver',
        durationSeconds: 170,
        narration: 'Under the Recommenders & FERPA tab, you will encounter the Family Educational Rights and Privacy Act waiver. You will be asked: Do you waive your right to review all recommendations and supporting documents? You must click "YES, I waive my right". If an applicant refuses to waive their right, admissions officers and high school teachers know you might inspect their letters, which instantly destroys the credibility and candidness of your recommendations.',
        screenMockupType: 'common-app-essay',
        mockFields: [
          {
            label: 'FERPA Confidentiality Waiver Decision',
            fieldKey: 'ferpaWaiver',
            placeholder: 'Select decision',
            exampleValue: 'Yes, I waive my right to review recommendations',
            type: 'select',
            options: ['Yes, I waive my right to review recommendations (STRONGLY RECOMMENDED)', 'No, I do NOT waive my right'],
            validationTip: 'Always select YES. Selecting NO triggers severe red flags for admissions officers.',
            isRequired: true,
            isMistakeProne: true
          },
          {
            label: 'Common App Personal Essay Word Count (250–650 Words)',
            fieldKey: 'essayWordCount',
            placeholder: 'Target 550–640 words',
            exampleValue: '624 words',
            type: 'text',
            validationTip: 'Sweet spot is 580–630 words. Under 500 words looks rushed; over 650 words is hard-blocked.',
            isRequired: true
          },
          {
            label: 'Selected Essay Prompt',
            fieldKey: 'essayPrompt',
            placeholder: 'Select 1 of 7 prompts',
            exampleValue: 'Prompt 7: Topic of your choice',
            type: 'select',
            options: [
              'Prompt 1: Background, identity, or interest',
              'Prompt 2: Obstacle, challenge, or failure',
              'Prompt 3: Questioned or challenged a belief',
              'Prompt 4: Reflect on something that sparked gratitude',
              'Prompt 5: Accomplishment, event, or realization',
              'Prompt 6: Topic or concept that makes you lose track of time',
              'Prompt 7: Topic of your choice'
            ],
            validationTip: 'All prompts are valued equally. What matters is your personal voice, reflection, and intellectual vitality.',
            isRequired: true
          }
        ],
        mistakeCallout: {
          title: 'Never Refuse the FERPA Waiver',
          explanation: 'Selecting "No, I do not waive my right" implies that you do not trust your teachers or that they cannot write an honest appraisal. Many teachers will refuse to submit letters.',
          solution: 'Check the box waiving your rights, and thank your recommenders in advance.'
        },
        proTip: 'Paste your essay from plain text (Notepad or TextEdit) rather than Google Docs to prevent weird formatting bugs or lost paragraph breaks in the Common App preview.'
      }
    ]
  },

  // 2. DS-160 US Visa Form Guide
  {
    id: 'ds160-visa-walkthrough',
    title: 'DS-160 US F-1 Student Visa: Field-by-Field Video Guide',
    shortTitle: 'DS-160 US Student Visa',
    category: 'Visa & Immigration',
    platform: 'US Dept of State CEAC (ceac.state.gov)',
    targetAudience: 'All International Students Admitted to US Colleges Needing an F-1 Visa',
    totalDuration: '22 min total (5 Chapters)',
    thumbnailGradient: 'from-blue-900 via-indigo-950 to-stone-900',
    badge: 'Crucial for Visa Approval',
    overview: 'Step-by-step AI video walkthrough showing exactly how to fill out the online DS-160 nonimmigrant visa application without errors: saving your Application ID, extracting SEVIS information from your Form I-20, listing US points of contact, and preparing for the consular interview.',
    officialPortalUrl: 'https://ceac.state.gov/genniv/',
    requiredDocuments: [
      'Original Form I-20 signed by your Designated School Official (DSO)',
      'SEVIS I-901 Payment Receipt ($350)',
      'Valid International Passport (valid for at least 6 months beyond stay)',
      'Digital Visa Photo (2x2 inches / 600x600 px white background)',
      '5-Year International Travel & Residence History'
    ],
    chapters: [
      {
        id: 'ds-ch1',
        chapterNumber: 1,
        title: 'Starting the Application & Saving your Application ID',
        durationSeconds: 140,
        narration: 'When initiating your DS-160 on the official CEAC portal, the very first screen displays a 10-character Application ID beginning with AA followed by numbers and letters. You must immediately take a photograph or write down this Application ID and answer your security question. The CEAC portal is notorious for timing out after 20 minutes of inactivity; without your Application ID and mother’s maiden name or chosen security answer, you will lose all entered data and must start completely from scratch.',
        screenMockupType: 'ds160-personal',
        mockFields: [
          {
            label: 'Consular Post / Interview Location',
            fieldKey: 'consularLocation',
            placeholder: 'Select embassy/consulate',
            exampleValue: 'New Delhi, India / London, UK / Lagos, Nigeria',
            type: 'select',
            options: ['India - New Delhi', 'India - Mumbai', 'Nigeria - Abuja', 'Nigeria - Lagos', 'UK - London', 'Vietnam - Hanoi', 'China - Beijing'],
            validationTip: 'Select the embassy or consulate where you will attend your in-person biometric and visa interview.',
            isRequired: true
          },
          {
            label: 'Application ID (AA00XXXXXX)',
            fieldKey: 'appId',
            placeholder: 'Auto-generated code',
            exampleValue: 'AA00B9X7K2',
            type: 'text',
            validationTip: 'Save this code immediately! You will need it to retrieve your application.',
            isRequired: true
          },
          {
            label: 'Security Question & Answer',
            fieldKey: 'secAnswer',
            placeholder: 'e.g. Mother’s mother maiden name',
            exampleValue: 'Patel',
            type: 'text',
            validationTip: 'Case-sensitive! Save the exact spelling you use.',
            isRequired: true
          }
        ],
        mistakeCallout: {
          title: 'Session Timeout Data Loss',
          explanation: 'The CEAC server frequently crashes or resets after 15–20 minutes without warning.',
          solution: 'Click the "SAVE" button at the bottom of EVERY single page before proceeding to the next section.'
        },
        proTip: 'Print or export the application summary to a local PDF file at every major checkpoint.'
      },
      {
        id: 'ds-ch2',
        chapterNumber: 2,
        title: 'Travel Purpose, SEVIS ID & School Code Matching',
        durationSeconds: 180,
        narration: 'In the Travel and Student Information sections, you must synchronize your answers directly with your physical Form I-20. Under Purpose of Trip, select Academic or Language Student (F-1). Next, locate your SEVIS ID printed on the top right of your Form I-20; it starts with an N followed by 10 digits. In the School Information field, enter the exact School Code printed in Section 2 of your I-20, as well as the name and phone number of your Designated School Official. Even a single transposed digit between your DS-160 and your I-20 will cause automatic rejection at the consulate.',
        screenMockupType: 'ds160-sevis',
        mockFields: [
          {
            label: 'Visa Class Category',
            fieldKey: 'visaClass',
            placeholder: 'Select category',
            exampleValue: 'Academic or Language Student (F-1)',
            type: 'select',
            options: ['Academic or Language Student (F-1)', 'Exchange Visitor (J-1)', 'Vocational Student (M-1)'],
            validationTip: 'Standard degree-seeking university students require F-1.',
            isRequired: true
          },
          {
            label: 'SEVIS Number (N00XXXXXXXX)',
            fieldKey: 'sevisNum',
            placeholder: 'Starts with N followed by 10 digits',
            exampleValue: 'N0038491204',
            type: 'text',
            validationTip: 'Found in the top right corner of your Form I-20 above the barcode.',
            isRequired: true,
            isMistakeProne: true
          },
          {
            label: 'School Code (e.g. NYC214F00123000)',
            fieldKey: 'schoolCode',
            placeholder: 'From Section 2 of Form I-20',
            exampleValue: 'BOS214F00582000',
            type: 'text',
            validationTip: 'Must match your specific university campus code on the I-20.',
            isRequired: true
          },
          {
            label: 'US Point of Contact (Designated School Official DSO)',
            fieldKey: 'dsoName',
            placeholder: 'DSO Name & Title from I-20',
            exampleValue: 'Sarah Jenkins, International Student Advisor',
            type: 'text',
            validationTip: 'Enter the DSO contact listed on page 1 of your Form I-20.',
            isRequired: true
          }
        ],
        mistakeCallout: {
          title: 'Mismatching SEVIS ID on DS-160 vs. I-901 Receipt',
          explanation: 'If you paid your $350 SEVIS fee for University A, but decided to attend University B, your SEVIS number might differ. Your DS-160 must match the university you actually intend to attend.',
          solution: 'Request a SEVIS fee transfer on fmjfee.com before submitting DS-160 if you switched schools.'
        },
        proTip: 'Under "Person/Entity Paying for Your Trip", if your parents are sponsoring you, enter "Father" or "Mother" with their full home address, and have their bank statements ready for the interview.'
      }
    ]
  },

  // 3. UK UCAS Application Guide
  {
    id: 'ucas-uk-walkthrough',
    title: 'UK UCAS 2027/2028: Course Selection & 4,000-Char Personal Statement',
    shortTitle: 'UK UCAS 2027/2028 Guide',
    category: 'University Application',
    platform: 'UCAS Hub (ucas.com)',
    targetAudience: 'Students applying to Oxford, Cambridge, Imperial, UCL, LSE & UK Universities',
    totalDuration: '16 min total (4 Chapters)',
    thumbnailGradient: 'from-emerald-800 via-teal-950 to-stone-900',
    badge: 'UK Admissions Essential',
    overview: 'Comprehensive AI walkthrough of the British UCAS system: understanding the 5 course choice limit, the October 15 Oxbridge deadline vs. January equal consideration, and writing a strictly academic 4,000-character personal statement.',
    officialPortalUrl: 'https://www.ucas.com',
    requiredDocuments: [
      'High School Predicted Grades from your school',
      'One Academic Teacher Reference (Referee email)',
      '4,000-character Personal Statement (Max 47 lines)',
      'Passport & International Fee Status details'
    ],
    chapters: [
      {
        id: 'ucas-ch1',
        chapterNumber: 1,
        title: 'The 5 Course Choices Strategy',
        durationSeconds: 150,
        narration: 'Under the British UCAS system, you are permitted a maximum of 5 course choices. Unlike the American system where you apply to the college as an undecided major, in the UK you apply directly to a specific academic department. Furthermore, you cannot apply to both Oxford and Cambridge in the same admissions cycle. Your 5 choices receive an identical copy of your single Personal Statement, meaning all 5 courses must be closely related in academic discipline.',
        screenMockupType: 'ucas-courses',
        mockFields: [
          {
            label: 'Choice 1: Reach University & Course',
            fieldKey: 'choice1',
            placeholder: 'e.g. University of Oxford - BA Philosophy, Politics & Economics (PPE)',
            exampleValue: 'Imperial College London - BEng Computing',
            type: 'text',
            validationTip: 'Ensure your predicted grades meet or exceed the published entry tariff (e.g. A*A*A).',
            isRequired: true
          },
          {
            label: 'Choice 2: Target / Match University',
            fieldKey: 'choice2',
            placeholder: 'e.g. University of Edinburgh - BSc Computer Science',
            exampleValue: 'University of Edinburgh - BSc Computer Science',
            type: 'text',
            validationTip: 'Strong global reputation with competitive but attainable offer requirements.',
            isRequired: true
          },
          {
            label: 'Choice 3: Safety / Insurance Option',
            fieldKey: 'choice3',
            placeholder: 'e.g. University of Manchester / Bristol',
            exampleValue: 'University of Bristol - BSc Computer Science',
            type: 'text',
            validationTip: 'Entry requirements comfortably below your top predicted marks.',
            isRequired: true
          }
        ],
        mistakeCallout: {
          title: 'Applying to Divergent Subjects',
          explanation: 'Applying for Economics at LSE and Mechanical Engineering at Imperial with the same personal statement will lead to rejection from both, as your statement cannot demonstrate depth in two unrelated fields.',
          solution: 'Choose one unified academic focus across all 5 choices.'
        },
        proTip: 'Remember the strict deadline: October 15 for Oxford, Cambridge, and medicine/veterinary courses; late January for all other UK courses.'
      },
      {
        id: 'ucas-ch2',
        chapterNumber: 2,
        title: 'The 4,000-Character Personal Statement (Academic Focus)',
        durationSeconds: 175,
        narration: 'The British Personal Statement is fundamentally different from the American storytelling essay. UK admissions tutors do not want childhood anecdotes or dramatic stories of overcoming adversity. They want 75 to 80 percent focused on supra-curricular academic exploration: what books have you read outside class? What academic journals, research projects, podcasts, or university open lectures have you engaged with? And you are strictly constrained to 4,000 characters AND 47 lines.',
        screenMockupType: 'ucas-statement',
        mockFields: [
          {
            label: 'Personal Statement Text Box (Max 4,000 characters & 47 lines)',
            fieldKey: 'ucasText',
            placeholder: 'Paste your academic statement here...',
            exampleValue: 'My fascination with computational complexity began while exploring deterministic finite automata in Sipser’s "Introduction to the Theory of Computation"...',
            type: 'textarea',
            validationTip: 'Must not exceed 4,000 characters (including spaces) OR 47 lines in the UCAS preview box.',
            isRequired: true,
            isMistakeProne: true
          },
          {
            label: 'Supra-Curricular Ratio Target',
            fieldKey: 'academicRatio',
            placeholder: '75-80% Academic / 20% Extracurricular',
            exampleValue: '80% Academic Subject Exploration',
            type: 'text',
            validationTip: 'UK tutors prioritize academic intellectual commitment over casual hobbies.',
            isRequired: true
          }
        ],
        mistakeCallout: {
          title: 'The Line Count Trap',
          explanation: 'Even if your essay is only 3,500 characters, if you use double blank lines between paragraphs, you will exceed the 47-line limit and UCAS will cut off your concluding sentences.',
          solution: 'Use single line breaks and check line count in the live UCAS preview screen.'
        },
        proTip: 'Never mention any university by name! Your statement is read simultaneously by all 5 universities.'
      }
    ]
  },

  // 4. Germany Uni-Assist & APS
  {
    id: 'germany-uniassist-aps',
    title: 'Germany Uni-Assist VPD & APS Certificate Procedure Guide',
    shortTitle: 'Germany Uni-Assist & APS',
    category: 'Country-Specific Portals',
    platform: 'Uni-Assist e.V. (uni-assist.de) & APS',
    targetAudience: 'Students applying to German Public Universities (TUM, LMU, Heidelberg, RWTH Aachen)',
    totalDuration: '15 min total (3 Chapters)',
    thumbnailGradient: 'from-amber-600 via-rose-950 to-stone-900',
    badge: 'Tuition-Free Education',
    overview: 'Essential walkthrough for zero-tuition German public universities: how to apply for the mandatory APS Certificate, submit documents for Uni-Assist Vorprüfungsdokumentation (VPD), and establish your official Blocked Bank Account (€11,904).',
    officialPortalUrl: 'https://www.uni-assist.de',
    requiredDocuments: [
      'Original APS Certificate (Mandatory for India, China, Vietnam)',
      'Officially Notarized & Certified Copies of High School Certificates',
      'Certified German or English Sworn Translations',
      'Proof of German (TestDaF/Goethe) or English (TOEFL/IELTS) Proficiency',
      'Blocked Account Confirmation (Sperrkonto proof)'
    ],
    chapters: [
      {
        id: 'de-ch1',
        chapterNumber: 1,
        title: 'APS Certificate: Mandatory First Step',
        durationSeconds: 140,
        narration: 'For applicants from India, China, and Vietnam, German law mandates an Academic Evaluation Centre (APS) verification certificate before any German university or embassy can process your file. You must register on the official APS portal, pay the verification fee, mail physical certified copies of your school transcripts, and obtain the digital cryptographic verification document. Without your APS certificate, your German study visa application cannot be lodged.',
        screenMockupType: 'uni-assist-documents',
        mockFields: [
          {
            label: 'Applicant Origin Country for APS',
            fieldKey: 'apsCountry',
            placeholder: 'Select country',
            exampleValue: 'India / China / Vietnam',
            type: 'select',
            options: ['India', 'China', 'Vietnam', 'Other Country (APS Not Required)'],
            validationTip: 'APS is legally required for Indian, Chinese, and Vietnamese academic credentials.',
            isRequired: true
          },
          {
            label: 'Aps Certificate Verification Number',
            fieldKey: 'apsNumber',
            placeholder: 'e.g. APS-IN-2026-XXXXX',
            exampleValue: 'APS-IN-2026-89412',
            type: 'text',
            validationTip: 'Digitally signed certificate issued after transcript authenticity verification.',
            isRequired: true
          }
        ],
        mistakeCallout: {
          title: 'Starting APS Too Late',
          explanation: 'APS verification can take 4 to 8 weeks during peak summer months.',
          solution: 'Initiate your APS verification in January or February of your final school year.'
        },
        proTip: 'Check the Anabin database beforehand to verify whether your high school qualification grants Direct General Admission or requires a one-year Studienkolleg foundation.'
      }
    ]
  },

  // 5. CSS Profile & Financial Aid
  {
    id: 'css-profile-financial-aid',
    title: 'CSS Profile & International Student Financial Aid (ISFAA) Guide',
    shortTitle: 'CSS Profile Financial Aid',
    category: 'Financial Aid & CSS',
    platform: 'College Board CSS Profile (cssprofile.collegeboard.org)',
    targetAudience: 'International Students Seeking Need-Based Financial Aid from US Colleges',
    totalDuration: '19 min total (4 Chapters)',
    thumbnailGradient: 'from-amber-800 via-orange-950 to-stone-900',
    badge: 'Full-Ride & Aid Focus',
    overview: 'AI walkthrough for unlocking up to $85,000/year in need-based aid: translating parental income, national tax slips, reporting currency values, non-custodial parent waivers, and filling the International Student Financial Aid Application (ISFAA).',
    officialPortalUrl: 'https://cssprofile.collegeboard.org',
    requiredDocuments: [
      'Parental Income Tax Returns (Translated into English)',
      'Annual Bank Statement Summaries & Proof of Liquid Assets',
      'Documentation of Medical Expenses or Unusual Financial Hardship',
      'Home Value & Mortgage Documentation (if homeowners)'
    ],
    chapters: [
      {
        id: 'css-ch1',
        chapterNumber: 1,
        title: 'Currency Selection & Income Reporting',
        durationSeconds: 160,
        narration: 'Under the CSS Profile for international students, you must report all monetary values in your family’s national local currency. Do not convert the numbers into US Dollars unless the form explicitly instructs you to do so, because the College Board applies an official standardized daily exchange rate. Enter your parent’s gross taxed and untaxed earnings directly from official government tax assessments or employer wage slips.',
        screenMockupType: 'css-profile-finances',
        mockFields: [
          {
            label: 'Local Currency Code',
            fieldKey: 'currencyCode',
            placeholder: 'Select currency',
            exampleValue: 'INR (Indian Rupee) / NGN (Nigerian Naira) / CNY (Chinese Yuan)',
            type: 'select',
            options: ['INR - Indian Rupee', 'NGN - Nigerian Naira', 'CNY - Chinese Yuan', 'GBP - British Pound', 'EUR - Euro', 'BRL - Brazilian Real'],
            validationTip: 'Report values in native local currency. College Board applies standard conversions.',
            isRequired: true,
            isMistakeProne: true
          },
          {
            label: 'Parent 1 Total Annual Gross Earnings',
            fieldKey: 'parent1Income',
            placeholder: 'In local currency',
            exampleValue: '1,200,000 INR',
            type: 'text',
            validationTip: 'Must match official tax returns (e.g. Form 16 / ITR in India, P60 in UK).',
            isRequired: true
          },
          {
            label: 'Family Annual Educational Contribution Estimate',
            fieldKey: 'expectedContribution',
            placeholder: 'Realistic annual USD budget',
            exampleValue: '$8,000 USD / year',
            type: 'text',
            validationTip: 'Be honest and realistic. Overstating will result in an unaffordable financial aid package.',
            isRequired: true
          }
        ],
        mistakeCallout: {
          title: 'Manual USD Currency Conversion Error',
          explanation: 'If your family earns 1,500,000 INR and you type 1,500,000 thinking it is in Rupees, but leave the form set to USD, the system will believe your family earns $1.5 Million USD annually and will award ZERO aid!',
          solution: 'Confirm the currency symbol on every financial reporting screen.'
        },
        proTip: 'Use the IDOC (Institutional Documentation Service) portal to upload English-translated copies of your family’s official tax filings promptly after submitting CSS Profile.'
      }
    ]
  }
];

// Comprehensive Everything Knowledge Base Categories
export interface EverythingTopic {
  id: string;
  category: string;
  title: string;
  summary: string;
  recommendedAction: string;
  portalOrResource: string;
  tags: string[];
}

export const EVERYTHING_KNOWLEDGE_TOPICS: EverythingTopic[] = [
  {
    id: 'topic-wes-eval',
    category: 'Document Preparation',
    title: 'WES (World Education Services) & Credential Evaluation',
    summary: 'Many universities in the United States and Canada require a course-by-course evaluation of your secondary or post-secondary school transcripts. WES authenticates your school documents directly from the issuing examination board and produces an equivalent US GPA and credit conversion report.',
    recommendedAction: 'Create a WES account 3–4 months prior to application deadlines. Request your national exam board (e.g. CBSE, ICSE, WAEC, Cambridge) to send electronic transcripts directly through the secure WES digital portal.',
    portalOrResource: 'https://www.wes.org',
    tags: ['WES', 'Credential Evaluation', 'GPA Conversion', 'Transcripts']
  },
  {
    id: 'topic-blocked-account',
    category: 'Financial Planning',
    title: 'German Blocked Account (Sperrkonto) Setup (€11,904/Year)',
    summary: 'To obtain a German Student Visa, non-EU students must prove financial self-sufficiency by depositing a legally mandated sum (currently €11,904 for one academic year) into an approved German blocked account. The funds are disbursed monthly in €992 installments to cover living expenses.',
    recommendedAction: 'Open an account through federal foreign office-approved providers such as Fintiba, Expatrio, or Coracle as soon as you receive your university admission letter or Studienkolleg confirmation.',
    portalOrResource: 'https://www.expatrio.com / https://www.fintiba.com',
    tags: ['Germany', 'Blocked Account', 'Sperrkonto', 'Fintiba', 'Expatrio']
  },
  {
    id: 'topic-gic-canada',
    category: 'Financial Planning',
    title: 'Canada Guaranteed Investment Certificate (GIC)',
    summary: 'International students applying for a Canadian Study Permit must purchase a Guaranteed Investment Certificate (GIC) from a designated Canadian bank (Scotiabank, CIBC, RBC) to prove they have adequate funds to support themselves during their first year in Canada.',
    recommendedAction: 'Transfer the required maintenance amount (currently $20,635 CAD plus bank administrative fees). Retain the digital Investment Confirmation certificate for your IRCC visa upload.',
    portalOrResource: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
    tags: ['Canada', 'GIC', 'Study Permit', 'Proof of Funds', 'IRCC']
  },
  {
    id: 'topic-sevis-fee',
    category: 'Visa & Immigration',
    title: 'SEVIS I-901 Fee Payment ($350 for F-1 / $220 for J-1)',
    summary: 'The US Department of Homeland Security requires all international students to pay the mandatory Student and Exchange Visitor Information System (SEVIS) fee before scheduling their visa appointment at the US Embassy or Consulate.',
    recommendedAction: 'Pay exclusively at fmjfee.com using the SEVIS ID printed on your Form I-20 and the exact School Code. Print the formal confirmation receipt; it is checked at the embassy gate.',
    portalOrResource: 'https://www.fmjfee.com',
    tags: ['US Visa', 'SEVIS I-901', 'Form I-20', 'Embassy Checklist']
  },
  {
    id: 'topic-cas-uk',
    category: 'Visa & Immigration',
    title: 'UK Confirmation of Acceptance for Studies (CAS)',
    summary: 'Your UK university issues an electronic CAS number once you have met all academic and English conditions and paid your initial tuition deposit. Your CAS contains your unique reference number, sponsor license, and fees paid.',
    recommendedAction: 'Check your CAS draft document with extreme care: verify that your passport number, name spelling, course title, and tuition deposit balance are 100% accurate before the university issues the final certificate.',
    portalOrResource: 'https://www.gov.uk/student-visa',
    tags: ['UK Visa', 'CAS', 'Tuition Deposit', 'Home Office']
  },
  {
    id: 'topic-health-insurance',
    category: 'Pre-Departure & Campus Life',
    title: 'International Student Health Insurance (US SHIP, UK IHS, German Gesetzliche)',
    summary: 'Healthcare abroad is mandatory and expensive. The UK charges the Immigration Health Surcharge (IHS, ~£776/year) granting full NHS access. Germany requires statutory public health insurance (TK, AOK, ~€125/month). In the US, universities automatically enroll students in a Student Health Insurance Plan ($2,000–$4,000/year).',
    recommendedAction: 'Budget for health insurance in your Year 1 costs. In the US, check if your university permits an insurance waiver with an approved private international policy.',
    portalOrResource: 'https://www.healthcare.gov',
    tags: ['Health Insurance', 'NHS', 'IHS', 'TK Germany', 'US SHIP']
  },
  {
    id: 'topic-dorm-housing',
    category: 'Pre-Departure & Campus Life',
    title: 'Campus Dormitory Selection & Off-Campus Leases',
    summary: 'Many universities require first-year undergraduates to live in university residence halls, which guarantees safety and meal plans. However, dorm applications frequently open on a rolling basis with strict early deadlines.',
    recommendedAction: 'Submit your housing deposit immediately upon accepting your admission offer. For off-campus housing in Canada, UK, or Germany, start searching 3–4 months prior to avoid local student housing shortages.',
    portalOrResource: 'https://www.student.com',
    tags: ['Housing', 'Dormitory', 'Residence Hall', 'Meal Plan', 'Accommodation']
  },
  {
    id: 'topic-recs-ferpa',
    category: 'Document Preparation',
    title: 'Letters of Recommendation (LOR) & Faculty Requests',
    summary: 'Top universities require 2 academic teacher recommendations (typically 1 STEM and 1 Humanities teacher) plus 1 school counselor recommendation report. Letters must provide specific anecdotes highlighting intellectual vitality and classroom leadership.',
    recommendedAction: 'Ask your teachers 6 to 8 weeks before deadlines. Provide them with a 1-page "brag sheet" highlighting your classroom discussions, projects, and personal reflections.',
    portalOrResource: 'https://www.commonapp.org',
    tags: ['LOR', 'Recommendation Letters', 'Teachers', 'Counselor', 'FERPA']
  },
  {
    id: 'topic-flight-currency',
    category: 'Pre-Departure & Campus Life',
    title: 'International Student Airfare & Multi-Currency Forex Cards',
    summary: 'Airlines like Emirates, Qatar Airways, and Singapore Airlines offer international students extra baggage allowances (up to 40–45 kg) and student discounts. Carrying large amounts of physical cash is risky and restricted by customs declarations.',
    recommendedAction: 'Book student fare tickets with extra baggage allowances using your student visa. Obtain an international multi-currency forex card (loaded with USD, GBP, or EUR) for arrival expenses before opening a local campus bank account.',
    portalOrResource: 'https://www.emirates.com/student',
    tags: ['Airfare', 'Baggage Allowance', 'Forex Card', 'Banking', 'Customs']
  }
];
