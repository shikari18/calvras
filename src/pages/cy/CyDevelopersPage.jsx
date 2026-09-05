import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Plus, 
  Copy, 
  Check, 
  Trash2, 
  Terminal, 
  Play, 
  Sparkles, 
  ShieldAlert, 
  ExternalLink,
  Code2,
  X,
  CheckCircle2,
  Lock,
  ArrowRight,
  RefreshCw,
  CreditCard,
  AlertCircle,
  Zap,
  Building2,
  Infinity as InfinityIcon,
  Bot
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import confetti from 'canvas-confetti';

const FREE_TIER_PROMPT_LIMIT = 100;

export const CyDevelopersPage = ({ userName = 'User' }) => {
  const { userProfile } = useMarketing();
  
  // Developer Subscription Plan state (persisted in localStorage)
  const [developerPlan, setDeveloperPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('calvras_developer_plan');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { planKey: 'free', name: 'Free Developer Tier', isPaid: false };
  });

  // API Keys state (persisted in localStorage)
  const [keys, setKeys] = useState(() => {
    try {
      const saved = localStorage.getItem('calvras_developer_keys');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'key-1',
        name: 'Default API Key',
        key: 'cv_live_sk_' + Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12),
        created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastUsed: 'Just now',
        promptsUsed: 0
      }
    ];
  });

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState('pro'); // 'pro' | 'agency'
  const [newKeyName, setNewKeyName] = useState('');
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);
  const [copiedKeyId, setCopiedKeyId] = useState(null);

  // Upgrade Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessingUpgrade, setIsProcessingUpgrade] = useState(false);
  const [upgradeError, setUpgradeError] = useState('');

  // Playground test state
  const [selectedLanguage, setSelectedLanguage] = useState('curl'); // 'curl' | 'python' | 'node'
  const [testPrompt, setTestPrompt] = useState('Write a Python function to calculate ROAS and 3 Meta ad hooks');
  const [testResponse, setTestResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('calvras_developer_keys', JSON.stringify(keys));
    } catch (e) {}
  }, [keys]);

  useEffect(() => {
    try {
      localStorage.setItem('calvras_developer_plan', JSON.stringify(developerPlan));
    } catch (e) {}
  }, [developerPlan]);

  // Real-time API key usage syncing with backend edge
  useEffect(() => {
    let isMounted = true;

    const syncLiveUsage = async () => {
      if (!keys || keys.length === 0) return;
      try {
        const keyStrings = keys.map(k => k.key);
        const res = await fetch('/api/v1/developer/usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keys: keyStrings })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.usage && isMounted) {
            setKeys(prevKeys => {
              let hasChanged = false;
              const updated = prevKeys.map(k => {
                const live = data.usage[k.key];
                if (live && (live.promptsUsed > (k.promptsUsed || 0) || live.lastUsed)) {
                  hasChanged = true;
                  let formattedLastUsed = k.lastUsed;
                  if (live.lastUsed) {
                    const d = new Date(live.lastUsed);
                    formattedLastUsed = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + d.toLocaleDateString([], { month: 'short', day: 'numeric' });
                  }
                  return {
                    ...k,
                    promptsUsed: Math.max(k.promptsUsed || 0, live.promptsUsed || 0),
                    lastUsed: formattedLastUsed || k.lastUsed
                  };
                }
                return k;
              });
              return hasChanged ? updated : prevKeys;
            });
          }
        }
      } catch (e) {}
    };

    // Initial sync
    syncLiveUsage();

    // Poll every 3 seconds to reflect live API usage in real-time
    const interval = setInterval(syncLiveUsage, 3000);
    window.addEventListener('focus', syncLiveUsage);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('focus', syncLiveUsage);
    };
  }, [keys.length]);

  const activeKey = keys[0]?.key || 'cv_live_sk_sample_key_here';
  
  // Total usage stats
  const totalPromptsUsed = keys.reduce((acc, k) => acc + (k.promptsUsed || 0), 0);
  const isFreeLimitReached = !developerPlan.isPaid && totalPromptsUsed >= FREE_TIER_PROMPT_LIMIT;
  const freePromptsRemaining = Math.max(0, FREE_TIER_PROMPT_LIMIT - totalPromptsUsed);
  const progressPercent = developerPlan.isPaid ? 100 : Math.min(100, Math.round((totalPromptsUsed / FREE_TIER_PROMPT_LIMIT) * 100));

  const handleOpenCreateKey = () => {
    setNewlyCreatedKey(null);
    setNewKeyName('');
    setShowCreateModal(true);
  };

  const handleProcessUpgrade = (e) => {
    e.preventDefault();
    setUpgradeError('');
    
    const cleanNum = cardNumber.replace(/\s+/g, '');
    if (cleanNum.length < 15) {
      setUpgradeError('Please enter a valid 16-digit credit card number.');
      return;
    }

    setIsProcessingUpgrade(true);

    setTimeout(() => {
      setIsProcessingUpgrade(false);
      const isPro = selectedPlanForUpgrade === 'pro';
      const newPlan = {
        planKey: isPro ? 'pro' : 'agency',
        name: isPro ? 'Developer Pro ($20/mo - Unlimited)' : 'Agency & Scale ($60/mo - Unlimited)',
        isPaid: true,
        billingCycle: billingCycle,
        last4: cleanNum.slice(-4)
      };

      setDeveloperPlan(newPlan);
      setShowUpgradeModal(false);
      try { confetti({ particleCount: 60, spread: 70 }); } catch (err) {}
    }, 1200);
  };

  const handleCreateKey = (e) => {
    e.preventDefault();
    const cleanName = newKeyName.trim() || 'Secret Key ' + (keys.length + 1);
    const fullKey = 'cv_live_sk_' + Array.from({length: 32}, () => Math.floor(Math.random() * 36).toString(36)).join('');
    
    const newEntry = {
      id: `key-${Date.now()}`,
      name: cleanName,
      key: fullKey,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUsed: 'Never',
      promptsUsed: 0
    };

    setKeys(prev => [newEntry, ...prev]);
    setNewlyCreatedKey(newEntry);
    setNewKeyName('');
    try { confetti({ particleCount: 50, spread: 60 }); } catch (err) {}
  };

  const handleDeleteKey = (id) => {
    if (confirm('Are you sure you want to revoke this secret key? Any backend applications or code using it will immediately lose access.')) {
      setKeys(prev => prev.filter(k => k.id !== id));
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleRunLiveTest = async () => {
    if (isFreeLimitReached) {
      setShowUpgradeModal(true);
      return;
    }

    setIsTesting(true);
    setTestResponse('Sending request to /api/v1/chat/completions...');

    try {
      const res = await fetch('/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${activeKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'calvras-llama-3.1-8b-marketing',
          messages: [
            { role: 'user', content: testPrompt }
          ],
          temperature: 0.7
        })
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error?.message || `HTTP ${res.status}: API Call Failed`);
      }

      const data = await res.json();
      setTestResponse(JSON.stringify(data, null, 2));

      // Increment prompt usage count for active key
      setKeys(prev => prev.map((k, idx) => {
        if (idx === 0) {
          return {
            ...k,
            promptsUsed: (k.promptsUsed || 0) + 1,
            lastUsed: 'Just now'
          };
        }
        return k;
      }));

    } catch (err) {
      setTestResponse(`⚠️ Error: ${err.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  const codeSnippets = {
    curl: `curl -X POST https://calvras.com/api/v1/chat/completions \
  -H "Authorization: Bearer ${activeKey}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "calvras-llama-3.1-8b-marketing",
    "messages": [
      {
        "role": "system",
        "content": "You are an elite coding & marketing copilot."
      },
      {
        "role": "user",
        "content": "${testPrompt}"
      }
    ]
  }'`,
    python: `from openai import OpenAI

# 100% compatible with standard OpenAI SDK (Coding, Chatbots, Marketing, etc.)
client = OpenAI(
    api_key="${activeKey}",
    base_url="https://calvras.com/api/v1"
)

response = client.chat.completions.create(
    model="calvras-llama-3.1-8b-marketing",
    messages=[
        {"role": "system", "content": "You are a senior full-stack AI engineer."},
        {"role": "user", "content": "${testPrompt}"}
    ]
)

print(response.choices[0].message.content)`,
    node: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "${activeKey}",
  baseURL: "https://calvras.com/api/v1",
});

