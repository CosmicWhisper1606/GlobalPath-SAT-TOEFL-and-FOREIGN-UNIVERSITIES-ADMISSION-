import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Video,
  Monitor,
  Check,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  BookmarkCheck,
  Sliders,
  HelpCircle,
  Clock,
  Send,
  Loader2,
  Lightbulb,
  Maximize2,
  Layers,
  GraduationCap,
  Globe
} from 'lucide-react';
import {
  FORM_VIDEO_GUIDES,
  EVERYTHING_KNOWLEDGE_TOPICS,
  FormVideoGuide,
  VideoChapter,
  EverythingTopic
} from '../data/formVideosData';

interface AIVideoWalkthroughsProps {
  onGoToTracker?: () => void;
  onGoToSearch?: () => void;
}

export const AIVideoWalkthroughs: React.FC<AIVideoWalkthroughsProps> = ({
  onGoToTracker,
  onGoToSearch
}) => {
  // Video Player State
  const [selectedGuide, setSelectedGuide] = useState<FormVideoGuide>(FORM_VIDEO_GUIDES[0]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isAudioVoiceover, setIsAudioVoiceover] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [playerTab, setPlayerTab] = useState<'video' | 'practice' | 'checklist'>('video');
  const [progressSec, setProgressSec] = useState<number>(0);

  // Category filter for video library
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Interactive Form Practice Sandbox State
  const [sandboxInputs, setSandboxInputs] = useState<Record<string, string>>({});
  const [sandboxErrors, setSandboxErrors] = useState<Record<string, string>>({});

  // AI Custom Video Generator State
  const [customFormQuery, setCustomFormQuery] = useState<string>('');
  const [customDestination, setCustomDestination] = useState<string>('United States');
  const [customLevel, setCustomLevel] = useState<string>('Undergraduate');
  const [isGeneratingCustom, setIsGeneratingCustom] = useState<boolean>(false);
  const [customWalkthroughData, setCustomWalkthroughData] = useState<any | null>(null);

  // Everything Knowledge Base State
  const [everythingSearch, setEverythingSearch] = useState<string>('');
  const [everythingCategory, setEverythingCategory] = useState<string>('All');

  // Speech synthesis reference
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const activeChapter: VideoChapter = selectedGuide.chapters[currentChapterIndex] || selectedGuide.chapters[0];

  // Initialize practice sandbox inputs when chapter changes
  useEffect(() => {
    if (activeChapter && activeChapter.mockFields) {
      const initial: Record<string, string> = {};
      activeChapter.mockFields.forEach((field) => {
        initial[field.fieldKey] = field.exampleValue;
      });
      setSandboxInputs(initial);
      setSandboxErrors({});
    }
  }, [selectedGuide.id, currentChapterIndex]);

  // Handle SpeechSynthesis audio narration
  useEffect(() => {
    if (!isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (isAudioVoiceover && 'speechSynthesis' in window && activeChapter?.narration) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeChapter.narration);
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        // Auto-advance to next chapter if available
        if (currentChapterIndex < selectedGuide.chapters.length - 1) {
          setCurrentChapterIndex((prev) => prev + 1);
          setProgressSec(0);
        } else {
          setIsPlaying(false);
        }
      };
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, currentChapterIndex, isAudioVoiceover, playbackSpeed, selectedGuide.id]);

  // Video simulated timer ticker
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= activeChapter.durationSeconds) {
            if (currentChapterIndex < selectedGuide.chapters.length - 1) {
              setCurrentChapterIndex((idx) => idx + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return activeChapter.durationSeconds;
            }
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeChapter?.durationSeconds, currentChapterIndex, playbackSpeed, selectedGuide.chapters.length]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Replay chapter
  const handleReplayChapter = () => {
    setProgressSec(0);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(true);
  };

  // Switch Chapter
  const handleSelectChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setProgressSec(0);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Validate sandbox input
  const handleSandboxChange = (key: string, value: string, field: any) => {
    setSandboxInputs((prev) => ({ ...prev, [key]: value }));

    // Real-time validation checks
    if (field.fieldKey === 'actDesc') {
      if (value.length > 150) {
        setSandboxErrors((prev) => ({
          ...prev,
          [key]: `Character limit exceeded! ${value.length}/150 characters. Please shorten.`
        }));
      } else {
        setSandboxErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    } else if (field.fieldKey === 'dob') {
      // Check for month-first format (MM/DD/YYYY)
      const parts = value.split('/');
      if (parts.length === 3 && parseInt(parts[0], 10) > 12) {
        setSandboxErrors((prev) => ({
          ...prev,
          [key]: 'Month cannot be greater than 12! Remember US format: MM/DD/YYYY.'
        }));
      } else {
        setSandboxErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    }
  };

  // Generate Custom Walkthrough via API
  const handleGenerateCustomWalkthrough = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFormQuery.trim()) return;

    setIsGeneratingCustom(true);
    try {
      const res = await fetch('/api/generate-form-walkthrough', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formTitle: customFormQuery,
          targetCountry: customDestination,
          applicantLevel: customLevel,
        }),
      });

      if (!res.ok) throw new Error('Network error generating walkthrough');
      const data = await res.json();
      if (data?.walkthrough) {
        setCustomWalkthroughData(data.walkthrough);
      }
    } catch (err) {
      console.error('Error generating walkthrough:', err);
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  // Filter video guides
  const filteredGuides = FORM_VIDEO_GUIDES.filter((g) => {
    if (selectedCategory === 'All') return true;
    return g.category === selectedCategory;
  });

  // Filter everything topics
  const filteredEverythingTopics = EVERYTHING_KNOWLEDGE_TOPICS.filter((t) => {
    const matchesCat = everythingCategory === 'All' || t.category === everythingCategory;
    const matchesQuery =
      everythingSearch.trim() === '' ||
      t.title.toLowerCase().includes(everythingSearch.toLowerCase()) ||
      t.summary.toLowerCase().includes(everythingSearch.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(everythingSearch.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const everythingCategories = ['All', 'Document Preparation', 'Financial Planning', 'Visa & Immigration', 'Pre-Departure & Campus Life'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header & Sub-navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <span className="flex items-center gap-1">
            <Video className="w-3.5 h-3.5" />
            <span>AI Form Video Walkthroughs</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>Field-by-Field Visual Guides & Complete Study Abroad Knowledge</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          AI Video Form Guides & Everything You Need to Know
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Master international university application portals, visa forms, financial aid declarations, and document evaluations with AI-generated video walkthroughs. Watch animated screen simulations with synchronized voice-over narrations, practice filling tricky fields in an interactive sandbox, or generate a custom video walkthrough for any form worldwide.
        </p>

        {/* Category Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {['All', 'University Application', 'Visa & Immigration', 'Financial Aid & CSS', 'Country-Specific Portals'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat === 'All' ? 'All Video Walkthroughs' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive AI Video Player & Simulator Canvas */}
      <div className="bg-stone-950 text-white rounded-3xl overflow-hidden shadow-xl border border-stone-800">
        {/* Top Control Bar of Video Canvas */}
        <div className="px-5 py-3.5 bg-stone-900/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-bold text-stone-200 font-mono tracking-wide uppercase text-[11px]">
                AI Form Video Simulator
              </span>
            </div>
            <span className="text-stone-500 hidden sm:inline">|</span>
            <span className="text-amber-400 font-semibold truncate max-w-xs sm:max-w-md">
              {selectedGuide.shortTitle}
            </span>
          </div>

          <div className="flex items-center gap-3 text-stone-400">
            <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] font-mono text-stone-300 font-bold border border-stone-700">
              1080p 60fps AI Audio
            </span>
            <span className="text-xs">
              Chapter {currentChapterIndex + 1} of {selectedGuide.chapters.length}
            </span>
          </div>
        </div>

        {/* Animated Screen Simulation Viewport */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 min-h-[420px] flex flex-col justify-between relative">
          {/* Subtle grid backdrop */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Simulation Header / Active Section Info */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {selectedGuide.platform}
                </span>
                <span className="text-xs text-stone-400">
                  Chapter {activeChapter.chapterNumber}: {activeChapter.title}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif-display mt-1">
                {activeChapter.title}
              </h3>
            </div>

            {/* Audio Waveform Indicator when AI Speaking */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
              <button
                onClick={() => setIsAudioVoiceover((prev) => !prev)}
                className={`p-1 rounded cursor-pointer transition-colors ${
                  isAudioVoiceover ? 'text-amber-400' : 'text-stone-500'
                }`}
                title={isAudioVoiceover ? 'Mute AI Voice' : 'Unmute AI Voice'}
              >
                {isAudioVoiceover ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <div className="flex items-center gap-1 h-3">
                {[4, 8, 12, 6, 14, 10, 5].map((h, i) => (
                  <span
                    key={i}
                    className={`w-0.5 rounded-full transition-all duration-200 ${
                      isPlaying && isAudioVoiceover ? 'bg-amber-400 animate-pulse' : 'bg-stone-700'
                    }`}
                    style={{ height: isPlaying && isAudioVoiceover ? `${h}px` : '4px' }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono text-stone-300">
                {isAudioVoiceover ? 'AI Spoken Voice ON' : 'Muted'}
              </span>
            </div>
          </div>

          {/* Simulated Browser Form Window */}
          <div className="relative z-10 my-6 bg-white text-stone-900 rounded-2xl p-5 sm:p-7 shadow-2xl border border-stone-300 max-w-4xl mx-auto w-full space-y-5">
            {/* Mock Browser URL Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 px-3 py-1 bg-stone-100 rounded text-stone-600 font-mono text-[11px] truncate max-w-xs sm:max-w-md">
                  {selectedGuide.officialPortalUrl}/applicant/section/{activeChapter.id}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">256-Bit SSL Verified Portal</span>
              </span>
            </div>

            {/* Simulated Live Form Fields */}
            <div className="grid sm:grid-cols-2 gap-4 pt-1">
              {activeChapter.mockFields.map((field, idx) => (
                <div
                  key={idx}
                  className={`space-y-1.5 p-3 rounded-xl transition-all ${
                    field.isMistakeProne
                      ? 'bg-amber-50/70 border-2 border-amber-300 ring-2 ring-amber-100'
                      : 'bg-stone-50 border border-stone-200'
                  } ${field.type === 'textarea' ? 'sm:col-span-2' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <span>{field.label}</span>
                      {field.isRequired && <span className="text-rose-600 font-bold">*</span>}
                    </label>
                    {field.isMistakeProne && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900 flex items-center gap-1 uppercase font-mono">
                        <AlertTriangle className="w-3 h-3 text-amber-700" />
                        <span>Mistake-Prone Field</span>
                      </span>
                    )}
                  </div>

                  {field.type === 'textarea' ? (
                    <div className="relative">
                      <div className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 font-sans leading-relaxed min-h-[70px]">
                        {field.exampleValue}
                      </div>
                      <span className="absolute bottom-1.5 right-2 text-[10px] font-mono text-stone-400">
                        {field.exampleValue.length} characters
                      </span>
                    </div>
                  ) : field.type === 'select' ? (
                    <div className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 flex items-center justify-between">
                      <span>{field.exampleValue}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 rotate-90" />
                    </div>
                  ) : (
                    <div className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 flex items-center justify-between">
                      <span>{field.exampleValue}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  )}

                  <p className="text-[11px] text-stone-500 leading-tight">
                    <strong className="text-stone-700">Guide:</strong> {field.validationTip}
                  </p>
                </div>
              ))}
            </div>

            {/* Crucial Mistake Callout Banner inside simulator */}
            {activeChapter.mistakeCallout && (
              <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-rose-900 block uppercase tracking-wide text-[10px]">
                    Critical Pitfall: {activeChapter.mistakeCallout.title}
                  </span>
                  <p className="text-stone-700 text-[11px] leading-relaxed">
                    {activeChapter.mistakeCallout.explanation}
                  </p>
                  <p className="text-rose-800 text-[11px] font-semibold mt-1">
                    Correct Action: {activeChapter.mistakeCallout.solution}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Synchronized Closed Captions / Subtitles Ribbon */}
          {showCaptions && (
            <div className="relative z-10 max-w-3xl mx-auto w-full bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-xl p-3 text-center shadow-lg">
              <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono font-bold block mb-0.5">
                AI Voiceover Narration Transcript
              </span>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans font-medium">
                "{activeChapter.narration}"
              </p>
            </div>
          )}
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="p-4 sm:p-5 bg-stone-900 border-t border-stone-800 space-y-3">
          {/* Progress Bar with Chapter Markers */}
          <div className="space-y-1.5">
            <div className="relative w-full h-2 bg-stone-800 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{
                  width: `${(progressSec / (activeChapter.durationSeconds || 1)) * 100}%`
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>
                {Math.floor(progressSec / 60)}:{(progressSec % 60).toString().padStart(2, '0')} /{' '}
                {Math.floor(activeChapter.durationSeconds / 60)}:
                {(activeChapter.durationSeconds % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-stone-500 truncate max-w-xs sm:max-w-md">
                Chapter {activeChapter.chapterNumber}: {activeChapter.title}
              </span>
            </div>
          </div>

          {/* Main Controls row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950" />}
                <span>{isPlaying ? 'Pause Video' : 'Play Walkthrough'}</span>
              </button>

              <button
                onClick={handleReplayChapter}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                title="Restart Chapter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Speed Switcher */}
              <div className="flex items-center gap-1 bg-stone-800 rounded-xl p-1 text-[11px] font-mono text-stone-300">
                {[0.75, 1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      playbackSpeed === speed ? 'bg-amber-500 text-stone-950 font-bold' : 'hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Captions & External Portal */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setShowCaptions((prev) => !prev)}
                className={`px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                  showCaptions
                    ? 'bg-stone-800 border-amber-500/50 text-amber-300'
                    : 'bg-stone-800/50 border-stone-700 text-stone-400'
                }`}
              >
                CC Subtitles {showCaptions ? 'ON' : 'OFF'}
              </button>

              <a
                href={selectedGuide.officialPortalUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Open {selectedGuide.platform}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Chapter Selector Strip */}
          <div className="pt-2 border-t border-stone-800/80 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0 font-mono">
              Chapters:
            </span>
            {selectedGuide.chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => handleSelectChapter(idx)}
                className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                  currentChapterIndex === idx
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                }`}
              >
                {ch.chapterNumber}. {ch.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tabs below Player: "Try It Yourself" Sandbox vs "Pre-Submission Checklist" */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Interactive Form Practice Sandbox</span>
            </span>
            <h3 className="text-xl font-bold text-stone-900 font-serif-display mt-0.5">
              Test Your Input Before Submitting to {selectedGuide.shortTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'practice', label: 'Try It Yourself (Sandbox)' },
              { id: 'checklist', label: 'Required Documents & Checklist' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPlayerTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  playerTab === tab.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {playerTab === 'practice' ? (
          <div className="space-y-5">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-900">
                  Pro-Tip for Chapter {activeChapter.chapterNumber}:
                </strong>
                <p className="text-stone-700 mt-0.5 leading-relaxed">
                  {activeChapter.proTip}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {activeChapter.mockFields.map((field) => (
                <div key={field.fieldKey} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-800">
                      {field.label} {field.isRequired && <span className="text-rose-600">*</span>}
                    </label>
                    {field.fieldKey === 'actDesc' && (
                      <span
                        className={`text-[10px] font-mono font-bold ${
                          (sandboxInputs[field.fieldKey] || '').length > 150
                            ? 'text-rose-600'
                            : 'text-stone-500'
                        }`}
                      >
                        {(sandboxInputs[field.fieldKey] || '').length}/150 characters
                      </span>
                    )}
                  </div>

                  {field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={sandboxInputs[field.fieldKey] || ''}
                      onChange={(e) => handleSandboxChange(field.fieldKey, e.target.value, field)}
                      placeholder={field.placeholder}
                      className={`w-full p-2.5 text-xs border rounded-lg focus:outline-none focus:ring-1 leading-relaxed ${
                        sandboxErrors[field.fieldKey]
                          ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                          : 'border-stone-300 focus:ring-amber-500'
                      }`}
                    />
                  ) : (
                    <input
                      type="text"
                      value={sandboxInputs[field.fieldKey] || ''}
                      onChange={(e) => handleSandboxChange(field.fieldKey, e.target.value, field)}
                      placeholder={field.placeholder}
                      className={`w-full p-2 text-xs border rounded-lg focus:outline-none focus:ring-1 ${
                        sandboxErrors[field.fieldKey]
                          ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                          : 'border-stone-300 focus:ring-amber-500'
                      }`}
                    />
                  )}

                  {sandboxErrors[field.fieldKey] ? (
                    <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                      <span>{sandboxErrors[field.fieldKey]}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-stone-500">{field.validationTip}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">
              Mandatory Documentation Checklist for {selectedGuide.shortTitle}:
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {selectedGuide.requiredDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-stone-800 font-medium leading-relaxed">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Guides Catalog Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-serif-display flex items-center gap-2">
              <Video className="w-5 h-5 text-amber-700" />
              <span>Full Video Walkthrough Library ({filteredGuides.length} Forms Covered)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Click any guide to load its simulated video canvas, voiceover script, and practice sandbox.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => {
                setSelectedGuide(guide);
                setCurrentChapterIndex(0);
                setProgressSec(0);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className={`bg-white rounded-2xl border p-5 shadow-sm hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedGuide.id === guide.id ? 'border-amber-500 ring-2 ring-amber-100' : 'border-stone-200'
              }`}
            >
              <div className="space-y-3">
                {/* Thumbnail card header */}
                <div
                  className={`h-28 rounded-xl bg-gradient-to-br ${guide.thumbnailGradient} p-4 flex flex-col justify-between text-white relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs font-bold uppercase">
                      {guide.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-stone-950 font-mono">
                      {guide.badge}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate max-w-[180px]">{guide.platform}</span>
                    <span className="text-[11px] font-mono text-stone-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{guide.totalDuration}</span>
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-stone-900 font-serif-display line-clamp-1">
                    {guide.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    {guide.overview}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">
                  {guide.chapters.length} Video Chapters
                </span>
                <span className="text-amber-700 font-bold flex items-center gap-1">
                  <span>Watch Walkthrough</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI On-Demand Custom Form Video Walkthrough Generator */}
      <div className="bg-gradient-to-br from-amber-500/10 via-stone-50 to-amber-500/5 rounded-3xl border border-amber-200/80 p-6 sm:p-8 space-y-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>AI Form Video Script & Chapter Generator</span>
          </div>
          <h3 className="text-2xl font-bold text-stone-900 font-serif-display mt-1">
            Need Guidance on a Specific Form Not Listed Above?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
            Type any application form, embassy visa question, or regional portal (e.g. "Canadian Study Permit IMM 1294", "Erasmus Mundus Scholarship Statement", "WES Credential Evaluation", "Australian Subclass 500 Visa"). Our Gemini engine will generate a bespoke step-by-step video script, field breakdown, and submission checklist in real-time.
          </p>
        </div>

        <form onSubmit={handleGenerateCustomWalkthrough} className="grid sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <input
              type="text"
              value={customFormQuery}
              onChange={(e) => setCustomFormQuery(e.target.value)}
              placeholder="e.g. Canadian Study Permit IMM 1294 or WES Evaluation"
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
          </div>

          <div>
            <select
              value={customDestination}
              onChange={(e) => setCustomDestination(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="United States">Destination: United States</option>
              <option value="United Kingdom">Destination: United Kingdom</option>
              <option value="Canada">Destination: Canada</option>
              <option value="Germany">Destination: Germany</option>
              <option value="Australia">Destination: Australia</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isGeneratingCustom || !customFormQuery.trim()}
              className="w-full p-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              {isGeneratingCustom ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating AI Video Guide...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generate Video Script</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Display Generated Custom Walkthrough if available */}
        {customWalkthroughData && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold uppercase">
                  Custom AI Generated Guide
                </span>
                <h4 className="text-xl font-bold text-stone-900 font-serif-display mt-1">
                  {customWalkthroughData.walkthroughTitle}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  {customWalkthroughData.overview}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 px-3 py-1 bg-amber-50 rounded-lg border border-amber-200 shrink-0">
                Est. Duration: {customWalkthroughData.estimatedTime}
              </span>
            </div>

            {/* Generated Chapters */}
            <div className="space-y-4">
              <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono">
                Generated Video Chapters & Spoken Narration:
              </h5>
              <div className="grid md:grid-cols-3 gap-4">
                {customWalkthroughData.chapters?.map((ch: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-700 font-mono text-xs font-bold">
                        <Video className="w-3.5 h-3.5 text-amber-600" />
                        <span>Chapter {ch.chapterNumber}: {ch.title}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-stone-200 text-[11px] text-stone-700 leading-relaxed italic">
                        "{ch.narrationScript}"
                      </div>
                      <p className="text-[11px] text-stone-500">
                        <strong className="text-stone-700">Visual Screen Action:</strong>{' '}
                        {ch.visualScreenAction}
                      </p>
                    </div>

                    {ch.commonMistake && (
                      <div className="p-2 bg-rose-50 rounded-lg border border-rose-200 text-[10px] text-rose-900">
                        <strong>Avoid:</strong> {ch.commonMistake.mistake}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-submission checklist */}
            {customWalkthroughData.submissionChecklist && (
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-emerald-900 uppercase font-mono block">
                  Final Submission Verification Checklist:
                </span>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-emerald-950">
                  {customWalkthroughData.submissionChecklist.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* "Everything You Need to Know" Comprehensive Study Abroad Knowledge Encyclopedia */}
      <div className="space-y-6 pt-4 border-t border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wide">
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>Complete Global Knowledge Base</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-serif-display mt-0.5">
              Everything Regarding Study Abroad: Portals, Visas, Housing & Aid
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Search answers, official portal links, and step-by-step procedures for every stage of your international journey.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={everythingSearch}
              onChange={(e) => setEverythingSearch(e.target.value)}
              placeholder="Search topics (e.g. WES, Dorms, CAS, GIC)..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {everythingCategories.map((c) => (
            <button
              key={c}
              onClick={() => setEverythingCategory(c)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                everythingCategory === c
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Topic Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEverythingTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-bold uppercase">
                    {topic.category}
                  </span>
                  <a
                    href={topic.portalOrResource.split(' ')[0]}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-400 hover:text-stone-800 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h4 className="text-base font-bold text-stone-900 font-serif-display">
                  {topic.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {topic.summary}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                  <strong className="block text-[10px] uppercase font-bold text-amber-900">
                    Recommended Action:
                  </strong>
                  <p className="text-stone-700 text-[11px] leading-relaxed">
                    {topic.recommendedAction}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {topic.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
