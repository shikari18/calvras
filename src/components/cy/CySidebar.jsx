import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  MessageSquare, 
  Layers,
  Bot, 
  GitFork, 
  Radio, 
  Hash, 
  Zap, 
  Activity, 
  Gauge, 
  Plug, 
  ShieldCheck, 
  Users, 
  CreditCard, 
  Bell, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Check, 
  Settings, 
  LogOut, 
  Building2,
  Trash2,
  Clock,
  ChevronRight,
  Code2,
  BarChart3,
  Lock,
  Sparkles
} from 'lucide-react';

import { useMarketing } from '../../context/MarketingContext';

// Official Calvras Image Logo (No White Background)
export const BrandBurstLogo = ({ size = 22, className = "" }) => (
  <img 
    src="/calvras.png" 
    alt="Calvras" 
    className={`shrink-0 object-contain select-none rounded-lg ${className}`}
    style={{ width: size, height: size }}
    loading="eager"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = '/calvras-icon.png';
    }}
  />
);

export const CySidebar = ({ 
  activeTab, 
  onSelectTab, 
  onSelectThread,
  onNewChat, 
  onSignOut, 
  threadTitle,
  userProfile = { name: 'SHIKARI Ogar', email: 'zenithzone18@gmail.com' },
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { credits, chatThreads, activeThreadId, deleteThread } = useMarketing();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRecentHovered, setIsRecentHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);

  // Check plan for Connectors gating
  const userEmail = userProfile?.email || 'default';
  const userPlanRaw = typeof window !== 'undefined' ? localStorage.getItem(`calvras_user_plan_${userEmail}`) : null;
  const userPlan = userPlanRaw ? JSON.parse(userPlanRaw)?.planKey : 'basic';
  const hasConnectorsAccess = userPlan === 'pro' || userPlan === 'agency';

  const handleMouseEnterRecent = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsRecentHovered(true);
  };

  const handleMouseLeaveRecent = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsRecentHovered(false);
    }, 250);
  };

  const navItems = [
    { id: 'threads', label: 'Chat', icon: MessageSquare },
    { id: 'recent', label: 'Recent Chats', icon: Clock, isRecentFlyout: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'flows', label: 'Flows', icon: GitFork },
    { id: 'artifacts', label: 'Artifacts', icon: Hash },
    { id: 'runs', label: 'Runs', icon: Activity },
    { id: 'usage', label: 'Usage', icon: Gauge },
  ];

  const adminItems = [
    { id: 'connectors', label: 'Connectors', icon: Plug, isGated: !hasConnectorsAccess },
    { id: 'permissions', label: 'Permissions', icon: ShieldCheck },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  // Collapsed Rail View (Dark Mode)
  if (isCollapsed) {
    return (
      <aside className="w-14 bg-[#1c1c1c] border-r border-white/10 flex flex-col justify-between h-screen shrink-0 text-left select-none text-[13px] font-sans antialiased py-3 items-center transition-all duration-300 relative z-30 overflow-visible text-white">
        
        {/* Top Logo & Expand Button */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="cursor-pointer p-1 rounded-lg hover:bg-white/10 transition" onClick={() => onSelectTab('overview')} title="Calvras">
            <BrandBurstLogo size={24} />
          </div>

          <button 
            onClick={onToggleCollapse} 
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
            title="Expand Sidebar"
          >
            <PanelLeftOpen size={16} />
          </button>

          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer relative"
            title="Notifications"
          >
            <Bell size={15} />
          </button>

          <button
            onClick={onNewChat}
            className="p-2 bg-white/10 border border-white/10 hover:bg-white/20 rounded-xl text-white transition cursor-pointer shadow-2xs"
            title="New Chat"
          >
            <Plus size={15} />
          </button>

          <div className="w-6 h-px bg-white/10" />

          {/* Collapsed Nav Stack with Hover Flyout on Recent Chats */}
          <div className="space-y-1.5 flex flex-col items-center relative overflow-visible">
            
            {/* Chat Icon */}
            <button
              onClick={() => onSelectTab('threads')}
              className={`p-2 rounded-xl transition cursor-pointer ${
                activeTab === 'threads' 
                  ? 'bg-white/10 text-white shadow-2xs font-semibold' 
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
              title="Chat"
            >
              <MessageSquare size={16} />
            </button>

            {/* Recent Chats Icon with Hover Flyout */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnterRecent}
              onMouseLeave={handleMouseLeaveRecent}
            >
              <button
                onClick={() => onSelectTab('threads')}
                className={`p-2 rounded-xl transition cursor-pointer ${
                  isRecentHovered
                    ? 'bg-white/10 text-white shadow-2xs font-semibold' 
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
                title="Recent Chats"
              >
                <Clock size={16} />
              </button>

              {/* Flyout Dropout to the Right */}
              {isRecentHovered && (
                <div 
                  className="absolute left-full top-0 ml-2 w-64 bg-[#242424] border border-white/15 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-left-2 duration-150 space-y-1.5 text-white"
                  onMouseEnter={handleMouseEnterRecent}
                  onMouseLeave={handleMouseLeaveRecent}
                >
                  <div className="absolute -left-3 top-0 bottom-0 w-3" />
                  
                  <div className="flex items-center justify-between px-2 py-1 border-b border-white/10 pb-1.5">
                    <span className="text-[11px] font-bold text-white">Recent Chats</span>
                    <button 
                      onClick={onNewChat}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                    >
                      + New
                    </button>
                  </div>

                  <div className="space-y-0.5 max-h-56 overflow-y-auto scrollbar-thin">
                    {chatThreads && chatThreads.length > 0 ? (
                      chatThreads.map((t) => {
                        const isCurrent = activeThreadId === t.id && activeTab === 'threads';
                        return (
                          <div 
                            key={t.id}
                            className={`group flex items-center justify-between px-2 py-1.5 rounded-xl text-xs transition cursor-pointer ${
                              isCurrent 
                                ? 'bg-white/10 text-white font-semibold shadow-2xs' 
                                : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                            }`}
                            onClick={() => {
                              if (onSelectThread) onSelectThread(t.id);
                              else onSelectTab('threads');
                              setIsRecentHovered(false);
                            }}
                          >
                            <div className="flex items-center gap-2 truncate mr-1">
                              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCurrent ? 'bg-emerald-400' : 'bg-neutral-500'}`} />
                              <span className="truncate">{t.title}</span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                deleteThread(t.id, e);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-400 hover:bg-white/10 rounded-md transition cursor-pointer shrink-0"
                              title="Delete chat"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-4 px-2 text-center text-xs text-neutral-500">
                        No recent chats
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            {navItems.slice(2, 6).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`p-2 rounded-xl transition cursor-pointer ${
                    isActive 
                      ? 'bg-white/10 text-white shadow-2xs font-semibold' 
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }`}
                  title={item.label}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsed Bottom User Profile Avatar */}
        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="cursor-pointer p-1 rounded-xl hover:bg-white/10 transition"
          title={userProfile?.name}
        >
          <div className="w-7 h-7 rounded-full bg-neutral-800 border border-white/20 text-white flex items-center justify-center text-xs font-semibold overflow-hidden shadow-2xs">
            {userProfile?.picture ? (
              <img 
                src={userProfile.picture} 
                referrerPolicy="no-referrer"
                alt={userProfile?.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <span>{(userProfile?.name || 'U').charAt(0).toUpperCase()}</span>
            )}
          </div>
        </div>

      </aside>
    );
  }

  // Expanded Sidebar View (Dark Luxury Theme)
  return (
    <aside className="w-60 bg-[#1c1c1c] border-r border-white/10 flex flex-col justify-between h-screen shrink-0 text-left select-none text-[13px] font-sans antialiased relative transition-all duration-300 z-40 overflow-visible text-white">
      
      {/* Top Section */}
      <div className="p-3 space-y-2 flex-1 overflow-visible">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 py-1.5 mb-1">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => onSelectTab('overview')}>
            <BrandBurstLogo size={24} />
            <span className="font-serif font-bold text-white text-base tracking-tight">
              Calvras
            </span>
          </div>

          <div className="flex items-center gap-1 text-neutral-400">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1 hover:text-white hover:bg-white/10 rounded-md transition cursor-pointer relative" 
              title="Notifications"
            >
              <Bell size={14} />
            </button>
            <button 
              onClick={onToggleCollapse} 
              className="p-1 hover:text-white hover:bg-white/10 rounded-md transition cursor-pointer" 
              title="Collapse Sidebar"
            >
              <PanelLeftClose size={14} />
            </button>
          </div>
        </div>

        {/* Notifications Dropdown Modal */}
        {showNotifications && (
          <div className="absolute top-12 left-3 right-3 bg-[#242424] border border-white/15 rounded-2xl shadow-2xl p-5 z-50 text-left space-y-4 animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white">Notifications</h3>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-white/10 flex items-center justify-center text-neutral-400 relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 text-[9px] font-bold text-emerald-400">zZ</span>
              </div>
              <h4 className="text-xs font-bold text-white">You're all caught up</h4>
              <p className="text-[11px] text-neutral-400 max-w-[180px]">
                Campaign updates & insights land here.
              </p>
            </div>
          </div>
        )}

        {/* New Chat Button (Sleek Dark Luxury Button) */}
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-between bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-medium py-2 px-3 rounded-xl transition cursor-pointer text-xs active:scale-98 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Plus size={14} className="text-emerald-400" />
            <span>New Chat</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded">⌘N</span>
        </button>

        {/* Search Bar */}
        <div className="flex items-center justify-between px-2.5 py-1.5 text-neutral-400 bg-white/[0.02] border border-white/5 hover:border-white/15 rounded-xl cursor-pointer transition">
          <div className="flex items-center gap-2">
            <Search size={13} />
            <span className="text-xs text-neutral-400 font-normal">Search</span>
          </div>
          <span className="text-[10px] bg-white/5 text-neutral-400 px-1.5 py-0.5 rounded font-mono">Ctrl K</span>
        </div>

        {/* Main Navigation Menu */}
        <div className="space-y-0.5 pt-1 overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.isRecentFlyout) {
              return (
                <div 
                  key={item.id} 
                  className="relative overflow-visible"
                  onMouseEnter={handleMouseEnterRecent}
                  onMouseLeave={handleMouseLeaveRecent}
                >
                  <button
                    onClick={() => onSelectTab('threads')}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                      isRecentHovered
                        ? 'bg-white/[0.08] text-white font-semibold shadow-2xs' 
                        : 'text-neutral-400 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={14} className={isRecentHovered ? 'text-white' : 'text-neutral-400'} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={12} className="text-neutral-500" />
                  </button>

                  {/* Dropout Flyout Card to the Right of Sidebar */}
                  {isRecentHovered && (
                    <div 
                      className="absolute left-full top-0 ml-2 w-64 bg-[#161714] border border-white/15 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-left-2 duration-150 space-y-1.5 text-white"
                      onMouseEnter={handleMouseEnterRecent}
                      onMouseLeave={handleMouseLeaveRecent}
                    >
                      <div className="absolute -left-3 top-0 bottom-0 w-3" />

                      <div className="flex items-center justify-between px-2 py-1 border-b border-white/10 pb-1.5">
                        <span className="text-[11px] font-bold text-white">Recent Chats</span>
                        <button 
                          onClick={onNewChat}
                          className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                        >
                          + New
                        </button>
                      </div>

                      <div className="space-y-0.5 max-h-56 overflow-y-auto scrollbar-thin">
                        {chatThreads && chatThreads.length > 0 ? (
                          chatThreads.map((t) => {
                            const isCurrent = activeThreadId === t.id && activeTab === 'threads';
                            return (
                              <div 
                                key={t.id}
                                className={`group flex items-center justify-between px-2 py-1.5 rounded-xl text-xs transition cursor-pointer ${
                                  isCurrent 
                                  ? 'bg-white/[0.08] text-white font-semibold shadow-2xs' 
                                  : 'text-neutral-400 hover:bg-white/[0.05] hover:text-white'
                                }`}
                                onClick={() => {
                                  if (onSelectThread) onSelectThread(t.id);
                                  else onSelectTab('threads');
                                  setIsRecentHovered(false);
                                }}
                              >
                                <div className="flex items-center gap-2 truncate mr-1">
                                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCurrent ? 'bg-emerald-400' : 'bg-neutral-500'}`} />
                                  <span className="truncate">{t.title}</span>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    deleteThread(t.id, e);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-400 hover:bg-white/10 rounded-md transition cursor-pointer shrink-0"
                                  title="Delete chat"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            );
                          })
                        ) : (
                          <div className="py-4 px-2 text-center text-xs text-neutral-500">
                            No recent chats
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isActive 
                    ? 'bg-white/[0.08] text-white font-semibold shadow-2xs' 
                    : 'text-neutral-400 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-neutral-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="h-px bg-white/10 my-2" />

        {/* Admin Menu Items (With Lock on Connectors for $10 Basic Users) */}
        <div className="space-y-0.5">
          {adminItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isActive 
                    ? 'bg-white/[0.08] text-white font-semibold shadow-2xs' 
                    : 'text-neutral-400 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={14} className={isActive ? 'text-white' : 'text-neutral-400'} />
                  <span>{item.label}</span>
                </div>
                {item.isGated && (
                  <span className="text-[9px] font-mono text-[#8057ff] font-bold flex items-center gap-1 bg-[#8057ff]/15 px-1.5 py-0.5 rounded">
                    <Lock size={9} />
                    <span>Pro</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom User & Credits Section (Sleek Dark Mode) */}
      <div className="p-3 border-t border-white/10 space-y-2.5 bg-[#1c1c1c] relative">
        
        {/* Credits Remaining Card */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">Credits Remaining</span>
            <span className="text-white font-bold font-mono text-xs">{credits?.remaining ?? 1000}</span>
          </div>

          <button 
            onClick={() => onSelectTab('billing')}
            className="w-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-[11px] font-semibold py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles size={11} className="text-emerald-400" />
            <span>Manage Plan</span>
          </button>
        </div>

        {/* User Profile Bar */}
        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-2.5 px-1 p-1 rounded-xl hover:bg-white/5 transition cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-neutral-800 border border-white/20 text-white flex items-center justify-center text-xs font-semibold shrink-0 overflow-hidden shadow-2xs">
            {userProfile?.picture ? (
              <img 
                src={userProfile.picture} 
                referrerPolicy="no-referrer"
                alt={userProfile?.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <span>{(userProfile?.name || 'U').charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs font-semibold text-white block truncate leading-tight">{userProfile.name}</span>
            <span className="text-[10px] text-neutral-400 block truncate">{userProfile.email}</span>
          </div>
        </div>

        {/* Profile Popup Menu */}
        {showProfileMenu && (
          <div className="absolute bottom-16 left-3 right-3 bg-[#242424] border border-white/15 rounded-2xl shadow-2xl p-2 z-50 text-xs space-y-1.5 animate-in slide-in-from-bottom-2 duration-150 text-white">
            <div className="px-2 py-1 border-b border-white/10 pb-2">
              <span className="font-bold text-white block">{userProfile.name}</span>
              <span className="text-[10px] text-neutral-400 block">{userProfile.email}</span>
            </div>

            <button 
              onClick={() => {
                onSelectTab('billing');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white transition cursor-pointer text-left"
            >
              <Settings size={13} />
              <span>Workspace Settings</span>
            </button>

            <button 
              onClick={() => {
                onSelectTab('team');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white transition cursor-pointer text-left"
            >
              <Building2 size={13} />
              <span>Organization</span>
            </button>

            <div className="h-px bg-white/10 my-1" />

            <button 
              onClick={() => {
                setShowProfileMenu(false);
                onSignOut();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-400 transition cursor-pointer text-left"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        )}

      </div>

    </aside>
  );
};
