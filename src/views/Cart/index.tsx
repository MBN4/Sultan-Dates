'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import CheckoutModal from '../../components/ui/CheckoutModal';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, deliveryCharge, orderTotal, cartCount } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="pt-40 pb-32 text-stone-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#4E9200] mb-4 block"
          >
            YOUR ROYAL SELECTION
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-stone-900 italic"
          >
            Shopping <span className="not-italic text-[#4E9200]">Box.</span>
          </motion.h1>
        </header>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/40 glass-card p-20 text-center flex flex-col items-center border border-stone-900/5 shadow-2xl shadow-stone-900/5"
          >
            <div className="w-24 h-24 bg-lime/10 rounded-full flex items-center justify-center text-lime mb-8">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6 italic">Your basket is empty</h2>
            <p className="text-stone-500 mb-10 max-w-sm">Looks like you haven't added any of our seasonal harvest to your basket yet.</p>
            <Link 
              href="/shop" 
              className="bg-stone-900 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-lime transition-all duration-300 shadow-lg shadow-stone-900/20"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode='popLayout'>
                {cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white/40 glass-card p-6 md:p-8 flex items-center gap-6 md:gap-10 border border-stone-900/5 shadow-sm hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-500"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-stone-900/5">
                      <img loading="lazy" decoding="async" src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-lime mb-1 block">{item.category}</span>
                          <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-900 italic">{item.name}</h3>
                        </div>
                        <span className="text-xl font-bold text-stone-900">{item.price}</span>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-4 bg-stone-900/5 rounded-full p-1 border border-stone-900/10">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors text-stone-500"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors text-stone-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-stone-900 text-white p-10 rounded-[40px] shadow-2xl shadow-stone-900/20 sticky top-40">
                <h3 className="text-3xl font-serif font-bold mb-10 italic">Summary</h3>
                <div className="space-y-6 mb-10 pb-10 border-b border-white/10">
                  <div className="flex justify-between text-white/60">
                    <span className="text-xs uppercase tracking-widest font-bold">Subtotal</span>
                    <span className="font-bold">Rs {cartTotal.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span className="text-xs uppercase tracking-widest font-bold">Delivery Charges</span>
                    <span className="font-bold">Rs {deliveryCharge.toLocaleString('en-US')}</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-xs uppercase tracking-widest font-bold text-lime">Total</span>
                  <span className="text-4xl font-serif font-bold italic">Rs {orderTotal.toLocaleString('en-US')}</span>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed mb-10">
                  A flat delivery charge of Rs. 250 applies to all orders across Pakistan.
                </p>
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-lime text-white py-6 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-white hover:text-stone-900 transition-all duration-500 shadow-xl shadow-lime/20 group"
                >
                  Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    Secure 256-bit SSL encrypted payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>
  );
}
