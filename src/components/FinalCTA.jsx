import React from 'react';

export const FinalCTA = ({ onNavigate }) => {
  return (
    <section className="py-32 md:py-48 border-t border-neutral-100 bg-white text-neutral-950 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-[48px] sm:text-[64px] lg:text-[78px] font-bold text-neutral-950 tracking-[-0.04em] leading-[1.02] mb-6">Ready to<br />market smarter?</h2>
        <p className="text-lg sm:text-xl text-neutral-500 font-normal leading-relaxed max-w-lg mx-auto mb-10">Your business has enough to do.<br />Let AI handle the marketing.</p>
        <div><button onClick={() => onNavigate('get-started')} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base px-10 py-4 rounded-full transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95">Get started</button></div>
      </div>
    </section>
  );
};
