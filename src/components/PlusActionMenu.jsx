import React, { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import ConnectorsOverlay from './ConnectorsOverlay';

export default function PlusActionMenu({
  onAttachFiles,
  onImportProject,
  isHero = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConnectors, setShowConnectors] = useState(false);
  const menuRef = useRef(null);
  const folderInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const handleAttachClick = () => { close(); onAttachFiles?.(); };

  const handleImportClick = () => {
    close();
    folderInputRef.current?.click();
  };

  const handleFolderChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onImportProject) onImportProject(files);
    e.target.value = '';
  };

  const handleConnectClick = () => {
    close();
    setShowConnectors(true);
  };

  return (
    <>
      <div className="relative inline-block" ref={menuRef}>
        {/* Hidden folder input */}
        <input
          type="file"
          ref={folderInputRef}
          onChange={handleFolderChange}
          multiple
          // @ts-ignore
          webkitdirectory=""
          directory=""
          style={{ display: 'none' }}
        />

        {/* Trigger */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setIsOpen(p => !p); }}
          className={`flex items-center justify-center transition-all duration-150 ${
            isOpen
              ? 'w-7 h-7 rounded-full bg-[rgb(70,70,70)] text-white hover:bg-[rgb(82,82,82)]'
              : 'p-1 text-neutral-300 hover:text-white'
          }`}
          title={isOpen ? 'Close' : 'Add & connect'}
        >
          {isOpen
            ? <X size={14} strokeWidth={2.2} />
            : <Plus size={isHero ? 18 : 15} strokeWidth={2} />
          }
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className="absolute bottom-full left-0 mb-3 w-[200px] bg-[#1e1e1e] border border-white/[0.09] rounded-[18px] py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.7)] z-50 animate-in fade-in zoom-in-95 duration-150 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleAttachClick}
              className="w-full px-4 py-2.5 text-left text-[13.5px] text-[#d4d4d4] hover:text-white hover:bg-white/[0.06] rounded-[12px] transition-colors font-normal"
            >
              Add files & photos
            </button>

            <button
              type="button"
              onClick={handleImportClick}
              className="w-full px-4 py-2.5 text-left text-[13.5px] text-[#d4d4d4] hover:text-white hover:bg-white/[0.06] rounded-[12px] transition-colors font-normal"
            >
              Import project
            </button>

            <button
              type="button"
              onClick={handleConnectClick}
              className="w-full px-4 py-2.5 text-left text-[13.5px] text-[#d4d4d4] hover:text-white hover:bg-white/[0.06] rounded-[12px] transition-colors font-normal"
            >
              Connect
            </button>
          </div>
        )}
      </div>

      {showConnectors && (
        <ConnectorsOverlay onClose={() => setShowConnectors(false)} />
      )}
    </>
  );
}
