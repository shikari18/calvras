import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Code2, 
  Terminal, 
  Cpu, 
  Layers
} from 'lucide-react';

export default function DeveloperPage() {
  const [apiKeys, setApiKeys] = useState(() => {
    try {
      const saved = localStorage.getItem('calvras_developer_keys');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 'key-1', name: 'Default Development Key', key: 'calvras_sk_live_' + Math.random().toString(36).substring(2, 14) + Date.now().toString(36), created: '2026-08-30', lastUsed: 'Just now' }
    ];
  });

  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [activeTab, setActiveTab] = useState('keys');

  useEffect(() => {
    try {
      localStorage.setItem('calvras_developer_keys', JSON.stringify(apiKeys));
    } catch {}
  }, [apiKeys]);

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const newKey = {
      id: 'key-' + Date.now(),
      name: newKeyName.trim(),
      key: 'calvras_sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };
    setApiKeys(prev => [newKey, ...prev]);
    setNewKeyName('');
  };

  const handleDeleteKey = (id) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
  };

  const handleCopy = (id, val) => {
    navigator.clipboard.writeText(val);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#1B1B1D] text-white p-6 sm:p-10 select-none">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Code2 size={18} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Developer Portal
              </h1>
            </div>
            <p className="text-sm text-neutral-400">
              Manage your Calvras API keys, endpoints, and headless integrations.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#17171d] border border-white/[0.08] rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('keys')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'keys' ? 'bg-[#0084ff] text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Key size={14} />
              <span>API Keys</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('quickstart')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'quickstart' ? 'bg-[#0084ff] text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Terminal size={14} />
              <span>Quickstart</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('connectors')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'connectors' ? 'bg-[#0084ff] text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers size={14} />
              <span>Connectors</span>
            </button>
          </div>
        </div>

        {/* Tab 1: API Keys */}
        {activeTab === 'keys' && (
          <div className="space-y-6">
            {/* Create Key Box */}
            <div className="p-5 rounded-2xl bg-[#141419] border border-white/[0.08] space-y-3">
              <h3 className="text-sm font-semibold text-white">Create New Secret API Key</h3>
              <p className="text-xs text-neutral-400">
                Keys grant programmatic access to the Calvras AI inference and autonomous coding endpoints. Keep them safe.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                <input
                  type="text"
                  placeholder="Key name (e.g. Production Backend)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="flex-1 bg-[#1c1c24] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 outline-none focus:border-neutral-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleCreateKey}
                  disabled={!newKeyName.trim()}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0084ff] hover:bg-[#0073e6] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Plus size={15} strokeWidth={2.5} />
                  <span>Generate Key</span>
                </button>
              </div>
            </div>

            {/* Keys List */}
            <div className="rounded-2xl bg-[#141419] border border-white/[0.08] overflow-hidden">
              <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Active Keys ({apiKeys.length})</span>
                <span className="text-[11px] text-neutral-500">Prefix: calvras_sk_live_</span>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {apiKeys.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors">
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{item.name}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                      </div>
                      <div className="font-mono text-xs text-neutral-400 bg-black/40 px-2.5 py-1 rounded-lg inline-block truncate max-w-sm">
                        {item.key.slice(0, 16)}••••••••••••••••{item.key.slice(-4)}
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        Created {item.created} • Last used: {item.lastUsed}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.key)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 hover:text-white text-xs transition-colors cursor-pointer"
                      >
                        {copiedKeyId === item.id ? (
                          <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteKey(item.id)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete key"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Base URL info */}
            <div className="p-4 rounded-xl bg-blue-500/[0.06] border border-blue-500/20 flex items-start gap-3 text-xs">
              <Cpu size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-medium text-white">API Endpoint URL</div>
                <div className="font-mono text-neutral-300">https://calvras.com/api/v1/chat/completions</div>
                <div className="text-neutral-400 text-[11px]">Compatible with standard OpenAI SDKs and tools.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Quickstart */}
        {activeTab === 'quickstart' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-[#141419] border border-white/[0.08] space-y-3">
              <h3 className="text-sm font-semibold text-white">cURL API Call</h3>
              <pre className="p-4 rounded-xl bg-black/60 font-mono text-xs text-neutral-300 overflow-x-auto border border-white/[0.06]">
{`curl https://calvras.com/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_CALVRAS_API_KEY" \\
  -d '{
    "model": "SHIKARI2/Malvos-32B-Merged",
    "messages": [
      {"role": "user", "content": "Build a complete authentication dashboard in React"}
    ]
  }'`}
              </pre>
            </div>

            <div className="p-5 rounded-2xl bg-[#141419] border border-white/[0.08] space-y-3">
              <h3 className="text-sm font-semibold text-white">Python (OpenAI SDK)</h3>
              <pre className="p-4 rounded-xl bg-black/60 font-mono text-xs text-neutral-300 overflow-x-auto border border-white/[0.06]">
{`from openai import OpenAI

client = OpenAI(
    base_url="https://calvras.com/api/v1",
    api_key="YOUR_CALVRAS_API_KEY"
)

response = client.chat.completions.create(
    model="SHIKARI2/Malvos-32B-Merged",
    messages=[
        {"role": "user", "content": "Duplicate this landing page UI with 10/10 accuracy"}
    ]
)
print(response.choices[0].message.content)`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Connectors */}
        {activeTab === 'connectors' && (
          <div className="p-12 rounded-2xl bg-[#141419] border border-white/[0.08] text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 mx-auto">
              <Layers size={22} />
            </div>
            <h3 className="text-base font-semibold text-white">No connectors for now</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              No connectors for now, coming soon.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
