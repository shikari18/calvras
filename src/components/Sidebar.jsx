import React, { useState } from 'react';
import { 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  Bell,
  ArrowUpCircle,
  Trash2,
  User,
  PanelLeft
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
      className={`relative flex flex-col h-full bg-[#18181b] text-[#b4b4b8] transition-all duration-200 z-30 select-none overflow-hidden ${
        collapsed ? 'w-14' : 'w-[230px]'
      }`}
    >
      {/* Top Header */}
      <div className={`flex items-center pt-3.5 pb-2.5 ${collapsed ? 'justify-center px-2' : 'justify-between px-3.5'}`}>
        <div 
          onClick={() => collapsed ? setCollapsed(false) : onNewChat()}
          className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity"
          title={collapsed ? 'Expand sidebar' : 'New Chat'}
        >
          <div className="w-6 h-6 rounded-lg bg-[#27272a] border border-[#3f3f46] flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeWidth="1.8" />
            </svg>
          </div>
          {!collapsed && (
            <span className="font-bold text-[13.5px] text-white tracking-tight">MALVOS</span>
          )}
        </div>

        {!collapsed && (
          <button 
            onClick={() => setCollapsed(true)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#27272a] transition-colors"
            title="Collapse sidebar"
          >
            <PanelLeft size={16} strokeWidth={1.8} />
          </button>
        )}
      </div>

      {/* New Button */}
      <div className="px-2.5 py-1">
        <button 
          onClick={onNewChat}
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl text-neutral-200 hover:text-white hover:bg-[#27272a] transition-colors text-[13.5px] font-normal border border-transparent hover:border-[#3f3f46] ${
            collapsed ? 'justify-center px-1' : ''
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <Plus size={17} className="text-neutral-300" strokeWidth={2} />
          </div>
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>New Chat</span>
              <span className="text-[10px] text-neutral-400 font-mono bg-[#27272a] px-1.5 py-0.5 rounded border border-[#3f3f46]">Ctrl K</span>
            </div>
          )}
        </button>
      </div>

      {/* Nav Items */}
      <div className="px-2.5 space-y-0.5 text-[13.5px] font-normal text-[#b4b4b8] mt-1">
        <button 
          onClick={() => { setActiveNav('computer'); onOpenComputer?.(); }}
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl hover:bg-[#27272a] hover:text-white transition-colors ${
            activeNav === 'computer' ? 'bg-[#27272a] text-white font-medium' : ''
          } ${collapsed ? 'justify-center' : ''}`}
          title="Computer"
        >
          <div className="w-5 h-5 flex items-center justify-center text-neutral-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
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
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl hover:bg-[#27272a] hover:text-white transition-colors ${
            activeNav === 'artifacts' ? 'bg-[#27272a] text-white font-medium' : ''
          } ${collapsed ? 'justify-center' : ''}`}
          title="Artifacts"
        >
          <div className="w-5 h-5 flex items-center justify-center text-neutral-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
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
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl hover:bg-[#27272a] hover:text-white transition-colors ${
            activeNav === 'customize' ? 'bg-[#27272a] text-white font-medium' : ''
          } ${collapsed ? 'justify-center' : ''}`}
          title="Customize"
        >
          <div className="w-5 h-5 flex items-center justify-center text-neutral-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
              <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
          </div>
          {!collapsed && <span>Customize</span>}
        </button>
      </div>

      {/* Sessions & Projects */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-2.5 mt-3 space-y-2 text-[13px] scrollbar-thin">
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
                          ? 'bg-[#27272a] text-white font-medium shadow-sm' 
                          : 'text-neutral-300 hover:text-white hover:bg-[#202023]'
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

                <div className="pt-2 pb-1 px-1 flex justify-center">
                  <button
                    onClick={onOpenUpgrade}
                    className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-full bg-[#242427] hover:bg-[#2f2f34] border border-[#38383e] text-neutral-300 hover:text-white text-[11px] font-medium transition-colors"
                  >
                    <ArrowUpCircle size={12} className="text-neutral-400" />
                    <span>Upgrade plan</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Profile */}
      <div className="p-2.5 border-t border-[#27272a] bg-[#18181b]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover border border-[#3f3f46] flex-shrink-0 shadow-sm"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center flex-shrink-0">
                <User size={13} className="text-neutral-400" />
              </div>
            )}
            {!collapsed && (
              <div className="truncate">
                <div className="text-xs font-semibold text-neutral-200 leading-tight">{displayName}</div>
                <div className="text-[10px] text-neutral-400">{displayPlan}</div>
              </div>
            )}
          </div>

          {!collapsed && (
            <button className="p-1 text-neutral-400 hover:text-neutral-200 rounded transition-colors" title="Notifications">
              <Bell size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
