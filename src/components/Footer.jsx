import React from 'react';
import { BrandBurstLogo } from './cy/CySidebar';

export const Footer = ({ onOpenLegal }) => {
  return (
    <footer className="border-t border-neutral-200/60 bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <BrandBurstLogo size={18} />
          <span className="text-sm font-bold text-neutral-950 font-serif tracking-tight">Calvras</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-neutral-500">
          <a href="#hero" className="hover:text-neutral-950 transition">Product</a>
          <a href="#how-it-works" className="hover:text-neutral-950 transition">How it works</a>
          <a href="#pricing" className="hover:text-neutral-950 transition">Pricing</a>
          <button onClick={() => onOpenLegal && onOpenLegal('privacy')} className="hover:text-neutral-950 transition cursor-pointer">Privacy</button>
          <button onClick={() => onOpenLegal && onOpenLegal('terms')} className="hover:text-neutral-950 transition cursor-pointer">Terms</button>
        </div>
      </div>
    </footer>
  );
};
