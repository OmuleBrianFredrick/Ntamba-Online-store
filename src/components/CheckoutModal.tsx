import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { NtambaLogo } from './NtambaLogo';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    subtotalUGX,
    formatPrice,
    clearCart,
    navigateTo
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | 'swift'>('momo');
  const [phoneNumber, setPhoneNumber] = useState('256782333223');
  const [momoProvider, setMomoProvider] = useState<'mtn' | 'airtel'>('mtn');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Kampala');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const shippingFee = subtotalUGX >= 100000 ? 0 : 10000;
  const grandTotal = subtotalUGX + shippingFee;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const orderRef = 'NTB-' + Math.floor(100000 + Math.random() * 900000);
      setOrderComplete(orderRef);
      clearCart();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => !isProcessing && setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-[#2A1E17]/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-[#F9F7F2] rounded-2xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl border border-stone-200 z-10 max-h-[94vh] overflow-y-auto">
        
        {orderComplete ? (
          /* Success Receipt State */
          <div className="text-center py-8 space-y-4">
            <NtambaLogo variant="stacked" height={68} className="mx-auto mb-2" />
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#2D5A27] flex items-center justify-center text-2xl mx-auto shadow-sm">
              ✓
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#2D5A27] block">
              Order Successfully Authorized
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2A1E17]">
              Thank You for Supporting Ugandan Agroecology
            </h2>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Your order <strong className="font-mono text-[#2A1E17]">{orderComplete}</strong> has been logged into our fulfillment hub at Namukeekera Industrial Park. A digital receipt has been sent to your contact.
            </p>

            <div className="p-4 bg-white rounded-xl border border-stone-200 text-left text-xs max-w-md mx-auto space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500">Order ID:</span>
                <span className="font-bold">{orderComplete}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Settled:</span>
                <span className="font-bold text-[#D4A017]">{formatPrice(grandTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Channel:</span>
                <span className="uppercase">{paymentMethod === 'momo' ? `${momoProvider} Mobile Money` : paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Fulfillment Origin:</span>
                <span>Kyantamba Estate, Uganda</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setOrderComplete(null);
                  setIsCheckoutOpen(false);
                  navigateTo('shop');
                }}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#2A1E17] hover:bg-[#D4A017] hover:text-[#2A1E17] rounded-lg transition-all"
              >
                Return to Storefront
              </button>
              <button
                onClick={() => {
                  setOrderComplete(null);
                  setIsCheckoutOpen(false);
                  navigateTo('analytics');
                }}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-all"
              >
                View Live Analytics Entry
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-stone-200 mb-6">
              <div>
                <NtambaLogo variant="horizontal" height={36} className="mb-2" />
                <h2 className="font-heading text-2xl font-bold text-[#2A1E17]">Swift Checkout</h2>
                <p className="text-xs text-stone-500">Direct-from-origin dispatch · Encrypted gateway</p>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-lg p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCompleteOrder} className="space-y-6">
              {/* Customer Contact */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2A1E17]">
                  1. Delivery Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Street / Delivery Address *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City / Region *"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#D4A017]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2A1E17]">
                  2. Choose Payment Method
                </h3>
                
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'momo'
                        ? 'border-[#D4A017] bg-amber-50/70 text-[#2A1E17] font-bold shadow-sm'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-lg">📱</span>
                    <span className="text-xs">Mobile Money</span>
                    <span className="text-[10px] text-stone-400">MTN & Airtel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'border-[#D4A017] bg-amber-50/70 text-[#2A1E17] font-bold shadow-sm'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-lg">💳</span>
                    <span className="text-xs">Debit / Credit</span>
                    <span className="text-[10px] text-stone-400">Visa / Mastercard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('swift')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'swift'
                        ? 'border-[#D4A017] bg-amber-50/70 text-[#2A1E17] font-bold shadow-sm'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-lg">🏦</span>
                    <span className="text-xs">B2B SWIFT Wire</span>
                    <span className="text-[10px] text-stone-400">Pro-Forma Terms</span>
                  </button>
                </div>

                {/* Sub-panels based on paymentMethod */}
                {paymentMethod === 'momo' && (
                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3">
                    <div className="flex gap-4 text-xs font-semibold">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="momoProvider"
                          checked={momoProvider === 'mtn'}
                          onChange={() => setMomoProvider('mtn')}
                          className="text-[#D4A017]"
                        />
                        <span>MTN MoMo (*165#)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="momoProvider"
                          checked={momoProvider === 'airtel'}
                          onChange={() => setMomoProvider('airtel')}
                          className="text-[#D4A017]"
                        />
                        <span>Airtel Money (*185#)</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Mobile Money Number (Uganda / East Africa)
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. 256782333223"
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                      />
                      <p className="text-[10px] text-stone-400 mt-1">
                        A USSD prompt will be triggered to your handset to enter your secret PIN.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="16-Digit Card Number (Visa / Mastercard)"
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="CVV / CVC"
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'swift' && (
                  <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs space-y-2 text-stone-600 font-mono">
                    <div className="font-bold text-[#2A1E17] font-sans">
                      Pro-Forma Bank Wire Instructions:
                    </div>
                    <p>Beneficiary: Ntamba Processors Limited</p>
                    <p>Bank: Stanbic Bank Uganda Limited / Standard Chartered Kampala</p>
                    <p>SWIFT Code: SBICUGKX</p>
                    <p>Terms: 30% Deposit to initiate milling, 70% upon Bill of Lading (B/L)</p>
                  </div>
                )}
              </div>

              {/* Order Cost Breakdown */}
              <div className="p-4 bg-stone-100 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Items ({items.length})</span>
                  <span className="font-mono">{formatPrice(subtotalUGX)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Courier / Freight</span>
                  <span className="font-mono text-[#2D5A27]">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#2A1E17] pt-2 border-t border-stone-200">
                  <span>Total Amount Due</span>
                  <span className="font-mono text-base text-[#D4A017]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 text-xs font-bold uppercase tracking-wider text-[#2A1E17] bg-[#D4A017] hover:bg-[#b88910] hover:text-white transition-all rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin text-base">⚙️</span>
                    <span>Securing Network Settlement...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Authorize {formatPrice(grandTotal)}</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
