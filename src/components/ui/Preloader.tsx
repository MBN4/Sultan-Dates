'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { TreePalm, Sparkles } from 'lucide-react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0D2818] flex flex-col items-center justify-center text-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Ground Line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#C59B27]/40 z-0"
            />

            <div className="relative">
              <motion.div
                initial={{ 
                  clipPath: 'inset(100% 0% 0% 0%)',
                  scale: 0.8,
                  y: 20
                }}
                animate={{ 
                  clipPath: 'inset(0% 0% 0% 0%)',
                  scale: 1,
                  y: 0
                }}
                transition={{ 
                  duration: 1.3, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1
                }}
                className="relative z-10 text-[#C59B27] flex items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-white p-1 border-2 border-[#C59B27] shadow-xl flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/images/sultan-logo.png" 
                    alt="Sultan Dates" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2.5, opacity: 0.15 }}
                transition={{ duration: 1.8, delay: 0.3 }}
                className="absolute inset-0 bg-[#4E9200] rounded-full blur-2xl -z-10"
              />
            </div>
          </div>

          <div className="mt-8 overflow-hidden h-10">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-[0.5em] uppercase text-[#C59B27]">Sultan&apos;s Dates</span>
                <span className="text-[10px] text-stone-400 font-serif">سلطان</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scaleY: [1, 2, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      delay: i * 0.15 
                    }}
                    className="w-1 h-2 bg-[#C59B27] rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

