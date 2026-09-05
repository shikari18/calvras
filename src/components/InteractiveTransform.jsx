import React, { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { chatWithMarketingCopilot, DEFAULT_BUSINESS_PROFILE } from '../services/aiService';

const PRESETS = [
  { 
    prompt: 'Launch a weekend campaign for our new sneakers.', 
    strategy: 'High-impact weekend push with urgency and exclusivity for retro high-tops.', 
    content: 'Instagram Reel, WhatsApp VIP broadcast, and TikTok shorts.', 
    audience: 'Sneaker enthusiasts & active shoppers 18–34.', 
    schedule: 'Launches Friday 6:00 PM. Runs through Sunday midnight.' 
  },
  { 
    prompt: 'Promote our Summer Flash Sale with 20% off all stock.', 
    strategy: 'Limited-time seasonal impulse buy campaign with countdown timers.', 
    content: 'Hero email blast, Instagram carousel, WhatsApp direct blast.', 
    audience: 'Active streetwear fans & digital consumers.', 
    schedule: 'Starts Thursday morning. Concludes Sunday midnight.' 
  },
  { 
    prompt: 'Re-engage cart abandoners with a personalized WhatsApp incentive.', 
    strategy: 'Dynamic 3-step retargeting sequence with automated MoMo payment link.', 
    content: 'Automated WhatsApp alerts, discount voucher, social proof photo.', 
    audience: 'High-intent shoppers who inquired in the last 48 hours.', 
    schedule: 'Triggered 2h, 12h, and 24h after inquiry.' 
  }
];

export const InteractiveTransform = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [customInput, setCustomInput] = useState(PRESETS[0].prompt);
  const [activeData, setActiveData] = useState(PRESETS[0]);
  const [isTransforming, setIsTransforming] = useState(false);

  const handleSelectPreset = (index) => {
    setSelectedIndex(index);
    setCustomInput(PRESETS[index].prompt);
    setActiveData(PRESETS[index]);
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!customInput.trim() || isTransforming) return;
    setIsTransforming(true);

    try {
      const response = await chatWithMarketingCopilot({
        userMessage: `Break down this marketing request into:
Strategy: [1-sentence strategy]
Content: [1-sentence list of assets to create]
Audience: [1-sentence target customer]
Schedule: [1-sentence schedule]

Request: ${customInput}`,
        businessProfile: DEFAULT_BUSINESS_PROFILE
      });

      // Parse output
      const extractField = (label, fallback) => {
        const match = response.match(new RegExp(`${label}:?\\s*([^\n]+)`, 'i'));
        return match ? match[1].trim() : fallback;
      };

      setActiveData({
        prompt: customInput,
        strategy: extractField('Strategy', 'Custom high-conversion marketing strategy for ' + customInput),
        content: extractField('Content', 'Instagram Reel, WhatsApp broadcast, and TikTok shorts'),
        audience: extractField('Audience', '18–34 high-intent online consumers'),
        schedule: extractField('Schedule', '3-day targeted campaign duration')
      });
      setSelectedIndex(-1);
    } catch (err) {
      console.warn('Fallback transform:', err);
      setActiveData({
        prompt: customInput,
        strategy: 'High-impact conversion strategy for ' + customInput,
        content: 'Multi-channel social reels, WhatsApp direct message, and ad hooks',
        audience: 'Targeted high-intent customer segment',
        schedule: 'Phased 3-day promotional cadence'
      });
    } finally {
      setIsTransforming(false);
    }
  };

  return (
    <section id="how-it-works" className="py-24 md:py-32 border-t border-neutral-100 bg-[#fafafc] text-neutral-950">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-[38px] sm:text-[48px] lg:text-[56px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.08] mb-12">
          Marketing,<br />without the busywork.
        </h2>
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleCustomSubmit} className="relative group">
            <div className="relative flex items-center bg-white rounded-full border border-neutral-200/80 shadow-sm hover:border-purple-300 focus-within:border-purple-600 focus-within:ring-4 focus-within:ring-purple-50 transition-all p-2 pl-6">
              <input 
                type="text" 
                value={customInput} 
                onChange={(e) => setCustomInput(e.target.value)} 
                placeholder="Ask the AI to create any marketing campaign..." 
                className="w-full text-sm sm:text-base font-medium text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none pr-4" 
              />
              <button 
                type="submit" 
                disabled={isTransforming}
                className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer" 
                title="Generate Campaign"
              >
                {isTransforming ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} className="ml-0.5" />}
              </button>
            </div>
          </form>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs text-neutral-500 mr-1 font-medium">Try example:</span>
            {PRESETS.map((p, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSelectPreset(idx)} 
                className={`text-xs px-3.5 py-1 rounded-full border transition-all cursor-pointer ${
                  selectedIndex === idx 
                    ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold shadow-2xs' 
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                }`}
              >
                {idx === 0 ? 'Sneaker Weekend' : idx === 1 ? 'Summer Flash Sale' : 'Cart Recovery'}
              </button>
            ))}
          </div>
        </div>

        <div className={`max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl border border-neutral-200/80 shadow-2xs p-6 md:p-8 transition-all duration-300 ${
          isTransforming ? 'opacity-50 scale-[0.99]' : 'opacity-100 scale-100'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-neutral-100 text-left">
            <div className="lg:px-6 first:pl-0">
              <span className="text-xs font-bold text-neutral-950 block mb-1.5">Campaign strategy</span>
              <p className="text-[13px] text-neutral-500 font-normal leading-relaxed">{activeData.strategy}</p>
            </div>
            <div className="lg:px-6">
              <span className="text-xs font-bold text-neutral-950 block mb-1.5">Content</span>
              <p className="text-[13px] text-neutral-500 font-normal leading-relaxed">{activeData.content}</p>
            </div>
            <div className="lg:px-6">
              <span className="text-xs font-bold text-neutral-950 block mb-1.5">Audience</span>
              <p className="text-[13px] text-neutral-500 font-normal leading-relaxed">{activeData.audience}</p>
            </div>
            <div className="lg:px-6 last:pr-0">
              <span className="text-xs font-bold text-neutral-950 block mb-1.5">Schedule</span>
              <p className="text-[13px] text-neutral-500 font-normal leading-relaxed">{activeData.schedule}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
