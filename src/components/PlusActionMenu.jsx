import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  X, 
  Paperclip, 
  Puzzle, 
  Globe, 
  ChevronRight, 
  Check,
  Database,
  GitBranch,
  CreditCard,
  Terminal
} from 'lucide-react';

export default function PlusActionMenu({ 
  onAttachFiles, 
  webSearchMode = 'auto', 
  setWebSearchMode,
  isHero = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveSubMenu(null);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
    setActiveSubMenu(null);
  };

  const handleAttachClick = () => {
    setIsOpen(false);
    setActiveSubMenu(null);
    onAttachFiles?.();
  };

  const selectWebSearch = (mode) => {
    setWebSearchMode?.(mode);
    setIsOpen(false);
    setActiveSubMenu(null);
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleMenu}
        className={`flex items-center justify-center transition-all duration-150 ${
          isOpen
            ? 'w-7 h-7 rounded-full bg-[rgb(70,70,70)] text-white hover:bg-[rgb(82,82,82)]'
            : 'p-1 text-neutral-300 hover:text-white'
        }`}
        title={isOpen ? 'Close' : 'Add & tools'}
      >
        {isOpen ? (
          <X size={14} strokeWidth={2.2} />
        ) : (
          <Plus size={isHero ? 18 : 15} strokeWidth={2} />
        )}
      </button>

      {/* Main Popup Dropdown Menu matching rgb(59,59,59) theme */}
      {isOpen && (
        <div 
          className="absolute bottom-full left-0 mb-3 w-[225px] bg-[rgb(46,46,46)] border border-[rgb(75,75,75)] rounded-[22px] p-2 shadow-[0_16px_48px_rgba(0,0,0,0.7)] z-50 text-[14px] text-[#f4f4f5] animate-in fade-in zoom-in-95 duration-150 select-none font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-0.5">
            {/* Item 1: Add files & photos */}
            <button
              type="button"
              onClick={handleAttachClick}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[14px] text-left hover:bg-[rgb(65,65,65)] transition-colors group"
            >
              <Paperclip size={17} className="text-neutral-300 group-hover:text-white transition-colors" strokeWidth={1.9} />
              <span className="font-normal text-[14px] text-[#f4f4f5] tracking-tight">Add files & photos</span>
            </button>

            {/* Item 2: Plugins */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveSubMenu('plugins')}
            >
              <button
                type="button"
                onClick={() => setActiveSubMenu(activeSubMenu === 'plugins' ? null : 'plugins')}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-[14px] text-left transition-colors group ${
                  activeSubMenu === 'plugins' ? 'bg-[rgb(65,65,65)]' : 'hover:bg-[rgb(65,65,65)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Puzzle size={17} className="text-neutral-300 group-hover:text-white transition-colors" strokeWidth={1.9} />
                  <span className="font-normal text-[14px] text-[#f4f4f5] tracking-tight">Plugins</span>
                </div>
                <ChevronRight size={15} className="text-neutral-400 group-hover:text-neutral-200 transition-colors" />
              </button>

              {/* Submenu: Plugins */}
              {activeSubMenu === 'plugins' && (
                <div className="absolute left-full top-0 ml-2 w-[220px] bg-[rgb(46,46,46)] border border-[rgb(75,75,75)] rounded-[22px] p-2 shadow-[0_16px_48px_rgba(0,0,0,0.7)] z-50 text-[13px] animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10.5px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Available Plugins
                  </div>
                  <div className="space-y-0.5 mt-1">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-[14px] hover:bg-[rgb(65,65,65)] text-neutral-200 hover:text-white transition-colors cursor-pointer">
                      <Database size={15} className="text-emerald-400" />
                      <div>
                        <div className="font-medium text-xs text-[#f4f4f5]">Supabase & Postgres</div>
                        <div className="text-[10px] text-neutral-400">Live schema sync</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-[14px] hover:bg-[rgb(65,65,65)] text-neutral-200 hover:text-white transition-colors cursor-pointer">
                      <GitBranch size={15} className="text-blue-400" />
                      <div>
                        <div className="font-medium text-xs text-[#f4f4f5]">GitHub PR Engine</div>
                        <div className="text-[10px] text-neutral-400">Auto branch & diffs</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-[14px] hover:bg-[rgb(65,65,65)] text-neutral-200 hover:text-white transition-colors cursor-pointer">
                      <CreditCard size={15} className="text-purple-400" />
                      <div>
                        <div className="font-medium text-xs text-[#f4f4f5]">Stripe Billing</div>
                        <div className="text-[10px] text-neutral-400">Webhook sandbox</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-[14px] hover:bg-[rgb(65,65,65)] text-neutral-200 hover:text-white transition-colors cursor-pointer">
                      <Terminal size={15} className="text-pink-400" />
                      <div>
                        <div className="font-medium text-xs text-[#f4f4f5]">Sandboxed Node.js</div>
                        <div className="text-[10px] text-neutral-400">Instant code runner</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Item 3: Web search */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveSubMenu('web')}
            >
              <button
                type="button"
                onClick={() => setActiveSubMenu(activeSubMenu === 'web' ? null : 'web')}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-[14px] text-left transition-colors group ${
                  activeSubMenu === 'web' ? 'bg-[rgb(65,65,65)]' : 'hover:bg-[rgb(65,65,65)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe size={17} className="text-neutral-300 group-hover:text-white transition-colors" strokeWidth={1.9} />
                  <span className="font-normal text-[14px] text-[#f4f4f5] tracking-tight">Web search</span>
                </div>
                <ChevronRight size={15} className="text-neutral-400 group-hover:text-neutral-200 transition-colors" />
              </button>

              {/* Submenu: Web search */}
              {activeSubMenu === 'web' && (
                <div className="absolute left-full top-0 ml-2 w-[220px] bg-[rgb(46,46,46)] border border-[rgb(75,75,75)] rounded-[22px] p-2 shadow-[0_16px_48px_rgba(0,0,0,0.7)] z-50 text-[13px] animate-in fade-in zoom-in-95 duration-100">
                  <button
                    type="button"
                    onClick={() => selectWebSearch('auto')}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-[14px] text-left hover:bg-[rgb(65,65,65)] transition-colors"
                  >
                    <div>
                      <div className="font-medium text-xs text-[#f4f4f5]">Auto</div>
                      <div className="text-[10.5px] text-neutral-400">Browses the web when needed</div>
                    </div>
                    {webSearchMode === 'auto' && (
                      <Check size={15} className="text-blue-400 ml-2 flex-shrink-0" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => selectWebSearch('off')}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-[14px] text-left hover:bg-[rgb(65,65,65)] transition-colors mt-0.5"
                  >
                    <div>
                      <div className="font-medium text-xs text-[#f4f4f5]">Off</div>
                      <div className="text-[10.5px] text-neutral-400">No web access</div>
                    </div>
                    {webSearchMode === 'off' && (
                      <Check size={15} className="text-blue-400 ml-2 flex-shrink-0" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
