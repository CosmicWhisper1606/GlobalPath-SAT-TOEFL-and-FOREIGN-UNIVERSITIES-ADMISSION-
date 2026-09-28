import React from 'react';
import { BookmarkCheck, GraduationCap, Compass, BookOpen } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, savedCount }) => {
  const navItems = [
    { id: 'search', label: 'University Matcher' },
    { id: 'curriculum', label: 'Curriculum & Boards' },
    { id: 'testing-hub', label: 'Testing Hub & Center Status' },
    { id: 'tracker', label: 'Timeline & Rounds' },
    { id: 'equalizer', label: 'Exam Equalizer' },
    { id: 'video-guides', label: 'AI Form Videos' },
    { id: 'mock-tests', label: 'AI Mock Tests' },
    { id: 'global-students', label: 'All Nationalities' },
    { id: 'upcoming-dates', label: 'Upcoming Dates' },
    { id: 'scholarships', label: 'Scholarships & Aid' },
    { id: 'sat', label: 'SAT Guide' },
    { id: 'toefl', label: 'TOEFL Guide' },
    { id: 'resources', label: 'Resource Hub' },
    { id: 'calculator', label: 'Score & Cost Tools' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--theme-hero-bg)] text-[var(--theme-hero-text)] border-b border-[var(--theme-hero-border)] shadow-sm backdrop-blur-md transition-colors duration-200 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => setActiveTab('search')}
          className="text-lg font-bold tracking-tight text-amber-100 hover:text-white transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <GraduationCap className="w-5 h-5 text-[var(--theme-accent)]" />
          <span className="font-serif-display text-xl">GlobalPath</span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden xl:flex items-center gap-4 text-sm font-medium text-stone-300 overflow-x-auto scrollbar-none py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`transition-colors whitespace-nowrap py-1 relative text-xs cursor-pointer ${
                activeTab === item.id
                  ? 'text-[var(--theme-accent)] font-semibold'
                  : 'hover:text-white text-stone-300'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--theme-accent)] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Intermediate view nav (medium screen) */}
        <nav className="hidden md:flex xl:hidden items-center gap-3 text-xs font-medium text-stone-300 overflow-x-auto scrollbar-none py-1">
          {navItems.slice(0, 6).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`transition-colors whitespace-nowrap py-1 relative cursor-pointer ${
                activeTab === item.id
                  ? 'text-[var(--theme-accent)] font-semibold'
                  : 'hover:text-white text-stone-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary actions + Theme Selector */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Palette Switcher */}
          <ThemeSelector />

          {/* Checklist Action */}
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-[var(--theme-accent)] text-stone-950 shadow font-bold'
                : 'bg-stone-800 text-amber-200 hover:bg-stone-700 hover:text-white border border-stone-700'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">My Checklist</span>
            {savedCount > 0 && (
              <span className="text-[10px] font-mono bg-amber-900/60 text-amber-200 px-1.5 py-0.2 rounded">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile sub-row for responsive access */}
      <div className="xl:hidden flex overflow-x-auto px-4 py-2 border-t border-[var(--theme-hero-border)] gap-2 text-xs scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeTab === item.id
                ? 'bg-[var(--theme-accent)] text-stone-950 font-bold'
                : 'text-stone-300 hover:bg-stone-800/80'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
