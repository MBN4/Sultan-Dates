'use client';

import { useEffect, useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Layers,
  AlertCircle,
  Eye,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  badge?: string;
}

interface Product {
  id: string;
  name: string;
  arabicName?: string;
  category: string;
  price: number;
  originalPrice?: number;
  weight: string;
  availableWeights?: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  origin: string;
  grade: string;
  flavorProfile: string;
  description: string;
  longDescription?: string;
  images: string[];
  nutritionHighlights?: string[];
  storageAdvice?: string;
}

const emptyProduct: Product = {
  id: '',
  name: '',
  arabicName: '',
  category: 'Ajwa Al-Madinah',
  price: 4500,
  weight: '1000g',
  availableWeights: ['1 kg', '500 gm', '250 gm'],
  rating: 4.9,
  reviewsCount: 12,
  inStock: true,
  isBestSeller: false,
  isNew: true,
  origin: 'Medina Al-Munawwarah, Saudi Arabia',
  grade: 'Royal VIP Grade-A+',
  flavorProfile: 'Rich caramel, subtle honey, prune undertones',
  description: 'Hand-picked luxury Saudi dates at peak ripeness.',
  longDescription: '',
  images: ['/assets/images/products/honey/honey1.png'],
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>(emptyProduct);
  const [weightInput, setWeightInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  // Category modal states
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [newCatId, setNewCatId] = useState('');
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error(e);
      showToast('Failed to load products data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentProduct({
      ...emptyProduct,
      category: categories.length > 0 ? categories[0].name : 'Ajwa Al-Madinah',
      id: `date-${Date.now().toString().slice(-4)}`
    });
    setWeightInput('1 kg, 500 gm, 250 gm');
    setImageInput('/assets/images/products/honey/honey1.png');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setIsEditing(true);
    setCurrentProduct(p);
    setWeightInput(p.availableWeights ? p.availableWeights.join(', ') : '1 kg, 500 gm, 250 gm');
    setImageInput(p.images && p.images.length > 0 ? p.images[0] : '');
    setIsModalOpen(true);
  };

  const handleToggleStock = async (product: Product) => {
    const updated = { ...product, inStock: !product.inStock };
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: updated }),
      });
      if (res.ok) {
        setProducts(products.map(p => (p.id === product.id ? updated : p)));
        showToast(`Updated stock status for ${product.name}`);
      } else {
        showToast('Failed to update stock', 'error');
      }
    } catch {
      showToast('Error updating stock', 'error');
    }
  };

  const handleToggleBestSeller = async (product: Product) => {
    const updated = { ...product, isBestSeller: !product.isBestSeller };
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: updated }),
      });
      if (res.ok) {
        setProducts(products.map(p => (p.id === product.id ? updated : p)));
        showToast(`Toggled Best Seller for ${product.name}`);
      }
    } catch {
      showToast('Error updating product', 'error');
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}&type=product`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
        showToast(`Deleted ${name} from catalog`);
      } else {
        showToast('Failed to delete product', 'error');
      }
    } catch {
      showToast('Error deleting product', 'error');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalWeights = weightInput.split(',').map(s => s.trim()).filter(Boolean);
    const finalImages = imageInput.split(',').map(s => s.trim()).filter(Boolean);

    const productPayload: Product = {
      ...currentProduct,
      price: Number(currentProduct.price) || 0,
      originalPrice: currentProduct.originalPrice ? Number(currentProduct.originalPrice) : undefined,
      availableWeights: finalWeights.length > 0 ? finalWeights : ['1 kg'],
      images: finalImages.length > 0 ? finalImages : ['/assets/images/products/honey/honey1.png'],
    };

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productPayload }),
      });

      const resData = await res.json();
      if (res.ok) {
        if (isEditing) {
          setProducts(products.map(p => (p.id === productPayload.id ? productPayload : p)));
          showToast(`Saved changes to ${productPayload.name}`);
        } else {
          setProducts([productPayload, ...products]);
          showToast(`Added ${productPayload.name} to catalog`);
        }
        setIsModalOpen(false);
      } else {
        showToast(resData.error || 'Failed to save product', 'error');
      }
    } catch {
      showToast('Network error saving product', 'error');
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const catId = newCatId.trim() || newCatName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newCategory: Category = {
      id: catId,
      name: newCatName.trim(),
      description: newCatDesc.trim(),
    };

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'category', category: newCategory }),
      });
      const data = await res.json();
      if (res.ok) {
        setCategories([...categories, newCategory]);
        showToast(`Category "${newCategory.name}" added`);
        setIsCatModalOpen(false);
        setNewCatId('');
        setNewCatName('');
        setNewCatDesc('');
      } else {
        showToast(data.error || 'Failed to add category', 'error');
      }
    } catch {
      showToast('Error adding category', 'error');
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Existing products with this category will remain.`)) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}&type=category`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
        showToast(`Deleted category "${name}"`);
      }
    } catch {
      showToast('Error deleting category', 'error');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.arabicName && p.arabicName.includes(searchQuery)) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium border animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === 'success'
              ? 'bg-[#0d2a19] text-emerald-300 border-emerald-500/30'
              : 'bg-red-950 text-red-300 border-red-500/30'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
            <span>Product &amp; Catalog Management</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#4E9200]/20 text-[#4E9200] font-sans font-semibold border border-[#4E9200]/30">
              {products.length} Items
            </span>
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Modify date varieties, prices, weight tiers, stock levels, and assign categories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === 'products' ? (
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4E9200] to-[#3E7500] hover:from-[#5aa800] hover:to-[#468400] text-white text-xs font-medium shadow-lg shadow-[#4E9200]/25 transition-all"
            >
              <Plus size={15} />
              <span>Add New Product</span>
            </button>
          ) : (
            <button
              onClick={() => setIsCatModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#997415] text-white text-xs font-medium shadow-lg shadow-[#C59B27]/25 transition-all"
            >
              <Plus size={15} />
              <span>Add Category</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'products'
              ? 'bg-[#4E9200] text-white shadow-md'
              : 'text-stone-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Package size={15} />
          <span>All Products ({products.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'categories'
              ? 'bg-[#C59B27] text-white shadow-md'
              : 'text-stone-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers size={15} />
          <span>Categories &amp; Collections ({categories.length})</span>
        </button>
      </div>

      {activeTab === 'products' ? (
        <>
          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Search products by name, Arabic or category..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09170f] border border-white/10 text-white placeholder-stone-500 text-xs focus:outline-none focus:ring-2 focus:ring-[#4E9200]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-white/20 text-white font-semibold'
                    : 'bg-white/5 text-stone-400 hover:text-white'
                }`}
              >
                All
              </button>
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === c.name
                      ? 'bg-[#4E9200] text-white font-semibold'
                      : 'bg-white/5 text-stone-400 hover:text-white'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-[#09170f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-stone-400 font-semibold uppercase tracking-wider">
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Base Price</th>
                    <th className="p-4">Weight / Variants</th>
                    <th className="p-4 text-center">Stock</th>
                    <th className="p-4 text-center">Best Seller</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-stone-400">
                        Loading products catalog...
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-stone-400">
                        No products found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                        {/* Product Info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                              <img
                                src={product.images && product.images.length > 0 ? product.images[0] : '/assets/images/placeholder.svg'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white text-sm">{product.name}</span>
                                {product.isNew && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#C59B27]/20 text-[#C59B27] border border-[#C59B27]/30">
                                    NEW
                                  </span>
                                )}
                              </div>
                              {product.arabicName && (
                                <span className="text-[11px] text-[#C59B27] font-serif block">{product.arabicName}</span>
                              )}
                              <span className="text-[10px] text-stone-500 block font-mono">ID: {product.id}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg bg-white/5 text-stone-300 border border-white/10 font-medium">
                            {product.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="p-4">
                          <div>
                            <span className="text-white font-bold text-sm">Rs {product.price?.toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="text-stone-500 line-through text-[10px] ml-1.5">
                                Rs {product.originalPrice?.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-400 block">{product.grade}</span>
                        </td>

                        {/* Variants */}
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {product.availableWeights?.map(w => (
                              <span key={w} className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-stone-300">
                                {w}
                              </span>
                            )) || <span className="text-stone-500">{product.weight}</span>}
                          </div>
                        </td>

                        {/* Stock Toggle */}
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleToggleStock(product)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${
                              product.inStock
                                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                                : 'bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25'
                            }`}
                          >
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>

                        {/* Best Seller Toggle */}
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleToggleBestSeller(product)}
                            className={`p-1.5 rounded-lg transition-all ${
                              product.isBestSeller
                                ? 'bg-[#C59B27]/20 text-[#C59B27] border border-[#C59B27]/40'
                                : 'bg-white/5 text-stone-500 hover:text-stone-300'
                            }`}
                            title="Toggle Royal Best Seller"
                          >
                            <Sparkles size={16} />
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(product)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-all border border-white/10"
                              title="Edit product"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id, product.name)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all border border-red-500/20"
                              title="Delete product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Categories Management View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-[#09170f] border border-white/10 flex flex-col justify-between hover:border-[#C59B27]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-stone-400 bg-white/5 px-2 py-0.5 rounded">
                    ID: {cat.id}
                  </span>
                  <button
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <h3 className="text-base font-semibold text-white">{cat.name}</h3>
                <p className="text-xs text-stone-400 mt-1">{cat.description || 'No description added.'}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-stone-400 flex items-center justify-between">
                <span>Products in Category:</span>
                <span className="text-white font-bold">
                  {products.filter(p => p.category === cat.name).length}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0b1b12] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-white">
                  {isEditing ? `Edit: ${currentProduct.name}` : 'Add New Date Variety'}
                </h2>
                <span className="text-xs text-[#C59B27]">Royal Product Catalog Form</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 text-stone-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1.5">Product ID (Unique Slug)</label>
                  <input
                    type="text"
                    required
                    disabled={isEditing}
                    value={currentProduct.id}
                    onChange={e => setCurrentProduct({ ...currentProduct, id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1.5">Category</label>
                  <select
                    value={currentProduct.category}
                    onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#09170f] border border-white/10 text-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1.5">Product Name (English)</label>
                  <input
                    type="text"
                    required
                    value={currentProduct.name}
                    onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1.5">Arabic Name (Optional)</label>
                  <input
                    type="text"
                    value={currentProduct.arabicName || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, arabicName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1.5">Base Price (Rs)</label>
                  <input
                    type="number"
                    required
                    value={currentProduct.price}
                    onChange={e => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1.5">Original / Strikethrough Price (Rs)</label>
                  <input
                    type="number"
                    value={currentProduct.originalPrice || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1.5">Default Net Weight</label>
                  <input
                    type="text"
                    value={currentProduct.weight}
                    onChange={e => setCurrentProduct({ ...currentProduct, weight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">
                  Available Weight Options (Comma separated)
                </label>
                <input
                  type="text"
                  value={weightInput}
                  onChange={e => setWeightInput(e.target.value)}
                  placeholder="1 kg, 500 gm, 250 gm"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1.5">Grade / Classification</label>
                  <input
                    type="text"
                    value={currentProduct.grade || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, grade: e.target.value })}
                    placeholder="Royal VIP Grade-A+"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1.5">Provenance / Origin</label>
                  <input
                    type="text"
                    value={currentProduct.origin || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, origin: e.target.value })}
                    placeholder="Medina Al-Munawwarah, Saudi Arabia"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">Flavor Profile</label>
                <input
                  type="text"
                  value={currentProduct.flavorProfile || ''}
                  onChange={e => setCurrentProduct({ ...currentProduct, flavorProfile: e.target.value })}
                  placeholder="Rich caramel, subtle honey, prune undertones"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">Image Paths (Comma separated or URL)</label>
                <input
                  type="text"
                  value={imageInput}
                  onChange={e => setImageInput(e.target.value)}
                  placeholder="/assets/images/products/honey/honey1.png"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={currentProduct.description}
                  onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentProduct.inStock}
                    onChange={e => setCurrentProduct({ ...currentProduct, inStock: e.target.checked })}
                    className="rounded text-[#4E9200] focus:ring-[#4E9200]"
                  />
                  <span className="text-stone-300 font-medium">In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentProduct.isBestSeller || false}
                    onChange={e => setCurrentProduct({ ...currentProduct, isBestSeller: e.target.checked })}
                    className="rounded text-[#C59B27] focus:ring-[#C59B27]"
                  />
                  <span className="text-stone-300 font-medium">Royal Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentProduct.isNew || false}
                    onChange={e => setCurrentProduct({ ...currentProduct, isNew: e.target.checked })}
                    className="rounded text-[#4E9200] focus:ring-[#4E9200]"
                  />
                  <span className="text-stone-300 font-medium">New Harvest</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4E9200] to-[#3E7500] text-white font-semibold shadow-lg shadow-[#4E9200]/25"
                >
                  {isEditing ? 'Save Product Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1b12] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h2 className="text-lg font-serif font-bold text-white">Add New Category</h2>
              <button onClick={() => setIsCatModalOpen(false)} className="text-stone-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Medjool Royal"
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Slug / ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. medjool-royal"
                  value={newCatId}
                  onChange={e => setNewCatId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description of this collection..."
                  value={newCatDesc}
                  onChange={e => setNewCatDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C59B27] text-white font-semibold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
