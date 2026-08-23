import React, { useState } from 'react';
import { 
  Home, 
  Send, 
  FileText, 
  Users, 
  UserCheck,
  BarChart2, 
  Calendar,
  Sparkles,
  Store,
  Layers,
  Settings, 
  HelpCircle, 
  ChevronDown, 
  Bell, 
  Plus, 
  Search,
  PanelLeftClose,
  PanelLeft,
  Menu,
  X
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';

export const DashboardLayout = ({ 
  activeTab = 'home', 
  onSelectTab, 
  onNavigate, 
  onOpenNewCampaign,
  children 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { businessProfile } = useMarketing();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, badge: null },
    { id: 'campaigns', label: 'Campaigns', icon: Send, badge: null },
    { id: 'content', label: 'Content', icon: FileText, badge: null },
    { id: 'audience', label: 'Audience', icon: Users, badge: null },
    { id: 'leads', label: 'Leads', icon: UserCheck, badge: '12', badgeColor: 'bg-purple-100 text-purple-700' },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, badge: null },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: null },
    { id: 'automations', label: 'Automations', icon: Sparkles, badge: 'New', badgeColor: 'bg-emerald-100 text-emerald-700' },
    { id: 'brand-voice', label: 'Brand Voice', icon: Store, badge: null },
    { id: 'integrations', label: 'Integrations', icon: Layers, badge: null },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fafafc] flex text-neutral-900 font-sans antialiased select-none">
      
      {/* 1. Pinned Clean Light Sidebar */}
      <aside 
        className={`hidden lg:flex flex-col justify-between bg-white border-r border-neutral-200/80 h-screen shrink-0 z-30 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-20 p-3' : 'w-60 p-4'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Logo Header */}
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-neutral-100">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group overflow-hidden"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Sparkles size={16} />
              </div>
              {!sidebarCollapsed && (
                <div className="text-left overflow-hidden">
                  <span className="font-bold text-sm tracking-tight block leading-tight text-neutral-950">
                    AI Marketing
                  </span>
                  <span className="text-[11px] font-medium text-neutral-400 block">
                    Assistant
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-neutral-400 hover:text-purple-700 p-1.5 rounded-lg transition cursor-pointer"
            >
              {sidebarCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 flex-1 overflow-y-auto py-2 pr-0.5 scrollbar-none text-left">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'leads') onSelectTab('audience');
                    else if (item.id === 'automations') onSelectTab('campaigns');
                    else onSelectTab(item.id);
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    sidebarCollapsed ? 'justify-center px-2' : 'justify-between'
                  } ${
                    isActive 
                      ? 'bg-purple-50 text-purple-700 font-bold border border-purple-100' 
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon 
                      size={16} 
                      className={isActive ? 'text-purple-600' : 'text-neutral-400'} 
                    />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>

                  {!sidebarCollapsed && item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-neutral-100 text-neutral-500'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Sidebar */}
          <div className="pt-3 border-t border-neutral-100 space-y-3 shrink-0 text-left">
            <div className="space-y-1">
              <button onClick={() => onSelectTab('settings')} className="w-full flex items-center gap-3 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition font-medium cursor-pointer">
                <Settings size={15} />
                {!sidebarCollapsed && <span>Settings</span>}
              </button>
              <button onClick={() => onSelectTab('settings')} className="w-full flex items-center gap-3 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition font-medium cursor-pointer">
                <HelpCircle size={15} />
                {!sidebarCollapsed && <span>Help & Support</span>}
              </button>
            </div>

            {/* Business Store Switcher */}
            {!sidebarCollapsed && (
              <div 
                onClick={() => onSelectTab('brand-voice')}
                className="flex items-center justify-between p-2 rounded-2xl bg-neutral-50 border border-neutral-200/60 hover:bg-neutral-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                    SP
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-neutral-950 block truncate">
                      {businessProfile.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      Business
                    </span>
                  </div>
                </div>
                <ChevronDown size={14} className="text-neutral-400 shrink-0" />
              </div>
            )}

            {/* Pro Plan Card */}
            {!sidebarCollapsed && (
              <div className="bg-[#fafafc] rounded-2xl p-3 border border-neutral-200/80 space-y-2">
                <div>
                  <span className="text-xs font-bold text-neutral-900 block leading-tight">Pro Plan</span>
                  <span className="text-[10.5px] text-neutral-400">Credits: 1,250</span>
                </div>
                <button 
                  onClick={() => onSelectTab('settings')}
                  className="w-full text-xs font-bold text-purple-700 bg-white border border-purple-200 py-1.5 rounded-xl hover:bg-purple-50 transition cursor-pointer"
                >
                  Upgrade Plan
                </button>
              </div>
            )}
          </div>

        </div>
      </aside>

      {/* 2. Main Center + Right Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0 bg-[#fafafc]">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
