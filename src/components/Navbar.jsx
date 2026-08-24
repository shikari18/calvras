import React, { useState, useEffect } from 'react';
import { BrandBurstLogo } from './cy/CySidebar';
import { Menu, X, Sparkles, Workflow, CreditCard, ArrowRight, LogIn } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-3' 
          : 'bg-white/70 backdrop-blur-xs py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => onNavigate('home', 'hero')}
          className="flex items-center gap-2.5 group cursor-pointer transition-opacity hover:opacity-90"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-50/90 border border-purple-100 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-2xs">
            <BrandBurstLogo size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-neutral-950 font-serif">
            Calvras
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('hero')} className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer">Product</button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer">How it works</button>
          <button onClick={() => scrollToSection('pricing')} className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer">Pricing</button>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => onNavigate('signin')} 
            className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors px-3 py-1.5 cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={() => onNavigate('get-started')} 
            className="bg-neutral-950 hover:bg-neutral-850 text-white text-[13.5px] font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden w-9 h-9 rounded-xl border border-neutral-200/80 bg-white/80 flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition cursor-pointer shadow-2xs active:scale-95"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Modern High-End Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bg-white/95 backdrop-blur-2xl border-b border-neutral-200/90 shadow-2xl p-6 space-y-6 text-left animate-in slide-in-from-top-3 fade-in duration-200 z-50 max-h-[calc(100vh-65px)] overflow-y-auto">
          
          {/* Navigation Section */}
          <div className="space-y-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 px-1 block">
              Navigation
            </span>
            
            <div className="space-y-1.5">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 active:bg-neutral-100 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100/80 flex items-center justify-center text-purple-600 shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-neutral-900 block group-hover:text-purple-600 transition">Product</span>
                    <span className="text-[11px] text-neutral-400 font-normal">Autonomous AI growth features</span>
                  </div>
                </div>
                <ArrowRight size={15} className="text-neutral-300 group-hover:text-neutral-600 transition group-hover:translate-x-0.5" />
              </button>

              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 active:bg-neutral-100 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
                    <Workflow size={16} />
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-neutral-900 block group-hover:text-indigo-600 transition">How it works</span>
                    <span className="text-[11px] text-neutral-400 font-normal">Observe, Decide, Execute loop</span>
                  </div>
                </div>
                <ArrowRight size={15} className="text-neutral-300 group-hover:text-neutral-600 transition group-hover:translate-x-0.5" />
              </button>

              <button 
                onClick={() => scrollToSection('pricing')} 
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 active:bg-neutral-100 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600 shrink-0">
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-neutral-900 block group-hover:text-emerald-600 transition">Pricing</span>
                    <span className="text-[11px] text-neutral-400 font-normal">Transparent tiers & credits</span>
                  </div>
                </div>
                <ArrowRight size={15} className="text-neutral-300 group-hover:text-neutral-600 transition group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 border-t border-neutral-100 space-y-2.5">
            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigate('signin'); }} 
              className="w-full py-3 px-4 rounded-2xl border border-neutral-200/90 hover:border-neutral-900 bg-white hover:bg-neutral-50 text-neutral-900 text-xs sm:text-[13px] font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-[0.99]"
            >
              <LogIn size={15} className="text-neutral-700" />
              <span>Sign In</span>
            </button>

            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigate('get-started'); }} 
              className="w-full py-3.5 px-4 bg-neutral-950 hover:bg-neutral-850 text-white text-xs sm:text-[13px] font-bold rounded-2xl transition shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Micro Footer Notice */}
          <div className="text-center pt-1">
            <span className="text-[10px] text-neutral-400">
              Calvras Autonomous AI Marketing OS
            </span>
          </div>

        </div>
      )}
    </header>
  );
};
