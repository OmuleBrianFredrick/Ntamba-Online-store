import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice, addItem, navigateTo } = useCart();
  const [isCarton, setIsCarton] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const activePrice = isCarton ? product.cartonPriceUGX : product.unitPriceUGX;

  // Calculate volume wholesale savings for 12x cartons
  const single12Cost = product.unitPriceUGX * 12;
  const savingsUGX = single12Cost - product.cartonPriceUGX;
  const savingsPercent = Math.max(0, Math.round((savingsUGX / single12Cost) * 100));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1, isCarton);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => navigateTo('product', product.id)}
      className="group flex flex-col bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgba(42,30,23,0.04)] hover:shadow-[0_12px_32px_rgba(42,30,23,0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
    >
      {/* Visual Canvas Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <ProductVisual product={product} />

        {/* Rating and Weight */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-stone-700 flex items-center gap-1 shadow-md border border-stone-200/50 z-20">
          <span className="text-amber-500">★</span>
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Metadata line without pill clutter */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 font-medium">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.weight}</span>
            {product.cuppingScore && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#2D5A27] font-semibold">{product.cuppingScore} Q-Score</span>
              </>
            )}
          </div>

          <h3 className="font-heading text-xl font-bold text-[#2A1E17] group-hover:text-[#D4A017] transition-colors line-clamp-1 tracking-tight">
            {product.name}
          </h3>

          <p className="text-xs sm:text-[13px] text-stone-600 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Volume Pricing Toggle: Core B2B & B2C dynamic with 44px touch targets & savings badge */}
        <div className="mt-4 pt-3 border-t border-stone-100 font-ui">
          <div className="flex items-center justify-between p-1 bg-stone-100 rounded-xl text-xs font-semibold mb-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsCarton(false);
              }}
              className={`flex-1 py-2 px-3 min-h-[44px] rounded-lg transition-all text-center touch-manipulation flex items-center justify-center ${
                !isCarton
                  ? 'bg-white text-[#2A1E17] shadow-sm font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>Single Pack</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsCarton(true);
              }}
              className={`flex-1 py-2 px-3 min-h-[44px] rounded-lg transition-all text-center touch-manipulation flex items-center justify-center gap-1.5 ${
                isCarton
                  ? 'bg-[#2A1E17] text-amber-300 shadow-sm font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>Carton (12x)</span>
              {savingsPercent > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-white leading-none">
                  -{savingsPercent}%
                </span>
              )}
            </button>
          </div>

          {/* Pricing & Quick Add Bar */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                {isCarton ? (
                  <span className="text-emerald-700 font-semibold">
                    12 Units · Save {formatPrice(savingsUGX)}
                  </span>
                ) : (
                  'Single Pack'
                )}
              </span>
              <span className="text-base sm:text-lg font-bold text-[#2A1E17] font-mono tabular-nums">
                {formatPrice(activePrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={isCarton ? `Add Carton of ${product.name}` : `Add ${product.name}`}
              className={`px-4 py-2.5 min-h-[44px] text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5 touch-manipulation active:scale-95 ${
                justAdded
                  ? 'bg-[#2D5A27] text-white scale-95'
                  : 'bg-[#D4A017] hover:bg-[#b88910] text-[#2A1E17] hover:text-white shadow-sm hover:-translate-y-0.5'
              }`}
            >
              {justAdded ? (
                <>
                  <span>✓</span>
                  <span>Added</span>
                </>
              ) : (
                <>
                  <span className="text-sm font-bold">+</span>
                  <span>{isCarton ? 'Add Carton' : 'Quick Add'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
