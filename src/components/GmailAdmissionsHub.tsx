import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { gmailService, GmailMessageSummary, GmailMessageDetail } from '../services/gmailService';
import {
  Mail,
  Send,
  Search,
  RefreshCw,
  Sparkles,
  Inbox,
  FileEdit,
  AlertTriangle,
  CheckCircle2,
  X,
  ExternalLink,
  Lock,
  ArrowRight,
  ShieldCheck,
  User,
  Clock,
  ChevronRight
} from 'lucide-react';

interface EmailTemplate {
  title: string;
  subject: string;
  body: string;
  category: string;
}

const ADMISSIONS_TEMPLATES: EmailTemplate[] = [
  {
    title: 'Application Fee Waiver Request',
    category: 'Financial Aid',
    subject: 'Inquiry Regarding Need-Based Application Fee Waiver for International Applicant',
    body: `Dear Admissions Committee,\n\nI am writing to express my strong enthusiasm for applying to your esteemed institution for the upcoming Fall intake to pursue an undergraduate degree.\n\nAs an international applicant from an underrepresented background with significant financial constraints, paying the application fee represents an insurmountable financial hardship for my family. Given my academic credentials and demonstrated commitment to excellence, I would be deeply grateful if you could consider granting me an institutional application fee waiver code or instructions on how to submit a fee waiver request.\n\nThank you very much for your time, consideration, and continued support of global applicants.\n\nSincerely,\n[Your Full Name]\n[Common App / Application ID if available]\n[Your High School / Country]`
  },
  {
    title: 'English Language Waiver Request',
    category: 'Testing Policy',
    subject: 'Request for TOEFL/IELTS Waiver - Medium of Instruction Verification',
    body: `Dear International Admissions Team,\n\nI am currently preparing my application for the undergraduate program at your university. I am writing to respectfully request an exemption or waiver from the TOEFL/IELTS requirement.\n\nThroughout my entire secondary school education (Grades 9 through 12), the primary medium of instruction and examination for all academic subjects has been English. I can provide an official Medium of Instruction (MOI) verification letter from my school principal upon request.\n\nPlease let me know if this qualifies for a waiver under your international admissions policy.\n\nThank you for your guidance.\n\nWarm regards,\n[Your Full Name]\n[High School Name, Country]`
  },
  {
    title: 'SAT Score & Superscore Inquiry',
    category: 'Standardized Testing',
    subject: 'Inquiry Regarding Digital SAT Self-Reporting & Superscoring Policy',
    body: `Dear Admissions Officer,\n\nI am an applicant for the upcoming admissions cycle and wanted to confirm your policy regarding the Digital SAT.\n\nCould you please clarify whether your office accepts self-reported SAT scores on the Common Application for initial review, or if official score reports through the College Board are required at the time of application submission? Additionally, I would appreciate confirmation on whether you automatically superscore across multiple Digital SAT test dates.\n\nThank you for your assistance.\n\nSincerely,\n[Your Full Name]`
  },
  {
    title: 'Transcripts & Material Status Follow-Up',
    category: 'Application Status',
    subject: 'Follow-Up on Official High School Transcript & Counselor Recommendation',
    body: `Dear Admissions Processing Team,\n\nI recently submitted my application via the applicant portal and noticed that my high school transcript and counselor recommendation letters are currently marked as pending/awaiting.\n\nMy school counselor dispatched these official documents electronically last week. Could you please confirm if there is a routine processing delay, or if you require any additional verification from my high school counselor?\n\nThank you for checking my application file.\n\nBest regards,\n[Your Full Name]\nApplicant ID: [Your ID]\nDate of Birth: [MM/DD/YYYY]`
  }
];

