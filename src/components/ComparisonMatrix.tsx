import React, { useState } from 'react';
import {
  SAT_VS_ACT,
  ENGLISH_TESTS_COMPARISON,
  VISA_INTERVIEW_GUIDE
} from '../data/comparisonData';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Scale,
  ShieldCheck,
  Layers,
  ArrowRight,
  ArrowRightLeft
} from 'lucide-react';

interface ComparisonMatrixProps {
  onGoToConverter?: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ onGoToConverter }) => {
  const [activeTab, setActiveTab] = useState<'sat-act' | 'english' | 'visa'>('sat-act');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header and Sub-navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <Layers className="w-3.5 h-3.5" />
          <span>Objective Comparative Analysis</span>
          <span aria-hidden="true">·</span>
          <span>Decision Matrices & Interview Blueprints</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          Exam Head-to-Head & Visa Masterclass
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Deciding between SAT vs. ACT or TOEFL vs. IELTS vs. Duolingo? Plus, master the consular interview questions that decide F-1 and global student visa approvals.
        </p>

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200/60 pt-4">
          <button
            onClick={() => setActiveTab('sat-act')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'sat-act'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            1. Digital SAT vs. ACT
          </button>
          <button
            onClick={() => setActiveTab('english')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'english'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            2. TOEFL vs. IELTS vs. Duolingo
          </button>
          <button
            onClick={() => setActiveTab('visa')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'visa'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            3. Student Visa Interview Masterclass
          </button>
        </div>
      </div>

      {/* Tab 1: SAT vs ACT */}
      {activeTab === 'sat-act' && (
        <div className="space-y-8">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm text-stone-800 leading-relaxed">
            <strong>The Core Decision Rule:</strong> US universities have <strong>zero preference</strong> between the SAT and ACT. Choose the SAT if you want more time per question (~71 seconds vs 50 seconds on ACT) and love using the Desmos calculator. Choose the ACT if you have rapid reading speed and excel at reading scientific experimental charts.
          </div>

          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-800 font-semibold">
                    <th className="py-3 px-4 w-1/4">Examination Feature</th>
                    <th className="py-3 px-4 w-3/8 text-amber-950 font-bold bg-amber-50/50">Digital SAT</th>
                    <th className="py-3 px-4 w-3/8 text-stone-900 font-bold">ACT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {SAT_VS_ACT.map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/30">
                        {row.feature}
                      </td>
                      <td className="py-3 px-4 text-stone-800 bg-amber-50/20 leading-relaxed">
                        {row.sat}
                      </td>
                      <td className="py-3 px-4 text-stone-700 leading-relaxed">
                        {row.act}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: TOEFL vs IELTS vs Duolingo */}
      {activeTab === 'english' && (
        <div className="space-y-8">
          {onGoToConverter && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ArrowRightLeft className="w-5 h-5 text-amber-700 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                    Standardize Your Actual Exam Scores
                  </h4>
                  <p className="text-xs text-stone-700">
                    Translate your specific TOEFL iBT score (or sectional scores) to approximate IELTS and Duolingo equivalents.
                  </p>
                </div>
              </div>
              <button
                onClick={onGoToConverter}
                className="px-3.5 py-1.5 bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open Score Converter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-800 font-semibold">
                    <th className="py-3 px-4 w-1/4">Criteria</th>
                    <th className="py-3 px-4 text-amber-950 font-bold bg-amber-50/50">TOEFL iBT</th>
                    <th className="py-3 px-4 text-stone-900 font-bold">IELTS Academic</th>
                    <th className="py-3 px-4 text-stone-900 font-bold">Duolingo (DET)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {ENGLISH_TESTS_COMPARISON.map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/30">
                        {row.feature}
                      </td>
                      <td className="py-3 px-4 text-stone-800 bg-amber-50/20 leading-relaxed font-medium">
                        {row.toefl}
                      </td>
                      <td className="py-3 px-4 text-stone-700 leading-relaxed">
                        {row.ielts}
                      </td>
                      <td className="py-3 px-4 text-stone-700 leading-relaxed">
                        {row.duolingo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Visa Interview Masterclass */}
      {activeTab === 'visa' && (
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-xs sm:text-sm text-stone-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-900">
              <ShieldCheck className="w-4 h-4 text-rose-700" />
              <span>The F-1 Student Visa Mindset (INA Section 214b)</span>
            </div>
            <p className="leading-relaxed">
              Consular interviews at US Embassies often last only <strong>90 to 120 seconds</strong>. Officers make their decision based on two things: your clarity of academic purpose and verifiable financial solvency.
            </p>
          </div>

          <div className="space-y-4">
            {VISA_INTERVIEW_GUIDE.map((guide, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 font-serif-display">
                    {guide.topic}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {guide.explanation}
                </p>

                <div className="mt-3 pt-3 border-t border-stone-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                    Winning Strategies & Sample Answers:
                  </h4>
                  <ul className="space-y-2">
                    {guide.bestPractices.map((point, pIdx) => (
                      <li key={pIdx} className="text-xs sm:text-sm text-stone-700 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
