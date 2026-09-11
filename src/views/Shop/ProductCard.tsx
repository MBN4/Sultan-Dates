'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

const isPriced = (price: string) => price.startsWith('Rs');

interface Variant { label: string; price: string; }
interface Product {
  id: number | string;
  name: string;
  price: string;
  category?: string;
  image: string;
  tag?: string;
  variants?: Variant[];
}

export default function ProductCard({ product, addToCart, onOpenDetails }: { product: Product; addToCart: (p: any) => void; onOpenDetails: (product: any) => void; }) {
  const variants = product.variants;
  const [sel, setSel] = useState(0);

  const activePrice = variants ? variants[sel].price : product.price;
  const priced = isPriced(activePrice);
  const activeLabel = variants ? variants[sel].label : undefined;

  const handleAdd = () => {
    if (variants) {
      addToCart({
        id: `${product.id}-${activeLabel}`,
        name: `${product.name} (${activeLabel})`,
        price: activePrice,
        image: product.image,
        category: product.category
      });
    } else {
      addToCart(product);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      onClick={() => onOpenDetails(product)}
      className="group flex flex-col p-6 glass-card hover:bg-white hover:shadow-2xl hover:shadow-stone-900/5 transition-all duration-500 border border-stone-900/5 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden rounded-[32px] mb-8 border border-stone-900/5">
        <img
          loading="lazy"
          decoding="async"
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {product.tag && (
          <span className="absolute top-6 left-6 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
            {product.tag}
          </span>
        )}
      </div>

      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-lime mb-1 block">
            {product.category}
          </span>
          <h3 className="text-2xl font-serif font-bold text-stone-900 italic leading-tight">{product.name}</h3>
        </div>
        {priced ? (
          <div className="text-right shrink-0">
            <motion.span
              key={activePrice}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xl font-bold text-lime whitespace-nowrap block"
            >
              {activePrice}
            </motion.span>
            {variants && (
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-300">/ {activeLabel}</span>
            )}
          </div>
        ) : (
          <span className="text-[11px] font-bold uppercase tracking-widest text-lime whitespace-nowrap shrink-0">Call for Query</span>
        )}
      </div>

      {/* Weight / amount selector */}
      {variants && (
        <div className="mb-5 mt-auto">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Select Amount</span>
          <div className="flex gap-2">
            {variants.map((v, i) => {
              const active = i === sel;
              return (
                <button
                  key={v.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSel(i);
                  }}
                  aria-pressed={active}
                  className={`relative flex-1 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                    active
                      ? 'text-white border-lime shadow-md shadow-lime/25'
                      : 'text-stone-500 border-stone-900/10 hover:border-lime hover:text-lime'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={`amt-${product.id}`}
                      className="absolute inset-0 bg-lime rounded-full -z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{v.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {priced ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAdd();
          }}
          className={`w-full py-4 border border-stone-900/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all duration-500 ${variants ? '' : 'mt-auto'}`}
        >
          Add to Cart
        </button>
      ) : (
        <Link
          href="/contact"
          onClick={(e) => e.stopPropagation()}
          className="block text-center w-full py-4 mt-auto border border-lime/40 text-lime rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-lime hover:text-white transition-all duration-500"
        >
          Call to Order
        </Link>
      )}
    </motion.div>
  );
}
