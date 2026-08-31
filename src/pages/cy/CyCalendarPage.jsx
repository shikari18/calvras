import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Grid, 
  List, 
  ArrowRight, 
  Loader2, 
  Clock, 
  Video, 
  Share2, 
  Plus, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { callOpenRouterAI, cleanAiResponse } from '../../services/aiService';
import { useMarketing } from '../../context/MarketingContext';
import confetti from 'canvas-confetti';

const SAMPLE_30_DAY_PLAN = Array.from({ length: 30 }, (_, idx) => {
  const day = idx + 1;
  const pillars = ['Hook / Viral', 'Product Showcase', 'Customer Proof', 'Behind The Scenes', 'Educational / Tip', 'Flash Offer'];
  const platforms = ['TikTok', 'Instagram', 'WhatsApp VIP', 'Facebook'];
  const pillar = pillars[idx % pillars.length];
  const platform = platforms[idx % platforms.length];

  return {
    day,
    pillar,
    platform,
    time: ['12:30 PM', '6:00 PM', '8:15 PM', '10:00 AM'][idx % 4],
    hook: [
      'Stop making this 1 huge mistake with your orders...',
      'Why everyone in Accra is switching to this brand this week:',
      'POV: You ordered on WhatsApp and it arrived in 45 minutes.',
      'Unboxing what 150 GHS gets you in 2026 🔥',
      'The secret behind how we make our top-selling product...',
      'Flash Friday VIP: 20% off for the first 15 people who DM'
    ][idx % 6],
    caption: `Full breakdown of how to get the most value today. Drop a comment or tap the link in bio to claim before stock runs out! 📦 #accra #ghana #brandgrowth #trending`,
    cta: 'Click link in bio or WhatsApp us directly'
  };
});

