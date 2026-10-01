import React, { useState, useEffect } from 'react';
import { Product } from '../types';

export interface ProductImageProps {
  product: Product;
  src?: string;
  alt?: string;
  aspectRatio?: 'square' | 'portrait' | 'auto';
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  showPedestal?: boolean;
  hoverZoom?: boolean;
  onClick?: () => void;
}

// Map each product to its prioritized candidate images (HD uploaded originals first)
export const PRODUCT_IMAGE_CANDIDATES: Record<string, string[]> = {
  npl01: [
    '/src/assets/images/1Kg Ground coffee final.jpg',
    '/images/products/1Kg Ground coffee final.jpg',
    '/images/products/1kg-ground-coffee.jpg',
    '/src/assets/images/product_ground_coffee_1790760246103.jpg',
  ],
  npl02: [
    '/src/assets/images/Ntamba Coffee Ground 500g.jpg',
    '/images/products/Ntamba Coffee Ground 500g.jpg',
    '/images/products/ntamba-coffee-ground-500g.jpg',
    '/src/assets/images/product_ground_coffee_1790760246103.jpg',
  ],
  npl03: [
    '/src/assets/images/Ntamba Coffee Ground 250g.jpg',
    '/images/products/Ntamba Coffee Ground 250g.jpg',
    '/images/products/ntamba-coffee-ground-250g.jpg',
    '/src/assets/images/product_ground_coffee_1790760246103.jpg',
  ],
  npl04: [
    '/src/assets/images/Ntamba Coffee Ground 100g.jpg',
    '/images/products/Ntamba Coffee Ground 100g.jpg',
    '/images/products/ntamba-coffee-ground-100g.jpg',
    '/src/assets/images/product_ground_coffee_1790760246103.jpg',
  ],
  npl06: [
    '/src/assets/images/1kg roasted coffee beans.png',
    '/images/products/1kg roasted coffee beans.png',
    '/images/products/1kg-roasted-coffee-beans.png',
    '/src/assets/images/product_coffee_beans_1790760234165.jpg',
  ],
  npl07: [
    '/src/assets/images/Ntamba Coffee Roasted Beans 500g.jpg',
    '/images/products/Ntamba Coffee Roasted Beans 500g.jpg',
    '/images/products/ntamba-coffee-roasted-beans-500g.jpg',
    '/src/assets/images/product_coffee_beans_1790760234165.jpg',
  ],
  npl08: [
    '/src/assets/images/Ntamba Coffee Roasted Beans 250g.jpg',
    '/images/products/Ntamba Coffee Roasted Beans 250g.jpg',
    '/images/products/ntamba-coffee-roasted-beans-250g.jpg',
    '/src/assets/images/product_coffee_beans_1790760234165.jpg',
  ],
  npl09: [
    '/src/assets/images/Ntamba Coffee Roasted Beans 100g.jpg',
    '/images/products/Ntamba Coffee Roasted Beans 100g.jpg',
    '/images/products/ntamba-coffee-roasted-beans-100g.jpg',
    '/src/assets/images/product_coffee_beans_1790760234165.jpg',
  ],
  npl11: [
    '/images/fruits/Dried pineapple slices final.jpg',
    '/images/fruits/dried-pineapple-slices.jpg',
    '/src/assets/images/Dried pineapple slices final.jpg',
    '/images/fruits/Dried pineapple slice front view HD final.png',
    '/images/fruits/dried-pineapple-slices.png',
    '/src/assets/images/fruit_pineapple_slices_1790763858938.jpg',
  ],
  npl12: [
    '/images/fruits/Dried mango slices final.jpg',
    '/images/fruits/dried-mango-slices.jpg',
    '/src/assets/images/Dried mango slices final.jpg',
    '/images/fruits/Dried mango slices front view HD final.png',
    '/images/fruits/dried-mango-slices.png',
    '/src/assets/images/fruit_mango_slices_1790763848260.jpg',
  ],
  npl13: [
    '/images/fruits/Dried jackfruit slices final.jpg',
    '/images/fruits/dried-jackfruit-slices.jpg',
    '/src/assets/images/Dried jackfruit slices final.jpg',
    '/images/fruits/Dried Jackfruit slices Front HD final.png',
    '/images/fruits/dried-jackfruit-slices.png',
    '/src/assets/images/fruit_jackfruit_slices_1790763837708.jpg',
  ],
  npl14: [
    '/images/fruits/Dried banana slices final.jpg',
    '/images/fruits/dried-banana-slices.jpg',
    '/src/assets/images/Dried banana slices final.jpg',
    '/images/fruits/Dried Banna slices front view HD.png',
    '/images/fruits/dried-banana-slices.png',
    '/src/assets/images/fruit_banana_slices_1790763827389.jpg',
  ],
  npl15: [
    '/images/fruits/Dried tropical mix final.jpg',
    '/images/fruits/tropical-dried-fruits.jpg',
    '/src/assets/images/Dried tropical mix final.jpg',
    '/images/fruits/Tropical Dried Fruits Front View HD Final.png',
    '/images/fruits/tropical-dried-fruits.png',
    '/src/assets/images/fruit_tropical_mixed_1790763869843.jpg',
  ],
  npl16: [
    '/src/assets/images/Ntamba Pure Natural Honey 150g.jpg',
    '/images/products/Ntamba Pure Natural Honey 150g.jpg',
    '/images/products/ntamba-pure-natural-honey-150g.jpg',
    '/src/assets/images/product_pure_honey_1790760256549.jpg',
  ],
  npl18: [
    '/src/assets/images/Ntamba Pure Natural Honey 490g.jpg',
    '/images/products/Ntamba Pure Natural Honey 490g.jpg',
    '/images/products/ntamba-pure-natural-honey-490g.jpg',
    '/src/assets/images/product_pure_honey_1790760256549.jpg',
  ],
  npl19: [
    '/src/assets/images/Ntamba Honey Premium Jar 650g.jpg',
    '/images/products/Ntamba Honey Premium Jar 650g.jpg',
    '/images/products/ntamba-honey-premium-jar-650g.jpg',
    '/src/assets/images/product_pure_honey_1790760256549.jpg',
  ],
};

