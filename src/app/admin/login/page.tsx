'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch {
      setError('An error occurred during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-radial from-[#0e2719] via-[#07130c] to-[#040906] relative overflow-hidden">
      {/* Background ambient gold & green glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4E9200]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Crest */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#3E7500] via-[#4E9200] to-[#C59B27] text-white font-serif font-bold text-3xl shadow-2xl shadow-[#4E9200]/30 mb-4 border border-white/20">
            س
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-wide">
            Sultan Dates <span className="text-[#C59B27]">Control Hub</span>
          </h1>
          <p className="text-xs text-stone-400 mt-1 tracking-wider uppercase font-medium flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-[#C59B27]" /> Royal Administrative Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#0b1b12]/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl shadow-black/50">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Sign In to Dashboard</h2>
            <p className="text-xs text-stone-400 mt-0.5">Manage products, content, SEO, and sync directly with GitHub.</p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <span className="font-bold">Error:</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#4E9200] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#4E9200] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4E9200] to-[#3E7500] hover:from-[#5aa800] hover:to-[#468400] text-white font-medium text-sm shadow-lg shadow-[#4E9200]/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Control Hub</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Note */}
          <div className="mt-6 pt-5 border-t border-white/5 text-center text-[11px] text-stone-400 flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-[#C59B27]" />
            <span>Default access: <code className="text-stone-300 font-mono">admin</code> / <code className="text-stone-300 font-mono">sultan2026!</code></span>
          </div>
        </div>
      </div>
    </div>
  );
}
