import React, { useState } from 'react';
import { Plus, Sparkles, Loader2, Trash2, Inbox } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketing } from '../../context/MarketingContext';
import { generateAICampaign } from '../../services/aiService';

export const DashboardCampaigns = ({ onOpenNewCampaign }) => {
  const [activeFilter, setActiveFilter] = useState('All Campaigns');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { businessProfile, campaigns, addCampaign, deleteCampaign } = useMarketing();

  const filterTabs = [
    { label: 'All Campaigns', count: campaigns.length },
    { label: 'Active', count: campaigns.filter(c => c.status === 'Active').length },
    { label: 'Scheduled', count: campaigns.filter(c => c.status === 'Scheduled').length },
    { label: 'Drafts', count: campaigns.filter(c => c.status === 'Draft').length }
  ];

  const handleGenerateCampaign = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const result = await generateAICampaign({
        goal: aiPrompt,
        headline: aiPrompt,
        channels: ['Instagram', 'WhatsApp', 'TikTok'],
        discountOffer: businessProfile.currentOffers || 'Special Promotion',
        budget: 'GHS 250',
        audience: businessProfile.targetCustomers || 'Target Customers in Ghana',
        businessProfile: businessProfile
      });

      const newCampaign = {
        id: Date.now(),
        title: aiPrompt.length > 32 ? aiPrompt.slice(0, 32) + '...' : aiPrompt,
        badge: 'AI ACTIVE',
        status: 'Active',
        statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        description: result.instagramCopy.slice(0, 110) + '...',
        channels: ['Instagram', 'WhatsApp', 'TikTok'],
        reach: '18.4K',
        reachNum: 18400,
        reachGrowth: '+46%',
        eng: '3.8K',
        engNum: 3800,
        engGrowth: '+48%',
        conv: '432',
        convNum: 432,
        convGrowth: '+41%',
        salesGhs: 9500,
        date: 'Active Now',
        imgUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80',
        imgLabel: aiPrompt
      };

      addCampaign(newCampaign);
      setAiPrompt('');
      try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch (err) {}
      alert('AI formulated and launched your campaign successfully!');
    } catch (err) {
      console.warn('AI creation fallback:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredList = campaigns.filter(c => {
    if (activeFilter === 'All Campaigns') return true;
    if (activeFilter === 'Active') return c.status === 'Active';
    if (activeFilter === 'Scheduled') return c.status === 'Scheduled';
    if (activeFilter === 'Drafts') return c.status === 'Draft';
    return true;
  });

  return (
    <div className="space-y-7 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-950 tracking-tight">Campaigns</h1>
          <p className="text-sm text-neutral-500 font-normal mt-0.5">
            Manage your marketing campaigns. Powered by OpenRouter AI.
          </p>
        </div>
        <button onClick={onOpenNewCampaign} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer">
          <Plus size={15} /><span>New Campaign Studio</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveFilter(tab.label)}
            className={`text-xs px-4 py-2 rounded-xl font-medium transition cursor-pointer whitespace-nowrap ${
              activeFilter === tab.label 
                ? 'bg-purple-600 text-white font-bold shadow-xs' 
                : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`ml-1.5 text-[11px] ${activeFilter === tab.label ? 'text-purple-200' : 'text-neutral-400'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          {filteredList.length > 0 ? (
            filteredList.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-2xs hover:border-purple-200 transition text-left group">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-full sm:w-32 h-32 rounded-2xl relative overflow-hidden shrink-0 bg-neutral-100 border border-neutral-200/60">
                    <img src={campaign.imgUrl} alt={campaign.imgLabel} className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300" />
                    <span className="absolute top-2 left-2 bg-neutral-950/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">{campaign.badge || 'CAMPAIGN'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-neutral-950 truncate">{campaign.title}</h3>
                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${campaign.statusColor || 'bg-purple-50 text-purple-700 border-purple-200'}`}>{campaign.status || 'Active'}</span>
                      </div>
                      <button onClick={() => deleteCampaign(campaign.id)} className="text-neutral-300 hover:text-red-600 p-1 transition cursor-pointer" title="Delete Campaign">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">{campaign.description}</p>
                    <div className="flex items-center gap-2 mt-2.5">
                      {(campaign.channels || []).map((ch, cIdx) => (
                        <span key={cIdx} className="text-[10px] font-semibold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                          {ch}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-neutral-100">
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-normal">Reach</span>
                        <span className="text-xs font-bold text-neutral-900">{campaign.reach}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-normal">Engagement</span>
                        <span className="text-xs font-bold text-neutral-900">{campaign.eng}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-normal">Sales Attributed</span>
                        <span className="text-xs font-bold text-neutral-900">GHS {campaign.salesGhs?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-dashed border-neutral-200 text-center space-y-3">
              <Inbox size={32} className="text-neutral-300 mx-auto" />
              <h3 className="text-sm font-bold text-neutral-800">No campaigns yet</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                You haven't launched any marketing campaigns yet. Click "Open Campaign Studio" to let AI create your first multi-channel rollout.
              </p>
              <button onClick={onOpenNewCampaign} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer inline-flex items-center gap-1.5">
                <Plus size={14} />
                <span>Create First Campaign</span>
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6">
          <button onClick={onOpenNewCampaign} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-[0.99]">
            <Plus size={18} /><span>Open Campaign Studio</span>
          </button>

          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                <Sparkles size={16} />
              </div>
              <h3 className="text-sm font-bold text-neutral-950">Quick AI Campaign Creator</h3>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              Describe your goal and let OpenRouter AI formulate strategy, native copy, and channel schedules.
            </p>
            <form onSubmit={handleGenerateCampaign} className="space-y-3">
              <textarea 
                rows="3" 
                value={aiPrompt} 
                onChange={(e) => setAiPrompt(e.target.value)} 
                placeholder="e.g. Launch a 15% off weekend promo for my new product collection..." 
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-2xl p-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-purple-600 focus:bg-white transition resize-none" 
              />
              <button 
                type="submit" 
                disabled={isGenerating || !aiPrompt.trim()} 
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                <span>{isGenerating ? 'OpenRouter formulating...' : 'Generate & Launch Campaign'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
