import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  view?: 'front' | 'back' | 'lifestyle';
  className?: string;
  showBadges?: boolean;
}

// Support user's exact uploaded file paths in both /public/images/ and /src/assets/images/
const FRUIT_IMAGE_CANDIDATES: Record<string, string[]> = {
  npl01: [
    '/images/products/1kg-ground-coffee.webp',
    '/images/products/1Kg Ground coffee final.webp',
    '/images/products/1kg-ground-coffee.jpg',
    '/images/products/1Kg Ground coffee final.jpg',
    '/src/assets/images/1Kg Ground coffee final.jpg',
  ],
  npl02: [
    '/images/products/ntamba-coffee-ground-500g.webp',
    '/images/products/Ntamba Coffee Ground 500g.webp',
    '/images/products/ntamba-coffee-ground-500g.jpg',
    '/images/products/Ntamba Coffee Ground 500g.jpg',
    '/src/assets/images/Ntamba Coffee Ground 500g.jpg',
  ],
  npl03: [
    '/images/products/ntamba-coffee-ground-250g.webp',
    '/images/products/Ntamba Coffee Ground 250g.webp',
    '/images/products/ntamba-coffee-ground-250g.jpg',
    '/images/products/Ntamba Coffee Ground 250g.jpg',
    '/src/assets/images/Ntamba Coffee Ground 250g.jpg',
  ],
  npl04: [
    '/images/products/ntamba-coffee-ground-100g.webp',
    '/images/products/Ntamba Coffee Ground 100g.webp',
    '/images/products/ntamba-coffee-ground-100g.jpg',
    '/images/products/Ntamba Coffee Ground 100g.jpg',
    '/src/assets/images/Ntamba Coffee Ground 100g.jpg',
  ],
  npl06: [
    '/images/products/1kg-roasted-coffee-beans.webp',
    '/images/products/1kg roasted coffee beans.webp',
    '/images/products/1kg-roasted-coffee-beans.png',
    '/images/products/1kg roasted coffee beans.png',
    '/src/assets/images/1kg roasted coffee beans.png',
  ],
  npl07: [
    '/images/products/ntamba-coffee-roasted-beans-500g.webp',
    '/images/products/Ntamba Coffee Roasted Beans 500g.webp',
    '/images/products/ntamba-coffee-roasted-beans-500g.jpg',
    '/images/products/Ntamba Coffee Roasted Beans 500g.jpg',
    '/src/assets/images/Ntamba Coffee Roasted Beans 500g.jpg',
  ],
  npl08: [
    '/images/products/ntamba-coffee-roasted-beans-250g.webp',
    '/images/products/Ntamba Coffee Roasted Beans 250g.webp',
    '/images/products/ntamba-coffee-roasted-beans-250g.jpg',
    '/images/products/Ntamba Coffee Roasted Beans 250g.jpg',
    '/src/assets/images/Ntamba Coffee Roasted Beans 250g.jpg',
  ],
  npl09: [
    '/images/products/ntamba-coffee-roasted-beans-100g.webp',
    '/images/products/Ntamba Coffee Roasted Beans 100g.webp',
    '/images/products/ntamba-coffee-roasted-beans-100g.jpg',
    '/images/products/Ntamba Coffee Roasted Beans 100g.jpg',
    '/src/assets/images/Ntamba Coffee Roasted Beans 100g.jpg',
  ],
  npl11: [
    '/images/fruits/dried-pineapple-slices.webp',
    '/images/fruits/Dried pineapple slices final.webp',
    '/images/fruits/dried-pineapple-slices.jpg',
    '/images/fruits/Dried pineapple slices final.jpg',
    '/images/fruits/dried-pineapple-slices.png',
  ],
  npl12: [
    '/images/fruits/dried-mango-slices.webp',
    '/images/fruits/Dried mango slices final.webp',
    '/images/fruits/dried-mango-slices.jpg',
    '/images/fruits/Dried mango slices final.jpg',
    '/images/fruits/dried-mango-slices.png',
  ],
  npl13: [
    '/src/assets/images/Dried jackfruit slices final.webp',
    '/images/fruits/Dried jackfruit slices final.webp',
    '/src/assets/images/Dried jackfruit slices final.jpg',
    '/images/fruits/Dried jackfruit slices final.jpg',
    '/images/fruits/dried-jackfruit-slices.webp',
    '/images/fruits/dried-jackfruit-slices.jpg',
    '/images/fruits/dried-jackfruit-slices.png',
  ],
  npl14: [
    '/src/assets/images/Dried banana slices final.webp',
    '/images/fruits/Dried banana slices final.webp',
    '/src/assets/images/Dried banana slices final.jpg',
    '/images/fruits/Dried banana slices final.jpg',
    '/images/fruits/dried-banana-slices.webp',
    '/images/fruits/dried-banana-slices.jpg',
    '/images/fruits/dried-banana-slices.png',
  ],
  npl15: [
    '/images/fruits/tropical-dried-fruits.webp',
    '/images/fruits/Dried tropical mix final.webp',
    '/images/fruits/tropical-dried-fruits.jpg',
    '/images/fruits/Dried tropical mix final.jpg',
    '/images/fruits/tropical-dried-fruits.png',
  ],
  npl16: [
    '/images/products/ntamba-pure-natural-honey-150g.webp',
    '/images/products/Ntamba Pure Natural Honey 150g.webp',
    '/images/products/ntamba-pure-natural-honey-150g.jpg',
    '/images/products/Ntamba Pure Natural Honey 150g.jpg',
    '/src/assets/images/Ntamba Pure Natural Honey 150g.jpg',
  ],
  npl18: [
    '/images/products/ntamba-pure-natural-honey-490g.webp',
    '/images/products/Ntamba Pure Natural Honey 490g.webp',
    '/images/products/ntamba-pure-natural-honey-490g.jpg',
    '/images/products/Ntamba Pure Natural Honey 490g.jpg',
    '/src/assets/images/Ntamba Pure Natural Honey 490g.jpg',
  ],
  npl19: [
    '/images/products/ntamba-honey-premium-jar-650g.webp',
    '/images/products/Ntamba Honey Premium Jar 650g.webp',
    '/images/products/ntamba-honey-premium-jar-650g.jpg',
    '/images/products/Ntamba Honey Premium Jar 650g.jpg',
    '/src/assets/images/Ntamba Honey Premium Jar 650g.jpg',
  ],
};

