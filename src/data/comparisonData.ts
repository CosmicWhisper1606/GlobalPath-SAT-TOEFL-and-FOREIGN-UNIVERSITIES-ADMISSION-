export interface TestComparisonItem {
  feature: string;
  sat: string;
  act: string;
}

export interface EnglishTestComparisonItem {
  feature: string;
  toefl: string;
  ielts: string;
  duolingo: string;
}

export const SAT_VS_ACT: TestComparisonItem[] = [
  { feature: 'Format', sat: '100% Digital on laptop/tablet (Bluebook app)', act: 'Both Paper-based and Computer-based formats' },
  { feature: 'Total Duration', sat: '2 hours 14 minutes (Shortest major test)', act: '2 hours 55 minutes (without optional essay)' },
  { feature: 'Adaptive Structure', sat: 'Multistage section-adaptive (Module 1 determines Module 2 difficulty)', act: 'Linear (all students take the identical question sequence)' },
  { feature: 'Sections', sat: '2 Sections: Reading & Writing, Math', act: '4 Sections: English, Math, Reading, Science (+ Optional Writing)' },
  { feature: 'Scoring Scale', sat: '400 - 1600 (200 - 800 per section)', act: '1 - 36 Composite (Average of 4 sections)' },
  { feature: 'Pacing (Time/Question)', sat: 'Generous: ~1.19 min/question in RW, ~1.59 min/question in Math', act: 'Rapid/Fast-paced: ~49 sec per question in English, 53 sec in Reading' },
  { feature: 'Math Emphasis', sat: 'Heavy Algebra, Advanced quadratics, Problem solving. Built-in Desmos graphing calculator allowed on ALL questions.', act: 'Broader scope including Trigonometry, Matrices, Logarithms; calculator allowed on all, but no Desmos built-in.' },
  { feature: 'Science Section', sat: 'No standalone science test (science charts and passages embedded in Reading and Math)', act: 'Dedicated 35-minute Science reasoning section testing graph analysis, experiments, and conflicting viewpoints' },
  { feature: 'Penalty for Guessing', sat: 'None (no negative marking)', act: 'None (no negative marking)' }
];

export const ENGLISH_TESTS_COMPARISON: EnglishTestComparisonItem[] = [
  { feature: 'Total Test Duration', toefl: '1 hour 56 minutes (Modern streamlined format)', ielts: '2 hours 45 minutes', duolingo: '1 hour (60 minutes)' },
  { feature: 'Scoring Scale', toefl: '0 - 120 (0 - 30 per section)', ielts: '0 - 9.0 Band Scale (in 0.5 increments)', duolingo: '10 - 160 (5-point increments)' },
  { feature: 'Speaking Examination', toefl: 'Automated via headset and computer recording (16 mins)', ielts: 'Live 1-on-1 human interview with an examiner (11-14 mins)', duolingo: 'Open-ended video response recorded on webcam' },
  { feature: 'Writing Tasks', toefl: 'Integrated Essay (20m) + Academic Discussion (10m)', ielts: 'Task 1 Graph/Letter (20m) + Task 2 Essay (40m)', duolingo: 'Short interactive typing prompts and photo descriptions' },
  { feature: 'Global University Acceptance', toefl: '12,500+ institutions across 160+ countries (100% accepted in US, widely in UK, Canada, Australia)', ielts: '12,000+ universities worldwide (Primary choice for UK, Australia, New Zealand, Canada)', duolingo: '5,000+ programs (widely accepted in US undergrad, less accepted in UK/Europe top tier)' },
  { feature: 'Test Fee', toefl: '$200 - $280 USD depending on country (e.g. India $205 / ₹16,900, UAE $270, China $290)', ielts: '$215 - $310 USD depending on location (e.g. India ₹17,000, UK £200–£210)', duolingo: '$65 USD single / $110 two-test bundle (Most affordable)' },
  { feature: 'Results Turnaround', toefl: '4 - 8 calendar days', ielts: '1 - 5 days (Computer) or 13 days (Paper)', duolingo: '48 hours' }
];

export const VISA_INTERVIEW_GUIDE = [
  {
    topic: 'Demonstrating Non-Immigrant Intent (Crucial for US F-1)',
    explanation: 'US immigration law Section 214(b) presumes all applicants intend to immigrate unless you prove compelling ties to your home country.',
    bestPractices: [
      'Articulate a clear post-graduation career plan located in your home country (e.g. "Upon completing my MSc in Robotics, I plan to join our national clean energy grid project as a senior systems engineer").',
      'Mention strong family assets, business ties, or employment opportunities awaiting your return.',
      'Never state that your primary goal is working permanently or securing an H-1B / Green Card during your student visa interview.'
    ]
  },
  {
    topic: 'Financial Capability & Legitimate Source of Funds',
    explanation: 'Consular officers must be satisfied that your tuition and living costs will be reliably funded without relying on unauthorized off-campus labor.',
    bestPractices: [
      'Know your exact figures: Total first-year cost on Form I-20 / CAS, tuition amount, and parents\' annual income.',
      'Explain recent large deposits in bank statements with verifiable documentation (e.g., property sale deed, provident fund disbursement, or sanctioned student education loan).',
      'Carry the original signed loan sanction letter from an approved bank alongside bank statements.'
    ]
  },
  {
    topic: 'Why This University & Major?',
    explanation: 'Officers evaluate whether you are a genuine, serious student or merely using enrollment as a conduit for foreign entry.',
    bestPractices: [
      'Name 2-3 specific courses or research laboratories in your syllabus that are unavailable or inferior in your home country.',
      'Avoid vague answers like "It is a top-ranked school in California with beautiful weather".',
      'Explain how your previous bachelor\'s or high school curriculum naturally bridges into this specific degree.'
    ]
  }
];
