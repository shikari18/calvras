import React from 'react';
import { SparkleIcon } from './SparkleIcon';

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-200/60 bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <SparkleIcon size={16} className="text-purple-600" />
          <span className="text-sm font-bold text-neutral-950 tracking-tight">AI Marketing Assistant</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-neutral-500">
          <a href="#hero" className="hover:text-neutral-950 transition">Product</a>
          <a href="#how-it-works" className="hover:text-neutral-950 transition">How it works</a>
          <a href="#pricing" className="hover:text-neutral-950 transition">Pricing</a>
          <a href="#" className="hover:text-neutral-950 transition">Privacy</a>
          <a href="#" className="hover:text-neutral-950 transition">Terms</a>
        </div>
      </div>
    </footer>
  );
};
