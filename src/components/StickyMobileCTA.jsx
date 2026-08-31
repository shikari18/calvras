import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const StickyMobileCTA = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#121310]/95 backdrop-blur-md border-t border-white/15 sm:hidden animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center justify-between gap-3">
        <div className="text-left">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold text-white font-mono">1,000 Free Credits</span>
          </div>
          <p className="text-[10px] text-neutral-400">Plans start at $10 • 30-Day Guar.</p>
        </div>
        <button
          onClick={() => onNavigate('get-started')}
          className="bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs px-5 py-2.5 rounded-full transition shadow-lg active:scale-95 flex items-center gap-1.5 shrink-0"
        >
          <span>Start Now</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
