import React, { useState } from 'react';
import { X, Check, Zap, Sparkles, Users, ArrowRight, TrendingUp, Globe, GitBranch, Layers } from 'lucide-react';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Try the AI: build a small project and create basic marketing content.',
    monthlyPrice: 0,
    annualPrice: 0,
    color: 'neutral',
    accent: 'text-neutral-300',
    border: 'border-[#2a2a38]',
    bg: 'bg-[#171720]',
    badge: null,
    cta: 'Current Plan',
    ctaDisabled: true,
    features: [
      { label: 'AI coding requests', value: '10 / day' },
      { label: 'AI marketing requests', value: '10 / day' },
      { label: 'Project limit', value: '2 projects (public)' },
      { label: 'Website / app generation', value: 'Basic' },
      { label: 'URL / screenshot cloning', value: '2 / month' },
      { label: 'Image generation', value: '5 / month' },
      { label: 'Version history', value: 'Last 3 versions' },
      { label: 'Published projects', value: '1 live project' },
      { label: 'Social-media posts', value: '10 / month' },
      { label: 'SEO tools', value: 'Basic title & description' },
      { label: 'Support', value: 'Community / help centre' },
    ],
    unavailable: ['Private projects', 'Export code as ZIP', 'GitHub sync', 'Custom domains', 'Team collaboration', 'Brand voice', 'Usage top-ups'],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Build, fix, clone, deploy, and market your website or app — all in one place.',
    monthlyPrice: 14,
    annualPrice: 11,
    color: 'blue',
    accent: 'text-blue-400',
    border: 'border-blue-500/60',
    bg: 'bg-gradient-to-b from-[#1b2238] to-[#141829]',
    badge: 'Most Popular',
    cta: 'Upgrade to Pro',
    ctaDisabled: false,
    features: [
      { label: 'AI coding requests', value: '200 / month' },
      { label: 'AI marketing requests', value: '300 / month' },
      { label: 'Project limit', value: '15 projects' },
      { label: 'Private projects', value: 'Yes' },
      { label: 'Website / app generation', value: 'Full access' },
      { label: 'Error fixing', value: 'Advanced fixes' },
      { label: 'URL / screenshot cloning', value: '30 / month' },
      { label: 'Export code as ZIP', value: 'Yes' },
      { label: 'GitHub sync', value: 'Yes' },
      { label: 'Custom domains', value: '2 domains' },
      { label: 'Version history', value: 'Last 30 versions' },
      { label: 'Published projects', value: '10 live projects' },
      { label: 'Social-media posts', value: '100 / month' },
      { label: 'Ad copy generation', value: '50 / month' },
      { label: 'Email campaigns', value: '50 / month' },
      { label: 'SEO tools', value: 'Keywords, blog outlines, audit' },
      { label: 'Brand voice', value: '1 saved brand voice' },
      { label: 'Image generation', value: '50 / month' },
      { label: 'Team collaboration', value: '1 extra collaborator' },
      { label: 'Usage top-ups', value: 'Yes' },
      { label: 'Support', value: 'Email support' },
    ],
    unavailable: [],
  },
  {
    id: 'power',
    name: 'Power',
    tagline: 'Create and manage more projects, campaigns, and client work with higher AI limits, team access, and priority support.',
    monthlyPrice: 40,
    annualPrice: 32,
    color: 'purple',
    accent: 'text-purple-400',
    border: 'border-[#2a2a38]',
    bg: 'bg-[#171720]',
    badge: 'Agencies & Teams',
    cta: 'Upgrade to Power',
    ctaDisabled: false,
    features: [
      { label: 'AI coding requests', value: '800 / month' },
      { label: 'AI marketing requests', value: '1,200 / month' },
      { label: 'Project limit', value: 'Unlimited' },
      { label: 'Private projects', value: 'Yes' },
      { label: 'Website / app generation', value: 'Priority generation' },
      { label: 'Error fixing', value: 'Advanced + priority' },
      { label: 'URL / screenshot cloning', value: '150 / month' },
      { label: 'Export code as ZIP', value: 'Yes' },
      { label: 'GitHub sync', value: 'Yes, incl. private repos' },
      { label: 'Custom domains', value: '10 domains' },
      { label: 'Version history', value: 'Unlimited' },
      { label: 'Published projects', value: 'Unlimited' },
      { label: 'Social-media posts', value: '500 / month' },
      { label: 'Ad copy generation', value: '250 / month' },
      { label: 'Email campaigns', value: '250 / month' },
      { label: 'SEO tools', value: 'Advanced audits, content clusters, competitor analysis' },
      { label: 'Brand voice', value: '5 saved brand voices' },
      { label: 'Image generation', value: '250 / month' },
      { label: 'Team collaboration', value: '5 collaborators' },
      { label: 'Usage top-ups', value: 'Yes, cheaper per credit' },
      { label: 'Remove branding', value: 'Yes' },
      { label: 'Support', value: 'Priority email / chat' },
    ],
    unavailable: [],
  },
];

const CHECK_COLORS = {
  neutral: 'text-emerald-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
};

