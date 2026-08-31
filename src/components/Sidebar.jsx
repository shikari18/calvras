import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  Bell,
  ArrowUpCircle,
  Trash2,
  User,
  PanelLeft,
  Settings,
  Headphones,
  LogOut,
  MoreVertical
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
  onOpenDeveloper,
  onOpenAccount,
  onOpenCustomerService,
  onSignOut,
  sessions,
  activeSession,
  setActiveSession,
  onDeleteSession,
  user
}) {
  const [sessionsOpen, setSessionsOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  const displayName = user?.name || 'User';
  const displayPlan = user?.plan || 'Free plan';
  const avatarUrl = user?.avatar || null;

  return (
    <aside 
      className={`relative flex flex-col h-full bg-[#0f0f0e] text-[#b4b4b8] transition-all duration-200 z-30 select-none overflow-hidden ${
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
          <div className="w-6 h-6 rounded-lg bg-[rgb(32,32,32)] border border-[rgb(50,50,50)] flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeWidth="1.8" />
            </svg>
          </div>
          {!collapsed && (
            <span className="font-bold text-[13.5px] text-white tracking-tight">CALVRAS</span>
          )}
        </div>

        {!collapsed && (
          <button 
            onClick={() => setCollapsed(true)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[rgb(32,32,32)] transition-colors"
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
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl text-neutral-200 hover:text-white hover:bg-[rgb(32,32,32)] transition-colors text-[13.5px] font-normal border border-transparent hover:border-[rgb(50,50,50)] ${
            collapsed ? 'justify-center px-1' : ''
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <Plus size={17} className="text-neutral-300" strokeWidth={2} />
          </div>
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>New Chat</span>
              <span className="text-[10px] text-neutral-400 font-mono bg-[rgb(32,32,32)] px-1.5 py-0.5 rounded border border-[rgb(50,50,50)]">Ctrl K</span>
            </div>
          )}
        </button>
      </div>

      {/* Nav Items */}
      <div className="px-2.5 space-y-0.5 text-[13.5px] font-normal text-[#b4b4b8] mt-1">
        <button 
          onClick={() => { setActiveNav('computer'); onOpenComputer?.(); }}
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl hover:bg-[rgb(32,32,32)] hover:text-white transition-colors ${
            activeNav === 'computer' ? 'bg-[rgb(32,32,32)] text-white font-medium' : ''
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
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl hover:bg-[rgb(32,32,32)] hover:text-white transition-colors ${
            activeNav === 'artifacts' ? 'bg-[rgb(32,32,32)] text-white font-medium' : ''
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
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl hover:bg-[rgb(32,32,32)] hover:text-white transition-colors ${
            activeNav === 'customize' ? 'bg-[rgb(32,32,32)] text-white font-medium' : ''
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

        <button 
          onClick={() => { setActiveNav('developer'); onOpenDeveloper?.(); }}
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl hover:bg-[rgb(32,32,32)] hover:text-white transition-colors ${
            activeNav === 'developer' ? 'bg-[rgb(32,32,32)] text-white font-medium' : ''
          } ${collapsed ? 'justify-center' : ''}`}
          title="Developer & API Keys"
        >
          <div className="w-5 h-5 flex items-center justify-center text-neutral-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
          </div>
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>Developer</span>
              <span className="text-[9.5px] text-blue-400 font-mono bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">API</span>
            </div>
          )}
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
                          ? 'bg-[rgb(34,34,34)] text-white font-medium shadow-sm' 
                          : 'text-neutral-300 hover:text-white hover:bg-[rgb(28,28,28)]'
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
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Profile & Menu Popover */}
      <div ref={userMenuRef} className="relative p-2.5 border-t border-[rgb(34,34,34)] bg-[#0f0f0e]">
        {/* User Action Popover Menu */}
        {userMenuOpen && (
          <div className="absolute bottom-[58px] left-1.5 right-1.5 w-[220px] rounded-2xl bg-[#16161a]/98 backdrop-blur-2xl border border-[#33333d] shadow-[0_16px_50px_rgba(0,0,0,0.85)] p-1.5 space-y-1 z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-150">
            {/* Header User Card */}
            <div className="px-3 py-2.5 rounded-xl bg-[#1f1f26]/80 border border-[#2b2b36] flex items-center justify-between mb-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#1f1f26]" />
                </div>
                <div className="truncate text-left">
                  <div className="text-[12.5px] font-semibold text-white truncate leading-tight">{displayName}</div>
                  <div className="text-[10px] text-neutral-400 truncate mt-0.5">{user?.email || 'Active session'}</div>
                </div>
              </div>
            </div>

            {/* Menu Actions */}
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  if (onOpenAccount) onOpenAccount();
                  else if (onOpenUpgrade) onOpenUpgrade();
                }}
                className="group flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/[0.07] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-neutral-800/80 group-hover:bg-neutral-700 text-neutral-400 group-hover:text-white transition-colors">
                    <Settings size={13} />
                  </div>
                  <span className="font-medium">Manage account</span>
                </div>
                <ChevronRight size={13} className="text-neutral-500 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  if (onOpenCustomerService) onOpenCustomerService();
                  else if (onOpenCustomize) onOpenCustomize();
                }}
                className="group flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/[0.07] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-neutral-800/80 group-hover:bg-neutral-700 text-neutral-400 group-hover:text-white transition-colors">
                    <Headphones size={13} />
                  </div>
                  <span className="font-medium">Customer service</span>
                </div>
                <span className="text-[9.5px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25 font-medium">Help</span>
              </button>
            </div>

            <div className="border-t border-[#292933] my-1" />

            {/* Sign Out */}
            <button
              onClick={() => {
                setUserMenuOpen(false);
                if (onSignOut) onSignOut();
                else {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="group flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-rose-500/10 group-hover:bg-rose-500/20 text-rose-400 transition-colors">
                  <LogOut size={13} />
                </div>
                <span className="font-medium">Sign out</span>
              </div>
            </button>
          </div>
        )}

        <div 
          onClick={() => setUserMenuOpen(prev => !prev)}
          className="flex items-center justify-between p-1 -m-1 rounded-xl hover:bg-[rgb(30,30,30)] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover border border-[rgb(50,50,50)] flex-shrink-0 shadow-sm"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[rgb(32,32,32)] border border-[rgb(50,50,50)] flex items-center justify-center flex-shrink-0">
                <User size={13} className="text-neutral-400" />
              </div>
            )}
            {!collapsed && (
              <div className="truncate text-left">
                <div className="text-xs font-semibold text-neutral-200 leading-tight">{displayName}</div>
                <div className="text-[10px] text-neutral-400">{displayPlan}</div>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200">
              <MoreVertical size={14} />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
