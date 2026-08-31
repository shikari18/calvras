import React, { useState } from 'react';
import { SparkleIcon } from './SparkleIcon';
import { X, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AuthModal = ({ isOpen, onClose, initialMode = 'signup', selectedPlan = 'Growth' }) => {
  const [mode, setMode] = useState(initialMode);
  const [brandName, setBrandName] = useState('Aura Athletics');
  const [industry, setIndustry] = useState('Fashion & Apparel');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-7 border border-neutral-100 shadow-2xl relative text-left">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-5 top-5 text-neutral-400 hover:text-neutral-900 p-1 rounded-full transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <SparkleIcon size={18} className="text-purple-600" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-purple-600">AI MARKETING ASSISTANT</span>
            </div>

            <h3 className="text-2xl font-bold text-neutral-950 tracking-tight mb-2">
              {mode === 'signup' ? 'Launch your workspace' : 'Welcome back'}
            </h3>
            <p className="text-xs text-neutral-500 font-normal mb-6">
              {mode === 'signup' 
                ? `Selected plan: ${selectedPlan}. Initialize your intelligent AI marketing copilot in 10 seconds.` 
                : 'Sign in to access your active campaigns and performance dashboards.'
              }
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-neutral-800 block mb-1">Brand or Business Name</label>
                    <input 
                      type="text" 
                      required
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. Aura Athletics"
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-purple-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-800 block mb-1">Industry</label>
                    <select 
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-purple-600 focus:bg-white transition"
                    >
                      <option>Fashion & Apparel</option>
                      <option>Tech & SaaS</option>
                      <option>E-Commerce Retail</option>
                      <option>Health & Wellness</option>
                      <option>Agency / Consulting</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-semibold text-neutral-800 block mb-1">Work Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs py-3 rounded-full transition flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Configuring AI models...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'signup' ? 'Start Free Trial' : 'Sign In to Workspace'}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-5 text-center text-xs text-neutral-500">
              {mode === 'signup' ? (
                <span>Already have an account? <button onClick={() => setMode('signin')} className="text-purple-700 font-semibold hover:underline cursor-pointer">Sign In</button></span>
              ) : (
                <span>Don't have an account? <button onClick={() => setMode('signup')} className="text-purple-700 font-semibold hover:underline cursor-pointer">Get Started</button></span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-200">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-950 mb-2">Workspace Ready!</h3>
            <p className="text-xs text-neutral-500 mb-6">
              AI Marketing Assistant has calibrated for <strong>{brandName || 'your brand'}</strong> ({industry}).
            </p>
            <button 
              onClick={onClose}
              className="bg-neutral-950 text-white text-xs font-medium px-8 py-3 rounded-full hover:bg-neutral-800 transition cursor-pointer"
            >
              Enter Workspace
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
