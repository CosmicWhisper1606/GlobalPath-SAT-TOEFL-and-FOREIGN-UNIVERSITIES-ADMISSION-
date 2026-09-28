import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SATGuide } from './components/SATGuide';
import { TOEFLGuide } from './components/TOEFLGuide';
import { AdmissionsBlueprint } from './components/AdmissionsBlueprint';
import { CountryGuides } from './components/CountryGuides';
import { ScholarshipsAndAid } from './components/ScholarshipsAndAid';
import { InteractiveTools } from './components/InteractiveTools';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { ApplicationTracker } from './components/ApplicationTracker';
import { UniversitySearch } from './components/UniversitySearch';
import { ResourceHub } from './components/ResourceHub';
import { AIMockExamHub } from './components/AIMockExamHub';
import { UpcomingExamDates } from './components/UpcomingExamDates';
import { GlobalStudentHub } from './components/GlobalStudentHub';
import { AIVideoWalkthroughs } from './components/AIVideoWalkthroughs';
import { GlobalExamEqualizer } from './components/GlobalExamEqualizer';
import { StandardizedTestingHub } from './components/StandardizedTestingHub';
import { CurriculumEngine } from './components/CurriculumEngine';
import { GeminiChatbot } from './components/GeminiChatbot';
import { GeminiLiveVoice } from './components/GeminiLiveVoice';
import { SearchGroundingIntelligence } from './components/SearchGroundingIntelligence';
import { GmailAdmissionsHub } from './components/GmailAdmissionsHub';
import { Footer } from './components/Footer';
import { ThemeProvider } from './utils/ThemeContext';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) return tabParam;
    }
    return 'search';
  });
  const [savedCount, setSavedCount] = useState<number>(0);

  // Read saved milestones on mount and listen to popstate for browser navigation
  useEffect(() => {
    try {
      const saved = localStorage.getItem('globalpath_milestones');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSavedCount(parsed.length);
        }
      }
    } catch {
      // ignore
    }

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      setActiveTab(tabParam || 'search');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const newUrl = tab === 'search' ? window.location.pathname : `?tab=${encodeURIComponent(tab)}`;
      window.history.pushState({ tab }, '', newUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[var(--theme-canvas)] text-[var(--theme-text-primary)] flex flex-col font-sans antialiased relative transition-colors duration-200">
      {/* Ambient Theme Background Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-pattern-layer opacity-60 z-0 w-full max-w-full" />

      {/* Main Relative Container */}
      <div className="relative z-10 flex flex-col flex-1 w-full max-w-full overflow-x-hidden">
        {/* Strict 3-zone Top Bar Contract Header */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          savedCount={savedCount}
        />

        {/* Main Content Arena */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          {/* Editorial Hero Section with theme-awareness & 4-stage journey */}
          <HeroSection onSelectTab={handleTabChange} />

          {/* Tabbed Guides & Interactive Suites */}
          <div className="pb-16 relative w-full max-w-full overflow-x-hidden">
            {activeTab === 'gmail' && <GmailAdmissionsHub />}
            {activeTab === 'ai-advisor' && <GeminiChatbot />}
            {activeTab === 'live-voice' && <GeminiLiveVoice />}
            {activeTab === 'grounded-search' && <SearchGroundingIntelligence />}
            {activeTab === 'search' && (
              <UniversitySearch
                onGoToTimeline={() => handleTabChange('tracker')}
              />
            )}
            {activeTab === 'curriculum' && (
              <CurriculumEngine
                onGoToUniversitySearch={() => handleTabChange('search')}
                onGoToTracker={() => handleTabChange('tracker')}
                onGoToTestingHub={() => handleTabChange('testing-hub')}
              />
            )}
            {activeTab === 'testing-hub' && (
              <StandardizedTestingHub
                onGoToTracker={() => handleTabChange('tracker')}
                onGoToUniversitySearch={() => handleTabChange('search')}
                onGoToCurriculum={() => handleTabChange('curriculum')}
              />
            )}
            {activeTab === 'equalizer' && (
              <GlobalExamEqualizer
                onGoToMockTests={() => handleTabChange('mock-tests')}
                onGoToDates={() => handleTabChange('upcoming-dates')}
                onGoToTimeline={() => handleTabChange('tracker')}
              />
            )}
            {activeTab === 'video-guides' && (
              <AIVideoWalkthroughs
                onGoToTracker={() => handleTabChange('tracker')}
                onGoToSearch={() => handleTabChange('search')}
              />
            )}
            {activeTab === 'global-students' && (
              <GlobalStudentHub
                onGoToTracker={() => handleTabChange('tracker')}
                onGoToConverter={() => handleTabChange('calculator')}
              />
            )}
            {activeTab === 'mock-tests' && <AIMockExamHub />}
            {activeTab === 'upcoming-dates' && (
              <UpcomingExamDates
                onGoToTimeline={() => handleTabChange('tracker')}
                onCountChange={(cnt) => setSavedCount(cnt)}
              />
            )}
            {activeTab === 'tracker' && (
              <ApplicationTracker onCountChange={(cnt) => setSavedCount(cnt)} />
            )}
            {activeTab === 'resources' && <ResourceHub />}
            {activeTab === 'sat' && <SATGuide />}
            {activeTab === 'toefl' && <TOEFLGuide />}
            {activeTab === 'blueprint' && <AdmissionsBlueprint />}
            {activeTab === 'countries' && <CountryGuides />}
            {activeTab === 'scholarships' && <ScholarshipsAndAid />}
            {activeTab === 'calculator' && <InteractiveTools initialTool="converter" />}
            {activeTab === 'compare' && (
              <ComparisonMatrix onGoToConverter={() => handleTabChange('calculator')} />
            )}
          </div>
        </main>

        {/* Quiet, Collegiate Footer */}
        <Footer onSelectTab={handleTabChange} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
