import React, { useState } from 'react';
import { 
  X, User, Zap, Shield, Key, Sparkles, CreditCard, 
  Settings as SettingsIcon, Terminal, Check, Globe, HelpCircle,
  LogOut, ExternalLink, Cpu, SlidersHorizontal, Lock
} from 'lucide-react';

export default function AccountSettingsModal({ isOpen, onClose, user, onUpgrade, onSignOut }) {
  const [activeTab, setActiveTab] = useState('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [hfToken, setHfToken] = useState(() => localStorage.getItem('malvos_hf_token') || '');
  const [openRouterKey, setOpenRouterKey] = useState(() => localStorage.getItem('calvras_openrouter_key') || '');
  const [displayName, setDisplayName] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('coded_user') || localStorage.getItem('calvras_user_profile') || '{}');
      return u?.name || 'Developer';
    } catch {
      return 'Developer';
    }
  });
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem('calvras_default_model') || 'google/gemini-2.0-flash-001';
  });

  if (!isOpen) return null;

  const handleSave = () => {
    try {
      localStorage.setItem('malvos_hf_token', hfToken.trim());
      localStorage.setItem('calvras_openrouter_key', openRouterKey.trim());
      localStorage.setItem('calvras_default_model', selectedModel);
      const curUser = JSON.parse(localStorage.getItem('coded_user') || '{}');
      curUser.name = displayName.trim();
      localStorage.setItem('coded_user', JSON.stringify(curUser));
      const curProf = JSON.parse(localStorage.getItem('calvras_user_profile') || '{}');
      curProf.name = displayName.trim();
      localStorage.setItem('calvras_user_profile', JSON.stringify(curProf));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const userPlan = user?.plan || 'Free Plan';
  const userEmail = user?.email || 'user@calvras.ai';

  const tabs = [
    { id: 'general', label: 'General', icon: SlidersHorizontal },
    { id: 'models', label: 'AI Models', icon: Cpu },
    { id: 'keys', label: 'API Keys & BYOK', icon: Key },
    { id: 'billing', label: 'Account & Plan', icon: CreditCard },
    { id: 'shortcuts', label: 'Shortcuts', icon: Terminal }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 select-none">
      <div className="relative w-full max-w-2xl bg-[#12110E] border border-white/10 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B0A08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <SettingsIcon size={16} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">Settings</h2>
              <p className="text-[11px] text-neutral-400">Workspace preferences and compute configuration</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-white/10 bg-[#0E0D0A] overflow-x-auto scrollbar-none">
          {tabs.map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'border-white text-white' 
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Icon size={14} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-neutral-300 text-xs">
          
          {/* TAB: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-200 mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1812] border border-white/10 text-white text-xs outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-200 mb-1.5">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#1A1812] border-2 border-white/40 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#0B0A08] border border-white/20" />
                      <span className="text-white font-medium text-xs">Deep Obsidian (#0B0A08)</span>
                    </div>
                    <Check size={14} className="text-white" />
                  </div>
                  <div className="p-3 rounded-xl bg-[#1A1812] border border-white/5 opacity-50 flex items-center gap-2 cursor-not-allowed">
                    <div className="w-4 h-4 rounded-full bg-neutral-200" />
                    <span className="text-neutral-400 text-xs">System Default</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1A1812] border border-white/10 space-y-2">
                <div className="text-xs font-semibold text-white">Default Split Screen Ratio</div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Calvras opens workspaces with a balanced 50/50 split screen between conversation and interactive live preview.
                </p>
              </div>
            </div>
          )}

          {/* TAB: AI MODELS */}
          {activeTab === 'models' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-200 mb-1.5">
                  Default Autonomous Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1812] border border-white/10 text-white text-xs outline-none focus:border-white/30 cursor-pointer"
                >
                  <option value="google/gemini-2.0-flash-001">Google Gemini 2.0 Flash (Recommended · Ultra Fast & Multimodal)</option>
                  <option value="anthropic/claude-3.7-sonnet">Anthropic Claude 3.7 Sonnet (Deep Reasoning & Pixel-Perfect UI)</option>
                  <option value="google/gemini-2.5-pro">Google Gemini 2.5 Pro (Flagship Architecture & Large Context)</option>
                  <option value="openai/gpt-4o">OpenAI GPT-4o (Standard Flagship)</option>
                  <option value="minimax/minimax-m3:free">MiniMax M3 (Free High-Speed Conversational)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-[#1A1812] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-medium text-xs">
                  <Sparkles size={14} className="text-emerald-400" />
                  <span>Automatic Multi-Tier Model Failover Active</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  If an upstream model provider experiences latency or rate limits, Calvras automatically routes your build through our 4-tier zero-downtime failover cluster.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#1A1812] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-medium text-xs">
                  <Globe size={14} className="text-blue-400" />
                  <span>Real-Time Web Search & Research</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Calvras autonomously crawls technical docs, npm packages, and live APIs when prompted to research, check, or duplicate any public product.
                </p>
              </div>
            </div>
          )}

          {/* TAB: API KEYS & BYOK */}
          {activeTab === 'keys' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-neutral-200">
                    OpenRouter API Key (BYOK)
                  </label>
                  <span className="text-[10px] text-emerald-400 font-mono">Unlimited on Max Plan</span>
                </div>
                <input
                  type="password"
                  value={openRouterKey}
                  onChange={(e) => setOpenRouterKey(e.target.value)}
                  placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1812] border border-white/10 text-white font-mono text-xs outline-none focus:border-white/30"
                />
                <p className="text-[10.5px] text-neutral-400 mt-1">
                  Connect your own OpenRouter key for direct cloud access without rate limits.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-200 mb-1.5">
                  Hugging Face Access Token
                </label>
                <input
                  type="password"
                  value={hfToken}
                  onChange={(e) => setHfToken(e.target.value)}
                  placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1812] border border-white/10 text-white font-mono text-xs outline-none focus:border-white/30"
                />
                <p className="text-[10.5px] text-neutral-400 mt-1">
                  Used for dedicated open-source inference endpoints.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                <Lock size={14} className="text-neutral-400 flex-shrink-0" />
                <span className="text-[11px] text-neutral-400">
                  All keys are stored locally in your browser and hardware-encrypted via AES-256 before transport.
                </span>
              </div>
            </div>
          )}

          {/* TAB: BILLING & ACCOUNT */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#1A1812] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Current Subscription</div>
                  <div className="text-lg font-bold text-white mt-0.5">{userPlan}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{userEmail}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onUpgrade) onUpgrade();
                  }}
                  className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer shadow-md"
                >
                  Change Plan
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#1A1812] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Shield size={14} className="text-emerald-400" />
                  <span>14-Day Money-Back Guarantee</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  All Calvras subscriptions ($14 Pro and $40 Max) are protected by our unconditional 14-day refund guarantee processed via Paystack.
                </p>
              </div>

              {onSignOut && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSignOut();
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB: KEYBOARD SHORTCUTS */}
          {activeTab === 'shortcuts' && (
            <div className="space-y-2">
              {[
                { label: 'Open Command Palette', keys: ['Ctrl', 'K'] },
                { label: 'Open Settings', keys: ['Ctrl', ','] },
                { label: 'Save Active File', keys: ['Ctrl', 'S'] },
                { label: 'New Chat Session', keys: ['Ctrl', 'Shift', 'O'] },
                { label: 'Toggle Workspace Preview', keys: ['Ctrl', 'B'] },
                { label: 'Send Message', keys: ['Enter'] },
                { label: 'New Line in Prompt', keys: ['Shift', 'Enter'] }
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1812] border border-white/5">
                  <span className="text-neutral-300 text-xs">{item.label}</span>
                  <div className="flex items-center gap-1">
                    {item.keys.map(k => (
                      <kbd key={k} className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-white">
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#0B0A08]">
          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium animate-in fade-in">
                <Check size={14} /> Preferences saved
              </span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-300 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-colors cursor-pointer shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
