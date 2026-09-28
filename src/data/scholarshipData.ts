export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  targetDestinations: string[];
  awardAmount: string;
  degreeLevels: string[];
  eligibility: string;
  applicationDeadline: string;
  keyDetails: string;
  officialLink: string;
}

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'fulbright',
    name: 'Fulbright Foreign Student Program',
    provider: 'U.S. Department of State',
    targetDestinations: ['United States'],
    awardAmount: 'Full tuition, living stipend, health insurance & round-trip airfare (Full Ride)',
    degreeLevels: ['Master\'s', 'Ph.D.'],
    eligibility: 'Graduating seniors and young professionals from ~160 participating countries worldwide. High academic record.',
    applicationDeadline: 'Varies by country (typically April - October of preceding year)',
    keyDetails: 'The premier binational academic exchange program funded by the US government. Recipients are expected to return home for 2 years to share knowledge.',
    officialLink: 'https://foreign.fulbrightonline.org'
  },
  {
    id: 'chevening',
    name: 'Chevening Scholarships',
    provider: 'UK Foreign, Commonwealth and Development Office (FCDO)',
    targetDestinations: ['United Kingdom'],
    awardAmount: 'Full university tuition, monthly living allowance, economy flights & arrival grant',
    degreeLevels: ['1-Year Master\'s'],
    eligibility: 'Citizens of Chevening-eligible countries with at least 2 years of work experience and demonstrable leadership track record.',
    applicationDeadline: 'Early November annually',
    keyDetails: 'Covers any eligible 1-year master’s degree at any UK university. Highly prestigious global network of leaders and policymakers.',
    officialLink: 'https://www.chevening.org'
  },
  {
    id: 'daad',
    name: 'DAAD Scholarships (Deutscher Akademischer Austauschdienst)',
    provider: 'German Academic Exchange Service',
    targetDestinations: ['Germany'],
    awardAmount: '€934 - €1,300 monthly living stipend + health insurance + travel allowance (German public tuition is €0)',
    degreeLevels: ['Master\'s', 'Ph.D.'],
    eligibility: 'International students with outstanding academic records; bachelor completed within past 6 years.',
    applicationDeadline: 'Varies by study program (typically July - October)',
    keyDetails: 'Offers diverse programs such as Helmut Schmidt (Public Policy), EPOS (Development-Related Postgraduate Courses), and STEM research grants.',
    officialLink: 'https://www.daad.de'
  },
  {
    id: 'erasmus',
    name: 'Erasmus Mundus Joint Master Degrees (EMJM)',
    provider: 'European Union',
    targetDestinations: ['Multi-Country Europe (e.g. France, Germany, Sweden, Italy)'],
    awardAmount: 'Full tuition waiver + €1,400 monthly living allowance + travel and installation costs',
    degreeLevels: ['Master\'s'],
    eligibility: 'Open to students worldwide holding an undergraduate bachelor degree in relevant field.',
    applicationDeadline: 'December - February annually',
    keyDetails: 'Students study at at least two different European universities in different countries and graduate with a joint or double master degree.',
    officialLink: 'https://erasmus-plus.ec.europa.eu'
  },
  {
    id: 'knight-hennessy',
    name: 'Knight-Hennessy Scholars',
    provider: 'Stanford University',
    targetDestinations: ['United States (Stanford)'],
    awardAmount: 'Full tuition, room and board, books, academic supplies, travel stipend & living stipend',
    degreeLevels: ['Master\'s', 'Ph.D.', 'MD', 'JD', 'MBA'],
    eligibility: 'Open to citizens of all countries applying to any graduate program at Stanford University.',
    applicationDeadline: 'Early October annually',
    keyDetails: 'Builds a multidisciplinary community of global leaders to address complex systemic challenges.',
    officialLink: 'https://knight-hennessy.stanford.edu'
  },
  {
    id: 'gates-cambridge',
    name: 'Gates Cambridge Scholarship',
    provider: 'Bill & Melinda Gates Foundation & University of Cambridge',
    targetDestinations: ['United Kingdom (Cambridge)'],
    awardAmount: 'Full cost of studying at Cambridge (£45,000+ / year value) + £20,000 maintenance allowance',
    degreeLevels: ['Master\'s', 'Ph.D.'],
    eligibility: 'Citizens of any country outside the United Kingdom with outstanding intellectual ability and commitment to improving others\' lives.',
    applicationDeadline: 'Early December / January depending on course',
    keyDetails: 'One of the most competitive awards globally. Approximately 80 scholarships awarded each year.',
    officialLink: 'https://www.gatescambridge.org'
  },
  {
    id: 'pearson',
    name: 'Lester B. Pearson International Scholarship',
    provider: 'University of Toronto',
    targetDestinations: ['Canada (Univ of Toronto)'],
    awardAmount: 'Full 4-year tuition, books, incidental fees, and full residence support',
    degreeLevels: ['Undergraduate Bachelor\'s'],
    eligibility: 'High school international students nominated by their school counselor who demonstrate exceptional academic achievement and leadership.',
    applicationDeadline: 'School nomination by November; student application by January',
    keyDetails: 'Recognizes students who demonstrate exceptional academic achievement and creativity and who are recognized as leaders within their school.',
    officialLink: 'https://future.utoronto.ca/pearson'
  }
];

