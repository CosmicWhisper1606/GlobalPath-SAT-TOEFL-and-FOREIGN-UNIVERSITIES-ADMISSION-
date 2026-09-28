export interface SATSection {
  id: string;
  name: string;
  duration: string;
  questionCount: number;
  modules: string;
  description: string;
  skillsTested: string[];
  keyTips: string[];
}

export interface UniversitySATBenchmark {
  university: string;
  country: string;
  acceptanceRate: string;
  sat25th: number;
  sat75th: number;
  toeflMin: number;
  notes: string;
}

export interface SATQuizQuestion {
  id: number;
  section: 'Reading and Writing' | 'Math';
  domain: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  passage?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examTip: string;
}

export const SAT_OVERVIEW = {
  totalTime: '2 hours 14 minutes',
  totalQuestions: 98,
  scoreRange: '400 - 1600 (200 - 800 per section)',
  sectionsCount: 2,
  format: 'Digital adaptive (via College Board Bluebook app)',
  feesUS: '$68',
  feesInternational: '$111 (base $68 + $43 international regional fee; late registration +$34)',
  frequency: '7 times per year (March, May, June, August, October, November, December)',
  validity: '5 years',
  calculator: 'Desmos built-in graphing calculator available for ALL Math questions',
};

export const SAT_SECTIONS: SATSection[] = [
  {
    id: 'rw',
    name: 'Reading and Writing',
    duration: '64 minutes (32 min per module)',
    questionCount: 54,
    modules: '2 multistage adaptive modules (27 questions each)',
    description: 'Short passages (25-150 words) each accompanied by a single multiple-choice question. Passages span literature, history/social studies, humanities, and science.',
    skillsTested: [
      'Craft and Structure (Vocabulary in context, text structure, cross-text connections)',
      'Information and Ideas (Central idea, textual evidence, quantitative data analysis)',
      'Standard English Conventions (Subject-verb agreement, punctuation, clause structure)',
      'Expression of Ideas (Rhetorical synthesis, transitions, logical sequencing)'
    ],
    keyTips: [
      'Standard English Conventions questions follow strict punctuation rules; learn semicolon, comma splice, and dash mechanics.',
      'Rhetorical Synthesis questions usually ask to achieve a specific goal—read the prompt goal first before the bullet points.',
      'Eliminate options with extreme words (always, never, definitely) in inference questions unless directly proven by the text.'
    ]
  },
  {
    id: 'math',
    name: 'Math',
    duration: '70 minutes (35 min per module)',
    questionCount: 44,
    modules: '2 multistage adaptive modules (22 questions each)',
    description: 'Features multiple-choice (~75%) and student-produced responses (grid-in ~25%). Focuses on high-utility math for college and career readiness.',
    skillsTested: [
      'Algebra (Linear equations, linear inequalities, systems of equations, linear functions)',
      'Advanced Math (Nonlinear equations, quadratic formulas, exponential functions, polynomials)',
      'Problem-Solving and Data Analysis (Ratios, percentages, unit conversion, scatterplots, statistics)',
      'Geometry and Trigonometry (Area/volume, circle theorems, right-triangle trigonometry, radians)'
    ],
    keyTips: [
      'Master the built-in Desmos graphing calculator: equations can often be solved by graphing both sides and inspecting intersection points.',
      'Watch out for negative signs, non-extraneous solutions in square roots, and domain restrictions in rational expressions.',
      'Student-produced responses cannot have negative fractions or mixed numbers; convert mixed numbers to decimals or improper fractions.'
    ]
  }
];

export const SAT_ADAPTIVE_EXPLAINED = {
  title: 'How the Multistage Adaptive Format Works',
  summary: 'The Digital SAT adapts between modules, not question-by-question.',
  stages: [
    {
      step: 'Module 1 (Routing)',
      detail: 'Every student receives an identical balanced mix of easy, medium, and hard questions in Module 1 for both Reading/Writing and Math.'
    },
    {
      step: 'Performance Threshold',
      detail: 'The algorithm evaluates your Module 1 accuracy. If you score above the cut-off (typically ~65-70% correct), you are routed to the Higher-Difficulty Module 2.'
    },
    {
      step: 'Module 2 (Upper vs Lower)',
      detail: 'Upper Module 2: Unlocks scores from ~550 up to the maximum 800. Lower Module 2: Caps maximum score around ~580-600 even if you answer all subsequent questions correctly.'
    },
    {
      step: 'Scoring Strategy',
      detail: 'Prioritize precision in Module 1 above all else. Missing easy questions in Module 1 can prevent routing to the upper module and cap your potential.'
    }
  ]
};

