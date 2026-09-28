export interface TOEFLSection {
  id: string;
  name: string;
  timeLimit: string;
  questionCount: string;
  formatDescription: string;
  tasksBreakdown: string[];
  scoringCriteria: string[];
  provenStrategies: string[];
}

export interface TOEFLQuizQuestion {
  id: number;
  section: 'Reading' | 'Listening' | 'Writing';
  type: string;
  passage?: string;
  audioPromptDescription?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  expertAdvice: string;
}

export const TOEFL_OVERVIEW = {
  totalTime: 'Under 2 hours (~1 hour 56 minutes)',
  scoringRange: '0 - 120 (0 - 30 per section)',
  sectionsCount: 4,
  sectionsList: ['Reading', 'Listening', 'Speaking', 'Writing'],
  format: 'Internet-based Test (iBT) via test center or Home Edition',
  fees: '$200 - $280 USD (varies by testing location/country; e.g., India $205 / ₹16,900, UAE $270, China $290)',
  validity: '2 years from test date',
  frequency: 'Over 60 test dates offered annually at certified centers worldwide',
  myBestScores: 'ETS combines your highest section scores from all valid test dates in the previous 2 years onto a single superscore report.',
  streamlinedChange: 'Updated in July 2023: Removed unscored experimental questions, replaced long independent essay with a modern 10-minute Academic Discussion task.'
};

export const TOEFL_SECTIONS: TOEFLSection[] = [
  {
    id: 'reading',
    name: 'Reading Section',
    timeLimit: '35 minutes',
    questionCount: '20 questions (2 passages, 10 questions each)',
    formatDescription: 'Two academic passages of approximately 700 words each excerpted from university-level textbooks on subjects like anthropology, astrophysics, geology, and history.',
    tasksBreakdown: [
      'Factual Information & Negative Factual questions (What did the text state / NOT state?)',
      'Inference & Rhetorical Purpose questions (Why did the author mention X?)',
      'Vocabulary in Context questions (Meaning of academic terms in situ)',
      'Sentence Insertion & Prose Summary (Insert a sentence into logical spot / Select 3 major points)'
    ],
    scoringCriteria: [
      'Raw score converted to scaled score (0-30).',
      'Prose summary questions are worth up to 2 points; all standard multiple-choice questions are worth 1 point.'
    ],
    provenStrategies: [
      'Do not read the full 700-word text upfront; read paragraph by paragraph as directed by the questions to conserve time.',
      'For Sentence Insertion, look for transitional glue: pronouns (this, these, such), time markers, and contrast indicators.',
      'In Prose Summary, eliminate options that are minor supporting details or factually distorted, even if they appear in the passage.'
    ]
  },
  {
    id: 'listening',
    name: 'Listening Section',
    timeLimit: '36 minutes',
    questionCount: '28 questions (3 lectures + 2 conversations)',
    formatDescription: 'Natural spoken English with authentic academic accents (North American, British, Australian). Audio plays only once; note-taking is essential.',
    tasksBreakdown: [
      '3 Academic Lectures (~3-5 minutes each, 6 questions per lecture, e.g., Marine Biology, Art History)',
      '2 Campus Conversations (~3 minutes each, 5 questions per conversation, e.g., Professor office hours, registrar library)'
    ],
    scoringCriteria: [
      'Scaled score from 0-30 based on comprehension of main ideas, speaker attitude/stance, and implied intentions.'
    ],
    provenStrategies: [
      'Use a split-column note-taking system: Left column for Main Concepts & Questions, Right column for Examples, Causes, and Results.',
      'Pay close attention when professors change tone, laugh, or correct themselves—attitude and function questions frequently test these moments.',
      'Never leave a blank answer; there is no negative marking for incorrect guesses.'
    ]
  },
  {
    id: 'speaking',
    name: 'Speaking Section',
    timeLimit: '16 minutes',
    questionCount: '4 tasks',
    formatDescription: 'Delivered via headset microphone and scored by a combination of AI speech scoring (SpeechRater®) and certified human raters.',
    tasksBreakdown: [
      'Task 1 (Independent): Express personal opinion on a common topic (15s prep, 45s speak)',
      'Task 2 (Integrated Campus): Read announcement + listen to student discussion + summarize opinion (30s prep, 60s speak)',
      'Task 3 (Integrated Academic): Read academic concept + listen to professor lecture example + explain connection (30s prep, 60s speak)',
      'Task 4 (Integrated Lecture): Listen to academic lecture + summarize two concepts/mechanisms (20s prep, 60s speak)'
    ],
    scoringCriteria: [
      'Delivery: Fluidity, natural intonation, clear pronunciation, minimal pauses/fillers ("um", "uh").',
      'Language Use: Accurate grammar, diverse sentence structures, academic vocabulary.',
      'Topic Development: Complete response addressing all parts of prompt with clear logical progression.'
    ],
    provenStrategies: [
      'Use a structured timing template: 10s introduction/thesis, 20s point 1 with concrete reason, 15s point 2 with concrete reason.',
      'Do not speak too fast; clarity and steady pacing score higher than rushed, garbled sentences.',
      'In Integrated tasks, focus 75% of your speaking time on the audio recording rather than re-reading the text.'
    ]
  },
  {
    id: 'writing',
    name: 'Writing Section',
    timeLimit: '29 minutes',
    questionCount: '2 tasks',
    formatDescription: 'Measures your ability to write clearly in an academic setting. Scored on structure, development, grammar, and vocabulary.',
    tasksBreakdown: [
      'Task 1: Integrated Writing (20 min) - Read a 300-word academic passage, listen to a 2-minute counter-lecture, write a 150-225 word essay showing how the lecture challenges the reading.',
      'Task 2: Writing for an Academic Discussion (10 min) - Read an online professor question and posts from 2 classmates, write a 100+ word post expressing and justifying your perspective.'
    ],
    scoringCriteria: [
      'Integrated Essay: Accuracy in capturing all 3 counterarguments from the lecture and matching them to the reading points.',
      'Academic Discussion: Contribution to the ongoing dialogue, depth of original examples, syntactic sophistication, and lexical variety.'
    ],
    provenStrategies: [
      'For the Integrated essay, the professor almost ALWAYS refutes the reading point by point. Create a 3-paragraph matrix.',
      'For Academic Discussion, directly acknowledge the classmates ("While I understand Sarah\'s argument regarding economic growth, I agree with Michael that...").',
      'Aim for 120-150 words in Task 2 to ensure sufficient analytical depth within the 10-minute constraint.'
    ]
  }
];

