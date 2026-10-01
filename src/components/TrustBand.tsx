import React from 'react';

export const TrustBand: React.FC = () => {
  return (
    <section className="bg-white border-y border-stone-200/80 py-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-2" role="img" aria-label="Sprout">🌱</span>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#2A1E17] font-ui">
              Single-Farm Origin
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              385-Acre Kyantamba Estate, Uganda
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-2" role="img" aria-label="Recycle">♻️</span>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#2A1E17] font-ui">
              Climate-Smart Circular
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Zero-Waste Solar & Biogas Powered
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-2" role="img" aria-label="Female Farmer">👩🏾‍🌾</span>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#2A1E17] font-ui">
              Female-Led Enterprise
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Empowering Smallholder Women & Youth
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-2" role="img" aria-label="Factory Export">🏭</span>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#2A1E17] font-ui">
              EUDR & Export-Ready
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              UNBS Certified · German Logistics Hub
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
