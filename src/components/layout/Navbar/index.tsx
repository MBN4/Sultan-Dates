'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Sparkles, ArrowUpRight, PhoneCall } from 'lucide-react';
import { navLinks, siteName, siteArabicName } from './data';
import { useCart } from '../../../context/CartContext';
import { useModal } from '../../../context/ModalContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const lastScrollYRef = useRef(0);
  const hoveredPathRef = useRef<string | null>(null);
  hoveredPathRef.current = hoveredPath;

  const pathname = usePathname();
  const { cartCount } = useCart();
  const { isAnyModalOpen } = useModal();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Clear any active hover to prevent mouse-position glitching while scrolling
          if (hoveredPathRef.current !== null) {
            setHoveredPath(null);
          }

          setScrolled(currentScrollY > 20);

          if (currentScrollY > lastScrollYRef.current && currentScrollY > 150) {
            setVisible(false);
          } else {
            setVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLink = navLinks.find((l) => l.path === pathname)?.path || navLinks[0].path;
  const currentHighlighted = hoveredPath !== null ? hoveredPath : activeLink;

  return (
    <header className="fixed top-0 left-0 w-full z-150 pointer-events-none transition-all duration-300">
      {/* 1. Ultra-Slim Top Live Heritage Ticker */}
      <div className={`w-full bg-[#0D2818] text-stone-200 overflow-hidden relative z-50 border-b border-[#C59B27]/20 pointer-events-auto transition-all duration-300 ${
        scrolled ? 'max-h-0 opacity-0 py-0 border-none' : 'max-h-10 opacity-100 py-1.5'
      }`}>
        <div className="flex whitespace-nowrap min-w-full">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ ease: "linear", duration: 28, repeat: Infinity }}
            className="flex gap-10 text-[9px] font-bold tracking-[0.25em] uppercase items-center shrink-0 pr-10 text-stone-300 font-sans"
          >
            <span className="flex items-center gap-1.5"><Sparkles size={11} className="text-[#C59B27]" /> 100% Certified Madinah &amp; Qassim Harvest</span>
            <span className="text-[#C59B27]">✦</span>
            <span>Free Nationwide Delivery on Orders Above Rs 5,000</span>
            <span className="text-[#C59B27]">✦</span>
            <span>Zero Preservatives • Sunnah Heritage Grade A+</span>
            <span className="text-[#C59B27]">✦</span>
            <span>Direct WhatsApp Concierge: 0328-3283282</span>
            <span className="text-[#C59B27]">✦</span>
            <span className="flex items-center gap-1.5"><Sparkles size={11} className="text-[#C59B27]" /> 100% Certified Madinah &amp; Qassim Harvest</span>
            <span className="text-[#C59B27]">✦</span>
            <span>Free Nationwide Delivery on Orders Above Rs 5,000</span>
            <span className="text-[#C59B27]">✦</span>
            <span>Zero Preservatives • Sunnah Heritage Grade A+</span>
            <span className="text-[#C59B27]">✦</span>
            <span>Direct WhatsApp Concierge: 0328-3283282</span>
          </motion.div>
        </div>
      </div>

      {/* 2. Floating Luxury Capsule Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3">
        <motion.nav
          initial={{ y: 0 }}
          animate={{ y: (!visible || isAnyModalOpen) ? -140 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`pointer-events-auto mx-auto rounded-full transition-all duration-300 border ${
            scrolled
              ? 'bg-[#0D2818]/94 backdrop-blur-2xl border-[#C59B27]/35 shadow-2xl shadow-stone-950/25 text-white py-2 px-3.5 sm:px-5'
              : 'bg-white/92 backdrop-blur-xl border-stone-900/10 shadow-lg shadow-stone-900/5 text-stone-900 py-2.5 px-3.5 sm:px-6'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Title */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden p-0.5 border transition-all duration-300 ${
                scrolled ? 'bg-white border-[#C59B27]' : 'bg-white border-lime/30 group-hover:border-[#C59B27]'
              } shadow-sm flex items-center justify-center`}>
                <img 
                  loading="eager" 
                  decoding="async" 
                  src="/assets/images/sultan-logo.png" 
                  alt="Sultan Dates Logo" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className={`text-base sm:text-lg font-black tracking-tight font-serif ${
                    scrolled ? 'text-white' : 'text-stone-900'
                  }`}>
                    {siteName}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-lime text-white">
                    DATES
                  </span>
                </div>
                <span className="text-[10px] text-[#C59B27] font-serif tracking-[0.15em] font-medium mt-0.5">
                  {siteArabicName} • Royal Harvest
                </span>
              </div>
            </Link>

            {/* Smooth Gliding Pill Navigation Links */}
            <div 
              onMouseLeave={() => setHoveredPath(null)}
              className="hidden md:flex items-center gap-1 p-1 rounded-full bg-stone-900/5 dark:bg-white/5 relative"
            >
              {navLinks.map((link) => {
                const isItemHighlighted = currentHighlighted === link.path;
                const isActive = pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onMouseEnter={() => setHoveredPath(link.path)}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-colors duration-200 z-10 flex items-center gap-1.5 ${
                      isItemHighlighted
                        ? scrolled
                          ? 'text-white font-bold'
                          : 'text-white font-bold'
                        : scrolled
                        ? 'text-stone-300 hover:text-white'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {/* Unified Glider Pill */}
                    {isItemHighlighted && (
                      <motion.div
                        layoutId="navbar-pill-glider"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className={`absolute inset-0 rounded-full -z-10 ${
                          scrolled
                            ? 'bg-lime border border-[#C59B27]/40 shadow-sm'
                            : 'bg-[#0D2818] shadow-md'
                        }`}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
                      )}
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons: Cart & Order CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Shopping Cart Pill */}
              <Link
                href="/cart"
                className={`relative px-3.5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 border ${
                  scrolled
                    ? 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    : 'bg-stone-900/5 hover:bg-stone-900/10 text-stone-900 border-stone-900/5'
                }`}
                aria-label="View shopping basket"
              >
                <ShoppingBag size={17} className={cartCount > 0 ? 'text-lime' : ''} />
                <span className="text-xs font-bold font-mono">
                  {cartCount}
                </span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-lime"></span>
                  </span>
                )}
              </Link>

              {/* Order Royal Box Button */}
              <Link
                href="/shop"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-lime text-white hover:bg-[#3E7500] hover:scale-[1.03] transition-all duration-300 shadow-md shadow-lime/20 border border-[#C59B27]/40"
              >
                <span>Dates Menu</span>
                <ArrowUpRight size={13} />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden p-2 rounded-full transition-colors ${
                  scrolled ? 'hover:bg-white/10 text-white' : 'hover:bg-stone-900/5 text-stone-900'
                }`}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto fixed inset-x-4 top-20 z-140 max-w-lg mx-auto"
          >
            <div className="glass-card bg-[#0D2818]/95 backdrop-blur-2xl border border-[#C59B27]/30 text-white p-6 rounded-[28px] shadow-2xl space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-serif font-bold text-white">Sultan&apos;s Dates</span>
                  <span className="text-xs text-[#C59B27] font-serif">سلطان</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-stone-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all flex items-center justify-between ${
                      pathname === link.path
                        ? 'bg-lime text-white shadow-md shadow-lime/20'
                        : 'hover:bg-white/10 text-stone-200'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="opacity-60" />
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2.5">
                <Link
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-lime text-white text-center rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3E7500] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-lime/20"
                >
                  <span>Explore Dates Menu</span>
                  <ArrowUpRight size={14} />
                </Link>

                <a
                  href="https://wa.me/923283283282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white/10 text-stone-200 text-center rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall size={13} className="text-[#C59B27]" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}