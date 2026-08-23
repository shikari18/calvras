import React, { useState } from 'react';
import { Sparkles, Building2, Users, Bell, CreditCard, Shield, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DashboardSettings = () => {
  const [activeSubTab, setActiveSubTab] = useState('general');
  const [businessName, setBusinessName] = useState('SneakerPlug Accra');
  const [websiteUrl, setWebsiteUrl] = useState('https://sneakerplugaccra.com');
  const [currency, setCurrency] = useState('GHS (Ghanaian Cedi)');
  const [timezone, setTimezone] = useState('Africa/Accra (GMT+0)');

  const [teamMembers, setTeamMembers] = useState([
    { name: 'Samuel Mensah', email: 'samuel@sneakerplug.com', role: 'Owner / Admin', status: 'Active' },
    { name: 'Kweku Appiah', email: 'kweku@sneakerplug.com', role: 'Content Creator', status: 'Active' },
    { name: 'Abena Osei', email: 'abena@sneakerplug.com', role: 'Store Manager', status: 'Invited' },
  ]);

  const handleSave = () => {
    try { confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } }); } catch (e) {}
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-950 tracking-tight">Settings & Workspace</h1>
        <p className="text-sm text-neutral-500 font-normal mt-0.5">Manage store preferences, team permissions, notification rules, and AI credits.</p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-neutral-200/80">
        {[
          { id: 'general', label: 'General & Workspace', icon: Building2 },
          { id: 'credits', label: 'AI Credits & Usage', icon: Sparkles },
          { id: 'team', label: 'Team & Permissions', icon: Users },
          { id: 'notifications', label: 'Notifications & Alerts', icon: Bell },
          { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
          { id: 'security', label: 'Security', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveSubTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition cursor-pointer whitespace-nowrap ${
              isActive ? 'bg-purple-50 text-purple-700 font-bold border border-purple-100 shadow-2xs' : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
            }`}>
              <Icon size={15} className={isActive ? 'text-purple-600' : 'text-neutral-400'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeSubTab === 'general' && (
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-2xs space-y-6">
          <div className="pb-4 border-b border-neutral-100">
            <h3 className="text-sm font-bold text-neutral-900">Store & Business Details</h3>
            <p className="text-xs text-neutral-400">Configure your primary business identifiers used in AI campaigns.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Store / Business Name</label>
              <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-3 font-medium text-neutral-900 focus:bg-white focus:border-purple-600 transition" />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Website URL</label>
              <input type="text" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-3 font-medium text-neutral-900 focus:bg-white focus:border-purple-600 transition" />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-3 font-medium text-neutral-900 focus:bg-white focus:border-purple-600 transition">
                <option>GHS (Ghanaian Cedi)</option>
                <option>USD ($ US Dollar)</option>
                <option>EUR (€ Euro)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Timezone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-3 font-medium text-neutral-900 focus:bg-white focus:border-purple-600 transition">
                <option>Africa/Accra (GMT+0)</option>
                <option>Africa/Lagos (GMT+1)</option>
                <option>Europe/London (GMT+1)</option>
              </select>
            </div>
          </div>
          <div className="pt-3 border-t border-neutral-100 flex justify-end">
            <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer">
              <Save size={14} /><span>Save Workspace Settings</span>
            </button>
          </div>
        </div>
      )}

      {activeSubTab === 'credits' && (
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">AI Generation Credits</h3>
              <p className="text-xs text-neutral-400">Monthly credit allowance for your store.</p>
            </div>
            <span className="text-2xl font-bold text-purple-700">1,250 Credits Remaining</span>
          </div>
          <div>
            <div className="flex justify-between text-xs text-neutral-500 mb-1.5 font-medium">
              <span>Used: 750 / 2,000 Credits</span>
              <span>Refreshes on June 1, 2025</span>
            </div>
            <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full w-[62.5%]" />
            </div>
          </div>
          <div className="pt-2">
            <h4 className="text-xs font-bold text-neutral-900 mb-3">Unit Credit Cost Breakdown (PDF Specs)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { action: 'Short Text / Caption', cost: '1 credit', desc: 'Social captions & viral hooks' },
                { action: 'Product Descriptions', cost: '2 credits', desc: 'E-commerce copy & WhatsApp alerts' },
                { action: 'Campaign Strategy', cost: '5 credits', desc: 'Full multi-channel persona & timeline' },
                { action: 'Content Batch (6 posts)', cost: '5–10 credits', desc: 'Multi-platform weekly pack' },
                { action: 'AI Performance Analysis', cost: '3–5 credits', desc: 'Deep conversion attribution insights' },
                { action: 'WhatsApp Broadcast Copy', cost: '3 credits', desc: 'High-intent localized sales broadcast' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-neutral-900">{item.action}</span>
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">{item.cost}</span>
                  </div>
                  <p className="text-[10.5px] text-neutral-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
