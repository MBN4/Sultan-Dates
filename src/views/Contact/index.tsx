'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, Phone, Mail, Plus, Minus } from 'lucide-react';
import { contactInfo, contactFaqs } from './data';

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="pt-40 text-stone-900 min-h-screen">
      <section className="section-padding max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/2 min-w-0">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-lime mb-8 block"
          >
            {contactInfo.subtitle}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-12 whitespace-pre-line leading-[0.95] italic break-words"
          >
            {contactInfo.title}
          </motion.h1>
          <p className="text-xl text-stone-500 mb-16 max-w-md leading-relaxed">
            {contactInfo.description}
          </p>

          <div className="space-y-10">
            {contactInfo.details.map((detail) => (
              <div key={detail.label}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-300 mb-2">{detail.label}</div>
                <a href={`mailto:${detail.value}`} className="text-2xl font-serif font-bold text-stone-900 border-b border-stone-900/10 hover:border-lime transition-colors pb-1 italic">
                  {detail.value}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-stone-900/5 flex flex-col sm:flex-row gap-12">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-lime mt-1" />
              <div className="text-sm text-stone-400 leading-relaxed max-w-[180px]">
                {contactInfo.office.address}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-lime mt-1" />
              <div className="text-sm text-stone-400">
                {contactInfo.office.phone}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 bg-white/40 glass-card p-10 md:p-20 shadow-2xl shadow-stone-900/5 border border-stone-900/5">
          <form className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-300 group-focus-within:text-lime transition-colors mb-2 block">First Name</label>
                <input type="text" className="w-full bg-transparent border-b-2 border-stone-900/10 focus:border-lime focus:outline-none py-2 text-lg transition-colors text-stone-900" />
              </div>
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-300 group-focus-within:text-lime transition-colors mb-2 block">Last Name</label>
                <input type="text" className="w-full bg-transparent border-b-2 border-stone-900/10 focus:border-lime focus:outline-none py-2 text-lg transition-colors text-stone-900" />
              </div>
            </div>
            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-300 group-focus-within:text-lime transition-colors mb-2 block">Email Address</label>
              <input type="email" className="w-full bg-transparent border-b-2 border-stone-900/10 focus:border-lime focus:outline-none py-2 text-lg transition-colors text-stone-900" />
            </div>
            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-300 group-focus-within:text-lime transition-colors mb-2 block">Subject</label>
              <select className="w-full bg-transparent border-b-2 border-stone-900/10 focus:border-lime focus:outline-none py-2 text-lg transition-colors appearance-none text-stone-900 cursor-pointer">
                <option className="bg-white">General Inquiry</option>
                <option className="bg-white">Order Tracking &amp; Assistance</option>
                <option className="bg-white">Corporate &amp; Eid Gifting</option>
                <option className="bg-white">Wholesale &amp; Bulk Exports</option>
              </select>
            </div>
            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-300 group-focus-within:text-lime transition-colors mb-2 block">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b-2 border-stone-900/10 focus:border-lime focus:outline-none py-2 text-lg transition-colors resize-none overflow-hidden text-stone-900" />
            </div>
            <button className="w-full bg-stone-900 text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-4 hover:bg-lime transition-all duration-500 group shadow-lg shadow-stone-900/20">
              Send Message <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>
        </div>
      </section>

      {/* 3. FAQ Section - Interactive On-Click Accordion */}
      <section className="section-padding max-w-7xl mx-auto border-t border-stone-900/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-bold tracking-[0.4em] text-lime uppercase mb-6 block">
              SUPPORT &amp; GUIDANCE
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900 italic leading-tight mb-6">
              Common <br /> <span className="not-italic text-[#0D2818]">Questions.</span>
            </h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-8">
              Everything you need to know about our sacred harvest, storage guidelines, ordering methods, and nationwide express shipping.
            </p>
            <div className="p-6 rounded-3xl bg-[#0D2818] text-[#EDF3E8] space-y-4 border border-[#C59B27]/30 shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C59B27] block">
                Have a different question?
              </span>
              <p className="text-xs text-stone-300 leading-relaxed">
                Our concierge team is available on WhatsApp daily for variety consultation and custom gift box inquiries.
              </p>
              <a
                href="https://wa.me/923283283282"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#3E7500] transition-colors shadow-md"
              >
                <span>WhatsApp: 0328-3283282</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {contactFaqs.map((faq, i) => {
              const isOpen = activeFaq === i;

              return (
                <motion.div 
                  key={faq.question}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-[24px] transition-all duration-400 border overflow-hidden ${
                    isOpen
                      ? 'bg-white shadow-xl shadow-stone-900/5 border-lime/40'
                      : 'bg-white/60 hover:bg-white border-stone-900/5 hover:border-stone-900/10'
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

      {/* 4. Map Placeholder */}
      <section className="px-6 pb-20">
        <div className="w-full h-[500px] bg-[#DEE8D4]/50 rounded-[60px] overflow-hidden transition-all duration-700 cursor-help flex items-center justify-center relative">
           <img loading="lazy" decoding="async" src="/assets/images/products/spices/pink-himalayan-salt.png" className="w-full h-full object-cover" alt="Pink Himalayan salt" />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
               <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
               <span className="text-xs font-bold uppercase tracking-widest">Our Head Office</span>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