export const GmailAdmissionsHub: React.FC = () => {
  const { user, accessToken, signInWithGoogle, signOutUser } = useAuth();

  const [activeView, setActiveView] = useState<'inbox' | 'compose'>('inbox');
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('admissions OR college OR university OR SAT OR TOEFL');
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageDetail | null>(null);
  const [fetchingDetail, setFetchingDetail] = useState<boolean>(false);

  // Compose State
  const [composeTo, setComposeTo] = useState<string>('');
  const [composeSubject, setComposeSubject] = useState<string>('');
  const [composeBody, setComposeBody] = useState<string>('');
  const [statusNotification, setStatusNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // MANDATORY USER CONFIRMATION MODAL STATE FOR EMAIL SENDING
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      loadInboxMessages();
    }
  }, [accessToken]);

  const loadInboxMessages = async (queryOverride?: string) => {
    if (!accessToken) return;
    setLoading(true);
    setStatusNotification(null);
    try {
      const q = queryOverride !== undefined ? queryOverride : searchFilter;
      const listData = await gmailService.listMessages(accessToken, { maxResults: 15, q });

      if (!listData.messages || listData.messages.length === 0) {
        setMessages([]);
        setLoading(false);
        return;
      }

      // Fetch summaries for each message
      const summaries = await Promise.all(
        listData.messages.map(async (m) => {
          try {
            return await gmailService.getMessage(accessToken, m.id);
          } catch {
            return { id: m.id, threadId: m.threadId, subject: 'Admissions Message' };
          }
        })
      );

      setMessages(summaries);
    } catch (err: any) {
      console.error('Failed to load Gmail messages:', err);
      setStatusNotification({
        type: 'error',
        message: 'Could not load Gmail messages. Please ensure you granted Gmail permissions upon sign-in.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMessage = async (msg: GmailMessageSummary) => {
    if (!accessToken) return;
    setFetchingDetail(true);
    try {
      const detail = await gmailService.getMessage(accessToken, msg.id);
      setSelectedMessage(detail);
    } catch (err) {
      console.error('Error fetching detail:', err);
    } finally {
      setFetchingDetail(false);
    }
  };

  const applyTemplate = (template: EmailTemplate) => {
    setComposeSubject(template.subject);
    setComposeBody(template.body);
    setActiveView('compose');
  };

  // Called when user clicks "Send" button in form -> triggers MANDATORY CONFIRMATION DIALOG
  const initiateSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()) {
      setStatusNotification({ type: 'error', message: 'Please fill in recipient, subject, and message body.' });
      return;
    }
    // Open explicit confirmation dialog
    setShowConfirmModal(true);
  };

  // Called ONLY after the user explicitly confirms in the dialog
  const handleConfirmedSend = async () => {
    if (!accessToken) return;
    setIsSending(true);
    try {
      await gmailService.sendEmail(accessToken, {
        to: composeTo.trim(),
        subject: composeSubject.trim(),
        body: composeBody.trim()
      });

      setShowConfirmModal(false);
      setStatusNotification({
        type: 'success',
        message: `Email successfully sent to ${composeTo} via your Gmail account!`
      });
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      setActiveView('inbox');
      // Refresh inbox
      setTimeout(() => loadInboxMessages(), 1000);
    } catch (err: any) {
      console.error('Error sending email:', err);
      setStatusNotification({
        type: 'error',
        message: `Failed to send email: ${err.message || 'Please check connection'}`
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!accessToken) return;
    if (!composeTo.trim() && !composeSubject.trim() && !composeBody.trim()) return;

    try {
      await gmailService.createDraft(accessToken, {
        to: composeTo,
        subject: composeSubject,
        body: composeBody
      });
      setStatusNotification({ type: 'success', message: 'Draft saved to your Gmail mailbox!' });
    } catch (err: any) {
      setStatusNotification({ type: 'error', message: `Could not save draft: ${err.message}` });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
          <Mail className="w-3.5 h-3.5 text-red-400" />
          Gmail Integration • Official Workspace API
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-display mb-2">
              Admissions Mailbox & Communication Center
            </h1>
            <p className="text-sm text-stone-300 max-w-2xl">
              Connect your Gmail account with official permissions to monitor university admissions decisions, interview invitations, and send formal inquiries to admissions officers.
            </p>
          </div>

          <div className="shrink-0">
            {!user || !accessToken ? (
              <button
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                  } catch (e) {
                    console.error('Google sign-in error:', e);
                  }
                }}
                className="px-6 py-3.5 bg-white hover:bg-stone-100 text-stone-950 font-bold rounded-2xl shadow-xl flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer"
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
                <span>Authorize Gmail with Google</span>
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-stone-950 p-2.5 rounded-2xl border border-stone-800">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-10 h-10 rounded-xl object-cover ring-2 ring-red-500/50" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-300 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div className="pr-3">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{user.email}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] text-stone-400">Gmail API Connected</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Templates Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3 block flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Fast Admissions Email Templates
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ADMISSIONS_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => applyTemplate(tmpl)}
                className="p-3 bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-red-500/50 rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="text-[10px] text-red-400 font-mono uppercase mb-1">{tmpl.category}</div>
                <div className="text-xs font-bold text-white group-hover:text-amber-300 line-clamp-1">{tmpl.title}</div>
                <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">{tmpl.subject}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {statusNotification && (
        <div
          className={`mb-6 p-4 rounded-2xl flex items-center justify-between text-sm ${
            statusNotification.type === 'success'
              ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/80 border border-red-500/50 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusNotification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400" />
            )}
            <span>{statusNotification.message}</span>
          </div>
          <button onClick={() => setStatusNotification(null)} className="p-1 hover:opacity-70 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Mail Arena */}
      {!accessToken ? (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto border border-red-500/20 shadow-xl">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Gmail Authentication Required</h2>
            <p className="text-sm text-stone-400 leading-relaxed">
              To read admissions status updates from universities and dispatch official inquiries, please authorize Gmail with your Google account.
            </p>
          </div>
          <button
            onClick={() => signInWithGoogle()}
            className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-2xl shadow-xl inline-flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
          >
            <span>Sign in with Google</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Navigation Sub-header */}
          <div className="p-4 sm:p-6 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('inbox')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                  activeView === 'inbox'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>Admissions Inbox</span>
              </button>
              <button
                onClick={() => setActiveView('compose')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                  activeView === 'compose'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                <FileEdit className="w-4 h-4" />
                <span>Compose Inquiry</span>
              </button>
            </div>

            {activeView === 'inbox' && (
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') loadInboxMessages();
                    }}
                    placeholder="Search queries (e.g. admissions, College Board)..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-stone-500 outline-none focus:border-red-500"
                  />
                </div>
                <button
                  onClick={() => loadInboxMessages()}
                  disabled={loading}
                  className="p-2 bg-stone-950 hover:bg-stone-800 border border-stone-800 rounded-xl text-stone-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                  title="Refresh Inbox"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-red-400' : ''}`} />
                </button>
              </div>
            )}
          </div>

          {/* View Body */}
          {activeView === 'inbox' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              {/* Message List Column */}
              <div className="lg:col-span-5 border-r border-stone-800 overflow-y-auto max-h-[600px] divide-y divide-stone-800">
                {loading && messages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-400 flex flex-col items-center gap-3">
                    <RefreshCw className="w-6 h-6 animate-spin text-red-400" />
                    <span>Querying your Gmail mailbox for admissions updates...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-400">
                    No messages matched your current query. Try searching with general terms or click "Compose Inquiry" to send an email.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => handleSelectMessage(msg)}
                      className={`w-full p-4 text-left transition-colors flex flex-col gap-1 cursor-pointer ${
                        selectedMessage?.id === msg.id
                          ? 'bg-red-950/30 border-l-4 border-l-red-500'
                          : 'hover:bg-stone-950/60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-stone-400">
                        <span className="font-semibold text-stone-200 truncate max-w-[200px]">{msg.from}</span>
                        <span>{msg.date?.split(' ').slice(0, 4).join(' ') || ''}</span>
                      </div>
                      <div className={`text-xs ${msg.unread ? 'font-bold text-white' : 'text-stone-300'} truncate`}>
                        {msg.subject || '(No Subject)'}
                      </div>
                      <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                        {msg.snippet || 'No preview text'}
                      </p>
                    </button>
                  ))
                )}
              </div>

              {/* Message Detail Column */}
              <div className="lg:col-span-7 p-6 overflow-y-auto max-h-[600px]">
                {fetchingDetail ? (
                  <div className="h-full flex items-center justify-center text-xs text-stone-400 gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin text-red-400" />
                    <span>Loading full message contents...</span>
                  </div>
                ) : selectedMessage ? (
                  <div className="space-y-4">
                    <div className="border-b border-stone-800 pb-4">
                      <h3 className="text-base font-bold text-white mb-2">{selectedMessage.subject}</h3>
                      <div className="text-xs text-stone-400 space-y-1">
                        <div><strong className="text-stone-300">From:</strong> {selectedMessage.from}</div>
                        <div><strong className="text-stone-300">To:</strong> {selectedMessage.to}</div>
                        <div><strong className="text-stone-300">Date:</strong> {selectedMessage.date}</div>
                      </div>
                    </div>

                    {/* Email Body text */}
                    <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-wrap font-sans">
                      {selectedMessage.bodyText || selectedMessage.snippet}
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => {
                          setComposeTo(selectedMessage.from || '');
                          setComposeSubject(`Re: ${selectedMessage.subject}`);
                          setComposeBody(`\n\n--- On ${selectedMessage.date}, wrote:\n${selectedMessage.bodyText || selectedMessage.snippet}`);
                          setActiveView('compose');
                        }}
                        className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Reply via Gmail
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-stone-500 text-xs text-center p-8">
                    <Inbox className="w-12 h-12 mb-3 opacity-40 text-red-400" />
                    <span>Select an email from the left to read full admissions correspondence.</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Compose View */
            <div className="p-6 max-w-3xl mx-auto">
              <form onSubmit={initiateSendEmail} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    To (Recipient Admissions Office)
                  </label>
                  <input
                    type="email"
                    required
                    value={composeTo}
                    onChange={(e) => setComposeTo(e.target.value)}
                    placeholder="e.g. admissions@harvard.edu or intladmissions@utoronto.ca"
                    className="w-full bg-stone-950 border border-stone-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    placeholder="Subject of your inquiry..."
                    className="w-full bg-stone-950 border border-stone-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Message Body
                  </label>
                  <textarea
                    required
                    rows={12}
                    value={composeBody}
                    onChange={(e) => setComposeBody(e.target.value)}
                    placeholder="Write your admissions inquiry, or select one of the fast templates above..."
                    className="w-full bg-stone-950 border border-stone-800 focus:border-red-500 rounded-xl p-4 text-xs sm:text-sm text-white outline-none leading-relaxed font-sans resize-y"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Save as Draft
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer text-xs sm:text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Email</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MANDATORY USER CONFIRMATION MODAL FOR DESTRUCTIVE / MUTATING GMAIL ACTIONS */}
      {/* ========================================================================= */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-red-500/50 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center gap-3 border-b border-stone-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Confirm Outgoing Email Transmission</h3>
                <p className="text-xs text-stone-400">Sending on behalf of your authorized Gmail account</p>
              </div>
            </div>

            <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2 text-xs text-stone-300">
              <div>
                <strong className="text-stone-400">To:</strong> <span className="text-white font-mono">{composeTo}</span>
              </div>
              <div>
                <strong className="text-stone-400">Subject:</strong> <span className="text-white">{composeSubject}</span>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <strong className="text-stone-400">Message Preview:</strong>
                <p className="mt-1 max-h-32 overflow-y-auto text-stone-400 italic bg-stone-900 p-2.5 rounded-lg whitespace-pre-wrap">
                  {composeBody.slice(0, 300)}...
                </p>
              </div>
            </div>

            <div className="text-xs text-stone-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>This email will be dispatched directly to the recipient through Google Gmail API.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={isSending}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmedSend}
                disabled={isSending}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer text-xs"
              >
                {isSending ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm & Send Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
