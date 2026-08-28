import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Paperclip, ArrowRight } from 'lucide-react';

export default function InteractiveQuestionCard({
  questions = [],
  onSelectOption,
  onSkip,
  onClose,
  onSubmitAll
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;

  const handleOptionClick = (option, optIndex) => {
    const newAnswers = {
      ...selectedAnswers,
      [currentQ.id || currentIndex]: {
        question: currentQ.question,
        answer: typeof option === 'string' ? option : option.label || option.text
      }
    };
    setSelectedAnswers(newAnswers);

    if (onSelectOption) {
      onSelectOption(currentQ, option, optIndex);
    }

    // If there's a next question, go to it; otherwise submit all
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      if (onSubmitAll) {
        onSubmitAll(newAnswers);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(prev => prev + 1);
  };

  const handleSkipClick = () => {
    if (onSkip) onSkip(currentQ);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (onSubmitAll) {
      onSubmitAll(selectedAnswers);
    }
  };

  return (
    <div className="w-full max-w-[620px] mx-auto mb-3 bg-[#1e1e22] border border-[#33333a] rounded-[20px] shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-left select-none overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-[#282830]">
        <div className="flex items-center gap-2 pr-2">
          {currentQ.chip && (
            <span className="px-2 py-0.5 rounded-full bg-[#2a2a32] text-violet-300 text-[10.5px] font-semibold tracking-wide border border-[#3d3d4a]">
              {currentQ.chip}
            </span>
          )}
          <h3 className="text-[13.5px] font-medium text-white/95 leading-snug">
            {currentQ.question}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono bg-[#282830] px-2 py-0.5 rounded-full border border-[#363640]">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`hover:text-white transition-colors ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <ChevronLeft size={12} />
            </button>
            <span>{currentIndex + 1} of {totalQuestions}</span>
            <button
              onClick={handleNext}
              disabled={currentIndex === totalQuestions - 1}
              className={`hover:text-white transition-colors ${currentIndex === totalQuestions - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <ChevronRight size={12} />
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-[#282830] transition-colors ml-1"
              title="Close"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Options List */}
      <div className="p-2 space-y-1">
        {currentQ.options?.map((option, idx) => {
          const optLabel = typeof option === 'string' ? option : option.label || option.text;
          const optDesc = typeof option === 'object' ? option.desc || option.tradeoff : null;
          const isSelected = selectedAnswers[currentQ.id || currentIndex]?.answer === optLabel;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleOptionClick(option, idx)}
              className={`group flex items-center justify-between w-full px-3 py-2.5 rounded-[12px] text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-violet-600/20 border border-violet-500/40 text-white'
                  : 'bg-[#25252b] hover:bg-[#2e2e36] text-neutral-200 hover:text-white border border-transparent hover:border-[#3d3d48]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-mono font-medium ${
                  isSelected 
                    ? 'bg-violet-500 text-white' 
                    : 'bg-[#1e1e24] text-neutral-400 group-hover:text-white'
                }`}>
                  {idx + 1}
                </span>
                <div>
                  <span className="text-[13px] font-normal tracking-tight">{optLabel}</span>
                  {optDesc && (
                    <span className="text-[11px] text-neutral-400 ml-2 font-light">— {optDesc}</span>
                  )}
                </div>
              </div>

              <ArrowRight size={13} className="text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>
          );
        })}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-[#282830] bg-[#1a1a1e] text-xs">
        <button
          type="button"
          onClick={() => handleOptionClick('Other (custom input)', -1)}
          className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-200 transition-colors py-1 px-2 rounded-lg hover:bg-[#25252b]"
        >
          <Paperclip size={12} className="text-neutral-400" />
          <span className="text-[11.5px]">Something else</span>
        </button>

        <button
          type="button"
          onClick={handleSkipClick}
          className="px-3 py-1 rounded-lg text-neutral-400 hover:text-white bg-[#25252b] hover:bg-[#2f2f38] transition-colors text-[11.5px] font-medium"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
