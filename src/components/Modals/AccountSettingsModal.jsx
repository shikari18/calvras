import React from 'react';
import { X, User, Zap, Shield, Key, Users, CreditCard } from 'lucide-react';

export default function AccountSettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#18181c] border border-[#2f2f38] rounded-3xl p-6 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#23232c] hover:bg-[#2c2c36] transition-colors"
        >
          <X size={17} />
        </button>

        <div className="mb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            D
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">DARK Workspace</h2>
            <p className="text-xs text-neutral-400">dark@coded.ai · Free Developer Plan</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-[#20202a] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap size={16} className="text-amber-400" />
              <div>
                <div className="text-xs font-semibold text-white">Monthly AI Credits</div>
                <div className="text-[11px] text-neutral-400">4,820 / 5,000 credits remaining</div>
              </div>
            </div>
            <button className="px-3 py-1 rounded-lg bg-pink-500 hover:bg-pink-400 text-white text-xs font-bold transition-colors">
              Top Up
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#20202a] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-base">🤗</span>
                <div>
                  <div className="text-xs font-semibold text-white">Hugging Face API Key</div>
                  <div className="text-[10.5px] text-neutral-400">Primary model: <code className="text-blue-400">SHIKARI2/Malvos-32B</code></div>
                </div>
              </div>
            </div>
            <input
              type="password"
              placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxx"
              defaultValue={localStorage.getItem('malvos_hf_token') || ''}
              onChange={(e) => localStorage.setItem('malvos_hf_token', e.target.value.trim())}
              className="w-full px-3 py-1.5 rounded-xl bg-[#16161c] border border-[#2f2f38] text-xs text-white placeholder-neutral-500 font-mono outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-[#20202a] border border-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Key size={14} className="text-blue-400" />
                <span>Failover Pool</span>
              </div>
              <div className="text-[10px] text-neutral-400 mt-1">Qwen 2.5 32B · DeepSeek V3 · Codestral · Llama 3.3</div>
            </div>

            <div className="p-3 rounded-xl bg-[#20202a] border border-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Shield size={14} className="text-emerald-400" />
                <span>Zero Downtime</span>
              </div>
              <div className="text-[10px] text-neutral-400 mt-1">4-tier automatic failover active</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t border-[#25252e]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#262632] hover:bg-[#303040] text-xs font-semibold text-white transition-colors"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
}
