import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Search, 
  Send, 
  MessageSquare, 
  Home as HomeIcon, 
  HelpCircle, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Bot, 
  User, 
  ChevronRight,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';

export default function CustomerServiceWidget({ isOpen, onClose, onNavigateHelp, onNavigateLegal }) {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'messages' | 'help'
  const [searchQuery, setSearchQuery] = useState('');
  const [supportMessages, setSupportMessages] = useState(() => [
    {
      id: 'welcome',
      role: 'agent',
      name: 'Calvras Assistant',
      content: 'Hi there! 👋 How can we help you build today? Feel free to ask about workspace features, billing, API keys, or report any bug.',
      time: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'messages' && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [supportMessages, activeTab]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputMsg).trim();
    if (!text) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      name: 'You',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSupportMessages(prev => [...prev, userMsg]);
    setInputMsg('');
    setActiveTab('messages');
    setIsReplying(true);

    setTimeout(() => {
      let replyText = "Thanks for reaching out! Our autonomous support system has logged this inquiry. If this is an urgent workspace or billing issue, our core engineering team will assist within 15 minutes.";
      const lower = text.toLowerCase();
      if (lower.includes('bill') || lower.includes('plan') || lower.includes('refund') || lower.includes('price')) {
        replyText = "All subscriptions and billing are secured by Paystack with an automatic 14-day refund guarantee. You can manage or upgrade your plan anytime under Settings > Upgrade Plan.";
      } else if (lower.includes('test') || lower.includes('bug') || lower.includes('error')) {
        replyText = "Calvras includes autonomous code testing and self-healing. If you encounter any syntax or module error in your preview, simply type 'test and fix this' or click 'undo' to revert safely.";
      } else if (lower.includes('search') || lower.includes('browse') || lower.includes('web')) {
        replyText = "Calvras now has full live web search and deep browsing capabilities. You can ask it to 'search for X' or 'check https://example.com and build exact UI' directly in the main prompt.";
      }

      const botReply = {
        id: `agent-${Date.now()}`,
        role: 'agent',
        name: 'Calvras Assistant',
        content: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSupportMessages(prev => [...prev, botReply]);
      setIsReplying(false);
    }, 900);
  };

  const helpArticles = [
    { title: 'Autonomous Testing & Error Fixing', category: 'Engineering', excerpt: 'How Calvras automatically tests imports, syntax, and live preview rendering.' },
    { title: 'Web Search & Page Duplication', category: 'Features', excerpt: 'Browse any public website, extract design tokens, and build matching React components.' },
    { title: 'Undoing Changes & Workspace Snapshots', category: 'Editor', excerpt: 'Type "undo" or "revert" in the chat to restore previous code and state instantly.' },
    { title: 'Subscription & Daily Chat Limits', category: 'Billing', excerpt: 'Understanding the standard daily chat limits and upgrading to Pro or Team.' }
  ];

  const filteredArticles = searchQuery.trim()
    ? helpArticles.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    : helpArticles;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[400px] h-[580px] max-h-[85vh] bg-[#1B1B1C] text-white rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.9)] flex flex-col z-50 overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200">
      
      {/* ── Top Header ── */}
      <div className="p-4 bg-[#141416] border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Bot size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-white">Calvras Support</span>
            </div>
            {/* Status Indicator */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-emerald-400">All Systems Operational</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          title="Close Support"
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Main Tab Content ── */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-[#1B1B1C]">
        
        {/* ── TAB: HOME ── */}
        {activeTab === 'home' && (
          <div className="p-4 space-y-4">
            
            {/* Welcome Greeting Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1F1F23] to-[#171719] border border-white/[0.08]">
              <h3 className="text-base font-bold text-white mb-1">How can we help today?</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Connect directly with Calvras AI support, search our knowledge base, or submit technical feedback.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('messages')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#1A1A1A] hover:bg-white/[0.06] border border-white/[0.08] transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">Send us a message</div>
                    <div className="text-[11px] text-neutral-400">Instant AI response & 24/7 routing</div>
                  </div>
                </div>
                <ChevronRight size={15} className="text-neutral-500 group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={() => setActiveTab('help')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#1A1A1A] hover:bg-white/[0.06] border border-white/[0.08] transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <HelpCircle size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">Search help center</div>
                    <div className="text-[11px] text-neutral-400">Guides, APIs, and tutorials</div>
                  </div>
                </div>
                <ChevronRight size={15} className="text-neutral-500 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Common Topics */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Common Questions</div>
              <div className="space-y-1.5">
                {[
                  'How do I test my code automatically?',
                  'Can I revert or undo my last changes?',
                  'How does Calvras search and clone websites?',
                  'What are the daily chat limits?'
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="w-full p-2.5 rounded-lg bg-[#1A1A1A] hover:bg-white/[0.06] border border-white/[0.06] text-left text-xs text-neutral-300 hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{q}</span>
                    <ChevronRight size={13} className="text-neutral-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Paystack Guarantee Pill */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5">
              <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
              <span className="text-[11px] text-neutral-400 leading-normal">
                All subscriptions protected by Paystack with 14-day satisfaction guarantee.
              </span>
            </div>
          </div>
        )}

        {/* ── TAB: MESSAGES (Mini Bot Chat) ── */}
        {activeTab === 'messages' && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-0">
              {supportMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[11px] font-medium text-neutral-400">{msg.name}</span>
                    <span className="text-[10px] text-neutral-600">{msg.time}</span>
                  </div>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-[#1A1A1A] text-neutral-200 border border-white/10 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isReplying && (
                <div className="flex items-center gap-2 p-3 bg-[#1A1A1A] rounded-2xl rounded-bl-none border border-white/10 w-fit text-xs text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="ml-1 text-[11px]">Calvras is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Dock */}
            <div className="p-3 bg-[#141416] border-t border-white/[0.08] flex-shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Ask customer service..."
                  className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/60"
                />
                <button
                  type="submit"
                  disabled={!inputMsg.trim() || isReplying}
                  className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 rounded-xl text-white transition-colors cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── TAB: HELP ── */}
        {activeTab === 'help' && (
          <div className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help articles..."
                className="w-full pl-9 pr-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Articles List */}
            <div className="space-y-2">
              {filteredArticles.map((article, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    if (onNavigateHelp) {
                      onNavigateHelp();
                      onClose();
                    }
                  }}
                  className="p-3 rounded-xl bg-[#1A1A1A] hover:bg-white/[0.06] border border-white/[0.08] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">{article.category}</span>
                    <ChevronRight size={13} className="text-neutral-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors mb-1">{article.title}</h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                if (onNavigateHelp) {
                  onNavigateHelp();
                  onClose();
                }
              }}
              className="w-full py-2.5 text-center text-xs text-blue-400 hover:text-blue-300 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/[0.08] transition-colors cursor-pointer"
            >
              Open Full Support Center →
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom Navigation Dock (Home, Messages, Help) ── */}
      <div className="grid grid-cols-3 bg-[#141416] border-t border-white/[0.08] p-1.5 flex-shrink-0">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-blue-400 bg-white/[0.06]' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <HomeIcon size={16} />
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-colors cursor-pointer relative ${
            activeTab === 'messages' ? 'text-blue-400 bg-white/[0.06]' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <MessageSquare size={16} />
          <span className="text-[10px] font-medium mt-0.5">Messages</span>
          {supportMessages.length > 1 && (
            <span className="absolute top-1 right-7 w-1.5 h-1.5 rounded-full bg-blue-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('help')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'help' ? 'text-blue-400 bg-white/[0.06]' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <HelpCircle size={16} />
          <span className="text-[10px] font-medium mt-0.5">Help</span>
        </button>
      </div>

    </div>
  );
}
