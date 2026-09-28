import React, { useState } from 'react';
import { SCHOLARSHIPS, FINANCIAL_AID_GUIDE } from '../data/scholarshipData';
import {
  Award,
  DollarSign,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Globe2,
  Sparkles
} from 'lucide-react';

export const ScholarshipsAndAid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [activeTab, setActiveTab] = useState<'scholarships' | 'need-blind' | 'forms'>('scholarships');

  const filteredScholarships = SCHOLARSHIPS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.targetDestinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDegree = selectedDegree === 'All' || s.degreeLevels.some(d => d.includes(selectedDegree));
    return matchesSearch && matchesDegree;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header and Sub-navigation with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <DollarSign className="w-3.5 h-3.5" />
          <span>Global Funding & Financial Aid Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Full Ride & Government Fellowships</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          Scholarships, Financial Aid & Need-Blind Admissions
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Financing international education: premier global merit fellowships (Fulbright, Chevening, DAAD), the 8 US universities that are 100% need-blind for international students, and CSS Profile documentation.
        </p>

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200/60 pt-4">
          {[
            { id: 'scholarships', label: '1. Global Scholarships Directory' },
            { id: 'need-blind', label: '2. Need-Blind vs Need-Aware Universities' },
            { id: 'forms', label: '3. CSS Profile & Financial Aid Forms' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Scholarships Directory */}
      {activeTab === 'scholarships' && (
        <div className="space-y-6">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search scholarship, country, or fund..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-stone-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
              <span className="text-stone-500 font-medium">Degree Level:</span>
              {['All', 'Undergraduate', 'Master\'s', 'Ph.D.'].map((deg) => (
                <button
                  key={deg}
                  onClick={() => setSelectedDegree(deg)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedDegree === deg
                      ? 'bg-stone-900 text-white font-medium'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {deg}
                </button>
              ))}
            </div>
          </div>

          {/* Scholarship Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredScholarships.map((s) => (
              <div key={s.id} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono text-amber-700 font-semibold">{s.provider}</span>
                      <h3 className="text-xl font-bold text-stone-900 mt-0.5 font-serif-display">{s.name}</h3>
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium shrink-0">
                      {s.targetDestinations.join(', ')}
                    </span>
                  </div>

                  <div className="mt-3 p-3 bg-stone-50 rounded-lg border border-stone-100 text-xs">
                    <span className="font-semibold text-stone-900">Award Value:</span>{' '}
                    <span className="text-emerald-800 font-medium">{s.awardAmount}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                    {s.keyDetails}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-1 text-xs text-stone-600">
                    <div><strong>Eligible:</strong> {s.eligibility}</div>
                    <div><strong>Typical Deadline:</strong> {s.applicationDeadline}</div>
                  </div>
                </div>

                <a
                  href={s.officialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors pt-2"
                >
                  <span>Official Application Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Need-Blind vs Need-Aware */}
      {activeTab === 'need-blind' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-xs font-mono text-amber-700 font-bold uppercase">US Admissions Policy Distinction</span>
              <h3 className="text-2xl font-bold text-stone-900 mt-1 font-serif-display">
                {FINANCIAL_AID_GUIDE.needBlindVsNeedAware.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {FINANCIAL_AID_GUIDE.needBlindVsNeedAware.explanation}
              </p>
            </div>

            <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed">
              <strong>The 8 Need-Blind Ivy & Elite Colleges for International Students:</strong> These universities do NOT consider whether you need $1 or $90,000/year of financial aid when reviewing your application. If admitted, they meet 100% of your family's demonstrated financial need without loans.
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {FINANCIAL_AID_GUIDE.needBlindVsNeedAware.needBlindUniversities.map((uni, idx) => (
                <div key={idx} className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{uni.name}</span>
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {uni.policy}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-700">
              <strong>Need-Aware Realities:</strong> {FINANCIAL_AID_GUIDE.needBlindVsNeedAware.needAwareNote}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: CSS Profile & Financial Aid Forms */}
      {activeTab === 'forms' && (
        <div className="space-y-6">
          {FINANCIAL_AID_GUIDE.formsRequired.map((f, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-3 gap-2">
                <div>
                  <span className="text-xs font-mono text-stone-500">{f.provider}</span>
                  <h3 className="text-xl font-bold text-stone-900 font-serif-display">{f.form}</h3>
                </div>
                <span className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded font-mono">
                  Official Documentation
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-stone-900">Purpose:</span>
                  <p className="text-stone-600 mt-1 leading-relaxed">{f.purpose}</p>
                </div>
                <div>
                  <span className="font-semibold text-stone-900">Required Financial Papers:</span>
                  <p className="text-stone-600 mt-1 leading-relaxed">{f.keyDocuments}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
