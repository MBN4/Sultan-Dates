'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { shopHero, shopProducts, filters } from './data';
import { useCart } from '../../context/CartContext';
import ProductCard from './ProductCard';
import ProductDetailsModal from './ProductDetailsModal';

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { addToCart } = useCart();

  // Filter products by category and search query
  let filteredProducts = shopProducts.filter((product) => {
    const matchesCategory = activeFilter === 'All' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0;
      return priceA - priceB;
    });
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0;
      return priceB - priceA;
    });
  }

  return (
    <div className="pt-36 md:pt-44 text-stone-900 min-h-screen pb-28">
      {/* Header */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-lime/10 text-lime rounded-full text-[10px] font-bold tracking-[0.3em] uppercase mb-4 border border-lime/20"
        >
          <Sparkles size={12} className="text-[#C59B27]" /> 100% Madinah &amp; Qassim Harvest
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-stone-900 mb-6 italic tracking-tight"
        >
          Dates <span className="not-italic text-[#0D2818]">Collection.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-stone-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-normal"
        >
          Hand-inspected sacred Ajwa Al-Madinah, Royal King Medjool, amber-caramel Sukkari, and artisan stuffed dates delivered fresh in airtight luxury packaging.
        </motion.p>
      </section>

      {/* Interactive Category Filter Bar & Live Search */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-12">
        <div className="glass-card p-4 md:p-6 border border-stone-900/5 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeFilter === filter 
                    ? 'bg-lime text-white shadow-md shadow-lime/25 scale-[1.02]' 
                    : 'bg-white/80 text-stone-600 hover:bg-stone-900 hover:text-white border border-stone-900/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full lg:w-auto">
            {/* Live Search Input */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-full border border-stone-900/10 shadow-inner w-full sm:w-64">
              <Search size={16} className="text-stone-400 shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search variety or weight..." 
                className="bg-transparent text-xs font-medium focus:outline-none text-stone-900 placeholder:text-stone-400 w-full"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-stone-400 hover:text-stone-700 text-xs font-bold px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-stone-900/10 text-xs font-semibold text-stone-700">
              <SlidersHorizontal size={14} className="text-lime" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Caliber</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters / Results Count */}
        <div className="mt-4 flex justify-between items-center text-xs text-stone-500 px-2">
          <span>
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> varieties in{' '}
            <strong className="text-lime">{activeFilter}</strong>
          </span>
          {(activeFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="text-lime font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* Product Grid Section — Strictly Products */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart} 
                onOpenDetails={setSelectedProduct} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-32 glass-card p-12 border border-stone-900/5 my-8">
            <h3 className="text-2xl font-serif text-stone-800 italic mb-3">No matching date harvest found</h3>
            <p className="text-sm text-stone-500 mb-6">Try adjusting your search terms or category filter to find the variety you need.</p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="px-8 py-3.5 bg-[#0D2818] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-lime transition-all"
            >
              View All Products
            </button>
          </div>
        )}
      </section>

      {/* Product Quick View Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
      />
    </div>
  );
}
