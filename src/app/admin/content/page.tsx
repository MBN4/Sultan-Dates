'use client';

import { useEffect, useState } from 'react';
import {
  FileText,
  Save,
  Plus,
  Trash2,
  Sparkles,
  HelpCircle,
  Award,
  Crown,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminContentPage() {
  const [content, setContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'announcement' | 'hero' | 'guide' | 'freshness' | 'story' | 'faqs'>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content');
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch {
      showToast('Failed to load content', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        showToast('Site content successfully updated and saved!');
      } else {
        showToast('Failed to save site content', 'error');
      }
    } catch {
      showToast('Network error saving content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="flex items-center justify-center p-20 text-stone-400">
        <span className="animate-spin inline-block w-6 h-6 border-2 border-[#4E9200] border-t-transparent rounded-full mr-3" />
        <span>Loading site content &amp; copy...</span>
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
            <span>Website Copy, Story &amp; FAQs</span>
            <Sparkles size={16} className="text-[#C59B27]" />
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Real-time live editor for marketing banners, hero text, connoisseur guide, and customer FAQs.
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
          <span>Save All Changes</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-white/10 pb-3">
        {[
          { id: 'hero', label: 'Hero Section', icon: Crown },
          { id: 'announcement', label: 'Announcement Bar', icon: Sparkles },
          { id: 'guide', label: "Connoisseur's Guide", icon: Award },
          { id: 'freshness', label: 'Freshness Promise', icon: Award },
          { id: 'story', label: 'Story & Heritage', icon: BookOpen },
          { id: 'faqs', label: 'FAQ Accordions', icon: HelpCircle },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#4E9200] text-white shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-[#09170f] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
        {/* HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-white">Homepage Hero Banner</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1.5">Top Badge Text</label>
                <input
                  type="text"
                  value={content.hero?.badge || ''}
                  onChange={e => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1.5">Primary CTA Button Text</label>
                <input
                  type="text"
                  value={content.hero?.primaryCta?.text || ''}
                  onChange={e =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, primaryCta: { ...content.hero.primaryCta, text: e.target.value } },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1.5">Main Title Line 1</label>
                <input
                  type="text"
                  value={content.hero?.titleLine1 || ''}
                  onChange={e => setContent({ ...content, hero: { ...content.hero, titleLine1: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1.5">Main Title Line 2 (Highlighted)</label>
                <input
                  type="text"
                  value={content.hero?.titleLine2 || ''}
                  onChange={e => setContent({ ...content, hero: { ...content.hero, titleLine2: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-300 text-xs font-semibold mb-1.5">Hero Body Paragraph</label>
              <textarea
                rows={3}
                value={content.hero?.description || ''}
                onChange={e => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>

            {/* Stat Pills */}
            <div className="pt-4 border-t border-white/10">
              <span className="block text-stone-300 text-xs font-semibold mb-3">Hero Stat Pills</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(content.hero?.statPills || []).map((pill: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                    <input
                      type="text"
                      placeholder="Label"
                      value={pill.label}
                      onChange={e => {
                        const newPills = [...content.hero.statPills];
                        newPills[idx].label = e.target.value;
                        setContent({ ...content, hero: { ...content.hero, statPills: newPills } });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={pill.value}
                      onChange={e => {
                        const newPills = [...content.hero.statPills];
                        newPills[idx].value = e.target.value;
                        setContent({ ...content, hero: { ...content.hero, statPills: newPills } });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 text-[#C59B27] font-semibold text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENT BAR */}
        {activeTab === 'announcement' && (
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-white">Top Floating Announcement Bar</h2>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={content.announcement?.enabled}
                onChange={e =>
                  setContent({
                    ...content,
                    announcement: { ...content.announcement, enabled: e.target.checked },
                  })
                }
                className="rounded text-[#4E9200] focus:ring-[#4E9200]"
              />
              <span className="text-sm font-medium text-stone-200">Show Announcement Bar on Website</span>
            </label>

            <div>
              <label className="block text-stone-300 text-xs font-semibold mb-1.5">Announcement Message</label>
              <input
                type="text"
                value={content.announcement?.text || ''}
                onChange={e =>
                  setContent({
                    ...content,
                    announcement: { ...content.announcement, text: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>
          </div>
        )}

        {/* CONNOISSEUR'S GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Royal Date Varieties Guide</h2>
              <button
                onClick={() => {
                  const newVar = {
                    id: `var-${Date.now().toString().slice(-4)}`,
                    name: 'New Royal Variety',
                    arabicName: 'تمر ملكي',
                    flavorProfile: 'Honey, caramel, rich',
                    texture: 'Soft, chewy',
                    bestFor: 'Daily wellness & gifting',
                    sweetness: 4,
                    softness: 4,
                    image: '/assets/images/placeholder.svg',
                  };
                  setContent({
                    ...content,
                    connoisseurGuide: {
                      ...content.connoisseurGuide,
                      varieties: [...(content.connoisseurGuide?.varieties || []), newVar],
                    },
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4E9200]/20 text-[#4E9200] text-xs font-semibold border border-[#4E9200]/30"
              >
                <Plus size={14} /> Add Variety Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1">Section Title</label>
                <input
                  type="text"
                  value={content.connoisseurGuide?.title || ''}
                  onChange={e =>
                    setContent({
                      ...content,
                      connoisseurGuide: { ...content.connoisseurGuide, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1">Section Subtitle</label>
                <input
                  type="text"
                  value={content.connoisseurGuide?.subtitle || ''}
                  onChange={e =>
                    setContent({
                      ...content,
                      connoisseurGuide: { ...content.connoisseurGuide, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              {(content.connoisseurGuide?.varieties || []).map((v: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-xs">{v.name} ({v.arabicName})</span>
                    <button
                      onClick={() => {
                        const newV = [...content.connoisseurGuide.varieties];
                        newV.splice(idx, 1);
                        setContent({
                          ...content,
                          connoisseurGuide: { ...content.connoisseurGuide, varieties: newV },
                        });
                      }}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-400 mb-1">Name (English)</label>
                      <input
                        type="text"
                        value={v.name}
                        onChange={e => {
                          const newV = [...content.connoisseurGuide.varieties];
                          newV[idx].name = e.target.value;
                          setContent({ ...content, connoisseurGuide: { ...content.connoisseurGuide, varieties: newV } });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Arabic Name</label>
                      <input
                        type="text"
                        value={v.arabicName}
                        onChange={e => {
                          const newV = [...content.connoisseurGuide.varieties];
                          newV[idx].arabicName = e.target.value;
                          setContent({ ...content, connoisseurGuide: { ...content.connoisseurGuide, varieties: newV } });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 text-[#C59B27]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-400 mb-1">Flavor Notes</label>
                      <input
                        type="text"
                        value={v.flavorProfile}
                        onChange={e => {
                          const newV = [...content.connoisseurGuide.varieties];
                          newV[idx].flavorProfile = e.target.value;
                          setContent({ ...content, connoisseurGuide: { ...content.connoisseurGuide, varieties: newV } });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Texture</label>
                      <input
                        type="text"
                        value={v.texture}
                        onChange={e => {
                          const newV = [...content.connoisseurGuide.varieties];
                          newV[idx].texture = e.target.value;
                          setContent({ ...content, connoisseurGuide: { ...content.connoisseurGuide, varieties: newV } });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FRESHNESS PROMISE */}
        {activeTab === 'freshness' && (
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-white">4-Step Freshness Promise</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={content.freshnessPromise?.title || ''}
                  onChange={e =>
                    setContent({
                      ...content,
                      freshnessPromise: { ...content.freshnessPromise, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1">Subtitle</label>
                <input
                  type="text"
                  value={content.freshnessPromise?.subtitle || ''}
                  onChange={e =>
                    setContent({
                      ...content,
                      freshnessPromise: { ...content.freshnessPromise, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              {(content.freshnessPromise?.steps || []).map((step: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#4E9200]/20 text-[#4E9200] font-bold text-xs flex items-center justify-center">
                      {step.number}
                    </span>
                    <input
                      type="text"
                      value={step.title}
                      onChange={e => {
                        const newSteps = [...content.freshnessPromise.steps];
                        newSteps[idx].title = e.target.value;
                        setContent({ ...content, freshnessPromise: { ...content.freshnessPromise, steps: newSteps } });
                      }}
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-white/5 text-white font-semibold text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={step.description}
                    onChange={e => {
                      const newSteps = [...content.freshnessPromise.steps];
                      newSteps[idx].description = e.target.value;
                      setContent({ ...content, freshnessPromise: { ...content.freshnessPromise, steps: newSteps } });
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 text-stone-300 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STORY & HERITAGE */}
        {activeTab === 'story' && (
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-white">Brand Story &amp; Sacred Palm Heritage</h2>

            <div>
              <label className="block text-stone-300 text-xs font-semibold mb-1.5">Story Headline</label>
              <input
                type="text"
                value={content.story?.title || ''}
                onChange={e => setContent({ ...content, story: { ...content.story, title: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-stone-300 text-xs font-semibold mb-1.5">First Paragraph</label>
              <textarea
                rows={3}
                value={content.story?.paragraph1 || ''}
                onChange={e => setContent({ ...content, story: { ...content.story, paragraph1: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-stone-300 text-xs font-semibold mb-1.5">Second Paragraph</label>
              <textarea
                rows={3}
                value={content.story?.paragraph2 || ''}
                onChange={e => setContent({ ...content, story: { ...content.story, paragraph2: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>
          </div>
        )}

        {/* FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Common Questions &amp; Interactive FAQ Accordions</h2>
              <button
                onClick={() => {
                  const newFaq = {
                    id: `faq-${Date.now().toString().slice(-4)}`,
                    question: 'New Question?',
                    answer: 'Answer to this question...',
                    category: 'General',
                  };
                  setContent({ ...content, faqs: [...(content.faqs || []), newFaq] });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4E9200]/20 text-[#4E9200] text-xs font-semibold border border-[#4E9200]/30"
              >
                <Plus size={14} /> Add FAQ Item
              </button>
            </div>

            <div className="space-y-4">
              {(content.faqs || []).map((faq: any, idx: number) => (
                <div key={faq.id || idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#C59B27]">FAQ #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const newFaqs = [...content.faqs];
                        newFaqs.splice(idx, 1);
                        setContent({ ...content, faqs: newFaqs });
                      }}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-stone-400 text-xs mb-1">Question</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={e => {
                        const newFaqs = [...content.faqs];
                        newFaqs[idx].question = e.target.value;
                        setContent({ ...content, faqs: newFaqs });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 text-white font-semibold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 text-xs mb-1">Answer</label>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={e => {
                        const newFaqs = [...content.faqs];
                        newFaqs[idx].answer = e.target.value;
                        setContent({ ...content, faqs: newFaqs });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 text-stone-200 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
