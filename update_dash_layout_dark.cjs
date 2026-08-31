const fs = require('fs');

// Get Started Page
fs.writeFileSync('src/pages/GetStartedPage.jsx', `import React, { useState } from 'react';
import { SparkleIcon } from '../components/SparkleIcon';
import { Check, Eye, EyeOff, Loader2 } from 'lucide-react';

export const GetStartedPage = ({ onNavigate, onLoginSuccess, initialIsSignIn = false }) => {
  const [isSignIn, setIsSignIn] = useState(initialIsSignIn);
  const [fullName, setFullName] = useState('Samuel Mensah');
  const [workEmail, setWorkEmail] = useState('samuel@sneakerplug.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignIn && !agreedToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess();
    }, 200);
  };

  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex flex-col justify-between relative overflow-x-hidden font-sans select-none">
      
      {/* Top Navbar */}
      <header className="w-full py-4 px-6 md:px-12 border-b border-white/10 bg-[#090a0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <SparkleIcon size={18} className="text-purple-400" />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white">
              AI Marketing Assistant
            </span>
          </button>

          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setIsSignIn(true)}
              className={\`text-[13.5px] font-medium transition-colors cursor-pointer \${
                isSignIn ? 'text-purple-400 font-bold' : 'text-neutral-400 hover:text-white'
              }\`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsSignIn(false)}
              className="bg-white hover:bg-neutral-200 text-black text-[13.5px] font-extrabold px-5 py-2 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10 w-full relative flex items-center">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-radial from-purple-900/15 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full">
          
          {/* Left Column */}
          <div className="lg:col-span-6 text-left lg:pr-6">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
              <span className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-purple-300">
                AI MARKETING ASSISTANT
              </span>
            </div>

            <h1 className="text-[44px] sm:text-[58px] lg:text-[68px] font-extrabold text-white tracking-[-0.04em] leading-[1.02] mb-5">
              {isSignIn ? (
                <>Welcome<br />back.</>
              ) : (
                <>Let’s get<br />you started.</>
              )}
            </h1>

            <p className="text-[16px] sm:text-[18px] text-neutral-400 font-normal leading-relaxed mb-8 max-w-md">
              {isSignIn 
                ? 'Sign in to monitor live campaigns, review AI optimizations, and grow your business.'
                : 'Create your account and start building smarter marketing in minutes.'
              }
            </p>

            <div className="space-y-3">
              {[
                'No credit card required',
                'Set up in less than 60 seconds',
                'Cancel anytime'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-purple-500/60 bg-purple-950/60 flex items-center justify-center text-purple-400 shrink-0">
                    <Check size={11} strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] font-medium text-neutral-300">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Poster Tagline Callout */}
            <div className="mt-8 p-4 rounded-2xl bg-[#13141f] border border-white/10 max-w-sm flex items-center gap-3">
              <span className="text-xl">💬</span>
              <div>
                <span className="text-[11px] font-bold text-white block">I BUILD. YOU BRING THE PROBLEM.</span>
                <span className="text-[10px] text-neutral-400">Your marketing team now — powered by AI.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Account Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[440px] bg-[#13141f] rounded-[26px] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.8)] p-6 sm:p-7 text-left">
              
              <div className="text-center mb-4">
                <h2 className="text-[20px] sm:text-[22px] font-extrabold text-white tracking-tight mb-1">
                  {isSignIn ? 'Sign in to your account' : 'Create your account'}
                </h2>
                <p className="text-[12px] text-neutral-400 font-normal">
                  {isSignIn 
                    ? 'Enter your credentials to get started with AI Marketing Assistant.'
                    : 'Enter your details to get started with AI Marketing Assistant.'
                  }
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-2 mb-4">
                <button 
                  type="button"
                  onClick={() => handleSocialAuth('Google')}
                  className="w-full flex items-center justify-center gap-3 py-2 px-3 bg-[#181926] hover:bg-[#202232] border border-white/10 rounded-xl text-[13px] font-bold text-white transition active:scale-[0.99] cursor-pointer shadow-sm"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button 
                  type="button"
                  onClick={() => handleSocialAuth('Apple')}
                  className="w-full flex items-center justify-center gap-3 py-2 px-3 bg-[#181926] hover:bg-[#202232] border border-white/10 rounded-xl text-[13px] font-bold text-white transition active:scale-[0.99] cursor-pointer shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.65-.79 1.1-1.9 0.98-3.01-0.96.04-2.12.64-2.8 1.44-.59.68-1.12 1.8-0.98 2.89 1.07.08 2.15-.53 2.8-1.32z" />
                  </svg>
                  <span>Continue with Apple</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center mb-3">
                <div className="border-t border-white/10 w-full" />
                <span className="bg-[#13141f] px-2.5 text-[11px] font-bold text-neutral-500 uppercase">or</span>
                <div className="border-t border-white/10 w-full" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {!isSignIn && (
                  <div>
                    <label className="text-[11.5px] font-bold text-neutral-300 block mb-1">Full name</label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full text-[13px] bg-[#181926] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-900/30 transition"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11.5px] font-bold text-neutral-300 block mb-1">Work email</label>
                  <input 
                    id="work-email-input"
                    type="email" 
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full text-[13px] bg-[#181926] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-900/30 transition"
                  />
                </div>

                <div>
                  <label className="text-[11.5px] font-bold text-neutral-300 block mb-1">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full text-[13px] bg-[#181926] border border-white/10 rounded-xl pl-3 pr-9 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-900/30 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer p-1"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {!isSignIn && (
                  <div className="flex items-start gap-2 pt-0.5">
                    <input 
                      type="checkbox" 
                      id="terms-check"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 w-3.5 h-3.5 rounded border-neutral-600 bg-neutral-800 text-purple-600 focus:ring-purple-500 cursor-pointer accent-purple-600"
                    />
                    <label htmlFor="terms-check" className="text-[11px] text-neutral-400 leading-snug cursor-pointer select-none">
                      I agree to the <a href="#" className="text-purple-400 hover:underline font-bold">Terms of Service</a> and <a href="#" className="text-purple-400 hover:underline font-bold">Privacy Policy</a>
                    </label>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-neutral-200 text-black font-extrabold text-[13.5px] py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Opening workspace...</span>
                    </>
                  ) : (
                    <span>{isSignIn ? 'Sign in' : 'Create account'}</span>
                  )}
                </button>
              </form>

              <div className="mt-3.5 text-center text-[11.5px] text-neutral-400">
                {isSignIn ? (
                  <span>Don't have an account? <button onClick={() => setIsSignIn(false)} className="text-purple-400 font-bold hover:underline cursor-pointer">Sign up</button></span>
                ) : (
                  <span>Already have an account? <button onClick={() => setIsSignIn(true)} className="text-purple-400 font-bold hover:underline cursor-pointer">Sign in</button></span>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Bottom Trust Logos Bar */}
      <footer className="w-full py-5 px-6 md:px-12 border-t border-white/10 bg-[#090a0f]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-7 text-neutral-500">
          <span className="text-[11.5px] font-bold text-neutral-400 whitespace-nowrap">
            Trusted by ambitious businesses worldwide
          </span>
          <span className="hidden md:inline-block w-px h-3.5 bg-white/10" />
          
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-70">
            <div className="flex items-center gap-1.5 font-bold tracking-widest text-[11px] text-neutral-300 uppercase">
              <span className="text-purple-400 text-xs">❖</span> NEXORA
            </div>
            <div className="flex items-center gap-1.5 font-bold tracking-widest text-[11px] text-neutral-300 uppercase">
              <span className="text-neutral-400 text-[10px]">Ⓛ</span> LUMEN
            </div>
            <div className="flex items-center gap-1.5 font-bold tracking-wider text-[11px] text-neutral-300">
              <span className="text-neutral-400 text-[10px]">✪</span> Catalyst
            </div>
            <div className="flex items-center gap-1.5 font-bold tracking-widest text-[11px] text-neutral-300 uppercase">
              <span className="text-neutral-400 text-[10px]">🛡️</span> VERVE
            </div>
            <div className="flex items-center gap-1.5 font-bold tracking-widest text-[11px] text-neutral-300 uppercase">
              <span className="text-neutral-400 text-[10px]">❖</span> HORIZON
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

// Dashboard Layout
fs.writeFileSync('src/pages/dashboard/DashboardLayout.jsx', `import React, { useState } from 'react';
import { SparkleIcon } from '../../components/SparkleIcon';
import { 
  Home, 
  Send, 
  FileText, 
  Calendar,
  Users, 
  BarChart2, 
  Mic, 
  Puzzle, 
  Settings, 
  Crown, 
  ChevronDown, 
  Bell, 
  Plus, 
  LogOut,
  Sparkles,
  Search,
  PanelLeftClose,
  PanelLeft,
  Menu,
  X
} from 'lucide-react';

export const DashboardLayout = ({ 
  activeTab = 'home', 
  onSelectTab, 
  onNavigate, 
  onOpenNewCampaign,
  children 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, badge: null },
    { id: 'campaigns', label: 'Campaigns', icon: Send, badge: '5 Active' },
    { id: 'content', label: 'Content Studio', icon: FileText, badge: null },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: '3 Soon' },
    { id: 'audience', label: 'Audience & Leads', icon: Users, badge: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, badge: '+28%' },
    { id: 'brand-voice', label: 'Brand Voice', icon: Mic, badge: null },
    { id: 'integrations', label: 'Integrations', icon: Puzzle, badge: '4' },
    { id: 'settings', label: 'Settings & Credits', icon: Settings, badge: null },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#090a0f] flex text-white font-sans antialiased">
      
      {/* Pinned Non-Scrolling Desktop Left Sidebar (Dark Titanium Finish) */}
      <aside 
        className={\`hidden lg:flex flex-col justify-between bg-[#101119] border-r border-white/10 h-screen shrink-0 select-none z-30 transition-all duration-300 ease-in-out \${
          sidebarCollapsed ? 'w-20 p-3' : 'w-64 p-5'
        }\`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Brand Logo & Collapse Toggle */}
          <div className="flex items-center justify-between pb-6 mb-2 border-b border-white/10">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group overflow-hidden"
              title="Return to Landing Page"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 transition-transform group-hover:rotate-45 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <SparkleIcon size={20} className="text-purple-400" />
              </div>
              {!sidebarCollapsed && (
                <div className="text-left overflow-hidden">
                  <span className="font-extrabold text-[15px] tracking-tight block leading-tight text-white">
                    AI Market
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-400 tracking-wide block">
                    Assistant
                  </span>
                </div>
              )}
            </div>

            {/* Sidebar Collapse Toggle Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-neutral-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition cursor-pointer"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1 overflow-y-auto py-2 pr-0.5 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer \${
                    sidebarCollapsed ? 'justify-center px-2' : 'justify-between'
                  } \${
                    isActive 
                      ? 'bg-purple-600/20 text-purple-300 font-extrabold border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }\`}
                >
                  <div className="flex items-center gap-3">
                    <Icon 
                      size={17} 
                      className={isActive ? 'text-purple-400' : 'text-neutral-500'} 
                    />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>

                  {!sidebarCollapsed && item.badge && (
                    <span className={\`text-[10px] font-bold px-2 py-0.5 rounded-full \${
                      isActive ? 'bg-purple-500/30 text-purple-200 border border-purple-400/30' : 'bg-white/5 text-neutral-400'
                    }\`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Bottom Widgets */}
          <div className="pt-3 border-t border-white/10 space-y-3 shrink-0">
            
            {/* Upgrade Widget */}
            {!sidebarCollapsed ? (
              <div className="bg-gradient-to-br from-[#181926] to-[#12131e] border border-white/10 rounded-2xl p-3.5 text-left">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-purple-300 font-bold text-xs">
                    <Crown size={14} className="text-purple-400 fill-purple-400" />
                    <span>Growth Plan</span>
                  </div>
                  <span className="text-[10px] bg-purple-950 border border-purple-500/30 text-purple-300 font-bold px-1.5 py-0.5 rounded">GHS 249/mo</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden my-2">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full w-[62%]" />
                </div>
                <div className="flex items-center justify-between text-[10.5px] text-neutral-400 font-medium">
                  <span>1,250 / 2,000 Credits</span>
                  <span className="text-purple-400 font-bold cursor-pointer hover:underline" onClick={() => onSelectTab('settings')}>Refill</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-center" title="1,250 Credits remaining">
                <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 text-xs font-bold">
                  🪙
                </div>
              </div>
            )}

            {/* User Profile Bar */}
            <div className="relative">
              <div 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={\`flex items-center rounded-xl hover:bg-white/5 cursor-pointer transition p-1.5 \${
                  sidebarCollapsed ? 'justify-center' : 'justify-between'
                }\`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-md">
                    SP
                  </div>
                  {!sidebarCollapsed && (
                    <div className="text-left overflow-hidden">
                      <span className="font-bold text-xs text-white block truncate max-w-[110px]">
                        SneakerPlug Accra
                      </span>
                      <span className="text-[10px] text-neutral-400 block font-normal">
                        Retail & E-commerce
                      </span>
                    </div>
                  )}
                </div>
                {!sidebarCollapsed && <ChevronDown size={14} className="text-neutral-400 shrink-0" />}
              </div>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#181926] rounded-xl shadow-2xl border border-white/15 p-1.5 z-50 text-left text-xs space-y-1">
                  <button 
                    onClick={() => { setUserMenuOpen(false); onNavigate('home'); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-2 text-neutral-200 cursor-pointer"
                  >
                    <Home size={14} />
                    <span>Website Home</span>
                  </button>
                  <button 
                    onClick={() => { setUserMenuOpen(false); onSelectTab('brand-voice'); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-2 text-neutral-200 cursor-pointer"
                  >
                    <Mic size={14} />
                    <span>Brand Settings</span>
                  </button>
                  <button 
                    onClick={() => { setUserMenuOpen(false); onNavigate('get-started'); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-950/40 flex items-center gap-2 text-red-400 cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </aside>

      {/* Independently Scrolling Right Main Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0 bg-[#090a0f]">
        
        {/* Global Top Dashboard Bar */}
        <header className="bg-[#101119]/90 backdrop-blur-md border-b border-white/10 px-6 py-3.5 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-neutral-200 bg-white/5 hover:bg-purple-950 hover:text-purple-300 px-2.5 py-1.5 rounded-lg border border-white/10 transition cursor-pointer"
                title="Show Sidebar"
              >
                <PanelLeft size={15} />
                <span>Show Sidebar</span>
              </button>
            )}

            {/* Mobile Sidebar Hamburger */}
            <button 
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 text-neutral-300 hover:bg-white/5 rounded-lg"
            >
              {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Breadcrumb indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400">Workspace</span>
              <span className="text-neutral-600">/</span>
              <span className="font-bold text-white capitalize">
                {activeTab.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Ask AI or search anything..."
                className="text-xs bg-[#181926] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 w-48 lg:w-64 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Credits Counter */}
            <div 
              onClick={() => onSelectTab('settings')}
              className="bg-[#181926] hover:bg-[#202232] border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-neutral-200 transition cursor-pointer"
            >
              <span>🪙</span>
              <span>1,250</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => alert("Notifications: 1. 'Weekend Sneaker Promo' is live. 2. 342 Leads generated this week.")}
                className="p-2 bg-[#181926] hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 transition cursor-pointer"
              >
                <Bell size={15} />
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                3
              </span>
            </div>

            {/* Create Campaign Primary Action (Crisp White Capsule) */}
            <button 
              onClick={onOpenNewCampaign}
              className="bg-white hover:bg-neutral-200 text-black text-xs font-extrabold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer"
            >
              <Plus size={15} />
              <span className="hidden sm:inline">New Campaign</span>
            </button>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#090a0f]">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};
`, 'utf8');

console.log('GetStartedPage and DashboardLayout updated to dark titanium luxury');
