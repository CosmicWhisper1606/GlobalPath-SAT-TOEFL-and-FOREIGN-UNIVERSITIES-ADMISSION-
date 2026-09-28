import React from 'react';
import { GraduationCap, ExternalLink } from 'lucide-react';
import { useTheme } from '../utils/ThemeContext';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { currentThemeOption } = useTheme();

  return (
    <footer className="bg-[var(--theme-hero-bg)] text-[var(--theme-text-muted)] border-t border-[var(--theme-hero-border)] text-xs py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base font-serif-display">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>GlobalPath Education</span>
            </div>
            <p className="text-stone-400 max-w-sm leading-relaxed text-xs">
              The independent, data-grounded reference portal for the Digital SAT, TOEFL iBT, international admissions blueprints, scholarships, and student visas.
            </p>
            <div className="text-[11px] text-stone-500">
              Information updated for 2025–2027 academic cycles. SAT is a trademark registered by the College Board. TOEFL is a registered trademark of ETS.
            </div>

            {/* Active Theme Confirmation in Footer */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-stone-300">
                <span className="w-2 h-2 rounded-full bg-yellow-400 ring-2 ring-yellow-400/20" />
                <span className="text-stone-400">Theme:</span>
                <span className="text-white font-semibold">{currentThemeOption.name}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-stone-200 mb-3 uppercase tracking-wider text-[11px]">
              Examinations
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('sat')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Digital SAT Suite
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('sat')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Desmos Graphing Hacks
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('toefl')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  TOEFL iBT 1h 56m Format
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('compare')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  SAT vs ACT Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('compare')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  TOEFL vs IELTS vs DET
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('equalizer')} className="hover:text-amber-300 transition-colors font-medium text-amber-200 cursor-pointer">
                  Exam Obstacle Equalizer (5 Pillars)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-200 mb-3 uppercase tracking-wider text-[11px]">
              Admissions & Aid
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('blueprint')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  SOP & Essay Dossier
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('blueprint')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  LOR Teacher Outreach
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('scholarships')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Need-Blind Universities
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('countries')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Blocked Accounts & Visas
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('calculator')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Cost & Aid Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('global-students')} className="hover:text-amber-300 transition-colors cursor-pointer text-amber-200">
                  All Nationalities Guide
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-200 mb-3 uppercase tracking-wider text-[11px]">
              Official Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://satsuite.collegeboard.org" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>College Board Bluebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.ets.org/toefl" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>ETS TOEFL Official</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.commonapp.org" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>Common Application</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.ucas.com" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>UCAS (UK)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.uni-assist.de" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>Uni-Assist (Germany)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--theme-hero-border)] pt-6 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-4">
          <div className="text-stone-400">
            © {new Date().getFullYear()} <span className="text-stone-200 font-semibold">GlobalPath</span> · Created & Architected by <span className="text-amber-400 font-semibold">Pranav Jagtap</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Free Global Admissions Guide</span>
            <span>·</span>
            <span>Built by Pranav Jagtap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
