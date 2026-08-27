import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, Folder, FileCode, Layers, ArrowRight } from 'lucide-react';
import { PROJECT_CARDS } from '../../data/mockData';

export default function CommandPaletteModal({ isOpen, onClose, onSelectProject, onStartNew }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = PROJECT_CARDS.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.headline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#18181c] border border-[#2f2f38] rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#292932]">
          <Search size={18} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search projects, templates, commands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
            autoFocus
          />
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
          <div className="px-3 py-1 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
            Quick Actions
          </div>
          <button
            onClick={() => { onStartNew('Build a SaaS analytics dashboard'); onClose(); }}
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#23232c] text-xs text-neutral-200 hover:text-white transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles size={14} className="text-pink-400" />
              <span>Create New Fullstack App</span>
            </div>
            <ArrowRight size={13} className="text-neutral-500 group-hover:text-white" />
          </button>

          <div className="px-3 pt-3 pb-1 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
            Projects & Templates
          </div>
          {filteredProjects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => { onSelectProject(proj); onClose(); }}
              className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#23232c] text-xs text-neutral-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Folder size={14} className="text-blue-400" />
                <div>
                  <div className="font-semibold text-white">{proj.title}</div>
                  <div className="text-[10px] text-neutral-500">{proj.tag}</div>
                </div>
              </div>
              <span className="text-[10px] text-neutral-500">{proj.updated}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
