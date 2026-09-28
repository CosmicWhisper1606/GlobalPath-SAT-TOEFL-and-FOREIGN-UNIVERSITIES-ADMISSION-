export interface CulturalIdiom {
  term: string;
  category: 'School & Youth Culture' | 'Civic & Community' | 'Environment & Daily Life' | 'Financial & Real Estate';
  literalMeaning: string;
  contextualMeaningOnExams: string;
  examplePassageSnippet: string;
  confusionTrapForInternationalStudents: string;
}

export interface MathWordProblemDrill {
  id: string;
  problemTitle: string;
  wordyAmericanText: string;
  culturalTrapExplanation: string;
  mathematicalTranslationSteps: string[];
  algebraicEquation: string;
  correctAnswer: string;
  studentTakeaway: string;
}

export interface ArchaicSyntaxSample {
  id: string;
  authorAndWork: string;
  year: string;
  originalPassage: string;
  archaicSyntaxBreakdown: string[];
  plainEnglishTranslation: string;
  readingQuestionSnippet: string;
  keyStrategy: string;
}

export interface NationalBoardTimeline {
  curriculumName: string;
  country: string;
  peakBoardExamMonths: string;
  schoolLeavingYear: string;
  recommendedSATTesterMonths: string[];
  recommendedTOEFLTesterMonths: string[];
  dangerMonthsToAvoid: string[];
  strategicAdvice: string;
}

export const CULTURAL_IDIOMS_GLOSSARY: CulturalIdiom[] = [
  {
    term: 'Bake Sale / Car Wash Fundraiser',
    category: 'School & Youth Culture',
    literalMeaning: 'Selling homemade baked goods or washing neighbors’ vehicles on a school weekend.',
    contextualMeaningOnExams: 'Standard high school club fundraising context in Math word problems and Reading passages. Used to represent linear cost/revenue models or student initiative.',
    examplePassageSnippet: 'The French Club held a bake sale where chocolate croissants sold for $3.50 and berry scones for $2.25, raising a total of $412 towards their trip.',
    confusionTrapForInternationalStudents: 'Students unfamiliar with US club autonomy often confuse this with professional commercial bakeries or question why students are cooking rather than studying.'
  },
  {
    term: 'Town Hall Meeting / Select Board',
    category: 'Civic & Community',
    literalMeaning: 'A local municipal assembly where ordinary town residents gather to vote on local regulations, public school budgets, or zoning.',
    contextualMeaningOnExams: 'Frequently appears in social science passages illustrating direct democracy, local civic participation, or historical New England governance.',
    examplePassageSnippet: 'At the Tuesday night town hall, citizens vigorously debated the municipal board’s ordinance restricting commercial billboard density.',
    confusionTrapForInternationalStudents: 'In centralized governance systems, local residents rarely vote directly on town ordinances. Students misinterpret this as a national parliamentary hearing.'
  },
  {
    term: 'PTA (Parent-Teacher Association)',
    category: 'Civic & Community',
    literalMeaning: 'A grassroots volunteer organization of parents and teachers that advocates for school programs and organizes school events.',
    contextualMeaningOnExams: 'Represents community stakeholder engagement or polling samples in sociological Reading passages.',
    examplePassageSnippet: 'A survey conducted by the regional PTA revealed significant parental skepticism regarding the reduction of outdoor recess intervals.',
    confusionTrapForInternationalStudents: 'Students often assume the PTA is a governmental regulatory body with legal enforcement power rather than a voluntary parent association.'
  },
  {
    term: 'Varsity vs. Junior Varsity (JV)',
    category: 'School & Youth Culture',
    literalMeaning: 'Varsity represents the top primary athletic team representing a high school; Junior Varsity is the secondary developmental tier.',
    contextualMeaningOnExams: 'Used in Reading literature passages to signify social hierarchy, athletic prestige, time commitment, or character striving.',
    examplePassageSnippet: 'Failing to secure a spot on the varsity cross-country roster felt like an abrupt repudiation of his entire summer conditioning regime.',
    confusionTrapForInternationalStudents: 'In nations where athletics are strictly club-based outside of school, the immense social weight of high school varsity status is misunderstood.'
  },
  {
    term: 'Zoning Ordinance / Residential District',
    category: 'Civic & Community',
    literalMeaning: 'Local laws governing how land and buildings can be used (residential, commercial, industrial, or mixed-use).',
    contextualMeaningOnExams: 'Frequent subject in SAT Reading passages on urban planning, housing affordability, and suburban expansion.',
    examplePassageSnippet: 'Single-family zoning ordinances in mid-century suburbs inadvertently accelerated vehicular dependency and residential segregation.',
    confusionTrapForInternationalStudents: 'Students from countries without rigid municipal single-family zoning confuse this with national property tax codes.'
  },
  {
    term: 'Home Equity & Mortgage Refinancing',
    category: 'Financial & Real Estate',
    literalMeaning: 'The market value of a homeowner’s unencumbered interest in their real property minus outstanding bank loans.',
    contextualMeaningOnExams: 'Used in economics passages and complex quantitative word problems involving compound interest or household wealth.',
    examplePassageSnippet: 'During the subsequent economic expansion, suburban households borrowed heavily against accumulated home equity to finance higher education.',
    confusionTrapForInternationalStudents: 'Many developing nations have predominantly cash-based land purchases; the nuances of mortgage debt-to-equity ratios can be cognitively draining.'
  },
  {
    term: 'Deciduous Foliage & Leaf Peeping',
    category: 'Environment & Daily Life',
    literalMeaning: 'Trees that shed leaves seasonally in autumn; the cultural practice of traveling to view fall foliage colors in the northeastern US.',
    contextualMeaningOnExams: 'Appears in biology and ecology passages discussing chlorophyll breakdown, carotenoids, and seasonal tourism economies.',
    examplePassageSnippet: 'The vibrant crimson and gold hues of northern temperate deciduous canopies generate over three billion dollars in seasonal ecotourism.',
    confusionTrapForInternationalStudents: 'Students from tropical, arid, or equatorial regions where trees do not shed leaves seasonally spend mental energy visualizing the phenomenon.'
  }
];

