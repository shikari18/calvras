import React from 'react';
import { ArrowRight } from 'lucide-react';

export const FinalCTA = ({ onNavigate }) => {
  return (
    <section className="py-32 md:py-44 border-t border-white/10 bg-[#1c1c1c] text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-6">
        <p className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-neutral-400">
          START TODAY
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-white tracking-tight leading-[1.05]">
          Ready to scale your<br />
          brand effortlessly?
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto leading-relaxed">
          One intelligent workspace that creates campaigns, directs AI video prompts, and grows your revenue.
        </p>
        <div className="pt-4">
          <button
            onClick={() => onNavigate('get-started')}
            className="bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-sm sm:text-base px-9 py-4 rounded-full transition-all duration-200 cursor-pointer shadow-xl hover:shadow-2xl active:scale-95 inline-flex items-center gap-2"
          >
            <span>Get started free</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