const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  'roasted-beans': '/src/assets/images/1kg roasted coffee beans.png',
  'ground-coffee': '/src/assets/images/1Kg Ground coffee final.jpg',
  'honey': '/src/assets/images/Ntamba Honey Premium Jar 650g.jpg',
  'dried-fruits': '/images/fruits/Dried tropical mix final.jpg',
  'chewable': '/src/assets/images/1kg roasted coffee beans.png',
};

/**
 * High-performance, aspect-ratio-stabilized product image wrapper with native lazy-loading,
 * zero Cumulative Layout Shift (CLS), multi-candidate fallback, and organic studio pedestal lighting.
 */
export const ProductImage: React.FC<ProductImageProps> = ({
  product,
  src,
  alt,
  aspectRatio = 'square',
  className = '',
  imageClassName = '',
  priority = false,
  showPedestal = true,
  hoverZoom = true,
  onClick,
}) => {
  // Build candidate ladder for current product
  const defaultList: string[] = PRODUCT_IMAGE_CANDIDATES[product.id] ||
    (product.imageUrl ? [product.imageUrl] : [CATEGORY_DEFAULT_IMAGES[product.category] || CATEGORY_DEFAULT_IMAGES['ground-coffee']]);

  const candidates = src ? [src, ...defaultList.filter((s) => s !== src)] : defaultList;

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCandidateIndex(0);
    setIsLoaded(false);
  }, [product.id, src]);

  const currentSrc = candidates[candidateIndex] || candidates[candidates.length - 1];

  const handleImageError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    }
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : '';

  return (
    <div
      onClick={onClick}
      className={`relative w-full ${aspectClass} overflow-hidden rounded-2xl flex items-center justify-center select-none bg-[#F5F2EB] ${className}`}
    >
      {/* Studio Pedestal Atmosphere */}
      {showPedestal && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F3EEE4] to-[#E6DFD0] opacity-85" />
          {/* Variety Ambiance Glow */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 45%, ${product.accentColor || '#D4A017'}50 0%, transparent 70%)`,
            }}
          />
          {/* Ground Contact Shadow */}
          <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-stone-400/20 to-transparent pointer-events-none" />
        </>
      )}

      {/* Shimmer Placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200/40 animate-pulse pointer-events-none" />
      )}

      {/* High-Resolution Stand-Up Pouch Image */}
      <img
        src={currentSrc}
        alt={alt || product.name}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={handleImageError}
        className={`relative z-10 w-full h-full object-cover object-center transition-all duration-700 ease-out select-none ${
          hoverZoom ? 'group-hover:scale-106' : ''
        } ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'} ${imageClassName}`}
      />
    </div>
  );
};