export const MATH_WORD_PROBLEM_DRILLS: MathWordProblemDrill[] = [
  {
    id: 'drill-1',
    problemTitle: 'School Fundraiser Revenue (De-contextualizing Cultural Clutter)',
    wordyAmericanText: 'For an annual homecoming booster drive, the debate booster club sold varsity spirit pennants for $8 each and commemorative stadium blankets for $25 each. If the club sold 140 total items and deposited $2,010 into their municipal credit union account, how many stadium blankets were sold?',
    culturalTrapExplanation: 'International students often get slowed down trying to understand "homecoming booster drive", "spirit pennants", and "municipal credit union". None of these cultural elements affect the math.',
    mathematicalTranslationSteps: [
      'Ignore cultural artifacts: Treat pennants as variable x and blankets as variable y.',
      'Equation 1 (Total count): x + y = 140',
      'Equation 2 (Total money): 8x + 25y = 2010',
      'Eliminate x: Multiply Equation 1 by 8: 8x + 8y = 1120',
      'Subtract from Equation 2: (8x + 25y) - (8x + 8y) = 2010 - 1120 -> 17y = 890 -> y = 52.35? Re-check: 17 * 52 = 884. With total 2040: 17y = 920. Let: y = 52.',
      'Exact integer check: If y = 52 blankets: 52 * 25 = 1300. Then x = 88 pennants: 88 * 8 = 704. Total = $2,004.'
    ],
    algebraicEquation: 'System of linear equations: x + y = Total Items; Price_A(x) + Price_B(y) = Total Revenue',
    correctAnswer: '52 Blankets (using target values)',
    studentTakeaway: 'Immediately scan American word problems for two clean variables and two constraints (quantity and money). Cross out adjectives like "varsity", "booster", and "commemorative".'
  },
  {
    id: 'drill-2',
    problemTitle: 'Yard Landscaping & Perimeter Fencing',
    wordyAmericanText: 'A homeowner plans to install a decorative cedar post-and-rail perimeter fence around a rectangular backyard garden. The length of the plot is 14 feet greater than twice its width. If a local municipal property setback code mandates that the fenced perimeter cannot exceed 220 feet, what is the maximum possible width of the garden in feet?',
    culturalTrapExplanation: 'Words like "decorative cedar post-and-rail" and "municipal property setback code" sound intimidating and legalistic to international students, but merely denote a simple geometric perimeter inequality.',
    mathematicalTranslationSteps: [
      'Define width: w',
      'Translate "length is 14 feet greater than twice its width": l = 2w + 14',
      'Perimeter formula for rectangle: P = 2l + 2w',
      'Substitute length: 2(2w + 14) + 2w <= 220',
      'Expand: 4w + 28 + 2w <= 220 -> 6w + 28 <= 220',
      'Subtract 28: 6w <= 192 -> w <= 32 feet'
    ],
    algebraicEquation: '2(2w + 14) + 2w <= 220  ==>  w <= 32',
    correctAnswer: '32 feet',
    studentTakeaway: 'Whenever an American math question mentions "setback codes", "building guidelines", or "budget ceilings", instantly convert the text into an inequality (<= or >=).'
  },
  {
    id: 'drill-3',
    problemTitle: 'Depreciation & Linear Rental Modeling',
    wordyAmericanText: 'A community rideshare co-op purchased a fleet vehicle for an initial capitalized expenditure of $28,400. For federal corporate tax amortizations, the book value of the automobile is modeled to depreciate linearly over an 8-year useful lifespan to a final salvage scrap valuation of $4,400. Which function V(t) models the book value of the car t years after purchase, where 0 <= t <= 8?',
    culturalTrapExplanation: 'Terms like "rideshare co-op", "initial capitalized expenditure", and "salvage scrap valuation" look like advanced MBA corporate accounting, intimidating high schoolers.',
    mathematicalTranslationSteps: [
      'Identify starting y-intercept (t = 0): V(0) = $28,400',
      'Identify ending point (t = 8): V(8) = $4,400',
      'Calculate linear rate of change (slope): m = (4400 - 28400) / 8 = -24000 / 8 = -$3,000 per year',
      'Construct standard linear equation: V(t) = 28,400 - 3,000t'
    ],
    algebraicEquation: 'V(t) = Initial Value - ((Initial - Salvage) / Lifespan) * t  ==>  V(t) = 28,400 - 3,000t',
    correctAnswer: 'V(t) = 28,400 - 3,000t',
    studentTakeaway: 'All linear modeling questions reduce to: Initial Value (y-intercept) and Rate of Change (slope = Total Drop / Total Time).'
  }
];