export const TOEFL_SCORE_BENCHMARKS = [
  { tier: 'Top 10 Global / Ivy League', minScore: '100 - 105+', subscoreMinimums: 'R 25+, L 25+, S 25+, W 25+', examples: 'Harvard, Stanford, Oxford, MIT, Cambridge, Columbia' },
  { tier: 'Top 50 National / World Tier', minScore: '90 - 100', subscoreMinimums: 'Typically 20-22+ in each section', examples: 'NYU, UCLA, Univ of Toronto, Univ of Edinburgh, Univ of Melbourne' },
  { tier: 'Top 100 / Large Public Universities', minScore: '80 - 90', subscoreMinimums: 'Usually no section below 18-20', examples: 'Penn State, Purdue, Univ of Arizona, Univ of Alberta' },
  { tier: 'General International Admissions', minScore: '70 - 79', subscoreMinimums: 'Conditional English language programs often available', examples: 'State regional colleges, community colleges' }
];

export const TOEFL_QUIZ_QUESTIONS: TOEFLQuizQuestion[] = [
  {
    id: 1,
    section: 'Reading',
    type: 'Vocabulary in Context',
    passage: 'Over millennia, geothermal vents created benthic ecosystems entirely severed from solar radiation. Here, chemotrophic microorganisms oxidize hydrogen sulfide to synthesize organic molecules, forming the bedrock of a food web that sustains ubiquitous tube worms and vent crabs.',
    question: 'In the passage, the word "ubiquitous" is closest in meaning to:',
    options: [
      'exceptionally large',
      'widespread and common',
      'ancient and primitive',
      'highly endangered'
    ],
    correctIndex: 1,
    explanation: '"Ubiquitous" means present, appearing, or found everywhere or widespread. In this context, it describes tube worms and crabs that are found widely throughout the vent ecosystems.',
    expertAdvice: 'Replace the target word with each option and check if the sentence retains its natural scientific logic.'
  },
  {
    id: 2,
    section: 'Reading',
    type: 'Inference',
    passage: 'Before the introduction of standardized steam rail gauges in the mid-19th century, trains in neighbouring provinces were compelled to transfer all cargo and passengers manually onto different rolling stock whenever rail widths diverged, causing staggering economic inefficiencies and delivery delays.',
    question: 'Which of the following can be inferred from the passage about rail transport before standardization?',
    options: [
      'Locomotives were incapable of carrying heavy industrial cargo.',
      'Different railway companies had intentionally designed incompatible tracks to avoid cooperation.',
      'A single train could not travel seamlessly across regions with differing track dimensions.',
      'Steam power was too weak to operate on long-distance cross-country routes.'
    ],
    correctIndex: 2,
    explanation: 'The text states that whenever rail widths diverged, trains were "compelled to transfer all cargo and passengers manually onto different rolling stock," which directly proves that a single train could not travel uninterrupted across regions with differing track gauges.',
    expertAdvice: 'Inference questions on TOEFL must be 100% anchored in the text. Beware of speculative answers not strictly proven.'
  },
  {
    id: 3,
    section: 'Writing',
    type: 'Academic Discussion Evaluation',
    question: 'In the "Writing for an Academic Discussion" task (10 minutes), what is the most effective approach to achieve the highest band score (5.0)?',
    options: [
      'Copy the professor\'s prompt text word-for-word in the opening sentence to show thorough understanding.',
      'Simply vote for one classmate\'s position without adding new examples or personal perspective.',
      'Contribute an original argument, reference classmate perspectives, and substantiate your reasoning with specific examples.',
      'Write at least 400 words regardless of typos and grammatical coherence.'
    ],
    correctIndex: 2,
    explanation: 'ETS scoring rubrics award top marks when the writer adds original ideas to the conversation, clearly engages with the provided student perspectives, and develops their stance with specific, well-formulated examples.',
    expertAdvice: 'Quality and syntactic variety far outweigh pure word count. 120-160 well-crafted words score higher than 300 disjointed words.'
  }
];

