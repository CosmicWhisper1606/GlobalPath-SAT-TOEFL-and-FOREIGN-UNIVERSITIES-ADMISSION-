import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User, Globe, Zap, Award, BookOpen, Volume2, RefreshCw, ExternalLink } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  sources?: { title: string; uri: string }[];
  modelUsed?: string;
  searchQueries?: string[];
}

export const GeminiChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "Hello! I'm your GlobalPath AI Admissions & Standardized Testing Counselor. Whether you need complex Ivy League holistic profile evaluation, live 2026/2027 test deadlines via Google Search, or rapid SAT/TOEFL flash drills, select your coaching mode above and let's get started!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'ivy-strategist' | 'general-advisor' | 'flash-drill'>('general-advisor');
  const [searchGrounded, setSearchGrounded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = (customPrompt || input).trim();
    if (!textToSend || loading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          role,
          searchGrounded
        })
      });

      const data = await res.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply || 'No response returned from the model.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
        modelUsed: data.modelUsed,
        searchQueries: data.searchQueries || []
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'model',
          content: 'Unable to reach the Gemini server. Please check your network connection or try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#_`]/g, ''));
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const quickPrompts = [
    {
      title: 'Ivy Holistic Evaluation',
      role: 'ivy-strategist' as const,
      prompt: 'Evaluate my profile: 1510 SAT, 108 TOEFL, 95% CBSE, National Science Olympiad finalist. What are my odds for Cornell and Johns Hopkins?'
    },
    {
      title: 'Live 2026/2027 Test Dates',
      role: 'general-advisor' as const,
      prompt: 'What are the current and upcoming Digital SAT and TOEFL iBT test dates and registration deadlines?'
    },
    {
      title: 'Rapid TOEFL Vocab Drill',
      role: 'flash-drill' as const,
      prompt: 'Give me a fast 5-question high-frequency TOEFL vocabulary drill with context clues.'
    },
    {
      title: 'F-1 Visa Proof of Funds',
      role: 'general-advisor' as const,
      prompt: 'Explain the current I-20 and F-1 student visa financial proof requirements and allowable funding sources.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header & Role Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-xl text-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Gemini Multi-Turn Admissions Advisor
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Pro • Flash • Flash-Lite
                  </span>
                </h2>
                <p className="text-xs text-stone-400">
                  Select your counseling tier for specialized AI reasoning and live Google Search verification.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchGrounded(!searchGrounded)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                searchGrounded
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30'
                  : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
              }`}
              title="Toggle Google Search live grounding data"
            >
              <Globe className="w-3.5 h-3.5" />
              Google Search Grounding: {searchGrounded ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome-reset',
                    role: 'model',
                    content: "Conversation refreshed. How can I assist your admissions strategy today?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    modelUsed: role === 'ivy-strategist' ? 'gemini-3.1-pro-preview' : role === 'flash-drill' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash'
                  }
                ]);
              }}
              className="p-2 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Reset Chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Tier Role Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-5">
          <button
            onClick={() => setRole('ivy-strategist')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              role === 'ivy-strategist'
                ? 'bg-amber-950/40 border-amber-500/80 ring-1 ring-amber-500/50'
                : 'bg-stone-950/50 border-stone-800 hover:border-stone-700 text-stone-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Ivy & Top 20 Strategist
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded font-mono">gemini-3.1-pro</span>
            </div>
            <p className="text-xs text-stone-300">Deep holistic evaluations, spike strategy, and essay audits for high-complexity tasks.</p>
          </button>

          <button
            onClick={() => setRole('general-advisor')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              role === 'general-advisor'
                ? 'bg-blue-950/40 border-blue-500/80 ring-1 ring-blue-500/50'
                : 'bg-stone-950/50 border-stone-800 hover:border-stone-700 text-stone-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Admissions & Test Advisor
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded font-mono">gemini-3.5-flash</span>
            </div>
            <p className="text-xs text-stone-300">General admissions guidance, SAT/TOEFL requirements, and Google Search Grounding.</p>
          </button>

          <button
            onClick={() => setRole('flash-drill')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              role === 'flash-drill'
                ? 'bg-emerald-950/40 border-emerald-500/80 ring-1 ring-emerald-500/50'
                : 'bg-stone-950/50 border-stone-800 hover:border-stone-700 text-stone-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Rapid Flash Drill Coach
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-mono">gemini-3.1-flash-lite</span>
            </div>
            <p className="text-xs text-stone-300">Instant answers, rapid math shortcuts, flash vocab drills, and score conversion checks.</p>
          </button>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-stone-500 shrink-0 font-medium">Quick Prompts:</span>
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => {
              setRole(qp.role);
              handleSend(qp.prompt);
            }}
            className="text-xs bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            {qp.title}
          </button>
        ))}
      </div>

      {/* Chat Thread */}
      <div className="bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[580px]">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none'
                    : 'bg-stone-900 border border-stone-800 text-stone-200 rounded-tl-none'
                }`}
              >
                {/* Content formatting */}
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Google Search Grounding Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-stone-800 text-xs">
                    <div className="flex items-center gap-1.5 text-blue-400 font-semibold mb-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      Google Search Grounding Sources:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.slice(0, 4).map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1 bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white rounded-md text-[11px] transition-colors"
                        >
                          <span className="truncate max-w-[200px]">{source.title || 'Source'}</span>
                          <ExternalLink className="w-3 h-3 text-stone-400 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer metadata & Speech button */}
                <div className="mt-2.5 flex items-center justify-between text-[11px] opacity-70">
                  <div className="flex items-center gap-2">
                    <span>{msg.timestamp}</span>
                    {msg.modelUsed && (
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/30">
                        {msg.modelUsed}
                      </span>
                    )}
                  </div>
                  {msg.role === 'model' && (
                    <button
                      onClick={() => speakText(msg.content)}
                      className="hover:opacity-100 p-1 hover:text-amber-400 transition-colors cursor-pointer"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-stone-800 text-stone-300 border border-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3.5 items-center">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-stone-900 border border-stone-800 rounded-2xl rounded-tl-none p-4 text-xs text-stone-400 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>
                  {role === 'ivy-strategist'
                    ? 'Gemini 3.1 Pro is computing holistic profile odds...'
                    : searchGrounded
                    ? 'Gemini 3.5 Flash is verifying with Google Search...'
                    : 'Gemini 3.1 Flash-Lite is formulating a rapid response...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-stone-900 border-t border-stone-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                role === 'ivy-strategist'
                  ? 'Ask complex admissions strategy, essay critique, or scholarship odds (gemini-3.1-pro)...'
                  : role === 'flash-drill'
                  ? 'Ask rapid vocab, SAT math formulas, or conversion questions (gemini-3.1-flash-lite)...'
                  : 'Ask test dates, university requirements, or visa steps with Google Search (gemini-3.5-flash)...'
              }
              className="flex-1 bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