export const FINANCIAL_AID_GUIDE = {
  needBlindVsNeedAware: {
    title: 'Need-Blind vs. Need-Aware for International Students',
    explanation: 'In the US, admissions policy regarding your ability to pay tuition separates universities into two distinct categories:',
    needBlindUniversities: [
      { name: 'Harvard University', policy: '100% Need-blind for ALL students worldwide; meets 100% demonstrated financial need with zero loans. Families earning under $85,000 pay $0 toward tuition, room, and board.' },
      { name: 'Princeton University', policy: '100% Need-blind internationally; all aid is grant-based (no student loans). Families earning up to $100,000 pay $0 towards full attendance costs.' },
      { name: 'Yale University', policy: '100% Need-blind internationally; family income under $85,000 pays $0 towards tuition, room, and board with zero parent contribution.' },
      { name: 'Massachusetts Institute of Technology (MIT)', policy: '100% Need-blind internationally; meets 100% of demonstrated need with no loans. Families earning under $85,000 pay $0 tuition.' },
      { name: 'Dartmouth College', policy: 'Need-blind for all international undergraduate applicants; meets 100% demonstrated need.' },
      { name: 'Amherst College', policy: 'Need-blind admissions and meets full demonstrated need without loans for all students globally.' },
      { name: 'Bowdoin College', policy: 'Need-blind for all international students with 100% grant-based financial aid packages.' },
      { name: 'Brown University', policy: 'Fully need-blind admissions for all international students starting with the Class of 2029 (Fall 2025 matriculation).' },
      { name: 'University of Notre Dame', policy: 'Need-blind admissions for all undergraduate applicants worldwide, including international students, meeting 100% of demonstrated need.' }
    ],
    needAwareNote: 'At Need-Aware institutions (the majority of US colleges), applying for substantial financial aid increases the difficulty of admission because the financial aid budget is capped for international applicants. If you can afford full or partial tuition, your acceptance probability is higher at need-aware schools.'
  },
  formsRequired: [
    {
      form: 'CSS Profile (College Scholarship Service)',
      provider: 'College Board',
      purpose: 'Standard online application used by ~400 US colleges to award institutional non-federal financial aid.',
      keyDocuments: 'Parent tax returns, W-2/employer earnings slips, bank account balances, home equity, business assets, and living expenses.'
    },
    {
      form: 'ISFAA (International Student Financial Aid Application)',
      provider: 'Individual Universities',
      purpose: 'Alternative paper/PDF financial aid form used by institutions that do not accept the CSS Profile or to waive CSS submission fees.',
      keyDocuments: 'Notarized bank statements, parent salary letters, currency conversion calculations.'
    },
    {
      form: 'Certification of Finances (COF)',
      provider: 'Admissions Offices',
      purpose: 'Required by federal law before issuing an I-20 visa document. Proves you have liquid funds for at least the first year of study.',
      keyDocuments: 'Official bank sponsorship letter, loan sanction letter, or government scholarship award letter.'
    }
  ]
};
