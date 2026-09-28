import express from 'express';
import type { Request, Response } from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialise Gemini SDK with environment API key if provided
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI with key:', err);
  }
}

// Robust fallback test bank for SAT & TOEFL
const CURATED_MOCK_QUESTIONS = [
  {
    id: 'sat-curated-1',
    exam: 'SAT',
    section: 'Reading & Writing',
    skillCategory: 'Craft & Structure (Words in Context)',
    passage: 'Biologist Elena Vance observes that while urban green spaces are often assumed to be homogeneous sanctuaries for biodiversity, their ecological quality is decidedly ______; micro-habitats vary dramatically according to soil compaction, traffic pollution, and vegetation density.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      { id: 'A', text: 'uniform' },
      { id: 'B', text: 'heterogeneous' },
      { id: 'C', text: 'superfluous' },
      { id: 'D', text: 'indomitable' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence sets up a contrast between what is "assumed" ("homogeneous sanctuaries") and what is actually observed ("micro-habitats vary dramatically"). "Heterogeneous" means diverse or consisting of dissimilar elements, making it the exact antonym needed to complete the contrast.',
    testHacks: 'Context Clue Rule: Whenever you see "while [X] is assumed to be [Y], it is actually ______", look for the direct antonym of Y.',
    timeTargetSeconds: 70
  },
  {
    id: 'sat-curated-2',
    exam: 'SAT',
    section: 'Reading & Writing',
    skillCategory: 'Standard English Conventions (Boundaries)',
    passage: 'Ancient Roman aqueducts relied predominantly on gravity to convey water across immense distances ______ the Pont du Gard in southern France spans across the Gardon River at a height of 48.8 meters while dropping merely 2.5 centimeters over its entire length.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: [
      { id: 'A', text: 'distances, for example,' },
      { id: 'B', text: 'distances; for example,' },
      { id: 'C', text: 'distances, for example' },
      { id: 'D', text: 'distances for example,' }
    ],
    correctAnswer: 'B',
    explanation: 'The sentence consists of two independent clauses: Clause 1 ends at "distances", and Clause 2 begins with "for example, the Pont du Gard...". Two independent clauses cannot be joined with just a comma (comma splice). A semicolon followed by a transitional phrase ("distances; for example,") is grammatically required.',
    testHacks: 'Clause Splice Check: Check if text before and after the transitional phrase can stand alone as complete sentences. If yes, you must use a semicolon or period.',
    timeTargetSeconds: 65
  },
  {
    id: 'sat-curated-3',
    exam: 'SAT',
    section: 'Math',
    skillCategory: 'Advanced Math (Quadratic Functions)',
    passage: 'A projectile is launched from a platform. The height h(t), in meters, of the projectile t seconds after launch is modeled by the equation: h(t) = -4.9t^2 + 29.4t + 15.',
    question: 'After how many seconds does the projectile reach its maximum height above the ground?',
    options: [
      { id: 'A', text: '2.5' },
      { id: 'B', text: '3.0' },
      { id: 'C', text: '4.9' },
      { id: 'D', text: '6.0' }
    ],
    correctAnswer: 'B',
    explanation: 'For a quadratic function in standard form h(t) = at^2 + bt + c, the vertex occurs at t = -b / (2a). Here, a = -4.9 and b = 29.4. Therefore, t = -29.4 / (2 * -4.9) = -29.4 / -9.8 = 3.0 seconds.',
    testHacks: 'Desmos Shortcut: Type y = -4.9x^2 + 29.4x + 15 into Desmos. Click on the apex vertex point of the parabola to immediately read coordinates (3, 59.1). The x-coordinate (3) is your answer in 5 seconds!',
    timeTargetSeconds: 60
  },
  {
    id: 'sat-curated-4',
    exam: 'SAT',
    section: 'Math',
    skillCategory: 'Algebra (Linear Systems)',
    passage: 'A university bookstore charges $14 for each hardcover notebook and $8 for each softcover notebook. An engineering department ordered a total of 60 notebooks for $660.',
    question: 'How many hardcover notebooks did the engineering department purchase?',
    options: [
      { id: 'A', text: '25' },
      { id: 'B', text: '30' },
      { id: 'C', text: '35' },
      { id: 'D', text: '40' }
    ],
    correctAnswer: 'B',
    explanation: 'Let h = hardcover and s = softcover. System of equations: (1) h + s = 60, (2) 14h + 8s = 660. From (1), s = 60 - h. Substitute into (2): 14h + 8(60 - h) = 660 -> 14h + 480 - 8h = 660 -> 6h = 180 -> h = 30.',
    testHacks: 'Desmos Shortcut: In Desmos, type "x + y = 60" on line 1 and "14x + 8y = 660" on line 2. Click the intersection point (30, 30). The x-value (hardcover) is 30.',
    timeTargetSeconds: 50
  },
  {
    id: 'toefl-curated-1',
    exam: 'TOEFL',
    section: 'Reading',
    skillCategory: 'Factual Information & Inference',
    passage: 'Geothermal energy systems exploit the natural thermodynamic gradient of the Earth\'s crust. While hydrothermal reservoirs containing pressurized steam are the most commercially mature, Enhanced Geothermal Systems (EGS) inject cold fluid into deep, impermeable crystalline basement rock under hydraulic stimulation, creating artificial permeability networks.',
    question: 'According to the passage, how do Enhanced Geothermal Systems (EGS) differ from traditional hydrothermal reservoirs?',
    options: [
      { id: 'A', text: 'EGS rely entirely on naturally occurring steam vents at shallow surface depths.' },
      { id: 'B', text: 'EGS mechanically fracture impermeable deep rock to introduce fluid and induce permeability.' },
      { id: 'C', text: 'EGS do not generate any measurable thermodynamic gradient.' },
      { id: 'D', text: 'EGS have been commercially mature since the early nineteenth century.' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage explicitly states that EGS "inject cold fluid into deep, impermeable crystalline basement rock under hydraulic stimulation, creating artificial permeability networks." This directly matches Choice B.',
    testHacks: 'Elimination Strategy: Choices A and D contradict the text directly (steam is traditional, and EGS uses deep impermeable rock, not shallow vents). Choice C contradicts the premise of geothermal energy.',
    timeTargetSeconds: 90
  },
  {
    id: 'toefl-curated-2',
    exam: 'TOEFL',
    section: 'Reading',
    skillCategory: 'Vocabulary in Context',
    passage: 'In arid ecosystems, the presence of biological soil crusts is pivotal; they curb wind erosion, augment nitrogen fixation, and facilitate seed germination.',
    question: 'The word "pivotal" in the passage is closest in meaning to:',
    options: [
      { id: 'A', text: 'peripheral' },
      { id: 'B', text: 'indispensable' },
      { id: 'C', text: 'incidental' },
      { id: 'D', text: 'precarious' }
    ],
    correctAnswer: 'B',
    explanation: '"Pivotal" means of crucial or vital importance. The list of positive benefits ("curb wind erosion, augment nitrogen fixation, facilitate seed germination") indicates the crusts are critically essential ("indispensable").',
    testHacks: 'Tone & Function: "Peripheral" and "incidental" mean minor/secondary, which contradict the three vital ecological roles listed.',
    timeTargetSeconds: 60
  }
];

// Endpoint: Generate Mock Test Questions via Gemini API (with fallback)
app.post('/api/generate-mock-test', async (req: Request, res: Response) => {
  const { exam = 'SAT', section = 'Reading & Writing', difficulty = 'Medium', questionCount = 4 } = req.body;

  if (aiClient) {
    try {
      const prompt = `You are a Senior Test Item Developer for the official ${exam === 'SAT' ? 'College Board Digital SAT' : 'ETS TOEFL iBT'}.
Generate exactly ${questionCount} realistic, exam-authentic multiple-choice questions for the following specification:
- Exam: ${exam}
- Section: ${section}
- Difficulty Level: ${difficulty}

Formatting Rules:
Return a JSON array of objects. Each object MUST strictly follow this JSON schema:
[
  {
    "id": "q1",
    "exam": "${exam}",
    "section": "${section}",
    "skillCategory": "specific skill name (e.g. Craft & Structure, Information & Ideas, Algebra, Advanced Math, Reading Inference, Sentence Insertion)",
    "passage": "A rich, authentic stimulus paragraph (60-120 words) matching modern digital format",
    "question": "The question prompt",
    "options": [
      { "id": "A", "text": "Option text" },
      { "id": "B", "text": "Option text" },
      { "id": "C", "text": "Option text" },
      { "id": "D", "text": "Option text" }
    ],
    "correctAnswer": "A" | "B" | "C" | "D",
    "explanation": "Clear, detailed breakdown explaining why the correct answer is right and why the other 3 options are incorrect.",
    "testHacks": "${exam === 'SAT' ? 'Desmos calculator trick or grammar rule' : 'ETS elimination strategy or vocabulary note'}",
    "timeTargetSeconds": 75
  }
]
Output ONLY valid JSON without Markdown blocks.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text?.trim() || '';
      if (text) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return res.json({
            source: 'gemini-ai',
            model: 'gemini-3.8-flash',
            questions: parsed,
          });
        }
      }
    } catch (error) {
      console.warn('Gemini API call failed or timed out, returning curated authentic questions:', error);
    }
  }

  // Graceful fallback: Filter curated questions matching exam or return diverse set
  const filtered = CURATED_MOCK_QUESTIONS.filter((q) => q.exam === exam);
  const selected = filtered.length > 0 ? filtered : CURATED_MOCK_QUESTIONS;
  
  return res.json({
    source: 'curated-authentic-bank',
    note: 'Curated official-format question bank',
    questions: selected,
  });
});

// Endpoint: AI Writing & Essay Evaluation
app.post('/api/evaluate-writing', async (req: Request, res: Response) => {
  const { essay, prompt: taskPrompt, taskType = 'toefl_discussion' } = req.body;

  if (!essay || essay.trim().length < 20) {
    return res.status(400).json({ error: 'Please submit a response with at least 20 words for meaningful evaluation.' });
  }

  if (aiClient) {
    try {
      const prompt = `You are an official ETS TOEFL iBT and College Board writing examiner.
Evaluate this student's response for the following task:
Task Prompt: "${taskPrompt || 'Academic Discussion'}"
Student Essay:
"""
${essay}
"""

Provide an official rubric evaluation formatted strictly as JSON with this schema:
{
  "estimatedScore": 25, // Score out of 30
  "cefrLevel": "C1 Advanced",
  "wordCount": 142,
  "strengths": ["Clear thesis statement", "Appropriate academic register"],
  "areasForImprovement": ["Sentence variety could be expanded", "Minor preposition error in paragraph 2"],
  "detailedFeedback": "Comprehensive 2-3 paragraph critique analyzing grammar, organization, vocabulary precision, and coherence.",
  "revisedSampleSnippet": "A rewritten version of the student's weakest sentence showing how an expert writes it."
}
Return ONLY valid JSON.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text?.trim() || '';
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({ source: 'gemini-ai', evaluation: parsed });
      }
    } catch (err) {
      console.warn('AI evaluation error, providing standard diagnostic:', err);
    }
  }

  // Fallback diagnostic evaluation based on word count & vocabulary heuristics
  const words = essay.trim().split(/\s+/).length;
  let estimated = 22;
  if (words >= 130) estimated = 27;
  else if (words >= 100) estimated = 24;
  else if (words < 70) estimated = 18;

  return res.json({
    source: 'heuristic-engine',
    evaluation: {
      estimatedScore: estimated,
      cefrLevel: estimated >= 26 ? 'C1 Advanced' : estimated >= 22 ? 'B2 Upper-Intermediate' : 'B1 Intermediate',
      wordCount: words,
      strengths: [
        'Directly addresses the main topic prompt',
        'Demonstrates communicative intent and logical progression',
        words >= 100 ? 'Meets recommended word count benchmark (>100 words)' : 'Clear and concise main ideas'
      ],
      areasForImprovement: [
        'Incorporate more academic discourse connectors (e.g., "Furthermore", "Conversely", "Consequently")',
        'Vary sentence structure by blending simple, compound, and complex sentences',
        'Support subjective assertions with specific, concrete empirical examples'
      ],
      detailedFeedback: `Your response contains ${words} words. For the 10-minute TOEFL Academic Discussion task, top scorers (27–30) typically write 110–140 words, contributing a distinct perspective to the professor's question while adding meaningful nuance to classmates' opinions.`,
      revisedSampleSnippet: 'For instance, rather than stating "this is good for companies", write "Consequently, enterprise adoption of distributed models demonstrably enhances retention rates while minimizing operational overhead."'
    }
  });
});

// Endpoint: AI-Powered Universal Global Student Guidance
app.post('/api/global-country-guidance', async (req: Request, res: Response) => {
  const { originCountry = 'India', targetCountry = 'USA', educationLevel = 'undergraduate' } = req.body;

  if (aiClient) {
    try {
      const prompt = `You are a Senior International Education Advisor and Foreign Embassy Visa Consultant.
A student from "${originCountry}" is applying to universities in "${targetCountry}" for "${educationLevel}" studies.

Provide an authoritative, country-specific advisory dossier tailored precisely to this student's origin nation.
Return ONLY valid JSON matching this schema:
{
  "originCountry": "${originCountry}",
  "targetCountry": "${targetCountry}",
  "nationalCurriculumConversion": {
    "localBoard": "Name of standard secondary or university board in ${originCountry}",
    "conversionSummary": "How top grades convert to ${targetCountry} GPA / grading scale",
    "evaluationAgency": "Recommended credential evaluation agency (e.g., WES, ECE, Anabin, APS)"
  },
  "englishWaiverEligibility": {
    "canWaive": false, // true or false
    "explanation": "Specific conditions under which students from ${originCountry} can waive TOEFL/IELTS in ${targetCountry}, or whether test is mandatory."
  },
  "embassyVisaChecklist": [
    "Crucial requirement 1 specific to passport holders from ${originCountry} (e.g., TB testing, police clearance, biometrics, APS)",
    "Crucial requirement 2",
    "Crucial requirement 3",
    "Crucial requirement 4"
  ],
  "proofOfFundsGuidance": {
    "localCurrencyCode": "Currency code for ${originCountry}",
    "localCurrencyEstimatedAmount": "Estimated required funds in local currency for Year 1",
    "acceptedFinancialInstruments": "Accepted financial instruments (e.g., sanctioned bank loans, provident funds, fixed deposits, blocked accounts)"
  },
  "topScholarships": [
    {
      "name": "Scholarship name accessible to citizens of ${originCountry}",
      "benefit": "What it covers",
      "action": "How and when to apply"
    },
    {
      "name": "Scholarship name 2",
      "benefit": "What it covers",
      "action": "How and when to apply"
    }
  ],
  "criticalVisaTrap": "The #1 reason student visa applications from ${originCountry} get rejected by the ${targetCountry} consulate and how to avoid it."
}
Return ONLY valid JSON without markdown wrapping.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text?.trim() || '';
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({ source: 'gemini-ai', guidance: parsed });
      }
    } catch (err) {
      console.warn('AI global guidance error, using fallback:', err);
    }
  }

  // Fallback response for universal nationality guidance
  return res.json({
    source: 'universal-curated',
    guidance: {
      originCountry,
      targetCountry,
      nationalCurriculumConversion: {
        localBoard: `Standard National Examinations Board (${originCountry})`,
        conversionSummary: `Grades in the top 10% convert to ~3.7–4.0 US GPA or First Class Honours. Verified through standard international credential evaluators.`,
        evaluationAgency: 'WES (World Education Services) or SpanTran for USA/Canada; Anabin database for Germany.'
      },
      englishWaiverEligibility: {
        canWaive: false,
        explanation: `Unless your prior education was 100% in a country where English is the official primary language, ${targetCountry} universities mandate an official TOEFL iBT (80–100+), IELTS Academic (6.5–7.5), or Duolingo score.`
      },
      embassyVisaChecklist: [
        `Valid international passport with minimum 6 months validity beyond intended duration of stay`,
        `Official university admission letter, Form I-20 (USA), CAS (UK), PAL/LOA (Canada), or German admission letter`,
        `Documented, verifiable source of living and tuition funds for year 1 with zero third-party unexplained deposits`,
        `Clear demonstration of strong socio-economic ties to ${originCountry} and intent to return upon graduation.`
      ],
      proofOfFundsGuidance: {
        localCurrencyCode: 'USD',
        localCurrencyEstimatedAmount: '$25,000 – $55,000 USD equivalent in local currency',
        acceptedFinancialInstruments: 'Liquid savings accounts, fixed term deposits, sanctioned government/bank education loans, or official government sponsorships.'
      },
      topScholarships: [
        {
          name: 'Fulbright Foreign Student Program',
          benefit: 'Full tuition, monthly living stipend, airfare, and health insurance',
          action: 'Apply through your local US Embassy or Fulbright Commission 12–15 months before study.'
        },
        {
          name: 'Chevening Scholarships (UK)',
          benefit: '100% funded 1-year master’s degree at any UK university',
          action: 'Online applications open annually in August and close in early November.'
        }
      ],
      criticalVisaTrap: `Failing to prove strong non-immigrant intent or relying on unverifiable third-party financial sponsors without clear relationship documentation.`
    }
  });
});

// Endpoint: AI-Generated Custom Form Walkthrough Video Script & Steps
app.post('/api/generate-form-walkthrough', async (req: Request, res: Response) => {
  const { formTitle, targetCountry = 'United States', applicantLevel = 'Undergraduate', specificQuestion = '' } = req.body;

  if (aiClient) {
    try {
      const prompt = `You are a world-class international admissions director and technical visa counselor.
Generate an exhaustive, step-by-step AI video walkthrough script and field-by-field form guidance for an international student.

Form/Topic: "${formTitle || 'General University Application Form'}"
Target Study Destination: "${targetCountry}"
Education Level: "${applicantLevel}"
Specific Question or Focus Area: "${specificQuestion}"

Return a strict, valid JSON object with the following schema:
{
  "walkthroughTitle": "string",
  "targetForm": "string",
  "estimatedTime": "string (e.g. 15 minutes)",
  "overview": "string (concise overview of what this form is and why precision is critical)",
  "chapters": [
    {
      "chapterNumber": 1,
      "title": "string",
      "narrationScript": "string (4-6 sentences of high-value, realistic audio voiceover narration instructing the student on this specific section)",
      "visualScreenAction": "string (what the video shows on screen)",
      "keyFields": [
        {
          "fieldLabel": "string",
          "correctInputExample": "string",
          "instruction": "string"
        }
      ],
      "commonMistake": {
        "mistake": "string",
        "howToAvoid": "string"
      },
      "proTip": "string"
    }
  ],
  "submissionChecklist": ["string (4-6 critical verification checkpoints before clicking Submit)"]
}
`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text?.trim() || '';
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({ source: 'gemini-ai', walkthrough: parsed });
      }
    } catch (err) {
      console.warn('AI form walkthrough error, falling back to curated guide:', err);
    }
  }

  // Fallback high-fidelity walkthrough
  return res.json({
    source: 'curated-fallback',
    walkthrough: {
      walkthroughTitle: `${formTitle || 'Application Form'} AI Video Walkthrough`,
      targetForm: formTitle || 'Standard International University Form',
      estimatedTime: '14 minutes',
      overview: `A complete field-by-field tutorial for ${formTitle || 'your application form'}. Ensures 100% compliance with international admissions, currency reporting, and visa documentation standards.`,
      chapters: [
        {
          chapterNumber: 1,
          title: 'Identity Verification & Passport Synchronization',
          narrationScript: `In Chapter 1, we establish your legal identity. Your first name, middle name, and family surname must correspond exactly with the machine-readable zone of your international passport. Any spelling or date-of-birth discrepancy between your university record and your national passport will trigger severe delays when requesting your visa eligibility document.`,
          visualScreenAction: `Screen zooms into Legal Name input fields; highlights Given Name and Family Name with green verified checkmarks.`,
          keyFields: [
            {
              fieldLabel: 'Legal Given / First Name',
              correctInputExample: 'Exact spelling from passport data page',
              instruction: 'Do not include nicknames or shortened forms.'
            },
            {
              fieldLabel: 'Date of Birth (MM/DD/YYYY)',
              correctInputExample: 'e.g. 05/22/2007 (Month First)',
              instruction: 'Watch out for US vs. International date format inversion.'
            }
          ],
          commonMistake: {
            mistake: 'Entering anglicized nickname or inverting Day and Month.',
            howToAvoid: 'Hold your physical passport in hand while typing this section.'
          },
          proTip: 'Use a permanent personal email address rather than an institutional high school email.'
        },
        {
          chapterNumber: 2,
          title: 'Academic Records, Board Scores & Unconverted Transcripts',
          narrationScript: `In Chapter 2, you report your secondary or collegiate education history. International admissions committees emphasize one cardinal rule: never self-convert your national percentage or grade point system into a foreign scale. Always select your native grading methodology, such as a 100-point percentage scale or your national examination board standards.`,
          visualScreenAction: `Demonstrates selecting native grading scale dropdown; shows uploaded PDF transcript preview with official stamp.`,
          keyFields: [
            {
              fieldLabel: 'Grading Scale System',
              correctInputExample: '100% (Percentage) or Native Examination Board',
              instruction: 'Select exact scale printed on your official transcript.'
            },
            {
              fieldLabel: 'Cumulative Performance',
              correctInputExample: 'e.g. 91.5%',
              instruction: 'Enter exact numerical aggregate without rounding up.'
            }
          ],
          commonMistake: {
            mistake: 'Using unofficial online converters to invent a 4.0 GPA.',
            howToAvoid: 'Leave conversion to the university’s internal international credentials evaluation department.'
          },
          proTip: 'Request your school counselor or registrar to attach your official High School Profile document alongside the transcript.'
        },
        {
          chapterNumber: 3,
          title: 'Financial Affidavits, Sponsorship & Final Submission',
          narrationScript: `In the final chapter, we review financial sponsorship declarations. Whether funded by family liquid savings, government scholarships, or educational loans, all reported monetary amounts must match your supporting bank letters and certified statements. Review your answers in the summary preview before clicking Submit.`,
          visualScreenAction: `Navigates to certified summary page; checks all confirmation disclaimers; clicks final electronic signature button.`,
          keyFields: [
            {
              fieldLabel: 'Source of Financial Support',
              correctInputExample: 'Family Savings / Bank Loan / Sponsor',
              instruction: 'Ensure funds are liquid and verifiable with official bank certification.'
            },
            {
              fieldLabel: 'Electronic Signature',
              correctInputExample: 'Full Legal Name in uppercase',
              instruction: 'Serves as legally binding certification under penalty of application cancellation.'
            }
          ],
          commonMistake: {
            mistake: 'Submitting without downloading a complete PDF copy of the finalized form.',
            howToAvoid: 'Click Print / Save PDF before submitting and archive it in your study abroad records.'
          },
          proTip: 'Note the exact timestamp and transaction confirmation number for future correspondence with the admissions office.'
        }
      ],
      submissionChecklist: [
        'Verified legal name and date of birth match international passport',
        'Academic records reported using official native grading scale',
        'All essay prompts and activity descriptions checked for character limits',
        'Counselor and recommender official email addresses verified',
        'Archived a complete PDF copy of the form for visa and embassy appointments'
      ]
    }
  });
});

// Google Search Console HTML File Verification endpoint
app.get('/google8678f214d1514ab7.html', (req: Request, res: Response) => {
  res.type('text/html');
  res.send('google-site-verification: google8678f214d1514ab7.html');
});

// Robots.txt & Sitemap for Google Search Console and SEO Crawlers
app.get('/robots.txt', (req: Request, res: Response) => {
  const host = req.get('host') || 'localhost';
  const protocol = req.protocol || 'https';
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\n\nSitemap: ${protocol}://${host}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req: Request, res: Response) => {
  const host = req.get('host') || 'localhost';
  const rawProto = req.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  const forwardedProto = rawProto.split(',')[0].trim() || 'https';
  
  // Dynamically resolve base URL matching the requesting domain (Search Console requires sitemap URLs to match the domain)
  let baseUrl = `${forwardedProto}://${host}`.replace(/\/$/, '');
  if (baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
    baseUrl = 'https://globalpath-sat-toefl-foreign-university-admission.ai.studio';
  }
  const currentDate = new Date().toISOString().split('T')[0];

  const sections = [
    { path: '', changefreq: 'daily', priority: '1.0' },
    { path: '?tab=search', changefreq: 'daily', priority: '0.95' },
    { path: '?tab=gmail', changefreq: 'daily', priority: '0.95' },
    { path: '?tab=ai-advisor', changefreq: 'daily', priority: '0.95' },
    { path: '?tab=live-voice', changefreq: 'weekly', priority: '0.90' },
    { path: '?tab=grounded-search', changefreq: 'daily', priority: '0.90' },
    { path: '?tab=sat', changefreq: 'weekly', priority: '0.90' },
    { path: '?tab=toefl', changefreq: 'weekly', priority: '0.90' },
    { path: '?tab=testing-hub', changefreq: 'weekly', priority: '0.90' },
    { path: '?tab=upcoming-dates', changefreq: 'daily', priority: '0.90' },
    { path: '?tab=scholarships', changefreq: 'weekly', priority: '0.90' },
    { path: '?tab=curriculum', changefreq: 'monthly', priority: '0.85' },
    { path: '?tab=equalizer', changefreq: 'weekly', priority: '0.85' },
    { path: '?tab=countries', changefreq: 'monthly', priority: '0.85' },
    { path: '?tab=global-students', changefreq: 'weekly', priority: '0.85' },
    { path: '?tab=mock-tests', changefreq: 'weekly', priority: '0.85' },
    { path: '?tab=calculator', changefreq: 'monthly', priority: '0.80' },
    { path: '?tab=blueprint', changefreq: 'monthly', priority: '0.80' },
    { path: '?tab=video-guides', changefreq: 'weekly', priority: '0.80' },
    { path: '?tab=tracker', changefreq: 'monthly', priority: '0.75' },
    { path: '?tab=resources', changefreq: 'monthly', priority: '0.75' },
    { path: '?tab=compare', changefreq: 'monthly', priority: '0.75' }
  ];

  const xmlEntries = sections.map(sec => `  <url>
    <loc>${baseUrl}/${sec.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${sec.changefreq}</changefreq>
    <priority>${sec.priority}</priority>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlEntries}
</urlset>`;

  res.type('application/xml');
  res.send(xml);
});

// Endpoint: Multi-Turn Gemini Chatbot
// Uses gemini-3.1-pro-preview for complex tasks (Ivy & T20 strategy)
// Uses gemini-3.5-flash with googleSearch tool for general admissions & up-to-date queries
// Uses gemini-3.1-flash-lite for rapid flash drills & quick explanations
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  const { messages, role = 'general-advisor', searchGrounded = true } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }

  let modelName = 'gemini-3.5-flash';
  let systemInstruction = '';
  let tools: any[] | undefined = undefined;

  if (role === 'ivy-strategist') {
    modelName = 'gemini-3.1-pro-preview';
    systemInstruction = `You are GlobalPath's Ivy League & Top 20 Global Admissions Strategist. You specialize in complex holistic profile evaluation, extracurricular spike development, Common App essay critique, and high-stakes scholarship odds for international students aiming for Harvard, MIT, Stanford, Oxford, Cambridge, and top global institutions. Provide deep, rigorous, strategic feedback.`;
  } else if (role === 'flash-drill') {
    modelName = 'gemini-3.1-flash-lite';
    systemInstruction = `You are the GlobalPath Flash Coach. Your job is ultra-fast, direct explanations, rapid-fire vocabulary quizzes, instant SAT math formula checks, and quick conversion drills. Keep responses crisp, punchy, and actionable.`;
  } else {
    // general-advisor
    modelName = 'gemini-3.5-flash';
    systemInstruction = `You are GlobalPath's Senior Admissions & Test Advisor. You provide authoritative, accurate guidance on Digital SAT, TOEFL iBT, international curriculum equivalence (CBSE, IB, A-Levels), application timelines, and student visa processes. Use live Google Search data to ensure all test dates, deadlines, and tuition figures are current.`;
    if (searchGrounded) {
      tools = [{ googleSearch: {} }];
    }
  }

  if (!aiClient) {
    const lastUserQuery = messages[messages.length - 1]?.content || 'General Query';
    return res.json({
      reply: `[GlobalPath AI Advisor]: Here is guidance for your inquiry: "${lastUserQuery.slice(0, 70)}...". For foreign university admissions, ensure your SAT/TOEFL scores match the 75th percentile of admitted students, demonstrate academic rigor (AP/IB/CBSE >90%), and meet the upcoming Deadlines (Early Decision in Nov, Regular in Jan).`,
      modelUsed: modelName,
      sources: []
    });
  }

  try {
    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await aiClient.models.generateContent({
      model: modelName,
      contents: formattedContents,
      config: {
        systemInstruction,
        tools
      }
    });

    const replyText = response.text || 'I analyzed your inquiry, but could not produce a response.';
    
    // Extract search grounding metadata
    let sources: any[] = [];
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    if (groundingMetadata?.groundingChunks) {
      sources = groundingMetadata.groundingChunks
        .map((chunk: any) => chunk.web ? { title: chunk.web.title, uri: chunk.web.uri } : null)
        .filter(Boolean);
    }

    return res.json({
      reply: replyText,
      modelUsed: modelName,
      sources,
      searchQueries: groundingMetadata?.webSearchQueries || []
    });
  } catch (error: any) {
    console.error('Chatbot error:', error);
    return res.json({
      reply: `I encountered an issue generating a live response (${error.message || 'Service overload'}). For ${role === 'ivy-strategist' ? 'complex admissions planning' : 'test preparation'}, always ensure you review official guidelines from College Board, ETS, and respective university portals.`,
      modelUsed: modelName,
      sources: []
    });
  }
});

// Endpoint: Dedicated Search Grounding with Google Search Data (gemini-3.5-flash)
app.post('/api/gemini/search-grounded', async (req: Request, res: Response) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'query required' });

  if (!aiClient) {
    return res.json({
      answer: `Search Grounding query processed: "${query}". Please configure GEMINI_API_KEY for live Google Search web results.`,
      sources: []
    });
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Search Google for the latest and most accurate, up-to-date data to answer this international student admissions query: "${query}". Provide a comprehensive breakdown with specific dates, policy requirements, deadlines, and actionable steps.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const sources = (groundingMetadata?.groundingChunks || [])
      .map((c: any) => c.web ? { title: c.web.title, uri: c.web.uri } : null)
      .filter(Boolean);

    return res.json({
      answer: response.text,
      sources,
      searchQueries: groundingMetadata?.webSearchQueries || []
    });
  } catch (err: any) {
    console.error('Search grounding error:', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch search-grounded answer' });
  }
});

