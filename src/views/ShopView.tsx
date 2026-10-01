import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';

export const ShopView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedWeight, setSelectedWeight] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Products (17 SKUs)' },
    { id: 'ground-coffee', label: 'Ground Coffee (4)' },
    { id: 'roasted-beans', label: 'Roasted Beans (4)' },
    { id: 'honey', label: 'Farm Honey (3)' },
    { id: 'dried-fruits', label: 'FruitTreat Dried Fruits (5)' },
    { id: 'chewable', label: 'Chewable Beans (1)' },
  ];

  const weights = ['all', '10 g', '60 g', '100 g', '250 g', '490 g', '500 g', '650 g', '1 kg'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Weight filter
      if (selectedWeight !== 'all' && p.weight.toLowerCase() !== selectedWeight.toLowerCase()) {
        return false;
      }
      // Search query
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.sku.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.unitPriceUGX - b.unitPriceUGX;
      if (sortBy === 'price-desc') return b.unitPriceUGX - a.unitPriceUGX;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedWeight, searchQuery, sortBy]);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
      
      {/* Title & Editorial Description */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-[#2D5A27] font-ui">
          Direct from Kyantamba Estate
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E17] mt-1.5 mb-3">
          The Complete Ntamba Collection
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-[65ch] leading-relaxed">
          Every product is cultivated, harvested, and packaged in Uganda. Toggle between single-unit packs and 12x carton cases for volume retail and office savings.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-sm mb-10 space-y-4">
        
        {/* Row 1: Search & Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, SKU (e.g. NPL01), or note..."
              className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017] focus:bg-white"
            />
            <span className="absolute left-3 top-2.5 text-stone-400 text-xs">🔍</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs">
            <span className="text-stone-500 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 text-stone-800 text-xs font-medium py-2 px-3 rounded-lg cursor-pointer focus:ring-1 focus:ring-[#D4A017]"
            >
              <option value="featured">Featured & Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Tabs (Functional Segmented Buttons with Smooth Mobile Scroll) */}
        <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-semibold text-stone-500 mr-1 shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 touch-manipulation active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[#2A1E17] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Row 3: Weight Filter */}
        <div className="flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar py-1">
          <span className="font-semibold text-stone-500 mr-1 shrink-0">Pack Weight:</span>
          {weights.map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeight(w)}
              className={`px-2.5 py-1 rounded text-xs transition-colors shrink-0 touch-manipulation active:scale-95 ${
                selectedWeight === w
                  ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {w === 'all' ? 'All Sizes' : w}
            </button>
          ))}
        </div>

      </div>

      {/* Active Filter Metrics */}
      <div className="flex justify-between items-center text-xs text-stone-500 mb-6 font-mono">
        <span>Showing {filteredProducts.length} of {PRODUCTS.length} SKUs</span>
        {(selectedCategory !== 'all' || selectedWeight !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedWeight('all');
              setSearchQuery('');
            }}
            className="text-[#D4A017] hover:underline font-semibold"
          >
            Reset All Filters ✕
          </button>
        )}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
          <span className="text-4xl block mb-3">🔍</span>
          <h3 className="font-heading text-lg font-bold text-stone-800">
            No matching products found
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-6">
            Try adjusting your search query or reset the weight and category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedWeight('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A1E17] rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
