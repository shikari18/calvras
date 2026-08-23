import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Check,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Camera,
  MoreHorizontal,
  Flame,
  Zap,
  TrendingUp,
  Tag,
  Clock,
  ShieldCheck,
  Layers,
  Edit3,
  Play,
  Calendar,
  CheckCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const NewCampaignModal = ({ isOpen, onClose, onCampaignCreated }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Objective, 2: Channels, 3: Offer/Budget, 4: AI Review & Approve
  
  // State
  const [goal, setGoal] = useState('Flash Promo & Sales');
  const [goalDescription, setGoalDescription] = useState('Boost revenue with a limited-time weekend discount on sneakers.');
  
  const [selectedChannels, setSelectedChannels] = useState(['Instagram', 'WhatsApp', 'TikTok']);
  
  const [discountOffer, setDiscountOffer] = useState('15% OFF with code SNEAKER15');
  const [freeDelivery, setFreeDelivery] = useState(true);
  const [budget, setBudget] = useState('GHS 250');
  const [schedule, setSchedule] = useState('Friday 6:00 PM – Sunday Midnight');
  const [audience, setAudience] = useState('18–34 Urban Sneakerheads in Accra');

  // Generated Assets
  const [instagramCopy, setInstagramCopy] = useState(
    '🔥 STEP INTO THE WEEKEND WITH HEAT. 15% OFF ALL RETRO HIGHS.\n\nLimited pairs in stock. Use code SNEAKER15 at checkout or tap link in bio to order via WhatsApp with free express delivery in Accra 🚚🇬🇭\n\n#SneakerPlugAccra #AirJordan1 #AccraSneakers #GhanaStreetwear'
  );
  const [whatsappCopy, setWhatsappCopy] = useState(
    '👟 Hey [Customer Name]! Quick heads up from SneakerPlug Accra 🔥\n\nOur Weekend Flash Promo is live: Get 15% OFF all high-tops with FREE delivery anywhere in Accra. 🚚\n\nReply "ORDER" with your shoe size to reserve your pair before sizes run out!'
  );
  const [tiktokHook, setTiktokHook] = useState(
    'Stop wearing boring kicks. Upgrade your rotation with 100% authentic Air Jordans — 15% off this weekend only.'
  );

  const [activeAssetTab, setActiveAssetTab] = useState('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApproved, setIsApproved] = useState(true);

  if (!isOpen) return null;

  const toggleChannel = (ch) => {
    if (selectedChannels.includes(ch)) {
      if (selectedChannels.length > 1) {
        setSelectedChannels(selectedChannels.filter(c => c !== ch));
      }
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleNextToStep4 = () => {
    setIsGenerating(true);
    setCurrentStep(4);
    setTimeout(() => {
      setIsGenerating(false);
      setInstagramCopy(
        `🔥 ${goal.toUpperCase()} IS OFFICIALLY LIVE!\n\nGet ${discountOffer} on all premium kicks.${freeDelivery ? ' Free express delivery in Accra 🚚🇬🇭' : ''}\n\nTap link in bio to claim your pair or WhatsApp us now.\n\n#SneakerPlugAccra #AirJordan1 #StreetwearGhana #AccraKicks`
      );
      setWhatsappCopy(
        `👟 Hey [Customer Name]! Quick heads up from SneakerPlug Accra 🔥\n\nOur ${goal} is now active: ${discountOffer}.${freeDelivery ? ' Plus FREE express delivery anywhere in Accra 🚚' : ''}\n\nReply with your shoe size or tap below to lock in your pair!`
      );
    }, 900);
  };

  const handleFinalLaunch = () => {
    if (!isApproved) {
      alert('Please check the approval box before launching.');
      return;
    }
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    if (onCampaignCreated) {
      onCampaignCreated({
        id: Date.now(),
        title: goal,
        badge: 'LIVE NOW',
        status: 'Active',
        statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        description: instagramCopy.slice(0, 100) + '...',
        channels: selectedChannels,
        reach: '14.8K',
        reachGrowth: '+42%',
        eng: '3.4K',
        engGrowth: '+46%',
        conv: '412',
        convGrowth: '+38%',
        date: schedule,
        imgUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80',
        imgLabel: 'Air Jordan 1 High Retro'
      });
    }

    alert('Campaign approved and scheduled across all selected channels!');
    onClose();
    setCurrentStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-md flex items-end justify-center transition-all duration-300 select-none">
      
      {/* Apple Setup Assistant Modal Covering ~88% of Screen */}
      <div className="w-full max-w-5xl bg-white rounded-t-[36px] shadow-2xl h-[88vh] flex flex-col overflow-hidden border-t border-neutral-200/80 animate-in slide-in-from-bottom duration-300 text-left text-neutral-900 font-sans">
        
        {/* Minimal Header & Progress Indicator */}
        <div className="px-6 sm:px-10 py-4 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
              Step {currentStep} of 4
            </span>
          </div>

          {/* Clean Segmented Progress Bar */}
          <div className="flex items-center gap-1.5 w-40 sm:w-64">
            <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${currentStep >= 1 ? 'bg-purple-600' : 'bg-neutral-200'}`} />
            <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-neutral-200'}`} />
            <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${currentStep >= 3 ? 'bg-purple-600' : 'bg-neutral-200'}`} />
            <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${currentStep >= 4 ? 'bg-purple-600' : 'bg-neutral-200'}`} />
          </div>

          <button 
            onClick={onClose} 
            className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Focused Single Question Canvas Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex flex-col justify-between max-w-3xl mx-auto w-full">
          
          {/* ============================================================ */}
          {/* QUESTION 1: PRIMARY OBJECTIVE */}
          {/* ============================================================ */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300 my-auto">
              <div className="space-y-3 text-center sm:text-left">
                <span className="text-xs font-bold tracking-[0.16em] uppercase text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  STEP 1 • CAMPAIGN GOAL
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-[-0.03em] leading-tight">
                  What is the main goal of this campaign?
                </h1>
                <p className="text-base text-neutral-500 font-normal">
                  Select the primary commercial objective you want AI to optimize for.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: 'Flash Promo & Sales', icon: '🛍️', label: 'Flash Promo & Sales', desc: 'Drive high-urgency weekend sneaker sales with discount code.' },
                  { id: 'New Collection Drop', icon: '👟', label: 'New Collection Drop', desc: 'Build anticipation and launch newly stocked kicks.' },
                  { id: 'VIP Exclusive Access', icon: '⭐', label: 'VIP Exclusive Access', desc: 'Reward repeat buyers on WhatsApp before public release.' },
                  { id: 'Campus Student Drive', icon: '🎓', label: 'Campus Student Drive', desc: 'Target university students in Legon & UPSA with special pricing.' }
                ].map((item) => {
                  const isSelected = goal === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => { setGoal(item.id); setGoalDescription(item.desc); }}
                      className={`p-5 rounded-3xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                        isSelected 
                          ? 'bg-purple-50/70 border-purple-500 shadow-sm ring-2 ring-purple-100' 
                          : 'bg-[#fafafc] border-neutral-200/80 hover:bg-neutral-50 hover:border-neutral-300'
                      }`}
                    >
                      <span className="text-2xl mt-0.5">{item.icon}</span>
                      <div className="space-y-1">
                        <span className="text-sm font-bold text-neutral-950 block">{item.label}</span>
                        <p className="text-xs text-neutral-500 font-normal leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* QUESTION 2: PUBLISHING CHANNELS */}
          {/* ============================================================ */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in duration-300 my-auto">
              <div className="space-y-3 text-center sm:text-left">
                <span className="text-xs font-bold tracking-[0.16em] uppercase text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  STEP 2 • CHANNELS
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-[-0.03em] leading-tight">
                  Where should we publish your campaign?
                </h1>
                <p className="text-base text-neutral-500 font-normal">
                  Select all active platforms. AI will automatically format assets for each.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: 'Instagram', icon: '📸', label: 'Instagram', desc: 'Reels, Carousel Post & Stories' },
                  { id: 'WhatsApp', icon: '💬', label: 'WhatsApp Business', desc: 'Direct broadcast to 1,240 contacts' },
                  { id: 'TikTok', icon: '🎵', label: 'TikTok Video Shorts', desc: 'Viral sound script & ad boost' },
                  { id: 'Facebook', icon: '📘', label: 'Facebook & Meta Ads', desc: 'Dynamic catalog feed retargeting' }
                ].map((item) => {
                  const isSelected = selectedChannels.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChannel(item.id)}
                      className={`p-5 rounded-3xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'bg-purple-50/70 border-purple-500 shadow-sm ring-2 ring-purple-100' 
                          : 'bg-[#fafafc] border-neutral-200/80 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <span className="text-sm font-bold text-neutral-950 block">{item.label}</span>
                          <span className="text-xs text-neutral-500">{item.desc}</span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-purple-600 text-white' : 'border border-neutral-300'
                      }`}>
                        {isSelected && '✓'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* QUESTION 3: INCENTIVE & BUDGET */}
          {/* ============================================================ */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in duration-300 my-auto">
              <div className="space-y-3 text-center sm:text-left">
                <span className="text-xs font-bold tracking-[0.16em] uppercase text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  STEP 3 • OFFER & BUDGET
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-[-0.03em] leading-tight">
                  What incentive and budget are we setting?
                </h1>
                <p className="text-base text-neutral-500 font-normal">
                  Configure your customer offer code and target ad spend.
                </p>
              </div>

              <div className="bg-[#fafafc] rounded-3xl p-6 sm:p-7 border border-neutral-200/80 space-y-6">
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-2">Discount Code & Offer Text</label>
                  <input 
                    type="text" 
                    value={discountOffer}
                    onChange={(e) => setDiscountOffer(e.target.value)}
                    placeholder="e.g. 15% OFF with code SNEAKER15"
                    className="w-full text-sm font-semibold bg-white border border-neutral-200 rounded-2xl p-3.5 text-neutral-900 focus:outline-none focus:border-purple-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-2">Ad Budget Allocation</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['GHS 150', 'GHS 250', 'GHS 500'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`text-xs py-3 rounded-2xl font-bold border transition cursor-pointer ${
                          budget === b 
                            ? 'bg-purple-600 text-white border-purple-600 shadow-2xs' 
                            : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={freeDelivery}
                      onChange={(e) => setFreeDelivery(e.target.checked)}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-neutral-800">
                      Include Free Express Delivery in Accra
                    </span>
                  </label>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    +35% Conversion
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 4: REVIEW & APPROVE */}
          {/* ============================================================ */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300 my-auto">
              
              {isGenerating ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto animate-pulse">
                    <Sparkles size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-950">Synthesizing Strategy & Assets...</h2>
                  <p className="text-xs text-neutral-500">Formulating WhatsApp broadcast & Instagram Reel captions.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-xs font-bold tracking-[0.16em] uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      STEP 4 • READY FOR LAUNCH
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                      Review & Approve Campaign Assets
                    </h1>
                    <p className="text-xs text-neutral-500 font-normal">
                      Inspect generated copy for each channel before publishing.
                    </p>
                  </div>

                  {/* Channel Tab Switcher */}
                  <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-2xl border border-neutral-200/60 w-fit">
                    {[
                      { id: 'instagram', label: '📸 Instagram Reel' },
                      { id: 'whatsapp', label: '💬 WhatsApp Broadcast' },
                      { id: 'tiktok', label: '🎵 TikTok Script' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveAssetTab(tab.id)}
                        className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                          activeAssetTab === tab.id 
                            ? 'bg-white text-purple-700 shadow-xs border border-neutral-200/80' 
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Editable Preview Box */}
                  <div className="bg-[#fafafc] rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-3">
                    {activeAssetTab === 'instagram' && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-neutral-800 block">Instagram Caption & Hashtags</span>
                        <textarea 
                          rows="4" 
                          value={instagramCopy}
                          onChange={(e) => setInstagramCopy(e.target.value)}
                          className="w-full text-xs font-medium bg-white border border-neutral-200 rounded-2xl p-3.5 text-neutral-900 focus:outline-none focus:border-purple-600 leading-relaxed shadow-2xs"
                        />
                      </div>
                    )}

                    {activeAssetTab === 'whatsapp' && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-neutral-800 block">WhatsApp Broadcast (1,240 Contacts)</span>
                        <textarea 
                          rows="4" 
                          value={whatsappCopy}
                          onChange={(e) => setWhatsappCopy(e.target.value)}
                          className="w-full text-xs font-medium bg-white border border-neutral-200 rounded-2xl p-3.5 text-neutral-900 focus:outline-none focus:border-purple-600 leading-relaxed shadow-2xs"
                        />
                      </div>
                    )}

                    {activeAssetTab === 'tiktok' && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-neutral-800 block">TikTok Video Hook</span>
                        <input 
                          type="text" 
                          value={tiktokHook}
                          onChange={(e) => setTiktokHook(e.target.value)}
                          className="w-full text-xs font-medium bg-white border border-neutral-200 rounded-2xl p-3 text-neutral-900 focus:outline-none focus:border-purple-600 shadow-2xs"
                        />
                      </div>
                    )}
                  </div>

                  {/* Approval Checkbox */}
                  <label className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl border border-purple-200 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={isApproved}
                      onChange={(e) => setIsApproved(e.target.checked)}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-purple-950">
                      I approve these campaign assets. Publish & schedule automated campaign across channels.
                    </span>
                  </label>
                </div>
              )}

            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-neutral-100 flex items-center justify-between mt-auto">
            {currentStep > 1 ? (
              <button 
                type="button" 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Previous</span>
              </button>
            ) : <div />}

            <div>
              {currentStep < 3 && (
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-7 py-3 rounded-2xl transition flex items-center gap-2 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              )}

              {currentStep === 3 && (
                <button 
                  type="button" 
                  onClick={handleNextToStep4}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-7 py-3 rounded-2xl transition flex items-center gap-2 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Generate Assets with AI</span>
                </button>
              )}

              {currentStep === 4 && !isGenerating && (
                <button 
                  type="button" 
                  onClick={handleFinalLaunch}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-8 py-3.5 rounded-2xl transition flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  <Sparkles size={15} />
                  <span>Approve & Launch Campaign</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
