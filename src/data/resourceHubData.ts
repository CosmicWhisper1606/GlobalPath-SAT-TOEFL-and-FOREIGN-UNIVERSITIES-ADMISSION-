export interface ExamResource {
  id: string;
  exam: 'SAT' | 'TOEFL' | 'Both';
  skill: 'All' | 'Reading' | 'Writing' | 'Math' | 'Listening' | 'Speaking' | 'General';
  title: string;
  provider: string;
  type: 'Official Guide' | 'Free Practice Test' | 'Interactive Tool' | 'Strategy Guide' | 'Question Bank';
  isOfficial: boolean;
  isFree: boolean;
  description: string;
  accessUrl: string;
  keyFeatures: string[];
}

export interface VocabularyWord {
  id: number;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  primaryExam: 'SAT' | 'TOEFL' | 'Both';
  frequency: 'High' | 'Essential';
  definition: string;
  exampleSentence: string;
  synonyms: string[];
  antonyms: string[];
  contextNote: string;
}

export const EXAM_RESOURCES: ExamResource[] = [
  {
    id: 'bluebook',
    exam: 'SAT',
    skill: 'General',
    title: 'College Board Bluebook™ Official Application',
    provider: 'College Board',
    type: 'Official Guide',
    isOfficial: true,
    isFree: true,
    description: 'The exact software platform used on official Digital SAT test day. Contains 6 official full-length adaptive practice exams with instant scaled scoring (400-1600).',
    accessUrl: 'https://bluebook.collegeboard.org',
    keyFeatures: [
      'Authentic multistage adaptive routing algorithms identical to test day',
      'Built-in Desmos graphing calculator with full keyboard functionality',
      'Option to test with official test-day timing, breaks, and interface tools'
    ]
  },
  {
    id: 'khan-sat',
    exam: 'SAT',
    skill: 'All',
    title: 'Khan Academy Official Digital SAT Prep',
    provider: 'Khan Academy & College Board',
    type: 'Interactive Tool',
    isOfficial: true,
    isFree: true,
    description: 'Direct partnership with College Board providing personalized diagnostic skill practice across all Reading/Writing and Math domains, video tutorials, and drills.',
    accessUrl: 'https://www.khanacademy.org/sat',
    keyFeatures: [
      'Tailored lessons based on your Bluebook diagnostic test mistakes',
      'Hundreds of discrete skill drills (Linear systems, quadratic models, punctuation)',
      '100% free with step-by-step video explanations by Sal Khan and master tutors'
    ]
  },
  {
    id: 'sat-question-bank',
    exam: 'SAT',
    skill: 'All',
    title: 'College Board Educator Question Bank',
    provider: 'College Board',
    type: 'Question Bank',
    isOfficial: true,
    isFree: true,
    description: 'Searchable repository of over 3,000 real released SAT and PSAT questions filtered by domain, subdomain, and difficulty (Easy, Medium, Hard).',
    accessUrl: 'https://satsuitequestionbank.collegeboard.org',
    keyFeatures: [
      'Filter questions specifically for "Craft and Structure" or "Advanced Math"',
      'Download customized PDF practice worksheets with official answer keys',
      'Excludes questions currently present in Bluebook practice tests to prevent spoilers'
    ]
  },
  {
    id: 'ets-toefl-practice',
    exam: 'TOEFL',
    skill: 'General',
    title: 'ETS TOEFL iBT® Official Free Practice Test',
    provider: 'ETS (Educational Testing Service)',
    type: 'Free Practice Test',
    isOfficial: true,
    isFree: true,
    description: 'Full-length 1h 56m practice test mirroring the streamlined July 2023 format. Includes sample questions for Reading, Listening, Speaking, and Writing.',
    accessUrl: 'https://www.ets.org/toefl/test-takers/ibt/prepare/tests.html',
    keyFeatures: [
      'Complete simulation of the 10-minute "Writing for an Academic Discussion" task',
      'Official listening recordings featuring authentic North American & British accents',
      'Correct answer explanations and sample speaking responses with rater commentary'
    ]
  },
  {
    id: 'toefl-planner',
    exam: 'TOEFL',
    skill: 'General',
    title: 'TOEFL iBT® 8-Week Test Prep Planner',
    provider: 'ETS',
    type: 'Official Guide',
    isOfficial: true,
    isFree: true,
    description: 'Comprehensive 8-week curriculum designed by ETS assessment specialists with weekly targets, practice activities, and self-assessment checklists.',
    accessUrl: 'https://www.ets.org/toefl/test-takers/ibt/prepare/planner.html',
    keyFeatures: [
      'Skill-building activities for synthesis and note-taking during lectures',
      'Speaking templates designed to hit maximum delivery & topic development bands',
      'Rubrics used by human certified examiners and AI SpeechRater® systems'
    ]
  },
  {
    id: 'desmos-sat-guide',
    exam: 'SAT',
    skill: 'Math',
    title: 'Digital SAT Desmos Graphing Hacks & Shortcut Matrix',
    provider: 'GlobalPath Test Prep Research',
    type: 'Strategy Guide',
    isOfficial: false,
    isFree: true,
    description: 'Tactical guide on leveraging the built-in Desmos graphing calculator to solve systems of equations, non-linear roots, regression, and inequality regions in <30 seconds.',
    accessUrl: 'https://www.desmos.com/calculator',
    keyFeatures: [
      'Visual intersection method: Type f(x) and g(x) to read (x, y) coordinates instantly',
      'Regression command: `y1 ~ mx1 + b` or `y1 ~ ax1^2 + bx1 + c` for instant coefficients',
      'Sliders for unknown constants "k" and "c" to find tangent intersections'
    ]
  },
  {
    id: 'toefl-speaking-templates',
    exam: 'TOEFL',
    skill: 'Speaking',
    title: 'Speaking Section High-Band Response Templates (Tasks 1-4)',
    provider: 'ETS Master Raters Association',
    type: 'Strategy Guide',
    isOfficial: false,
    isFree: true,
    description: 'Time-tested speech timing structures: 15-second prep / 45-second delivery breakdowns for Independent tasks and 60-second synthesis frameworks for Integrated lectures.',
    accessUrl: 'https://www.ets.org/toefl/test-takers/ibt/about/scoring.html',
    keyFeatures: [
      'Avoid silence: Transitions ("First and foremost", "To substantiate this with an example")',
      'How to summarize campus policy changes in under 18 seconds without fluff',
      'Pronunciation & intonation stress patterns that trigger high SpeechRater® ratings'
    ]
  },
  {
    id: 'sat-grammar-rules',
    exam: 'SAT',
    skill: 'Writing',
    title: 'The 16 Non-Negotiable Standard English Conventions Rules',
    provider: 'GlobalPath Grammar Lab',
    type: 'Strategy Guide',
    isOfficial: false,
    isFree: true,
    description: 'Strict syntactic rules tested on SAT Reading & Writing: semicolon mechanics, comma splices, restrictive clauses, apostrophe possession, and modifier placement.',
    accessUrl: 'https://satsuite.collegeboard.org/sat/whats-on-the-test',
    keyFeatures: [
      'The FANBOYS rule: Independent clause + comma + coordinating conjunction',
      'Dangling modifiers: The noun immediately following the comma MUST perform the action',
      'Colon rule: The clause before a colon MUST be a standalone independent clause'
    ]
  }
];

