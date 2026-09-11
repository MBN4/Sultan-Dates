'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Phone, CheckCircle2 } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

interface Variant {
  label: string;
  price: string;
}

interface Product {
  id: number | string;
  name: string;
  price: string;
  category?: string;
  image: string;
  tag?: string;
  variants?: Variant[];
  description?: string;
  instructions?: string;
  netWeight?: string;
}

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  addToCart: (p: any) => void;
}

const isPriced = (price: string) => price.startsWith('Rs');

export default function ProductDetailsModal({ product, isOpen, onClose, addToCart }: ProductDetailsModalProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [successAdded, setSuccessAdded] = useState(false);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (isOpen) openModal();
    else closeModal();
    return () => { if (isOpen) closeModal(); };
  }, [isOpen]);

  if (!product) return null;

  const variants = product.variants;
  const activePrice = variants ? variants[selectedVariantIdx].price : product.price;
  const priced = isPriced(activePrice);
  const activeLabel = variants ? variants[selectedVariantIdx].label : undefined;

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
    setSuccessAdded(true);
    setTimeout(() => setSuccessAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[32px] flex flex-col md:flex-row shadow-2xl border border-stone-100 overflow-hidden z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 hover:bg-stone-100 rounded-full transition-colors z-20 bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <X size={18} className="text-stone-500" />
            </button>

            {/* Left Side: Product Image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-full relative overflow-hidden bg-stone-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <span className="absolute top-6 left-6 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Right Side: Product Information */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
              {/* Category */}
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-lime mb-2 block">
                {product.category}
              </span>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 italic leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                {priced ? (
                  <>
                    <span className="text-2xl font-bold text-lime">{activePrice}</span>
                    {activeLabel && (
                      <span className="text-xs uppercase tracking-widest text-stone-400">/ {activeLabel}</span>
                    )}
                  </>
                ) : (
                  <span className="text-base font-bold uppercase tracking-widest text-lime">Call for Query</span>
                )}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-stone-100 mb-6" />

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-2">Product Description</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Storage / Usage Instructions */}
              {product.instructions && (
                <div className="mb-6 p-4 bg-lime/5 border border-lime/10 rounded-2xl">
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-lime mb-1.5">Instructions</h4>
                  <p className="text-stone-650 text-xs leading-relaxed italic">{product.instructions}</p>
                </div>
              )}

              {/* Net Weight Spec */}
              {product.netWeight && (
                <div className="mb-6">
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">Available Net Weight</h4>
                  <span className="inline-block bg-stone-50 border border-stone-100 rounded-lg px-3 py-1.5 text-xs font-semibold text-stone-700">
                    {product.netWeight}
                  </span>
                </div>
              )}

              {/* Variants Selector */}
              {variants && (
                <div className="mb-8 mt-auto">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-2 block">Choose Size</span>
                  <div className="flex gap-2">
                    {variants.map((v, idx) => {
                      const isActive = idx === selectedVariantIdx;
                      return (
                        <button
                          key={v.label}
                          onClick={() => setSelectedVariantIdx(idx)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                            isActive
                              ? 'bg-lime text-white border-lime shadow-md shadow-lime/25'
                              : 'bg-white text-stone-500 border-stone-200 hover:border-lime hover:text-lime'
                          }`}
                        >
                          {v.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-auto">
                {priced ? (
                  <button
                    onClick={handleAdd}
                    className="w-full bg-stone-900 text-white py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-lime transition-all duration-500 shadow-xl shadow-stone-900/10 flex items-center justify-center gap-2 group"
                  >
                    {successAdded ? (
                      <>
                        Added to Basket <CheckCircle2 size={16} className="text-white" />
                      </>
                    ) : (
                      <>
                        Add to Basket <ShoppingBag size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                ) : (
                  <a
                    href="/contact"
                    className="block text-center w-full py-5 border border-lime text-lime hover:bg-lime hover:text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-500 shadow-lg shadow-lime/5 flex items-center justify-center gap-2"
                  >
                    Call to Order <Phone size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