export const SAT_TEST_DATES_2025_2026 = [
  { testDate: 'March 8, 2025', registrationDeadline: 'February 21, 2025', lateDeadline: 'February 25, 2025', scoresReleased: 'March 21, 2025' },
  { testDate: 'May 3, 2025', registrationDeadline: 'April 18, 2025', lateDeadline: 'April 22, 2025', scoresReleased: 'May 16, 2025' },
  { testDate: 'June 7, 2025', registrationDeadline: 'May 22, 2025', lateDeadline: 'May 27, 2025', scoresReleased: 'June 20, 2025' },
  { testDate: 'August 23, 2025', registrationDeadline: 'August 8, 2025', lateDeadline: 'August 12, 2025', scoresReleased: 'September 5, 2025' },
  { testDate: 'October 4, 2025', registrationDeadline: 'September 19, 2025', lateDeadline: 'September 23, 2025', scoresReleased: 'October 17, 2025' },
  { testDate: 'November 8, 2025', registrationDeadline: 'October 24, 2025', lateDeadline: 'October 28, 2025', scoresReleased: 'November 21, 2025' },
  { testDate: 'December 6, 2025', registrationDeadline: 'November 21, 2025', lateDeadline: 'November 25, 2025', scoresReleased: 'December 19, 2025' },
  { testDate: 'March 14, 2026', registrationDeadline: 'February 27, 2026', lateDeadline: 'March 3, 2026', scoresReleased: 'March 27, 2026' },
  { testDate: 'May 2, 2026', registrationDeadline: 'April 17, 2026', lateDeadline: 'April 21, 2026', scoresReleased: 'May 15, 2026' },
  { testDate: 'June 6, 2026', registrationDeadline: 'May 21, 2026', lateDeadline: 'May 26, 2026', scoresReleased: 'June 19, 2026' }
];

export const UNIVERSITY_BENCHMARKS: UniversitySATBenchmark[] = [
  { university: 'Massachusetts Institute of Technology (MIT)', country: 'USA', acceptanceRate: '4.0%', sat25th: 1520, sat75th: 1580, toeflMin: 100, notes: 'SAT required. Average Math is 790-800.' },
  { university: 'Harvard University', country: 'USA', acceptanceRate: '3.4%', sat25th: 1490, sat75th: 1580, toeflMin: 100, notes: 'Standardized testing reinstating required starting Class of 2029.' },
  { university: 'Stanford University', country: 'USA', acceptanceRate: '3.7%', sat25th: 1500, sat75th: 1570, toeflMin: 100, notes: 'Reinstated SAT/ACT requirement for Fall 2026 admissions.' },
  { university: 'Yale University', country: 'USA', acceptanceRate: '4.4%', sat25th: 1480, sat75th: 1580, toeflMin: 100, notes: 'Test-flexible: accepts SAT, ACT, AP, or IB scores.' },
  { university: 'Princeton University', country: 'USA', acceptanceRate: '4.5%', sat25th: 1500, sat75th: 1580, toeflMin: 100, notes: 'Strongly recommends submitting SAT/ACT.' },
  { university: 'Carnegie Mellon University (CMU)', country: 'USA', acceptanceRate: '11.0%', sat25th: 1500, sat75th: 1560, toeflMin: 102, notes: 'SCS (Computer Science) SAT Math 25th-75th is 790-800.' },
  { university: 'UC Berkeley', country: 'USA', acceptanceRate: '11.6%', sat25th: 0, sat75th: 0, toeflMin: 80, notes: 'Test-Blind (does not use SAT for admissions or scholarships).' },
  { university: 'Georgia Institute of Technology', country: 'USA', acceptanceRate: '16.0%', sat25th: 1380, sat75th: 1530, toeflMin: 90, notes: 'Public Georgia institution: SAT/ACT legally required.' },
  { university: 'New York University (NYU)', country: 'USA', acceptanceRate: '12.0%', sat25th: 1470, sat75th: 1560, toeflMin: 100, notes: 'Test-optional, but competitive applicants submit 1500+.' },
  { university: 'University of Michigan - Ann Arbor', country: 'USA', acceptanceRate: '17.7%', sat25th: 1350, sat75th: 1530, toeflMin: 100, notes: 'Test-optional policy.' },
  { university: 'University of Texas at Austin', country: 'USA', acceptanceRate: '31.0%', sat25th: 1230, sat75th: 1480, toeflMin: 79, notes: 'Reinstated mandatory standardized testing.' },
  { university: 'Purdue University', country: 'USA', acceptanceRate: '50.0%', sat25th: 1210, sat75th: 1450, toeflMin: 88, notes: 'Standardized test scores strictly required.' }
];

