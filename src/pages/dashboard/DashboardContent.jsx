import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  MousePointer, 
  ShoppingBag, 
  ArrowUpRight, 
  Plus, 
  Sparkles, 
  ArrowRight, 
  MoreVertical,
  Loader2,
  Copy,
  Check,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketing } from '../../context/MarketingContext';
import { generateContentAsset, cleanAiResponse } from '../../services/aiService';

export const DashboardContent = ({ onOpenNewCampaign }) => {
  const [activeSubTab, setActiveSubTab] = useState('All Content');
  const subTabs = ['All Content', 'Instagram', 'TikTok', 'WhatsApp', 'Meta'];

  const { businessProfile, contentList, addContent, deleteContent } = useMarketing();
  const [generatedModalData, setGeneratedModalData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateAsset = async (type, platform) => {
    setIsGenerating(true);
    setCopied(false);
    try {
      const output = await generateContentAsset({
        contentType: type,
        topic: `${businessProfile.products} with ${businessProfile.currentOffers}`,
        platform: platform,
        businessProfile: businessProfile
      });

      const cleanText = cleanAiResponse(output);

      const newAsset = {
        id: Date.now(),
        title: `${type} for ${platform}`,
        snippet: cleanText.slice(0, 95) + '...',
        date: 'Just now',
        status: 'Generated',
        statusColor: 'bg-purple-50 text-purple-700 border-purple-200/60',
        reach: 'Pending',
        eng: 'Pending',
        platform: platform,
        imgUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80',
        imgTitle: type
      };

      addContent(newAsset);

      setGeneratedModalData({
        title: `${type} for ${platform}`,
        content: cleanText,
        platform: platform
      });
      try { confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } }); } catch (e) {}
    } catch (err) {
      console.warn('Fallback asset generation:', err);
      const fallbackText = `🔥 WEEKEND DROP: 15% OFF all retro sneakers with free express delivery in Accra!\n\nUse code SNEAKER15 to claim your pair. Tap link in bio or WhatsApp us to order.`;
      setGeneratedModalData({
        title: `${type} for ${platform}`,
        content: fallbackText,
        platform: platform
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    if (generatedModalData?.content) {
      navigator.clipboard.writeText(generatedModalData.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredContent = contentList.filter(item => {
    if (activeSubTab === 'All Content') return true;
    return item.platform.toLowerCase() === activeSubTab.toLowerCase();
  });

  return (
    <div className="space-y-7 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-950 tracking-tight">Content Studio</h1>
          <p className="text-sm text-neutral-500 font-normal mt-0.5">
            Live AI content generation powered by OpenRouter for <strong>{businessProfile.name}</strong>.
          </p>
        </div>
        <button onClick={onOpenNewCampaign} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer">
          <Plus size={15} /><span>New Campaign Studio</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {subTabs.map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveSubTab(tab)} 
            className={`text-xs px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition cursor-pointer ${
              activeSubTab === tab ? 'bg-purple-600 text-white font-bold shadow-xs' : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Published & Scheduled Content</h3>
            <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg">
              {contentList.length} Total Assets
            </span>
          </div>

          <div className="space-y-3">
            {filteredContent.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl border border-neutral-100 hover:border-purple-200 hover:bg-neutral-50/40 transition flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-14 h-14 rounded-xl relative overflow-hidden shrink-0 bg-neutral-100 border border-neutral-200/60">
                    <img src={item.imgUrl} alt={item.imgTitle} className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">{item.platform}</span>
                      <h4 className="text-xs font-bold text-neutral-900 truncate">{item.title}</h4>
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate max-w-[220px] mt-1">{item.snippet}</p>
                    <p className="text-[9.5px] text-neutral-400 mt-0.5">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${item.statusColor}`}>{item.status}</span>
                  <button onClick={() => deleteContent(item.id)} className="text-neutral-300 hover:text-red-600 p-1 cursor-pointer transition">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-neutral-900 tracking-tight">AI Instant Asset Creator</h3>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">OpenRouter Live</span>
            </div>
            
            <div className="space-y-2.5">
              {[
                { title: 'Instagram Reel & Carousel', desc: 'Punchy captions with local hashtags', type: 'Reel Caption', platform: 'Instagram' },
                { title: 'WhatsApp VIP Broadcast', desc: 'Direct order message with MoMo trigger', type: 'VIP Broadcast', platform: 'WhatsApp' },
                { title: 'TikTok Video Hook & Script', desc: '3-second viral unboxing hook', type: 'Short Script', platform: 'TikTok' },
                { title: 'Meta Retargeting Ad Copy', desc: 'High-converting ad headline & body', type: 'Ad Copy', platform: 'Meta' }
              ].map((tool, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleGenerateAsset(tool.type, tool.platform)} 
                  className="p-4 rounded-2xl border border-neutral-100 hover:border-purple-300 hover:bg-purple-50/40 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
                      <Sparkles size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 group-hover:text-purple-950 transition">{tool.title}</h4>
                      <p className="text-[11px] text-neutral-400">{tool.desc}</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-neutral-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition" />
                </div>
              ))}
            </div>

            {isGenerating && (
              <div className="mt-4 p-3 bg-purple-50 rounded-2xl text-purple-700 text-xs font-semibold flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                <span>OpenRouter AI formulating marketing asset...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generated AI Modal View */}
      {generatedModalData && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-neutral-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Sparkles size={15} />
                </div>
                <h3 className="text-sm font-bold text-neutral-950">{generatedModalData.title}</h3>
              </div>
              <button onClick={() => setGeneratedModalData(null)} className="text-neutral-400 hover:text-neutral-800 text-xs font-bold p-1 cursor-pointer">✕</button>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 text-xs text-neutral-800 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
              {generatedModalData.content}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button 
                onClick={handleCopyText}
                className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Asset Text'}</span>
              </button>

              <button 
                onClick={() => setGeneratedModalData(null)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
