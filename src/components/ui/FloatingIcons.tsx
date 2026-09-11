'use client';

import { motion } from 'motion/react';
import { Leaf, Sparkles, TreePalm, Sun, Sparkle, Heart, Crown } from 'lucide-react';

const icons = [
  { Icon: TreePalm, size: 36, color: 'text-[#4E9200]/20' },
  { Icon: Leaf, size: 30, color: 'text-[#4E9200]/25' },
  { Icon: Sparkles, size: 28, color: 'text-[#C59B27]/25' },
  { Icon: Sun, size: 34, color: 'text-[#C59B27]/15' },
  { Icon: Crown, size: 32, color: 'text-[#C59B27]/20' },
  { Icon: Sparkle, size: 24, color: 'text-[#4E9200]/20' },
];

export default function FloatingIcons() {
  const floatingElements = Array.from({ length: 30 }).map((_, i) => {
    const RandomIcon = icons[i % icons.length];
    const left = `${(i * 3.3 + (i * 7) % 25)}%`;
    const top = `${(i * 3.7 + (i * 13) % 40)}%`;
    const delay = (i * 0.7) % 15;
    const duration = 22 + (i % 8) * 2;

    return (
      <motion.div
        key={i}
        className={`fixed overflow-hidden pointer-events-none ${RandomIcon.color}`}
        style={{ left, top }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ 
          opacity: [0, 0.8, 0.8, 0],
          y: [0, -140],
          x: [0, ((i % 5) - 2) * 25],
          rotate: [0, 160]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          delay: delay,
          ease: "linear"
        }}
      >
        <RandomIcon.Icon size={RandomIcon.size} strokeWidth={1.2} />
      </motion.div>
    );
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
      {floatingElements}
    </div>
  );
}

