import React from 'react';

export const DashboardIntegrations = () => {
  const integrations = [
    { name: 'WhatsApp Business API', desc: 'Direct broadcast messaging & automated orders', connected: true, icon: '💬' },
    { name: 'Instagram Graph API', desc: 'Publish reels, stories & carousel posts', connected: true, icon: '📸' },
    { name: 'TikTok for Business', desc: 'Auto-publish short videos & track spark ads', connected: true, icon: '🎵' },
    { name: 'Shopify Store', desc: 'Sync products, stock count, and order receipts', connected: true, icon: '🛍️' },
    { name: 'Meta Facebook Ads', desc: 'Manage dynamic product ad budgets', connected: false, icon: '📘' },
    { name: 'MTN Mobile Money & Paystack', desc: 'Automated checkout links inside messages', connected: false, icon: '💳' }
  ];
  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-950 tracking-tight">Connected Channels</h1>
        <p className="text-sm text-neutral-500 font-normal mt-0.5">Integrate your active sales and social channels for automated publishing.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.icon}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  item.connected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-neutral-100 text-neutral-500'
                }`}>{item.connected ? 'Connected' : 'Available'}</span>
              </div>
              <h3 className="text-xs font-bold text-neutral-900 mt-2">{item.name}</h3>
              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
            <button className="mt-4 w-full py-2 text-xs font-semibold rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-800 transition">
              {item.connected ? 'Manage Settings' : 'Connect Channel'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
