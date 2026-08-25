import React from 'react';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';

export const ComparisonSection = ({ onNavigate }) => {
  const comparisonRows = [
    {
      feature: "Full-Funnel Strategy Generation",
      calvras: "Autonomous 30-day multi-channel roadmap with budget pacing",
      traditional: "Single-turn prompt box (user must design the strategy)",
      calvrasCheck: true,
      traditionalCheck: false
    },
    {
      feature: "Closed Optimization Loop",
      calvras: "Continuous Observe ➔ Decide ➔ Execute ➔ Optimize cycle",
      traditional: "One-way text generation (no feedback loop)",
      calvrasCheck: true,
      traditionalCheck: false
    },
    {
      feature: "Viral Social Hooks & Video Scripts",
      calvras: "3-part high-retention TikTok & Reel scripts with visual cues",
      traditional: "Generic social media captions with hashtags",
      calvrasCheck: true,
      traditionalCheck: false
    },
    {
      feature: "WhatsApp & Mobile Checkout Triggers",
      calvras: "Automated VIP broadcasts with instant 1-click payment links",
      traditional: "Plain text with no payment or checkout integration",
      calvrasCheck: true,
      traditionalCheck: false
    },
    {
      feature: "Campaign Doctor (CRO Diagnostics)",
      calvras: "Diagnoses high CPA, funnel leaks, and landing page friction",
      traditional: "No analytics or conversion diagnostic capabilities",
      calvrasCheck: true,
      traditionalCheck: false
    },
    {
      feature: "Real-Time Revenue & Video Attribution",
      calvras: "Direct TikTok, Meta, and X analytics sync with ROAS tracking",
      traditional: "Disconnected from actual ad account metrics",
      calvrasCheck: true,
      traditionalCheck: false
    }
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-100">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold">
          <Sparkles size={13} className="text-purple-600" />
          <span>The Next Generation of Growth</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 font-serif">
          Why Calvras beats traditional AI copy tools
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 font-sans">
          Most marketing tools are simple wrappers that write generic text. Calvras is an autonomous operating system designed to execute and scale end-to-end customer acquisition.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-neutral-200/90 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-neutral-200/80 bg-neutral-50/80 p-4 sm:p-6 text-sm font-semibold text-neutral-800">
          <div className="md:col-span-4 text-neutral-500 uppercase tracking-wider text-xs">Capabilities & Architecture</div>
          <div className="md:col-span-4 flex items-center gap-2 text-neutral-950 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
            Calvras Growth OS
          </div>
          <div className="md:col-span-4 text-neutral-500 hidden md:block">Generic AI Copywriters</div>
        </div>

        <div className="divide-y divide-neutral-100">
          {comparisonRows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-6 text-sm gap-3 md:gap-0 hover:bg-neutral-50/50 transition-colors">
              <div className="md:col-span-4 font-semibold text-neutral-900 flex items-center">
                {row.feature}
              </div>
              <div className="md:col-span-4 flex items-start gap-2.5 text-neutral-900 font-medium">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={13} strokeWidth={2.5} />
                </div>
                <span>{row.calvras}</span>
              </div>
              <div className="md:col-span-4 flex items-start gap-2.5 text-neutral-500">
                <div className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center shrink-0 mt-0.5">
                  <X size={13} strokeWidth={2.5} />
                </div>
                <span>{row.traditional}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div className="mt-12 text-center">
        <button
          onClick={() => onNavigate && onNavigate('get-started')}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-neutral-950 hover:bg-neutral-850 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <span>Experience Calvras Free</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};
