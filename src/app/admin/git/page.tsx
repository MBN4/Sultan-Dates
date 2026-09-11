'use client';

import { useEffect, useState } from 'react';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileCode,
  Clock,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface GitStatus {
  branch: string;
  isClean: boolean;
  files: Array<{ path: string; status: string; rawCode: string }>;
  remoteUrl?: string;
  lastCommit?: {
    hash: string;
    message: string;
    author: string;
    date: string;
  };
}

interface CommitHistoryItem {
  hash: string;
  message: string;
  author: string;
  date: string;
}

export default function AdminGitSyncPage() {
  const [status, setStatus] = useState<GitStatus | null>(null);
  const [history, setHistory] = useState<CommitHistoryItem[]>([]);
  const [diff, setDiff] = useState<string>('');
  const [showDiff, setShowDiff] = useState(false);
  const [commitMessage, setCommitMessage] = useState('Update catalog products and website content');
  const [loading, setLoading] = useState(true);
  const [pushing, setPushing] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const presets = [
    'Update product catalog & pricing',
    'Add new harvest varieties',
    'Update hero banner and site copy',
    'Refine SEO meta tags & keywords',
    'Upload new date collection media',
    'Update customer FAQs and story'
  ];

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const fetchGitData = async () => {
    try {
      setLoading(true);
      const [statusRes, historyRes] = await Promise.all([
        fetch('/api/admin/git'),
        fetch('/api/admin/git?mode=history')
      ]);

      if (statusRes.ok) {
        const data = await statusRes.json();
        setStatus(data.status);
      }
      if (historyRes.ok) {
        const hData = await historyRes.json();
        setHistory(hData.history || []);
      }
    } catch {
      showToast('Failed to check git repository status', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchDiff = async () => {
    try {
      const res = await fetch('/api/admin/git?mode=diff');
      if (res.ok) {
        const data = await res.json();
        setDiff(data.diff || 'No diff available.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGitData();
  }, []);

  const handlePush = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitMessage.trim()) {
      showToast('Please enter a commit message', 'error');
      return;
    }

    setPushing(true);
    setConsoleOutput('Executing `git add -A` and `git commit`...\nPushing to GitHub remote repository (origin main)...');

    try {
      const res = await fetch('/api/admin/git', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: commitMessage.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setConsoleOutput(data.output || 'Push completed successfully!');
        showToast('Successfully committed and pushed directly to GitHub!', 'success');
        fetchGitData();
        setShowDiff(false);
      } else {
        setConsoleOutput(data.output || data.error || data.details || 'Error executing push.');
        showToast(data.error || 'Failed to push to GitHub', 'error');
      }
    } catch (e: any) {
      setConsoleOutput(`Network error: ${e.message}`);
      showToast('Git operation failed', 'error');
    } finally {
      setPushing(false);
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'modified':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">MODIFIED</span>;
      case 'added':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">ADDED</span>;
      case 'deleted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">DELETED</span>;
      case 'untracked':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">UNTRACKED</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-500/20 text-stone-300 border border-stone-500/30">{st.toUpperCase()}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium border animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === 'success'
              ? 'bg-[#0d2a19] text-emerald-300 border-emerald-500/30'
              : 'bg-red-950 text-red-300 border-red-500/30'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
            <span>Direct GitHub Sync Engine</span>
            <GitBranch size={20} className="text-[#4E9200]" />
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Stage changes, commit, and push updates directly to your GitHub repository without touching terminal commands.
          </p>
        </div>

        <button
          onClick={fetchGitData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 hover:text-white text-xs font-semibold transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Git Status</span>
        </button>
      </div>

      {/* Main Status & Push Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Repository Status & Commit Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Box */}
          <div className="p-6 rounded-2xl bg-[#09170f] border border-white/10 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-white">
                  <GitBranch size={20} className="text-[#4E9200]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      Repository: <span className="text-[#C59B27]">MBN4/Sultan-Dates</span>
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">
                    Branch: <code className="text-white bg-white/5 px-1.5 py-0.5 rounded">{status?.branch || 'main'}</code>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    status?.isClean
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {status?.isClean ? (
                    <>
                      <CheckCircle2 size={13} /> Synced with GitHub
                    </>
                  ) : (
                    <>
                      <AlertCircle size={13} /> {status?.files?.length} Pending Changes
                    </>
                  )}
                </span>

                {status?.remoteUrl && (
                  <a
                    href={status.remoteUrl.replace('.git', '')}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-stone-400 hover:text-white transition-colors"
                    title="Open in GitHub"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Changed Files List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  Uncommitted File Changes ({status?.files?.length || 0})
                </span>
                {status?.files && status.files.length > 0 && (
                  <button
                    onClick={() => {
                      if (!showDiff) fetchDiff();
                      setShowDiff(!showDiff);
                    }}
                    className="text-xs text-[#4E9200] hover:underline flex items-center gap-1"
                  >
                    <span>{showDiff ? 'Hide Git Diff' : 'Inspect Code Diff'}</span>
                    {showDiff ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                )}
              </div>

              {status?.files && status.files.length > 0 ? (
                <div className="rounded-xl border border-white/10 bg-black/40 divide-y divide-white/5 max-h-48 overflow-y-auto">
                  {status.files.map((file, i) => (
                    <div key={i} className="px-3.5 py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate max-w-md">
                        <FileCode size={14} className="text-stone-500 shrink-0" />
                        <span className="text-stone-300 font-mono truncate">{file.path}</span>
                      </div>
                      {getStatusBadge(file.status)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-black/20 border border-white/5 text-center text-xs text-stone-400">
                  <CheckCircle2 size={24} className="text-emerald-400 mx-auto mb-1.5" />
                  <p>Working directory is completely clean. No pending local changes.</p>
                </div>
              )}
            </div>

            {/* Git Diff Viewer */}
            {showDiff && (
              <div className="rounded-xl border border-white/10 bg-black/70 p-4 space-y-2">
                <span className="text-xs font-mono text-[#C59B27] block">Live Working Diff (HEAD):</span>
                <pre className="text-[11px] font-mono text-stone-300 overflow-x-auto max-h-60 p-2 bg-black/50 rounded-lg whitespace-pre-wrap leading-relaxed">
                  {diff}
                </pre>
              </div>
            )}
          </div>

          {/* Commit & Push Form Box */}
          <div className="p-6 rounded-2xl bg-[#09170f] border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <GitCommit size={18} className="text-[#4E9200]" />
              <h2 className="text-sm font-semibold text-white">Commit &amp; Push to GitHub</h2>
            </div>

            <form onSubmit={handlePush} className="space-y-4">
              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1.5">
                  Commit Message
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Update Ajwa pricing and upload new Eid harvest images"
                  value={commitMessage}
                  onChange={e => setCommitMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-stone-500 text-xs focus:outline-none focus:ring-2 focus:ring-[#4E9200]"
                />
              </div>

              {/* Preset Commit Message Chips */}
              <div>
                <span className="block text-stone-400 text-[11px] mb-1.5">Quick message templates:</span>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCommitMessage(preset)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-[11px] border border-white/5 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={pushing || (status?.files?.length === 0)}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4E9200] to-[#3E7500] hover:from-[#5aa800] hover:to-[#468400] text-white font-semibold text-xs shadow-lg shadow-[#4E9200]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {pushing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Pushing code to GitHub `main`...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={16} />
                      <span>Direct Commit &amp; Push to GitHub</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Terminal Output Console */}
            {consoleOutput && (
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1.5">
                  <Terminal size={13} />
                  <span>Execution Output</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black border border-white/10 text-[11px] font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                  {consoleOutput}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Commit History Timeline */}
        <div className="p-6 rounded-2xl bg-[#09170f] border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Clock size={18} className="text-[#C59B27]" />
            <h2 className="text-sm font-semibold text-white">Recent Commit Log</h2>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {history.length === 0 ? (
              <p className="text-xs text-stone-500 text-center py-6">No commit history available.</p>
            ) : (
              history.map((commit, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#C59B27] bg-white/5 px-1.5 py-0.5 rounded">
                      {commit.hash}
                    </span>
                    <span className="text-[10px] text-stone-500">{commit.date}</span>
                  </div>
                  <p className="text-xs text-stone-200 font-medium">{commit.message}</p>
                  <span className="text-[10px] text-stone-400 block">by {commit.author}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