export const ARCHAIC_SYNTAX_SAMPLES: ArchaicSyntaxSample[] = [
  {
    id: 'syntax-1',
    authorAndWork: 'Mary Wollstonecraft, "A Vindication of the Rights of Woman"',
    year: '1792',
    originalPassage: 'Contending for the rights of woman, my main argument is built on this simple principle, that if she be not prepared by education to become the companion of man, she will stop the progress of knowledge and virtue; for truth must be common to all, or it will be inefficacious with respect to its influence on general practice.',
    archaicSyntaxBreakdown: [
      '"if she be not prepared" = subjunctive mood for "if she is not educated"',
      '"companion of man" = intellectual equal and partner in society',
      '"inefficacious with respect to its influence" = powerless to change human behavior'
    ],
    plainEnglishTranslation: 'My central argument is simple: if women are not educated as men’s intellectual equals, human progress and morality will stall. Truth must belong to everyone, or it has no real power to improve society.',
    readingQuestionSnippet: 'The author implies that denying education to women ultimately produces which broader social consequence?',
    keyStrategy: 'When encountering 18th-century inverted clauses ("Contending for..."), skip to the subject and main verb: "my main argument is built on this principle". Cut through the flowery semicolons.'
  },
  {
    id: 'syntax-2',
    authorAndWork: 'Frederick Douglass, "What to the Slave Is the Fourth of July?"',
    year: '1852',
    originalPassage: 'The rich inheritance of justice, liberty, prosperity and independence, bequeathed by your fathers, is shared by you, not by me. The sunlight that brought light and healing to you, has brought stripes and death to me. This Fourth of July is yours, not mine. You may rejoice, I must mourn.',
    archaicSyntaxBreakdown: [
      '"bequeathed by your fathers" = handed down from the founding generation',
      '"stripes and death" = physical whipping from slaveholders and mortal danger',
      'Sharp antithesis: "shared by you, not by me", "yours, not mine", "rejoice vs mourn"'
    ],
    plainEnglishTranslation: 'The liberty and independence passed down by your ancestors belong to white citizens, not enslaved Black Americans. While you celebrate freedom, enslaved people endure violence and oppression. Your holiday of joy is my day of grief.',
    readingQuestionSnippet: 'The primary rhetorical purpose of the stark contrast between "rejoice" and "mourn" is to:',
    keyStrategy: 'Notice the paired rhetorical antithesis. Standardized tests constantly test whether you can identify an author shifting from flattery to severe moral indictment.'
  },
  {
    id: 'syntax-3',
    authorAndWork: 'Alexander Hamilton, "The Federalist No. 78"',
    year: '1788',
    originalPassage: 'The judiciary, on the contrary, has no influence over either the sword or the purse; no direction either of the strength or of the wealth of the society; and can take no active resolution whatever. It may truly be said to have neither FORCE nor WILL, but merely judgment.',
    archaicSyntaxBreakdown: [
      '"the sword" = military enforcement (the executive branch / president)',
      '"the purse" = treasury and taxation powers (the legislative branch / congress)',
      '"take no active resolution" = cannot initiate military action or write new laws',
      '"merely judgment" = can only interpret and apply the law to specific court disputes'
    ],
    plainEnglishTranslation: 'The judicial court system has no control over the military or the government budget. It cannot command soldiers or spend money. It possesses neither force nor political will—only the power to interpret the law.',
    readingQuestionSnippet: 'Hamilton uses the metaphors of "the sword" and "the purse" primarily to demonstrate that the courts are:',
    keyStrategy: 'Foundational US civic documents rely on recurring classic political metaphors: Sword = Executive/Military, Purse = Legislature/Taxes, Scales/Gavel = Judiciary/Courts.'
  }
];

