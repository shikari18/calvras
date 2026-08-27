import React, { useEffect, useRef } from 'react';
import { GitBranch, Globe, Folder, Database, FileText, CheckSquare, AtSign } from 'lucide-react';
import { CONNECTORS } from '../data/mockData';

const iconMap = {
  GitBranch: GitBranch,
  Globe: Globe,
  Folder: Folder,
  Database: Database,
  FileText: FileText,
  CheckSquare: CheckSquare,
};

export default function ConnectorMenu({ filter, onSelect, onClose }) {
  const menuRef = useRef(null);

  const filteredConnectors = CONNECTORS.filter(c => 
    c.id.toLowerCase().includes(filter.toLowerCase()) || 
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (filteredConnectors.length === 0) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute bottom-full left-0 mb-3 w-80 bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 px-3.5 py-2 border-b border-[#292929] text-xs font-medium text-neutral-400">
        <AtSign size={13} className="text-neutral-300" />
        <span>Select Data Connector</span>
      </div>

      <div className="max-h-60 overflow-y-auto p-1.5 space-y-1">
        {filteredConnectors.map((c) => {
          const IconComponent = iconMap[c.icon] || Globe;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c)}
              className="flex items-center gap-3 w-full p-2 rounded-xl text-left hover:bg-[#282828] group transition-colors"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#292929] text-neutral-300 group-hover:text-white transition-colors flex-shrink-0">
                <IconComponent size={15} />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-medium text-neutral-200 group-hover:text-white">
                  {c.name} <span className="text-[11px] text-neutral-500 font-mono">({c.id})</span>
                </div>
                <div className="text-[11px] text-neutral-400 truncate">
                  {c.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
