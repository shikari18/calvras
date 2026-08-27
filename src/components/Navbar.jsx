import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export const Navbar = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
    onNavigate('home', id);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1c1c1c]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo matching Lovart/Calvras minimalist style (No White Background, +5px size) */}
        <button 
          onClick={() => onNavigate('home', 'hero')}
          className="flex items-center gap-2.5 group cursor-pointer transition-opacity hover:opacity-90"
        >
          <img 
            src="/calvras.png" 
            alt="Calvras Logo" 
            className="w-[33px] h-[33px] rounded-lg object-contain shadow-sm"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/calvras-icon.png';
            }}
          />
          <span className="font-bold text-lg tracking-tight text-white font-sans">
            Calvras
          </span>
        </button>

        {/* Desktop Navigation (Home, Solutions ▾, Explore, Pricing) */}
        <nav className="hidden md:flex items-center gap-9">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="text-[13.5px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>

          {/* Solutions Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              onMouseEnter={() => setSolutionsOpen(true)}
              className="flex items-center gap-1 text-[13.5px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
            >
              <span>Solutions</span>
              <ChevronDown size={14} className={`transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>

            {solutionsOpen && (
              <div 
                onMouseLeave={() => setSolutionsOpen(false)}
                className="absolute top-full left-0 mt-2 w-56 bg-[#161714] border border-white/10 rounded-2xl p-2 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150"
              >
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/5 transition"
                >
                  <div className="font-semibold text-white">Brand Architecture</div>
                  <div className="text-[11px] text-neutral-400">Complete visual & copy identities</div>
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/5 transition"
                >
                  <div className="font-semibold text-white">Multi-Channel Ads</div>
                  <div className="text-[11px] text-neutral-400">Meta, TikTok, Google & LinkedIn</div>
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/5 transition"
                >
                  <div className="font-semibold text-white">Conversion & Retention</div>
                  <div className="text-[11px] text-neutral-400">Landing page copy & email flows</div>
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-[13.5px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Explore
          </button>
          
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="text-[13.5px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Pricing
          </button>
        </nav>

        {/* Desktop CTA Pill Button */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => onNavigate('signin')} 
            className="text-[13.5px] font-medium text-neutral-300 hover:text-white transition-colors px-3 py-1.5 cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={() => onNavigate('get-started')} 
            className="bg-white hover:bg-neutral-100 text-neutral-950 text-[13.5px] font-bold px-5 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-lg active:scale-95 cursor-pointer"
          >
            Get started
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden w-9 h-9 rounded-xl border border-white/10 bg-[#161714] flex items-center justify-center text-neutral-200 hover:text-white transition cursor-pointer active:scale-95"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Full-Screen Luxury Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-[#1c1c1c]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200">
          
          {/* Top Bar with Logo & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <img 
                src="/calvras.png" 
                alt="Calvras" 
                className="w-7 h-7 rounded-lg bg-white p-0.5 object-contain" 
              />
              <span className="font-bold text-lg tracking-tight text-white font-sans">
                Calvras
              </span>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-[#1c1c1c] text-white flex items-center justify-center transition cursor-pointer active:scale-95"
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Links */}
          <div className="space-y-6 text-left py-8">
            <button onClick={() => scrollToSection('hero')} className="block text-2xl font-serif text-neutral-200 hover:text-white">Home</button>
            <button onClick={() => scrollToSection('how-it-works')} className="block text-2xl font-serif text-neutral-200 hover:text-white">Solutions & Workflows</button>
            <button onClick={() => scrollToSection('pricing')} className="block text-2xl font-serif text-neutral-200 hover:text-white">Pricing Plans</button>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigate('get-started'); }} 
              className="w-full py-3.5 rounded-full bg-white text-neutral-950 font-bold text-sm text-center shadow-md active:scale-95"
            >
              Get started
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
