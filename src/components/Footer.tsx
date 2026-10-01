import React from 'react';
import { useCart } from '../context/CartContext';
import { NtambaLogo } from './NtambaLogo';
import { Newsletter } from './Newsletter';

export const Footer: React.FC = () => {
  const { navigateTo } = useCart();

  return (
    <footer
      className="bg-[#140E0A] text-[#FAF7F2] pt-16 sm:pt-20 border-t-2 border-[rgba(212,160,23,0.25)] antialiased subpixel-antialiased font-sans"
      style={{
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'geometricPrecision'
      }}
    >
      {/* Upper Main Body Container with 8px responsive grid margins */}
      <div className="max-w-[1536px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Top Horizontal Banner: Brand & De-cluttered Action Area */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-10 mb-8 border-b border-[rgba(212,160,23,0.15)]">
          
          {/* Logo & Identity Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <NtambaLogo
              variant="horizontal"
              colorScheme="white"
              height={52}
              className="hover:opacity-95 transition-opacity"
            />
            <div className="sm:border-l sm:border-[rgba(212,160,23,0.25)] sm:pl-4">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#F5B738] block">
                Standalone Agribusiness Enterprise
              </span>
              <p className="text-xs sm:text-[13px] font-sans font-medium text-[#D1C7BA]">
                Incubated by Quality International Foundation · Kyantamba Estate
              </p>
            </div>
          </div>

          {/* Action Area: 1 Prominent Primary Gold CTA + 2 Sleek Minimalist Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-sans">
            {/* Minimalist Secondary Pill */}
            <button
              onClick={() => navigateTo('blog')}
              className="text-xs font-semibold text-[#D1C7BA] hover:text-[#F5B738] border border-[rgba(212,160,23,0.25)] hover:border-[#F5B738]/50 bg-white/[0.02] hover:bg-white/[0.05] px-3.5 py-2.5 rounded-lg transition-all flex items-center gap-1.5"
            >
              <span>Blog & Insights</span>
              <span className="text-[10px] text-[#F5B738]">→</span>
            </button>

            {/* ONLY ONE Prominent Primary Gold CTA */}
            <button
              onClick={() => navigateTo('wholesale')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#D4A017] text-[#140E0A] hover:bg-[#F5B738] transition-all rounded-lg shadow-md"
            >
              Order Cupping Samples
            </button>

            {/* Sleek Inline Foundation Link */}
            <a
              href="https://qualityinternationalfoundation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#D1C7BA] hover:text-[#F5B738] hover:underline transition-colors flex items-center gap-1 px-2 py-2"
            >
              <span>QIF Mother Foundation</span>
              <span className="text-xs text-[#F5B738]">↗</span>
            </a>
          </div>

        </div>

        {/* High-Converting Newsletter Component */}
        <Newsletter />

        {/* Main Content Columns: 5 Balanced Columns Across the Full Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-12 pb-16 font-sans">
          
          {/* Column 1: Brand & Origin Mission */}
          <div className="space-y-4 lg:col-span-1">
            <h4 className="font-sans font-semibold text-base sm:text-lg text-[#FAF7F2] tracking-wide">
              Origin & Mission
            </h4>
            <p className="text-xs sm:text-[13px] font-sans font-medium text-[#D1C7BA] leading-relaxed">
              Standalone agribusiness enterprise, founded and incubated through Quality International Foundation (QIF). Our single-origin coffee and agroecology products are cultivated and processed across our 385-acre estate in Kyantamba Village, Western Uganda.
            </p>
            <div className="text-xs font-sans font-medium text-[#B5ABA0] space-y-1.5 pt-1">
              <p className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>TIN: 1058611264</span>
              </p>
              <p>BRN: 80034312494926</p>
              <p>CURAD Incubation Hub, Namukeekera</p>
              <p className="text-[#F5B738] font-medium mt-1">EU Partner: DARAJA UG, Günzburg, Germany</p>
              <a
                href="https://qualityinternationalfoundation.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5B738] hover:underline font-semibold text-xs inline-flex items-center gap-1 pt-1"
              >
                <span>qualityinternationalfoundation.com</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Column 2: Coffee Collections */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-base sm:text-lg text-[#FAF7F2] tracking-wide">
              Single-Origin Coffee
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans font-medium text-[#D1C7BA]">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  Roasted Robusta Whole Beans (1kg, 500g, 250g, 100g)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  Specialty Ground Coffee (1kg, 500g, 250g, 100g)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wholesale')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  Green Coffee Micro-Lots (Screen 18 Natural)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  Chewable Whole Roasted Coffee Beans (10g Sachet)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wholesale')} className="hover:text-[#F5B738] transition-colors text-left font-semibold text-[#F5B738] leading-relaxed">
                  Carton & Pallet Bulk Pricing →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Farm Apiary & Fruits */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-base sm:text-lg text-[#FAF7F2] tracking-wide">
              Apiary & Dried Fruits
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans font-medium text-[#D1C7BA]">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  Pure Raw Natural Farm Honey (650g Glass Jar)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  Pure Honey Squeeze Bottle (490g Easy-Pour)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  Table Honey Pot (150g Hexagonal Jar)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  FruitTreat Sun-Dried Pineapple (60g Pouch)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  FruitTreat Sun-Dried Mango & Jackfruit (60g)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: B2B Wholesale & Compliance */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-base sm:text-lg text-[#FAF7F2] tracking-wide">
              B2B & Export Hub
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans font-medium text-[#D1C7BA]">
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-[#F5B738] transition-colors text-left text-[#F5B738] font-semibold flex items-center gap-1.5 leading-relaxed">
                  <span>📰</span>
                  <span>Agroecology Blog (10 Posts)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wholesale')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  Cupping Sample Pipeline (DHL Express)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wholesale')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  FOB Port of Mombasa & CIF European Ports
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('impact')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  EUDR GPS Polygon Traceability
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wholesale')} className="hover:text-[#F5B738] transition-colors text-left leading-relaxed">
                  SWIFT Wire Split Terms (30% / 70% B/L)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('theme-exporter')} className="hover:text-emerald-300 transition-colors text-left text-emerald-400 font-semibold leading-relaxed">
                  WordPress Production Theme Code →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Global Orders & Verified Rails */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-base sm:text-lg text-[#FAF7F2] tracking-wide">
              Operations & Support
            </h4>
            <div className="space-y-2.5 text-xs sm:text-[13px] font-sans font-medium text-[#D1C7BA] leading-relaxed">
              <p>Hotline: <span className="text-[#FAF7F2] font-semibold">+256 782 333 223</span></p>
              <p>
                WhatsApp: <a
                  href="https://wa.me/256793662386?text=Hello%20Ntamba%20Processors!%20I%20would%20like%20to%20inquire%20about%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>+256 793 662 386</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded font-mono font-medium">Chat</span>
                </a>
              </p>
              <p>Email: <span className="text-[#FAF7F2] font-semibold">inquire@ntamba.co.ug</span></p>
              <p className="text-[#B5ABA0]">Head Office: Ntinda, Kampala, Uganda</p>
              <p className="text-[#B5ABA0]">Estate: Kyantamba, Mbarara District</p>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-sans uppercase font-semibold tracking-wider text-[#B5ABA0] block mb-2">
                Settlement & Payment Rails
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs font-sans font-medium">
                <span className="px-2.5 py-1 bg-[#0D0907] border border-[rgba(212,160,23,0.25)] rounded text-[#F5B738] font-semibold">MTN MoMo</span>
                <span className="px-2.5 py-1 bg-[#0D0907] border border-[rgba(212,160,23,0.25)] rounded text-[#F5B738] font-semibold">Airtel</span>
                <span className="px-2.5 py-1 bg-[#0D0907] border border-[rgba(212,160,23,0.2)] rounded text-[#FAF7F2]">Visa</span>
                <span className="px-2.5 py-1 bg-[#0D0907] border border-[rgba(212,160,23,0.2)] rounded text-[#FAF7F2]">Mastercard</span>
                <span className="px-2.5 py-1 bg-[#0D0907] border border-[rgba(212,160,23,0.2)] rounded text-[#FAF7F2]">Flutterwave</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Sub-Footer / Legal Bar: Rich deeper shade #0D0907 with generous bottom padding for floating WhatsApp button */}
      <div className="w-full bg-[#0D0907] border-t border-[rgba(212,160,23,0.15)] antialiased subpixel-antialiased font-sans">
        <div className="max-w-[1536px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pt-8 pb-24 sm:pb-10 flex flex-col lg:flex-row items-center justify-between text-xs sm:text-sm font-sans font-medium text-[#B5ABA0] gap-6">
          
          {/* Copyright line */}
          <p className="text-center lg:text-left text-[#B5ABA0] leading-relaxed">
            © {new Date().getFullYear()} <strong className="text-[#FAF7F2] font-semibold">Ntamba Processors Limited</strong>. Standalone Agribusiness Enterprise · Incubated by Quality International Foundation (QIF). All rights reserved.
          </p>

          {/* Core Trust & Origin Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-[13px] font-sans font-medium text-[#D1C7BA]">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">🌱</span> Zero-Waste Circular Agroecology
            </span>
            <span className="hidden sm:inline text-stone-700">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#F5B738]">👩🏾‍🌾</span> Proudly Female-Led Enterprise
            </span>
            <span className="hidden sm:inline text-stone-700">·</span>
            <span className="flex items-center gap-1.5">
              <span>🇺🇬</span> 100% Single-Farm Ugandan Origin
            </span>
            <span className="hidden sm:inline text-stone-700">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">🇪🇺</span> EUDR Deforestation Free
            </span>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex items-center gap-4 text-xs sm:text-[13px] font-sans font-medium text-[#B5ABA0]">
            <button onClick={() => navigateTo('impact')} className="hover:text-[#F5B738] transition-colors">
              Impact Report
            </button>
            <span className="text-stone-700">·</span>
            <button onClick={() => navigateTo('wholesale')} className="hover:text-[#F5B738] transition-colors">
              B2B Portal
            </button>
            <span className="text-stone-700">·</span>
            <button onClick={() => navigateTo('shop')} className="hover:text-[#F5B738] transition-colors">
              Retail Shop
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
};
