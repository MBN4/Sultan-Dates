'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Save,
  Globe,
  Share2,
  Phone,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Tag,
  Plus,
  X
} from 'lucide-react';

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<any>(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchSeo = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/seo');
      if (res.ok) {
        const data = await res.json();
        setSeo(data);
      }
    } catch {
      showToast('Failed to load SEO configuration', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seo),
      });

      if (res.ok) {
        showToast('SEO settings and metadata successfully updated!');
      } else {
        showToast('Failed to save SEO settings', 'error');
      }
    } catch {
      showToast('Error saving SEO data', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddKeyword = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      const current = seo.general?.keywords || [];
      if (!current.includes(keywordInput.trim())) {
        setSeo({
          ...seo,
          general: { ...seo.general, keywords: [...current, keywordInput.trim()] },
        });
      }
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    const current = seo.general?.keywords || [];
    setSeo({
      ...seo,
      general: { ...seo.general, keywords: current.filter((k: string) => k !== kw) },
    });
  };

  if (loading || !seo) {
    return (
      <div className="flex items-center justify-center p-20 text-stone-400">
        <span className="animate-spin inline-block w-6 h-6 border-2 border-[#4E9200] border-t-transparent rounded-full mr-3" />
        <span>Loading SEO &amp; Meta configuration...</span>
      </div>
    );
  }

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
            <span>Search Engine Optimization (SEO) &amp; Meta</span>
            <Search size={18} className="text-[#C59B27]" />
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Optimize Google search indexing, OpenGraph social media sharing cards, and contact information.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4E9200] to-[#3E7500] hover:from-[#5aa800] hover:to-[#468400] text-white text-xs font-semibold shadow-lg shadow-[#4E9200]/25 transition-all disabled:opacity-50"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={15} />
          )}
          <span>Save SEO Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global SEO Box */}
        <div className="p-6 rounded-2xl bg-[#09170f] border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Globe size={18} className="text-[#4E9200]" />
            <h2 className="text-sm font-semibold text-white">Global Meta Configuration</h2>
          </div>

          <div>
            <label className="block text-stone-300 text-xs font-semibold mb-1">Global Site Title</label>
            <input
              type="text"
              value={seo.general?.siteTitle || ''}
              onChange={e =>
                setSeo({ ...seo, general: { ...seo.general, siteTitle: e.target.value } })
              }
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-stone-300 text-xs font-semibold mb-1">Meta Description</label>
            <textarea
              rows={3}
              value={seo.general?.description || ''}
              onChange={e =>
                setSeo({ ...seo, general: { ...seo.general, description: e.target.value } })
              }
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-300 text-xs font-semibold mb-1">Site URL</label>
              <input
                type="text"
                value={seo.general?.siteUrl || ''}
                onChange={e =>
                  setSeo({ ...seo, general: { ...seo.general, siteUrl: e.target.value } })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-stone-300 text-xs font-semibold mb-1">OpenGraph Banner Image</label>
              <input
                type="text"
                value={seo.general?.openGraphImage || ''}
                onChange={e =>
                  setSeo({ ...seo, general: { ...seo.general, openGraphImage: e.target.value } })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
              />
            </div>
          </div>

          {/* Keywords Tag Manager */}
          <div>
            <label className="block text-stone-300 text-xs font-semibold mb-1">
              Search Keywords &amp; Tags (Press Enter to add)
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10 min-h-[42px] mb-2">
              {(seo.general?.keywords || []).map((kw: string) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#4E9200]/20 text-[#4E9200] text-xs font-medium border border-[#4E9200]/30"
                >
                  <span>{kw}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(kw)}
                    className="text-[#4E9200] hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type keyword and press Enter..."
              value={keywordInput}
              onChange={e => setKeywordInput(e.target.value)}
              onKeyDown={handleAddKeyword}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
        </div>

        {/* Contact Details Box */}
        <div className="p-6 rounded-2xl bg-[#09170f] border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Phone size={18} className="text-[#C59B27]" />
            <h2 className="text-sm font-semibold text-white">Store &amp; Concierge Contact</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-300 text-xs font-semibold mb-1">Concierge Email</label>
              <input
                type="email"
                value={seo.contactInfo?.email || ''}
                onChange={e =>
                  setSeo({
                    ...seo,
                    contactInfo: { ...seo.contactInfo, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-stone-300 text-xs font-semibold mb-1">WhatsApp Hotline</label>
              <input
                type="text"
                value={seo.contactInfo?.whatsapp || ''}
                onChange={e =>
                  setSeo({
                    ...seo,
                    contactInfo: { ...seo.contactInfo, whatsapp: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-300 text-xs font-semibold mb-1">Store Physical Address</label>
            <input
              type="text"
              value={seo.contactInfo?.address || ''}
              onChange={e =>
                setSeo({
                  ...seo,
                  contactInfo: { ...seo.contactInfo, address: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-stone-300 text-xs font-semibold mb-1">Operating Hours</label>
            <input
              type="text"
              value={seo.contactInfo?.workingHours || ''}
              onChange={e =>
                setSeo({
                  ...seo,
                  contactInfo: { ...seo.contactInfo, workingHours: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
        </div>

        {/* Page-Specific Meta */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#09170f] border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Share2 size={18} className="text-[#4E9200]" />
            <h2 className="text-sm font-semibold text-white">Individual Page Title &amp; Descriptions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {['home', 'shop', 'about', 'contact'].map(pageKey => {
              const page = seo.pages?.[pageKey] || {};
              return (
                <div key={pageKey} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27] block">
                    /{pageKey === 'home' ? '' : pageKey} Page
                  </span>

                  <div>
                    <label className="block text-stone-400 text-[11px] mb-1">Browser Title</label>
                    <input
                      type="text"
                      value={page.title || ''}
                      onChange={e =>
                        setSeo({
                          ...seo,
                          pages: {
                            ...seo.pages,
                            [pageKey]: { ...page, title: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 text-[11px] mb-1">Meta Description</label>
                    <textarea
                      rows={2}
                      value={page.description || ''}
                      onChange={e =>
                        setSeo({
                          ...seo,
                          pages: {
                            ...seo.pages,
                            [pageKey]: { ...page, description: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 text-stone-300 text-xs"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
