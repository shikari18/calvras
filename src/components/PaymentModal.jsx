import React, { useState } from 'react';
import { X, CreditCard, Lock, Tag, Check } from 'lucide-react';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Ghana', 'Nigeria', 'South Africa', 'India', 'Other',
];

export default function PaymentModal({ plan, isAnnual, onClose, onSuccess }) {
  const [method, setMethod] = useState('card'); // 'card' | 'googlepay'
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('United States');
  const [address, setAddress] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [showPromo, setShowPromo] = useState(false);
  const [annualToggle, setAnnualToggle] = useState(isAnnual);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const monthlyPrice = plan.monthlyPrice;
  const annualMonthlyPrice = plan.annualPrice;
  const displayPrice = annualToggle ? annualMonthlyPrice : monthlyPrice;
  const totalToday = annualToggle ? (annualMonthlyPrice * 12).toFixed(2) : monthlyPrice.toFixed(2);
  const billingLabel = annualToggle ? 'year' : 'month';
  const annualSavePct = Math.round((1 - annualMonthlyPrice / monthlyPrice) * 100);

  const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + ' / ' + d.slice(2) : d;
  };

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => { if (onSuccess) onSuccess(); }, 1600);
    }, 2000);
  };

  const handleGooglePay = () => {
    setMethod('googlepay');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => { if (onSuccess) onSuccess(); }, 1600);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget && !loading) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[860px] bg-[#111] rounded-[20px] border border-white/[0.07] shadow-[0_40px_100px_rgba(0,0,0,0.7)] overflow-hidden animate-modal-in flex flex-col md:flex-row max-h-[90vh]">

        {done ? (
          <div className="flex flex-col items-center justify-center w-full py-20 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-5">
              <Check size={28} className="text-emerald-400" strokeWidth={2.5} />
            </div>
            <h3 className="text-[20px] font-bold text-[#e5e5e5] mb-2">Payment successful</h3>
            <p className="text-[13px] text-[#8a9ab5]">Welcome to {plan.name}. Setting up your account…</p>
          </div>
        ) : (
          <>
            {/* ── LEFT: Payment form ── */}
            <div className="flex-1 overflow-y-auto p-7 border-r border-white/[0.06]">

              {/* Close (mobile) */}
              <button
                onClick={onClose}
                className="md:hidden absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={14} className="text-[#8a9ab5]" />
              </button>

              <h2 className="text-[15px] font-bold text-[#e5e5e5] mb-5">Payment Method</h2>

              {/* Method tabs */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`flex flex-col items-start gap-1 p-3.5 rounded-[12px] border transition-all cursor-pointer ${
                    method === 'card'
                      ? 'border-white/30 bg-white/[0.06]'
                      : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <CreditCard size={16} className="text-[#8a9ab5]" />
                  <span className="text-[13px] font-semibold text-[#e5e5e5]">Card</span>
                </button>
                <button
                  type="button"
                  onClick={handleGooglePay}
                  className={`flex flex-col items-start gap-1 p-3.5 rounded-[12px] border transition-all cursor-pointer ${
                    method === 'googlepay'
                      ? 'border-white/30 bg-white/[0.06]'
                      : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="text-[13px] text-[#8a9ab5]">G Pay</span>
                  <span className="text-[13px] font-semibold text-[#e5e5e5]">Google Pay</span>
                </button>
              </div>

              {/* Terms note */}
              <p className="text-[11px] text-[#555] leading-relaxed mb-5">
                By clicking "Confirm and pay" you agree to our{' '}
                <span className="text-[#8a9ab5] cursor-pointer hover:underline">Terms of Service</span> and{' '}
                <span className="text-[#8a9ab5] cursor-pointer hover:underline">Privacy Policy</span>, and authorise us to charge ${totalToday}/{billingLabel} until you cancel.
              </p>

              {/* Card form */}
              {method === 'card' && (
                <form onSubmit={handlePay} className="space-y-3.5">

                  {/* Card number */}
                  <div>
                    <label className="text-[11px] font-semibold text-[#666] uppercase tracking-wide block mb-1.5">Card number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNum}
                        onChange={(e) => setCardNum(formatCard(e.target.value))}
                        placeholder="1234 1234 1234 1234"
                        required
                        inputMode="numeric"
                        className="w-full h-[42px] rounded-[9px] bg-white/[0.04] border border-white/[0.08] focus:border-white/20 outline-none px-3.5 pr-28 text-[13px] text-[#e5e5e5] placeholder-[#333] transition-colors"
                      />
                      {/* Card brand icons */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5 items-center">
                        <span className="text-[9px] font-bold bg-[#1a1aff] text-white px-1 py-0.5 rounded">VISA</span>
                        <span className="text-[9px] font-bold bg-[#eb001b] text-white px-1 py-0.5 rounded">MC</span>
                      </div>
                    </div>
                  </div>

                  {/* Expiry + CVC */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#666] uppercase tracking-wide block mb-1.5">Expiration date</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM / YY"
                        required
                        inputMode="numeric"
                        className="w-full h-[42px] rounded-[9px] bg-white/[0.04] border border-white/[0.08] focus:border-white/20 outline-none px-3.5 text-[13px] text-[#e5e5e5] placeholder-[#333] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#666] uppercase tracking-wide block mb-1.5">Security code</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="CVC"
                          required
                          inputMode="numeric"
                          className="w-full h-[42px] rounded-[9px] bg-white/[0.04] border border-white/[0.08] focus:border-white/20 outline-none px-3.5 pr-10 text-[13px] text-[#e5e5e5] placeholder-[#333] transition-colors"
                        />
                        <CreditCard size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444]" />
                      </div>
                    </div>
                  </div>

                  {/* Billing info */}
                  <p className="text-[12px] font-semibold text-[#e5e5e5] pt-1">Billing Information</p>

                  <div>
                    <label className="text-[11px] font-semibold text-[#666] uppercase tracking-wide block mb-1.5">Full name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Smith"
                      required
                      className="w-full h-[42px] rounded-[9px] bg-white/[0.04] border border-white/[0.08] focus:border-white/20 outline-none px-3.5 text-[13px] text-[#e5e5e5] placeholder-[#333] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#666] uppercase tracking-wide block mb-1.5">Country or region</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-[42px] rounded-[9px] bg-[#1a1a1a] border border-white/[0.08] focus:border-white/20 outline-none px-3.5 text-[13px] text-[#e5e5e5] transition-colors cursor-pointer"
                    >
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#666] uppercase tracking-wide block mb-1.5">Address line 1</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St"
                      className="w-full h-[42px] rounded-[9px] bg-white/[0.04] border border-white/[0.08] focus:border-white/20 outline-none px-3.5 text-[13px] text-[#e5e5e5] placeholder-[#333] transition-colors"
                    />
                  </div>

                  {/* Confirm button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[46px] rounded-[12px] bg-white hover:bg-[#e5e5e5] text-[#0f0f0e] text-[13px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 mt-1"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-[#0f0f0e]/30 border-t-[#0f0f0e] rounded-full animate-spin" />
                    ) : (
                      <>
                        <Lock size={13} strokeWidth={2.5} />
                        Confirm and pay
                      </>
                    )}
                  </button>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#333]">Powered by Paystack</span>
                    <div className="flex gap-3">
                      <span className="text-[11px] text-[#444] cursor-pointer hover:text-[#666]">Privacy</span>
                      <span className="text-[11px] text-[#444] cursor-pointer hover:text-[#666]">Terms</span>
                    </div>
                  </div>
                </form>
              )}

              {method === 'googlepay' && loading && (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <span className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <p className="text-[13px] text-[#8a9ab5]">Connecting to Google Pay…</p>
                </div>
              )}
            </div>

            {/* ── RIGHT: Plan summary ── */}
            <div className="w-full md:w-[280px] flex-shrink-0 bg-[#0e0e0e] p-7 flex flex-col gap-5 border-t md:border-t-0 border-white/[0.06]">

              {/* Close (desktop) */}
              <button
                onClick={onClose}
                className="hidden md:flex absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.1] items-center justify-center transition-colors cursor-pointer"
              >
                <X size={14} className="text-[#8a9ab5]" />
              </button>

              {/* Plan name + desc */}
              <div>
                <h3 className="text-[17px] font-bold text-[#e5e5e5] mb-1">{plan.name}</h3>
                <p className="text-[12px] text-[#8a9ab5] leading-relaxed">{plan.tagline}</p>
              </div>

              {/* Annual toggle */}
              <div className="flex items-center justify-between bg-white/[0.04] rounded-[10px] px-3.5 py-2.5 border border-white/[0.06]">
                <span className="text-[12px] font-semibold text-[#e5e5e5]">Billed annually</span>
                <div className="flex items-center gap-2">
                  {annualToggle && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded-full">
                      Save {annualSavePct}%
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setAnnualToggle((v) => !v)}
                    className={`relative w-[38px] h-[22px] rounded-full transition-colors duration-300 cursor-pointer focus:outline-none ${
                      annualToggle ? 'bg-emerald-500' : 'bg-[#2a2a2a]'
                    }`}
                  >
                    <span className={`absolute top-[3px] left-[3px] w-[16px] h-[16px] rounded-full bg-white shadow transition-all duration-300 ${
                      annualToggle ? 'translate-x-[16px]' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Promo code */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowPromo((v) => !v)}
                  className="flex items-center gap-1.5 text-[12px] text-[#8a9ab5] hover:text-[#e5e5e5] transition-colors cursor-pointer"
                >
                  <Tag size={12} />
                  Apply code
                </button>
                {showPromo && (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="PROMO CODE"
                      className="flex-1 h-[36px] rounded-[8px] bg-white/[0.04] border border-white/[0.08] focus:border-white/20 outline-none px-3 text-[12px] text-[#e5e5e5] placeholder-[#333] transition-colors"
                    />
                    <button
                      type="button"
                      className="h-[36px] px-3 rounded-[8px] bg-white/[0.07] hover:bg-white/[0.12] text-[12px] font-semibold text-[#e5e5e5] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.06]" />

              {/* Price breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#8a9ab5]">Subtotal</span>
                  <span className="text-[#e5e5e5]">${totalToday}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#8a9ab5]">VAT</span>
                  <span className="text-[#e5e5e5]">$0.00</span>
                </div>
                <div className="flex justify-between text-[13px] font-bold pt-1 border-t border-white/[0.06]">
                  <span className="text-[#e5e5e5]">Total due today</span>
                  <span className="text-[#e5e5e5]">${totalToday}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
