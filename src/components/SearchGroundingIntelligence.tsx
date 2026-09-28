import React, { useState } from 'react';
import { Search, Globe, ExternalLink, Sparkles, CheckCircle2, Calendar, DollarSign, FileText, ArrowRight } from 'lucide-react';

export const SearchGroundingIntelligence: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    answer: string;
    sources: { title: string; uri: string }[];
    searchQueries: string[];
  } | null>(null);

  const curatedQueries = [
    {
      label: '2026/2027 SAT Dates & Fee Waivers',
      text: 'What are the official 2026 and 2027 Digital SAT international test dates, late registration fees, and fee waiver policies?'
    },
    {
      label: 'UK Student Visa & Graduate Route',
      text: 'What are the current UK student visa financial requirements and post-study Graduate Route visa eligibility rules?'
    },
    {
      label: 'Canada Study Permit Caps & Rules',
      text: 'What are the latest Canada international student visa regulations, study permit caps, and provincial attestation letter (PAL) rules?'
    },
    {
      label: 'Germany Winter Intake & Blocked Account',
      text: 'What is the required blocked account (Sperrkonto) minimum amount for German student visas and winter semester application deadlines?'
    },
    {
      label: 'Top 50 US University TOEFL Cutoffs',
      text: 'What are the minimum TOEFL iBT requirements and subscore cutoffs for international applicants at MIT, Stanford, Harvard, and UC Berkeley?'
    }
  ];

  const handleSearch = async (targetQuery?: string) => {
    const q = (targetQuery || query).trim();
    if (!q || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/gemini/search-grounded', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({
        answer: 'Failed to retrieve live data from Google Search. Please verify server connectivity.',
        sources: [],
        searchQueries: []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          Google Search Grounding • gemini-3.5-flash
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-display mb-2">
          Live Admissions & Testing Intelligence
        </h1>
        <p className="text-sm text-stone-300 max-w-2xl">
          Directly grounded in Google Search data. Query up-to-the-minute testing deadlines, changing foreign student visa regulations, and live tuition rates with verified web sources.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="mt-6 flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search current test dates, visa policies, tuition fees, or scholarship deadlines..."
              className="w-full bg-stone-950 border border-stone-800 focus:border-blue-500 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-stone-500 outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer shrink-0"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Searching Google...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Verify with Google</span>
              </>
            )}
          </button>
        </form>

        {/* Query Presets */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="text-xs text-stone-400 self-center font-medium">Try Trending Queries:</span>
          {curatedQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(item.text);
                handleSearch(item.text);
              }}
              className="text-xs bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Google Search Grounded Analysis</h2>
            </div>
            {result.searchQueries && result.searchQueries.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <span className="text-stone-500">Google queries:</span>
                {result.searchQueries.map((q, i) => (
                  <span key={i} className="px-2 py-0.5 bg-stone-950 rounded border border-stone-800 font-mono text-[11px] text-blue-300">
                    "{q}"
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="prose prose-invert max-w-none text-stone-200 text-sm leading-relaxed whitespace-pre-wrap">
            {result.answer}
          </div>

          {/* Web Sources & Grounding Links */}
          {result.sources && result.sources.length > 0 && (
            <div className="pt-6 border-t border-stone-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> Live Web Sources & Citations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {result.sources.map((source, sIdx) => (
                  <a
                    key={sIdx}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-blue-500/50 rounded-xl transition-all group flex flex-col justify-between"
                  >
                    <span className="text-xs font-medium text-stone-200 group-hover:text-blue-300 line-clamp-2">
                      {source.title || 'Official Source'}
                    </span>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500">
                      <span className="truncate max-w-[180px]">{source.uri.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:text-blue-400 shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