export default function UpgradeModal({ isOpen, onClose }) {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [upgrading, setUpgrading] = useState(null);
  const [done, setDone] = useState(null);

  if (!isOpen) return null;

  const handleSelect = (planId) => {
    if (planId === 'free') return;
    setUpgrading(planId);
    setTimeout(() => {
      setUpgrading(null);
      setDone(planId);
      setTimeout(() => {
        setDone(null);
        onClose();
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#121217] border border-[#2c2c3b] rounded-3xl shadow-2xl overflow-hidden mb-6">
        {/* Ambient glows */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 text-neutral-400 hover:text-white rounded-full bg-[#1c1c24] hover:bg-[#252533] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-6 px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <Sparkles size={13} />
            <span>CODING + MARKETING AI IN ONE PLACE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Choose your plan
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-md mx-auto">
            AI credits for coding and marketing — unused Pro &amp; Power credits roll over for one month.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center p-1 bg-[#1a1a24] rounded-full border border-[#2a2a38] mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-blue-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Annual
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/30 leading-none">
                −20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
          {PLANS.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            const isHighlighted = plan.id === 'pro';
            const isLoading = upgrading === plan.id;
            const isDone = done === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-5 ${plan.bg} ${plan.border} ${isHighlighted ? 'shadow-[0_0_32px_rgba(59,130,246,0.15)] border-2' : ''}`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow ${plan.id === 'pro' ? 'bg-blue-600 text-white' : 'bg-purple-600/80 text-white'}`}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan name + price */}
                <div className="mb-4">
                  <div className={`text-sm font-bold mb-1 ${plan.accent}`}>{plan.name}</div>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-black text-white">${price}</span>
                    <span className="text-xs text-neutral-500 mb-1">/mo</span>
                    {billingCycle === 'annual' && price > 0 && (
                      <span className="text-[10px] text-emerald-400 mb-1 ml-1">billed annually</span>
                    )}
                  </div>
                  <p className="text-[11.5px] text-neutral-400 leading-relaxed">{plan.tagline}</p>
                </div>

                {/* Key limits callout */}
                {plan.id !== 'free' && (
                  <div className={`mb-4 p-3 rounded-xl border text-[11.5px] space-y-1 ${plan.id === 'pro' ? 'bg-blue-500/8 border-blue-500/20' : 'bg-purple-500/8 border-purple-500/20'}`}>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Coding credits</span>
                      <span className={`font-semibold ${plan.accent}`}>{plan.id === 'pro' ? '200 / mo' : '800 / mo'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Marketing credits</span>
                      <span className={`font-semibold ${plan.accent}`}>{plan.id === 'pro' ? '300 / mo' : '1,200 / mo'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Projects</span>
                      <span className={`font-semibold ${plan.accent}`}>{plan.id === 'pro' ? '15' : 'Unlimited'}</span>
                    </div>
                  </div>
                )}

                {/* Feature list */}
                <div className="flex-1 space-y-2">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px]">
                      <Check size={13} className={`${CHECK_COLORS[plan.color]} mt-0.5 flex-shrink-0`} />
                      <span className="text-neutral-300 leading-snug">
                        <span className="text-neutral-500">{f.label}:</span>{' '}
                        <span className="text-neutral-200 font-medium">{f.value}</span>
                      </span>
                    </div>
                  ))}
                  {plan.unavailable.map((f, i) => (
                    <div key={`no-${i}`} className="flex items-start gap-2 text-[12px]">
                      <X size={13} className="text-neutral-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-600">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleSelect(plan.id)}
                  disabled={plan.ctaDisabled || isLoading}
                  className={`w-full mt-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5
                    ${plan.id === 'free' ? 'bg-[#20202c] text-neutral-500 cursor-not-allowed' : ''}
                    ${plan.id === 'pro' && !isLoading && !isDone ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25' : ''}
                    ${plan.id === 'power' && !isLoading && !isDone ? 'bg-[#2c1f4a] hover:bg-[#361e5c] text-purple-200 border border-purple-500/30' : ''}
                    ${isLoading ? 'opacity-60 cursor-wait' : ''}
                    ${isDone ? 'bg-emerald-600 text-white' : ''}
                  `}
                >
                  {isDone ? (
                    <><Check size={14} /> Activated!</>
                  ) : isLoading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <span>{plan.cta}</span>
                      {!plan.ctaDisabled && <ArrowRight size={13} />}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="border-t border-[#1e1e2a] px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] text-neutral-500">
          <span className="flex items-center gap-1.5"><TrendingUp size={12} className="text-emerald-400" /> Unused credits roll over 1 month</span>
          <span className="flex items-center gap-1.5"><Layers size={12} className="text-blue-400" /> Top-ups available on Pro &amp; Power</span>
          <span className="flex items-center gap-1.5"><GitBranch size={12} className="text-purple-400" /> You own your code — export anytime</span>
          <span className="flex items-center gap-1.5"><Globe size={12} className="text-amber-400" /> Cancel anytime, no lock-in</span>
        </div>
      </div>
    </div>
  );
}
