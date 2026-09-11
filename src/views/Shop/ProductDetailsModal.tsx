'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Phone, CheckCircle2, Sparkles, MapPin, Award, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

interface Variant {
  label: string;
  price: string;
}

interface Product {
  id: number | string;
  name: string;
  arabicName?: string;
  price: string;
  category?: string;
  image: string;
  tag?: string;
  origin?: string;
  grade?: string;
  flavorProfile?: string;
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
  const [quantity, setQuantity] = useState(1);
  const [successAdded, setSuccessAdded] = useState(false);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (isOpen) {
      openModal();
      setSelectedVariantIdx(0);
      setQuantity(1);
    } else {
      closeModal();
    }
    return () => {
      if (isOpen) closeModal();
    };
  }, [isOpen]);

  if (!product) return null;

  const variants = product.variants;
  const activePrice = variants && variants[selectedVariantIdx] ? variants[selectedVariantIdx].price : product.price;
  const priced = isPriced(activePrice);
  const activeLabel = variants && variants[selectedVariantIdx] ? variants[selectedVariantIdx].label : undefined;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      if (variants && activeLabel) {
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
    }
    setSuccessAdded(true);
    setTimeout(() => setSuccessAdded(false), 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl md:rounded-[36px] flex flex-col md:flex-row shadow-2xl border border-stone-200/80 overflow-hidden z-10 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2.5 hover:bg-stone-100 rounded-full transition-colors z-30 bg-white/90 backdrop-blur-md shadow-md border border-stone-200/60 text-stone-600 hover:text-stone-900"
            >
              <X size={18} />
            </button>

            {/* Left Side: Product Media / Image */}
            <div className="w-full md:w-[46%] bg-[#f7f9f5] relative flex items-center justify-center p-6 md:p-8 shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-stone-100">
              <div className="relative w-full aspect-square max-w-[280px] md:max-w-none rounded-2xl overflow-hidden shadow-inner bg-white/50 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain md:object-cover p-2 transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20">
                {product.tag && (
                  <span className="inline-flex items-center gap-1 bg-[#0D2818] text-[#EDF3E8] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    <Sparkles size={11} className="text-[#C59B27]" /> {product.tag}
                  </span>
                )}
                {product.grade && (
                  <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-[#4E9200] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#4E9200]/20 shadow-sm">
                    <Award size={11} /> {product.grade}
                  </span>
                )}
              </div>
            </div>

            {/* Right Side: Product Details & Controls */}
            <div className="w-full md:w-[54%] flex flex-col flex-1 min-h-0 bg-white">
              {/* Scrollable Content Area */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-5">
                {/* Category & Arabic Name */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#4E9200]">
                    {product.category || 'Royal Dates'}
                  </span>
                  {product.arabicName && (
                    <span className="text-sm font-serif font-semibold text-[#C59B27] tracking-wide">
                      {product.arabicName}
                    </span>
                  )}
                </div>

                {/* Product Title */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 leading-tight">
                    {product.name}
                  </h2>
                  {product.origin && (
                    <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#4E9200]" /> {product.origin}
                    </p>
                  )}
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2.5 pb-3 border-b border-stone-100">
                  {priced ? (
                    <>
                      <span className="text-3xl font-bold text-[#4E9200] font-sans">{activePrice}</span>
                      {activeLabel && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                          / {activeLabel}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-lg font-bold text-[#4E9200] uppercase tracking-wider">
                      Price On Inquiry
                    </span>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
                      Description &amp; Heritage
                    </h4>
                    <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Flavor Profile */}
                {product.flavorProfile && (
                  <div className="p-3.5 rounded-2xl bg-[#f7f9f4] border border-[#4E9200]/15">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#4E9200] mb-1">
                      Taste &amp; Texture Profile
                    </h4>
                    <p className="text-stone-700 text-xs leading-normal">
                      {product.flavorProfile}
                    </p>
                  </div>
                )}

                {/* Storage Instructions */}
                {product.instructions && (
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-[#C59B27]" /> Storage &amp; Freshness Advice
                    </h4>
                    <p className="text-stone-600 text-xs leading-normal">
                      {product.instructions}
                    </p>
                  </div>
                )}

                {/* Size / Weight Selection */}
                {variants && variants.length > 0 && (
                  <div className="pt-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                      Select Package Size / Weight
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {variants.map((v, idx) => {
                        const isActive = idx === selectedVariantIdx;
                        return (
                          <button
                            key={v.label}
                            type="button"
                            onClick={() => setSelectedVariantIdx(idx)}
                            className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border flex flex-col items-center justify-center gap-0.5 ${
                              isActive
                                ? 'bg-[#4E9200] text-white border-[#4E9200] shadow-md shadow-[#4E9200]/25'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-[#4E9200]/50 hover:bg-white'
                            }`}
                          >
                            <span className="font-bold">{v.label}</span>
                            <span className={`text-[10px] ${isActive ? 'text-lime-100' : 'text-stone-500'}`}>
                              {v.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Action Footer */}
              <div className="p-4 md:p-6 bg-stone-50 border-t border-stone-200/80 shrink-0">
                <div className="flex items-center gap-3">
                  {/* Quantity Counter */}
                  {priced && (
                    <div className="flex items-center rounded-xl bg-white border border-stone-200 shadow-sm p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="p-2 text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-stone-900">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  )}

                  {/* Add to Basket Button */}
                  {priced ? (
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#4E9200] to-[#3E7500] hover:from-[#5aa800] hover:to-[#468400] text-white font-semibold text-xs uppercase tracking-widest shadow-lg shadow-[#4E9200]/25 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      {successAdded ? (
                        <>
                          <CheckCircle2 size={16} className="text-white animate-bounce" />
                          <span>Added to Basket</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} className="group-hover:scale-110 transition-transform" />
                          <span>Add to Basket • {activePrice}</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <a
                      href="/contact"
                      className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0D2818] text-white hover:bg-[#4E9200] font-semibold text-xs uppercase tracking-widest text-center shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Phone size={15} />
                      <span>Contact Royal Concierge</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