const completion = await client.chat.completions.create({
  model: "calvras-llama-3.1-8b-marketing",
  messages: [
    { role: "system", content: "You are a multi-purpose autonomous AI bot." },
    { role: "user", content: "${testPrompt}" }
  ],
});

console.log(completion.choices[0].message.content);`
  };

  return (
    <div className="flex-1 min-h-screen bg-[#1c1c1c] text-[#f4f4ee] p-6 sm:p-10 font-sans antialiased select-none text-left overflow-y-auto">
      
      {/* 1. Upgrade Plan Modal ($20 Pro / $60 Agency Unlimited) */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#282828] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 text-left relative">
            
            <button
              onClick={() => {
                setShowUpgradeModal(false);
                setUpgradeError('');
              }}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Unlimited Developer API Plans</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Unlock Unlimited API Calls
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No prompt caps. Use for coding, conversational chatbots, marketing automation, or SaaS backends.
              </p>
            </div>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center justify-center pt-1">
              <div className="bg-[#1c1c1c] border border-white/10 p-1 rounded-xl flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                    billingCycle === 'monthly' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1 ${
                    billingCycle === 'annual' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1 rounded">Save 20%</span>
                </button>
              </div>
            </div>

            {/* 2 Plan Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              
              {/* Pro Plan ($20/mo) */}
              <div
                onClick={() => setSelectedPlanForUpgrade('pro')}
                className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 relative ${
                  selectedPlanForUpgrade === 'pro'
                    ? 'bg-purple-950/30 border-purple-500 text-white shadow-md'
                    : 'bg-[#1c1c1c] border-white/10 hover:border-white/20 text-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Developer Pro</span>
                  <InfinityIcon size={14} className="text-purple-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-mono text-white">
                    ${billingCycle === 'annual' ? '16' : '20'}
                  </span>
                  <span className="text-xs text-neutral-400">/ month</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-tight">
                  {billingCycle === 'annual' ? '$190 billed annually' : 'Billed monthly'}
                </p>
                <ul className="text-[11px] text-neutral-300 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5"><Check size={11} className="text-emerald-400" /> <strong>Unlimited</strong> API prompts</li>
                  <li className="flex items-center gap-1.5"><Check size={11} className="text-emerald-400" /> Coding & Chatbot support</li>
                  <li className="flex items-center gap-1.5"><Check size={11} className="text-emerald-400" /> Custom system prompts</li>
                </ul>
              </div>

              {/* Agency Plan ($60/mo) */}
              <div
                onClick={() => setSelectedPlanForUpgrade('agency')}
                className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 relative ${
                  selectedPlanForUpgrade === 'agency'
                    ? 'bg-purple-950/30 border-purple-500 text-white shadow-md'
                    : 'bg-[#1c1c1c] border-white/10 hover:border-white/20 text-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Agency & Scale</span>
                  <Building2 size={14} className="text-purple-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-mono text-white">
                    ${billingCycle === 'annual' ? '48' : '60'}
                  </span>
                  <span className="text-xs text-neutral-400">/ month</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-tight">
                  {billingCycle === 'annual' ? '$580 billed annually' : 'Billed monthly'}
                </p>
                <ul className="text-[11px] text-neutral-300 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5"><Check size={11} className="text-emerald-400" /> <strong>Unlimited</strong> multi-client keys</li>
                  <li className="flex items-center gap-1.5"><Check size={11} className="text-emerald-400" /> Dedicated high-throughput queue</li>
                  <li className="flex items-center gap-1.5"><Check size={11} className="text-emerald-400" /> Webhook automations</li>
                </ul>
              </div>

            </div>

            {upgradeError && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{upgradeError}</span>
              </div>
            )}

            {/* Payment Fields */}
            <form onSubmit={handleProcessUpgrade} className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-300">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-300">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="4242 •••• •••• 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-300">
                    Exp / CVC
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={7}
                    placeholder="MM/YY"
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessingUpgrade}
                className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 disabled:opacity-50 text-neutral-950 font-bold text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-2 mt-2"
              >
                {isProcessingUpgrade ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Activating Subscription...</span>
                  </>
                ) : (
                  <>
                    <Lock size={13} />
                    <span>Upgrade to {selectedPlanForUpgrade === 'pro' ? 'Pro ($20/mo)' : 'Agency ($60/mo)'} — Unlimited</span>
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      )}

      {/* 2. Create Key Modal (100% Free to create) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#282828] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-left relative">
            
            <button
              onClick={() => {
                setShowCreateModal(false);
                setNewlyCreatedKey(null);
                setNewKeyName('');
              }}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {!newlyCreatedKey ? (
              /* Step 1: Name the Key */
              <form onSubmit={handleCreateKey} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Create new secret key
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Name your key for coding, conversational chatbots, marketing scripts, or production servers.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    Key Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VSCode Assistant, Shopify Bot, Cron Job"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition"
                    autoFocus
                  />
                </div>

                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs flex items-start gap-2">
                  <Sparkles size={15} className="shrink-0 mt-0.5 text-purple-400" />
                  <span>Universal API: You can pass custom system prompts for coding, chatbots, or marketing.</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold transition cursor-pointer shadow-md"
                  >
                    Create secret key
                  </button>
                </div>
              </form>
            ) : (
              /* Step 2: Key Generated Success View */
              <div className="space-y-4 animate-in zoom-in-95 duration-150">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 size={16} />
                    <span>Secret key generated!</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Save your key now
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Please save this secret key somewhere safe. For your security, you will not be able to view the full key again.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    {newlyCreatedKey.name}
                  </label>
                  <div className="flex items-center gap-2 bg-[#1c1c1c] border border-white/10 rounded-xl p-2.5">
                    <span className="font-mono text-xs text-white truncate select-all flex-1">
                      {newlyCreatedKey.key}
                    </span>
                    <button
                      onClick={() => handleCopy(newlyCreatedKey.key, 'modal-key')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition cursor-pointer"
                    >
                      {copiedKeyId === 'modal-key' ? (
                        <>
                          <Check size={12} className="text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewlyCreatedKey(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs transition cursor-pointer shadow-md text-center"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Main Page Layout */}
      <div className="max-w-5xl mx-auto space-y-8 pt-4">
        
        {/* Header with Title & "+ Create new secret key" button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Key size={22} className="text-white" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                API Keys & Developer Platform
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400">
              Generate keys freely for coding, chatbots, and marketing. 100 free prompts included, then $20/mo for unlimited prompts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {!developerPlan.isPaid && (
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md active:scale-95 shrink-0"
              >
                <Sparkles size={14} />
                <span>Upgrade ($20/mo Unlimited)</span>
              </button>
            )}

            <button
              onClick={handleOpenCreateKey}
              className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-neutral-950 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md active:scale-95 shrink-0"
            >
              <Plus size={15} />
              <span>Create new secret key</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards for Usage & Plan Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Plan Status Card */}
          <div className="bg-[#282828] border border-white/10 rounded-2xl p-4 space-y-1.5 shadow-lg">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              DEVELOPER PLAN
            </span>
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-2">
                <Zap size={15} className={developerPlan.isPaid ? 'text-emerald-400' : 'text-purple-400'} />
                <span className="text-xs font-bold text-white truncate max-w-[140px]">
                  {developerPlan.isPaid ? developerPlan.name : 'Free (100 Prompts)'}
                </span>
              </div>
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="text-[11px] text-purple-400 hover:underline font-semibold cursor-pointer shrink-0"
              >
                {developerPlan.isPaid ? 'Manage' : 'Upgrade'}
              </button>
            </div>
          </div>

          {/* Usage Meter Card */}
          <div className="bg-[#282828] border border-white/10 rounded-2xl p-4 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
              <span>USAGE STATUS</span>
              <span>{developerPlan.isPaid ? 'UNLIMITED' : `${totalPromptsUsed} / ${FREE_TIER_PROMPT_LIMIT}`}</span>
            </div>
            
            {developerPlan.isPaid ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold font-mono text-emerald-400">Unlimited Active</span>
                <span className="text-[11px] text-neutral-400">({totalPromptsUsed} calls made)</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-[#1c1c1c] overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${progressPercent >= 90 ? 'bg-rose-500' : 'bg-purple-500'}`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                  <span>{freePromptsRemaining} free prompts left</span>
                  <span>{progressPercent}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Versatility Capability Card */}
          <div className="bg-[#282828] border border-white/10 rounded-2xl p-4 space-y-1.5 shadow-lg">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              SUPPORTED CAPABILITIES
            </span>
            <div className="flex items-center gap-2 pt-0.5 text-xs text-white font-medium">
              <Bot size={15} className="text-purple-400" />
              <span>Coding, Chatbots, Marketing & Logic</span>
            </div>
            <span className="text-[10px] text-neutral-400 block">Obeys 100% of custom system prompts</span>
          </div>

        </div>

        {/* Available Keys Table / List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Available Secret Keys
            </h3>
            <span className="text-xs text-neutral-500 font-mono">
              {keys.length} {keys.length === 1 ? 'key' : 'keys'} active
            </span>
          </div>

          <div className="bg-[#282828] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
            {keys.length > 0 ? (
              <div className="divide-y divide-white/5">
                <div className="grid grid-cols-12 px-4 py-3 bg-[#1c1c1c]/50 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  <div className="col-span-3 sm:col-span-3">NAME</div>
                  <div className="col-span-4 sm:col-span-4">SECRET KEY</div>
                  <div className="hidden sm:block sm:col-span-2">CREATED</div>
                  <div className="hidden sm:block sm:col-span-1">LAST USED</div>
                  <div className="col-span-3 sm:col-span-1 text-center">PROMPTS</div>
                  <div className="col-span-2 sm:col-span-1 text-right">ACTION</div>
                </div>

                {keys.map((k) => (
                  <div key={k.id} className="grid grid-cols-12 items-center px-4 py-3.5 hover:bg-white/5 transition text-xs">
                    <div className="col-span-3 sm:col-span-3 font-semibold text-white truncate pr-2">
                      {k.name}
                    </div>
                    <div className="col-span-4 sm:col-span-4 font-mono text-neutral-400 flex items-center gap-2 truncate">
                      <span className="truncate">{k.key.slice(0, 12)}••••••••••••••••{k.key.slice(-4)}</span>
                      <button
                        onClick={() => handleCopy(k.key, k.id)}
                        className="p-1 hover:text-white hover:bg-white/10 rounded transition cursor-pointer shrink-0"
                        title="Copy full key"
                      >
                        {copiedKeyId === k.id ? (
                          <Check size={13} className="text-emerald-400" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    </div>
                    <div className="hidden sm:block sm:col-span-2 text-neutral-400">
                      {k.created}
                    </div>
                    <div className="hidden sm:block sm:col-span-1 text-neutral-400">
                      {k.lastUsed}
                    </div>
                    <div className="col-span-3 sm:col-span-1 text-center font-mono text-white font-semibold">
                      {k.promptsUsed || 0}
                    </div>
                    <div className="col-span-2 sm:col-span-1 text-right">
                      <button
                        onClick={() => handleDeleteKey(k.id)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition cursor-pointer"
                        title="Revoke key"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center space-y-2">
                <p className="text-xs text-neutral-400">No secret keys created yet.</p>
                <button
                  onClick={handleOpenCreateKey}
                  className="text-xs text-white font-bold underline cursor-pointer"
                >
                  Generate your first free secret key
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Integration & Code Snippets Playground */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-white">
                Integration & API Playground
              </h3>
              <p className="text-xs text-neutral-400">
                Endpoint: <span className="font-mono text-emerald-400">POST https://calvras.com/api/v1/chat/completions</span>
              </p>
            </div>

            <div className="flex items-center gap-1 bg-[#282828] border border-white/10 p-1 rounded-xl">
              {['curl', 'python', 'node'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition cursor-pointer ${
                    selectedLanguage === lang 
                      ? 'bg-white text-neutral-950 shadow-xs' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Code View Card */}
          <div className="bg-[#282828] border border-white/10 rounded-2xl p-4 font-mono text-xs text-neutral-200 overflow-x-auto relative shadow-lg">
            <button
              onClick={() => handleCopy(codeSnippets[selectedLanguage], 'code-snippet')}
              className="absolute top-3 right-3 p-1.5 bg-[#1c1c1c] hover:bg-white/10 border border-white/10 rounded-lg text-neutral-400 hover:text-white transition cursor-pointer flex items-center gap-1"
              title="Copy code"
            >
              {copiedKeyId === 'code-snippet' ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-[11px] font-sans">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span className="text-[11px] font-sans">Copy</span>
                </>
              )}
            </button>
            <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
              {codeSnippets[selectedLanguage]}
            </pre>
          </div>

          {/* Interactive Live Browser Test Card */}
          <div className="bg-[#282828] border border-white/10 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-white" />
                <span className="text-xs font-bold text-white">Live API Endpoint Test</span>
              </div>
              <button
                onClick={handleRunLiveTest}
                disabled={isTesting}
                className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-bold px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer shadow-xs active:scale-95"
              >
                {isTesting ? (
                  <>
                    <RefreshCw size={12} className="animate-spin" />
                    <span>Executing Request...</span>
                  </>
                ) : (
                  <>
                    <Play size={12} fill="currentColor" />
                    <span>Run API Call</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Test Prompt Payload (Coding, Chatbot, or Marketing)
              </label>
              <input
                type="text"
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                placeholder="Enter prompt to send via API..."
                className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition font-mono"
              />
            </div>

            {testResponse && (
              <div className="space-y-1.5 animate-in fade-in duration-150">
                <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Live Response from Serverless Worker:
                </label>
                <div className="p-3.5 rounded-xl bg-[#1c1c1c] border border-white/10 text-xs font-mono text-emerald-400/90 whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {testResponse}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
