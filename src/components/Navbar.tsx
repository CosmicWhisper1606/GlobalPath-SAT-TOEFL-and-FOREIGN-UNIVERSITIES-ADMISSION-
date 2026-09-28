import React, { useState } from 'react';
import { BookmarkCheck, GraduationCap, Sparkles, Radio, Globe, User, LogIn, ShieldCheck } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { useAuth } from '../context/AuthContext';
import { UserAuthModal } from './UserAuthModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, savedCount }) => {
  const { user, savedColleges } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navItems = [
    { id: 'search', label: 'University Matcher' },
    { id: 'gmail', label: '📧 Gmail & Inquiries', highlight: true },
    { id: 'ai-advisor', label: '✨ Gemini AI Advisor', highlight: true },
    { id: 'live-voice', label: '🎙️ Live Voice (3.8 Live)', live: true },
    { id: 'grounded-search', label: '🌐 Search Intel', search: true },
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
    <>
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

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-3.5 text-sm font-medium text-stone-300 overflow-x-auto scrollbar-none py-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative text-xs cursor-pointer flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? 'text-[var(--theme-accent)] font-semibold'
                    : item.highlight
                    ? 'text-amber-300 hover:text-amber-100 font-semibold'
                    : item.live
                    ? 'text-cyan-300 hover:text-cyan-100 font-semibold'
                    : 'hover:text-white text-stone-300'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--theme-accent)] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Selector */}
            <ThemeSelector />

            {/* Checklist Tab Action */}
            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tracker'
                  ? 'bg-[var(--theme-accent)] text-stone-950 shadow font-bold'
                  : 'bg-stone-800 text-amber-200 hover:bg-stone-700 hover:text-white border border-stone-700'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Timeline</span>
              {savedCount > 0 && (
                <span className="text-[10px] font-mono bg-amber-900/60 text-amber-200 px-1.5 py-0.2 rounded">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Firebase Google Auth Button / User Profile */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer"
              title="Google Sign-In & Firestore Persistence"
            >
              {user ? (
                <>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-5 h-5 rounded-full object-cover ring-1 ring-amber-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-[10px]">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="hidden md:inline max-w-[100px] truncate">{user.displayName?.split(' ')[0] || 'Account'}</span>
                  {savedColleges.length > 0 && (
                    <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded-full text-[10px] font-mono">
                      {savedColleges.length}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Sign In</span>
                </>
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

      {/* User Auth Modal */}
      <UserAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsAuthModalOpen(false);
        }}
      />
    </>
  );
};
