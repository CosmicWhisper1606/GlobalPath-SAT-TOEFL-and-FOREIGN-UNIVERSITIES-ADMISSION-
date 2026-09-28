import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, LogIn, LogOut, CheckCircle2, Bookmark, Award, ShieldCheck, User, Sparkles, Building2, Trash2 } from 'lucide-react';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({ isOpen, onClose, onNavigateTab }) => {
  const {
    user,
    loading,
    signInWithGoogle,
    signOutUser,
    savedColleges,
    toggleSaveCollege,
    milestones,
    profile,
    updateProfile
  } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'shortlist'>('profile');
  const [targetSat, setTargetSat] = useState<number>(profile.targetSat || 1500);
  const [targetToefl, setTargetToefl] = useState<number>(profile.targetToefl || 105);
  const [dreamCountry, setDreamCountry] = useState<string>(profile.dreamCountry || 'United States');
  const [intendedMajor, setIntendedMajor] = useState<string>(profile.intendedMajor || 'Computer Science');
  const [savingProfile, setSavingProfile] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    await updateProfile({
      targetSat: Number(targetSat),
      targetToefl: Number(targetToefl),
      dreamCountry,
      intendedMajor
    });
    setSavingProfile(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Student Account & Cloud Sync</h2>
              <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Firebase Auth & Firestore Persistence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!user ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-stone-950 flex items-center justify-center mx-auto shadow-xl">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white mb-2">Sync Your Admissions Journey</h3>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Sign in with your Google account to automatically persist your university shortlist, target SAT/TOEFL scores, and timeline milestones to Firestore across all devices.
                </p>
              </div>

              <button
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                  } catch (e) {
                    console.error('Login error:', e);
                  }
                }}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-100 text-stone-950 font-bold rounded-2xl shadow-xl inline-flex items-center justify-center gap-3 transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="pt-4 border-t border-stone-800 text-xs text-stone-500 flex items-center justify-center gap-4">
                <span>✓ Firestore Multi-Device Sync</span>
                <span>✓ Private User Access Rules</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* User Bar */}
              <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-500/50" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-white">{user.displayName || 'Admissions Candidate'}</h3>
                    <p className="text-xs text-stone-400">{user.email}</p>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Firestore Connected
                    </span>
                  </div>
                </div>

                <button
                  onClick={signOutUser}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Subtabs */}
              <div className="flex border-b border-stone-800">
                <button
                  onClick={() => setActiveSubTab('profile')}
                  className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                    activeSubTab === 'profile'
                      ? 'border-amber-500 text-amber-400'
                      : 'border-transparent text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Target Profile & Scores
                </button>
                <button
                  onClick={() => setActiveSubTab('shortlist')}
                  className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                    activeSubTab === 'shortlist'
                      ? 'border-amber-500 text-amber-400'
                      : 'border-transparent text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Saved Shortlist ({savedColleges.length})
                </button>
              </div>

              {activeSubTab === 'profile' ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Target SAT Score</label>
                      <input
                        type="number"
                        min="400"
                        max="1600"
                        step="10"
                        value={targetSat}
                        onChange={(e) => setTargetSat(parseInt(e.target.value) || 0)}
                        className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Target TOEFL iBT Score</label>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={targetToefl}
                        onChange={(e) => setTargetToefl(parseInt(e.target.value) || 0)}
                        className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Dream Country</label>
                      <select
                        value={dreamCountry}
                        onChange={(e) => setDreamCountry(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                      >
                        <option value="United States">United States (F-1)</option>
                        <option value="United Kingdom">United Kingdom (Student Route)</option>
                        <option value="Canada">Canada (Study Permit)</option>
                        <option value="Germany">Germany (DAAD/Public)</option>
                        <option value="Australia">Australia (Subclass 500)</option>
                        <option value="Singapore">Singapore (NUS/NTU)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Intended Major</label>
                      <input
                        type="text"
                        value={intendedMajor}
                        onChange={(e) => setIntendedMajor(e.target.value)}
                        placeholder="e.g. Computer Science / Economics"
                        className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-stone-400">Timeline Milestones Completed:</span>
                    <span className="font-bold text-amber-400">{milestones.length} Completed</span>
                  </div>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    {savingProfile ? 'Syncing with Firestore...' : 'Save Targets to Firestore'}
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  {savedColleges.length === 0 ? (
                    <div className="text-center py-8 text-stone-500 text-sm">
                      No universities shortlisted yet. Browse the University Matcher and click "Bookmark" to save them to your Firestore account.
                    </div>
                  ) : (
                    savedColleges.map((col) => (
                      <div
                        key={col.id}
                        className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
                          <div>
                            <h4 className="text-xs font-bold text-white">{col.name}</h4>
                            <p className="text-[11px] text-stone-400">
                              {col.country} • SAT: {col.satRequirement} • TOEFL: {col.toeflRequirement}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSaveCollege(col)}
                          className="p-1.5 text-stone-500 hover:text-red-400 hover:bg-stone-900 rounded-lg transition-colors cursor-pointer"
                          title="Remove from shortlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
