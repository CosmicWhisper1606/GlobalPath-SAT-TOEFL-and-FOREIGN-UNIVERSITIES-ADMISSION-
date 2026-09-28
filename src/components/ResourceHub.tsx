import React, { useState, useMemo } from 'react';
import {
  EXAM_RESOURCES,
  VOCABULARY_DATABASE,
  EXPERT_SCORE_TIPS,
  ExamResource,
  VocabularyWord
} from '../data/resourceHubData';
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Volume2,
  Sparkles,
  HelpCircle,
  RotateCw,
  Search,
  Filter,
  Flame,
  Layers,
  GraduationCap,
  Lightbulb,
  Check,
  ChevronLeft,
  ChevronRight,
  Shuffle
} from 'lucide-react';

export const ResourceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'vocab' | 'tips'>('resources');

  // Resource filter states
  const [resourceExam, setResourceExam] = useState<'All' | 'SAT' | 'TOEFL'>('All');
  const [resourceSkill, setResourceSkill] = useState<'All' | 'Reading' | 'Writing' | 'Math' | 'Listening' | 'Speaking'>('All');
  const [resourceSearch, setResourceSearch] = useState('');

  // Vocabulary Builder states
  const [vocabExam, setVocabExam] = useState<'All' | 'SAT' | 'TOEFL'>('All');
  const [vocabMode, setVocabMode] = useState<'flashcards' | 'quiz' | 'glossary'>('flashcards');
  const [currentVocabIdx, setCurrentVocabIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredWords, setMasteredWords] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('globalpath_mastered_words');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return EXAM_RESOURCES.filter(r => {
      if (resourceExam !== 'All' && r.exam !== resourceExam && r.exam !== 'Both') return false;
      if (resourceSkill !== 'All' && r.skill !== resourceSkill && r.skill !== 'All') return false;
      if (resourceSearch.trim()) {
        const query = resourceSearch.toLowerCase();
        return r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.provider.toLowerCase().includes(query);
      }
      return true;
    });
  }, [resourceExam, resourceSkill, resourceSearch]);

  // Filtered vocabulary
  const filteredVocab = useMemo(() => {
    return VOCABULARY_DATABASE.filter(w => {
      if (vocabExam !== 'All' && w.primaryExam !== vocabExam && w.primaryExam !== 'Both') return false;
      return true;
    });
  }, [vocabExam]);

  const currentWord = filteredVocab[currentVocabIdx % Math.max(1, filteredVocab.length)] || VOCABULARY_DATABASE[0];

  const handleSpeak = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMastered = (id: number) => {
    setMasteredWords(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('globalpath_mastered_words', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleNextWord = () => {
    setIsFlipped(false);
    setCurrentVocabIdx(prev => (prev + 1) % filteredVocab.length);
  };

  const handlePrevWord = () => {
    setIsFlipped(false);
    setCurrentVocabIdx(prev => (prev - 1 + filteredVocab.length) % filteredVocab.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentVocabIdx(Math.floor(Math.random() * filteredVocab.length));
  };

  // Generate 4 quiz options for the current quiz word
  const quizWord = VOCABULARY_DATABASE[quizIdx % VOCABULARY_DATABASE.length];
  const quizOptions = useMemo(() => {
    const correctDef = quizWord.definition;
    const otherDefs = VOCABULARY_DATABASE
      .filter(w => w.id !== quizWord.id)
      .map(w => w.definition)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const combined = [correctDef, ...otherDefs].sort(() => 0.5 - Math.random());
    return combined;
  }, [quizWord]);

  const handleQuizAnswer = (optionIdx: number, selectedText: string) => {
    if (quizAnswered) return;
    setQuizSelected(optionIdx);
    setQuizAnswered(true);
    if (selectedText === quizWord.definition) {
      setQuizScore(s => s + 1);
    }
  };

  const handleNextQuiz = () => {
    setQuizAnswered(false);
    setQuizSelected(null);
    setQuizIdx(prev => (prev + 1) % VOCABULARY_DATABASE.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header and Sub-navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <BookOpen className="w-3.5 h-3.5" />
          <span>Official Test Preparation Repository</span>
          <span aria-hidden="true">·</span>
          <span>Digital SAT Suite & TOEFL iBT Standards</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          SAT & TOEFL Exam Preparation Resource Hub
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Access verified official study guides, free practice tests, interactive vocabulary flashcards with native pronunciation, and expert score-improvement strategies.
        </p>

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200/60 pt-4">
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'resources'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            1. Official Guides & Free Practice Tests
          </button>
          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'vocab'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            2. Academic Vocabulary Builder ({VOCABULARY_DATABASE.length} Words)
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'tips'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            3. Expert Score Strategies & Hacks
          </button>
        </div>
      </div>

      {/* Tab 1: Official Guides & Practice Tests */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search guides, tests, or strategies..."
                  value={resourceSearch}
                  onChange={(e) => setResourceSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50"
                />
              </div>

              {/* Exam Switcher */}
              <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
                <span className="font-semibold text-stone-500">Exam:</span>
                {(['All', 'SAT', 'TOEFL'] as const).map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setResourceExam(ex)}
                    className={`px-3 py-1 rounded font-medium transition-colors ${
                      resourceExam === ex
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {ex === 'All' ? 'All Exams' : ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Switcher Sub-row */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-stone-100 text-xs">
              <span className="font-semibold text-stone-500 whitespace-nowrap">Filter Skill:</span>
              {(['All', 'Reading', 'Writing', 'Math', 'Listening', 'Speaking'] as const).map((sk) => (
                <button
                  key={sk}
                  onClick={() => setResourceSkill(sk)}
                  className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
                    resourceSkill === sk
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {sk}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-stone-300 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          res.exam === 'SAT' ? 'bg-amber-100 text-amber-900' :
                          res.exam === 'TOEFL' ? 'bg-emerald-100 text-emerald-900' :
                          'bg-stone-100 text-stone-800'
                        }`}>
                          {res.exam}
                        </span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-500 font-medium">{res.skill}</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-500">{res.type}</span>
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 mt-1 font-serif-display">
                        {res.title}
                      </h3>
                      <div className="text-xs text-stone-500 mt-0.5">By {res.provider}</div>
                    </div>

                    {res.isOfficial && (
                      <span className="px-2 py-0.5 bg-stone-900 text-white rounded text-[10px] font-mono shrink-0">
                        OFFICIAL
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                    {res.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                    {res.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="text-xs text-stone-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={res.accessUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold rounded-md transition-colors shadow-sm"
                  >
                    <span>Launch Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Academic Vocabulary Builder */}
      {activeTab === 'vocab' && (
        <div className="space-y-6">
          {/* Mode Selector & Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex rounded border border-stone-200 overflow-hidden text-xs">
              <button
                onClick={() => setVocabMode('flashcards')}
                className={`px-3 py-1.5 font-medium transition-colors ${
                  vocabMode === 'flashcards' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                Interactive Flashcards
              </button>
              <button
                onClick={() => setVocabMode('quiz')}
                className={`px-3 py-1.5 font-medium transition-colors ${
                  vocabMode === 'quiz' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                Test Retention Quiz
              </button>
              <button
                onClick={() => setVocabMode('glossary')}
                className={`px-3 py-1.5 font-medium transition-colors ${
                  vocabMode === 'glossary' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                Full Glossary
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-stone-500 font-medium">Exam Filter:</span>
              {(['All', 'SAT', 'TOEFL'] as const).map((ex) => (
                <button
                  key={ex}
                  onClick={() => setVocabExam(ex)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    vocabExam === ex
                      ? 'bg-stone-900 text-white font-medium'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {ex}
                </button>
              ))}

              <span className="font-mono text-stone-500 ml-2">
                Mastered: <strong>{masteredWords.length}</strong>/{VOCABULARY_DATABASE.length}
              </span>
            </div>
          </div>

          {/* Flashcard Mode */}
          {vocabMode === 'flashcards' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div
                onClick={() => setIsFlipped(f => !f)}
                className="cursor-pointer min-h-[320px] bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-300 transition-all p-8 flex flex-col justify-between shadow-sm relative group"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-amber-100 text-amber-900 font-semibold">
                      {currentWord.primaryExam} Priority
                    </span>
                    <span className="text-stone-400 font-mono">
                      Word {currentVocabIdx + 1} of {filteredVocab.length}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMastered(currentWord.id);
                    }}
                    className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 font-medium transition-colors ${
                      masteredWords.includes(currentWord.id)
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{masteredWords.includes(currentWord.id) ? 'Mastered' : 'Mark as Mastered'}</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="my-auto py-4 text-center space-y-3">
                  {!isFlipped ? (
                    <>
                      <div className="flex items-center justify-center gap-3">
                        <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif-display">
                          {currentWord.word}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeak(currentWord.word);
                          }}
                          className="p-1.5 rounded-full hover:bg-amber-100 text-stone-500 hover:text-amber-800 transition-colors"
                          title="Listen to pronunciation"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="text-sm font-mono text-stone-500 italic">
                        {currentWord.phonetic} · <span className="text-amber-800">{currentWord.partOfSpeech}</span>
                      </div>
                      <div className="text-xs text-stone-400 mt-4 flex items-center justify-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Click card to reveal definition & examples</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-left space-y-3 animate-fadeIn">
                      <div>
                        <div className="text-xs font-semibold uppercase text-stone-400">Definition</div>
                        <p className="text-base sm:text-lg font-medium text-stone-900 mt-0.5 leading-snug">
                          {currentWord.definition}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 text-xs sm:text-sm text-stone-700 italic">
                        "{currentWord.exampleSentence}"
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <strong className="text-stone-800">Synonyms:</strong>{' '}
                          <span className="text-stone-600">{currentWord.synonyms.join(', ')}</span>
                        </div>
                        <div>
                          <strong className="text-stone-800">Antonyms:</strong>{' '}
                          <span className="text-stone-600">{currentWord.antonyms.join(', ')}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200">
                        <strong>Exam Relevance:</strong> {currentWord.contextNote}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer prompt */}
                <div className="text-center text-[11px] text-stone-400">
                  {isFlipped ? 'Click card to flip back' : 'Press Space or Click to flip'}
                </div>
              </div>

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevWord}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleShuffle}
                  className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1.5 transition-colors font-medium"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Shuffle</span>
                </button>

                <button
                  onClick={handleNextWord}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Next Word</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Quiz Mode */}
          {vocabMode === 'quiz' && (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <div className="text-xs font-mono text-amber-700 font-bold uppercase">
                    Question {quizIdx + 1} of {VOCABULARY_DATABASE.length}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mt-1 font-serif-display">
                    What is the definition of "{quizWord.word}"?
                  </h3>
                </div>
                <div className="text-xs font-mono font-bold bg-stone-100 text-stone-800 px-3 py-1.5 rounded">
                  Score: {quizScore} / {quizIdx + (quizAnswered ? 1 : 0)}
                </div>
              </div>

              <div className="space-y-3">
                {quizOptions.map((opt, idx) => {
                  const isCorrect = opt === quizWord.definition;
                  const isSelected = quizSelected === idx;

                  let style = 'border-stone-200 hover:border-stone-400 bg-white text-stone-800';
                  if (quizAnswered) {
                    if (isCorrect) {
                      style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (isSelected) {
                      style = 'border-rose-500 bg-rose-50 text-rose-950';
                    } else {
                      style = 'border-stone-200 opacity-50 bg-stone-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx, opt)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-colors ${style}`}
                    >
                      <span className="font-mono font-semibold shrink-0 uppercase text-xs mt-0.5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {quizAnswered && (
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <div className="text-xs text-stone-600">
                    <strong>Sample context:</strong> "{quizWord.exampleSentence}"
                  </div>
                  <button
                    onClick={handleNextQuiz}
                    className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 shadow-sm"
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Full Glossary Table */}
          {vocabMode === 'glossary' && (
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 font-semibold">
                      <th className="py-3 px-4">Word & Pronunciation</th>
                      <th className="py-3 px-3">Exam</th>
                      <th className="py-3 px-4">Definition</th>
                      <th className="py-3 px-4">Example Sentence</th>
                      <th className="py-3 px-3">Mastery</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredVocab.map((w) => (
                      <tr key={w.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 px-4 font-semibold text-stone-900 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span>{w.word}</span>
                            <button
                              onClick={() => handleSpeak(w.word)}
                              className="text-stone-400 hover:text-stone-700 p-0.5"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] text-stone-500 font-mono font-normal">
                            {w.phonetic} ({w.partOfSpeech})
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-stone-700 font-medium">
                            {w.primaryExam}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-700 leading-relaxed text-xs">
                          {w.definition}
                        </td>
                        <td className="py-3 px-4 text-stone-600 text-xs italic leading-relaxed">
                          "{w.exampleSentence}"
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => toggleMastered(w.id)}
                            className={`p-1.5 rounded-full transition-colors ${
                              masteredWords.includes(w.id)
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'text-stone-300 hover:text-stone-600 hover:bg-stone-100'
                            }`}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Expert Score Strategies */}
      {activeTab === 'tips' && (
        <div className="grid md:grid-cols-2 gap-8">
          {EXPERT_SCORE_TIPS.map((tip, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-100 text-amber-900">
                  {tip.exam}
                </span>
                <h3 className="text-xl font-bold text-stone-900 font-serif-display">
                  {tip.title}
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                {tip.steps.map((step, sIdx) => {
                  const [title, desc] = step.split(': ');
                  return (
                    <div key={sIdx} className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
                      <strong className="text-stone-900 font-semibold">{title}:</strong> {desc}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
