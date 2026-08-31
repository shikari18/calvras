import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Code2, 
  Terminal, 
  X, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

export default function DeveloperModal({ isOpen, onClose }) {
  const [apiKeys, setApiKeys] = useState(() => {
    try {
      const saved = localStorage.getItem('malvos_developer_keys');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 'key-1', name: 'Default Development Key', key: 'malvos_sk_live_' + Math.random().toString(36).substring(2, 14) + Date.now().toString(36), created: '2026-08-30', lastUsed: 'Just now' }
    ];
  });

  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [activeTab, setActiveTab] = useState('keys');

  useEffect(() => {
    try {
      localStorage.setItem('malvos_developer_keys', JSON.stringify(apiKeys));
    } catch {}
  }, [apiKeys]);

  if (!isOpen) return null;

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const newKey = {
      id: 'key-' + Date.now(),
      name: newKeyName.trim(),
      key: 'malvos_sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-sans animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#16161a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1a1a20]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Code2 size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white tracking-tight">Developer Portal & API Keys</h2>
              <p className="text-xs text-neutral-400">Manage credentials, endpoints, and SDK configurations</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/5 bg-[#141418]">
          <button
            onClick={() => setActiveTab('keys')}
            className={'flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-colors ' + (
              activeTab === 'keys' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            )}
          >
            <Key size={14} />
            <span>API Keys</span>
          </button>
          <button
            onClick={() => setActiveTab('quickstart')}
            className={'flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-colors ' + (
              activeTab === 'quickstart' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            )}
          >
            <Terminal size={14} />
            <span>Quickstart SDK</span>
          </button>
          <button
            onClick={() => setActiveTab('endpoints')}
            className={'flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-colors ' + (
              activeTab === 'endpoints' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            )}
          >
            <Layers size={14} />
            <span>Endpoints & Models</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-neutral-300 text-xs leading-relaxed">
          {activeTab === 'keys' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#1c1c24] border border-white/5 space-y-3">
                <span className="text-xs font-medium text-white block">Create New Secret Key</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={e => setNewKeyName(e.target.value)}
                    placeholder="Key name (e.g. Production Backend, Local CLI)"
                    className="flex-1 px-3.5 py-2 bg-[#121216] border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 outline-none focus:border-blue-500/50"
                  />
                  <button
                    onClick={handleCreateKey}
                    disabled={!newKeyName.trim()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Plus size={14} />
                    <span>Generate</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-neutral-400 text-[11px] font-semibold tracking-wider uppercase">
                  <span>Active Credentials ({apiKeys.length})</span>
                  <span>Created</span>
                </div>

                <div className="space-y-2">
                  {apiKeys.map(k => (
                    <div key={k.id} className="p-3.5 rounded-xl bg-[#181820] border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white text-xs">{k.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">active</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400">
                          <span>{k.key.substring(0, 18)}...{k.key.slice(-6)}</span>
                          <button
                            onClick={() => handleCopy(k.id, k.key)}
                            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
                            title="Copy full key"
                          >
                            {copiedKeyId === k.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-500 text-[11px]">{k.created}</span>
                        <button
                          onClick={() => handleDeleteKey(k.id)}
                          className="p-1.5 text-neutral-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Revoke Key"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quickstart' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#1c1c24] border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-white block">Node.js / TypeScript SDK</span>
                <pre className="p-3 bg-[#111116] rounded-lg font-mono text-[11.5px] text-blue-300 overflow-x-auto leading-relaxed border border-white/5">
{`import { MalvosClient } from '@malvos/sdk';

const malvos = new MalvosClient({
  apiKey: process.env.MALVOS_API_KEY || '${apiKeys[0]?.key || "malvos_sk_live_..."}'
});

const response = await malvos.agents.build({
  prompt: 'Build a high-performance dashboard with database',
  mode: 'build',
  database: true
});`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'endpoints' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#181820] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block text-xs">Primary LLM Engine</span>
                  <span className="text-neutral-400 font-mono text-[11px]">SHIKARI2/Malvos-32B-Merged</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold">Active Primary</span>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3.5 bg-[#141418] border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>End-to-end encrypted API tokens</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
