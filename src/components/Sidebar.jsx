import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  Search,
  Zap,
  Gift,
  LayoutDashboard,
  Boxes,
  Folder,
  Star,
  User, 
  PanelLeft, 
  Settings, 
  Headphones, 
  LogOut, 
  MoreVertical,
  MessageSquare,
  Trash2
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

  const rawName = user?.name || 'SHIKARI';
  const firstName = rawName.split(' ')[0].toUpperCase();
  const initial = firstName.charAt(0) || 'S';
  const avatarUrl = user?.avatar || null;

  return (
    <aside 
      className={`relative flex flex-col h-full bg-[#0d0d0f] text-[#a0a0a8] border-r border-[#1a1a20] transition-all duration-200 z-30 select-none overflow-hidden ${
        collapsed ? 'w-14' : 'w-[235px]'
      }`}
    >
      {/* ── Top Brand Workspace Dropdown ── */}
      <div className={`pt-3.5 pb-2 px-2.5 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed ? (
          <div 
            onClick={onNewChat}
            className="flex items-center justify-between w-full p-1.5 rounded-xl bg-[#16161b] hover:bg-[#1f1f26] border border-white/[0.06] cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white text-[11px] font-bold shadow-sm flex-shrink-0">
                {initial}
              </div>
              <span className="text-[12.5px] font-semibold text-white truncate tracking-tight">
                {firstName}'s Calvras
              </span>
            </div>
            <ChevronDown size={13} className="text-neutral-400 group-hover:text-white transition-colors flex-shrink-0 mr-0.5" />
          </div>
        ) : (
          <div 
            onClick={() => setCollapsed(false)}
            className="w-8 h-8 rounded-xl bg-[#16161b] hover:bg-[#1f1f26] border border-white/[0.06] flex items-center justify-center cursor-pointer transition-colors"
            title="Expand sidebar"
          >
            <img src="/logo.png" alt="Calvras" className="w-4 h-4 object-contain" />
          </div>
        )}
      </div>

      {/* ── Core Navigation Links ── */}
      <div className="px-2.5 space-y-0.5 mt-1">
        {/* Dashboard */}
        <button
          onClick={onNewChat}
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors text-[13px] font-medium ${
            collapsed ? 'justify-center px-1' : ''
          }`}
        >
          <LayoutDashboard size={15} className="text-neutral-400" />
          {!collapsed && <span>Dashboard</span>}
        </button>

        {/* Search with Ctrl K */}
        <button
          onClick={onNewChat}
          className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors text-[13px] font-medium ${
            collapsed ? 'justify-center px-1' : ''
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Search size={15} className="text-neutral-400" />
            {!collapsed && <span>Search</span>}
          </div>
          {!collapsed && (
            <span className="text-[9.5px] text-neutral-400 font-mono bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
              Ctrl K
            </span>
          )}
        </button>

        {/* Connectors */}
        <button
          onClick={() => {
            if (onOpenCustomize) onOpenCustomize();
            else if (onOpenDeveloper) onOpenDeveloper();
          }}
          className={`flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors text-[13px] font-medium ${
            collapsed ? 'justify-center px-1' : ''
          }`}
        >
          <Boxes size={15} className="text-neutral-400" />
          {!collapsed && <span>Connectors</span>}
        </button>
      </div>

      {/* ── Projects & Starred Section ── */}
      {!collapsed && (
        <div className="px-3.5 mt-5 space-y-2">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Projects
          </div>
          <div className="space-y-0.5 text-[12.5px] text-neutral-400">
            <button 
              onClick={() => onOpenArtifacts?.()}
              className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Boxes size={13} className="text-neutral-500" />
                <span>All projects</span>
              </div>
            </button>

            <button 
              onClick={() => onOpenComputer?.()}
              className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2 text-neutral-500">
                <Folder size={13} />
                <span>No folders</span>
              </div>
              <Folder size={12} className="text-neutral-600" />
            </button>

            <button 
              onClick={onNewChat}
              className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors text-neutral-500"
            >
              <Star size={13} />
              <span>Starred</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Recents / History List ── */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-3.5 mt-4 space-y-2 text-[12.5px] scrollbar-thin">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Recents
          </div>
          {sessions && sessions.length > 0 ? (
            <div className="space-y-0.5">
              {sessions.slice(0, 15).map(sess => (
                <div
                  key={sess.id}
                  onClick={() => setActiveSession(sess.id)}
                  className={`group flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors cursor-pointer text-xs ${
                    activeSession === sess.id
                      ? 'bg-white/[0.08] text-white font-medium'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="truncate max-w-[140px]">{sess.title || 'New Conversation'}</span>
                  {onDeleteSession && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onDeleteSession(sess.id); }}
                      className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-400 transition-opacity p-0.5"
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-neutral-400 px-2 py-1 italic font-light">
              No recent projects
            </div>
          )}
        </div>
      )}

      {/* ── Bottom Section matching reference screenshot ── */}
      <div className="p-2.5 mt-auto border-t border-white/[0.06] space-y-2 relative">
        {/* Upgrade to Pro Card */}
        {!collapsed && (
          <div 
            onClick={() => onOpenUpgrade?.()}
            className="p-2.5 rounded-xl bg-[#17171d] hover:bg-[#202028] border border-white/[0.06] transition-all cursor-pointer group shadow-sm flex items-center justify-between"
          >
            <div>
              <div className="text-[12px] font-semibold text-white flex items-center gap-1.5">
                Upgrade to Pro
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5">Unlock more features</div>
            </div>
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Zap size={13} />
            </div>
          </div>
        )}

        {/* Share Calvras Card */}
        {!collapsed && (
          <div 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'Calvras', url: 'https://calvras.com' });
              } else {
                navigator.clipboard.writeText('https://calvras.com');
                alert('Referral link copied to clipboard!');
              }
            }}
            className="p-2.5 rounded-xl bg-[#17171d] hover:bg-[#202028] border border-white/[0.06] transition-all cursor-pointer group shadow-sm flex items-center justify-between"
          >
            <div>
              <div className="text-[12px] font-semibold text-white flex items-center gap-1.5">
                Share Calvras
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5">100 credits per paid referral</div>
            </div>
            <div className="w-6 h-6 rounded-lg bg-neutral-800 text-neutral-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Gift size={13} />
            </div>
          </div>
        )}

        {/* User Profile Pill */}
        <div 
          onClick={() => setUserMenuOpen(prev => !prev)}
          className="flex items-center justify-between p-1.5 rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="relative flex-shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-6 h-6 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold">
                  {initial}
                </div>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-[#0d0d0f]" />
            </div>
            {!collapsed && (
              <div className="truncate text-left">
                <div className="text-xs font-semibold text-neutral-200 leading-tight truncate">{rawName}</div>
                <div className="text-[10px] text-neutral-400 truncate">{user?.email || 'Active'}</div>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className="flex items-center gap-1 text-neutral-400 hover:text-white">
              <MessageSquare size={13} />
            </div>
          )}
        </div>

        {/* User Dropdown Menu */}
        {userMenuOpen && (
          <div 
            ref={userMenuRef}
            className="absolute bottom-16 left-2 right-2 p-1.5 rounded-2xl bg-[#1a1a22] border border-[#2b2b36] shadow-2xl z-50 text-neutral-200 text-xs space-y-1 animate-in fade-in duration-150"
          >
            <button
              onClick={() => { setUserMenuOpen(false); onOpenAccount?.(); }}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left"
            >
              <Settings size={13} /> Manage account
            </button>
            <button
              onClick={() => { setUserMenuOpen(false); onOpenCustomerService?.(); }}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left"
            >
              <Headphones size={13} /> Support & Feedback
            </button>
            <div className="border-t border-white/10 my-1" />
            <button
              onClick={() => { setUserMenuOpen(false); onSignOut?.(); }}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg hover:bg-red-500/20 text-red-400 text-left"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
