import React, { useState } from 'react';
import { X, KeyRound } from 'lucide-react';

export default function GitHubTokenModal({ onClose, onSave }) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    const t = token.trim();
    if (!t.startsWith('ghp_') && !t.startsWith('github_pat_')) {
      setError('Token should start with ghp_ or github_pat_');
      return;
    }
    localStorage.setItem('malvos_gh_token', t);
    onSave(t);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[rgb(32,32,32)] border border-[rgb(60,60,60)] rounded-2xl p-6 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <KeyRound size={18} className="text-blue-400" />
          <h2 className="font-semibold text-[15px]">GitHub Personal Access Token</h2>
        </div>

        <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
          Required to push changes. Generate one at{' '}
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            github.com/settings/tokens
          </a>{' '}
          with <strong className="text-white">repo</strong> scope.
        </p>

        <input
          type="password"
          value={token}
          onChange={e => { setToken(e.target.value); setError(''); }}
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          className="w-full bg-[rgb(40,40,40)] border border-[rgb(60,60,60)] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-blue-500 font-mono mb-2"
          autoFocus
        />

        {error && <p className="text-rose-400 text-xs mb-3">{error}</p>}

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-[rgb(45,45,45)] hover:bg-[rgb(55,55,55)] text-neutral-300 text-sm font-medium border border-[rgb(60,60,60)] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl bg-[#0084ff] hover:bg-[#0074e0] text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Save Token
          </button>
        </div>
      </div>
    </div>
  );
}