export const SAT_QUIZ_QUESTIONS: SATQuizQuestion[] = [
  {
    id: 1,
    section: 'Reading and Writing',
    domain: 'Craft and Structure (Vocabulary in Context)',
    difficulty: 'Medium',
    passage: 'Biologist Dr. Elena Vance observed that the desert pupfish displays a remarkable physiological ______ when exposed to rapid thermal fluctuations, adjusting its cellular membrane composition within hours to maintain metabolic homeostasis.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'rigidity',
      'plasticity',
      'lethargy',
      'redundancy'
    ],
    correctIndex: 1,
    explanation: 'The sentence describes the pupfish "adjusting its cellular membrane composition within hours" to respond to fluctuations. The word "plasticity" denotes the quality of being easily shaped, adaptable, or capable of physiological change in response to stimuli.',
    examTip: 'Look for the definition clue in the dependent clause: "adjusting... to maintain metabolic homeostasis" directly signals adaptability/plasticity.'
  },
  {
    id: 2,
    section: 'Reading and Writing',
    domain: 'Standard English Conventions (Punctuation & Clauses)',
    difficulty: 'Hard',
    passage: 'During the Renaissance, botanists relied heavily on hand-drawn woodcut illustrations to classify rare plant ______ however, the advent of high-resolution copperplate etching in the 17th century allowed for unprecedented botanical fidelity.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: [
      'specimens,',
      'specimens;',
      'specimens',
      'specimens: and'
    ],
    correctIndex: 1,
    explanation: 'The text connects two independent clauses with the conjunctive adverb "however". When joining two complete independent clauses with a conjunctive adverb, Standard English requires a semicolon before the adverb and a comma after it (; however,).',
    examTip: 'A comma before "however" between two independent clauses is a comma splice, the #1 grammar trap on the SAT.'
  },
  {
    id: 3,
    section: 'Reading and Writing',
    domain: 'Expression of Ideas (Transitions)',
    difficulty: 'Medium',
    passage: 'Many astronomers predicted that the interstellar comet Borisov would disintegrate upon reaching its closest approach to the Sun. ______ spectral imaging revealed that the celestial visitor maintained its nucleus intact as it exited the solar system.',
    question: 'Which choice completes the text with the most logical transition?',
    options: [
      'Furthermore,',
      'Nevertheless,',
      'Consequently,',
      'Specifically,'
    ],
    correctIndex: 1,
    explanation: 'The first sentence states astronomers predicted the comet would disintegrate. The second sentence reveals that it actually survived intact. This is a contrast/concession relationship, making "Nevertheless" the correct transition.',
    examTip: 'Determine whether the relationship is continuative (Furthermore), causal (Consequently), contrastive (Nevertheless), or illustrative (Specifically).'
  },
  {
    id: 4,
    section: 'Math',
    domain: 'Algebra (Linear Systems)',
    difficulty: 'Easy',
    question: 'If 3x + 2y = 19 and y = 2x - 1, what is the value of x?',
    options: [
      '2',
      '3',
      '4',
      '5'
    ],
    correctIndex: 1,
    explanation: 'Substitute y = 2x - 1 into the first equation: 3x + 2(2x - 1) = 19 => 3x + 4x - 2 = 19 => 7x - 2 = 19 => 7x = 21 => x = 3.',
    examTip: 'Direct substitution is fastest here. On the Digital SAT, you can also type "3x + 2y = 19" and "y = 2x - 1" into the built-in Desmos calculator to find the intersection point (3, 5).'
  },
  {
    id: 5,
    section: 'Math',
    domain: 'Advanced Math (Quadratic Functions & Discriminants)',
    difficulty: 'Hard',
    question: 'For what value of c will the quadratic equation 2x² - 8x + c = 0 have exactly one real solution?',
    options: [
      '4',
      '8',
      '12',
      '16'
    ],
    correctIndex: 1,
    explanation: 'A quadratic equation ax² + bx + c = 0 has exactly one real solution when its discriminant b² - 4ac equals 0. Here, a = 2, b = -8. Thus, (-8)² - 4(2)(c) = 0 => 64 - 8c = 0 => 8c = 64 => c = 8.',
    examTip: 'Remember the discriminant rules: b² - 4ac > 0 (two distinct real roots), = 0 (one repeated root / tangent to x-axis), < 0 (no real solutions).'
  },
  {
    id: 6,
    section: 'Math',
    domain: 'Problem-Solving and Data Analysis (Percentages)',
    difficulty: 'Medium',
    question: 'A vintage microscope priced at $800 was discounted by 20%. During a holiday weekend sale, an additional 15% discount was applied to the reduced price. What was the final purchase price of the microscope?',
    options: [
      '$520',
      '$544',
      '$560',
      '$576'
    ],
    correctIndex: 1,
    explanation: 'First discount of 20%: $800 * (1 - 0.20) = $800 * 0.80 = $640. Second discount of 15% on the reduced price: $640 * (1 - 0.15) = $640 * 0.85 = $544. Do not simply add 20% + 15% = 35%!',
    examTip: 'Successive percentage discounts multiply: 800 * 0.80 * 0.85 = 544. Never add percentage changes together sequentially.'
  }
];