export const VOCABULARY_DATABASE: VocabularyWord[] = [
  {
    id: 1,
    word: 'Pragmatic',
    phonetic: '/præɡˈmæt.ɪk/',
    partOfSpeech: 'adjective',
    primaryExam: 'Both',
    frequency: 'High',
    definition: 'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.',
    exampleSentence: 'Rather than debating ideological abstractions, the committee adopted a pragmatic approach that addressed the city’s immediate housing shortage.',
    synonyms: ['practical', 'utilitarian', 'realistic', 'sensible'],
    antonyms: ['idealistic', 'impractical', 'utopian', 'quixotic'],
    contextNote: 'Frequently appears in SAT Reading historical passages and TOEFL Academic Discussion writing prompts.'
  },
  {
    id: 2,
    word: 'Ubiquitous',
    phonetic: '/juːˈbɪk.wɪ.təs/',
    partOfSpeech: 'adjective',
    primaryExam: 'Both',
    frequency: 'High',
    definition: 'Present, appearing, or found everywhere; omnipresent in modern life or nature.',
    exampleSentence: 'Over the last two decades, smartphones transitioned from luxury items into ubiquitous tools essential for daily communication.',
    synonyms: ['omnipresent', 'pervasive', 'universal', 'prevalent'],
    antonyms: ['rare', 'scarce', 'isolated', 'sporadic'],
    contextNote: 'Essential for TOEFL Academic Discussion task when arguing about technology or cultural changes.'
  },
  {
    id: 3,
    word: 'Aberration',
    phonetic: '/ˌæb.əˈreɪ.ʃən/',
    partOfSpeech: 'noun',
    primaryExam: 'SAT',
    frequency: 'High',
    definition: 'A departure from what is normal, usual, or expected, typically one that is unwelcome or anomalous.',
    exampleSentence: 'The sudden spike in experimental temperature was an anomaly, an aberration caused by faulty electrical wiring in the sensor.',
    synonyms: ['anomaly', 'deviation', 'divergence', 'peculiarity'],
    antonyms: ['normality', 'conformity', 'regularity'],
    contextNote: 'Common in SAT scientific reasoning passages to describe unexpected data outliers in scatterplots.'
  },
  {
    id: 4,
    word: 'Substantiate',
    phonetic: '/səbˈstæn.ʃi.eɪt/',
    partOfSpeech: 'verb',
    primaryExam: 'Both',
    frequency: 'High',
    definition: 'To provide evidence to support or prove the truth of a claim, hypothesis, or argument.',
    exampleSentence: 'The researcher failed to substantiate her bold thesis with statistically significant double-blind clinical trials.',
    synonyms: ['corroborate', 'validate', 'verify', 'authenticate'],
    antonyms: ['disprove', 'refute', 'undermine', 'debunk'],
    contextNote: 'Top scoring keyword in both SAT textual evidence questions and TOEFL Academic Discussion essays.'
  },
  {
    id: 5,
    word: 'Ephemeral',
    phonetic: '/ɪˈfem.ər.əl/',
    partOfSpeech: 'adjective',
    primaryExam: 'SAT',
    frequency: 'High',
    definition: 'Lasting for a very short time; transitory; fleeting.',
    exampleSentence: 'The desert wildflowers produced an ephemeral bloom that vanished within forty-eight hours of the scorching winds.',
    synonyms: ['transitory', 'fleeting', 'momentary', 'fugacious'],
    antonyms: ['perennial', 'permanent', 'enduring', 'immutable'],
    contextNote: 'Tested in SAT literature context questions contrasting temporary states with enduring institutions.'
  },
  {
    id: 6,
    word: 'Capricious',
    phonetic: '/kəˈprɪʃ.əs/',
    partOfSpeech: 'adjective',
    primaryExam: 'SAT',
    frequency: 'High',
    definition: 'Given to sudden and unaccountable changes of mood or behavior; unpredictable.',
    exampleSentence: 'The king’s capricious decrees undermined public confidence, as merchants could never forecast next month’s tariffs.',
    synonyms: ['fickle', 'mercurial', 'volatile', 'arbitrary'],
    antonyms: ['steadfast', 'constant', 'predictable', 'reliable'],
    contextNote: 'Classic SAT vocabulary word found in prose fiction and humanities passages.'
  },
  {
    id: 7,
    word: 'Mitigate',
    phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
    partOfSpeech: 'verb',
    primaryExam: 'Both',
    frequency: 'High',
    definition: 'To make less severe, serious, or painful; to lessen the impact of a problem.',
    exampleSentence: 'Urban planners planted extensive rooftop green spaces to mitigate the dangerous heat-island effect in central districts.',
    synonyms: ['alleviate', 'attenuate', 'diminish', 'palliate'],
    antonyms: ['aggravate', 'exacerbate', 'intensify', 'worsen'],
    contextNote: 'Crucial for writing about environmental science, policy, or economics in TOEFL and SAT essays.'
  },
  {
    id: 8,
    word: 'Proliferate',
    phonetic: '/prəˈlɪf.ə.reɪt/',
    partOfSpeech: 'verb',
    primaryExam: 'Both',
    frequency: 'High',
    definition: 'To increase rapidly in numbers; multiply; rapidly spread.',
    exampleSentence: 'With the introduction of affordable broadband, online educational platforms proliferated throughout developing economies.',
    synonyms: ['burgeon', 'multiply', 'escalate', 'expand'],
    antonyms: ['dwindle', 'decline', 'diminish', 'recede'],
    contextNote: 'Common in TOEFL Biology and Anthropology reading passages describing species or cultural spread.'
  },
  {
    id: 9,
    word: 'Anachronistic',
    phonetic: '/əˌnæk.rəˈnɪs.tɪk/',
    partOfSpeech: 'adjective',
    primaryExam: 'SAT',
    frequency: 'Essential',
    definition: 'Belonging or appropriate to an earlier period, especially so as to seem conspicuously old-fashioned.',
    exampleSentence: 'In an era of instant encrypted messaging, the embassy’s reliance on physical paper couriers seemed absurdly anachronistic.',
    synonyms: ['archaic', 'antiquated', 'outdated', 'obsolete'],
    antonyms: ['contemporary', 'modern', 'futuristic', 'current'],
    contextNote: 'SAT Reading passages regarding cultural or technological revolutions.'
  },
  {
    id: 10,
    word: 'Exacerbate',
    phonetic: '/ɪɡˈzæs.ər.beɪt/',
    partOfSpeech: 'verb',
    primaryExam: 'Both',
    frequency: 'High',
    definition: 'To make a problem, bad situation, or negative feeling worse.',
    exampleSentence: 'Drought conditions were exacerbated by decades of soil mismanagement and over-allocation of river water.',
    synonyms: ['aggravate', 'worsen', 'inflame', 'compound'],
    antonyms: ['mitigate', 'alleviate', 'soothe', 'ameliorate'],
    contextNote: 'The direct antonym of "mitigate"; frequently appears as a trap or correct answer on both exams.'
  },
  {
    id: 11,
    word: 'Ameliorate',
    phonetic: '/əˈmiːl.jə.reɪt/',
    partOfSpeech: 'verb',
    primaryExam: 'SAT',
    frequency: 'Essential',
    definition: 'To make something bad or unsatisfactory better; to improve conditions.',
    exampleSentence: 'The international relief coalition dispatched desalination units to ameliorate the catastrophic regional water shortage.',
    synonyms: ['improve', 'enhance', 'better', 'remedy'],
    antonyms: ['worsen', 'deteriorate', 'exacerbate'],
    contextNote: 'High-register academic verb frequently tested on SAT Craft & Structure questions.'
  },
  {
    id: 12,
    word: 'Tenuous',
    phonetic: '/ˈten.ju.əs/',
    partOfSpeech: 'adjective',
    primaryExam: 'SAT',
    frequency: 'High',
    definition: 'Very weak, slight, or insubstantial; having little basis in fact or certainty.',
    exampleSentence: 'The historical connection between the ancient inscription and the mythical kingdom remains tenuous at best.',
    synonyms: ['flimsy', 'fragile', 'dubious', 'shaky'],
    antonyms: ['robust', 'strong', 'solid', 'substantial'],
    contextNote: 'Appears in SAT Reading questions evaluating the validity of an author’s thesis or evidence.'
  }
];

