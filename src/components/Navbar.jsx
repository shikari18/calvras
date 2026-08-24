import React, { useState, useEffect } from 'react';
import { BrandBurstLogo } from './cy/CySidebar';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/85 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-3.5' 
          : 'bg-white/60 backdrop-blur-xs py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home', 'hero')}
          className="flex items-center gap-2.5 group cursor-pointer transition-opacity hover:opacity-90"
        >
          <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
            <BrandBurstLogo size={18} />
          </div>
          <span className="font-bold text-[17px] tracking-tight text-neutral-950 font-serif">
            Calvras
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('hero')} className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer">Product</button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer">How it works</button>
          <button onClick={() => scrollToSection('pricing')} className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer">Pricing</button>
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <button onClick={() => onNavigate('signin')} className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer">Sign In</button>
          <button onClick={() => onNavigate('get-started')} className="bg-purple-600 hover:bg-purple-700 text-white text-[13.5px] font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-sm active:scale-95 cursor-pointer">Get Started</button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-neutral-700 hover:text-neutral-950">
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-neutral-200 px-6 py-5 shadow-xl space-y-4 text-left">
          <div className="flex flex-col space-y-3 font-medium text-sm text-neutral-700">
            <button onClick={() => scrollToSection('hero')} className="text-left py-1 hover:text-neutral-950">Product</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-left py-1 hover:text-neutral-950">How it works</button>
            <button onClick={() => scrollToSection('pricing')} className="text-left py-1 hover:text-neutral-950">Pricing</button>
          </div>
          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2.5">
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('signin'); }} className="w-full text-center py-2 text-sm font-medium text-neutral-700">Sign In</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('get-started'); }} className="w-full bg-purple-600 text-white text-sm font-semibold py-2.5 rounded-full">Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
};
