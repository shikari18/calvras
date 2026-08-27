import React, { useState } from 'react';
import { X, Search, ArrowRight, Folder, Sparkles } from 'lucide-react';
import { PROJECT_CARDS } from '../../data/mockData';

export default function BrowseAllModal({ isOpen, onClose, onSelectProject }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  if (!isOpen) return null;

  const filtered = PROJECT_CARDS.filter(p => {
    const matchCategory = category === 'All' ? true : p.category === category;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.headline.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#16161a] border border-[#2b2b35] rounded-3xl p-6 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#202028] hover:bg-[#282834] transition-colors"
        >
          <X size={17} />
        </button>

        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">All Projects & Starters</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Explore fullstack starters, templates, and your personal workspaces.</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#202028] border border-[#2e2e3a] w-56">
            <Search size={14} className="text-neutral-400" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-neutral-500 outline-none w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              onClick={() => { onSelectProject(proj); onClose(); }}
              className="p-4 rounded-2xl bg-[#1d1d26] hover:bg-[#242432] border border-white/5 hover:border-pink-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-neutral-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                    {proj.tag}
                  </span>
                  <ArrowRight size={13} className="text-neutral-500 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-pink-300 transition-colors">
                  {proj.title}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                  {proj.headline}
                </p>
              </div>
              <div className="text-[10px] text-neutral-500 mt-3 pt-2 border-t border-white/5">
                Updated {proj.updated}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
