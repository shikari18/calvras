import React from 'react';
import { Plus, Hash, MessageSquare, Trash2 } from 'lucide-react';
import { BrandBurstLogo } from './CySidebar';
import { useMarketing } from '../../context/MarketingContext';

export const CyThreadsSubSidebar = ({ activeThread, onSelectThread, onNewChat }) => {
  const { chatThreads, activeThreadId, selectThread, deleteThread } = useMarketing();

  const handleThreadClick = (thread) => {
    selectThread(thread.id);
    if (onSelectThread) onSelectThread(thread.id);
  };

  return (
    <aside className="w-56 bg-[#fcfcfd] border-r border-[#e5e5e7] flex flex-col h-screen shrink-0 text-left select-none text-[13px] font-sans">
      <div className="p-3 space-y-4 overflow-y-auto">
        
        {/* Channels / Conversations Section */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 py-1 text-neutral-400">
            <span className="text-[11px] font-medium text-neutral-500">Channels</span>
            <button 
              onClick={onNewChat}
              className="hover:text-neutral-950 p-0.5 rounded hover:bg-neutral-200/60 transition cursor-pointer" 
              title="Create new chat"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-neutral-900">
              <Hash size={13} className="text-neutral-500" />
              <span>general</span>
            </div>

            {/* Dynamic Conversation Threads from MarketingContext History with Hover Delete */}
            {chatThreads.map((t) => {
              const isSelected = activeThreadId === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => handleThreadClick(t)}
                  className={`group w-full flex items-center justify-between pl-6 pr-2 py-1.5 rounded-xl text-xs transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#efeff1] text-neutral-900 font-semibold shadow-2xs'
                      : 'text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900'
                  }`}
                  title={t.title}
                >
                  <span className="truncate mr-1">{t.title || 'Help Making Product Popular'}</span>
                  
                  <button
                    onClick={(e) => deleteThread(t.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-600 hover:bg-neutral-200/70 rounded-md transition cursor-pointer shrink-0"
                    title="Delete chat"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Private Direct AI Section */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between px-2 py-1 text-neutral-400">
            <span className="text-[11px] font-medium text-neutral-500">Private</span>
            <button 
              onClick={onNewChat}
              className="hover:text-neutral-950 p-0.5 rounded hover:bg-neutral-200/60 transition cursor-pointer" 
              title="New private chat"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => onSelectThread && onSelectThread('marketer-direct')}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-xl text-xs transition cursor-pointer ${
              activeThread === 'marketer-direct'
                ? 'bg-[#efeff1] text-neutral-900 font-semibold'
                : 'text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900'
            }`}
          >
            <div className="w-5 h-5 rounded-lg bg-purple-50 flex items-center justify-center">
              <BrandBurstLogo size={13} />
            </div>
            <span>Calvras</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
