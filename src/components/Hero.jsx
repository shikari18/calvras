import React, { useState } from 'react';
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
  Loader2
} from 'lucide-react';
import { chatWithMarketingCopilot, DEFAULT_BUSINESS_PROFILE } from '../services/aiService';

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
    if (!chatInput.trim() || isTyping) return;
    triggerAiResponse(chatInput);
  };

  const triggerAiResponse = async (query) => {
    const userMessage = query || chatInput;
    setIsTyping(true);
    setChatResponses(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');

    try {
      const aiReply = await chatWithMarketingCopilot({
        userMessage: userMessage,
        businessProfile: DEFAULT_BUSINESS_PROFILE
      });
      setChatResponses(prev => [...prev, { sender: 'ai', text: aiReply.slice(0, 160) + '...' }]);
    } catch (err) {
      console.warn('AI copilot fallback:', err);
      let reply = '';
      if (userMessage.toLowerCase().includes('weekend') || userMessage.toLowerCase().includes('sneaker')) {
        reply = 'Generated "Sneaker Weekend Flash Promo": 3 Instagram reels, 1 WhatsApp broadcast to 1,240 contacts, and TikTok ads targeting 18–34 sneakerheads.';
      } else {
        reply = "Strategy compiled for " + userMessage + ". Generated tailored assets, schedule, and optimized target persona.";
      }
      setChatResponses(prev => [...prev, { sender: 'ai', text: reply }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white text-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100">
              <Sparkles size={13} className="text-purple-600" />
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-purple-900">
                AI MARKETING ASSISTANT
              </span>
            </div>

            <h1 className="text-[46px] sm:text-[58px] lg:text-[72px] font-bold text-neutral-950 tracking-[-0.04em] leading-[1.02] mb-6">
              Meet your<br />
              new marketing<br />
              team.
            </h1>

            <p className="text-[17px] sm:text-[19px] text-neutral-500 font-normal leading-relaxed mb-9 max-w-[480px]">
              One intelligent workspace that creates campaigns, publishes content, understands your customers, and helps your business grow.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[15px] px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
              >
                Launch Workspace
              </button>

              <button 
                onClick={() => onNavigate('new-campaign')}
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-neutral-600 hover:text-neutral-950 transition-colors py-2 cursor-pointer"
              >
                <span>New Campaign Studio</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 perspective-1000">
            <div className="perspective-mockup bg-white rounded-[24px] sm:rounded-[30px] border border-neutral-200/80 shadow-2xl overflow-hidden transition-all duration-500 text-neutral-950">
              
              <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
                <div className="flex items-center gap-2.5">
                  <SparkleIcon size={16} className="text-purple-600" />
                  <span className="text-xs font-bold text-neutral-900 tracking-tight">AI Marketing Assistant (OpenRouter Live)</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <Bell size={14} className="hover:text-neutral-700 cursor-pointer" />
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                    SP
                  </div>
                  <MoreHorizontal size={14} className="hover:text-neutral-700 cursor-pointer" />
                </div>
              </div>

              <div className="flex min-h-[380px] sm:min-h-[420px] text-left">
                <div className="w-32 sm:w-40 border-r border-neutral-100 p-3 flex flex-col justify-between bg-neutral-50/40">
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
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isActive 
                              ? 'bg-purple-50 text-purple-700 font-bold border border-purple-100' 
                              : 'text-neutral-600 hover:bg-neutral-100/70'
                          }`}
                        >
                          <Icon size={13} className={isActive ? 'text-purple-600' : 'text-neutral-400'} />
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-neutral-100">
                    <button 
                      onClick={() => handlePromptClick('Analyze audience engagement patterns')}
                      className="w-full flex items-center justify-center py-1.5 px-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100 transition text-[11px] font-semibold gap-1.5 cursor-pointer"
                    >
                      <Sparkles size={13} className="text-purple-600" />
                      <span>AI Copilot</span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-4 sm:p-5 overflow-hidden flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Overview</h3>
                      <button className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md transition">
                        <span>This month</span>
                        <ChevronDown size={11} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                      {[
                        { label: 'Active campaigns', value: '12', wave: 'M0,15 Q20,5 40,12 T80,8' },
                        { label: 'Content created', value: '242', wave: 'M0,18 Q20,10 40,16 T80,6' },
                        { label: 'Audience reach', value: '68.3K', wave: 'M0,14 Q20,16 40,8 T80,4' },
                        { label: 'Engagement rate', value: '9.7%', wave: 'M0,16 Q20,8 40,14 T80,6' },
                      ].map((stat, i) => (
                        <div key={i} className="bg-neutral-50/70 rounded-xl p-2.5 border border-neutral-100 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-500 font-medium block leading-tight">{stat.label}</span>
                            <span className="text-sm sm:text-base font-bold text-neutral-900 mt-0.5 block">{stat.value}</span>
                          </div>
                          <div className="h-6 w-full mt-1.5 flex items-end">
                            <svg className="w-full h-5 stroke-purple-600 fill-none" viewBox="0 0 80 20">
                              <path d={stat.wave} strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="bg-neutral-50/70 rounded-xl p-3 border border-neutral-100 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-bold text-neutral-900 block mb-2">Recent campaigns</span>
                          <div className="space-y-2">
                            {[
                              { title: 'Summer Collection Drop', date: 'Jul 12 - Aug 12', status: 'Live', isLive: true, img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200&auto=format&fit=crop&q=80' },
                              { title: 'Sneaker Weekend Promo', date: 'Jul 10 - Jul 12', status: 'Live', isLive: true, img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=200&auto=format&fit=crop&q=80' },
                              { title: 'Back to School Drive', date: 'Jul 5 - Jul 20', status: 'Draft', isLive: false, img: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=200&auto=format&fit=crop&q=80' }
                            ].map((c, idx) => (
                              <div key={idx} onClick={() => onSelectCampaign(c)} className="flex items-center justify-between text-left p-1.5 rounded-lg hover:bg-white transition cursor-pointer">
                                <div className="flex items-center gap-2">
                                  <img src={c.img} alt="" className="w-7 h-7 rounded-md object-cover" />
                                  <div>
                                    <p className="text-[11px] font-bold text-neutral-900 truncate max-w-[110px]">{c.title}</p>
                                    <p className="text-[9.5px] text-neutral-400">{c.date}</p>
                                  </div>
                                </div>
                                <span className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                  c.isLive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-neutral-100 text-neutral-600'
                                }`}>
                                  {c.isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                                  {c.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button onClick={() => onNavigate('dashboard')} className="text-[11px] font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 mt-2.5 pt-2 border-t border-neutral-100 cursor-pointer">
                          <span>View all campaigns</span><span>→</span>
                        </button>
                      </div>

                      <div className="bg-neutral-50/70 rounded-xl p-3 border border-neutral-100 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-neutral-900">AI Assistant</span>
                            <SparkleIcon size={12} className="text-purple-600" />
                          </div>
                          <p className="text-[10px] text-neutral-400 mb-2">Ask anything about your marketing</p>
                          <div className="text-[10.5px] bg-white rounded-lg p-2 border border-neutral-100 mb-2 max-h-20 overflow-y-auto space-y-1">
                            {chatResponses.slice(-2).map((msg, i) => (
                              <div key={i} className={`${msg.sender === 'user' ? 'text-neutral-900 font-medium' : 'text-purple-700 font-medium'}`}>
                                {msg.sender === 'user' ? '› ' : '✦ '}{msg.text}
                              </div>
                            ))}
                            {isTyping && (
                              <div className="text-purple-600 text-[10px] font-semibold flex items-center gap-1.5">
                                <Loader2 size={11} className="animate-spin" />
                                <span>AI strategist generating plan...</span>
                              </div>
                            )}
                          </div>
                          <form onSubmit={handleSendChat} className="relative mb-2">
                            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type your question..." className="w-full text-[10.5px] bg-white border border-neutral-200 rounded-lg pl-2.5 pr-7 py-1.5 text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-purple-600 transition" />
                            <button type="submit" disabled={isTyping} className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-purple-600 text-white rounded-md hover:bg-purple-700 transition cursor-pointer"><Send size={10} /></button>
                          </form>
                        </div>
                        <div className="space-y-1">
                          {["Plan a weekend campaign", "Create content for new arrivals", "Analyze last week's performance"].map((prompt, pIdx) => (
                            <button key={pIdx} onClick={() => handlePromptClick(prompt)} className="w-full text-left text-[10px] text-neutral-600 bg-white hover:bg-purple-50 hover:text-purple-700 px-2 py-1 rounded-md border border-neutral-100 hover:border-purple-100 transition truncate block cursor-pointer">{prompt}</button>
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
    </section>
  );
};
