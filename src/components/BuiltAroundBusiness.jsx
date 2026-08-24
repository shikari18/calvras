import React from 'react';
import { BrandBurstLogo } from './cy/CySidebar';

export const BuiltAroundBusiness = () => {
  return (
    <section className="py-24 md:py-32 border-t border-neutral-100 bg-[#fafafc] text-neutral-950 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-[38px] sm:text-[48px] lg:text-[56px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.08] mb-16 font-serif">
          Built around<br />your business.
        </h2>
        <div className="relative w-full max-w-xl mx-auto h-[260px] sm:h-[300px] flex items-center justify-center my-6">
          <div className="absolute w-full h-[180px] sm:h-[220px] rounded-[100%] border border-neutral-200/80 -rotate-6 pointer-events-none" />
          <div className="absolute w-[80%] h-[140px] sm:h-[160px] rounded-[100%] border border-purple-200 rotate-12 pointer-events-none" />
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-purple-50/80 border border-purple-200 flex items-center justify-center shadow-lg">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-purple-100 shadow-sm flex items-center justify-center">
              <BrandBurstLogo size={24} />
            </div>
          </div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full border border-neutral-200 text-xs sm:text-[13px] font-semibold text-neutral-800 shadow-xs">Your products</div>
          <div className="absolute right-0 sm:right-6 top-1/2 -translate-y-1/2 bg-white px-4 py-1.5 rounded-full border border-neutral-200 text-xs sm:text-[13px] font-semibold text-neutral-800 shadow-xs">Your customers</div>
          <div className="absolute bottom-4 right-12 sm:right-24 bg-white px-4 py-1.5 rounded-full border border-neutral-200 text-xs sm:text-[13px] font-semibold text-neutral-800 shadow-xs">Your brand</div>
          <div className="absolute bottom-4 left-12 sm:left-24 bg-white px-4 py-1.5 rounded-full border border-neutral-200 text-xs sm:text-[13px] font-semibold text-neutral-800 shadow-xs">Your voice</div>
          <div className="absolute left-0 sm:left-6 top-1/2 -translate-y-1/2 bg-white px-4 py-1.5 rounded-full border border-neutral-200 text-xs sm:text-[13px] font-semibold text-neutral-800 shadow-xs">Your goals</div>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-neutral-950 font-serif tracking-tight mt-12">Calvras remembers.</p>
      </div>
    </section>
  );
};
