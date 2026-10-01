import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Currency } from '../types';
import { EXCHANGE_RATES, CURRENCY_SYMBOLS } from '../data/products';

interface CartContextType {
  items: CartItem[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (ugx: number) => string;
  addItem: (product: Product, quantity?: number, isCarton?: boolean) => void;
  removeItem: (productId: string, isCarton: boolean) => void;
  updateQuantity: (productId: string, isCarton: boolean, delta: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotalUGX: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeView: 'home' | 'shop' | 'product' | 'wholesale' | 'impact' | 'blog' | 'analytics' | 'theme-exporter';
  selectedProductId: string | null;
  navigateTo: (view: 'home' | 'shop' | 'product' | 'wholesale' | 'impact' | 'blog' | 'analytics' | 'theme-exporter', productId?: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ntamba_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState<Currency>('UGX');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'product' | 'wholesale' | 'impact' | 'blog' | 'analytics' | 'theme-exporter'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ntamba_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const formatPrice = (ugx: number): string => {
    const rate = EXCHANGE_RATES[currency] || 1;
    const symbol = CURRENCY_SYMBOLS[currency] || 'UGX ';
    const converted = ugx * rate;

    if (currency === 'UGX') {
      return `${symbol}${converted.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const addItem = (product: Product, quantity = 1, isCarton = false) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.isCarton === isCarton
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity, isCarton }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, isCarton: boolean) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.isCarton === isCarton)));
  };

  const updateQuantity = (productId: string, isCarton: boolean, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.isCarton === isCarton) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const subtotalUGX = items.reduce((acc, curr) => {
    const price = curr.isCarton ? curr.product.cartonPriceUGX : curr.product.unitPriceUGX;
    return acc + price * curr.quantity;
  }, 0);

  const navigateTo = (view: 'home' | 'shop' | 'product' | 'wholesale' | 'impact' | 'blog' | 'analytics' | 'theme-exporter', productId?: string) => {
    setActiveView(view);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        currency,
        setCurrency,
        formatPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotalUGX,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeView,
        selectedProductId,
        navigateTo
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
