const fs = require('fs');

// 1. NAVBAR
fs.writeFileSync('src/components/Navbar.jsx', `import React, { useState, useEffect } from 'react';
import { SparkleIcon } from './SparkleIcon';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    onNavigate('home', id);
  };

  return (
    <header 
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        isScrolled 
          ? 'bg-[#090a0f]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3.5' 
          : 'bg-[#090a0f]/60 backdrop-blur-sm py-4'
      }\`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => onNavigate('home', 'hero')}
          className="flex items-center gap-2.5 group cursor-pointer transition-opacity hover:opacity-90"
        >
          <div className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <SparkleIcon size={18} className="text-purple-400" />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-white">
            AI Marketing Assistant
          </span>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-[13.5px] font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Product
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-[13.5px] font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            How it works
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="text-[13.5px] font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Pricing
          </button>
        </nav>

        {/* Right CTA buttons */}
        <div className="hidden md:flex items-center gap-5">
          <button 
            onClick={() => onNavigate('signin')}
            className="text-[13.5px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={() => onNavigate('get-started')}
            className="bg-white hover:bg-neutral-200 text-black text-[13.5px] font-extrabold px-5 py-2 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0f17]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 shadow-2xl space-y-4 text-left">
          <div className="flex flex-col space-y-3 font-medium text-sm text-neutral-300">
            <button onClick={() => scrollToSection('hero')} className="text-left py-1 hover:text-white">Product</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-left py-1 hover:text-white">How it works</button>
            <button onClick={() => scrollToSection('pricing')} className="text-left py-1 hover:text-white">Pricing</button>
          </div>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigate('signin'); }}
              className="w-full text-center py-2 text-sm font-medium text-neutral-200"
            >
              Sign In
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigate('get-started'); }}
              className="w-full bg-white text-black text-sm font-extrabold py-2.5 rounded-full"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
`, 'utf8');

