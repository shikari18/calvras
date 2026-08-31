import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { INSPIRATIONS } from '../data/mockData';

const CATEGORIES = ['All', 'Coding', 'Architecture', 'Swarm Agents', 'Research', 'Design', 'Data'];

export default function InspirationDrawer({ onSelectPrompt }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? INSPIRATIONS
    : INSPIRATIONS.filter(i => i.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category pill tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-[11.5px] font-medium whitespace-nowrap transition-all cursor-pointer border ${
              activeCategory === cat
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-neutral-500 border-[#2a2a2a] hover:text-white hover:border-[#3a3a3a]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Horizontal scrollable card strip */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {filtered.slice(0, 8).map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPrompt(item.description)}
            className="flex-shrink-0 w-[200px] p-3.5 rounded-2xl bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#3a3a3a] hover:bg-[#222222] text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-neutral-500 bg-[#141414] px-1.5 py-0.5 rounded border border-[#2a2a2a]">
                {item.tag}
              </span>
              <ArrowRight size={12} className="text-neutral-600 group-hover:text-neutral-300 transition-colors" />
            </div>
            <h4 className="text-[12px] font-semibold text-neutral-200 group-hover:text-white transition-colors leading-snug line-clamp-1">
              {item.title}
            </h4>
            <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
