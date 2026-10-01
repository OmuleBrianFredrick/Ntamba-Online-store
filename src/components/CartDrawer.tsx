import React from 'react';
import { useCart } from '../context/CartContext';
import { ProductVisual } from './ProductVisual';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotalUGX,
    formatPrice,
    setIsCheckoutOpen,
    navigateTo
  } = useCart();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD_UGX = 100000;
  const progressPercent = Math.min(100, (subtotalUGX / FREE_SHIPPING_THRESHOLD_UGX) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_UGX - subtotalUGX);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#2A1E17]/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#F9F7F2] shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-xl font-bold text-[#2A1E17]">Your Bag</h2>
              <span className="text-xs text-stone-500 font-mono">({items.length} items)</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-[#2A1E17] rounded-full hover:bg-stone-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#F4EFE6] border-b border-stone-200 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-stone-700 mb-1.5">
                Add <strong className="text-[#2A1E17]">{formatPrice(remainingForFreeShipping)}</strong> for Free Delivery
              </p>
            ) : (
              <p className="text-[#2D5A27] font-semibold mb-1.5 flex items-center gap-1">
                <span>✓</span> You qualify for Free East Africa Courier Delivery!
              </p>
            )}
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D4A017] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-2xl mb-4 text-stone-400">
                  🛒
                </div>
                <h3 className="font-heading text-lg text-stone-800 font-bold mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Explore our single-farm coffee, raw apiary honey, and 100% natural fruit snacks.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A1E17] hover:bg-[#D4A017] hover:text-[#2A1E17] rounded-lg transition-all"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = item.isCarton
                  ? item.product.cartonPriceUGX
                  : item.product.unitPriceUGX;

                return (
                  <div
                    key={`${item.product.id}-${item.isCarton ? 'carton' : 'unit'}`}
                    className="p-3.5 bg-white rounded-xl border border-stone-200/80 shadow-sm flex gap-3"
                  >
                    <div className="w-20 h-20 flex-shrink-0 bg-stone-50 rounded-lg overflow-hidden border border-stone-100 flex items-center justify-center">
                      <ProductVisual product={item.product} showBadges={false} className="w-full h-full" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-heading text-sm font-bold text-[#2A1E17] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id, item.isCarton)}
                            className="min-w-[44px] min-h-[44px] -mr-2 -mt-2 flex items-center justify-center text-stone-400 hover:text-red-600 transition-colors touch-manipulation active:scale-90"
                            aria-label={`Remove ${item.product.name} from bag`}
                          >
                            <span className="text-base leading-none">✕</span>
                          </button>
                        </div>

                        <span className="inline-block text-[10px] font-semibold text-[#2D5A27] bg-emerald-50 px-2 py-0.5 rounded mt-0.5">
                          {item.isCarton ? 'Carton (12x Packs)' : `Single Pack (${item.product.weight})`}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                        {/* Stepper with full 44px mobile touch targets */}
                        <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 text-xs font-mono overflow-hidden shadow-inner">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.isCarton, -1)}
                            className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-stone-200 active:bg-stone-300 active:scale-95 text-stone-700 transition-all font-bold text-sm touch-manipulation"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-3 font-bold text-stone-900 text-sm select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.isCarton, 1)}
                            className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-stone-200 active:bg-stone-300 active:scale-95 text-stone-700 transition-all font-bold text-sm touch-manipulation"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#2A1E17]">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Call-to-Action */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 pb-8 sm:pb-6 bg-white border-t border-stone-200 space-y-4">
              
              {/* Carton Savings Tip for Multi-Unit Shoppers */}
              {items.some((i) => !i.isCarton && i.quantity >= 2) && (
                <div className="p-3 bg-amber-50/90 border border-amber-200/80 rounded-xl text-[11px] sm:text-xs text-amber-950 flex items-center justify-between gap-2 font-ui">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">📦</span>
                    <span>Tip: Switch to a 12x Carton to save up to 15% per pack!</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('shop');
                    }}
                    className="text-[#966d0a] hover:text-[#2A1E17] font-bold underline whitespace-nowrap"
                  >
                    View Cases
                  </button>
                </div>
              )}

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-[#2A1E17]">{formatPrice(subtotalUGX)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-[#2D5A27]">
                    {remainingForFreeShipping === 0 ? 'FREE' : formatPrice(10000)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2A1E17] pt-2 border-t border-stone-100">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base text-[#D4A017]">
                    {formatPrice(subtotalUGX + (remainingForFreeShipping === 0 ? 0 : 10000))}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 min-h-[44px] text-xs font-bold uppercase tracking-wider text-[#2A1E17] bg-[#D4A017] hover:bg-[#c29213] transition-all rounded-xl shadow-md hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2 font-ui touch-manipulation"
                >
                  <span>Proceed to Swift Checkout</span>
                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const message = encodeURIComponent(
                      `Hello Ntamba Processors! I would like to order:\n` +
                        items
                          .map((i) => `• ${i.quantity}x ${i.product.name} (${i.isCarton ? 'Carton' : 'Unit'})`)
                          .join('\n') +
                        `\nTotal: ${formatPrice(subtotalUGX)}`
                    );
                    window.open(`https://wa.me/256782333223?text=${message}`, '_blank');
                  }}
                  className="w-full py-2.5 min-h-[44px] text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors rounded-xl flex items-center justify-center gap-2 touch-manipulation active:scale-[0.99]"
                >
                  <span>💬 Instant Order via WhatsApp</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-stone-400 font-mono">
                🔒 Bank-grade SSL encryption · MTN / Airtel MoMo & Visa / Mastercard
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