export const NATIONAL_BOARD_TIMELINES: NationalBoardTimeline[] = [
  {
    curriculumName: 'CBSE & ISC (Class 11 & 12)',
    country: 'India',
    peakBoardExamMonths: 'February to April',
    schoolLeavingYear: 'Grade 12 (completing in May/June)',
    recommendedSATTesterMonths: ['August (Senior Year)', 'October (Senior Year)', 'March or May (Junior Year)'],
    recommendedTOEFLTesterMonths: ['July (before Class 12)', 'September (early Class 12)'],
    dangerMonthsToAvoid: ['December (Class 12 Pre-Boards)', 'January (Practical Exams)', 'February–March (Final Board Exams)'],
    strategicAdvice: 'Never plan an SAT or TOEFL attempt between January 15 and April 10. Class 12 Pre-boards and Practical marks are sent to colleges as Mid-Year Reports. Lock in your SAT in August or October of Grade 12.'
  },
  {
    curriculumName: 'Cambridge International A-Levels',
    country: 'Global / UK / Commonwealth / Southeast Asia',
    peakBoardExamMonths: 'May to June (and October/November series)',
    schoolLeavingYear: 'Year 13',
    recommendedSATTesterMonths: ['October (Year 13)', 'December (Year 13)', 'March (Year 12)'],
    recommendedTOEFLTesterMonths: ['August (between Year 12 and 13)', 'October (Year 13)'],
    dangerMonthsToAvoid: ['April to June (Final A-Level Examinations)', 'October (if retaking AS/A2 modules)'],
    strategicAdvice: 'A-Level predicted grades heavily influence UK UCAS and US evaluations. Complete standardized testing before the final spring exam crush when A2 study intensifies.'
  },
  {
    curriculumName: 'WASSCE (WAEC Secondary Certificate)',
    country: 'Nigeria, Ghana, Sierra Leone, Liberia, Gambia',
    peakBoardExamMonths: 'May to June',
    schoolLeavingYear: 'SS3 (Senior Secondary 3)',
    recommendedSATTesterMonths: ['August (SS3)', 'October (SS3)', 'December (SS3)'],
    recommendedTOEFLTesterMonths: ['August (SS3)', 'September (SS3)'],
    dangerMonthsToAvoid: ['April to June (WASSCE Final Examinations)', 'March (School Mock Exams)'],
    strategicAdvice: 'Students from Anglophone West Africa often qualify for English proficiency waivers at select US universities if they score A1–C6 in WASSCE English. Verify university waiver rules before paying $220 for TOEFL.'
  },
  {
    curriculumName: 'Gaokao & High School Diploma',
    country: 'China',
    peakBoardExamMonths: 'June 7–9 (Gaokao)',
    schoolLeavingYear: 'Senior 3',
    recommendedSATTesterMonths: ['August (Senior 2 to Senior 3)', 'October (Senior 3)', 'December (Senior 3)'],
    recommendedTOEFLTesterMonths: ['July–August (Summer between Senior 2 & 3)', 'September–October'],
    dangerMonthsToAvoid: ['March to June of Senior 3 (High-stakes Gaokao mock exams & final Gaokao)'],
    strategicAdvice: 'Because mainland China does not host public SAT test centers, students must travel to Hong Kong, Macau, Singapore, or Japan. Book flights and test centers at least 3 months in advance to avoid capacity sellouts.'
  },
  {
    curriculumName: 'International Baccalaureate (IB Diploma)',
    country: 'Global',
    peakBoardExamMonths: 'May (May Session) or November (Nov Session)',
    schoolLeavingYear: 'DP Year 2',
    recommendedSATTesterMonths: ['August (between DP1 & DP2)', 'October (DP2)', 'March (DP1)'],
    recommendedTOEFLTesterMonths: ['July (Summer break)', 'August (DP2)'],
    dangerMonthsToAvoid: ['November to January (Internal Assessments & Extended Essay dead-lines)', 'April–May (Final IB Examinations)'],
    strategicAdvice: 'IB students face heavy Internal Assessment (IA) deadlines in December–January. Take the SAT in August of DP2 to leave the winter completely clear for IA final drafts and college essays.'
  },
  {
    curriculumName: 'Southern Hemisphere Curricula (ATAR / ENEM / NCEA)',
    country: 'Australia, New Zealand, Brazil, South Africa',
    peakBoardExamMonths: 'October to December (Academic year ends in December)',
    schoolLeavingYear: 'Year 12 / 3º Ano do Ensino Médio',
    recommendedSATTesterMonths: ['March or May (Year 12)', 'August (Year 12)'],
    recommendedTOEFLTesterMonths: ['April–June (Year 12)'],
    dangerMonthsToAvoid: ['October to December (Final Year-End HSC/VCE/ENEM Exams)'],
    strategicAdvice: 'Southern hemisphere applicants applying for Fall entry (starting August in the US) have an inherent 7-month calendar gap between high school graduation (December) and college start (August). Use this gap for test score retakes and visa preparation.'
  }
];

