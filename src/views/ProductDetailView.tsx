import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductVisual } from '../components/ProductVisual';
import { ProductCard } from '../components/ProductCard';
import { useProductJsonLd, getProductJsonLdSchema } from '../utils/seo';

export const ProductDetailView: React.FC = () => {
  const { selectedProductId, formatPrice, addItem, navigateTo } = useCart();
  const [isCarton, setIsCarton] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeViewMode, setActiveViewMode] = useState<'front' | 'back'>('front');
  const [activeTab, setActiveTab] = useState<'tasting' | 'origin' | 'compliance'>('tasting');
  const [showOriginModal, setShowOriginModal] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const activeImage = selectedImage || product.imageUrl;

  // Inject Product JSON-LD Schema (Markup) into document.head for search engines
  useProductJsonLd(product);
  const jsonLdSchema = getProductJsonLdSchema(product);

  const activePrice = isCarton ? product.cartonPriceUGX : product.unitPriceUGX;

  const handleAddToCart = () => {
    addItem(product, quantity, isCarton);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  // Cross sell pairs
  const crossSellProducts = PRODUCTS.filter((p) => {
    if (product.category === 'ground-coffee' || product.category === 'roasted-beans') {
      return p.category === 'honey' || p.category === 'dried-fruits';
    }
    return p.category === 'ground-coffee' || p.category === 'roasted-beans';
  }).slice(0, 3);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
      {/* Search Engine Structured Data JSON-LD Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 font-medium">
        <button onClick={() => navigateTo('home')} className="hover:text-[#2A1E17]">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-[#2A1E17]">
          Shop
        </button>
        <span>/</span>
        <span className="text-stone-400 capitalize">{product.categoryLabel}</span>
        <span>/</span>
        <span className="text-[#2A1E17] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Split-Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        
        {/* Left Column: Visual Gallery & Interactive Modals */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center">
            
            <ProductVisual
              product={{ ...product, imageUrl: activeImage }}
              view={activeViewMode}
              className="w-full aspect-square max-h-[350px] sm:max-h-[480px]"
            />

            {/* Thumbnail Gallery Switcher */}
            <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 overflow-x-auto no-scrollbar max-w-full py-1 px-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(product.imageUrl || null);
                  setActiveViewMode('front');
                }}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                  activeViewMode === 'front' && (!selectedImage || selectedImage === product.imageUrl)
                    ? 'border-[#D4A017] shadow-md scale-105'
                    : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const fallback = product.galleryImages?.find((img) => img.includes('/src/assets/images/')) || '/src/assets/images/fruit_tropical_mixed_1790763869843.jpg';
                    (e.target as HTMLImageElement).src = fallback;
                  }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center py-0.5 font-bold">Front</span>
              </button>

              {product.galleryImages?.slice(1).map((imgUrl, idx) => (
                <button
                  key={imgUrl}
                  type="button"
                  onClick={() => {
                    setSelectedImage(imgUrl);
                    setActiveViewMode('front');
                  }}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    activeViewMode === 'front' && selectedImage === imgUrl
                      ? 'border-[#D4A017] shadow-md scale-105'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} View ${idx + 2}`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/fruit_tropical_mixed_1790763869843.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center py-0.5 font-bold">
                    Angle {idx + 2}
                  </span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setShowOriginModal(true)}
                className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden border-2 border-stone-200 opacity-80 hover:opacity-100 hover:border-emerald-600 transition-all group"
              >
                <img
                  src="/images/hero_coffee_estate_1790760219094.webp"
                  alt="Kyantamba Estate"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/hero_coffee_estate_1790760219094.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                <span className="absolute bottom-0 inset-x-0 bg-[#2D5A27]/90 text-[9px] text-white text-center py-0.5 font-bold">Estate</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveViewMode('back')}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                  activeViewMode === 'back' ? 'border-[#D4A017] shadow-md scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-full h-full bg-[#1F1916] flex flex-col items-center justify-center p-1 text-center text-white">
                  <span className="text-sm">📋</span>
                  <span className="text-[8px] font-bold text-amber-300">Nutrition</span>
                </div>
                <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center py-0.5 font-bold">Specs</span>
              </button>
            </div>

            {/* Farm Origin Modal Trigger */}
            <button
              onClick={() => setShowOriginModal(true)}
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#2D5A27] hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg border border-emerald-200 transition-colors"
            >
              <span>📍 View Kyantamba Farm GPS Coordinates & Traceability</span>
            </button>
          </div>

          {/* Quick Certifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs p-3.5 bg-stone-100/70 rounded-xl border border-stone-200">
            <div>
              <span className="font-bold text-[#2A1E17] block">100% Single Farm</span>
              <span className="text-[10px] text-stone-500">Kyantamba, Uganda</span>
            </div>
            <div>
              <span className="font-bold text-[#2A1E17] block">Zero Additives</span>
              <span className="text-[10px] text-stone-500">100% Natural Terroir</span>
            </div>
            <div>
              <span className="font-bold text-[#2D5A27] block">EUDR Compliant</span>
              <span className="text-[10px] text-stone-500">Zero-Deforestation</span>
            </div>
            <div>
              <span className="font-bold text-amber-800 block">Schema.org JSON-LD</span>
              <span className="text-[10px] text-stone-500">Origin & Price Indexed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Purchase Module */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          
          <div className="border-b border-stone-200 pb-6">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-mono text-stone-600 font-bold">SKU: {product.sku}</span>
              <span className="font-mono text-stone-400">GTIN: {product.gtin}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A1E17] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500 text-sm">
                {'★'.repeat(Math.round(product.rating))}
                <span className="ml-1 text-xs font-bold text-stone-700">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-stone-500">{product.reviewsCount} verified reviews</span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs font-semibold text-[#2D5A27] bg-emerald-50 px-2 py-0.5 rounded">
                In Stock & Export Ready
              </span>
            </div>
          </div>

          {/* Volume Pricing Toggle */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              Volume Sourcing Options
            </span>

            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl">
              <button
                type="button"
                onClick={() => setIsCarton(false)}
                className={`py-2 px-3 rounded-lg text-xs transition-all text-center ${
                  !isCarton
                    ? 'bg-white text-[#2A1E17] font-bold shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <div>Single Pack</div>
                <div className="text-[10px] font-mono text-stone-400">({product.weight})</div>
              </button>

              <button
                type="button"
                onClick={() => setIsCarton(true)}
                className={`py-2 px-3 rounded-lg text-xs transition-all text-center ${
                  isCarton
                    ? 'bg-[#2A1E17] text-amber-300 font-bold shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <div>Carton Case (12x)</div>
                <div className="text-[10px] font-mono text-amber-300/80">Bulk Savings</div>
              </button>
            </div>

            <div className="pt-2 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  {isCarton ? 'Carton Case Price (12 Units)' : 'Single Pack Unit Price'}
                </span>
                <span className="text-3xl font-extrabold text-[#2A1E17] font-mono tabular-nums">
                  {formatPrice(activePrice)}
                </span>
              </div>

              {isCarton && (
                <span className="text-[11px] font-semibold text-[#2D5A27] bg-emerald-50 px-2 py-1 rounded">
                  Wholesale Tier Active
                </span>
              )}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-3">
            <div className="flex gap-4 items-center">
              <div className="flex items-center border border-stone-300 rounded-lg bg-white px-2 py-1 text-sm font-mono">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-stone-600 hover:bg-stone-100 rounded"
                >
                  -
                </button>
                <span className="px-4 font-bold text-stone-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-stone-600 hover:bg-stone-100 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest rounded-lg transition-all shadow-md flex items-center justify-center gap-2 ${
                  justAdded
                    ? 'bg-[#2D5A27] text-white'
                    : 'bg-[#D4A017] hover:bg-[#b88910] text-[#2A1E17] hover:text-white hover:-translate-y-0.5'
                }`}
              >
                {justAdded ? (
                  <span>✓ Added to Shopping Bag</span>
                ) : (
                  <span>Add {isCarton ? `${quantity} Carton(s)` : `${quantity} Pack(s)`} to Bag</span>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Ordering */}
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  `Hello! I want to order ${quantity}x of ${product.name} (${isCarton ? 'Carton of 12' : 'Unit'}) priced at ${formatPrice(activePrice * quantity)}.`
                );
                window.open(`https://wa.me/256782333223?text=${message}`, '_blank');
              }}
              className="w-full py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors rounded-lg flex items-center justify-center gap-2"
            >
              <span>💬 Order Directly via WhatsApp Hotline</span>
            </button>
          </div>

          {/* Short Description */}
          <p className="text-xs text-stone-600 leading-relaxed pt-2">
            {product.fullDescription}
          </p>

        </div>
      </div>

      {/* Below the Fold: Editorial Accordion */}
      <section className="mb-24 bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm">
        
        {/* Tab Headers */}
        <div className="flex border-b border-stone-200 gap-8 mb-8 text-sm">
          <button
            onClick={() => setActiveTab('tasting')}
            className={`pb-4 font-bold transition-all relative ${
              activeTab === 'tasting'
                ? 'text-[#2A1E17] border-b-2 border-[#D4A017]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Tasting Notes & Profile
          </button>
          <button
            onClick={() => setActiveTab('origin')}
            className={`pb-4 font-bold transition-all relative ${
              activeTab === 'origin'
                ? 'text-[#2A1E17] border-b-2 border-[#D4A017]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            The Kyantamba Origin Story
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`pb-4 font-bold transition-all relative ${
              activeTab === 'compliance'
                ? 'text-[#2A1E17] border-b-2 border-[#D4A017]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Shipping & EUDR Compliance
          </button>
        </div>

        {/* Tab Content */}
        <div className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
          {activeTab === 'tasting' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#2A1E17]">
                {product.category === 'dried-fruits'
                  ? 'Sensory Evaluation & Artisan Dehydration'
                  : product.category === 'honey'
                  ? 'Raw Apiary Terroir & Cold Extraction'
                  : 'Sensory Evaluation & Roast Architecture'}
              </h3>
              <p>
                {product.category === 'dried-fruits'
                  ? 'Crafted from 100% natural sun-ripened Ugandan fruits harvested from smallholder outgrowers and heritage farm trees. Gently dehydrated at low temperatures below 45°C to preserve natural bioactive fruit enzymes, dietary fiber, vitamin complex, and luscious tropical aroma without any added cane sugar, sulfur, or artificial preservatives.'
                  : product.category === 'honey'
                  ? 'Harvested directly from our integrated coffee agroecology apiaries in Kyantamba. The honeybees forage across coffee blossom blossoms and native acacia forest canopy, producing an unpasteurized, nutrient-dense multi-floral golden raw honey rich in natural pollens and enzymes.'
                  : 'Ntamba Coffee preserves the bold, sweet terroir of indigenous Ugandan Robusta. Grown at 1,350m elevation under native canopy trees, the cherries develop a high density and natural sweetness that shatters old misconceptions about Robusta coffee.'}
              </p>
              {product.tastingNotes && (
                <div className="pt-2">
                  <span className="font-semibold text-stone-900 block mb-2">Prominent Flavor Notes:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.tastingNotes.map((note) => (
                      <span key={note} className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-md text-xs font-medium">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'origin' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#2A1E17]">
                Kyantamba Village & Quality International Foundation
              </h3>
              <p>
                Our 385-acre integrated agroecology farm is situated in Western Uganda. As the commercial engine of the Quality International Foundation (QIF), we operate a female-led enterprise that directly employs over 120 local women and youth in pruning, cherry harvesting, honey centrifugation, and fruit dehydration.
              </p>
              <p>
                By avoiding synthetic pesticides and utilizing coffee pulp to generate clean biogas, we maintain a genuine zero-waste closed loop that nourishes the soil for future generations.
              </p>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#2A1E17]">
                Global Export Readiness & EUDR Traceability
              </h3>
              <p>
                All Ntamba products are fully mapped under European Union Deforestation Regulation (EUDR) geolocation standards. We provide verified polygons of our farm parcels to ensure zero-deforestation compliance for all international importers.
              </p>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs space-y-1">
                <p>• EU Hub: DARAJA UG (haftungsbeschränkt), Günzburg, Germany</p>
                <p>• Commercial Register: HRB 21203</p>
                <p>• Incoterms Supported: FOB Mombasa, CIF Hamburg/Rotterdam, DDP Europe</p>
                <p>• Quality Standards: UNBS (Uganda National Bureau of Standards) & BUBU Certified</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cross-Sells: Pairs Perfectly With */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold text-[#2A1E17] mb-6">
          Pairs Perfectly With
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {crossSellProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Farm Origin Modal */}
      {showOriginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowOriginModal(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl z-10 space-y-4">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="font-heading text-lg font-bold text-[#2A1E17]">
                Kyantamba Estate Traceability Map
              </h3>
              <button onClick={() => setShowOriginModal(false)} className="text-stone-400 hover:text-stone-700">
                ✕
              </button>
            </div>

            <div className="aspect-video bg-stone-900 rounded-xl flex flex-col items-center justify-center text-center p-4 text-white relative overflow-hidden">
              <div className="text-4xl mb-2">🌿</div>
              <h4 className="font-heading text-base font-bold text-amber-300">
                Kyantamba Village, Mbarara District
              </h4>
              <p className="text-xs text-stone-300 font-mono mt-1">
                Lat: 0.6072° S, Long: 30.6545° E · Alt: 1,350m
              </p>
              <div className="mt-3 text-[10px] bg-white/10 px-3 py-1 rounded-full border border-white/20">
                EUDR Polygon Verified · Zero Deforestation Area
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Every package of Ntamba Coffee, Honey, and FruitTreat is harvested within this single contiguous 385-acre agroecology estate, ensuring 100% batch purity and complete traceability.
            </p>

            <button
              onClick={() => setShowOriginModal(false)}
              className="w-full py-2.5 text-xs font-semibold uppercase text-white bg-[#2A1E17] rounded-lg hover:bg-[#D4A017] hover:text-[#2A1E17] transition-colors"
            >
              Close Map
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
