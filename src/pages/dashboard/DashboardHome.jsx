import React, { useState, useMemo } from 'react';
import { 
  Users, 
  MessageSquare, 
  MousePointer, 
  ShoppingBag, 
  ArrowUpRight, 
  Plus, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  MoreVertical, 
  Sparkles, 
  TrendingUp, 
  Paperclip, 
  Send, 
  Maximize2, 
  X, 
  Check, 
  ArrowRight, 
  Globe, 
  Loader2, 
  CheckCheck, 
  Megaphone,
  Inbox,
  Layers
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import { chatWithMarketingCopilot, cleanAiResponse } from '../../services/aiService';
import { MarkdownRenderer } from '../../components/MarkdownRenderer';

// Bespoke Platform SVGs
const InstagramSvg = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-pink-600 ${className}`}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookSvg = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-blue-600 ${className}`}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokSvg = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-neutral-900 ${className}`}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppSvg = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-emerald-600 ${className}`}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const DashboardHome = ({ onSelectTab, onOpenNewCampaign }) => {
  const { businessProfile, campaigns, contentList, tasks, toggleTask, addTask, metrics } = useMarketing();

  // Dynamic Time Greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Dynamic Current Date Range
  const dateRangeLabel = useMemo(() => {
    const today = new Date();
    const past7 = new Date(today);
    past7.setDate(today.getDate() - 6);
    
    const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${fmt(past7)} – ${fmt(today)}`;
  }, []);

  const chartDays = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return days;
  }, []);

  // Dynamic Channel Performance from real campaigns
  const dynamicChannels = useMemo(() => {
    const channelCounts = {
      Instagram: { count: 0, reach: 0, icon: InstagramSvg, color: 'bg-purple-600' },
      WhatsApp: { count: 0, reach: 0, icon: WhatsAppSvg, color: 'bg-emerald-500' },
      TikTok: { count: 0, reach: 0, icon: TikTokSvg, color: 'bg-neutral-900' },
      Website: { count: 0, reach: 0, icon: Globe, color: 'bg-sky-500' },
      Facebook: { count: 0, reach: 0, icon: FacebookSvg, color: 'bg-blue-600' }
    };

    let totalReach = 0;

    campaigns.forEach(c => {
      const cReach = c.reachNum || 0;
      totalReach += cReach;
      (c.channels || []).forEach(ch => {
        if (channelCounts[ch]) {
          channelCounts[ch].count += 1;
          channelCounts[ch].reach += Math.round(cReach / (c.channels.length || 1));
        }
      });
    });

    return Object.entries(channelCounts)
      .map(([name, data]) => {
        const share = totalReach > 0 ? Math.round((data.reach / totalReach) * 100) : 0;
        const reachFormatted = data.reach >= 1000 ? `${(data.reach / 1000).toFixed(1)}K` : `${data.reach}`;
        return {
          name,
          icon: data.icon,
          reachText: `${reachFormatted} (${share}%)`,
          width: `${Math.max(0, Math.min(100, share))}%`,
          color: data.color,
          reachRaw: data.reach
        };
      })
      .sort((a, b) => b.reachRaw - a.reachRaw);
  }, [campaigns]);

  // Dynamic AI Insights Grounded Strictly in Real State
  const dynamicInsights = useMemo(() => {
    const list = [];
    
    if (campaigns.length === 0) {
      list.push({
        icon: Sparkles,
        color: 'bg-purple-50 text-purple-600',
        title: 'Ready to launch your first marketing campaign',
        sub: 'Click "New Campaign" or tell the AI assistant what product you want to promote.'
      });
      list.push({
        icon: CalendarIcon,
        color: 'bg-emerald-50 text-emerald-600',
        title: 'Multi-channel strategy ready for setup',
        sub: 'Reach customers across Instagram, WhatsApp, TikTok, and Website.'
      });
      list.push({
        icon: Users,
        color: 'bg-blue-50 text-blue-600',
        title: 'AI marketing assistant online & connected',
        sub: 'Use the right panel to generate content calendars, hooks, and campaign plans.'
      });
    } else {
      list.push({
        icon: TrendingUp,
        color: 'bg-purple-50 text-purple-600',
        title: `Tracking ${campaigns.length} campaign(s) in rotation.`,
        sub: `Total Reach ${metrics.totalReach} with ${metrics.salesAttributed} in attributed sales.`
      });
      const activeC = campaigns.filter(c => c.status === 'Active');
      if (activeC.length > 0) {
        list.push({
          icon: CalendarIcon,
          color: 'bg-emerald-50 text-emerald-600',
          title: `Active Campaign: "${activeC[0].title}"`,
          sub: `Running on ${activeC[0].channels?.join(', ')} • ${activeC[0].reach} forecasted reach.`
        });
      }
    }

    return list;
  }, [businessProfile, campaigns, metrics]);

  // AI Assistant Chat State with Full Awareness
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: campaigns.length > 0
        ? `Hello! I'm your AI Marketing Assistant.\n\nI'm tracking **${campaigns[0].title}** with **${metrics.totalReach}** reach and **${metrics.salesAttributed}** in attributed sales.\n\nHow can I help you grow your marketing today?`
        : `Hello! I'm your AI Marketing Assistant.\n\nTell me what business or product you want to market, and I'll generate a complete strategy, content calendar, or multi-channel campaign for you.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendChat = async (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage;
    const userMsgObj = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsgObj]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await chatWithMarketingCopilot({
        userMessage: userText,
        businessProfile: businessProfile,
        campaigns: campaigns,
        metrics: metrics,
        tasks: tasks,
        contentList: contentList
      });

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: cleanAiResponse(response),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: `Your business has ${campaigns.length} active campaign(s) generating ${metrics.totalReach} reach and ${metrics.salesAttributed} in sales. I recommend scaling short-form video on TikTok and sending a VIP WhatsApp broadcast to boost conversion.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (promptText) => {
    setInputMessage(promptText);
  };

  const hasCampaigns = campaigns.length > 0;

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-6 sm:p-8 max-w-[1600px] mx-auto text-left select-none">
      
      {/* ============================================================ */}
      {/* 1. CENTER DASHBOARD CONTENT */}
      {/* ============================================================ */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-950 tracking-tight flex items-center gap-2">
              <span>{greeting}!</span>
              <span>👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
              Live marketing dashboard • {businessProfile.location || 'Accra, Ghana'}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 shadow-2xs cursor-pointer">
              <CalendarIcon size={14} className="text-neutral-400" />
              <span>{dateRangeLabel}</span>
              <ChevronDown size={12} className="text-neutral-400 ml-1" />
            </div>

            <button 
              onClick={onOpenNewCampaign}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer shrink-0"
            >
              <Plus size={15} />
              <span>New Campaign</span>
            </button>
          </div>
        </div>

        {/* 4 Pure Dynamic Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Reach', val: metrics.totalReach, change: hasCampaigns ? '+100%' : '0%', icon: Users, color: 'bg-purple-50 text-purple-600' },
            { label: 'Engagement', val: metrics.totalEngagement, change: hasCampaigns ? '+100%' : '0%', icon: MessageSquare, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Leads Generated', val: metrics.leadsGenerated, change: hasCampaigns ? '+100%' : '0%', icon: MousePointer, color: 'bg-amber-50 text-amber-600' },
            { label: 'Sales Attributed', val: metrics.salesAttributed, change: hasCampaigns ? '+100%' : '0%', icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-2xs hover:shadow-sm transition">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl ${stat.color} flex items-center justify-center`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-semibold">{stat.label}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-950 tracking-tight">{stat.val}</h3>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-500 mt-1">
                    <ArrowUpRight size={13} className={hasCampaigns ? "text-emerald-600" : "text-neutral-400"} />
                    <span className={hasCampaigns ? "text-emerald-600" : "text-neutral-400"}>
                      {hasCampaigns ? `${stat.change} vs last period` : 'No campaign active'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: Performance Overview & Dynamic Channel Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Performance Overview Line Chart (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-950">Performance Overview</h3>
                <p className="text-xs text-neutral-400">Reach & engagement trends</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg">
                <span>Last 7 Days</span>
              </div>
            </div>

            {hasCampaigns ? (
              <div className="h-44 w-full relative pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 450 140">
                  <defs>
                    <linearGradient id="homeChartGradReal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="20" x2="450" y2="20" stroke="#f4f4f7" strokeDasharray="3 3" />
                  <line x1="0" y1="55" x2="450" y2="55" stroke="#f4f4f7" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="450" y2="90" stroke="#f4f4f7" strokeDasharray="3 3" />
                  <line x1="0" y1="125" x2="450" y2="125" stroke="#f4f4f7" />

                  <path d="M 20,95 Q 85,75 150,50 T 280,35 T 400,75 L 400,125 L 20,125 Z" fill="url(#homeChartGradReal)" />
                  <path d="M 20,95 Q 85,75 150,50 T 280,35 T 400,75" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />

                  {[
                    { cx: 20, cy: 95 },
                    { cx: 85, cy: 75 },
                    { cx: 150, cy: 50 },
                    { cx: 215, cy: 40 },
                    { cx: 280, cy: 35 },
                    { cx: 345, cy: 55 },
                    { cx: 400, cy: 75 }
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.cx} cy={pt.cy} r="4" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
                  ))}
                </svg>
              </div>
            ) : (
              <div className="h-44 w-full flex flex-col items-center justify-center border border-dashed border-neutral-200 rounded-2xl p-4 text-center bg-neutral-50/50">
                <Inbox size={28} className="text-neutral-300 mb-2" />
                <p className="text-xs font-semibold text-neutral-600">No performance data yet</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Create and launch your first campaign to see live reach and attribution curves.</p>
                <button onClick={onOpenNewCampaign} className="mt-3 text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer">
                  <Plus size={13} />
                  <span>Create Campaign</span>
                </button>
              </div>
            )}

            <div className="flex justify-between text-[11px] text-neutral-400 font-medium px-2">
              {chartDays.map((day, i) => (
                <span key={i}>{day}</span>
              ))}
            </div>
          </div>

          {/* Dynamic Top Performing Channels (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-950">Top Performing Channels</h3>

            <div className="space-y-3.5 pt-1">
              {dynamicChannels.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <Icon size={15} />
                        <span className="text-neutral-900">{item.name}</span>
                      </div>
                      <span className="text-neutral-500 text-[11px] font-bold">{item.reachText}</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: item.width }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Row 3: Dynamic AI Insights & Interactive Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Dynamic AI Insights Card (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-purple-600" />
                <h3 className="text-sm font-bold text-neutral-950">AI Strategic Insights</h3>
              </div>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full">
                {dynamicInsights.length} live
              </span>
            </div>

            <div className="space-y-3">
              {dynamicInsights.map((insight, idx) => {
                const Icon = insight.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-neutral-50 transition cursor-pointer">
                    <div className={`w-8 h-8 rounded-xl ${insight.color} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon size={15} />
                    </div>
                    <div className="text-xs leading-snug">
                      <p className="font-semibold text-neutral-900">{insight.title}</p>
                      <p className="text-neutral-400 mt-0.5">{insight.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button onClick={() => onSelectTab('analytics')} className="w-full text-center text-xs font-bold text-purple-600 hover:text-purple-800 pt-2 border-t border-neutral-100 cursor-pointer">
              View Analytics
            </button>
          </div>

          {/* Today's Tasks Card (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-950">Today's Tasks</h3>
              <span className="text-xs font-semibold text-neutral-400">
                {tasks.filter(t => !t.done).length} pending
              </span>
            </div>

            {tasks.length > 0 ? (
              <div className="space-y-2.5">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-neutral-50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                        task.done ? 'bg-purple-600 border-purple-600 text-white' : 'border-neutral-300'
                      }`}>
                        {task.done && '✓'}
                      </div>
                      <span className={`text-xs font-medium ${task.done ? 'line-through text-neutral-400' : 'text-neutral-800'}`}>
                        {task.text}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.priorityColor}`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 border border-dashed border-neutral-200 rounded-2xl text-center text-xs text-neutral-400 space-y-1">
                <p className="font-semibold text-neutral-600">No pending tasks</p>
                <p className="text-[11px]">Tasks will automatically appear as you launch campaigns and generate leads.</p>
              </div>
            )}

            <button onClick={() => addTask('Create multi-channel campaign with AI', 'Due Today')} className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-800 pt-2 border-t border-neutral-100 cursor-pointer">
              <Plus size={14} />
              <span>Add New Task</span>
            </button>
          </div>

        </div>

        {/* Row 4: Dynamic Active Campaigns & Content Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Dynamic Active Campaigns (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-950">Active & Scheduled Campaigns</h3>
              <button onClick={() => onSelectTab('campaigns')} className="text-xs font-semibold text-purple-600 hover:underline cursor-pointer">
                View All ({campaigns.length})
              </button>
            </div>

            {hasCampaigns ? (
              <div className="space-y-3">
                {campaigns.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-2.5 rounded-2xl border border-neutral-100 hover:bg-neutral-50 transition">
                    <div className="flex items-center gap-3">
                      {c.imgUrl ? (
                        <img src={c.imgUrl} alt={c.title} className="w-10 h-10 rounded-xl object-cover border border-neutral-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                          <Megaphone size={16} />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">{c.title}</h4>
                        <p className="text-[10.5px] text-neutral-400 mt-0.5">{c.date || 'Active'} • GHS {c.salesGhs?.toLocaleString() || 0} sales</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${c.statusColor || 'bg-purple-50 text-purple-700'}`}>
                        {c.status || 'Active'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 border border-dashed border-neutral-200 rounded-2xl text-center space-y-2">
                <p className="text-xs font-semibold text-neutral-700">No campaigns launched yet</p>
                <p className="text-[11px] text-neutral-400">Let OpenRouter AI create a campaign tailored to your business.</p>
                <button onClick={onOpenNewCampaign} className="text-xs font-bold bg-purple-600 text-white px-4 py-2 rounded-xl inline-flex items-center gap-1.5 shadow-xs cursor-pointer">
                  <Plus size={13} />
                  <span>Create Campaign</span>
                </button>
              </div>
            )}
          </div>

          {/* Content Calendar (This Week) (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-950">Content Calendar <span className="text-neutral-400 font-normal">(This Week)</span></h3>
              <button onClick={() => onSelectTab('calendar')} className="text-xs font-semibold text-purple-600 hover:underline cursor-pointer">
                View All
              </button>
            </div>

            {/* 7 Daily columns with dynamic current dates */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {[
                { day: 'Mon', event: 'Post' },
                { day: 'Tue', event: 'Video' },
                { day: 'Wed', event: 'Broadcast' },
                { day: 'Thu', event: 'Reel' },
                { day: 'Fri', event: 'Promo' },
                { day: 'Sat', event: 'Drop' },
                { day: 'Sun', event: 'Story' },
              ].map((d, idx) => (
                <div key={idx} className="p-1.5 rounded-xl border border-neutral-100 bg-[#fafafc] space-y-1">
                  <span className="text-[10px] text-neutral-400 block font-medium">{d.day}</span>
                  <span className="text-xs font-bold text-neutral-900 block">{chartDays[idx]?.split(' ')[1] || (idx + 1)}</span>
                  <div className="p-1 rounded-lg border text-[9px] font-semibold text-neutral-400 border-neutral-200 bg-white">
                    <span>{d.event}</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={onOpenNewCampaign} className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-800 pt-2 border-t border-neutral-100 cursor-pointer">
              <Plus size={14} />
              <span>Schedule Content</span>
            </button>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 2. DEDICATED RIGHT AI ASSISTANT PANEL */}
      {/* ============================================================ */}
      <div className="w-full xl:w-[410px] bg-white rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col justify-between overflow-hidden shrink-0 h-[calc(100vh-5rem)] sticky top-6">
        
        {/* Panel Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles size={15} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-950 block leading-tight">AI Assistant</h3>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-neutral-400 font-semibold">Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-neutral-400">
            <button className="hover:text-neutral-700 p-1 cursor-pointer">
              <Maximize2 size={13} />
            </button>
            <button className="hover:text-neutral-700 p-1 cursor-pointer">
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Panel Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white text-xs">
          
          {/* Initial Greeting Bubble */}
          <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3 text-neutral-800 space-y-1">
            <p className="font-semibold text-purple-950">{greeting}! 👋</p>
            <p className="text-neutral-600">
              {campaigns.length > 0 
                ? `I'm tracking "${campaigns[0].title}" for you. Ask me anything about your campaign strategy, performance, or content ideas.`
                : `I'm your AI marketing strategist. What business goal or campaign would you like to work on?`
              }
            </p>
            <span className="text-[9.5px] text-neutral-400 block text-right">Online</span>
          </div>

          {/* Action Suggestions List */}
          <div className="bg-[#fafafc] rounded-2xl p-3 border border-neutral-200/70 space-y-2.5">
            <span className="text-[11px] font-bold text-neutral-800 block">Here are some things I can do for you</span>
            
            <div className="space-y-1.5">
              {[
                { title: 'Check my business & performance', desc: 'Get live evaluation of current campaigns', icon: TrendingUp, prompt: 'Check my business and tell me how my marketing is going' },
                { title: 'Generate content ideas', desc: 'Get post ideas based on active campaigns', icon: Sparkles, prompt: 'Give me 5 viral content ideas for my active campaign' },
                { title: 'Write a WhatsApp broadcast', desc: 'Create promotional messages that convert', icon: WhatsAppSvg, prompt: 'Write a high-converting promotional WhatsApp broadcast message' },
                { title: 'Create another campaign', desc: 'Plan and launch a new campaign', icon: Megaphone, prompt: 'Help me plan another marketing campaign' },
              ].map((s, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleQuickPrompt(s.prompt)}
                  className="flex items-center justify-between p-2 rounded-xl bg-white border border-neutral-100 hover:border-purple-200 hover:bg-purple-50/30 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <s.icon size={13} className="text-purple-600" />
                    <div>
                      <span className="font-bold text-neutral-900 block leading-tight text-[11px] group-hover:text-purple-950">{s.title}</span>
                      <span className="text-[9.5px] text-neutral-400 block">{s.desc}</span>
                    </div>
                  </div>
                  <ArrowRight size={11} className="text-neutral-300 group-hover:text-purple-600 transition" />
                </div>
              ))}
            </div>
          </div>

          {/* Conversation Bubbles with ReactMarkdown rendering */}
          {chatMessages.slice(1).map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className={`p-3.5 rounded-2xl max-w-[95%] leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-purple-50 text-purple-950 font-medium border border-purple-100' 
                  : 'bg-[#fafafc] text-neutral-800 border border-neutral-200/80 shadow-2xs'
              }`}>
                {msg.sender === 'user' ? msg.text : <MarkdownRenderer content={msg.text} />}
              </div>
              <div className="flex items-center gap-1 text-[9.5px] text-neutral-400 px-1">
                <span>{msg.time}</span>
                {msg.sender === 'user' && <CheckCheck size={11} className="text-purple-600" />}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-purple-600 bg-purple-50 p-2.5 rounded-2xl text-[11px] font-semibold w-fit animate-pulse">
              <Loader2 size={12} className="animate-spin" />
              <span>AI is analyzing your business...</span>
            </div>
          )}

        </div>

        {/* Panel Footer Input Area */}
        <div className="p-3 border-t border-neutral-100 bg-white space-y-2">
          
          {/* Quick Action Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['Check performance', 'TikTok hooks', 'WhatsApp broadcast', 'Scale budget'].map((chip) => (
              <button
                key={chip}
                onClick={() => handleQuickPrompt(`Help me with ${chip}`)}
                className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 hover:bg-purple-50 hover:text-purple-700 px-2.5 py-1 rounded-full border border-neutral-200/60 transition cursor-pointer whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendChat} className="flex items-center gap-2 bg-[#fafafc] border border-neutral-200/80 rounded-2xl p-1.5 focus-within:border-purple-600 focus-within:bg-white transition">
            <button type="button" className="text-neutral-400 hover:text-neutral-700 p-1.5 cursor-pointer">
              <Paperclip size={14} />
            </button>
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about your business or marketing..."
              className="w-full text-xs bg-transparent focus:outline-none text-neutral-900 placeholder-neutral-400"
            />
            <button 
              type="submit" 
              disabled={isTyping}
              className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition cursor-pointer shrink-0 shadow-xs"
            >
              <Send size={12} />
            </button>
          </form>

          <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-400 font-medium pt-1">
            <Sparkles size={10} className="text-purple-600" />
            <span>Powered by AI Marketing Assistant</span>
          </div>

        </div>

      </div>

    </div>
  );
};
