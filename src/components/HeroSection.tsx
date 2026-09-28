import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Award,
  Globe2,
  Sparkles,
  Calendar,
  Search,
  Video,
  Zap,
  Palette,
  DollarSign,
  ShieldCheck,
  Layers,
  Clock
} from 'lucide-react';
import { useTheme } from '../utils/ThemeContext';

interface HeroSectionProps {
  onSelectTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  const { currentThemeOption } = useTheme();

  return (
    <section className="bg-[var(--theme-hero-bg)] text-[var(--theme-hero-text)] border-b border-[var(--theme-hero-border)] relative overflow-hidden transition-colors duration-300 w-full max-w-full overflow-x-hidden">
      {/* Dynamic atmospheric background graphic matching theme */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--theme-accent) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: 'var(--theme-accent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative">
        <div className="max-w-5xl">
          {/* Metadata banner */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium mb-3 text-amber-300">
            <span className="font-semibold text-amber-400">By Pranav Subhash Jagtap</span>
            <span aria-hidden="true">·</span>
            <span>Official 2026–2027 Admissions Journey</span>
            <span aria-hidden="true">·</span>
            <span>Digital SAT Multistage Adaptive</span>
            <span aria-hidden="true">·</span>
            <span>TOEFL iBT & DET</span>
            <span aria-hidden="true">·</span>
            <span>Global Curriculum Equalizer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-serif-display text-balance">
            The Definitive Authority on SAT, TOEFL & Foreign University Admissions
          </h1>

          <p className="mt-4 text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Organized around how international students actually navigate admissions: from <strong>Standardized Testing</strong> and <strong>Curriculum Evaluation</strong> to <strong>University Matching</strong>, <strong>Application Deadlines</strong>, and <strong>Need-Blind Financial Aid</strong>.
          </p>

          {/* AI Capabilities & Live Voice Showcase */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onSelectTab('ai-advisor')}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 hover:border-amber-400 text-left transition-all hover:scale-[1.02] cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Gemini AI Advisor
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200">Pro & Flash</span>
              </div>
              <p className="text-xs text-stone-300">
                Multi-turn counseling for Ivy League strategy, essay review, and rapid vocab drills.
              </p>
            </button>

            <button
              onClick={() => onSelectTab('live-voice')}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 hover:border-cyan-400 text-left transition-all hover:scale-[1.02] cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Gemini 3.8 Live Voice
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200">Real-Time</span>
              </div>
              <p className="text-xs text-stone-300">
                Talk directly with your microphone for admissions & F-1 visa interview simulations.
              </p>
            </button>

            <button
              onClick={() => onSelectTab('grounded-search')}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/10 border border-blue-500/40 hover:border-blue-400 text-left transition-all hover:scale-[1.02] cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-blue-400" />
                  Google Search Intel
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-200">Live Web</span>
              </div>
              <p className="text-xs text-stone-300">
                Get up-to-date testing dates, changing visa policies, and live tuition rates.
              </p>
            </button>
          </div>

          {/* Core 4-Stage Admissions Journey Bar */}
          <div className="mt-7 p-4 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-sm space-y-3">
            <div className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>International Student Journey: 4 Core Pillars</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {/* Stage 1: Testing */}
              <button
                onClick={() => onSelectTab('testing-hub')}
                className="p-3 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-400/50 hover:bg-stone-900 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 1</span>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between mt-0.5">
                    <span>Testing Hub & Status</span>
                    <ArrowRight className="w-3 h-3 text-stone-500 group-hover:text-amber-400 transition-colors" />
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                    Live center status alerts, cancellation radar, GPS travel buffers &amp; fee breakdown.
                  </p>
                </div>
              </button>

              {/* Stage 2: University Matching */}
              <button
                onClick={() => onSelectTab('search')}
                className="p-3 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-400/50 hover:bg-stone-900 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 2</span>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between mt-0.5">
                    <span>University Matcher</span>
                    <ArrowRight className="w-3 h-3 text-stone-500 group-hover:text-amber-400 transition-colors" />
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                    Holistic vs. direct entry, first-year/transfer/masters & 2026-27 catalog.
                  </p>
                </div>
              </button>

              {/* Stage 3: Application Deadlines */}
              <button
                onClick={() => onSelectTab('tracker')}
                className="p-3 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-400/50 hover:bg-stone-900 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 3</span>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between mt-0.5">
                    <span>Timeline & Deadlines</span>
                    <ArrowRight className="w-3 h-3 text-stone-500 group-hover:text-amber-400 transition-colors" />
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                    ED/EA/RD intake alerts & automated curriculum document checklist.
                  </p>
                </div>
              </button>

              {/* Stage 4: Finances & Aid */}
              <button
                onClick={() => onSelectTab('scholarships')}
                className="p-3 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-400/50 hover:bg-stone-900 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 4</span>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between mt-0.5">
                    <span>Finances & Aid</span>
                    <ArrowRight className="w-3 h-3 text-stone-500 group-hover:text-amber-400 transition-colors" />
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                    Total Cost of Attendance (COA), Need-Blind colleges & CSS Profile.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Quick-action buttons */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => onSelectTab('curriculum')}
              className="px-4 py-2 bg-amber-400 text-stone-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-stone-950" />
              <span>Curriculum & Boards (IB, A-Levels, CBSE)</span>
            </button>
            <button
              onClick={() => onSelectTab('equalizer')}
              className="px-4 py-2 bg-stone-800/90 text-amber-300 border border-stone-700 font-semibold text-xs rounded-lg hover:bg-stone-700 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Exam Obstacle Equalizer</span>
            </button>
            <button
              onClick={() => onSelectTab('video-guides')}
              className="px-4 py-2 bg-stone-800/90 text-amber-200 border border-stone-700 font-semibold text-xs rounded-lg hover:bg-stone-700 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Form Videos & Guides</span>
            </button>
            <button
              onClick={() => onSelectTab('mock-tests')}
              className="px-4 py-2 bg-stone-800/90 text-amber-300 border border-stone-700 font-semibold text-xs rounded-lg hover:bg-stone-700 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Free AI Mock Tests</span>
            </button>
            <button
              onClick={() => onSelectTab('upcoming-dates')}
              className="px-4 py-2 bg-stone-800/90 text-amber-200 border border-stone-700 font-semibold text-xs rounded-lg hover:bg-stone-700 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Upcoming Exam Dates</span>
            </button>
            <button
              onClick={() => onSelectTab('global-students')}
              className="px-4 py-2 bg-stone-800/90 text-stone-200 border border-stone-700 font-medium text-xs rounded-lg hover:bg-stone-700 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>All Nationalities (195+ Nations)</span>
            </button>
          </div>

          {/* Theme Design System Status Bar */}
          <div className="mt-8 pt-5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 ring-4 ring-yellow-400/20" />
              <span className="font-semibold text-white">Original Theme:</span>
              <span className="text-yellow-400 font-bold">{currentThemeOption.name}</span>
              <span className="text-stone-400 hidden sm:inline">· Obsidian Canvas, Crisp White, Radiant Yellow</span>
            </div>
            <div className="flex items-center gap-4 text-stone-400 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">✓</span> High-Contrast AAA
              </span>
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">✓</span> Uniform Dark Aesthetic
              </span>
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">✓</span> 100% Zero Slide Gaps
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
