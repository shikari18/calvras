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
  RefreshCw
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import confetti from 'canvas-confetti';

export const CyDevelopersPage = ({ userName = 'SHIKARI' }) => {
  const { userProfile } = useMarketing();
  
  // API Keys state (persisted in localStorage)
  const [keys, setKeys] = useState(() => {
    try {
      const saved = localStorage.getItem('calvras_developer_keys');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'key-1',
        name: 'Default Secret Key',
        key: 'cv_live_sk_' + Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12),
        created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastUsed: 'Just now'
      }
    ];
  });

  // Modal state for creating new key
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);
  const [copiedKeyId, setCopiedKeyId] = useState(null);

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

  const activeKey = keys[0]?.key || 'cv_live_sk_sample_key_here';

  const handleCreateKey = (e) => {
    e.preventDefault();
    const cleanName = newKeyName.trim() || 'Secret Key ' + (keys.length + 1);
    const fullKey = 'cv_live_sk_' + Array.from({length: 32}, () => Math.floor(Math.random() * 36).toString(36)).join('');
    
    const newEntry = {
      id: `key-${Date.now()}`,
      name: cleanName,
      key: fullKey,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUsed: 'Never'
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

# Calvras is 100% compatible with the standard OpenAI SDK
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
      
      {/* Create Key Modal */}
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

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2">
                  <ShieldAlert size={15} className="shrink-0 mt-0.5 text-amber-400" />
                  <span>Do not share your API key with others or expose it in public client-side browser code.</span>
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
                API Keys
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400">
              Create, name, and manage your Calvras secret API keys. Compatible with OpenAI standard SDKs and endpoints.
            </p>
          </div>

          <button
            onClick={() => {
              setNewlyCreatedKey(null);
              setNewKeyName('');
              setShowCreateModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-neutral-950 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md active:scale-95 shrink-0"
          >
            <Plus size={15} />
            <span>Create new secret key</span>
          </button>
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
                  <div className="col-span-4 sm:col-span-3">NAME</div>
                  <div className="col-span-5 sm:col-span-4">SECRET KEY</div>
                  <div className="hidden sm:block sm:col-span-2">CREATED</div>
                  <div className="hidden sm:block sm:col-span-2">LAST USED</div>
                  <div className="col-span-3 sm:col-span-1 text-right">ACTION</div>
                </div>

                {keys.map((k) => (
                  <div key={k.id} className="grid grid-cols-12 items-center px-4 py-3.5 hover:bg-white/5 transition text-xs">
                    <div className="col-span-4 sm:col-span-3 font-semibold text-white truncate pr-2">
                      {k.name}
                    </div>
                    <div className="col-span-5 sm:col-span-4 font-mono text-neutral-400 flex items-center gap-2 truncate">
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
                    <div className="col-span-3 sm:col-span-1 text-right">
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
                  onClick={() => setShowCreateModal(true)}
                  className="text-xs text-white font-bold underline cursor-pointer"
                >
                  Create your first secret key
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
