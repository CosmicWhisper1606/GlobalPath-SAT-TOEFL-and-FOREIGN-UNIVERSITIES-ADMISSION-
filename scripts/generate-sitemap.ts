import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Default target URL or environment override
const baseUrl = (process.env.APP_URL || 'https://ais-pre-eg72ihbdmodi5fv4okm2fi-913908464203.asia-southeast1.run.app').replace(/\/$/, '');
const currentDate = new Date().toISOString().split('T')[0];

interface SitemapRoute {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  description: string;
}

const routes: SitemapRoute[] = [
  { path: '', changefreq: 'daily', priority: '1.0', description: 'Homepage & University Search' },
  { path: '?tab=search', changefreq: 'daily', priority: '0.95', description: 'University Matcher & Admissions Catalog' },
  { path: '?tab=ai-advisor', changefreq: 'daily', priority: '0.95', description: 'Gemini Multi-Turn Admissions Advisor (Pro/Flash)' },
  { path: '?tab=live-voice', changefreq: 'weekly', priority: '0.90', description: 'Gemini 3.8 Live Voice Counselor' },
  { path: '?tab=grounded-search', changefreq: 'daily', priority: '0.90', description: 'Google Search Grounded Admissions Intelligence' },
  { path: '?tab=sat', changefreq: 'weekly', priority: '0.90', description: 'Digital SAT Comprehensive Preparation Guide' },
  { path: '?tab=toefl', changefreq: 'weekly', priority: '0.90', description: 'Official TOEFL iBT Prep & Speaking Rubrics' },
  { path: '?tab=testing-hub', changefreq: 'weekly', priority: '0.90', description: 'Standardized Testing Comparison Hub & Center Status' },
  { path: '?tab=upcoming-dates', changefreq: 'daily', priority: '0.90', description: 'SAT & TOEFL Upcoming Registration Dates & Deadlines' },
  { path: '?tab=scholarships', changefreq: 'weekly', priority: '0.90', description: 'Global Scholarships & Need-Blind Financial Aid Finder' },
  { path: '?tab=curriculum', changefreq: 'monthly', priority: '0.85', description: 'Curriculum Engine (CBSE, IB, A-Levels, AP Normalization)' },
  { path: '?tab=equalizer', changefreq: 'weekly', priority: '0.85', description: 'Global Exam Equalizer & Grading Obstacle Normalizer' },
  { path: '?tab=countries', changefreq: 'monthly', priority: '0.85', description: 'Country-by-Country Study Abroad Guides' },
  { path: '?tab=global-students', changefreq: 'weekly', priority: '0.85', description: 'Visas, Embassy Checklists & Proof of Funds' },
  { path: '?tab=mock-tests', changefreq: 'weekly', priority: '0.85', description: 'AI Mock Exam Testing Hub' },
  { path: '?tab=calculator', changefreq: 'monthly', priority: '0.80', description: 'Score Converter & International GPA Calculator' },
  { path: '?tab=blueprint', changefreq: 'monthly', priority: '0.80', description: 'Holistic Admissions Strategy Blueprint' },
  { path: '?tab=video-guides', changefreq: 'weekly', priority: '0.80', description: 'Application Form Walkthrough Video Tutorials' },
  { path: '?tab=tracker', changefreq: 'monthly', priority: '0.75', description: 'Application Milestone Timeline Tracker' },
  { path: '?tab=resources', changefreq: 'monthly', priority: '0.75', description: 'Official Admissions Handbooks & PDF Resources' },
  { path: '?tab=compare', changefreq: 'monthly', priority: '0.75', description: 'Testing Policies & University Comparison Matrix' }
];

export function generateSitemapXml(targetBaseUrl: string = baseUrl, modDate: string = currentDate): string {
  const urlNodes = routes.map((r) => {
    const loc = r.path ? `${targetBaseUrl}/${r.path}` : `${targetBaseUrl}/`;
    return `  <!-- ${r.description} -->
  <url>
    <loc>${loc}</loc>
    <lastmod>${modDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlNodes}
</urlset>
`;
}

function run() {
  const xml = generateSitemapXml();

  // 1. Write to public/sitemap.xml
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf-8');
  console.log(`[Sitemap] Generated ${publicPath} (${routes.length} routes indexed)`);

  // 2. Also write to dist/sitemap.xml if dist directory exists
  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, xml, 'utf-8');
    console.log(`[Sitemap] Synced ${distPath}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run();
}
