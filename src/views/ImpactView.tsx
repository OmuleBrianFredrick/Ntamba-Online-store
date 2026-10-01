import React from 'react';
import { useCart } from '../context/CartContext';

export const ImpactView: React.FC = () => {
  const { navigateTo } = useCart();

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Impact Hero with Fast WebP Estate Photo */}
      <section className="relative min-h-[50vh] flex items-center justify-center text-white overflow-hidden">
        <img
          src="/images/hero_coffee_estate_1790760219094.webp"
          alt="Kyantamba Estate Agroecology"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/hero_coffee_estate_1790760219094.jpg';
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-[#1C120C]/80 to-black/85" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 text-center py-16 sm:py-24">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-amber-300 border border-white/20 mb-4 font-ui">
            <span>🌿 Quality International Foundation (QIF)</span>
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            A 385-Acre Circular Agroecology Movement
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-stone-200 max-w-[65ch] mx-auto leading-relaxed font-normal drop-shadow">
            Ntamba Processors Limited is the commercial engine bridging rural Ugandan smallholders with the world's most demanding specialty coffee roasters and natural food buyers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 space-y-20">
      {/* 2. The Four Pillars of Circularity */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div className="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <span className="text-3xl block">☀️</span>
          <h3 className="font-heading text-lg font-bold text-[#2A1E17]">
            Solar & Biogas Energy
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            All drying tables, sorting conveyors, and water pumps at the Kyantamba central wet mill are powered 100% by clean solar arrays and closed-circuit biogas digesters.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <span className="text-3xl block">🐝</span>
          <h3 className="font-heading text-lg font-bold text-[#2A1E17]">
            Symbiotic Apiculture
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Hives placed strategically across our coffee blocks ensure vigorous pollination during flowering season, producing rich multi-floral honey with medicinal properties.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <span className="text-3xl block">👩🏾‍🌾</span>
          <h3 className="font-heading text-lg font-bold text-[#2A1E17]">
            Female-Led Empowerment
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Over 65% of our leadership and farm operations team are women from Kyantamba and Greater Masaka, leading agronomy research, honey centrifugation, and packaging quality.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <span className="text-3xl block">♻️</span>
          <h3 className="font-heading text-lg font-bold text-[#2A1E17]">
            Zero-Waste Cycle
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Coffee pulp and fruit trimmings are fermented into rich vermicompost, returning valuable organic nitrogen and potassium to our soil without chemical fertilizers.
          </p>
        </div>

      </section>

      {/* 3. Deep Dive Story */}
      <section className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-16 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A017]">
              Origin: Kyantamba Village, Mbarara District
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#2A1E17] leading-tight">
              From Subsistence Cultivation to an Export Powerhouse
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              For generations, smallholder farmers in Western Uganda produced some of the highest-potential Robusta coffee and tropical fruit on the African continent, but were forced to sell raw cherries at distress prices to predatory middlemen.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Quality International Foundation stepped in to establish <strong>Ntamba Processors Limited</strong>. By installing dedicated milling lines, clean stainless centrifugation for honey, and low-temperature solar fruit dehydrators, we retain 100% of the value inside the rural community.
            </p>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono text-stone-700 space-y-1">
              <p>• Central Processing Hub: CURAD Incubation Hub, Namukeekera</p>
              <p>• Quality Partners: Makerere University Agricultural Research Institute</p>
              <p>• Community Direct Beneficiaries: 180+ Farm Families</p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#2A1E17] text-white p-8 rounded-2xl space-y-6">
            <h3 className="font-heading text-xl font-bold text-[#D4A017]">
              EUDR Deforestation Compliance
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              With the rollout of EU Regulation 2023/1115 (EUDR), European roasters must ensure their coffee is not sourced from deforested land.
            </p>
            <p className="text-xs text-stone-300 leading-relaxed">
              Because Ntamba operates from a single contiguous 385-acre historical farm, we offer 100% auditable GPS perimeter polygons and full traceability from tree to export pallet.
            </p>
            <button
              onClick={() => navigateTo('wholesale')}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider text-[#2A1E17] bg-[#D4A017] hover:bg-[#b88910] rounded-lg transition-colors"
            >
              Request EUDR Due Diligence Statement
            </button>
          </div>

        </div>
      </section>

      {/* 4. Social Commerce CTA */}
      <section className="text-center py-12 space-y-6">
        <h2 className="font-heading text-3xl font-bold text-[#2A1E17]">
          Taste the Difference of Pure Regenerative Agroecology
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#2A1E17] bg-[#D4A017] hover:bg-[#b88910] rounded-lg shadow transition-all touch-manipulation"
          >
            Explore Retail Products
          </button>
          <button
            onClick={() => navigateTo('wholesale')}
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-[#2A1E17] hover:bg-stone-800 rounded-lg shadow transition-all touch-manipulation"
          >
            Request B2B Cupping Kit
          </button>
        </div>
      </section>
      </div>

    </div>
  );
};
