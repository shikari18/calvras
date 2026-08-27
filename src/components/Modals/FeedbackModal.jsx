import React, { useState } from 'react';
import { X, Send, MessageSquare, Sparkles, Heart } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose }) {
  const [feedback, setFeedback] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFeedback('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#18181c] border border-[#2f2f38] rounded-3xl p-6 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#23232c] hover:bg-[#2c2c36] transition-colors"
        >
          <X size={17} />
        </button>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Heart className="text-rose-500" size={18} />
            <span>Send Feedback & Request Features</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Let the engineering team know what you want to build next or report any issue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            rows={4}
            placeholder="Share your thoughts, suggestions, or bug reports..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#20202a] border border-[#2e2e3a] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#252530] hover:bg-[#30303c] text-xs text-neutral-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!feedback.trim() || sent}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-pink-500/20 flex items-center gap-1.5"
            >
              {sent ? <span>Sent! Thank you ✨</span> : <><span>Send</span><Send size={12} /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
