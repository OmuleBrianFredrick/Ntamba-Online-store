import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Currency } from '../types';
import { NtambaLogo } from './NtambaLogo';

export const Header: React.FC = () => {
  const { totalItemsCount, setIsCartOpen, activeView, navigateTo, currency, setCurrency } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-[1536px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 h-20 flex items-center justify-between">
        
        {/* Zone 1: Authentic Ntamba Brand Logo */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center group text-left transition-transform duration-300 hover:opacity-95"
          aria-label="Ntamba Processors Home"
        >
          <NtambaLogo
            variant="horizontal"
            height={46}
            className="hidden sm:inline-flex"
          />
          <NtambaLogo
            variant="horizontal"
            height={38}
            className="sm:hidden"
          />
        </button>

        {/* Zone 2: Clean 5 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2A1E17]/85">
          <button
            onClick={() => navigateTo('shop')}
            className={`hover:text-[#D4A017] transition-colors relative py-1 ${
              activeView === 'shop' ? 'text-[#D4A017] font-semibold' : ''
            }`}
          >
            Catalog
          </button>
          <button
            onClick={() => navigateTo('wholesale')}
            className={`hover:text-[#D4A017] transition-colors relative py-1 ${
              activeView === 'wholesale' ? 'text-[#D4A017] font-semibold' : ''
            }`}
          >
            B2B Wholesale & Export
          </button>
          <button
            onClick={() => navigateTo('impact')}
            className={`hover:text-[#D4A017] transition-colors relative py-1 ${
              activeView === 'impact' ? 'text-[#D4A017] font-semibold' : ''
            }`}
          >
            Kyantamba Estate
          </button>
          <button
            onClick={() => navigateTo('blog')}
            className={`hover:text-[#D4A017] transition-colors relative py-1 ${
              activeView === 'blog' ? 'text-[#D4A017] font-semibold' : ''
            }`}
          >
            Blog & Insights
          </button>
          <button
            onClick={() => navigateTo('analytics')}
            className={`hover:text-[#D4A017] transition-colors relative py-1 ${
              activeView === 'analytics' ? 'text-[#D4A017] font-semibold' : ''
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => navigateTo('theme-exporter')}
            className={`hover:text-[#D4A017] transition-colors relative py-1 flex items-center gap-1.5 ${
              activeView === 'theme-exporter' ? 'text-[#D4A017] font-semibold' : ''
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#2D5A27]" />
            WP Theme (.zip)
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-white/80 border border-stone-200 text-xs font-semibold text-stone-700 py-1.5 px-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4A017] cursor-pointer"
            >
              <option value="UGX">UGX (USh)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          {/* B2B RFQ Quick CTA */}
          <button
            onClick={() => navigateTo('wholesale')}
            className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A1E17] hover:bg-[#D4A017] hover:text-[#2A1E17] rounded-lg transition-all duration-200 shadow-sm"
          >
            Get Quote
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#2A1E17] hover:text-[#D4A017] transition-colors"
            aria-label="View Shopping Bag"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItemsCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 text-[10px] font-bold text-white bg-[#D4A017] rounded-full flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900"
            aria-label="Toggle Navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#F9F7F2] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              navigateTo('shop');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            Retail Catalog (17 SKUs)
          </button>
          <button
            onClick={() => {
              navigateTo('wholesale');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            B2B Wholesale & Cupping Samples
          </button>
          <button
            onClick={() => {
              navigateTo('impact');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            385-Acre Kyantamba Estate
          </button>
          <button
            onClick={() => {
              navigateTo('blog');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-[#D4A017]"
          >
            Blog & Field Research (10 Articles)
          </button>
          <button
            onClick={() => {
              navigateTo('analytics');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            Real-Time Analytics
          </button>
          <button
            onClick={() => {
              navigateTo('theme-exporter');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2D5A27] font-semibold"
          >
            Download WordPress Theme (.zip)
          </button>
        </div>
      )}
    </header>
  );
};
