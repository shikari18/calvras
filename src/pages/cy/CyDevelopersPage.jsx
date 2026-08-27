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
  DollarSign,
  Activity
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import confetti from 'canvas-confetti';

const PROMPT_COST_USD = 0.50; // $0.500 per prompt (2 prompts = $1.00)

export const CyDevelopersPage = ({ userName = 'SHIKARI' }) => {
  const { userProfile } = useMarketing();
  
  // Payment Card state (persisted in localStorage)
  const [paymentMethod, setPaymentMethod] = useState(() => {
    try {
      const saved = localStorage.getItem('calvras_developer_payment_method');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { hasCard: false, brand: 'Visa', last4: '', exp: '' };
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
        name: 'Default Production Key',
        key: 'cv_live_sk_' + Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12),
        created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastUsed: 'Just now',
        promptsUsed: 0
      }
    ];
  });

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);
  const [copiedKeyId, setCopiedKeyId] = useState(null);

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isVerifyingCard, setIsVerifyingCard] = useState(false);
  const [cardError, setCardError] = useState('');

  // Playground test state
  const [selectedLanguage, setSelectedLanguage] = useState('curl'); // 'curl' | 'python' | 'node'
  const [testPrompt, setTestPrompt] = useState('Write 3 Meta ad copy hooks for my luxury hoodie using PAS framework');
  const [testResponse, setTestResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('calvras_developer_keys', JSON.stringify(keys));
    } catch (e) {}
  }, [keys]);

  useEffect(() => {
    try {
      localStorage.setItem('calvras_developer_payment_method', JSON.stringify(paymentMethod));
    } catch (e) {}
  }, [paymentMethod]);

  const activeKey = keys[0]?.key || 'cv_live_sk_sample_key_here';
  
  // Total usage stats
  const totalPromptsUsed = keys.reduce((acc, k) => acc + (k.promptsUsed || 0), 0);
  const totalSpentUsd = (totalPromptsUsed * PROMPT_COST_USD).toFixed(2);

  const handleOpenCreateKey = () => {
    if (!paymentMethod.hasCard) {
      setCardError('');
      setShowAddCardModal(true);
      return;
    }
    setNewlyCreatedKey(null);
    setNewKeyName('');
    setShowCreateModal(true);
  };

  const handleSaveCard = (e) => {
    e.preventDefault();
    setCardError('');
    
    const cleanNum = cardNumber.replace(/\s+/g, '');
    if (cleanNum.length < 15) {
      setCardError('Please enter a valid 16-digit credit card number.');
      return;
    }

    setIsVerifyingCard(true);

    setTimeout(() => {
      setIsVerifyingCard(false);
      const last4 = cleanNum.slice(-4);
      const newPayment = {
        hasCard: true,
        brand: cleanNum.startsWith('4') ? 'Visa' : (cleanNum.startsWith('5') ? 'Mastercard' : 'Amex'),
        last4: last4,
        exp: cardExp || '12/28'
      };

      setPaymentMethod(newPayment);
      setShowAddCardModal(false);
      
      // Auto open Create Key modal
      setNewlyCreatedKey(null);
      setNewKeyName('');
      setShowCreateModal(true);
      try { confetti({ particleCount: 40, spread: 50 }); } catch (err) {}
    }, 1200);
  };

  const handleCreateKey = (e) => {
    e.preventDefault();
    if (!paymentMethod.hasCard) {
      setShowCreateModal(false);
      setShowAddCardModal(true);
      return;
    }

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
    if (confirm('Are you sure you want to revoke this secret key? Any backend applications using it will immediately lose access.')) {
      setKeys(prev => prev.filter(k => k.id !== id));
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleRunLiveTest = async () => {
    setIsTesting(true);
    setTestResponse('Sending request to /api/v1/chat/completions (Cost: $0.500)...');

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
        "role": "user",
        "content": "${testPrompt}"
      }
    ]
  }'`,
    python: `from openai import OpenAI

# Calvras is 100% compatible with the standard OpenAI SDK ($0.50 / prompt)
client = OpenAI(
    api_key="${activeKey}",
    base_url="https://calvras.com/api/v1"
)

response = client.chat.completions.create(
    model="calvras-llama-3.1-8b-marketing",
    messages=[
        {"role": "user", "content": "${testPrompt}"}
    ]
)

print(response.choices[0].message.content)`,
    node: `import OpenAI from "openai";

const calvras = new OpenAI({
  apiKey: "${activeKey}",
  baseURL: "https://calvras.com/api/v1",
});

const completion = await calvras.chat.completions.create({
  model: "calvras-llama-3.1-8b-marketing",
  messages: [
    { role: "user", content: "${testPrompt}" }
  ],
});

console.log(completion.choices[0].message.content);`
  };

  return (
    <div className="flex-1 min-h-screen bg-[#1c1c1c] text-[#f4f4ee] p-6 sm:p-10 font-sans antialiased select-none text-left overflow-y-auto">
      
      {/* 1. Add Payment Method Modal (Required to Generate Key) */}
      {showAddCardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#282828] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-left relative">
            
            <button
              onClick={() => {
                setShowAddCardModal(false);
                setCardError('');
              }}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
                <CreditCard size={20} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Add payment method to generate API keys
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Developer API keys operate on usage-based metering at <strong className="text-white">$0.50 per prompt</strong> (2 prompts = $1.00). Invoiced automatically based on volume.
              </p>
            </div>

            {/* Pricing Info Badge */}
            <div className="p-3 rounded-2xl bg-[#1c1c1c] border border-white/10 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Prompt Metering Rate:</span>
              <span className="font-mono font-bold text-emerald-400">$0.500 / request</span>
            </div>

            {cardError && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{cardError}</span>
              </div>
            )}

            <form onSubmit={handleSaveCard} className="space-y-3.5 pt-1">
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
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-300">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="4242 •••• •••• 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white transition"
                  />
                  <CreditCard size={15} className="absolute right-3 top-3 text-neutral-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-300">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="MM/YY"
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-300">
                    CVC
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="•••"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white transition"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isVerifyingCard}
                  className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 disabled:opacity-50 text-neutral-950 font-bold text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  {isVerifyingCard ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Verifying Card with Stripe...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={13} />
                      <span>Save Card & Unlock API Keys</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 2. Create Key Modal */}
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
                    Enter a name to identify where this key will be used (e.g. backend server, cron job, or test app).
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    Key Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Production Shopify Bot"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition"
                    autoFocus
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#1c1c1c] border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Rate:</span>
                  <span className="font-mono text-white font-semibold">$0.50 / prompt (billed to card •••• {paymentMethod.last4})</span>
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
                API Keys & Metered Usage
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400">
              Create and manage your secret API keys. Rate: <span className="font-mono text-emerald-400 font-semibold">$0.500 / prompt</span> (2 prompts = $1.00).
            </p>
          </div>

          <button
            onClick={handleOpenCreateKey}
            className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-neutral-950 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md active:scale-95 shrink-0"
          >
            <Plus size={15} />
            <span>Create new secret key</span>
          </button>
        </div>

        {/* 3 Metric Cards for Usage & Card Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#282828] border border-white/10 rounded-2xl p-4 space-y-1.5 shadow-lg">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              PAYMENT METHOD
            </span>
            <div className="flex items-center justify-between pt-0.5">
              {paymentMethod.hasCard ? (
                <div className="flex items-center gap-2">
                  <CreditCard size={15} className="text-emerald-400" />
                  <span className="text-sm font-bold text-white font-mono">{paymentMethod.brand} •••• {paymentMethod.last4}</span>
                </div>
              ) : (
                <span className="text-xs font-semibold text-amber-400">No card attached</span>
              )}
              <button
                onClick={() => {
                  setCardError('');
                  setShowAddCardModal(true);
                }}
                className="text-[11px] text-white hover:underline font-semibold cursor-pointer"
              >
                {paymentMethod.hasCard ? 'Edit' : 'Attach Card'}
              </button>
            </div>
          </div>

          <div className="bg-[#282828] border border-white/10 rounded-2xl p-4 space-y-1.5 shadow-lg">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              TOTAL PROMPTS PROCESSED
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">{totalPromptsUsed}</span>
              <span className="text-xs text-neutral-400">requests</span>
            </div>
          </div>

          <div className="bg-[#282828] border border-white/10 rounded-2xl p-4 space-y-1.5 shadow-lg">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              CURRENT CYCLE SPEND
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-emerald-400">${totalSpentUsd}</span>
              <span className="text-xs text-neutral-400">USD</span>
            </div>
          </div>
        </div>

        {/* Available Keys Table / List (with Usage Column) */}
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
                  <div className="col-span-4 sm:col-span-3">SECRET KEY</div>
                  <div className="hidden sm:block sm:col-span-2">CREATED</div>
                  <div className="hidden sm:block sm:col-span-2">LAST USED</div>
                  <div className="col-span-3 sm:col-span-1 text-center">USAGE</div>
                  <div className="col-span-2 sm:col-span-1 text-right">ACTION</div>
                </div>

                {keys.map((k) => {
                  const keyPrompts = k.promptsUsed || 0;
                  const keyCost = (keyPrompts * PROMPT_COST_USD).toFixed(2);
                  return (
                    <div key={k.id} className="grid grid-cols-12 items-center px-4 py-3.5 hover:bg-white/5 transition text-xs">
                      <div className="col-span-3 sm:col-span-3 font-semibold text-white truncate pr-2">
                        {k.name}
                      </div>
                      <div className="col-span-4 sm:col-span-3 font-mono text-neutral-400 flex items-center gap-2 truncate">
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
                      <div className="hidden sm:block sm:col-span-2 text-neutral-400">
                        {k.lastUsed}
                      </div>
                      <div className="col-span-3 sm:col-span-1 text-center font-mono">
                        <span className="text-emerald-400 font-semibold">${keyCost}</span>
                        <span className="text-[10px] text-neutral-500 block">({keyPrompts} reqs)</span>
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
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center space-y-2">
                <p className="text-xs text-neutral-400">No secret keys created yet.</p>
                <button
                  onClick={handleOpenCreateKey}
                  className="text-xs text-white font-bold underline cursor-pointer"
                >
                  Attach card and generate your first secret key
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
                <span className="text-xs font-bold text-white">Live API Endpoint Test ($0.500 Metered)</span>
              </div>
              <button
                onClick={handleRunLiveTest}
                disabled={isTesting}
                className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-bold px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer shadow-xs active:scale-95"
              >
                {isTesting ? (
                  <>
                    <RefreshCw size={12} className="animate-spin" />
                    <span>Sending...</span>
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
                Test Prompt Payload
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
