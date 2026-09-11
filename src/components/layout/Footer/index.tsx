'use client';

import React from 'react';
import Link from 'next/link';
import { footerLinks, socialLinks } from './data';

export default function Footer() {
  return (
    <footer className="bg-[#0D2818] text-[#EDF3E8] py-20 px-6 md:px-12 lg:px-20 mt-20 border-t border-[#C59B27]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-3.5 mb-6 group">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow-md border-2 border-[#C59B27] flex items-center justify-center p-0.5">
              <img 
                loading="lazy" 
                decoding="async" 
                src="/assets/images/sultan-logo.png" 
                alt="Sultan Dates Logo" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight uppercase text-white font-serif block leading-none">
                Sultan&apos;s <span className="text-[#C59B27] text-sm font-sans tracking-widest font-semibold ml-1">Dates</span>
              </span>
              <span className="text-xs text-[#C59B27] font-serif tracking-[0.2em]">سلطان للتمور الفاخرة</span>
            </div>
          </Link>
          <p className="text-stone-300 max-w-sm mb-6 leading-relaxed text-sm">
            Curating the finest harvest of sacred Ajwa Al-Madinah, Royal Medjool, Amber, and luxury stuffed dates directly from ancient palm groves. 100% natural, hand-selected, and blessed with tradition.
          </p>
          <div className="text-xs text-stone-300 mb-6 space-y-1.5">
            <p className="font-semibold">WhatsApp &amp; Orders: <a href="https://wa.me/923283283282" target="_blank" rel="noopener noreferrer" className="text-[#C59B27] hover:underline font-bold transition-colors">0328-3283282</a></p>
            <p className="font-semibold">Email: <a href="mailto:support@sultandates.com" className="text-[#C59B27] hover:underline transition-colors">support@sultandates.com</a></p>
            <p className="text-stone-400">Madinah Al-Munawwarah &bull; Direct Import &amp; Nationwide Delivery</p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const icons: Record<string, React.ReactElement> = {
                Instagram: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
                Facebook: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
                WhatsApp: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                ),
                Email: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                )
              };
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-stone-300 hover:bg-[#4E9200] hover:text-[#C59B27] transition-all duration-300 hover:scale-110 border border-white/5"
                >
                  {icons[social.name]}
                </a>
              );
            })}
          </div>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-6 text-[#C59B27]">
              {group.title}
            </h4>
            <ul className="flex flex-col gap-3.5">
              {group.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-sm hover:text-[#C59B27] transition-colors font-medium text-stone-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[11px] text-stone-400 uppercase tracking-widest font-medium">
          © {new Date().getFullYear()} Sultan Dates (سلطان) • Pure Palm Harvest &bull; All Rights Reserved
        </p>
        <div className="flex gap-8 text-[11px] text-stone-400 uppercase tracking-widest font-medium">
          <Link href="/shop" className="hover:text-[#C59B27] transition-colors">Dates Menu</Link>
          <Link href="/about" className="hover:text-[#C59B27] transition-colors">Palm Heritage</Link>
          <Link href="/contact" className="hover:text-[#C59B27] transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

