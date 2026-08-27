import React, { useState } from 'react';
import { 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  Bell,
  ArrowUpCircle,
  Trash2,
  User
} from 'lucide-react';

export default function Sidebar({ 
  collapsed, 
  setCollapsed, 
  activeNav, 
  setActiveNav, 
  onNewChat, 
  onOpenUpgrade,
  onOpenCustomize,
  onOpenArtifacts,
  onOpenComputer,
  sessions,
  activeSession,
  setActiveSession,
  onDeleteSession,
  user
}) {
  const [sessionsOpen, setSessionsOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const displayName = user?.name || 'User';
  const displayPlan = user?.plan || 'Free plan';
  const avatarUrl = user?.avatar || null;

  return (
    <aside 
      className={`relative flex flex-col h-full bg-[#161616] text-[#b4b4b4] border border-[#222222] rounded-2xl transition-all duration-200 z-30 select-none overflow-hidden ${
        collapsed ? 'w-16' : 'w-[230px]'
      }`}
    >
      {/* Top Header */}
      <div className={`flex items-center pt-4 pb-3 ${collapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
        <div 
          onClick={() => collapsed ? setCollapsed(false) : onNewChat()}
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          title={collapsed ? 'Expand sidebar' : 'New Chat'}
        >
          <div className="w-6 h-6 flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeWidth="1.8" />
            </svg>
          </div>
        </div>

        {!collapsed && (
          <button 
            onClick={() => setCollapsed(true)}
            className="p-1 text-neutral-400 hover:text-neutral-200 rounded transition-colors"
            title="Collapse sidebar"
          >
            <div className="w-[18px] h-[18px] border border-neutral-500 rounded flex items-center justify-end p-0.5 hover:border-neutral-300">
              <div className="w-1 h-full bg-neutral-500 rounded-sm" />
            </div>
          </button>
        )}
      </div>

      {/* New Button */}
      <div className="px-3 py-1">
        <button 
          onClick={onNewChat}
          className={`flex items-center gap-3 w-full px-2 py-2 rounded-xl text-neutral-200 hover:text-white hover:bg-[#202020] transition-colors text-[13.5px] font-normal ${
            collapsed ? 'justify-center px-1' : ''
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <Plus size={18} className="text-neutral-300" strokeWidth={2} />
          </div>
          {!collapsed && <span>New</span>}
        </button>
      </div>

      {/* Nav Items */}
      <div className="px-3 space-y-0.5 text-[13.5px] font-normal text-[#c4c4c4]">
        <button 
          onClick={() => { setActiveNav('computer'); onOpenComputer?.(); }}
          className={`flex items-center gap-3 w-full px-2 py-2 rounded-xl hover:bg-[#202020] hover:text-white transition-colors ${
            activeNav === 'computer' ? 'bg-[#222222] text-white' : ''
          } ${collapsed ? 'justify-center' : ''}`}
          title="Computer"
        >
          <div className="w-5 h-5 flex items-center justify-center text-neutral-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <rect width="18" height="14" x="3" y="3" rx="2" />
              <line x1="8" x2="8.01" y1="9" y2="9" strokeWidth="2.5" />
              <line x1="16" x2="16.01" y1="9" y2="9" strokeWidth="2.5" />
              <path d="M9 13a4 4 0 0 0 6 0" />
              <line x1="7" x2="17" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
          </div>
          {!collapsed && <span>Computer</span>}
        </button>

        <button 
          onClick={() => { setActiveNav('artifacts'); onOpenArtifacts?.(); }}
          className={`flex items-center gap-3 w-full px-2 py-2 rounded-xl hover:bg-[#202020] hover:text-white transition-colors ${
            activeNav === 'artifacts' ? 'bg-[#222222] text-white' : ''
          } ${collapsed ? 'justify-center' : ''}`}
          title="Artifacts"
        >
          <div className="w-5 h-5 flex items-center justify-center text-neutral-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
              <path d="M14 9h4" />
              <path d="M14 15h4" />
            </svg>
          </div>
          {!collapsed && <span>Artifacts</span>}
        </button>

        <button 
          onClick={() => { setActiveNav('customize'); onOpenCustomize?.(); }}
          className={`flex items-center gap-3 w-full px-2 py-2 rounded-xl hover:bg-[#202020] hover:text-white transition-colors ${
            activeNav === 'customize' ? 'bg-[#222222] text-white' : ''
          } ${collapsed ? 'justify-center' : ''}`}
          title="Customize"
        >
          <div className="w-5 h-5 flex items-center justify-center text-neutral-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
          </div>
          {!collapsed && <span>Customize</span>}
        </button>
      </div>

      {/* Sessions & Projects */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-3 mt-4 space-y-3 text-[13px] scrollbar-thin">
          <div>
            <button 
              onClick={() => setProjectsOpen(!projectsOpen)}
              className="flex items-center justify-between w-full px-2 py-1 text-neutral-400 hover:text-neutral-200 transition-colors font-normal"
            >
              <span>Projects</span>
              <ChevronRight size={14} className={`transform transition-transform ${projectsOpen ? 'rotate-90' : ''}`} />
            </button>
          </div>

          <div>
            <button 
              onClick={() => setSessionsOpen(!sessionsOpen)}
              className="flex items-center justify-between w-full px-2 py-1 text-neutral-400 hover:text-neutral-200 transition-colors font-normal"
            >
              <span>Sessions</span>
              <ChevronDown size={14} className={`transform transition-transform ${!sessionsOpen ? '-rotate-90' : ''}`} />
            </button>

            {sessionsOpen && (
              <div className="space-y-0.5 mt-1">
                {sessions && sessions.length > 0 ? (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => setActiveSession(session.id)}
                      className={`group flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                        activeSession === session.id 
                          ? 'bg-[#222222] text-white font-medium shadow-sm' 
                          : 'text-neutral-300 hover:text-white hover:bg-[#1c1c1c]'
                      }`}
                    >
                      <span className="truncate">{session.title}</span>
                      {onDeleteSession && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSession(session.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-neutral-500 hover:text-red-400 rounded transition-all ml-1"
                          title="Delete"
                        >
                          <Trash2 size={11} />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-2 py-2 text-[11px] text-neutral-500 italic">
                    No recent sessions
                  </div>
                )}

                <div className="pt-3 pb-1 px-1 flex justify-center">
                  <button
                    onClick={onOpenUpgrade}
                    className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-full bg-[#202020] hover:bg-[#282828] border border-[#2d2d2d] text-neutral-200 hover:text-white text-[11.5px] font-medium transition-colors"
                  >
                    <ArrowUpCircle size={13} className="text-neutral-400" />
                    <span>Upgrade plan</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Profile — fully dynamic, no hardcoded names */}
      <div className="p-3 border-t border-[#202020] bg-[#161616]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover border border-[#2d2d2d] flex-shrink-0 shadow-sm"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#282828] border border-[#2d2d2d] flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-neutral-400" />
              </div>
            )}
            {!collapsed && (
              <div className="truncate">
                <div className="text-xs font-semibold text-neutral-200 leading-tight">{displayName}</div>
                <div className="text-[10px] text-neutral-500">{displayPlan}</div>
              </div>
            )}
          </div>

          {!collapsed && (
            <button className="p-1 text-neutral-400 hover:text-neutral-200 rounded transition-colors" title="Notifications">
              <Bell size={15} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
