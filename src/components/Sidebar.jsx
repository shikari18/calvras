import React, { useState, useRef, useEffect } from 'react';
import { 
  PanelLeft, 
  Settings, 
  Headphones, 
  LogOut, 
  FolderGit2, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Code2
} from 'lucide-react';

export default function Sidebar({ 
  collapsed, 
  setCollapsed, 
  activeNav, 
  setActiveNav, 
  onNewChat, 
  onOpenUpgrade,
  onOpenAccount,
  onOpenCustomerService,
  onSignOut,
  user
}) {
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
  const displayPlan = user?.plan || 'Pro Plan';
  const avatarUrl = user?.avatar || null;
  const initial = displayName.charAt(0).toUpperCase() || 'U';

  return (
    <aside 
      className={`relative flex flex-col h-full bg-[#0d0d0f] text-[#b4b4b8] border-r border-[#1a1a20] transition-all duration-200 z-30 select-none overflow-hidden ${
        collapsed ? 'w-14' : 'w-[230px]'
      }`}
    >
      {/* ── Top Header with Brand & Collapse ── */}
      <div className={`flex items-center pt-3.5 pb-2.5 ${collapsed ? 'justify-center px-2' : 'justify-between px-3.5'}`}>
        <div 
          onClick={() => collapsed ? setCollapsed(false) : onNewChat()}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
          title={collapsed ? 'Expand sidebar' : 'Calvras Home'}
        >
          <img
            src="/logo.png"
            alt="Calvras"
            className="w-6 h-6 object-contain"
          />
          {!collapsed && (
            <span className="font-bold text-[14px] text-white tracking-tight">CALVRAS</span>
          )}
        </div>

        {!collapsed && (
          <button 
            type="button"
            onClick={() => setCollapsed(true)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors cursor-pointer"
            title="Collapse sidebar"
          >
            <PanelLeft size={16} strokeWidth={1.8} />
          </button>
        )}
      </div>

      {/* ── New Chat Button with Modern SVG ── */}
      <div className="px-2.5 py-1">
        <button 
          type="button"
          onClick={onNewChat}
          className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl text-white bg-white/[0.06] hover:bg-white/[0.12] transition-all text-[13.5px] font-medium border border-white/[0.08] shadow-sm cursor-pointer ${
            collapsed ? 'justify-center px-1' : ''
          }`}
          title="New Chat"
        >
          {/* Upgraded Modern SVG icon for New Chat */}
          <div className="w-5 h-5 flex items-center justify-center text-blue-400">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
            </svg>
          </div>
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>New Chat</span>
              <span className="text-[10px] text-neutral-400 font-mono bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
                Ctrl K
              </span>
            </div>
          )}
        </button>
      </div>

      {/* ── Navigation Links ── */}
      <div className="px-2.5 space-y-1 mt-2">
        {/* Projects Page Button */}
        <button 
          type="button"
          onClick={() => setActiveNav('projects')}
          className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl text-[13.5px] font-medium transition-colors cursor-pointer ${
            activeNav === 'projects'
              ? 'bg-[#0084ff]/15 text-blue-400 border border-blue-500/30'
              : 'text-neutral-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
          } ${collapsed ? 'justify-center' : ''}`}
          title="Projects"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <FolderGit2 size={16} className={activeNav === 'projects' ? 'text-blue-400' : 'text-neutral-400'} />
          </div>
          {!collapsed && <span>Projects</span>}
        </button>

        {/* Developer Page Button */}
        <button 
          type="button"
          onClick={() => setActiveNav('developer')}
          className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl text-[13.5px] font-medium transition-colors cursor-pointer ${
            activeNav === 'developer'
              ? 'bg-[#0084ff]/15 text-blue-400 border border-blue-500/30'
              : 'text-neutral-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
          } ${collapsed ? 'justify-center' : ''}`}
          title="Developer"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <Code2 size={16} className={activeNav === 'developer' ? 'text-blue-400' : 'text-neutral-400'} />
          </div>
          {!collapsed && <span>Developer</span>}
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* ── Bottom User Profile Card & Redesigned Dropdown Popover ── */}
      <div ref={userMenuRef} className="relative p-2.5 border-t border-white/[0.06] bg-[#0d0d0f]">
        
        {/* Redesigned Floating User Dropdown Menu */}
        {userMenuOpen && (
          <div className="absolute bottom-[60px] left-2 right-2 w-[225px] rounded-2xl bg-[#18181f]/98 backdrop-blur-2xl border border-[#2e2e3a] shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-2 space-y-1.5 z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-150 select-none">
            {/* User Profile Header Card */}
            <div className="p-2.5 rounded-xl bg-[#22222c]/80 border border-white/[0.06] flex items-center gap-2.5">
              <div className="relative flex-shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-9 h-9 rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {initial}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#18181f]" />
              </div>
              <div className="truncate text-left flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-white truncate leading-tight">{displayName}</div>
                <div className="text-[10px] text-neutral-400 truncate mt-0.5">{user?.email || 'Active Account'}</div>
              </div>
            </div>

            {/* Menu Actions */}
            <div className="space-y-0.5 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(false);
                  if (onOpenAccount) onOpenAccount();
                }}
                className="group flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <Settings size={14} className="text-neutral-400 group-hover:text-white transition-colors" />
                  <span className="font-medium">Settings & Account</span>
                </div>
                <ChevronRight size={13} className="text-neutral-500 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(false);
                  if (onOpenCustomerService) onOpenCustomerService();
                }}
                className="group flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <Headphones size={14} className="text-neutral-400 group-hover:text-white transition-colors" />
                  <span className="font-medium">Help & Support</span>
                </div>
                <span className="text-[9.5px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">24/7</span>
              </button>
            </div>

            <div className="border-t border-white/[0.08] my-1" />

            {/* Sign Out */}
            <button
              type="button"
              onClick={() => {
                setUserMenuOpen(false);
                if (onSignOut) onSignOut();
                else {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="group flex items-center gap-2 w-full px-2.5 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all cursor-pointer text-left font-medium"
            >
              <LogOut size={14} />
              <span>Sign out</span>
            </button>
          </div>
        )}

        {/* Profile Trigger Button */}
        <div 
          onClick={() => setUserMenuOpen(prev => !prev)}
          className="flex items-center justify-between p-1.5 rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="relative flex-shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                  {initial}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-[#0d0d0f]" />
            </div>
            {!collapsed && (
              <div className="truncate text-left">
                <div className="text-[12.5px] font-semibold text-white leading-tight truncate">{displayName}</div>
                <div className="text-[10px] text-neutral-400">{displayPlan}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
