import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What is Calvras?",
      a: "Calvras is an Autonomous AI Marketing & Growth Partner. Unlike basic copy generators, Calvras operates as a full-stack marketing system that generates multi-channel brand strategies, high-converting ad copy, 3-part video scripts, email funnels, and real-time conversion diagnostics."
    },
    {
      q: "How does Calvras differ from generic tools like ChatGPT?",
      a: "Generic AI requires endless manual prompting. Calvras is purpose-trained with over 300+ practitioner marketing frameworks, live direct-response copy teardowns, and media buying blueprints that output production-ready assets instantly formatted in copyable template blocks."
    },
    {
      q: "Which advertising and growth channels are supported?",
      a: "Calvras generates platform-native marketing assets for Meta (Facebook & Instagram feed/stories), TikTok (organic hooks & Spark Ads), Google Ads (Search & Performance Max), LinkedIn Document Ads, X, and Klaviyo/Omnisend email and SMS funnels."
    },
    {
      q: "What is the Campaign Doctor?",
      a: "Campaign Doctor is an autonomous diagnostic engine. When your ad costs spike or conversion rate drops, it audits your funnel, uncovers message mismatches or checkout friction, and delivers an exact 3-step recovery playbook."
    },
    {
      q: "How do subscriptions and billing work?",
      a: "Calvras plans start at just $10/month ($8/month billed annually). Every plan includes immediate access to our autonomous marketing copilot, direct-response copy teardowns, and multi-channel campaign roadmaps. You can upgrade, downgrade, or cancel anytime directly in your account settings."
    }
  ];

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/10 text-white">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3.5">
        <p className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-neutral-400">
          QUESTIONS & ANSWERS
        </p>
        <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Direct answers to common questions about our platform and workflows.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-[#161714] border-white/20 shadow-lg' : 'bg-[#121310] hover:bg-[#161714] border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(idx)}
                className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-semibold text-sm sm:text-base text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-neutral-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-150">
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