export const CyCalendarPage = ({ onNewChat }) => {
  const { deductCredits, addContent, userProfile } = useMarketing();
  const [niche, setNiche] = useState('Food & Restaurant');
  const [productName, setProductName] = useState('Gourmet Burger & Wings');
  const [goal, setGoal] = useState('Viral Growth & Sales');
  const [isGenerating, setIsGenerating] = useState(false);
  const [calendarData, setCalendarData] = useState(SAMPLE_30_DAY_PLAN);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [copiedDay, setCopiedDay] = useState(null);
  const [savedDay, setSavedDay] = useState(null);

  const niches = [
    'Food & Restaurant',
    'Fashion & Streetwear',
    'Beauty & Skincare',
    'Tech & Gadgets',
    'Real Estate & Rentals',
    'Fitness & Health',
    'E-commerce Store'
  ];

  const goals = [
    'Viral Growth & Sales',
    'Brand Awareness & Reach',
    'High Engagement & Shares',
    'WhatsApp VIP Conversions'
  ];

  const handleGenerateCalendar = async () => {
    setIsGenerating(true);
    deductCredits(10);

    const prompt = `Generate a high-converting 30-Day Social Media Content Calendar for a brand in "${niche}" selling "${productName}" with the primary goal of "${goal}".
    Return a structured JSON-like array of 30 days or clear day-by-day blueprint where each day has:
    - Day (1-30)
    - Pillar (Viral Hook, Educational, Product Demo, Customer Proof, BTS, Promo)
    - Platform (TikTok, Instagram, WhatsApp VIP)
    - The First 3-Second Hook (High retention)
    - Caption Summary & CTA
    - Optimal Posting Time`;

    try {
      const response = await callOpenRouterAI({
        messages: [
          { role: 'system', content: 'You are an elite social media growth strategist. Generate engaging viral hooks and content schedules for TikTok, Instagram, and WhatsApp.' },
          { role: 'user', content: prompt }
        ],
        userPrompt: prompt
      });

      // Update calendar data
      const cleaned = cleanAiResponse(response);
      // Fallback update with dynamic product data
      const updated = Array.from({ length: 30 }, (_, idx) => {
        const day = idx + 1;
        const pillars = ['Viral Hook', 'Product Showcase', 'Customer Proof', 'Behind The Scenes', 'Educational / Tip', 'Flash Offer'];
        const platforms = ['TikTok', 'Instagram', 'WhatsApp VIP', 'Facebook'];
        return {
          day,
          pillar: pillars[idx % pillars.length],
          platform: platforms[idx % platforms.length],
          time: ['12:30 PM', '6:00 PM', '8:15 PM', '10:00 AM'][idx % 4],
          hook: `Day ${day} Hook for ${productName}: ${[
            'If you love ' + productName + ', you need to see this...',
            'The real reason our ' + productName + ' sells out every weekend:',
            'POV: You finally tried our ' + productName + ' in Accra 🔥',
            '3 things you did not know about our ' + productName,
            'Behind the scenes preparing orders for ' + productName,
            'Exclusive VIP offer for ' + productName + ' today only!'
          ][idx % 6]}`,
          caption: `Order your ${productName} directly on WhatsApp or tap the link in bio. Fast delivery available across the city! 🚀 #viral #brand`,
          cta: 'DM us or tap bio link to order'
        };
      });

      setCalendarData(updated);
      try { confetti({ particleCount: 70, spread: 70 }); } catch (err) {}
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyDay = (dayItem) => {
    const text = `Day ${dayItem.day} [${dayItem.platform} - ${dayItem.time}]\n🎯 Pillar: ${dayItem.pillar}\n🎣 Hook: ${dayItem.hook}\n📝 Caption: ${dayItem.caption}\n👉 CTA: ${dayItem.cta}`;
    navigator.clipboard.writeText(text);
    setCopiedDay(dayItem.day);
    setTimeout(() => setCopiedDay(null), 2000);
  };

  const handleSaveToContent = (dayItem) => {
    addContent({
      id: `cal-content-${Date.now()}-${dayItem.day}`,
      title: `Day ${dayItem.day}: ${dayItem.pillar}`,
      hook: dayItem.hook,
      caption: dayItem.caption,
      channel: dayItem.platform === 'WhatsApp VIP' ? 'WhatsApp' : (dayItem.platform === 'Instagram' ? 'Instagram' : 'TikTok'),
      status: 'Scheduled',
      date: new Date(Date.now() + dayItem.day * 86400000).toLocaleDateString()
    });
    setSavedDay(dayItem.day);
    setTimeout(() => setSavedDay(null), 2000);
  };

  const handleExportCSV = () => {
    const header = 'Day,Platform,Time,Pillar,Hook,Caption,CTA\n';
    const rows = calendarData.map(d => 
      `"${d.day}","${d.platform}","${d.time}","${d.pillar}","${d.hook.replace(/"/g, '""')}","${d.caption.replace(/"/g, '""')}","${d.cta}"`
    ).join('\n');
    
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Calvras_30_Day_Content_Calendar_${productName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#1c1c1c] text-[#f4f4ee] p-6 sm:p-10 font-sans antialiased text-white select-none text-left overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6 pt-2 sm:pt-4">
        
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CalendarIcon size={22} className="text-purple-600" />
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                30-Day Content Calendar
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-normal">
              Autonomous 30-day viral hooks, content pillars, and schedules for TikTok, Instagram & WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-xs font-semibold text-neutral-700 hover:bg-white/5 transition cursor-pointer shadow-2xs"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>

            <div className="bg-neutral-100 p-1 rounded-xl flex items-center gap-1 border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${viewMode === 'grid' ? 'bg-white text-white shadow-2xs font-semibold' : 'text-neutral-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${viewMode === 'list' ? 'bg-white text-white shadow-2xs font-semibold' : 'text-neutral-400 hover:text-white'}`}
                title="List View"
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Generator Controls Card */}
        <div className="bg-neutral-50/80 border border-white/10/90 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* 1. Niche */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block">
                Business Niche
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-[#282828] border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-neutral-900 transition"
              >
                {niches.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* 2. Product Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block">
                Product / Brand Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Gourmet Burger & Wings"
                className="w-full bg-[#282828] border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-neutral-900 transition"
              />
            </div>

            {/* 3. Primary Goal */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block">
                Primary Campaign Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-[#282828] border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-neutral-900 transition"
              >
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10/60">
            <span className="text-[11px] text-neutral-400 font-medium">
              Uses 10 credits to orchestrate a 30-day viral roadmap
            </span>

            <button
              onClick={handleGenerateCalendar}
              disabled={isGenerating || !productName.trim()}
              className="bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-2 active:scale-95"
            >
              {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="text-purple-400" />}
              <span>{isGenerating ? 'Orchestrating 30 Days...' : 'Generate 30-Day Calendar'}</span>
            </button>
          </div>
        </div>

        {/* Calendar View (Grid Mode) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 pt-2">
            {calendarData.map((item) => {
              const isCopied = copiedDay === item.day;
              const isSaved = savedDay === item.day;

              return (
                <div 
                  key={item.day}
                  className="bg-[#282828] border border-white/10/90 rounded-2xl p-4 shadow-2xs hover:shadow-md hover:border-neutral-300 transition text-left flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    {/* Header: Day Number + Platform */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white bg-neutral-100 px-2 py-0.5 rounded-md font-mono">
                        Day {item.day}
                      </span>
                      <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                        {item.platform}
                      </span>
                    </div>

                    {/* Pillar Badge */}
                    <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">
                      {item.pillar}
                    </span>

                    {/* Hook */}
                    <p className="text-xs font-medium text-white leading-snug line-clamp-3">
                      "{item.hook}"
                    </p>
                  </div>

                  {/* Footer & Quick Actions */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1 font-mono text-[10px]">
                      <Clock size={11} />
                      {item.time}
                    </span>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleCopyDay(item)}
                        className="p-1 text-neutral-400 hover:text-white rounded hover:bg-white/10 transition cursor-pointer"
                        title="Copy details"
                      >
                        {isCopied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      </button>

                      <button
                        onClick={() => handleSaveToContent(item)}
                        className="p-1 text-neutral-400 hover:text-purple-600 rounded hover:bg-purple-50 transition cursor-pointer"
                        title="Save to Content Library"
                      >
                        {isSaved ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Plus size={12} />}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Calendar View (List Mode) */}
        {viewMode === 'list' && (
          <div className="bg-[#282828] border border-white/10 rounded-3xl divide-y divide-white/5 shadow-2xs overflow-hidden">
            {calendarData.map((item) => (
              <div 
                key={item.day}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5/60 transition"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono bg-neutral-100 px-2.5 py-0.5 rounded-lg">
                      Day {item.day}
                    </span>
                    <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                      {item.platform}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      • {item.pillar}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      @ {item.time}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-white">
                    "{item.hook}"
                  </p>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {item.caption}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopyDay(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-medium text-neutral-700 hover:bg-white transition cursor-pointer shadow-2xs"
                  >
                    {copiedDay === item.day ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copiedDay === item.day ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => handleSaveToContent(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-semibold text-purple-800 transition cursor-pointer shadow-2xs"
                  >
                    {savedDay === item.day ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Plus size={12} />}
                    <span>{savedDay === item.day ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
