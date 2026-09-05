import React from 'react';
import { FOOTER_COLUMNS, ALL_FOOTER_LINKS } from '../data/topicRegistry';

export { FOOTER_COLUMNS, ALL_FOOTER_LINKS };

export default function CalvrasFooter({ onNavigate, onOpenCustomerService }) {
  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (link.isCustomService && onOpenCustomerService) {
      onOpenCustomerService();
      return;
    }
    if (onNavigate) {
      onNavigate(link.slug, link);
    }
  };

  return (
    <footer className="w-full bg-[#1B1B1C] text-neutral-300 border-t border-white/[0.08] select-none font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12">
        
        {/* ── 4 Primary Column Tracks matching reference layout ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-[13.5px]">
          {FOOTER_COLUMNS.map((col, cIdx) => (
            <div key={cIdx} className="space-y-10">
              {col.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3.5">
                  <h3 className="font-semibold text-white tracking-tight text-[14px]">
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a
                          href={`/${link.slug}`}
                          onClick={(e) => handleLinkClick(e, link)}
                          className="text-neutral-400 hover:text-white transition-colors duration-150 inline-block leading-snug cursor-pointer"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Hairline Divider & Brand Compliance ── */}
        <div className="border-t border-white/[0.08] mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          
          {/* Copyright Brand Statement */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Calvras" className="w-5 h-5 object-contain opacity-85" />
            <span className="font-medium text-neutral-300 tracking-tight">
              © 2026 Calvras Technologies. All rights reserved.
            </span>
          </div>

          {/* Compliance & Processing Note */}
          <div className="flex flex-wrap items-center gap-4 text-neutral-400">
            <span>Powered by Paystack</span>
            <span className="hidden sm:inline">•</span>
            <span>14-Day Money-Back Guarantee</span>
            <span className="hidden sm:inline">•</span>
            <span>Zero Code Training Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
