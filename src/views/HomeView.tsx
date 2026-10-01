import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { TrustBand } from '../components/TrustBand';
import { ProductCard } from '../components/ProductCard';

export const HomeView: React.FC = () => {
  const { navigateTo } = useCart();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'coffee' | 'honey' | 'fruits'>('all');

  const featuredProducts = PRODUCTS.filter((p) => {
    if (activeCategoryFilter === 'coffee') {
      return p.category === 'ground-coffee' || p.category === 'roasted-beans' || p.category === 'chewable';
    }
    if (activeCategoryFilter === 'honey') {
      return p.category === 'honey';
    }
    if (activeCategoryFilter === 'fruits') {
      return p.category === 'dried-fruits';
    }
    return p.featured;
  }).slice(0, 6);

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION WITH REAL HERO BACKGROUND IMAGE BEHIND HEADING */}
      <section className="relative min-h-[92vh] flex items-center justify-center text-[#F9F7F2] overflow-hidden">
        {/* Real Hero Image Asset - Fast WebP with Eager LCP Loading */}
        <img
          src="/images/hero_coffee_estate_1790760219094.webp"
          alt="Ntamba Coffee Estate and Single-Origin Roast"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/hero_coffee_estate_1790760219094.jpg';
          }}
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 transform transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Luxury Dark Gradient Overlays for Peak Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-[#1C120C]/80 to-black/85 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140D08] via-transparent to-black/60 z-10" />

        {/* Inner Content Container Following the 8px Grid: 16px/20px mobile -> 32px tablet -> 48px/64px desktop */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 text-center py-20 sm:py-28">
          
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[11px] sm:text-[12px] font-bold text-amber-300 tracking-wider uppercase mb-6 sm:mb-8 border border-white/20 shadow-lg font-ui max-w-[90vw] truncate">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#2D5A27] animate-pulse shrink-0" />
            <span className="truncate">Kyantamba Estate · 385-Acre Circular Agroecology</span>
          </div>

          {/* Elegant Bold Serif Heading in Lora with fluid mobile-to-desktop scale */}
          <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.12] sm:leading-[1.08] mb-5 sm:mb-6 text-balance drop-shadow-2xl">
            Premium Ugandan Coffee.<br />
            <span className="text-[#D4A017] drop-shadow-[0_4px_24px_rgba(212,160,23,0.35)] font-extrabold italic">
              Rooted in Regenerative Agroecology.
            </span>
          </h1>

          {/* Optimal Reading Line Length: 45-75 characters per line (max-w-[65ch]) */}
          <p className="text-base sm:text-lg lg:text-xl text-stone-200 max-w-[65ch] mx-auto font-normal leading-[1.65] mb-10 text-balance drop-shadow-md">
            Single-farm Natural Robusta, raw multi-floral farm honey, and sun-dried tropical fruits. Cultivated with zero waste, solar and biogas powered, and export-ready for discerning roasters and homes worldwide.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-9 py-4 text-xs font-bold uppercase tracking-widest text-[#2A1E17] bg-[#D4A017] hover:bg-[#e6b01e] transition-all duration-300 rounded-lg shadow-xl hover:-translate-y-0.5 active:translate-y-0 font-ui"
            >
              Shop Retail Collection
            </button>
            <button
              onClick={() => navigateTo('wholesale')}
              className="w-full sm:w-auto px-9 py-4 text-xs font-bold uppercase tracking-widest text-white border-2 border-white/40 hover:bg-white/15 backdrop-blur-md transition-all duration-300 rounded-lg hover:-translate-y-0.5 font-ui"
            >
              B2B Wholesale & Export
            </button>
          </div>

          {/* Key Quick Stats */}
          <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-300 text-xs">
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="block font-heading text-2xl sm:text-3xl font-bold text-white mb-0.5">385 Acres</span>
              <span className="text-stone-300 font-medium">Single-Farm Estate</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="block font-heading text-2xl sm:text-3xl font-bold text-white mb-0.5">84.5+</span>
              <span className="text-stone-300 font-medium">Fine Robusta Score</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="block font-heading text-2xl sm:text-3xl font-bold text-white mb-0.5">100%</span>
              <span className="text-stone-300 font-medium">Zero-Waste Circular</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="block font-heading text-2xl sm:text-3xl font-bold text-white mb-0.5">EUDR</span>
              <span className="text-stone-300 font-medium">GPS Traceability</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TRUST BAND */}
      <TrustBand />

      {/* 3. DYNAMIC CATEGORY SHOWCASE WITH REAL PRODUCT PHOTOGRAPHY */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2D5A27] font-ui">
              The Ntamba Ecosystem
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E17] mt-2">
              Three Pillars of Kyantamba Agroecology
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-[50ch] mt-4 md:mt-0 leading-relaxed font-normal">
            By integrating coffee shrubs with bee pollination hives and tropical fruit trees, our circular model eliminates agricultural waste while multiplying farmer incomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Single-Farm Robusta with Real Image */}
          <div
            onClick={() => {
              setActiveCategoryFilter('coffee');
              navigateTo('shop');
            }}
            className="group relative bg-[#2A1E17] text-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between border border-stone-800"
          >
            {/* Real Product Photo */}
            <div className="relative h-64 overflow-hidden bg-stone-900">
              <img
                src="/images/products/1kg-roasted-coffee-beans.webp"
                alt="Ntamba Roasted Coffee Beans"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/products/1kg-roasted-coffee-beans.png';
                }}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1E17] via-transparent to-black/30" />
              <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 font-ui">
                01 · The Flagship
              </span>
            </div>

            <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-2xl font-bold mb-2 text-white">Ntamba Coffee</h3>
                <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed">
                  Natural Robusta grown under native shade trees. Medium-roasted for rich dark cacao, toasted walnut, and golden crema notes. Available in 1kg, 500g, 250g, and 100g bags.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-white transition-colors font-ui">
                <span>Explore 9 Coffee SKUs</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>

          {/* Card 2: Apiary Honey with Real Image */}
          <div
            onClick={() => {
              setActiveCategoryFilter('honey');
              navigateTo('shop');
            }}
            className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between border border-amber-200"
          >
            {/* Real Honey Photo */}
            <div className="relative h-64 overflow-hidden bg-amber-50">
              <img
                src="/images/products/ntamba-honey-premium-jar-650g.webp"
                alt="Ntamba Pure Natural Honey"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/products/ntamba-honey-premium-jar-650g.jpg';
                }}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
              <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider text-[#D4A017] bg-white/90 backdrop-blur-md px-3 py-1 rounded-md border border-amber-200 shadow-sm font-ui">
                02 · The Pollinators
              </span>
            </div>

            <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#2A1E17] mb-2">Pure Farm Honey</h3>
                <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                  Raw, unfiltered honey collected from our on-farm hives that pollinate the coffee blossoming canopy. Available in 650g glass jars, 490g squeeze packs, and 150g table jars.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-[#2A1E17] group-hover:text-[#D4A017] transition-colors font-ui">
                <span>Explore 3 Honey Jars</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>

          {/* Card 3: FruitTreat Dried Fruits with Real Image */}
          <div
            onClick={() => {
              setActiveCategoryFilter('fruits');
              navigateTo('shop');
            }}
            className="group relative bg-[#1B3B17] text-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between border border-emerald-900"
          >
            {/* Real Dried Fruits Photo */}
            <div className="relative h-64 overflow-hidden bg-stone-900">
              <img
                src="/images/fruits/tropical-dried-fruits.webp"
                alt="FruitTreat Tropical Mixed Dried Fruits"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/fruits/tropical-dried-fruits.jpg';
                }}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B17] via-transparent to-black/25 pointer-events-none" />
              <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 font-ui z-10">
                03 · Value Addition
              </span>
            </div>

            <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-2xl font-bold mb-2 text-white">FruitTreat Snacks</h3>
                <p className="text-xs sm:text-[13px] text-stone-200 leading-relaxed">
                  Gently dehydrated Pineapple, Mango, Jackfruit, Apple Banana, and Mixed Fruit in 60g metallic gold pouches. Zero sugar added, gluten-free, healthy artisan snacks.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-white transition-colors font-ui">
                <span>Explore 5 Fruit Treats</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SPOTLIGHT */}
      <section className="py-20 bg-[#F4EFE6]/70 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2D5A27] font-ui">
                Single-Unit & Carton Options
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E17] mt-1">
                Featured Storefront SKUs
              </h2>
            </div>

            {/* Segmented Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg text-xs font-semibold self-start sm:self-auto font-ui">
              <button
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-3.5 py-1.5 rounded-md transition-colors ${
                  activeCategoryFilter === 'all'
                    ? 'bg-white text-[#2A1E17] shadow-sm font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Featured
              </button>
              <button
                onClick={() => setActiveCategoryFilter('coffee')}
                className={`px-3.5 py-1.5 rounded-md transition-colors ${
                  activeCategoryFilter === 'coffee'
                    ? 'bg-white text-[#2A1E17] shadow-sm font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Coffee
              </button>
              <button
                onClick={() => setActiveCategoryFilter('honey')}
                className={`px-3.5 py-1.5 rounded-md transition-colors ${
                  activeCategoryFilter === 'honey'
                    ? 'bg-white text-[#2A1E17] shadow-sm font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Honey
              </button>
              <button
                onClick={() => setActiveCategoryFilter('fruits')}
                className={`px-3.5 py-1.5 rounded-md transition-colors ${
                  activeCategoryFilter === 'fruits'
                    ? 'bg-white text-[#2A1E17] shadow-sm font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Dried Fruits
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-14">
            <button
              onClick={() => navigateTo('shop')}
              className="px-9 py-4 text-xs font-bold uppercase tracking-widest text-white bg-[#2A1E17] hover:bg-[#D4A017] hover:text-[#2A1E17] transition-all rounded-lg shadow-md font-ui"
            >
              Browse Complete 17-SKU Catalog
            </button>
          </div>

        </div>
      </section>

      {/* 5. B2B COMMERCIAL WHOLESALE & EXPORT CALLOUT */}
      <section className="py-24 bg-[#2A1E17] text-[#F9F7F2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D4A017]/20 text-[#D4A017] text-[11px] font-bold uppercase tracking-wider font-ui">
                <span>🏭 Commercial Export Division</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Sourcing for Your Roastery or Distribution Network?
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal max-w-[65ch]">
                Whether you need green micro-lots (Screen 18 Natural Robusta), pallet loads of roasted whole beans, bulk raw apiary honey drums, or wholesale cartons of FruitTreat, Ntamba offers reliable global shipping under FOB Mombasa or CIF European ports.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800">
                  <span className="text-amber-400 block font-bold mb-1">Cupping Samples</span>
                  <span className="text-stone-400 text-[11px]">250g / 500g via DHL Express (Credited against first container)</span>
                </div>
                <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800">
                  <span className="text-amber-400 block font-bold mb-1">EU Distribution</span>
                  <span className="text-stone-400 text-[11px]">DARAJA UG in Günzburg, Germany for direct European imports</span>
                </div>
                <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800">
                  <span className="text-amber-400 block font-bold mb-1">Split Terms</span>
                  <span className="text-stone-400 text-[11px]">30% down to initiate milling, 70% against Bill of Lading (B/L)</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigateTo('wholesale')}
                  className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#2A1E17] bg-[#D4A017] hover:bg-[#c29213] rounded-lg transition-all shadow-md text-center font-ui"
                >
                  Enter B2B Wholesale Portal
                </button>
                <button
                  onClick={() => navigateTo('impact')}
                  className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-stone-300 hover:text-white border border-stone-700 hover:bg-stone-800 rounded-lg transition-all text-center font-ui"
                >
                  Read Farm Origin & EUDR Story
                </button>
              </div>
            </div>

            {/* Cupping Process Box with Real Packaging Image */}
            <div className="lg:col-span-5 bg-stone-900/95 border border-stone-800 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="h-44 w-full rounded-xl overflow-hidden mb-4 relative">
                <img
                  src="/images/products/1kg-ground-coffee.webp"
                  alt="Ntamba Roasted Coffee Specimen"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/products/1kg-ground-coffee.jpg';
                  }}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#2D5A27] text-white text-[10px] font-bold uppercase tracking-wider font-ui">
                  Direct Farm Specimen
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-white border-b border-stone-800 pb-3">
                Cupping Sample Pipeline
              </h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex gap-4">
                  <span className="font-mono text-[#D4A017] font-bold text-sm">01</span>
                  <div>
                    <h4 className="font-bold text-white">Roastery Profile Selection</h4>
                    <p className="text-stone-400 mt-0.5">Specify moisture tolerances, screen size, and green vs roasted roast profile.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="font-mono text-[#D4A017] font-bold text-sm">02</span>
                  <div>
                    <h4 className="font-bold text-white">DHL Direct Air Dispatch</h4>
                    <p className="text-stone-400 mt-0.5">Air freighted within 48 hours with full phytosanitary & EUDR documents.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="font-mono text-[#D4A017] font-bold text-sm">03</span>
                  <div>
                    <h4 className="font-bold text-white">Sample Cost Deducted</h4>
                    <p className="text-stone-400 mt-0.5">All courier & lab preparation charges are 100% credited on contract confirmation.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigateTo('wholesale')}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#2D5A27] hover:bg-[#23471f] rounded-lg transition-colors text-center shadow font-ui"
              >
                Request Cupping Sample Kit
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. EDITORIAL STORY SECTION: THE 385-ACRE REGENERATIVE SOUL */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2D5A27] font-ui">
              Commercial Subsidiary of Quality International Foundation
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#2A1E17] leading-tight">
              Earthy Luxury Rooted in Kyantamba Village
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-[60ch]">
              Ntamba Processors was founded with one immutable objective: to elevate rural farming from subsistence to a commercialized, export-grade powerhouse while conserving our natural biosphere.
            </p>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-[60ch]">
              On our 385-acre estate in Mbarara District, Western Uganda, we operate a <strong>zero-waste circular bio-loop</strong>. Coffee husks feed organic compost and biogas digesters; solar panels power our sorting lines; and apiaries provide both natural pollination and raw medicinal honey.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-stone-700 font-ui">
              <span className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <span className="text-[#2D5A27]">✓</span> Female-Led Leadership
              </span>
              <span className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <span className="text-[#2D5A27]">✓</span> Youth Agronomy Training
              </span>
              <span className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <span className="text-[#2D5A27]">✓</span> Closed-Loop Biogas & Solar
              </span>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('impact')}
                className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#2A1E17] hover:bg-[#D4A017] hover:text-[#2A1E17] rounded-lg transition-all shadow font-ui"
              >
                Read The Full Impact Journey
              </button>
            </div>
          </div>

          {/* Asymmetrical Editorial Showcase with Real Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-stone-200">
              <img
                src="/images/background-final.webp"
                alt="Kyantamba Circular Agroecology Estate & Processing Facilities"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/background-final.png';
                }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold mb-1 font-ui">
                  Circular Agronomy
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
                  Zero Waste, 100% Value Addition
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-200 leading-relaxed max-w-[55ch]">
                  "We recognized that smallholder farmers lacked localized processing machinery and direct export relationships. We built Ntamba Processors’ facilities to bridge that exact gap, creating an independent enterprise rooted in regenerative agroecology."
                </p>
                <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Ntamba Processors Limited</span>
                  <span className="text-amber-300 font-medium">Kyantamba, Western Uganda</span>
                </div>
              </div>
            </div>

            {/* Overlapping Glass Card */}
            <div className="absolute -bottom-6 -left-4 bg-white/95 backdrop-blur-md border border-stone-200 p-4 rounded-xl shadow-xl max-w-xs hidden sm:block">
              <span className="text-[10px] font-bold text-[#2D5A27] uppercase tracking-wider block font-ui">
                Traceability Standard
              </span>
              <p className="text-xs text-stone-800 font-bold mt-1">
                Every bean and pouch traced down to GPS coordinates in Kyantamba Village.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. DISPATCHES FROM THE ESTATE & QIF RESEARCH (BLOG TEASER) */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#2D5A27] text-xs font-bold uppercase tracking-wider mb-2 font-ui">
                <span>📖 Field Research & Publications</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E17]">
                Stories from Kyantamba Estate
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('blog')}
                className="px-5 py-2.5 rounded-lg bg-[#2A1E17] hover:bg-[#D4A017] hover:text-[#2A1E17] text-white text-xs font-bold uppercase tracking-wider transition-all font-ui shadow-sm"
              >
                Read All 10 Articles →
              </button>
              <a
                href="https://qualityinternationalfoundation.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
              >
                <span>QIF Foundation</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Story 1 */}
            <div
              onClick={() => navigateTo('blog')}
              className="group bg-[#F9F7F2] rounded-2xl overflow-hidden border border-stone-200/80 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden bg-stone-900 relative">
                  <img
                    src="/images/qif/coffee-image-hero.png"
                    alt="From Farm to Cup"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero_coffee_estate_1790760219094.webp';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-[#2A1E17] text-[10px] font-bold px-2 py-0.5 rounded font-ui shadow">
                    Agroecology & Origin
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-[#2A1E17] group-hover:text-[#D4A017] transition-colors leading-snug mb-2">
                    From Farm to Cup: The Journey of Ntamba Coffee Beans
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    100% natural, single-farm Robusta cultivated in Kyantamba Village by Quality International Foundation and roasted to medium-dark perfection.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 flex justify-between items-center text-xs font-bold text-[#2A1E17] group-hover:text-[#D4A017] transition-colors font-ui">
                <span>Read Story</span>
                <span>→</span>
              </div>
            </div>

            {/* Story 2 */}
            <div
              onClick={() => navigateTo('blog')}
              className="group bg-[#F9F7F2] rounded-2xl overflow-hidden border border-stone-200/80 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden bg-stone-900 relative">
                  <img
                    src="/images/qif/coffee-beans.png"
                    alt="Savor the Taste of Uganda"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/products/1kg-roasted-coffee-beans.webp';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-[#2A1E17] text-[10px] font-bold px-2 py-0.5 rounded font-ui shadow">
                    Coffee Science
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-[#2A1E17] group-hover:text-[#D4A017] transition-colors leading-snug mb-2">
                    Savor the Taste of Uganda: Screen 18 Fine Robusta
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    Discover why QIF and Ntamba’s Medium Dark Roast delivers deep dark cacao, rich crema persistence, and authentic Ugandan flavor.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 flex justify-between items-center text-xs font-bold text-[#2A1E17] group-hover:text-[#D4A017] transition-colors font-ui">
                <span>Read Story</span>
                <span>→</span>
              </div>
            </div>

            {/* Story 3 */}
            <div
              onClick={() => navigateTo('blog')}
              className="group bg-[#F9F7F2] rounded-2xl overflow-hidden border border-stone-200/80 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden bg-stone-900 relative">
                  <img
                    src="/images/qif/woman-coffee-harvest.png"
                    alt="Capacity Building & Farmer Empowerment"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/background-final.webp';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-[#2A1E17] text-[10px] font-bold px-2 py-0.5 rounded font-ui shadow">
                    Social Impact
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-[#2A1E17] group-hover:text-[#D4A017] transition-colors leading-snug mb-2">
                    Capacity Building & Training in Regenerative Agroecology
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    How Quality International Foundation empowers 180+ smallholder families with soil conservation, organic manure, and market access.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 flex justify-between items-center text-xs font-bold text-[#2A1E17] group-hover:text-[#D4A017] transition-colors font-ui">
                <span>Read Story</span>
                <span>→</span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