export const SAT_STUDY_PLANS = [
  {
    name: '3-Month Sprint (Intensive)',
    commitment: '12-15 hours/week',
    target: 'Students with existing solid foundation looking for a 100-150 point jump',
    weeks: [
      { week: 'Weeks 1-2', focus: 'Diagnostic Bluebook Test 1, identify weak question types, master Desmos keyboard shortcuts & graphing hacks.' },
      { week: 'Weeks 3-5', focus: 'Deep dive into Standard English Conventions rules + Advanced Math quadratics and exponential models.' },
      { week: 'Weeks 6-8', focus: 'Vocabulary in context drills, textual evidence analysis, and timed module practice sets.' },
      { week: 'Weeks 9-11', focus: 'Full-length Bluebook Practice Tests 2, 3, and 4 under strict exam conditions; error log review.' },
      { week: 'Week 12', focus: 'Tapering, formulas review, test-day kit preparation, restful sleep.' }
    ]
  },
  {
    name: '6-Month Comprehensive Journey',
    commitment: '6-8 hours/week',
    target: 'Ideal for 10th/11th graders targeting 1500+ and Ivy League / Top 20 universities',
    weeks: [
      { week: 'Months 1-2', focus: 'Diagnostic & Core Concepts: Khan Academy Digital SAT Math foundations + reading speed & editorial comprehension.' },
      { week: 'Month 3', focus: 'Grammar mastery (16 core SAT punctuation rules) and Problem-Solving & Data Analysis formulas.' },
      { week: 'Month 4', focus: 'Digital SAT Question Bank drills; target 80%+ accuracy in upper-level modules.' },
      { week: 'Month 5', focus: 'Bi-weekly full-length timed tests (Bluebook Tests 1-6) + thorough root-cause mistake analysis.' },
      { week: 'Month 6', focus: 'Simulated morning tests at 8:00 AM, pacing strategies, and mental stamina conditioning.' }
    ]
  }
];