export const EXPERT_SCORE_TIPS = [
  {
    exam: 'Digital SAT',
    title: 'How to Crack 1500+ (750+ RW, 780+ Math)',
    steps: [
      'Protect Module 1 at All Costs: Missing 2 or more questions on Module 1 risks lowering your adaptive routing ceiling.',
      'Desmos Direct Substitution: When faced with finding points of intersection or constants in quadratics, type the expressions into Desmos rather than manually factoring.',
      'Semicolon Rule Mastery: On the Reading and Writing section, a semicolon can ONLY separate two grammatically complete independent clauses.',
      'Rhetorical Synthesis Shortcut: Read the question prompt (e.g. "The student wants to emphasize the difference between...") BEFORE reading the bullet points.',
      'Desmos Regression Hack: For tables of (x, y) coordinates, create a table in Desmos, type y1 ~ ax1^2 + bx1 + c, and read the parameters immediately.'
    ]
  },
  {
    exam: 'TOEFL iBT',
    title: 'How to Score 105+ (26+ in Speaking and Writing)',
    steps: [
      'SpeechRater Intonation: Avoid monotone delivery. Emphasize content keywords (nouns, verbs) with rising and falling pitch to trigger higher AI prosody scores.',
      'The 10-Minute Discussion Template: Dedicate minute 1 to reading, minutes 2-8 to writing 130-150 words acknowledging classmates, and minutes 9-10 to typo cleanup.',
      'Integrated Essay Matrix: During the listening lecture, make a 3-row note grid. The lecturer will systematically refute the 3 reading claims one by one.',
      'Listening Tone Shifts: Whenever a professor laughs, sighs, or pauses ("Well, actually..."), pay acute attention; an inference or attitude question will follow.',
      'Sentence Insertion Strategy: Look for grammatical glue like "This finding", "In contrast", or temporal pronouns to anchor the missing sentence.'
    ]
  }
];
