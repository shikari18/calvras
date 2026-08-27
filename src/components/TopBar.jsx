import React from 'react';
import { Menu, Glasses, Eye, Share2 } from 'lucide-react';

export default function TopBar({ onOpenUpgrade }) {
  return (
    <header className="flex items-center justify-between w-full px-5 pt-3.5 pb-2 z-20 select-none">
      {/* Top-Left: Free plan · Upgrade Pill */}
      <div>
        <button
          onClick={onOpenUpgrade}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1c1c1c] hover:bg-[#252525] border border-[#2b2b2b] text-xs transition-colors"
        >
          <span className="text-neutral-400 font-normal">Free plan</span>
          <span className="text-neutral-500 font-bold">·</span>
          <span className="text-neutral-200 hover:text-white font-medium">Upgrade</span>
        </button>
      </div>

      {/* Top-Right: Quick Action Icons */}
      <div className="flex items-center gap-2">
        <button 
          className="w-8 h-8 rounded-lg bg-[#1c1c1c] hover:bg-[#252525] border border-[#282828] text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          title="Incognito / Private Mode"
        >
          <Glasses size={16} />
        </button>

        <button 
          className="w-8 h-8 rounded-lg bg-[#1c1c1c] hover:bg-[#252525] border border-[#282828] text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          title="Menu"
        >
          <Menu size={16} />
        </button>
      </div>
    </header>
  );
}
