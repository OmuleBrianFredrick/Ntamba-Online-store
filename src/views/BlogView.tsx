import React, { useState, useMemo } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const BlogView: React.FC = () => {
  const { navigateTo } = useCart();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Agroecology & Origin', 'Coffee Science', 'B2B & Export', 'Social Impact', 'Product Innovation'];

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activePost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.id === selectedPostId) || null;
  }, [selectedPostId]);

  // Related products for the active reading post
  const relatedProducts = useMemo(() => {
    if (!activePost) return [];
    return PRODUCTS.filter((p) => activePost.content.relatedProductIds.includes(p.id));
  }, [activePost]);

  // Featured post for the top showcase
  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2A1E17] pb-24">
      
      {/* 1. HERO HEADER */}
      <section className="relative bg-[#2A1E17] text-[#F9F7F2] py-20 sm:py-24 overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <img
            src="/images/hero_coffee_estate_1790760219094.webp"
            alt="Kyantamba Coffee Estate Agroecology"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1E17] via-transparent to-black/40" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 text-center">
          
          {/* Standalone Enterprise Badge with Mother Foundation Heritage */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-amber-300 border border-white/20 mb-6 font-ui shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white">Ntamba Processors · Standalone Enterprise</span>
            <span className="text-stone-400 hidden sm:inline">|</span>
            <a
              href="https://qualityinternationalfoundation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-white underline font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Incubated by Quality International Foundation</span>
              <span>↗</span>
            </a>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
            Stories from Ntamba Processors: <br />
            <span className="text-[#D4A017] italic">Agroecology, Coffee Science & Community</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-[68ch] mx-auto leading-relaxed font-normal text-balance mb-8">
            In-depth dispatches, agronomic research, roasting profiles, and export intelligence from Ntamba Processors’ independent 385-acre circular estate in Kyantamba Village and Kampala export facilities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-stone-400">
            <span>• 10 Independent Publications</span>
            <span>• Verified EUDR Compliance</span>
            <span>• Screen 18 Specialty Robusta</span>
            <span>• 
              <a
                href="https://qualityinternationalfoundation.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-300 ml-1 text-stone-300"
              >
                Mother Foundation: QIF ↗
              </a>
            </span>
          </div>

        </div>
      </section>

      {/* 2. SEARCH & CATEGORY FILTER BAR */}
      <section className="sticky top-20 z-30 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-stone-200/90 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all touch-manipulation active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-[#2A1E17] text-amber-300 shadow-sm'
                    : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, coffee science, EUDR..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent transition-all shadow-inner"
            />
            <span className="absolute left-3 top-2.5 text-stone-400 text-xs">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-xs text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 2.5 NTAMBA OPERATIONS & FOUNDING PILLARS SHOWCASE */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-12 mt-8">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <img
                  src="/images/qif/qif-logo.png"
                  alt="Quality International Foundation Logo"
                  className="w-10 h-10 object-contain p-1 bg-[#2A1E17] rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D5A27] font-ui block">
                    Ntamba Standalone Operations · Incubated by QIF
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2A1E17]">
                    Integrated Agroecology Pillars Built on Quality International Foundation’s Heritage
                  </h3>
                </div>
              </div>

              <a
                href="https://qualityinternationalfoundation.com/service/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#D4A017] hover:underline inline-flex items-center gap-1 font-ui"
              >
                <span>View Mother Foundation Services</span>
                <span>↗</span>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              
              {/* Program 1 */}
              <a
                href="https://qualityinternationalfoundation.com/project/coffee-processing-packaging-services/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/80 transition-all flex flex-col justify-between text-left"
              >
                <div className="h-24 rounded-xl overflow-hidden mb-2.5 bg-stone-200">
                  <img
                    src="/images/qif/coffee-image.png"
                    alt="Coffee Processing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A27] block">Ntamba Milling</span>
                  <h4 className="font-heading text-xs font-bold text-[#2A1E17] leading-snug group-hover:text-[#D4A017]">
                    Central Processing & Hermetic Packaging
                  </h4>
                </div>
                <span className="text-[10px] text-stone-500 mt-2 flex items-center justify-between font-mono">
                  <span>QIF Heritage</span>
                  <span>↗</span>
                </span>
              </a>

              {/* Program 2 */}
              <a
                href="https://qualityinternationalfoundation.com/project/waste-transformation-organic-manure-cosmetics/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/80 transition-all flex flex-col justify-between text-left"
              >
                <div className="h-24 rounded-xl overflow-hidden mb-2.5 bg-stone-200">
                  <img
                    src="/images/qif/coffee-body-scrub.png"
                    alt="Waste Transformation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A27] block">Ntamba Circular</span>
                  <h4 className="font-heading text-xs font-bold text-[#2A1E17] leading-snug group-hover:text-[#D4A017]">
                    Vermicompost & Natural Cosmetics
                  </h4>
                </div>
                <span className="text-[10px] text-stone-500 mt-2 flex items-center justify-between font-mono">
                  <span>QIF Heritage</span>
                  <span>↗</span>
                </span>
              </a>

              {/* Program 3 */}
              <a
                href="https://qualityinternationalfoundation.com/project/capacity-building-farmer-training-in-regenerative-agriculture/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/80 transition-all flex flex-col justify-between text-left"
              >
                <div className="h-24 rounded-xl overflow-hidden mb-2.5 bg-stone-200">
                  <img
                    src="/images/qif/woman-coffee-harvest.png"
                    alt="Capacity Building"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A27] block">Ntamba Outgrowers</span>
                  <h4 className="font-heading text-xs font-bold text-[#2A1E17] leading-snug group-hover:text-[#D4A017]">
                    Regenerative Capacity Building
                  </h4>
                </div>
                <span className="text-[10px] text-stone-500 mt-2 flex items-center justify-between font-mono">
                  <span>QIF Heritage</span>
                  <span>↗</span>
                </span>
              </a>

              {/* Program 4 */}
              <a
                href="https://qualityinternationalfoundation.com/project/education-and-skilling-for-youth-and-special-needs-children/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/80 transition-all flex flex-col justify-between text-left"
              >
                <div className="h-24 rounded-xl overflow-hidden mb-2.5 bg-stone-200">
                  <img
                    src="/images/qif/education-skilling.png"
                    alt="Education & Skilling"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A27] block">Ntamba Charter</span>
                  <h4 className="font-heading text-xs font-bold text-[#2A1E17] leading-snug group-hover:text-[#D4A017]">
                    Youth & Special Needs Skilling
                  </h4>
                </div>
                <span className="text-[10px] text-stone-500 mt-2 flex items-center justify-between font-mono">
                  <span>QIF Heritage</span>
                  <span>↗</span>
                </span>
              </a>

              {/* Program 5 */}
              <a
                href="https://qualityinternationalfoundation.com/project/market-linkage-services-for-farmers/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/80 transition-all flex flex-col justify-between text-left"
              >
                <div className="h-24 rounded-xl overflow-hidden mb-2.5 bg-stone-200">
                  <img
                    src="/images/qif/market-linkage.png"
                    alt="Market Linkage"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A27] block">Ntamba Direct</span>
                  <h4 className="font-heading text-xs font-bold text-[#2A1E17] leading-snug group-hover:text-[#D4A017]">
                    Global Trade & European Rails
                  </h4>
                </div>
                <span className="text-[10px] text-stone-500 mt-2 flex items-center justify-between font-mono">
                  <span>QIF Heritage</span>
                  <span>↗</span>
                </span>
              </a>

              {/* Program 6 */}
              <a
                href="https://qualityinternationalfoundation.com/project/home-stays-school-tours-and-agro-tourism-experiences/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/80 transition-all flex flex-col justify-between text-left"
              >
                <div className="h-24 rounded-xl overflow-hidden mb-2.5 bg-stone-200">
                  <img
                    src="/images/qif/agro-tourism.png"
                    alt="Agro-Tourism"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A27] block">Ntamba Estate</span>
                  <h4 className="font-heading text-xs font-bold text-[#2A1E17] leading-snug group-hover:text-[#D4A017]">
                    Agro-Tourism & School Tours
                  </h4>
                </div>
                <span className="text-[10px] text-stone-500 mt-2 flex items-center justify-between font-mono">
                  <span>QIF Heritage</span>
                  <span>↗</span>
                </span>
              </a>

            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-12 mt-10">

        {/* 3. FEATURED STORY SPOTLIGHT (Only shown when filter is 'All' and no search active) */}
        {selectedCategory === 'All' && !searchQuery && (
          <div className="mb-14 bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-stone-900">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  loading="eager"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hero_coffee_estate_1790760219094.webp';
                  }}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent lg:hidden" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#D4A017] text-[#2A1E17] text-[11px] font-bold uppercase tracking-wider font-ui shadow">
                  Featured Cover Story
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-3 font-mono">
                    <span className="text-[#2D5A27] font-bold uppercase">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                    <span>•</span>
                    <span>{featuredPost.publishDate}</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2A1E17] mb-3 leading-snug">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[11px] px-2.5 py-1 bg-stone-100 rounded-md text-stone-600 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold text-stone-900 block">{featuredPost.author}</span>
                    <span className="text-stone-500 text-[11px]">{featuredPost.authorRole}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPostId(featuredPost.id)}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#2A1E17] hover:bg-[#D4A017] hover:text-[#2A1E17] rounded-lg transition-all shadow font-ui touch-manipulation"
                  >
                    Read Article →
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 4. POSTS GRID */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-[#2A1E17]">
            {selectedCategory === 'All' ? 'Latest Publications & Articles' : `${selectedCategory} Articles`}
          </h2>
          <span className="text-xs font-mono text-stone-500">
            Showing {filteredPosts.length} of {BLOG_POSTS.length} stories
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
            <span className="text-4xl block mb-3">📖</span>
            <h3 className="font-heading text-xl font-bold text-[#2A1E17] mb-2">No matching articles found</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto mb-6">
              Try adjusting your search terms or select "All" to browse all 10 agroecology and coffee science articles.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-[#2A1E17] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-52 overflow-hidden bg-stone-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/products/1kg-roasted-coffee-beans.webp';
                      }}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-[#2A1E17] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded shadow font-ui">
                      {post.category}
                    </span>

                    <span className="absolute bottom-3 right-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="text-[11px] font-mono text-stone-400 mb-2">
                      {post.publishDate}
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[#2A1E17] group-hover:text-[#D4A017] transition-colors leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-stone-100 text-stone-600 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer / Author */}
                <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-stone-800 block text-[11px]">{post.author}</span>
                    <span className="text-stone-400 text-[10px]">{post.authorRole}</span>
                  </div>
                  <span className="font-semibold text-[#D4A017] group-hover:translate-x-1 transition-transform">
                    Read →
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 5. STANDALONE ENTERPRISE & MOTHER FOUNDATION SPOTLIGHT BANNER */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1F1916] to-[#2A1E17] text-white border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider font-ui">
                <span>🏛 Standalone Enterprise · Incubated by QIF</span>
              </span>

              <h3 className="font-heading text-2xl sm:text-4xl font-bold leading-tight text-white">
                Ntamba Processors: An Independent Agribusiness Rooted in Social Enterprise
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-[68ch]">
                Initially founded and incubated through Quality International Foundation (QIF), Ntamba Processors Limited has transitioned into an independent, self-governing agroecology processor and exporter that stands alone. We independently steward our 385-acre Kyantamba Estate, centralized milling infrastructure, and direct export pipelines while honoring our mother foundation’s enduring commitment to soil restoration and community welfare.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono text-xs">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[#D4A017] block font-bold text-lg">385 Acres</span>
                  <span className="text-stone-400 text-[10px]">Independent Estate</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[#D4A017] block font-bold text-lg">180+</span>
                  <span className="text-stone-400 text-[10px]">Outgrower Network</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[#D4A017] block font-bold text-lg">Standalone</span>
                  <span className="text-stone-400 text-[10px]">Self-Governed Entity</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[#D4A017] block font-bold text-lg">Direct Export</span>
                  <span className="text-stone-400 text-[10px]">EUDR & FOB Mombasa</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-4">
              <a
                href="https://qualityinternationalfoundation.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#2A1E17] bg-[#D4A017] hover:bg-[#e6b01e] rounded-xl shadow-lg transition-all text-center font-ui flex items-center justify-center gap-2"
              >
                <span>Visit Mother Foundation (QIF)</span>
                <span>↗</span>
              </a>

              <button
                type="button"
                onClick={() => navigateTo('wholesale')}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 rounded-xl transition-all text-center font-ui"
              >
                Ntamba B2B Sourcing Inquiries
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* 6. FULL POST READER MODAL */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedPostId(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
          />

          {/* Reading Card */}
          <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 z-10">
            
            {/* Top Close Button Bar */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded-md font-ui">
                  {activePost.category}
                </span>
                <span className="text-stone-400 font-mono">• {activePost.readTime}</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPostId(null)}
                className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Close story reader"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Article Hero Media */}
            <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-stone-900">
              <img
                src={activePost.coverImage}
                alt={activePost.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/hero_coffee_estate_1790760219094.webp';
                }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4A017] block font-bold mb-1">
                  Ntamba Insights · {activePost.publishDate}
                </span>
                <h2 className="font-heading text-2xl sm:text-4xl font-bold leading-tight drop-shadow-md">
                  {activePost.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-200 mt-2 line-clamp-2">
                  {activePost.subtitle}
                </p>
              </div>
            </div>

            {/* Main Reading Flow */}
            <div className="p-6 sm:p-12 space-y-8">
              
              {/* Author Attribution */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#2A1E17] text-amber-300 font-bold flex items-center justify-center text-sm shadow">
                    {activePost.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{activePost.author}</h4>
                    <p className="text-stone-500 text-xs">{activePost.authorRole}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-400 block font-mono">Kyantamba Village</span>
                  <span className="text-xs font-semibold text-[#2D5A27]">Ntamba Standalone Origin</span>
                </div>
              </div>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-stone-800 font-serif leading-relaxed italic border-l-4 border-[#D4A017] pl-5">
                {activePost.content.leadParagraph}
              </p>

              {/* Article Sections */}
              {activePost.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-4 pt-4">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2A1E17]">
                    {section.heading}
                  </h3>

                  {section.body.map((para, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-stone-700 leading-relaxed font-body">
                      {para}
                    </p>
                  ))}

                  {/* Pull Quote */}
                  {section.pullQuote && (
                    <blockquote className="my-6 p-6 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-2xl">
                      <p className="font-heading text-base sm:text-lg text-amber-950 font-bold italic leading-relaxed">
                        "{section.pullQuote}"
                      </p>
                    </blockquote>
                  )}

                  {/* Key Highlights */}
                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 text-xs sm:text-sm space-y-2">
                      <span className="font-bold text-[#2D5A27] uppercase tracking-wider block font-ui">
                        Key Operational Highlights:
                      </span>
                      <ul className="space-y-1.5 text-stone-700">
                        {section.keyPoints.map((pt, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-2">
                            <span className="text-[#D4A017] font-bold">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Inline Image */}
                  {section.inlineImage && (
                    <figure className="my-6 rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                      <img
                        src={section.inlineImage.src}
                        alt={section.inlineImage.alt}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/background-final.webp';
                        }}
                        className="w-full h-64 sm:h-80 object-cover"
                      />
                      <figcaption className="p-3 bg-stone-100 text-[11px] text-stone-600 font-mono text-center">
                        {section.inlineImage.caption}
                      </figcaption>
                    </figure>
                  )}
                </div>
              ))}

              {/* DEDICATED MOTHER ORGANIZATION CALLOUT BOX */}
              <div className="my-10 p-6 sm:p-8 bg-[#2A1E17] text-white rounded-3xl border border-amber-500/30 shadow-xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase font-bold tracking-widest text-[#D4A017] font-ui">
                    Mother Organization Heritage · Quality International Foundation (QIF)
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {activePost.content.qifReference.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-body">
                  {activePost.content.qifReference.description}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                  <span className="text-[11px] text-stone-400 font-mono">
                    Official Portal: qualityinternationalfoundation.com
                  </span>

                  <a
                    href={activePost.content.qifReference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4A017] hover:bg-[#e4ad1b] text-[#2A1E17] font-bold text-xs uppercase tracking-wider font-ui transition-all shadow hover:scale-105"
                  >
                    <span>{activePost.content.qifReference.linkText}</span>
                  </a>
                </div>
              </div>

              {/* RELATED PRODUCTS SPOTLIGHT */}
              {relatedProducts.length > 0 && (
                <div className="pt-8 border-t border-stone-200">
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A27] font-ui">
                      Single-Origin Products Featured in this Story
                    </span>
                    <h3 className="font-heading text-xl font-bold text-[#2A1E17] mt-0.5">
                      Shop Direct from the Kyantamba Agroecology Harvest
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Back */}
              <div className="pt-8 border-t border-stone-200 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setSelectedPostId(null)}
                  className="px-6 py-2.5 rounded-lg border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors font-ui"
                >
                  ← Back to All Articles
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPostId(null);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#2A1E17] text-white text-xs font-bold hover:bg-[#D4A017] hover:text-[#2A1E17] transition-colors font-ui"
                >
                  Browse Storefront
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