const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  'roasted-beans': '/images/products/1kg-roasted-coffee-beans.webp',
  'ground-coffee': '/images/products/1kg-ground-coffee.webp',
  'honey': '/images/products/ntamba-honey-premium-jar-650g.webp',
  'dried-fruits': '/images/fruits/tropical-dried-fruits.webp',
  'chewable': '/images/products/1kg-roasted-coffee-beans.webp',
};

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  view = 'front',
  className = '',
  showBadges = true,
}) => {
  const candidates: string[] =
    FRUIT_IMAGE_CANDIDATES[product.id] ||
    (product.imageUrl ? [product.imageUrl] : [CATEGORY_DEFAULT_IMAGES[product.category] || CATEGORY_DEFAULT_IMAGES['ground-coffee']]);

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCandidateIndex(0);
    setIsLoaded(false);
  }, [product.id, product.imageUrl]);

  const currentSrc = candidates[candidateIndex] || candidates[candidates.length - 1];

  const handleImageError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    }
  };

  if (view === 'back') {
    return (
      <div
        className={`relative w-full aspect-square flex flex-col justify-between p-6 bg-[#1F1916] text-[#FAF7F2] rounded-2xl overflow-hidden border border-stone-800 shadow-inner select-none ${className}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A017] font-bold">
              Product Specifications & Nutrition
            </span>
            <h4 className="font-heading text-lg font-bold text-white line-clamp-1">
              {product.name}
            </h4>
          </div>
          <span className="text-[11px] font-mono text-stone-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            {product.sku}
          </span>
        </div>

        <div className="my-auto space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-white/5 p-3 rounded-xl border border-white/5">
            <div>
              <span className="text-stone-400 block text-[10px]">Net Weight</span>
              <span className="text-white font-bold">{product.weight}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">GTIN Barcode</span>
              <span className="text-amber-300 font-bold">{product.gtin}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">Origin Estate</span>
              <span className="text-white">Kyantamba (385 ac)</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">Processing</span>
              <span className="text-emerald-400 font-bold">
                {product.category === 'dried-fruits' ? 'Dehydrated (<45°C)' : 'Artisan Roasted'}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Ingredients & Purity
            </span>
            <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
              {product.category === 'dried-fruits'
                ? '100% Single-Origin Ugandan fruit slices. Gently solar/air dehydrated. Zero added cane sugar, zero sulfur dioxide, no chemical preservatives.'
                : product.category === 'honey'
                ? '100% Pure Raw Multi-Floral Apiary Honey from Kyantamba coffee blossoms. Cold-extracted, unpasteurized, rich in active pollen.'
                : '100% Natural Robusta Coffee from indigenous Uganda highland trees. Medium roast, nitrogen-flushed packaging with one-way degassing.'}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-stone-400">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <span>✓</span> UNBS & BUBU Certified
          </span>
          <span className="font-mono text-stone-500">EUDR Geo-Polygon Verified</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-square flex items-center justify-center bg-[#F7F4EE] rounded-2xl overflow-hidden group select-none ${className}`}
    >
      {/* Background Soft Studio Pedestal Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F3EEE4] to-[#E6DFD0] opacity-80" />

      {/* Surface Ground Reflection & Depth */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${product.accentColor || '#D4A017'}40 0%, transparent 70%)`
        }}
      />
      <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-stone-400/15 to-transparent pointer-events-none" />

      {/* Loading Shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200/50 animate-pulse pointer-events-none z-10" />
      )}

      {/* High-Quality Object-Fit Cover Image Container with CLS Prevention */}
      <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden aspect-[4/3]">
        <img
          src={currentSrc}
          alt={`${product.name} - Single-Farm Origin (${product.weight})`}
          width={600}
          height={450}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover object-center transform transition-all duration-700 ease-out group-hover:scale-106 select-none ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
          }`}
        />

        {/* Floating Badges */}
        {showBadges && (
          <>
            {/* Top Left: Weight & Category Pill */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-20">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#2A1E17]/90 text-white backdrop-blur-md shadow-md border border-white/15 font-heading">
                {product.weight}
              </span>
              {product.badge && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#D4A017] text-[#2A1E17] shadow-md border border-amber-400/30">
                  ★ {product.badge}
                </span>
              )}
            </div>

            {/* Bottom Overlay: Authentic Farm Origin & Traceability */}
            <div className="absolute bottom-2.5 inset-x-2.5 px-3 py-1.5 rounded-lg bg-black/65 backdrop-blur-md text-white flex items-center justify-between text-[11px] border border-white/15 shadow-sm z-20">
              <span className="font-semibold text-stone-200 flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A27] animate-pulse" />
                <span className="truncate">Kyantamba Agroecology Estate</span>
              </span>
              <span className="text-[10px] text-amber-300 font-mono font-bold shrink-0">
                {product.category === 'honey'
                  ? '100% Raw'
                  : product.category === 'dried-fruits'
                  ? 'Sun-Dried'
                  : 'EUDR Ready'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
