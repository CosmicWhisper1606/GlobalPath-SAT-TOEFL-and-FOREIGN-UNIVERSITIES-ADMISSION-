import React, { useState } from 'react';
import {
  APPLICATION_STAGES,
  SOP_MASTER_GUIDE,
  LOR_REQUEST_GUIDE
} from '../data/applicationData';
import {
  Calendar,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  ClipboardList,
  Sparkles,
  BookOpen,
  DollarSign,
  Compass
} from 'lucide-react';

export const AdmissionsBlueprint: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'sop' | 'lor' | 'platforms' | 'finances'>('timeline');
  const [expandedStage, setExpandedStage] = useState<number>(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header and Sub-navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <Compass className="w-3.5 h-3.5" />
          <span>Global University Admissions Protocol</span>
          <span aria-hidden="true">·</span>
          <span>From Profile Building to Visa Issuance</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          The Foreign University Application Blueprint
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Applying abroad is an 18-month marathon of academic consistency, standardized testing, compelling personal essays, and financial certification. Master every critical milestone.
        </p>

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200/60 pt-4">
          {[
            { id: 'timeline', label: '1. Master 18-Month Timeline' },
            { id: 'sop', label: '2. Statement of Purpose (SOP) Blueprint' },
            { id: 'lor', label: '3. Letters of Recommendation (LOR)' },
            { id: 'platforms', label: '4. Portals: Common App, UCAS & Uni-Assist' },
            { id: 'finances', label: '5. Financial Proof & Solvency Docs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Master 18-Month Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="space-y-4">
            {APPLICATION_STAGES.map((stage) => {
              const isOpen = expandedStage === stage.stageNumber;
              return (
                <div
                  key={stage.stageNumber}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedStage(isOpen ? 0 : stage.stageNumber)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-stone-50/60 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold">
                        <span>STAGE {stage.stageNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{stage.timeframe}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-1 font-serif-display">
                        {stage.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1">
                        {stage.description}
                      </p>
                    </div>
                    <div className={`p-1.5 rounded-full border border-stone-200 text-stone-500 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-stone-100 space-y-5">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                          <ClipboardList className="w-4 h-4 text-stone-700" />
                          <span>Essential Action Checklist</span>
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {stage.keyChecklist.map((task, idx) => (
                            <div key={idx} className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 text-xs sm:text-sm text-stone-700 flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs">
                          <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
                            <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
                            <span>Insider Admissions Committee Tip:</span>
                          </div>
                          <p className="text-stone-700 leading-relaxed">{stage.insiderTips}</p>
                        </div>

                        <div className="p-4 bg-rose-50/70 border border-rose-200/80 rounded-lg text-xs">
                          <div className="font-bold text-rose-900 flex items-center gap-1.5 mb-1.5">
                            <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                            <span>Fatal Pitfall to Avoid:</span>
                          </div>
                          <p className="text-stone-700 leading-relaxed">{stage.pitfallsToAvoid}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: SOP Blueprint */}
      {activeTab === 'sop' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-xs font-mono text-amber-700 font-bold uppercase">The Decisive Application Element</span>
              <h3 className="text-2xl font-bold text-stone-900 mt-1 font-serif-display">
                {SOP_MASTER_GUIDE.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {SOP_MASTER_GUIDE.purpose} Ideal Length: <strong>{SOP_MASTER_GUIDE.idealLength}</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                Core Structural Components
              </h4>
              <div className="space-y-2">
                {SOP_MASTER_GUIDE.coreComponents.map((comp, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-700 flex items-start gap-2.5">
                    <span className="font-mono font-bold text-amber-700 shrink-0">{idx + 1}.</span>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg">
                <h4 className="text-xs font-bold uppercase text-emerald-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Golden Rules (DOs)</span>
                </h4>
                <ul className="space-y-2">
                  {SOP_MASTER_GUIDE.dosAndDonts.dos.map((item, idx) => (
                    <li key={idx} className="text-xs text-stone-700 leading-relaxed flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-lg">
                <h4 className="text-xs font-bold uppercase text-rose-900 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-700" />
                  <span>Instant Rejection Traps (DON'Ts)</span>
                </h4>
                <ul className="space-y-2">
                  {SOP_MASTER_GUIDE.dosAndDonts.donts.map((item, idx) => (
                    <li key={idx} className="text-xs text-stone-700 leading-relaxed flex items-start gap-2">
                      <span className="text-rose-700 font-bold shrink-0">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6-Paragraph Master Outline */}
            <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-7 border border-stone-800">
              <h4 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-3">
                Proven 6-Paragraph Architecture
              </h4>
              <div className="space-y-2.5">
                {SOP_MASTER_GUIDE.sampleOutline.map((p, idx) => (
                  <div key={idx} className="p-3 bg-stone-800 rounded border border-stone-700 text-xs text-stone-200">
                    <span className="text-amber-300 font-semibold">{p.split(':')[0]}:</span> {p.split(':')[1]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: LOR Guide */}
      {activeTab === 'lor' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs font-mono text-amber-700 font-bold uppercase">Third-Party Academic Endorsement</span>
            <h3 className="text-2xl font-bold text-stone-900 mt-1 font-serif-display">
              {LOR_REQUEST_GUIDE.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Required: <strong>{LOR_REQUEST_GUIDE.targetCount}</strong>. Timing: <strong>{LOR_REQUEST_GUIDE.timing}</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Step-by-Step Recommender Strategy
            </h4>
            {LOR_REQUEST_GUIDE.howToRequest.map((step, idx) => (
              <div key={idx} className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-700 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-1">
            <strong>The "Brag Sheet" Secret:</strong> Teachers write dozens of recommendations every semester. Providing a 1-page summary with your specific classroom anecdotes, notable grades, and quotes ensures your letter contains vivid, individualized details rather than generic praise.
          </div>
        </div>
      )}

      {/* Tab 4: Application Platforms */}
      {activeTab === 'platforms' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-stone-500 font-semibold">USA (Over 1,000 Colleges)</div>
              <h3 className="text-xl font-bold text-stone-900 mt-1 font-serif-display">Common Application</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Centralized system where you submit 1 main 650-word personal essay, your activities list (10 activities, 150 characters each), and college-specific supplements.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-stone-700 border-t border-stone-100 pt-3">
                <div><strong>Fee:</strong> $50–$90 per college</div>
                <div><strong>Deadlines:</strong> Nov 1 (ED/EA), Jan 1–15 (RD)</div>
                <div><strong>FERPA Waiver:</strong> Always check YES to waive your right to inspect recommendation letters.</div>
              </div>
            </div>
            <a
              href="https://www.commonapp.org"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              <span>Visit commonapp.org</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-stone-500 font-semibold">United Kingdom (Universal)</div>
              <h3 className="text-xl font-bold text-stone-900 mt-1 font-serif-display">UCAS System</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Single application allows exactly 5 course choices. Uses 1 single Personal Statement (4,000 characters / 47 lines) sent to all 5 universities.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-stone-700 border-t border-stone-100 pt-3">
                <div><strong>Fee:</strong> £28.50 for up to 5 courses</div>
                <div><strong>Deadlines:</strong> Oct 15 (Oxbridge/Medicine), Jan 29 (General)</div>
                <div><strong>Focus:</strong> 80% strictly academic/subject passion; minimal extracurricular fluff.</div>
              </div>
            </div>
            <a
              href="https://www.ucas.com"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              <span>Visit ucas.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-stone-500 font-semibold">Germany & Europe</div>
              <h3 className="text-xl font-bold text-stone-900 mt-1 font-serif-display">Uni-Assist Portal</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Central service for international student applications in Germany. Evaluates your international certificates against the German Abitur standard (VPD).
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-stone-700 border-t border-stone-100 pt-3">
                <div><strong>Fee:</strong> €75 for first application, €30 per additional</div>
                <div><strong>Processing:</strong> 4–6 weeks for VPD certificate</div>
                <div><strong>Key Requirement:</strong> Notarized/certified copies of high school diplomas & transcripts.</div>
              </div>
            </div>
            <a
              href="https://www.uni-assist.de"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              <span>Visit uni-assist.de</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Tab 5: Financial Solvency Docs */}
      {activeTab === 'finances' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs font-mono text-amber-700 font-bold uppercase">Visa Proof of Funds Compliance</span>
            <h3 className="text-2xl font-bold text-stone-900 mt-1 font-serif-display">
              International Student Financial Documentation
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Immigration embassies require unambiguous proof that you can pay for all tuition and cost of living without unauthorized illegal employment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span>🇺🇸 USA: Form I-20 & Bank Solvency</span>
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Must show liquid funds equal to or exceeding 1 year of total estimated cost of attendance (typically $50k–$85k). Acceptable: Bank statements (3–6 months), sanctioned education loans, or scholarship award letters.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span>🇩🇪 Germany: Blocked Account (Sperrkonto)</span>
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Mandatory legal requirement to deposit <strong>€11,904</strong> into a regulated German blocked bank account (Expatrio, Fintiba, Coracle). Once you arrive in Germany, €992 is unlocked each month for living expenses.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span>🇨🇦 Canada: GIC (Guaranteed Investment Certificate)</span>
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Under the Student Direct Stream and revised permit regulations, international students must deposit <strong>CAD $20,635</strong> into a Canadian bank (CIBC, Scotiabank, RBC) before visa approval.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span>🇬🇧 UK: 28-Day Financial Rule</span>
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Funds for remaining first-year tuition plus living costs (£12,006 inside London or £9,207 outside London) must have been held in your bank account continuously for a consecutive <strong>28-day period</strong> before visa submission.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
