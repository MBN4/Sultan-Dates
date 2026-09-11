'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FileText,
  Image as ImageIcon,
  Search,
  GitBranch,
  ExternalLink,
  LogOut,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface GitStatus {
  branch: string;
  isClean: boolean;
  files: Array<{ path: string; status: string }>;
  lastCommit?: { hash: string; message: string; date: string };
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gitStatus, setGitStatus] = useState<GitStatus | null>(null);
  const [loadingGit, setLoadingGit] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth');
      if (!res.ok && !isLoginPage) {
        router.push('/admin/login');
      } else {
        setAuthChecked(true);
      }
    } catch {
      if (!isLoginPage) router.push('/admin/login');
    }
  };

  const fetchGitStatus = async () => {
    if (isLoginPage) return;
    try {
      setLoadingGit(true);
      const res = await fetch('/api/admin/git');
      if (res.ok) {
        const data = await res.json();
        setGitStatus(data.status);
      }
    } catch (e) {
      console.error('Git status error:', e);
    } finally {
      setLoadingGit(false);
    }
  };

  useEffect(() => {
    checkAuth();
    if (!isLoginPage) {
      fetchGitStatus();
      const interval = setInterval(fetchGitStatus, 30000);
      return () => clearInterval(interval);
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#07130c] font-sans">{children}</div>;
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products & Catalog', href: '/admin/products', icon: Package },
    { label: 'Site Content & FAQs', href: '/admin/content', icon: FileText },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { label: 'SEO & Metadata', href: '/admin/seo', icon: Search },
    { label: 'GitHub Sync Engine', href: '/admin/git', icon: GitBranch, badge: gitStatus?.files?.length ? `${gitStatus.files.length} changes` : undefined },
  ];

  return (
    <div className="min-h-screen bg-[#07130c] text-stone-100 flex flex-col md:flex-row antialiased selection:bg-[#4E9200] selection:text-white font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-[#0a1a11] border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3E7500] to-[#4E9200] flex items-center justify-center text-white font-serif font-bold shadow-md shadow-[#4E9200]/20">
            S
          </div>
          <div>
            <span className="font-serif font-bold text-sm text-white tracking-wide">SULTAN DATES</span>
            <span className="block text-[10px] text-[#C59B27] font-medium tracking-widest uppercase">Admin Panel</span>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-stone-300 hover:text-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#09170f] border-r border-white/10 flex flex-col z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4E9200] to-[#3E7500] flex items-center justify-center text-white font-serif font-bold text-lg shadow-lg shadow-[#4E9200]/25 group-hover:scale-105 transition-transform">
              س
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-base text-white tracking-wide">SULTAN DATES</span>
                <Sparkles size={12} className="text-[#C59B27]" />
              </div>
              <span className="text-[11px] text-[#C59B27] tracking-[0.2em] uppercase font-semibold">
                Control Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Git Status Pill */}
        <div className="px-4 py-3 border-b border-white/5 bg-black/20">
          <Link
            href="/admin/git"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all text-xs group"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <GitBranch size={15} className="text-[#4E9200]" />
                <span
                  className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                    gitStatus?.isClean ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                  }`}
                />
              </div>
              <div>
                <span className="text-stone-300 font-medium block">
                  Branch: <span className="text-white font-semibold">{gitStatus?.branch || 'main'}</span>
                </span>
                <span className="text-[10px] text-stone-400">
                  {gitStatus?.isClean ? 'Repository in sync' : `${gitStatus?.files?.length || 0} uncommitted changes`}
                </span>
              </div>
            </div>
            <ChevronRight size={14} className="text-stone-500 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#4E9200] to-[#3E7500] text-white shadow-lg shadow-[#4E9200]/20 font-semibold'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-stone-400'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#08150d]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-medium border border-white/5 transition-all"
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={14} className="text-[#4E9200]" />
              <span>Live Storefront</span>
            </div>
            <span className="text-[10px] text-[#C59B27] uppercase tracking-wider font-semibold">Preview</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs font-medium transition-all"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#07130c] overflow-y-auto">
        {/* Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#09170f]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-stone-300 capitalize">
              {pathname === '/admin' ? 'Dashboard Overview' : pathname.replace('/admin/', '').replace('-', ' ') + ' Management'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchGitStatus}
              title="Refresh Git status"
              disabled={loadingGit}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-400 hover:text-white transition-all disabled:opacity-50"
            >
              <RefreshCw size={14} className={loadingGit ? 'animate-spin text-[#4E9200]' : ''} />
            </button>

            {gitStatus?.isClean ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <CheckCircle2 size={13} />
                <span>GitHub Synced</span>
              </div>
            ) : (
              <Link
                href="/admin/git"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 text-xs font-medium transition-all"
              >
                <AlertCircle size={13} />
                <span>{gitStatus?.files?.length || 0} Pending Push</span>
              </Link>
            )}

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3E7500] to-[#C59B27] flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#4E9200]/30">
                SD
              </div>
              <div className="text-left">
                <span className="text-xs font-medium text-white block leading-tight">Master Admin</span>
                <span className="text-[10px] text-[#C59B27] block leading-tight">Sultan Royal Reserve</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page View Container */}
        <div className="p-5 md:p-8 lg:p-10 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
