'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Layers,
  CheckCircle,
  Image as ImageIcon,
  GitBranch,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  FileEdit,
  ExternalLink
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  inStockCount: number;
  categoriesCount: number;
  mediaCount: number;
  gitStatus: {
    branch: string;
    isClean: boolean;
    filesCount: number;
    lastCommit?: {
      hash: string;
      message: string;
      date: string;
    };
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [productsRes, mediaRes, gitRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/media'),
        fetch('/api/admin/git'),
      ]);

      const productsData = productsRes.ok ? await productsRes.json() : { products: [], categories: [] };
      const mediaData = mediaRes.ok ? await mediaRes.json() : { files: [] };
      const gitData = gitRes.ok ? await gitRes.json() : { status: { isClean: true, files: [], branch: 'main' } };

      const inStock = (productsData.products || []).filter((p: any) => p.inStock !== false).length;

      setStats({
        totalProducts: productsData.products?.length || 0,
        inStockCount: inStock,
        categoriesCount: productsData.categories?.length || 0,
        mediaCount: mediaData.files?.length || 0,
        gitStatus: {
          branch: gitData.status?.branch || 'main',
          isClean: gitData.status?.isClean ?? true,
          filesCount: gitData.status?.files?.length || 0,
          lastCommit: gitData.status?.lastCommit,
        },
      });
    } catch (e) {
      console.error('Error fetching dashboard stats:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0e2c19] via-[#091a10] to-[#07130c] border border-white/10 p-8 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-full bg-[#4E9200]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B27]/10 text-[#C59B27] text-xs font-semibold uppercase tracking-widest border border-[#C59B27]/20 mb-3">
              <Sparkles size={12} /> Royal Administration Center
            </div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
              Welcome to Sultan Dates Hub
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-xl">
              Control your luxury date catalog, edit website copy &amp; FAQs, manage media assets, and push updates directly to GitHub in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4E9200] to-[#3E7500] hover:from-[#5aa800] hover:to-[#468400] text-white text-sm font-medium shadow-lg shadow-[#4E9200]/25 transition-all"
            >
              <Plus size={16} />
              <span>Add Product</span>
            </Link>
            <Link
              href="/admin/git"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium border border-white/10 transition-all"
            >
              <GitBranch size={16} className="text-[#C59B27]" />
              <span>Git Sync</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="p-6 rounded-2xl bg-[#09170f] border border-white/10 relative overflow-hidden group hover:border-[#4E9200]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#4E9200]/15 border border-[#4E9200]/30 flex items-center justify-center text-[#4E9200]">
              <Package size={22} />
            </div>
            <Link href="/admin/products" className="text-stone-400 hover:text-white transition-colors">
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <span className="text-3xl font-serif font-bold text-white block">
            {loading ? '-' : stats?.totalProducts}
          </span>
          <div className="flex items-center justify-between text-xs text-stone-400 mt-2">
            <span>Total Catalog Products</span>
            <span className="text-[#4E9200] font-medium">{stats?.inStockCount} In Stock</span>
          </div>
        </div>

        {/* Categories */}
        <div className="p-6 rounded-2xl bg-[#09170f] border border-white/10 relative overflow-hidden group hover:border-[#C59B27]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#C59B27]/15 border border-[#C59B27]/30 flex items-center justify-center text-[#C59B27]">
              <Layers size={22} />
            </div>
            <Link href="/admin/products" className="text-stone-400 hover:text-white transition-colors">
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <span className="text-3xl font-serif font-bold text-white block">
            {loading ? '-' : stats?.categoriesCount}
          </span>
          <div className="flex items-center justify-between text-xs text-stone-400 mt-2">
            <span>Product Collections</span>
            <span className="text-stone-300">Ajwa, Medjool, etc.</span>
          </div>
        </div>

        {/* Media Assets */}
        <div className="p-6 rounded-2xl bg-[#09170f] border border-white/10 relative overflow-hidden group hover:border-[#4E9200]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#4E9200]/15 border border-[#4E9200]/30 flex items-center justify-center text-[#4E9200]">
              <ImageIcon size={22} />
            </div>
            <Link href="/admin/media" className="text-stone-400 hover:text-white transition-colors">
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <span className="text-3xl font-serif font-bold text-white block">
            {loading ? '-' : stats?.mediaCount}
          </span>
          <div className="flex items-center justify-between text-xs text-stone-400 mt-2">
            <span>Images in Library</span>
            <span className="text-stone-300">public/assets/</span>
          </div>
        </div>

        {/* Git Sync Status */}
        <div className={`p-6 rounded-2xl bg-[#09170f] border ${stats?.gitStatus?.isClean ? 'border-white/10' : 'border-amber-500/40'} relative overflow-hidden group transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${stats?.gitStatus?.isClean ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/15 text-amber-400 border-amber-500/30'} border flex items-center justify-center`}>
              <GitBranch size={22} />
            </div>
            <Link href="/admin/git" className="text-stone-400 hover:text-white transition-colors">
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <span className="text-2xl font-serif font-bold text-white block">
            {stats?.gitStatus?.isClean ? 'Fully Synced' : `${stats?.gitStatus?.filesCount} Changes`}
          </span>
          <div className="flex items-center justify-between text-xs text-stone-400 mt-2">
            <span>GitHub ({stats?.gitStatus?.branch || 'main'})</span>
            <span className={stats?.gitStatus?.isClean ? 'text-emerald-400' : 'text-amber-400 font-semibold'}>
              {stats?.gitStatus?.isClean ? 'Up to date' : 'Push ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Quick Grid & Git Status Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <span>Quick Management Modules</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/products"
              className="p-5 rounded-2xl bg-[#09170f] border border-white/10 hover:border-[#4E9200]/50 hover:bg-[#0c1f14] transition-all group flex flex-col justify-between h-40"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#4E9200]/15 flex items-center justify-center text-[#4E9200]">
                  <Package size={20} />
                </div>
                <ArrowRight size={16} className="text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#4E9200] transition-colors">
                  Product Catalog &amp; Pricing
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Update date weights, prices (Rs), descriptions, stock status, and add new varieties.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/content"
              className="p-5 rounded-2xl bg-[#09170f] border border-white/10 hover:border-[#C59B27]/50 hover:bg-[#141d13] transition-all group flex flex-col justify-between h-40"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#C59B27]/15 flex items-center justify-center text-[#C59B27]">
                  <FileEdit size={20} />
                </div>
                <ArrowRight size={16} className="text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#C59B27] transition-colors">
                  Site Copy, Story &amp; FAQs
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Customize hero titles, connoisseur guide, 4-step freshness promise, and interactive FAQs.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/media"
              className="p-5 rounded-2xl bg-[#09170f] border border-white/10 hover:border-[#4E9200]/50 hover:bg-[#0c1f14] transition-all group flex flex-col justify-between h-40"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#4E9200]/15 flex items-center justify-center text-[#4E9200]">
                  <ImageIcon size={20} />
                </div>
                <ArrowRight size={16} className="text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#4E9200] transition-colors">
                  Media &amp; Image Assets
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Upload new date photography, copy paths, and replace placeholders in one click.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/seo"
              className="p-5 rounded-2xl bg-[#09170f] border border-white/10 hover:border-[#C59B27]/50 hover:bg-[#141d13] transition-all group flex flex-col justify-between h-40"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#C59B27]/15 flex items-center justify-center text-[#C59B27]">
                  <TrendingUp size={20} />
                </div>
                <ArrowRight size={16} className="text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#C59B27] transition-colors">
                  SEO &amp; Social Meta Tags
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Configure Google meta descriptions, OpenGraph social banners, keywords, and contact details.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Git Synchronizer Card */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-white flex items-center justify-between">
            <span>GitHub Engine</span>
            <Link href="/admin/git" className="text-xs text-[#C59B27] hover:underline flex items-center gap-1">
              Sync Center <ArrowRight size={12} />
            </Link>
          </h2>

          <div className="p-6 rounded-2xl bg-[#09170f] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white">
                  <GitBranch size={16} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">MBN4/Sultan-Dates</span>
                  <span className="text-[10px] text-stone-400 block font-mono">branch: {stats?.gitStatus?.branch || 'main'}</span>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                  stats?.gitStatus?.isClean
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {stats?.gitStatus?.isClean ? 'Clean & Synced' : `${stats?.gitStatus?.filesCount} Modified`}
              </span>
            </div>

            {stats?.gitStatus?.lastCommit && (
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] text-[#C59B27] font-semibold uppercase tracking-wider block">Last Commit</span>
                <p className="text-xs text-stone-200 font-mono truncate">{stats.gitStatus.lastCommit.message}</p>
                <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                  <span>Hash: <code className="text-white">{stats.gitStatus.lastCommit.hash}</code></span>
                  <span>{stats.gitStatus.lastCommit.date}</span>
                </div>
              </div>
            )}

            <Link
              href="/admin/git"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4E9200] to-[#3E7500] hover:from-[#5aa800] hover:to-[#468400] text-white text-xs font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#4E9200]/20 transition-all text-center block"
            >
              <span>Manage &amp; Push to GitHub</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
