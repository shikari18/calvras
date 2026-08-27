import React, { useState } from 'react';
import { 
  Code2, 
  Key, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles, 
  Send, 
  ExternalLink, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Layers, 
  Zap, 
  Webhook, 
  Box, 
  Settings, 
  MessageSquare,
  Bot,
  Play,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import confetti from 'canvas-confetti';

export const CyDevelopersPage = ({ userName = 'SHIKARI' }) => {
  const { userProfile } = useMarketing();
  const [activeTab, setActiveTab] = useState('api'); // 'api' | 'widget' | 'webhooks'
  const [selectedLanguage, setSelectedLanguage] = useState('curl'); // 'curl' | 'node' | 'python'
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  
  // API Keys
  const [publicKey] = useState('pk_live_clv_9934a78b0f2214e9c701d');
  const [secretKey, setSecretKey] = useState('sk_live_clv_8841f39e0b1742d8a65c9e248b');

  // Widget customizer states
  const [widgetTheme, setWidgetTheme] = useState('dark');
  const [widgetBrandColor, setWidgetBrandColor] = useState('#8b5cf6');
  const [widgetTitle, setWidgetTitle] = useState('Marketing AI Assistant');
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [widgetMessages, setWidgetMessages] = useState([
    { sender: 'ai', text: 'Hey! Ask me to write ad copy, hooks, or generate campaign ideas for your product.' }
  ]);
  const [widgetInput, setWidgetInput] = useState('');

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRegenerateSecret = () => {
    const newKey = `sk_live_clv_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setSecretKey(newKey);
    try { confetti({ particleCount: 50, spread: 60 }); } catch (e) {}
  };

  const handleWidgetSend = () => {
    if (!widgetInput.trim()) return;
    const userMsg = { sender: 'user', text: widgetInput };
    const aiMsg = { 
      sender: 'ai', 
      text: `🚀 Generated 3 viral hooks for "${widgetInput}":\n1. Stop making this huge mistake with your product!\n2. The secret behind why this sells out every weekend.\n3. POV: You switched to our solution in Accra.` 
    };
    setWidgetMessages(prev => [...prev, userMsg, aiMsg]);
    setWidgetInput('');
  };

  // Code snippets generator
  const codeSnippets = {
    creative: {
      curl: `curl -X POST https://api.calvras.com/v1/generate-creative \\
  -H "Authorization: Bearer ${secretKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product_name": "Ultra-Thin Indoor Antenna",
    "channels": ["instagram", "tiktok", "whatsapp"],
    "target_market": "Ghana",
    "offer": "20% discount with Mobile Money checkout",
    "image_count": 2
  }'`,
      node: `import { CalvrasClient } from '@calvras/sdk';

const calvras = new CalvrasClient({
  apiKey: process.env.CALVRAS_SECRET_KEY // '${secretKey}'
});

const creative = await calvras.creatives.generate({
  productName: 'Ultra-Thin Indoor Antenna',
  channels: ['instagram', 'tiktok', 'whatsapp'],
  targetMarket: 'Ghana',
  offer: '20% discount with Mobile Money checkout',
  imageCount: 2
});

console.log(creative.captions, creative.imageUrls);`,
      python: `import os
from calvras import Calvras

client = Calvras(
    api_key=os.environ.get("CALVRAS_SECRET_KEY") # "${secretKey}"
)

creative = client.creatives.generate(
    product_name="Ultra-Thin Indoor Antenna",
    channels=["instagram", "tiktok", "whatsapp"],
    target_market="Ghana",
    offer="20% discount with Mobile Money checkout",
    image_count=2
)

print(creative.captions, creative.image_urls)`
    },
    campaign: {
      curl: `curl -X POST https://api.calvras.com/v1/campaign \\
  -H "Authorization: Bearer ${secretKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "campaign_name": "Q3 Flash Launch",
    "product": "Space Gray Laptop",
    "budget_daily_ghs": 100,
    "channels": ["meta_ads", "tiktok_ads", "whatsapp_broadcast"],
    "auto_publish": false
  }'`,
      node: `import { CalvrasClient } from '@calvras/sdk';

const calvras = new CalvrasClient({ apiKey: '${secretKey}' });

const campaign = await calvras.campaigns.create({
  name: 'Q3 Flash Launch',
  product: 'Space Gray Laptop',
  dailyBudgetGhs: 100,
  channels: ['meta_ads', 'tiktok_ads', 'whatsapp_broadcast'],
  autoPublish: false
});

console.log('Campaign Blueprint ID:', campaign.id);`,
      python: `from calvras import Calvras

client = Calvras(api_key="${secretKey}")

campaign = client.campaigns.create(
    name="Q3 Flash Launch",
    product="Space Gray Laptop",
    daily_budget_ghs=100,
    channels=["meta_ads", "tiktok_ads", "whatsapp_broadcast"],
    auto_publish=False
)

print(f"Campaign ID: {campaign.id}")`
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#1c1c1c] p-6 sm:p-10 font-sans antialiased text-white select-none text-left overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8 pt-2 sm:pt-4">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white text-white shadow-2xs">
                <Code2 size={18} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Developer Platform
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-normal">
              Integrate Calvras AI into your SaaS apps, e-commerce stores, backend workflows, and embeddable copilots.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-white/5 text-emerald-400 border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              API v1.4 • Live
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10/80">
          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'api'
                ? 'border-neutral-950 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Terminal size={14} />
            <span>1. REST API & Endpoints</span>
          </button>

          <button
            onClick={() => setActiveTab('widget')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'widget'
                ? 'border-neutral-950 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Bot size={14} />
            <span>2. Embeddable Copilot Widget</span>
          </button>
        </div>

        {/* SECTION 1: REST API & API KEYS */}
        {activeTab === 'api' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* API Keys Card */}
            <div className="bg-neutral-50/80 border border-white/10/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Key size={15} className="text-purple-600" />
                    <span>Workspace API Credentials</span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Use these keys to authenticate requests from your backend services.
                  </p>
                </div>

                <button
                  onClick={handleRegenerateSecret}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 hover:bg-white transition cursor-pointer shadow-2xs"
                  title="Regenerate Secret Key"
                >
                  <RefreshCw size={12} />
                  <span>Roll Key</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                
                {/* Publishable Key */}
                <div className="bg-[#131412] border border-white/10 rounded-xl p-3 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
                      PUBLISHABLE KEY (CLIENT-SIDE)
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Safe for frontend</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-neutral-50 px-2.5 py-1.5 rounded-lg font-mono text-xs text-neutral-200 border border-white/5">
                    <span className="truncate">{publicKey}</span>
                    <button
                      onClick={() => handleCopy(publicKey, 'public')}
                      className="text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-200/60 transition cursor-pointer shrink-0"
                      title="Copy key"
                    >
                      {copiedKey === 'public' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                {/* Secret Key */}
                <div className="bg-[#131412] border border-white/10 rounded-xl p-3 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
                      SECRET KEY (BACKEND ONLY)
                    </span>
                    <span className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">Do not share</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-neutral-50 px-2.5 py-1.5 rounded-lg font-mono text-xs text-neutral-200 border border-white/5">
                    <span className="truncate">
                      {showSecretKey ? secretKey : `${secretKey.slice(0, 14)}••••••••••••••••••••`}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setShowSecretKey(!showSecretKey)}
                        className="text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-200/60 transition cursor-pointer"
                        title={showSecretKey ? 'Hide key' : 'Show key'}
                      >
                        {showSecretKey ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                      <button
                        onClick={() => handleCopy(secretKey, 'secret')}
                        className="text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-200/60 transition cursor-pointer"
                        title="Copy key"
                      >
                        {copiedKey === 'secret' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Endpoints & Code Explorer */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Core REST Endpoints
                </h3>

                {/* Language Switcher */}
                <div className="bg-neutral-100 p-1 rounded-xl flex items-center gap-1 border border-white/10 font-mono text-xs">
                  {['curl', 'node', 'python'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-2.5 py-1 rounded-lg uppercase transition cursor-pointer ${
                        selectedLanguage === lang
                          ? 'bg-white text-white font-bold shadow-2xs'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Endpoint 1: POST /api/v1/generate-creative */}
              <div className="bg-[#131412] border border-white/10 rounded-2xl overflow-hidden shadow-2xs">
                <div className="p-4 bg-neutral-50/70 border-b border-white/10/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-[11px] font-bold">
                      POST
                    </span>
                    <span className="font-mono text-xs font-semibold text-white">
                      https://api.calvras.com/v1/generate-creative
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400">
                    Auto-generate captions, hooks & product imagery
                  </span>
                </div>

                <div className="p-4 bg-[#141416] text-neutral-100 font-mono text-xs overflow-x-auto relative">
                  <button
                    onClick={() => handleCopy(codeSnippets.creative[selectedLanguage], 'creative_code')}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 transition cursor-pointer border border-neutral-700"
                    title="Copy code"
                  >
                    {copiedKey === 'creative_code' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                  <pre className="pr-12 text-[11.5px] leading-relaxed">
                    <code>{codeSnippets.creative[selectedLanguage]}</code>
                  </pre>
                </div>
              </div>

              {/* Endpoint 2: POST /api/v1/campaign */}
              <div className="bg-[#131412] border border-white/10 rounded-2xl overflow-hidden shadow-2xs">
                <div className="p-4 bg-neutral-50/70 border-b border-white/10/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-mono text-[11px] font-bold">
                      POST
                    </span>
                    <span className="font-mono text-xs font-semibold text-white">
                      https://api.calvras.com/v1/campaign
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400">
                    Trigger automated multi-channel marketing campaigns
                  </span>
                </div>

                <div className="p-4 bg-[#141416] text-neutral-100 font-mono text-xs overflow-x-auto relative">
                  <button
                    onClick={() => handleCopy(codeSnippets.campaign[selectedLanguage], 'campaign_code')}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 transition cursor-pointer border border-neutral-700"
                    title="Copy code"
                  >
                    {copiedKey === 'campaign_code' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                  <pre className="pr-12 text-[11.5px] leading-relaxed">
                    <code>{codeSnippets.campaign[selectedLanguage]}</code>
                  </pre>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* SECTION 2: EMBEDDABLE COPILOT WIDGET */}
        {activeTab === 'widget' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Embed Code & Customizer */}
              <div className="lg:col-span-7 space-y-5">
                
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Embed AI Copilot in Your Web App
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Add a white-labeled AI marketing assistant into your SaaS or e-commerce store with 1 line of code.
                  </p>
                </div>

                {/* Integration Type Switcher */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      React Component (NPM)
                    </span>
                    <button
                      onClick={() => handleCopy(`npm install @calvras/react`, 'npm')}
                      className="text-xs text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
                    >
                      {copiedKey === 'npm' ? '✓ Copied' : 'Copy NPM install'}
                    </button>
                  </div>

                  <div className="p-3.5 bg-[#141416] text-neutral-100 rounded-xl font-mono text-xs overflow-x-auto relative">
                    <pre className="text-[11px] leading-relaxed">
                      <code>{`import { CalvrasCopilot } from '@calvras/react';

export default function Dashboard() {
  return (
    <div className="app-container">
      {/* Your SaaS Components */}
      <CalvrasCopilot 
        apiKey="${publicKey}"
        theme="${widgetTheme}"
        brandColor="${widgetBrandColor}"
        title="${widgetTitle}"
      />
    </div>
  );
}`}</code>
                    </pre>
                  </div>
                </div>

                {/* Script Tag for HTML / WordPress / Shopify */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Vanilla HTML / Shopify / WordPress
                    </span>
                    <button
                      onClick={() => handleCopy(`<script src="https://cdn.calvras.com/copilot.v1.js" data-api-key="${publicKey}" data-theme="${widgetTheme}"></script>`, 'script')}
                      className="text-xs text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
                    >
                      {copiedKey === 'script' ? '✓ Copied' : 'Copy <script> tag'}
                    </button>
                  </div>

                  <div className="p-3 bg-[#181916] border border-white/10 rounded-xl font-mono text-[11px] text-neutral-200 overflow-x-auto">
                    <code>{`<script src="https://cdn.calvras.com/copilot.v1.js" data-api-key="${publicKey}" data-theme="${widgetTheme}"></script>`}</code>
                  </div>
                </div>

                {/* Customizer Controls */}
                <div className="bg-neutral-50/80 border border-white/10/90 rounded-2xl p-4 space-y-3.5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Widget Customizer
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-neutral-400 font-medium block">Title</label>
                      <input 
                        type="text" 
                        value={widgetTitle}
                        onChange={(e) => setWidgetTitle(e.target.value)}
                        className="w-full bg-[#131412] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-neutral-400 font-medium block">Theme</label>
                      <select
                        value={widgetTheme}
                        onChange={(e) => setWidgetTheme(e.target.value)}
                        className="w-full bg-[#131412] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      >
                        <option value="dark">Dark Theme</option>
                        <option value="light">Light Theme</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Live Interactive Widget Preview */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Interactive Live Preview
                  </span>
                  <span className="text-[11px] text-purple-600 font-medium">Try typing below</span>
                </div>

                {/* Phone / Web Mockup Container */}
                <div className="bg-neutral-100 border border-white/10 rounded-3xl p-4 h-[440px] relative flex flex-col justify-end shadow-inner overflow-hidden">
                  
                  {/* Background Mockup Canvas */}
                  <div className="absolute inset-0 p-5 opacity-40 select-none pointer-events-none text-left space-y-2">
                    <div className="w-24 h-3 bg-neutral-300 rounded" />
                    <div className="w-48 h-2 bg-neutral-200 rounded" />
                    <div className="w-36 h-2 bg-neutral-200 rounded" />
                    <div className="w-full h-24 bg-white rounded-xl border border-white/10 mt-4" />
                  </div>

                  {/* Open Widget Window */}
                  {widgetOpen && (
                    <div className={`w-full bg-[#131412] border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[360px] z-20 animate-in slide-in-from-bottom-4 duration-200 overflow-hidden ${
                      widgetTheme === 'dark' ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-white text-white'
                    }`}>
                      
                      {/* Widget Header */}
                      <div className="p-3 border-b border-white/10/20 flex items-center justify-between" style={{ backgroundColor: widgetBrandColor }}>
                        <div className="flex items-center gap-2 text-white">
                          <Bot size={16} />
                          <span className="text-xs font-bold">{widgetTitle}</span>
                        </div>
                        <button 
                          onClick={() => setWidgetOpen(false)}
                          className="text-white/80 hover:text-white text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Chat Stream */}
                      <div className="flex-1 p-3 space-y-2 overflow-y-auto text-xs text-left">
                        {widgetMessages.map((m, idx) => (
                          <div 
                            key={idx}
                            className={`p-2.5 rounded-xl max-w-[85%] whitespace-pre-line leading-relaxed ${
                              m.sender === 'user'
                                ? 'ml-auto bg-purple-600 text-white rounded-br-none'
                                : (widgetTheme === 'dark' ? 'bg-neutral-900 text-neutral-100 rounded-bl-none' : 'bg-neutral-100 text-white rounded-bl-none')
                            }`}
                          >
                            {m.text}
                          </div>
                        ))}
                      </div>

                      {/* Widget Input */}
                      <div className="p-2 border-t border-white/10/20 flex items-center gap-1.5">
                        <input
                          type="text"
                          value={widgetInput}
                          onChange={(e) => setWidgetInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleWidgetSend()}
                          placeholder="Ask marketing copilot..."
                          className={`flex-1 px-2.5 py-1.5 rounded-lg text-xs focus:outline-none ${
                            widgetTheme === 'dark' ? 'bg-neutral-900 text-white placeholder:text-neutral-400' : 'bg-neutral-100 text-white'
                          }`}
                        />
                        <button
                          onClick={handleWidgetSend}
                          className="p-1.5 rounded-lg text-white transition cursor-pointer"
                          style={{ backgroundColor: widgetBrandColor }}
                        >
                          <Send size={13} />
                        </button>
                      </div>

                    </div>
                  )}

                  {/* Floating Toggle Button */}
                  {!widgetOpen && (
                    <button
                      onClick={() => setWidgetOpen(true)}
                      className="self-end p-3 rounded-full text-white shadow-xl hover:scale-105 transition cursor-pointer flex items-center gap-2 z-20"
                      style={{ backgroundColor: widgetBrandColor }}
                    >
                      <Bot size={18} />
                      <span className="text-xs font-bold pr-1">Ask AI</span>
                    </button>
                  )}

                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
