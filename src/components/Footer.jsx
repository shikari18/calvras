import React from 'react';

export const Footer = ({ onOpenLegal }) => {
  return (
    <footer className="border-t border-white/10 bg-[#1c1c1c] py-12 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <img 
            src="/calvras.png" 
            alt="Calvras" 
            className="w-[29px] h-[29px] rounded-lg object-contain" 
          />
          <span className="text-sm font-bold text-white font-sans tracking-tight">Calvras</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-neutral-400">
          <a href="#hero" className="hover:text-white transition">Home</a>
          <a href="#how-it-works" className="hover:text-white transition">Solutions</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="https://www.recraft.ai/privacy" target="_blank" rel="noreferrer" className="hover:text-white transition">Privacy</a>
          <a href="https://www.recraft.ai/terms" target="_blank" rel="noreferrer" className="hover:text-white transition">Terms</a>
        </div>
        <div className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Calvras. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
