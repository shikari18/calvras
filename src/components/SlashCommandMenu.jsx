import React, { useEffect, useRef } from 'react';
import { 
  Network, 
  Code, 
  Presentation, 
  Sparkles, 
  Globe, 
  FileText, 
  Table, 
  PenTool, 
  Clock,
  Command
} from 'lucide-react';
import { SLASH_COMMANDS } from '../data/mockData';

const iconMap = {
  Network: Network,
  Code: Code,
  Presentation: Presentation,
  Sparkles: Sparkles,
  Globe: Globe,
  FileText: FileText,
  Table: Table,
  PenTool: PenTool,
  Clock: Clock,
};

export default function SlashCommandMenu({ filter, onSelect, onClose, positionStyle }) {
  const menuRef = useRef(null);

  const filteredCommands = SLASH_COMMANDS.filter(cmd => 
    cmd.title.toLowerCase().includes(filter.toLowerCase()) || 
    cmd.desc.toLowerCase().includes(filter.toLowerCase())
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

  if (filteredCommands.length === 0) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute bottom-full left-0 mb-3 w-80 bg-[#16161d] border border-[#2e2e3d] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#242432] text-xs font-medium text-neutral-400">
        <Command size={13} className="text-blue-400" />
        <span>Plugins & Skills Palette</span>
      </div>

      <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
        {filteredCommands.map((cmd) => {
          const IconComponent = iconMap[cmd.icon] || Sparkles;
          return (
            <button
              key={cmd.id}
              onClick={() => onSelect(cmd)}
              className="flex items-center gap-3 w-full p-2 rounded-xl text-left hover:bg-[#20202c] group transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#242432] group-hover:bg-blue-600/20 text-neutral-300 group-hover:text-blue-400 transition-colors flex-shrink-0">
                <IconComponent size={16} />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-neutral-200 group-hover:text-white font-mono">
                  {cmd.title}
                </div>
                <div className="text-[11px] text-neutral-500 group-hover:text-neutral-400 truncate">
                  {cmd.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
