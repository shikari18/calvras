import React, { useState } from 'react';
import { Save, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketing } from '../../context/MarketingContext';

export const DashboardBrandVoice = () => {
  const { businessProfile, updateBusinessProfile } = useMarketing();
  const [formData, setFormData] = useState({ ...businessProfile });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateBusinessProfile(formData);
    setSaved(true);
    try { confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } }); } catch (e) {}
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-950 tracking-tight">Business & Brand Profile</h1>
          <p className="text-sm text-neutral-500 font-normal mt-0.5">
            Persistent memory that grounds all OpenRouter AI strategy and content generation in your real business context.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
          <Sparkles size={13} />
          <span>Persistent Memory Active</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-7 border border-neutral-200/80 shadow-2xs space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-neutral-800 block mb-1">Business Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-2xl p-3 font-semibold text-neutral-950 focus:bg-white focus:border-purple-600 focus:outline-none transition" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-800 block mb-1">Industry & Category</label>
            <input 
              type="text" 
              value={formData.industry} 
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })} 
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-2xl p-3 font-medium text-neutral-900 focus:bg-white focus:border-purple-600 focus:outline-none transition" 
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-neutral-800 block mb-1">Location & Dispatch Area</label>
            <input 
              type="text" 
              value={formData.location} 
              onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-2xl p-3 font-medium text-neutral-900 focus:bg-white focus:border-purple-600 focus:outline-none transition" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-800 block mb-1">Pricing Range & AOV</label>
            <input 
              type="text" 
              value={formData.prices} 
              onChange={(e) => setFormData({ ...formData, prices: e.target.value })} 
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-2xl p-3 font-medium text-neutral-900 focus:bg-white focus:border-purple-600 focus:outline-none transition" 
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-800 block mb-1">Core Products & Stock</label>
          <input 
            type="text" 
            value={formData.products} 
            onChange={(e) => setFormData({ ...formData, products: e.target.value })} 
            className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-2xl p-3 font-medium text-neutral-900 focus:bg-white focus:border-purple-600 focus:outline-none transition" 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-800 block mb-1">Target Customer Segments</label>
          <input 
            type="text" 
            value={formData.targetCustomers} 
            onChange={(e) => setFormData({ ...formData, targetCustomers: e.target.value })} 
            className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-2xl p-3 font-medium text-neutral-900 focus:bg-white focus:border-purple-600 focus:outline-none transition" 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-800 block mb-1">Brand Voice & Tone Guidelines</label>
          <textarea 
            rows="2" 
            value={formData.brandVoice} 
            onChange={(e) => setFormData({ ...formData, brandVoice: e.target.value })} 
            className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-2xl p-3 font-medium text-neutral-900 focus:bg-white focus:border-purple-600 focus:outline-none transition resize-none" 
          />
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
          <span className="text-xs text-neutral-400">Updates sync instantly with all AI prompts.</span>
          <button 
            type="submit" 
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-7 py-3 rounded-2xl transition flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
          >
            {saved ? <Check size={14} className="text-emerald-300" /> : <Save size={14} />}
            <span>{saved ? 'Saved to Brand Memory!' : 'Save Brand Memory'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