// Vite Middleware integration for development
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

const server = http.createServer(app);

// WebSocket Server for Gemini 3.8 Live API real-time voice streaming
const wss = new WebSocketServer({ server, path: '/api/live-stream' });

wss.on('connection', async (clientWs) => {
  console.log('Client connected to Live Voice WebSocket');

  if (!aiClient) {
    clientWs.send(JSON.stringify({ error: 'Gemini client not initialized' }));
    return;
  }

  try {
    const liveSession = await aiClient.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: ['AUDIO' as any],
        systemInstruction: 'You are GlobalPath Live Voice Counselor: a supportive, knowledgeable international college admissions and standardized test expert. Answer questions directly, encourage students, and provide tactical SAT/TOEFL and university guidance in natural, spoken English.',
      },
      callbacks: {
        onmessage: (message: any) => {
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          const text = message.serverContent?.modelTurn?.parts?.[0]?.text;
          if (audio) {
            clientWs.send(JSON.stringify({ audio, text }));
          }
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
        onclose: () => {
          clientWs.send(JSON.stringify({ status: 'closed' }));
        },
        onerror: (err: any) => {
          clientWs.send(JSON.stringify({ error: err?.message || 'Live session error' }));
        }
      }
    });

    clientWs.on('message', (data: any) => {
      try {
        const payload = JSON.parse(data.toString());
        if (payload.audio) {
          liveSession.sendRealtimeInput({
            audio: { data: payload.audio, mimeType: 'audio/pcm;rate=16000' }
          });
        } else if (payload.text) {
          liveSession.sendRealtimeInput({
            text: payload.text
          });
        }
      } catch (err) {
        console.warn('Failed to parse client message:', err);
      }
    });

    clientWs.on('close', () => {
      try {
        liveSession.close();
      } catch {
        // ignore
      }
    });
  } catch (err: any) {
    console.error('Failed to create live session:', err);
    clientWs.send(JSON.stringify({ error: err?.message || 'Could not start live session' }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`GlobalPath Server running on http://0.0.0.0:${PORT}`);
});
