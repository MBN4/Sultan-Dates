'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShieldCheck, Truck, Recycle, Plus, ChevronDown, Sparkles, TreePalm, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { 
  heroSlides, 
  productCategories, 
  storyData, 
  products, 
  benefits, 
  dateVarietiesGuide, 
  qualityJourney, 
  superfoodMetrics,
  marqueeTopItems,
  marqueeBottomItems
} from './data';

const isPriced = (price: string) => price.startsWith('Rs');

export default function Home() {
  const { addToCart } = useCart();
  const [activeSlide, setActiveSlide] = useState(0);
  const [openCategories, setOpenCategories] = useState<number[]>([]);
  const [categoryImageTick, setCategoryImageTick] = useState(0);
  const [selectedVariety, setSelectedVariety] = useState(0);

  const toggleCategory = (id: number) =>
    setOpenCategories((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCategoryImageTick((prev) => prev + 1);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];
  const activeVariety = dateVarietiesGuide[selectedVariety] || dateVarietiesGuide[0];

  return (
    <div className="flex flex-col text-stone-900 selection:bg-[#4E9200] selection:text-white">
      <section className="relative min-h-screen flex flex-col pt-24 px-6 bg-gradient-to-br from-[#EDF3E8] via-[#E2ECDA] to-[#4E9200]/10 overflow-hidden">
        <main className="grid grid-cols-12 gap-6 items-center max-w-7xl mx-auto w-full pt-8 pb-12">
          <div className="col-span-1 hidden lg:flex flex-col justify-between gap-12 py-4 border-l border-stone-900/5 pl-4 self-stretch">
            <div className="vertical-text text-[10px] tracking-[0.6em] opacity-40 font-bold uppercase whitespace-nowrap text-stone-600">
              AL-MADINAH • ROYAL HARVEST
            </div>
            <div className="flex flex-col space-y-4 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#4E9200]" />
              <div className="w-2 h-2 rounded-full bg-[#C59B27]" />
              <div className="w-2 h-2 rounded-full bg-stone-900/10" />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1.5 bg-[#4E9200]/10 text-[#4E9200] border border-[#4E9200]/20 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase w-fit"
            >
              100% Pure • Sunnah Heritage • Grade A+
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-serif leading-[1] tracking-tight text-stone-900"
            >
              <span className="italic font-normal">Blessed Harvest</span> <br />
              <span className="font-extrabold not-italic text-[#0D2818]">Royal Dates</span> <br />
              <span className="text-3xl md:text-5xl font-serif text-[#C59B27] italic">Al-Madinah &amp; Beyond</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-stone-600 max-w-md leading-relaxed font-sans"
            >
              Hand-selected sacred Ajwa Al-Madinah, Royal King Medjool, amber-caramel Sukkari, and luxury chocolate-stuffed dates delivered fresh to your door.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link 
                href="/shop" 
                className="px-8 py-4 bg-[#0D2818] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#4E9200] hover:scale-105 transition-all shadow-xl shadow-[#4E9200]/20 flex items-center justify-center border border-[#C59B27]/40"
              >
                Explore Dates Collection
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-4 bg-white/80 border border-stone-900/10 text-stone-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-sm"
              >
                Our Heritage
              </Link>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex items-center justify-center relative pb-12">
            <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-lime/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-sm flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full aspect-square"
              >
                <AnimatePresence>
                  <motion.img loading="lazy" decoding="async"
                    key={activeSlide}
                    src={slide.image}
                    alt={slide.name}
                    initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.08, rotate: 6 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                  />
                </AnimatePresence>

                <div className="absolute top-full inset-x-0 mt-6 flex flex-col items-center gap-6">
                  <motion.div
                    key={`meta-${activeSlide}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between w-full gap-4"
                  >
                    <div>
                      <h3 className="text-2xl font-serif font-bold italic text-stone-900">{slide.name}</h3>
                      <span className="text-lg font-bold text-lime">{slide.price}</span>
                    </div>
                    <button
                      onClick={() => addToCart(slide)}
                      className="w-12 h-12 shrink-0 rounded-full bg-stone-900 text-white flex items-center justify-center cursor-pointer hover:bg-lime transition-all duration-300 shadow-lg shadow-stone-900/10"
                      aria-label={`Add ${slide.name} to cart`}
                    >
                      <Plus size={20} />
                    </button>
                  </motion.div>

                  <div className="flex gap-2.5">
                    {heroSlides.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveSlide(i)}
                        aria-label={`Show ${s.name}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === activeSlide ? 'w-8 bg-lime' : 'w-1.5 bg-stone-900/20 hover:bg-stone-900/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </section>

      {/* Dual Opposing Direction Luxury Marquees */}
      <section className="py-8 md:py-12 overflow-hidden border-y border-[#C59B27]/25 bg-gradient-to-b from-[#0D2818] via-[#091b10] to-[#0D2818] text-white relative shadow-2xl">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4E9200]/10 via-transparent to-transparent pointer-events-none" />

        {/* Top Marquee Ribbon (Moving Left) */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mb-4 md:mb-5">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            className="flex gap-8 items-center whitespace-nowrap w-max"
          >
            {[...marqueeTopItems, ...marqueeTopItems, ...marqueeTopItems, ...marqueeTopItems].map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-4 group">
                <span className="text-[#C59B27] font-serif text-sm">✦</span>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 group-hover:border-[#C59B27]/40 group-hover:bg-white/[0.08] transition-all">
                  <span className="font-serif text-sm md:text-base font-bold tracking-wide text-stone-100">
                    {item.text}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C59B27] bg-[#C59B27]/15 px-2.5 py-0.5 rounded-full border border-[#C59B27]/25">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Marquee Ribbon (Moving in OPPOSITE Direction - Moving Right) */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 items-center whitespace-nowrap w-max"
          >
            {[...marqueeBottomItems, ...marqueeBottomItems, ...marqueeBottomItems, ...marqueeBottomItems].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-white/[0.07] to-white/[0.03] border border-white/10 hover:border-[#4E9200]/50 hover:bg-[#4E9200]/10 transition-all shadow-sm group"
              >
                <div className="w-2 h-2 rounded-full bg-[#4E9200] shadow-[0_0_8px_#4E9200]" />
                <span className="font-serif font-bold text-sm text-stone-100 group-hover:text-[#4E9200] transition-colors">
                  {item.name}
                </span>
                <span className="text-xs font-bold text-[#C59B27] font-mono">
                  {item.price}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
                  {item.origin}
                </span>
                <span className="text-xs font-serif text-[#C59B27] font-bold">
                  {item.arabic}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-lime mb-4 block">CATEGORIES</span>
            <h2 className="text-6xl md:text-8xl font-serif font-bold italic text-stone-900 leading-[0.9]">Seasonal <br /> <span className="not-italic">Purity.</span></h2>
          </div>
          <p className="text-stone-400 max-w-xs text-sm leading-relaxed mb-4 lg:mb-10 uppercase tracking-widest font-bold">
            CURATED ASSORTMENTS THAT FOLLOW THE DRUMBEAT OF NATURE.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 items-start">
          {productCategories.map((category, i) => {
            const isOpen = openCategories.includes(category.id);
            const gridColClass = i === 3 ? 'col-span-1 lg:col-span-2 lg:col-start-2' : 'col-span-1 lg:col-span-2';

            const ticksPerImage = 16;
            const activeItemIndex = Math.floor(categoryImageTick / ticksPerImage) % category.items.length;
            const activeItem = category.items[activeItemIndex];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`group glass-card p-6 flex flex-col ${gridColClass}`}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-[#DEE8D4]/50 mb-8 relative">
                  <AnimatePresence mode="wait">
                    <motion.img loading="lazy" decoding="async"
                      key={activeItem.image}
                      src={activeItem.image}
                      alt={activeItem.name}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.06 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </AnimatePresence>
                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                    {category.items.map((item, idx) => (
                      <span
                        key={item.name}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          idx === activeItemIndex ? 'w-5 bg-lime' : 'w-1.5 bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="text-3xl font-serif font-bold italic text-stone-900">{category.title}</h3>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={isOpen}
                    className="shrink-0 mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/10 text-lime border border-lime/20 text-[10px] font-bold uppercase tracking-widest hover:bg-lime hover:text-white transition-all cursor-pointer"
                  >
                    {isOpen ? 'Hide' : `View ${category.items.length} Items`}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed font-medium">{category.description}</p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="items"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-6 pt-6 border-t border-stone-900/10 flex flex-col gap-3">
                        {category.items.map((item, idx) => (
                          <li
                            key={item.name}
                            className={`flex items-center gap-4 p-2 rounded-2xl transition-colors duration-500 ${
                              idx === activeItemIndex ? 'bg-lime/10' : 'hover:bg-stone-900/[0.03]'
                            }`}
                          >
                            <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-stone-900/5 bg-[#DEE8D4]/50">
                              <img loading="lazy" decoding="async" src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="flex-1 text-sm font-bold text-stone-900 leading-tight">{item.name}</span>
                            <span className="text-sm font-bold text-lime whitespace-nowrap">{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. The Royal Date Connoisseur's Guide */}
      <section className="bg-gradient-to-b from-[#EDF3E8] via-[#E4EEDC] to-[#EDF3E8] border-y border-stone-900/5 section-padding overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-lime/10 text-lime rounded-full text-[10px] font-bold tracking-[0.3em] uppercase mb-4 border border-lime/20">
                <TreePalm size={14} /> Sacred Harvest Varieties
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-stone-900 italic tracking-tight">
                The Royal <span className="not-italic text-[#0D2818]">Varieties Guide.</span>
              </h2>
            </div>
            <p className="text-stone-600 text-sm md:text-base max-w-md leading-relaxed font-medium">
              Explore the distinct terroirs, caramel sweetness, texture profiles, and health traditions of Arabia&apos;s most treasured royal dates.
            </p>
          </div>

          {/* Variety Selector Tabs */}
          <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-stone-900/10">
            {dateVarietiesGuide.map((variety, idx) => (
              <button
                key={variety.id}
                onClick={() => setSelectedVariety(idx)}
                className={`px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  selectedVariety === idx
                    ? 'bg-[#0D2818] text-white shadow-lg shadow-stone-900/20 scale-[1.02] border border-[#C59B27]/40'
                    : 'bg-white/70 text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-900/5'
                }`}
              >
                <span>{variety.name}</span>
                <span className={`text-[10px] ${selectedVariety === idx ? 'text-[#C59B27]' : 'text-stone-400'} font-serif font-normal`}>
                  {variety.arabicName}
                </span>
              </button>
            ))}
          </div>

          {/* Active Variety Feature Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVariety.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 md:p-12 border border-white/70 shadow-xl shadow-stone-900/5 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
            >
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#EDF3E8] border border-stone-900/5 shadow-inner">
                  <img
                    src={activeVariety.image}
                    alt={activeVariety.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#0D2818]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-[#C59B27]" /> {activeVariety.caliber}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-lime text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-lime/25">
                    {activeVariety.price}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#C59B27] mb-2">
                    <span>{activeVariety.arabicName}</span> • <span>{activeVariety.origin}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 italic mb-2">
                    {activeVariety.name}
                  </h3>
                  <p className="text-sm text-stone-500 font-medium italic mb-4">
                    &ldquo;{activeVariety.tagline}&rdquo;
                  </p>
                  <p className="text-stone-700 text-sm md:text-base leading-relaxed mb-4 font-normal">
                    {activeVariety.highlight}
                  </p>
                </div>

                {/* Profile Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-stone-900/10">
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      <span>Sweetness Profile</span>
                      <span className="text-lime font-bold">{activeVariety.sweetness} / 5</span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div
                          key={s}
                          className={`h-2 flex-1 rounded-full ${
                            s <= activeVariety.sweetness ? 'bg-lime' : 'bg-stone-900/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      <span>Softness &amp; Texture</span>
                      <span className="text-lime font-bold">{activeVariety.softness} / 5</span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div
                          key={s}
                          className={`h-2 flex-1 rounded-full ${
                            s <= activeVariety.softness ? 'bg-[#C59B27]' : 'bg-stone-900/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tasting Notes & Best For */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="bg-white/60 rounded-2xl p-4 border border-stone-900/5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-2">Flavor Palette</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeVariety.flavorNotes.map((note) => (
                        <span key={note} className="px-2.5 py-1 bg-stone-900/5 text-stone-800 rounded-md text-[11px] font-semibold">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/60 rounded-2xl p-4 border border-stone-900/5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-2">Ideal Ritual &amp; Pairing</span>
                    <span className="text-xs text-stone-700 font-medium leading-relaxed block">
                      {activeVariety.bestFor}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-3">
                  <Link
                    href="/shop"
                    className="px-8 py-4 bg-[#0D2818] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-lime hover:scale-105 transition-all duration-300 shadow-xl shadow-stone-900/10 flex items-center gap-2 border border-[#C59B27]/30"
                  >
                    <span>Order {activeVariety.name.split(' ')[1] || 'Harvest'}</span>
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href="https://wa.me/923283283282"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white border border-stone-900/10 text-stone-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all shadow-sm"
                  >
                    WhatsApp Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-12 flex flex-col items-center text-center group hover:border-lime/30 transition-colors"
            >
              <div className="w-20 h-20 bg-lime/10 rounded-3xl mb-10 flex items-center justify-center text-lime group-hover:scale-110 transition-transform duration-500">
                {i === 0 && <ShieldCheck size={40} />}
                {i === 1 && <Recycle size={40} />}
                {i === 2 && <Truck size={40} />}
              </div>
              <h3 className="text-2xl font-serif font-bold italic mb-6 text-stone-900">{benefit.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed max-w-[240px]">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-lime mb-6 block">CURATED PANTRY</span>
            <h2 className="text-6xl md:text-8xl font-serif font-bold text-stone-900 italic">Artisan <span className="not-italic">Selection.</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 glass-card hover:bg-stone-900/[0.04] transition-all duration-500"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-8 border border-stone-900/5">
                  <img loading="lazy" decoding="async" 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-lime text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-lime/20">
                    {product.tag}
                  </span>
                </div>
                <h4 className="text-xl font-serif font-bold mb-2 italic text-stone-900">{product.name}</h4>
                <div className="flex justify-between items-center">
                  {isPriced(product.price) ? (
                    <>
                      <span className="text-lime font-bold text-lg">{product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-lime transition-all"
                      >
                        Add to Box +
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-lime">Call for Query</span>
                      <Link
                        href="/contact"
                        className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-lime transition-all"
                      >
                        Call to Order
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-lime/10 text-stone-900 border-y border-stone-900/5 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-lime/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#4E9200] mb-4 block">ROYAL ASSISTANCE</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 text-stone-900">
              Connect With <br /> <span className="italic text-[#4E9200]">Sultan Dates.</span>
            </h2>
            <p className="text-stone-500 max-w-md mx-auto text-sm leading-relaxed">
              Have questions about date varieties, corporate gifting, or wholesale orders? Contact our concierge team anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                platform: 'WhatsApp Concierge',
                handle: '0328-3283282',
                desc: 'Direct WhatsApp for express orders & inquiries',
                url: 'https://wa.me/923283283282',
                color: 'from-emerald-500/10 to-[#4E9200]/10',
                borderColor: 'hover:border-emerald-500/30',
                iconColor: 'text-[#4E9200]',
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                )
              },
              {
                platform: 'Instagram Gallery',
                handle: '@sultandatespk',
                desc: 'Explore harvests, recipe ideas, and unboxings',
                url: 'https://www.instagram.com/sultandatespk',
                color: 'from-amber-500/10 to-[#C59B27]/10',
                borderColor: 'hover:border-[#C59B27]/30',
                iconColor: 'text-[#C59B27]',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                )
              },
              {
                platform: 'Email Desk',
                handle: 'support@sultandates.com',
                desc: 'Wholesale pricing, export, and corporate queries',
                url: 'mailto:support@sultandates.com',
                color: 'from-[#4E9200]/10 to-stone-900/5',
                borderColor: 'hover:border-[#4E9200]/30',
                iconColor: 'text-[#4E9200]',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                )
              }
            ].map((item, i) => (
              <motion.a
                key={item.platform}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group block p-8 rounded-[28px] bg-gradient-to-br ${item.color} border border-stone-900/5 ${item.borderColor} transition-all duration-400 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-stone-900/5`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-white/80 flex items-center justify-center mb-6 ${item.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">{item.platform}</div>
                <div className="font-bold text-stone-900 text-base mb-3 break-all">{item.handle}</div>
                <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                <div className={`mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${item.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Connect <ArrowRight size={12} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Harvest Quality Standards & Superfood Nutrition Board */}
      <section className="section-padding bg-gradient-to-b from-[#EDF3E8] via-[#E4EEDC]/60 to-[#EDF3E8] overflow-hidden border-t border-stone-900/5">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Top: 4-Step Freshness Journey */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-bold tracking-[0.4em] text-lime uppercase mb-4 block">
                OUR HARVEST INTEGRITY
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-stone-900 italic leading-tight mb-6">
                From Sacred Palms <br /><span className="not-italic text-[#0D2818]">to Your Table.</span>
              </h2>
              <p className="text-stone-600 text-base leading-relaxed">
                We believe in delivering dates in their purest form — sun-ripened on ancient palms, graded with zero chemical intervention, and sealed in airtight gold-engraved boxes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualityJourney.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="glass-card p-8 flex flex-col justify-between hover:bg-white transition-all duration-500 hover:shadow-xl hover:shadow-stone-900/5 group border border-white/60 relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-3xl font-serif font-bold italic text-lime group-hover:scale-110 transition-transform">
                      {step.step}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#C59B27]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-1">
                      {step.tagline}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 group-hover:text-lime transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom: Superfood Nutrition Matrix & Gifting Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 glass-card p-8 md:p-12 border border-white/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-lime mb-2 block">
                  NATURAL HEALTH PROFILE
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 italic mb-8">
                  Superfood Nutrition in Every Bite.
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {superfoodMetrics.map((item) => (
                    <div key={item.label} className="p-5 rounded-2xl bg-white/70 border border-stone-900/5">
                      <div className="text-2xl md:text-3xl font-serif font-bold text-stone-900 italic mb-1">
                        {item.metric}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-lime mb-1">
                        {item.label}
                      </div>
                      <div className="text-[11px] font-semibold text-[#C59B27] mb-2">
                        ✦ {item.comparison}
                      </div>
                      <p className="text-[11px] text-stone-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0D2818] rounded-[32px] p-8 md:p-12 text-[#EDF3E8] border border-[#C59B27]/30 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-lime/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 text-[#C59B27] rounded-full text-[10px] font-bold tracking-[0.25em] uppercase mb-6 border border-white/10">
                  <Sparkles size={12} /> Royal Presentation
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white italic mb-4 leading-tight">
                  Ramadan, Eid &amp; Corporate Gifting.
                </h3>
                <p className="text-stone-300 text-xs md:text-sm leading-relaxed mb-8">
                  Custom gold-embossed velvet hampers, wooden heirloom boxes, and curated date assortments personalized with your family or company monogram.
                </p>
              </div>

              <div className="space-y-3 relative z-10">
                <a
                  href="https://wa.me/923283283282?text=Hello%20Sultan%20Dates,%20I%20would%20like%20to%20inquire%20about%20custom%20gift%20boxes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-lime text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3E7500] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-lime/20"
                >
                  Inquire Custom Gift Boxes
                </a>
                <Link
                  href="/shop"
                  className="w-full py-4 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all flex items-center justify-center border border-white/10"
                >
                  Explore Gifting Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}