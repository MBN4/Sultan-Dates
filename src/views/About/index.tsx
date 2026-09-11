'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Plus, Minus } from 'lucide-react';
import { aboutHero, pillars, team, practices, faqs } from './data';
import { useState } from 'react';

export default function About() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="pt-40 text-stone-900 overflow-x-hidden">
      {/* 1. Hero */}
      <section className="section-padding max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-bold tracking-[0.4em] uppercase text-lime mb-8 block"
        >
          {aboutHero.subtitle}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-9xl font-serif font-bold text-stone-900 mb-12 max-w-4xl italic"
        >
          {aboutHero.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-stone-500 max-w-2xl text-xl leading-relaxed italic font-light"
        >
          "{aboutHero.description}"
        </motion.p>
      </section>

      {/* 2. Dynamic Split Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-y border-stone-900/5">
        <div className="relative h-[600px] lg:h-auto bg-[#DEE8D4]/10 flex items-center justify-center p-12 overflow-hidden">
          {/* Layered Visual Composition */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative w-full max-w-md aspect-square">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="absolute -top-12 -left-12 w-48 h-64 rounded-[32px] overflow-hidden shadow-2xl z-20 border border-white/20"
            >
              <img loading="lazy" decoding="async" src="/assets/images/products/spices/red-chili-flakes.png" className="w-full h-full object-cover" alt="Stone-ground spices" />
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="absolute inset-0 rounded-[48px] overflow-hidden shadow-inner z-10 bg-white p-4"
            >
               <div className="w-full h-full rounded-[32px] overflow-hidden border border-stone-200">
                <img loading="lazy" decoding="async" src="/assets/images/products/ghee/desi-ghee-both.png" className="w-full h-full object-cover" alt="Desi ghee" />
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="absolute -bottom-12 -right-12 w-56 h-40 bg-stone-900 rounded-[32px] p-8 z-30 shadow-2xl flex flex-col justify-between"
            >
              <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-lime">PURITY</div>
              <div className="text-3xl font-serif font-bold italic text-white leading-none">100% <br /><span className="text-xs uppercase tracking-widest opacity-40 not-italic">Natural</span></div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 -right-20 w-12 h-12 bg-lime rounded-full flex items-center justify-center text-white z-40 shadow-lg"
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>
        </div>
        <div className="bg-[#EDF3E8]/70 text-stone-900 p-12 md:p-24 lg:p-40 flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 italic">From sacred palm oases to your home.</h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-12 space-y-6">
            For generations, date palms have stood as symbols of life, vitality, and hospitality in the historic oases of Al-Madinah Al-Munawwarah and Al-Qassim. Sultan Dates was founded to safeguard this authentic heritage — connecting discerning households directly with the finest, sun-ripened royal harvest.
            <br /><br />
            Every box represents rigorous caliber grading, zero chemical processing, and uncompromising freshness — preserving the sacred tradition and unmatched natural sweetness of Grade A+ dates.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-4xl font-serif font-bold mb-1 text-stone-900">100%</div>
              <div className="text-[10px] uppercase tracking-widest text-[#4E9200] font-bold">Organic &amp; Pure</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold mb-1 text-stone-900">Grade A+</div>
              <div className="text-[10px] uppercase tracking-widest text-[#4E9200] font-bold">Hand-Sorted Quality</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Pillars */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-900">Our Promise</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-[40px] overflow-hidden mb-10 bg-[#DEE8D4]/40">
                  <img loading="lazy" decoding="async" 
                    src={pillar.image} 
                    alt={pillar.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6 italic text-stone-900">{pillar.title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Practices (Horizontal Scrolling effect area) */}
      <section className="py-20 bg-[#DEE8D4]/10 border-y border-stone-900/5">
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -800] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 pr-12"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-12 items-center">
                {practices.map((p) => (
                  <div key={p.title} className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-sm font-bold uppercase tracking-[0.3em] text-stone-900">{p.title}</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20">
          <div className="lg:w-1/3 sticky top-32">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-lime mb-6 block">FROM SOIL TO TABLE</span>
            <h2 className="text-5xl font-serif font-bold text-stone-900 mb-8 leading-tight">Made by people who care.</h2>
            <p className="text-stone-500 leading-relaxed max-w-sm">
              We work hand in hand with rural farmers and traditional makers, preserving family recipes and supporting local communities with every jar we prepare.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-[#DEE8D4]/20 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-900/5 group"
              >
                <h4 className="text-2xl font-serif font-bold text-stone-900 mb-2">{member.name}</h4>
                <div className="text-[10px] font-bold uppercase tracking-widest text-lime mb-8">{member.role}</div>
                <p className="text-sm text-stone-400 group-hover:text-stone-900 transition-colors leading-relaxed italic">"{member.bio}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Transparency Checklist */}
      <section className="section-padding bg-lime/10 text-stone-900 border-y border-stone-900/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="min-w-0">
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight md:leading-[1.02] mb-12 italic break-words">Our Promise <br /> <span className="not-italic text-stone-900/40">to You.</span></h2>
            <p className="text-xl text-stone-500 font-light max-w-md">We're not simply selling food — we're preserving traditions, supporting local communities, and delivering products you can proudly place on your family's table.</p>
          </div>
          <div className="space-y-8">
            {[
              '100% Natural Ingredients',
              'Traditional Homemade Recipes',
              'Freshly Prepared in Small Batches',
              'Pure, Authentic & Preservative-Free',
              'Crafted with Care, Served with Pride'
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-12 h-12 rounded-full bg-stone-900/5 flex items-center justify-center group-hover:bg-lime group-hover:text-white transition-all duration-500 border border-stone-900/5">
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-lg md:text-xl font-serif italic text-stone-900">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Gallery Section */}
      <section className="py-20 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 h-[80vh]">
        <div className="rounded-[40px] overflow-hidden">
          <img loading="lazy" decoding="async" src="/assets/images/products/ghee/desi-ghee-1kg.png" className="w-full h-full object-cover" alt="Desi ghee 1kg" />
        </div>
        <div className="grid grid-rows-2 gap-6">
          <div className="rounded-[40px] overflow-hidden"><img loading="lazy" decoding="async" src="/assets/images/products/pickles/garlic-pickle.png" className="w-full h-full object-cover" alt="Garlic pickle" /></div>
          <div className="rounded-[40px] overflow-hidden"><img loading="lazy" decoding="async" src="/assets/images/products/spices/turmeric-powder.png" className="w-full h-full object-cover" alt="Turmeric powder" /></div>
        </div>
        <div className="rounded-[40px] overflow-hidden">
          <img loading="lazy" decoding="async" src="/assets/images/products/poultry/desi-eggs.png" className="w-full h-full object-cover" alt="Desi eggs" />
        </div>
        <div className="grid grid-rows-2 gap-6">
          <div className="rounded-[40px] overflow-hidden bg-stone-900 flex items-center justify-center p-10 text-center">
            <span className="text-xl font-serif text-white italic leading-tight italic">Our mission is written in the earth.</span>
          </div>
          <div className="rounded-[40px] overflow-hidden"><img loading="lazy" decoding="async" src="/assets/images/products/pickles/mango-boneless-pickle.png" className="w-full h-full object-cover" alt="Mango pickle" /></div>
        </div>
      </section>

      {/* 9. FAQ Section - Refined Interactive Accordion */}
      <section className="section-padding bg-gradient-to-b from-white via-[#EDF3E8]/40 to-white border-t border-stone-900/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-lime mb-6 block">HERITAGE &amp; STORAGE FAQ</span>
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900 leading-tight italic mb-6">
              Common <br /><span className="not-italic text-[#0D2818]">Questions.</span>
            </h2>
            <p className="text-stone-600 max-w-sm text-sm md:text-base leading-relaxed mb-8">
              Everything you need to know about date harvesting, temperature storage guidelines, authenticity grading, and custom gift curation.
            </p>
            <div className="p-6 rounded-3xl bg-[#0D2818] text-white space-y-3 border border-[#C59B27]/30 shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C59B27] block">
                Direct WhatsApp Support
              </span>
              <p className="text-xs text-stone-300 leading-relaxed">
                Need guidance selecting the right variety for your family, diabetes management, or gifting?
              </p>
              <a
                href="https://wa.me/923283283282"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#3E7500] transition-colors"
              >
                Chat with Concierge
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;

              return (
                <motion.div 
                  key={faq.question}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-[24px] transition-all duration-300 border overflow-hidden ${
                    isOpen
                      ? 'bg-white shadow-xl shadow-stone-900/5 border-lime/40'
                      : 'bg-white/70 hover:bg-white border-stone-900/5 hover:border-stone-900/10'
                  }`}
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full p-6 md:p-8 flex items-center justify-between gap-6 text-left cursor-pointer transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 md:gap-6 min-w-0">
                      <span className={`text-xs md:text-sm font-mono font-bold transition-colors ${
                        isOpen ? 'text-lime' : 'text-stone-400'
                      }`}>
                        0{i + 1}
                      </span>
                      <h3 className={`text-base md:text-lg font-serif font-bold transition-colors leading-snug ${
                        isOpen ? 'text-stone-900 italic' : 'text-stone-800'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                      isOpen
                        ? 'bg-lime text-white border-lime rotate-180 shadow-md shadow-lime/20'
                        : 'bg-stone-900/5 text-stone-600 border-stone-900/10 hover:bg-lime hover:text-white hover:border-lime'
                    }`}>
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-stone-600 text-xs md:text-sm leading-relaxed border-t border-stone-900/5 mt-1">
                          <p className="pt-4 border-l-2 border-lime pl-4 italic">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Call to visit */}
      <section className="section-padding text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-10">See it with your own eyes.</h2>
        <p className="text-stone-500 mb-12 max-w-xl mx-auto text-lg leading-relaxed">
          We host weekly farm visits and seasonal harvest dinners. Experience the rhythm of the earth first-hand.
        </p>
        <button className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-lime pb-2 hover:text-lime transition-all">
          REQUEST A VISIT <ArrowUpRight size={16} />
        </button>
      </section>
    </div>
  );
}