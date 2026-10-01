import React, { useState } from 'react';
import { NtambaLogo } from '../components/NtambaLogo';

export const WholesaleView: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    inquiryType: 'samples',
    targetVolume: '250g Samples',
    incoterm: 'FOB',
    paymentMilestone: '30/70',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [showWebhookPayload, setShowWebhookPayload] = useState(false);
  const [isVerifiedBuyer, setIsVerifiedBuyer] = useState(true);
  const [showProformaModal, setShowProformaModal] = useState(false);
  const [showFastTrackModal, setShowFastTrackModal] = useState(false);
  const [fastTrackSuccess, setFastTrackSuccess] = useState<string | null>(null);
  const [remainingQuota, setRemainingQuota] = useState(2); // PDD Section 5.3: 2 samples per quarter for verified buyers
  const [sampleKitSelection, setSampleKitSelection] = useState<'screen18_natural' | 'screen18_washed' | 'roasted_duo'>('screen18_natural');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const ref = 'NTB-2026-' + Math.floor(10000 + Math.random() * 90000);
      setSubmittedRef(ref);
    }, 1400);
  };

  const handleFastTrackDispatch = () => {
    const dhlRef = 'DHL-NTB-' + Math.floor(100000 + Math.random() * 900000) + '-EU';
    setFastTrackSuccess(dhlRef);
    setRemainingQuota((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner with Optimized WebP Image */}
      <section className="relative min-h-[48vh] flex items-center justify-center text-white overflow-hidden">
        <img
          src="/images/hero_coffee_estate_1790760219094.webp"
          alt="Ntamba Coffee Estate Agroecology"
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
        
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 text-center py-16 sm:py-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-amber-300 border border-white/20 mb-4 font-ui">
            <span>🏭 Commercial Export & Roastery Supply Desk</span>
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            B2B Wholesale & Cupping Sample Portal
          </h1>
          <p className="text-sm sm:text-base text-stone-200 max-w-[65ch] mx-auto leading-relaxed font-normal drop-shadow">
            Source directly from our 385-acre circular agroecology estate in Kyantamba, Uganda. Specialty Screen 18 green micro-lots, roasted whole beans, raw apiary honey drums, and FruitTreat dried snacks with EUDR certification.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
      
      {/* PDD Dual-Mode Architecture: Verified B2B Buyer & Quota Status Bar */}
      <div className="mb-12 bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center text-xl font-bold font-mono">
            {isVerifiedBuyer ? '✓' : 'ℹ'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A27]">
                {isVerifiedBuyer ? 'Verified Commercial Roastery (KYC Approved)' : 'Commercial Guest / Unverified'}
              </span>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                Role: b2b_verified
              </span>
            </div>
            <h3 className="font-heading text-lg font-bold text-[#2A1E17] mt-0.5">
              Wholesale Pricing Tiers & Cupping Quota Active
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Quarterly Allowance: <strong className="text-stone-900">{remainingQuota} of 2 Cupping Samples Available</strong> · 100% credited against your first commercial container contract (<code className="text-[10px] font-mono text-amber-700">credited_to_order_id</code>).
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              setFastTrackSuccess(null);
              setShowFastTrackModal(true);
            }}
            className="px-4 py-2.5 min-h-[44px] bg-[#D4A017] hover:bg-[#b88910] text-[#140E0A] rounded-xl font-bold transition-all shadow-md flex items-center gap-2 font-ui active:scale-95 touch-manipulation"
          >
            <span>⚡</span>
            <span>1-Click Sample Dispatch ({remainingQuota} Free Left)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowProformaModal(true)}
            className="px-4 py-2.5 min-h-[44px] bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-semibold transition-all border border-stone-300 flex items-center gap-1.5 active:scale-95 touch-manipulation"
          >
            <span>📄</span>
            <span>View Pro-Forma Invoice Draft</span>
          </button>
        </div>
      </div>

      {/* 4-Step Cupping Sample Pipeline */}
      <div className="mb-20">
        <h2 className="text-center font-heading text-2xl sm:text-3xl font-extrabold text-[#2A1E17] mb-8">
          The 4-Step Cupping Sample Process
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm relative">
            <span className="font-heading text-3xl font-extrabold text-[#D4A017] block mb-2">01</span>
            <h3 className="font-bold text-stone-900 text-sm mb-1">Select Lot Profile</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Choose Screen 18 Natural Robusta, washed micro-lots, or custom roasted cupping batches (250g or 500g).
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm relative">
            <span className="font-heading text-3xl font-extrabold text-[#D4A017] block mb-2">02</span>
            <h3 className="font-bold text-stone-900 text-sm mb-1">Express DHL Dispatch</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Airfreighted directly from our Entebbe export facility with full phytosanitary certificates and moisture analysis.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm relative">
            <span className="font-heading text-3xl font-extrabold text-[#D4A017] block mb-2">03</span>
            <h3 className="font-bold text-stone-900 text-sm mb-1">Transparent Incoterms</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Lock in FOB Mombasa or CIF European Ports (Hamburg, Rotterdam) with full EUDR zero-deforestation compliance.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm relative">
            <span className="font-heading text-3xl font-extrabold text-[#D4A017] block mb-2">04</span>
            <h3 className="font-bold text-stone-900 text-sm mb-1">100% Sample Credit</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              All courier sample fees are fully credited against your first commercial container contract (LCL or FCL).
            </p>
          </div>

        </div>
      </div>

      {/* Glassmorphism RFQ Form Container */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="border-b border-stone-200/80 pb-6 mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D5A27] bg-emerald-50 px-2.5 py-1 rounded inline-block mb-2">
              Fluent Forms B2B Bridge · Make.com Automated
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2A1E17]">
              Request for Quote & Cupping Samples
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Direct connection with our commercial desk. Expected turnaround: under 12 business hours.
            </p>
          </div>

          {submittedRef ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2D5A27] flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#2A1E17]">
                RFQ #{submittedRef} Dispatched to Operations Desk
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. A commercial export specialist from Ntamba Processors (and our European desk at DARAJA UG) has received your request.
              </p>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs font-mono max-w-md mx-auto space-y-1">
                <p>• Destination: {formData.country}</p>
                <p>• Inquiry Type: {formData.inquiryType.toUpperCase()}</p>
                <p>• Preferred Incoterm: {formData.incoterm}</p>
                <p>• Webhook Status: Triggered to Make.com / Zoho CRM</p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setShowWebhookPayload(!showWebhookPayload)}
                  className="px-4 py-2 text-xs font-mono text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
                >
                  {showWebhookPayload ? 'Hide Webhook Payload' : 'Inspect JSON Webhook Payload'}
                </button>
                <button
                  onClick={() => setSubmittedRef(null)}
                  className="px-6 py-2 text-xs font-semibold text-white bg-[#2A1E17] hover:bg-[#D4A017] hover:text-[#2A1E17] rounded-lg transition-colors"
                >
                  Submit Another Request
                </button>
              </div>

              {showWebhookPayload && (
                <div className="p-4 bg-stone-900 text-amber-300 font-mono text-[11px] text-left rounded-xl overflow-x-auto max-w-md mx-auto">
                  <pre>{JSON.stringify({ ref: submittedRef, timestamp: new Date().toISOString(), payload: formData }, null, 2)}</pre>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Elena Vance"
                    className="w-full px-3.5 py-2.5 bg-white/90 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                    Company / Roastery *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Nordic Roasters ApS"
                    className="w-full px-3.5 py-2.5 bg-white/90 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sourcing@nordicroasters.com"
                    className="w-full px-3.5 py-2.5 bg-white/90 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                    Destination Country / Port *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Germany / Hamburg Port"
                    className="w-full px-3.5 py-2.5 bg-white/90 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                    Sourcing Requirement
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/90 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  >
                    <option value="samples">Cupping Samples (250g / 500g Air Dispatch)</option>
                    <option value="lcl">LCL Pallet (500kg - 3 Metric Tons)</option>
                    <option value="fcl">Full Container Load (FCL 20ft / 40ft Sea Freight)</option>
                    <option value="honey_bulk">Apiary Honey Bulk Drums (200kg)</option>
                    <option value="fruittreat_cases">FruitTreat Dehydrated Fruit Master Cartons</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                    Incoterms Specification
                  </label>
                  <select
                    value={formData.incoterm}
                    onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/90 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  >
                    <option value="FOB">FOB Mombasa Port (Kenya)</option>
                    <option value="CIF_HAMBURG">CIF Hamburg, Germany</option>
                    <option value="CIF_ROTTERDAM">CIF Rotterdam, Netherlands</option>
                    <option value="DDP">DDP (EU Domestic via Daraja UG)</option>
                    <option value="EXW">EXW Farm Estate (Kyantamba, Uganda)</option>
                  </select>
                </div>
              </div>

              {/* B2B Commercial Milestone Selector (PDD §5.4 & §8.5) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                    Payment Milestones / Settlement Terms
                  </label>
                  <select
                    value={formData.paymentMilestone}
                    onChange={(e) => setFormData({ ...formData, paymentMilestone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/90 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  >
                    <option value="30/70">Split Terms: 30% Down / 70% against Bill of Lading (B/L)</option>
                    <option value="40/30/30">Milestone: 40% Deposit / 30% Milling / 30% Delivery</option>
                    <option value="100_swift">100% Full Advance SWIFT Wire Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                    FX Valuation Policy
                  </label>
                  <div className="w-full px-3.5 py-2.5 bg-stone-100 border border-stone-200 rounded-lg text-xs font-mono text-stone-700 flex items-center justify-between">
                    <span>USD Base Rate Snapshot (Locked at Order)</span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-bold">PDD §3</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                  Target Specifications & Roasting Profile
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention desired green bean screen size (Screen 18 / 15), maximum moisture content (<12.5%), delivery timeline, or sample roasting preferences..."
                  className="w-full px-3.5 py-2.5 bg-white/90 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#2A1E17] hover:bg-[#D4A017] hover:text-[#2A1E17] transition-all rounded-lg shadow-md hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Transmitting RFQ to Commercial Operations Desk...</span>
                ) : (
                  <span>Submit Sourcing Request & Trigger Automation</span>
                )}
              </button>
            </form>
          )}

          {/* Quick WhatsApp Inquiry Option for Commercial Buyers */}
          <div className="mt-6 pt-5 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Need immediate assistance or faster cupping dispatch?</span>
            </div>
            <a
              href="https://wa.me/256793662386?text=Hello%20Ntamba%20Processors!%20I%20am%20interested%20in%20commercial%20coffee%20sourcing%20and%20cupping%20samples."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-sm transition-all hover:scale-102"
            >
              <span>Direct WhatsApp Desk: +256 793 662 386</span>
              <span>→</span>
            </a>
          </div>

        </div>
      </div>

      {/* European Representation Box */}
      <div className="mt-16 max-w-3xl mx-auto p-6 bg-white rounded-2xl border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-[#2A1E17] block text-sm">
            European Importer & Distribution Partner:
          </span>
          <p className="mt-0.5">
            DARAJA UG (haftungsbeschränkt) · Günzburg, Germany · HRB 21203 · EU VAT ID Registered
          </p>
        </div>
        <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          EUDR Certified Importer
        </div>
      </div>
      </div>

      {/* Pro-Forma Commercial Invoice Modal (PDD §5.3, §5.4, §8.5) */}
      {showProformaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div onClick={() => setShowProformaModal(false)} className="fixed inset-0 bg-[#2A1E17]/70 backdrop-blur-sm" />
          
          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto font-sans border border-stone-200">
            <div className="flex justify-between items-start border-b border-stone-200 pb-4">
              <div className="space-y-2">
                <NtambaLogo variant="horizontal" height={36} />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A017] font-bold block">
                    Official Commercial Export Document
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2A1E17]">
                    PRO-FORMA INVOICE #NTB-2026-00042
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProformaModal(false)}
                className="text-stone-400 hover:text-stone-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Document Header Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs font-mono bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-400 block text-[10px]">Exporter / Seller</span>
                <span className="font-bold text-stone-900 block">Ntamba Processors Limited</span>
                <span className="text-stone-600 text-[11px]">Kyantamba Estate, Uganda · TIN: 1058611264</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Incoterms & Channel</span>
                <span className="font-bold text-stone-900 block">{formData.incoterm || 'FOB Mombasa'} (Incoterms 2020)</span>
                <span className="text-emerald-700 text-[11px]">Channel: b2b_wholesale (EUDR Polygon Verified)</span>
              </div>
            </div>

            {/* Specimen Commercial Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Sample Commercial Lot Order Specification
              </span>
              <div className="overflow-x-auto w-full rounded-lg border border-stone-200">
                <table className="min-w-[500px] w-full text-xs text-left">
                  <thead className="bg-[#2A1E17] text-white">
                    <tr>
                      <th className="p-2.5">HS Code & Description</th>
                      <th className="p-2.5 text-right">Volume</th>
                      <th className="p-2.5 text-right">Rate (USD)</th>
                      <th className="p-2.5 text-right">Total (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    <tr>
                      <td className="p-2.5 font-sans">
                        <span className="font-bold">0901.11 · Screen 18 Natural Robusta Coffee</span>
                        <span className="text-[10px] text-stone-500 block">Grade A, Single Farm Origin, 1,350m, Moisture &lt;12.0%</span>
                      </td>
                      <td className="p-2.5 text-right">3,000 kg</td>
                      <td className="p-2.5 text-right">$4.20 / kg</td>
                      <td className="p-2.5 text-right font-bold">$12,600.00</td>
                    </tr>
                    <tr className="bg-amber-50/50">
                      <td className="p-2.5 font-sans" colSpan={3}>
                        <span className="font-semibold text-emerald-800">
                          Less: Verified Cupping Sample Fee Credit (<code className="text-[10px]">credited_to_order_id</code>)
                        </span>
                      </td>
                      <td className="p-2.5 text-right text-emerald-700 font-bold">-$120.00</td>
                    </tr>
                    <tr className="bg-stone-50 font-bold text-sm">
                      <td className="p-2.5 font-sans" colSpan={3}>Commercial Contract Total (USD)</td>
                      <td className="p-2.5 text-right text-[#D4A017]">$12,480.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Split Payment Milestones Breakdown (PDD §5.4 & §8.5) */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-2">
              <span className="font-bold text-amber-900 uppercase tracking-wider block">
                Commercial Split Milestone Settlement Terms (30/70)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 font-mono">
                <div className="p-2.5 bg-white rounded-lg border border-amber-200">
                  <span className="text-[10px] text-stone-500 block">Milestone 1: 30% Downpayment</span>
                  <span className="text-base font-bold text-stone-900">$3,744.00</span>
                  <span className="text-[10px] text-stone-500 block mt-0.5">Triggers milling, bag tagging & export clearing</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-amber-200">
                  <span className="text-[10px] text-stone-500 block">Milestone 2: 70% Final Settlement</span>
                  <span className="text-base font-bold text-stone-900">$8,736.00</span>
                  <span className="text-[10px] text-stone-500 block mt-0.5">Upon presentation of Clean Bill of Lading (B/L)</span>
                </div>
              </div>
            </div>

            {/* Official Settlement Banking Rails */}
            <div className="text-[11px] font-mono text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-800 uppercase block mb-1">SWIFT Banking Coordinates:</span>
              <p>• Beneficiary: Ntamba Processors Limited</p>
              <p>• Bank: Absa Bank Uganda Limited, Kampala Main Branch · SWIFT: BARCUGKX</p>
              <p>• EU Sourcing Account (EUR): DARAJA UG (haftungsbeschränkt), Günzburg, Germany</p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 bg-[#2A1E17] hover:bg-[#D4A017] text-white hover:text-[#2A1E17] rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                Print / Save PDF Draft
              </button>
              <button
                type="button"
                onClick={() => setShowProformaModal(false)}
                className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-bold text-xs uppercase transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1-CLICK FAST-TRACK CUPPING SAMPLE MODAL FOR VERIFIED ROASTERS */}
      {showFastTrackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setShowFastTrackModal(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          <div className="relative bg-[#1C140F] border border-[rgba(212,160,23,0.3)] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 text-[#F5EBE1] space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(212,160,23,0.2)]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5A93C] font-mono block">
                  ⚡ 1-Click Fast-Track Dispatch
                </span>
                <h3 className="font-heading font-serif text-xl sm:text-2xl font-bold text-[#F5EBE1] mt-0.5">
                  Commercial Cupping Sample Kit
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFastTrackModal(false)}
                className="p-2 text-[#A89F91] hover:text-[#F5EBE1] rounded-full hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            {fastTrackSuccess ? (
              /* Success State */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mx-auto shadow-inner">
                  ✓
                </div>
                <h4 className="font-heading font-serif text-xl font-bold text-[#F5EBE1]">
                  DHL Express Docket Generated!
                </h4>
                <p className="text-xs text-[#A89F91] max-w-sm mx-auto">
                  Your commercial sample kit has been queued for airfreight dispatch from our Entebbe export hub to your registered European roasting facility.
                </p>

                <div className="p-4 bg-[#140E0A] rounded-2xl border border-[rgba(212,160,23,0.25)] text-left text-xs font-mono space-y-1.5 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-[#9E9484]">Tracking Docket:</span>
                    <span className="font-bold text-[#E5A93C]">{fastTrackSuccess}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9E9484]">Carrier:</span>
                    <span>DHL Express Worldwide</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9E9484]">ETA:</span>
                    <span>3–5 Business Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9E9484]">Phytosanitary:</span>
                    <span className="text-emerald-400">Pre-Cleared (UCDA Verified)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9E9484]">Remaining Quota:</span>
                    <span className="font-bold">{remainingQuota} of 2</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFastTrackModal(false)}
                    className="w-full py-3.5 bg-[#D4A017] hover:bg-[#E5A93C] text-[#140E0A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md font-ui"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Request State */
              <div className="space-y-5">
                
                {/* Roastery Credentials */}
                <div className="p-3.5 bg-[#140E0A] rounded-xl border border-[rgba(212,160,23,0.15)] flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[#9E9484] block">Verified Commercial Account:</span>
                    <span className="font-bold text-[#F5EBE1]">Nordic Specialty Roasters GmbH</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                    KYC Cleared
                  </span>
                </div>

                {/* Sample Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#A89F91] block font-ui">
                    Select Origin Micro-Lot Batch:
                  </label>
                  <div className="space-y-2">
                    <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${sampleKitSelection === 'screen18_natural' ? 'bg-[#D4A017]/10 border-[#D4A017] text-[#F5EBE1]' : 'bg-[#140E0A] border-[rgba(212,160,23,0.15)] text-[#A89F91]'}`}>
                      <input
                        type="radio"
                        name="sample_lot"
                        checked={sampleKitSelection === 'screen18_natural'}
                        onChange={() => setSampleKitSelection('screen18_natural')}
                        className="accent-[#D4A017] mt-1"
                      />
                      <div className="text-xs">
                        <strong className="block text-[#F5EBE1]">Screen 18 Fine Robusta (250g Green Micro-Lot)</strong>
                        <span className="text-[11px] text-[#9E9484]">Natural process · 1,350m elevation · Cacao nibs & caramelized fig notes · 84.5 Q-Score</span>
                      </div>
                    </label>

                    <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${sampleKitSelection === 'screen18_washed' ? 'bg-[#D4A017]/10 border-[#D4A017] text-[#F5EBE1]' : 'bg-[#140E0A] border-[rgba(212,160,23,0.15)] text-[#A89F91]'}`}>
                      <input
                        type="radio"
                        name="sample_lot"
                        checked={sampleKitSelection === 'screen18_washed'}
                        onChange={() => setSampleKitSelection('screen18_washed')}
                        className="accent-[#D4A017] mt-1"
                      />
                      <div className="text-xs">
                        <strong className="block text-[#F5EBE1]">Screen 18 Washed Fine Robusta (250g Green Micro-Lot)</strong>
                        <span className="text-[11px] text-[#9E9484]">Eco-pulped & spring-water soaked · Bright citrus acidity & roasted macadamia</span>
                      </div>
                    </label>

                    <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${sampleKitSelection === 'roasted_duo' ? 'bg-[#D4A017]/10 border-[#D4A017] text-[#F5EBE1]' : 'bg-[#140E0A] border-[rgba(212,160,23,0.15)] text-[#A89F91]'}`}>
                      <input
                        type="radio"
                        name="sample_lot"
                        checked={sampleKitSelection === 'roasted_duo'}
                        onChange={() => setSampleKitSelection('roasted_duo')}
                        className="accent-[#D4A017] mt-1"
                      />
                      <div className="text-xs">
                        <strong className="block text-[#F5EBE1]">Roastery Comparison Duo (250g Green + 250g Medium-Dark Roasted)</strong>
                        <span className="text-[11px] text-[#9E9484]">Calibrated for direct sensory evaluation against your current commercial espresso blend</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Logistics Route */}
                <div className="p-3 bg-[#140E0A] rounded-xl border border-[rgba(212,160,23,0.15)] text-xs text-[#A89F91] space-y-1 font-mono">
                  <p className="flex justify-between">
                    <span>Dispatch Origin:</span>
                    <span className="text-[#F5EBE1]">Kyantamba Central Dry Mill / Entebbe</span>
                  </p>
                  <p className="flex justify-between">
                    <span>EU Partner Forwarder:</span>
                    <span className="text-[#F5EBE1]">DARAJA UG, Günzburg, Germany</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sample Fee:</span>
                    <span className="text-emerald-400 font-bold">$0.00 (Quarterly Allowance)</span>
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleFastTrackDispatch}
                    disabled={remainingQuota <= 0}
                    className="flex-1 py-3.5 min-h-[44px] bg-[#D4A017] hover:bg-[#E5A93C] text-[#140E0A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg font-ui flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    <span>⚡ Confirm & Dispatch Sample Kit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFastTrackModal(false)}
                    className="px-5 py-3.5 min-h-[44px] bg-white/10 hover:bg-white/20 text-[#A89F91] hover:text-[#F5EBE1] rounded-xl font-semibold text-xs transition-colors"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
