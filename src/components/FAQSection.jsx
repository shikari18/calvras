import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What is Calvras?",
      a: "Calvras is an Autonomous AI Marketing & Growth OS. Unlike basic copy generators, Calvras operates as an autonomous growth engine that generates multi-channel marketing roadmaps, produces viral ad creatives and 3-part video hooks, builds automated WhatsApp VIP broadcasts with payment triggers, and continuously diagnoses conversion rate leaks."
    },
    {
      q: "How does Calvras differ from generic AI tools like Jasper or ChatGPT?",
      a: "Generic tools require you to provide exact prompts and manually assemble your marketing puzzle piece-by-piece. Calvras operates on a continuous Observe ➔ Decide ➔ Execute ➔ Optimize loop. It understands your business metrics, dynamically plans 30-day budget allocations, writes platform-native ad copy, and diagnoses why your traffic isn't converting."
    },
    {
      q: "Which advertising and social platforms does Calvras support?",
      a: "Calvras provides native optimization for Meta (Facebook & Instagram), TikTok (organic viral hooks & Spark Ads), Google Ads, WhatsApp Business (automated VIP drops with Mobile Money & card checkout), and X (Twitter)."
    },
    {
      q: "What is the Campaign Doctor feature?",
      a: "Campaign Doctor is an autonomous conversion diagnostic system. When your ad cost (CPA) is high or website visitors aren't buying, Campaign Doctor audits your funnel to identify the root cause—such as ad-to-page message mismatches, mobile checkout friction, or slow load speeds—and provides actionable 3-step solutions to fix it."
    },
    {
      q: "Can I use Calvras for free?",
      a: "Yes! Calvras offers a generous Free tier that includes complimentary credits upon signup, access to the multi-channel marketing workspace, viral hook generators, and campaign diagnostics without requiring a credit card upfront."
    },
    {
      q: "Which payment methods are supported for pro subscriptions?",
      a: "Calvras supports secure global payments via Stripe (Credit/Debit Cards, Apple Pay, Google Pay) as well as localized payments across Africa via Paystack (Mobile Money / MoMo, Bank Transfers, and Cards in GHS, NGN, KES, and USD)."
    }
  ];

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-neutral-100">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold">
          <HelpCircle size={13} className="text-purple-600" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-serif">
          Everything you need to know about Calvras
        </h2>
        <p className="text-base text-neutral-600">
          Direct answers to common questions about our autonomous marketing platform, capabilities, and pricing.
        </p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-white border-neutral-300 shadow-sm' : 'bg-neutral-50/70 hover:bg-neutral-50 border-neutral-200/80'
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-neutral-950 text-base cursor-pointer select-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-neutral-500 transition-transform duration-200 shrink-0 ml-3 ${
                    isOpen ? 'rotate-180 text-neutral-950' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm sm:text-base text-neutral-600 leading-relaxed animate-in fade-in duration-200 border-t border-neutral-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
