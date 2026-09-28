import React, { useState } from 'react';
import { COUNTRY_PROFILES, CountryAdmissionProfile } from '../data/applicationData';
import {
  Globe2,
  DollarSign,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const CountryGuides: React.FC = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('usa');

  const selectedCountry = COUNTRY_PROFILES.find(c => c.id === selectedCountryId) || COUNTRY_PROFILES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header with Theme Section Banner */}
      <div className="theme-section-banner relative overflow-hidden">
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
          <Globe2 className="w-3.5 h-3.5" />
          <span>Global Destination Intelligence</span>
          <span aria-hidden="true">·</span>
          <span>Tuition, Work Rights & Immigration Pathways</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-serif-display">
          Study Abroad Country Comparison Matrix
        </h2>
        <p className="mt-2 text-stone-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Compare the top 5 international education destinations side-by-side: tuition benchmarks, post-study work permits (OPT vs PGWP vs Graduate Route), living expenses, and permanent residency options.
        </p>

        {/* Country Selector Buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          {COUNTRY_PROFILES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCountryId(c.id)}
              className={`px-4 py-2 rounded-lg border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                selectedCountryId === c.id
                  ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span className="text-base">{c.flag}</span>
              <span>{c.country}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Country Deep-Dive Spotlight */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-5 gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">{selectedCountry.flag}</span>
              <h3 className="text-2xl font-bold text-stone-900 font-serif-display">
                {selectedCountry.country}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
              <span>Primary Intakes: {selectedCountry.topIntakes.join(', ')}</span>
              <span aria-hidden="true">·</span>
              <span>Portal: {selectedCountry.applicationPortal.split('(')[0]}</span>
            </div>
          </div>
          <div className="text-xs font-mono bg-stone-100 px-3 py-1.5 rounded text-stone-700">
            Visa: {selectedCountry.studentVisaName.split('(')[0]}
          </div>
        </div>

        {/* 4 Essential Quantitative Comparison Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-stone-600" />
              <span>Tuition Range</span>
            </span>
            <div className="text-sm font-bold text-stone-900 mt-1">
              {selectedCountry.averageTuitionUSD}
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-stone-600" />
              <span>Living Budget / Year</span>
            </span>
            <div className="text-sm font-bold text-stone-900 mt-1">
              {selectedCountry.averageLivingUSD}
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-stone-600" />
              <span>Work During Study</span>
            </span>
            <div className="text-xs font-bold text-stone-900 mt-1">
              {selectedCountry.partTimeWorkRules}
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-stone-600" />
              <span>Post-Study Work Visa</span>
            </span>
            <div className="text-xs font-bold text-stone-900 mt-1">
              {selectedCountry.postStudyWorkVisa.split(':')[0]}
            </div>
          </div>
        </div>

        {/* Requirements & Testing */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-stone-50/70 rounded-xl border border-stone-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Exam & Admission Thresholds
            </h4>
            <div className="text-xs text-stone-700 space-y-2">
              <div>
                <span className="font-semibold text-stone-900">SAT / Standardized Testing:</span>{' '}
                {selectedCountry.satRequirement}
              </div>
              <div>
                <span className="font-semibold text-stone-900">English Proficiency:</span>{' '}
                {selectedCountry.englishReq}
              </div>
              <div>
                <span className="font-semibold text-stone-900">Proof of Funds for Visa:</span>{' '}
                {selectedCountry.proofOfFundsEstimate}
              </div>
            </div>
          </div>

          <div className="p-5 bg-stone-50/70 rounded-xl border border-stone-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Immigration & Permanent Residency (PR)
            </h4>
            <div className="text-xs text-stone-700 leading-relaxed">
              <p>{selectedCountry.prPathwaySummary}</p>
              <div className="mt-2 text-stone-500 italic">
                Post-Study Authorization: {selectedCountry.postStudyWorkVisa}
              </div>
            </div>
          </div>
        </div>

        {/* Unique Advantages & Renowned Universities */}
        <div className="grid md:grid-cols-2 gap-6 pt-2">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              Key Strategic Advantages
            </h4>
            <div className="space-y-2">
              {selectedCountry.uniqueAdvantages.map((adv, idx) => (
                <div key={idx} className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-700 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              Top Tier Representative Universities
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCountry.popularUniversities.map((uni, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-stone-100 text-stone-800 text-xs font-medium rounded-md border border-stone-200"
                >
                  {uni}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Side-by-Side Quick Reference Table */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-stone-900 font-serif-display">
          All Destinations At-A-Glance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-700">
                <th className="py-2.5 px-3 font-semibold">Country</th>
                <th className="py-2.5 px-3 font-semibold">Tuition / Year</th>
                <th className="py-2.5 px-3 font-semibold">Work Visa (Post-Grad)</th>
                <th className="py-2.5 px-3 font-semibold">Part-Time Work Limit</th>
                <th className="py-2.5 px-3 font-semibold">Primary Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {COUNTRY_PROFILES.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCountryId(c.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedCountryId === c.id ? 'bg-amber-50/60 font-medium' : 'hover:bg-stone-50'
                  }`}
                >
                  <td className="py-2.5 px-3 flex items-center gap-2 text-stone-900">
                    <span>{c.flag}</span>
                    <span>{c.country}</span>
                  </td>
                  <td className="py-2.5 px-3 text-stone-700">{c.averageTuitionUSD.split('(')[0]}</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-medium">{c.postStudyWorkVisa.split(':')[0]}</td>
                  <td className="py-2.5 px-3 text-stone-600">{c.partTimeWorkRules.split(';')[0]}</td>
                  <td className="py-2.5 px-3 text-stone-500 font-mono text-xs">{c.applicationPortal.split('(')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