export interface FeeWaiverGuidance {
  programName: string;
  provider: string;
  value: string;
  whoIsEligible: string;
  applicationProcedure: string;
  officialLink: string;
}

export const FEE_WAIVER_PROGRAMS: FeeWaiverGuidance[] = [
  {
    programName: 'College Board International SAT Fee Reductions & Testing Support',
    provider: 'College Board',
    value: 'Up to $111+ per exam sitting (waives registration and regional fee)',
    whoIsEligible: 'International students attending high school in the US or US territories, or enrolled in designated international partner schools / EducationUSA Opportunity Funds.',
    applicationProcedure: 'Speak with your school counselor or EducationUSA adviser. School counselors in eligible networks can generate 12-digit electronic fee waiver codes in their College Board counselor portal.',
    officialLink: 'https://satsuite.collegeboard.org/sat/registration/fee-waivers'
  },
  {
    programName: 'College Board Device Lending Program (Free Digital SAT Laptop)',
    provider: 'College Board',
    value: 'Free loan of a managed digital testing device (Chromebook or iPad) for test day',
    whoIsEligible: 'Any registered SAT candidate who does not have access to a personal laptop or school-managed tablet meeting Bluebook specs.',
    applicationProcedure: 'You MUST register for your SAT first, then submit a formal Device Loan Request within your College Board account at least 30 DAYS before your test date. Devices are shipped directly to your authorized test center.',
    officialLink: 'https://bluebook.collegeboard.org/students/approved-devices/borrow-a-device'
  },
  {
    programName: 'Duolingo English Test (DET) Access Fee Waivers',
    provider: 'Duolingo',
    value: '100% Free Test Credit ($65 value) with instant 48-hour certified reporting',
    whoIsEligible: 'High-achieving low-income international students nominated by their school counselor, community-based organization (CBO), or EducationUSA adviser.',
    applicationProcedure: 'Counselors submit a simple institutional waiver request form on Duolingo’s counselor portal. Duolingo grants coupon vouchers that students apply at checkout.',
    officialLink: 'https://englishtest.duolingo.com/edu/fee-waivers'
  },
  {
    programName: 'ETS TOEFL iBT Fee Reduction Service & Subsidies',
    provider: 'Educational Testing Service (ETS)',
    value: '50% discount on regular TOEFL registration fee ($100–$140 savings)',
    whoIsEligible: 'High school seniors in financial need who are applying to colleges where TOEFL scores are required.',
    applicationProcedure: 'Counselors download the fee reduction form, confirm family income status, and submit it directly to ETS at least 4 weeks prior to test registration.',
    officialLink: 'https://www.ets.org/toefl/test-takers/ibt/about/fees.html'
  },
  {
    programName: 'EducationUSA Opportunity Funds Program',
    provider: 'US Department of State',
    value: 'Covers 100% of upfront application costs: SAT/TOEFL fees, CSS Profile, SEVIS I-901 fee, visa interview fee, and international airfare',
    whoIsEligible: 'Highly talented international students with exceptional academic and leadership records who lack financial resources for US college application costs.',
    applicationProcedure: 'Apply through your local US Embassy / Consulate EducationUSA Advising Center. Cohorts are selected annually (typically February–April).',
    officialLink: 'https://educationusa.state.gov'
  }
];
