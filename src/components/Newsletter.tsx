import React, { useState } from 'react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'all' | 'coffee' | 'wholesale'>('all');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate network submission and persist locally
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('ntamba_newsletter_subscribers') || '[]');
        const isDuplicate = existing.some((item: { email: string }) => item.email.toLowerCase() === email.trim().toLowerCase());
        
        if (!isDuplicate) {
          existing.push({
            email: email.trim(),
            interest,
            subscribedAt: new Date().toISOString()
          });
          localStorage.setItem('ntamba_newsletter_subscribers', JSON.stringify(existing));
        }

        setStatus('success');
      } catch {
        setStatus('success'); // Still treat as success for UI
      }
    }, 600);
  };

  const copyDiscountCode = () => {
    navigator.clipboard?.writeText('NTAMBA10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div
      className="w-full bg-[#1C140F] border border-[rgba(212,160,23,0.2)] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden my-8 antialiased subpixel-antialiased font-sans"
      style={{
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'geometricPrecision'
      }}
    >
      {/* Subtle background luxury glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-[#2D5A27]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Heading & Value Proposition */}
        <div className="lg:col-span-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/25 text-[#F5B738] text-xs font-semibold uppercase tracking-wide font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ntamba Dispatches & Seasonal Offers</span>
          </div>

          <h3 className="font-sans font-semibold text-2xl sm:text-3xl text-[#FAF7F2] tracking-wide leading-tight">
            Stay Rooted in Single-Origin Agroecology
          </h3>

          <p className="font-sans font-medium text-xs sm:text-sm text-[#D1C7BA] leading-relaxed max-w-[55ch]">
            Receive private micro-lot release announcements, Screen 18 harvest dispatches from Kyantamba Estate, seasonal discounts, and cupping lab updates.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 font-sans font-medium text-xs text-[#B5ABA0]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span>✓</span> 10% Welcome Discount
            </span>
            <span className="flex items-center gap-1.5 text-[#D1C7BA]">
              <span className="text-emerald-400">✓</span> Zero Spam, Unsubscribe Anytime
            </span>
            <span className="flex items-center gap-1.5 text-[#D1C7BA]">
              <span className="text-emerald-400">✓</span> Monthly Field Dispatches
            </span>
          </div>
        </div>

        {/* Right Column: Form or Success State */}
        <div className="lg:col-span-6 font-sans">
          {status === 'success' ? (
            <div className="bg-[#140E0A] border border-emerald-500/40 rounded-2xl p-6 text-center space-y-4 shadow-inner">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                ✓
              </div>
              
              <div>
                <h4 className="font-sans font-semibold text-lg text-[#FAF7F2] tracking-wide">
                  Welcome to the Ntamba Community!
                </h4>
                <p className="font-sans font-medium text-xs text-[#D1C7BA] mt-1 max-w-sm mx-auto leading-relaxed">
                  We've saved <strong className="text-[#F5B738] font-semibold">{email}</strong> to our seasonal dispatch list. Enjoy 10% off your next retail order:
                </p>
              </div>

              {/* Discount Voucher Code */}
              <div className="inline-flex items-center gap-3 bg-[#1C140F] border border-[#D4A017]/30 px-4 py-2 rounded-xl">
                <span className="font-mono text-sm font-bold text-[#F5B738] tracking-widest">
                  NTAMBA10
                </span>
                <button
                  type="button"
                  onClick={copyDiscountCode}
                  className="font-sans text-xs font-semibold text-[#D1C7BA] hover:text-[#FAF7F2] px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded transition-all"
                >
                  {copiedCode ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setEmail('');
                  }}
                  className="font-sans font-medium text-[11px] text-[#B5ABA0] hover:text-[#F5B738] underline transition-colors"
                >
                  Register another email address
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Segment Toggle */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-sans font-medium text-[#D1C7BA]">
                <span className="text-[11px] text-[#B5ABA0] uppercase tracking-wide mr-1 font-semibold">Interest:</span>
                <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-[#FAF7F2] transition-colors">
                  <input
                    type="radio"
                    name="interest"
                    checked={interest === 'all'}
                    onChange={() => setInterest('all')}
                    className="accent-[#D4A017]"
                  />
                  <span>All Updates</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-[#FAF7F2] transition-colors">
                  <input
                    type="radio"
                    name="interest"
                    checked={interest === 'coffee'}
                    onChange={() => setInterest('coffee')}
                    className="accent-[#D4A017]"
                  />
                  <span>Retail Coffee & Honey</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-[#FAF7F2] transition-colors">
                  <input
                    type="radio"
                    name="interest"
                    checked={interest === 'wholesale'}
                    onChange={() => setInterest('wholesale')}
                    className="accent-[#D4A017]"
                  />
                  <span>B2B Wholesale & Export</span>
                </label>
              </div>

              {/* Input Group */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address (e.g. roaster@domain.com)"
                    disabled={status === 'loading'}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#140E0A] border border-[rgba(212,160,23,0.3)] text-[#FAF7F2] placeholder-[#B5ABA0]/70 text-xs sm:text-sm font-sans font-medium focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent transition-all shadow-inner disabled:opacity-50"
                  />
                  <span className="absolute right-3.5 top-3.5 text-[#B5ABA0] text-xs pointer-events-none">
                    ✉️
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3.5 rounded-xl bg-[#D4A017] text-[#140E0A] font-sans font-semibold hover:bg-[#F5B738] active:scale-95 text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#140E0A] border-t-transparent rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Dispatch</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <p className="font-sans text-xs text-red-400 font-medium">
                  {errorMessage}
                </p>
              )}

              <p className="font-sans font-medium text-[11px] text-[#B5ABA0] leading-relaxed">
                By subscribing, you agree to receive email dispatches from Ntamba Processors Limited. We respect your privacy and never share your data.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