// 2. HERO
fs.writeFileSync('src/components/Hero.jsx', `import React, { useState } from 'react';
import { SparkleIcon } from './SparkleIcon';
import { 
  ArrowRight, 
  Send, 
  Bell, 
  MoreHorizontal, 
  LayoutDashboard, 
  Megaphone, 
  FileText, 
  Bot, 
  BarChart2, 
  ChevronDown,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock
} from 'lucide-react';

export const Hero = ({ onNavigate, onSelectCampaign }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [chatInput, setChatInput] = useState('');
  const [chatResponses, setChatResponses] = useState([
    { sender: 'ai', text: 'Footwear audience identified in Accra. Ready to deploy a 3-day weekend boost with 4.2x predicted ROI.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handlePromptClick = (promptText) => {
    setChatInput(promptText);
    triggerAiResponse(promptText);
  };

  const handleSendChat = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    triggerAiResponse(chatInput);
  };

  const triggerAiResponse = (query) => {
    const userMessage = query || chatInput;
    setIsTyping(true);
    setChatResponses(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');

    setTimeout(() => {
      let reply = '';
      if (userMessage.toLowerCase().includes('weekend') || userMessage.toLowerCase().includes('sneaker')) {
        reply = 'Generated "Sneaker Weekend Flash Promo": 3 Instagram reels, 1 WhatsApp broadcast to 1,240 contacts, and TikTok ads targeting 18–34 sneakerheads.';
      } else if (userMessage.toLowerCase().includes('content') || userMessage.toLowerCase().includes('arrival')) {
        reply = 'Created 6 aesthetic multi-channel posts highlighting new arrivals with your brand voice and high-intent hashtags.';
      } else if (userMessage.toLowerCase().includes('performance') || userMessage.toLowerCase().includes('analyze')) {
        reply = 'Last week achieved 9.7% engagement rate (+28% MoM). Recommended allocating GHS 50 more budget to Saturday WhatsApp drops.';
      } else {
        reply = "Strategy compiled for " + userMessage + ". Generated tailored assets, schedule, and optimized target persona.";
      }
      setChatResponses(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#090a0f] text-white">
      {/* Studio Top Spotlight Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-radial from-purple-600/15 via-indigo-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-5 text-left">
            {/* Small uppercase overline */}
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
              <Sparkles size={13} className="text-purple-400" />
              <span className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-purple-300">
                AI MARKETING ASSISTANT
              </span>
            </div>

            {/* Massive Bold Headline (Matching Poster Weight) */}
            <h1 className="text-[46px] sm:text-[58px] lg:text-[72px] font-extrabold text-white tracking-[-0.04em] leading-[1.02] mb-6">
              Meet your<br />
              new marketing<br />
              team.
            </h1>

            {/* Subtitle Underneath */}
            <p className="text-[17px] sm:text-[19px] text-neutral-400 font-normal leading-relaxed mb-9 max-w-[480px]">
              One intelligent workspace that creates campaigns, publishes content, understands your customers, and helps your business grow.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => onNavigate('get-started')}
                className="bg-white hover:bg-neutral-200 text-black font-extrabold text-[15px] px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
              >
                Get started
              </button>

              <button 
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-neutral-300 hover:text-white transition-colors py-2 cursor-pointer"
              >
                <span>Explore AI Assistant</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating Product Reveal Mockup (Dark Titanium Hardware Finish) */}
          <div className="lg:col-span-7 perspective-1000">
            <div className="perspective-mockup bg-[#12131b] rounded-[24px] sm:rounded-[30px] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_50px_rgba(147,51,234,0.15)] overflow-hidden transition-all duration-500 text-white">
              
              {/* Product Window Top Bar */}
              <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-[#161722]/80 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <SparkleIcon size={16} className="text-purple-400" />
                  <span className="text-xs font-bold text-neutral-200 tracking-tight">AI Marketing Assistant</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <div className="relative">
                    <Bell size={14} className="hover:text-white cursor-pointer" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                    SP
                  </div>
                  <MoreHorizontal size={14} className="hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Product Body: Sidebar + Main Workspace */}
              <div className="flex min-h-[380px] sm:min-h-[420px] text-left">
                {/* Left Mini Sidebar */}
                <div className="w-32 sm:w-40 border-r border-white/10 p-3 flex flex-col justify-between bg-[#0e0f17]/60">
                  <div className="space-y-1">
                    {[
                      { name: 'Overview', icon: LayoutDashboard },
                      { name: 'Campaigns', icon: Megaphone },
                      { name: 'Content', icon: FileText },
                      { name: 'AI Assistant', icon: Bot },
                      { name: 'Analytics', icon: BarChart2 }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.name;
                      return (
                        <button
                          key={item.name}
                          onClick={() => setActiveTab(item.name)}
                          className={\`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all \${
                            isActive 
                              ? 'bg-purple-950/80 text-purple-300 border border-purple-500/30' 
                              : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                          }\`}
                        >
                          <Icon size={13} className={isActive ? 'text-purple-400' : 'text-neutral-500'} />
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom AI Spark button in sidebar */}
                  <div className="pt-3 border-t border-white/10">
                    <button 
                      onClick={() => handlePromptClick('Analyze audience engagement patterns')}
                      className="w-full flex items-center justify-center py-1.5 px-2 rounded-lg bg-purple-900/40 text-purple-300 hover:bg-purple-900/70 border border-purple-500/30 transition text-[11px] font-semibold gap-1.5 cursor-pointer"
                    >
                      <Sparkles size={13} className="text-purple-400" />
                      <span>AI Copilot</span>
                    </button>
                  </div>
                </div>

                {/* Right Main Dashboard Area */}
                <div className="flex-1 p-4 sm:p-5 overflow-hidden flex flex-col justify-between bg-[#12131b]">
                  <div>
                    {/* Top Row: Overview title & Period */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-white tracking-tight">Overview</h3>
                      <button className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 hover:text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-md transition">
                        <span>This month</span>
                        <ChevronDown size={11} />
                      </button>
                    </div>

                    {/* 4 Stat Cards Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                      {[
                        { label: 'Active campaigns', value: '12', wave: 'M0,15 Q20,5 40,12 T80,8' },
                        { label: 'Content created', value: '242', wave: 'M0,18 Q20,10 40,16 T80,6' },
                        { label: 'Audience reach', value: '68.3K', wave: 'M0,14 Q20,16 40,8 T80,4' },
                        { label: 'Engagement rate', value: '9.7%', wave: 'M0,16 Q20,8 40,14 T80,6' },
                      ].map((stat, i) => (
                        <div key={i} className="bg-[#181924] rounded-xl p-2.5 border border-white/10 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-400 font-medium block leading-tight">{stat.label}</span>
                            <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">{stat.value}</span>
                          </div>
                          <div className="h-6 w-full mt-1.5 flex items-end">
                            <svg className="w-full h-5 stroke-purple-400 fill-none" viewBox="0 0 80 20">
                              <path d={stat.wave} strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Split View: Recent campaigns vs AI Assistant */}
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      
                      {/* Left: Recent campaigns with Real Photos */}
                      <div className="bg-[#181924] rounded-xl p-3 border border-white/10 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block mb-2">Recent campaigns</span>
                          <div className="space-y-2">
                            {[
                              { title: 'Summer Collection Drop', date: 'Jul 12 - Aug 12', status: 'Live', isLive: true, img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200&auto=format&fit=crop&q=80' },
                              { title: 'Sneaker Weekend Promo', date: 'Jul 10 - Jul 12', status: 'Live', isLive: true, img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=200&auto=format&fit=crop&q=80' },
                              { title: 'Back to School Drive', date: 'Jul 5 - Jul 20', status: 'Draft', isLive: false, img: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=200&auto=format&fit=crop&q=80' }
                            ].map((c, idx) => (
                              <div 
                                key={idx} 
                                onClick={() => onSelectCampaign(c)}
                                className="flex items-center justify-between text-left p-1.5 rounded-lg hover:bg-white/5 transition cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <img src={c.img} alt="" className="w-7 h-7 rounded-md object-cover" />
                                  <div>
                                    <p className="text-[11px] font-bold text-white truncate max-w-[110px]">{c.title}</p>
                                    <p className="text-[9.5px] text-neutral-400">{c.date}</p>
                                  </div>
                                </div>
                                <span className={\`text-[9.5px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 \${
                                  c.isLive 
                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                                    : 'bg-neutral-800 text-neutral-300'
                                }\`}>
                                  {c.isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                                  {c.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button 
                          onClick={() => onNavigate('get-started')}
                          className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-2.5 pt-2 border-t border-white/10 cursor-pointer"
                        >
                          <span>View all campaigns</span>
                          <span>→</span>
                        </button>
                      </div>

                      {/* Right: AI Assistant Interactive Box */}
                      <div className="bg-[#181924] rounded-xl p-3 border border-white/10 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-white">AI Assistant</span>
                            <SparkleIcon size={12} className="text-purple-400" />
                          </div>
                          <p className="text-[10px] text-neutral-400 mb-2">Ask anything about your marketing</p>

                          {/* Chat display */}
                          <div className="text-[10.5px] bg-[#101118] rounded-lg p-2 border border-white/10 mb-2 max-h-16 overflow-y-auto space-y-1">
                            {chatResponses.slice(-2).map((msg, i) => (
                              <div key={i} className={\`\${msg.sender === 'user' ? 'text-white font-medium' : 'text-purple-300'}\`}>
                                {msg.sender === 'user' ? '› ' : '✦ '}{msg.text}
                              </div>
                            ))}
                            {isTyping && <div className="text-neutral-500 text-[10px] italic">AI is generating strategy...</div>}
                          </div>

                          {/* Input */}
                          <form onSubmit={handleSendChat} className="relative mb-2">
                            <input 
                              type="text" 
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              placeholder="Type your question..."
                              className="w-full text-[10.5px] bg-[#101118] border border-white/15 rounded-lg pl-2.5 pr-7 py-1.5 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition"
                            />
                            <button 
                              type="submit"
                              className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-purple-600 text-white rounded-md hover:bg-purple-500 transition cursor-pointer"
                            >
                              <Send size={10} />
                            </button>
                          </form>
                        </div>

                        {/* Suggested chips */}
                        <div>
                          <div className="space-y-1">
                            {[
                              "Plan a weekend campaign",
                              "Create content for new arrivals",
                              "Analyze last week's performance"
                            ].map((prompt, pIdx) => (
                              <button
                                key={pIdx}
                                onClick={() => handlePromptClick(prompt)}
                                className="w-full text-left text-[10px] text-neutral-300 bg-[#101118] hover:bg-purple-950/60 hover:text-purple-200 px-2 py-1 rounded-md border border-white/10 hover:border-purple-500/40 transition truncate block cursor-pointer"
                              >
                                {prompt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
`, 'utf8');

console.log('Navbar and Hero updated to dark titanium luxury');