export const TOEFL_WRITING_TEMPLATE = {
  task: 'Task 2: Writing for an Academic Discussion',
  samplePrompt: 'Professor Henderson asks: "Should local municipalities allocate tax revenues towards public transport expansion or subsidizing electric vehicles for individual consumers?"',
  sampleHighScoringResponse: `While both Claire and Paul raise compelling arguments regarding environmental remediation, I strongly support Claire's view that municipal funding should prioritize public transit infrastructure. 

Expanding mass transit networks—such as light rail and zero-emission electric bus lines—addresses urban congestion and social equity simultaneously. While EV subsidies primarily benefit affluent individuals who can already afford new vehicles, robust public transit provides accessible, low-carbon mobility for working-class citizens, students, and seniors who do not own cars. For example, when my city introduced dedicated bus rapid transit lanes, carbon emissions dropped by 18% in the downtown corridor while commuter travel times decreased by half. Therefore, collective transit investments deliver far greater societal and ecological return on investment than individual subsidies.`,
  breakdown: [
    'Direct reference to classmate perspectives (Claire & Paul).',
    'Clear, unequivocal thesis statement.',
    'Two distinct supporting arguments (social equity + emissions impact).',
    'Concrete illustrative example with quantitative realism.',
    'Strong concluding synthesis with sophisticated vocabulary (remediation, affluent, societal return).'
  ]
};
