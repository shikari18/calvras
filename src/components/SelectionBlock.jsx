import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Pencil, Mic } from 'lucide-react';

export default function SelectionBlock({
  question = 'Please select an option:',
  options = [],
  isMultiSelect = false,
  onSelectOption,
  disabled = false,
  totalQuestions = null,
  currentQuestion = 1,
  onSkip = null,
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [otherActive, setOtherActive] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [directText, setDirectText] = useState('');
  const [selectedIndices, setSelectedIndices] = useState([]);
  const otherInputRef = useRef(null);
  const directInputRef = useRef(null);

  useEffect(() => {
    if (otherActive && otherInputRef.current) otherInputRef.current.focus();
  }, [otherActive]);

  const submit = (value) => {
    if (disabled || !value?.trim()) return;
    onSelectOption?.(value.trim());
  };

  const handleOptionClick = (idx) => {
    if (disabled) return;
    const opt = options[idx];
    const label = typeof opt === 'string' ? opt : (opt.value || opt.label || opt.title || opt.text);
    if (!isMultiSelect) {
      setSelectedIndices([idx]);
      if (label) submit(label);
    } else {
      setSelectedIndices(prev =>
        prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
      );
    }
  };

  const handleDirectSubmit = (e) => {
    e?.preventDefault();
    submit(directText);
  };

  return (
    <div className="w-full rounded-[18px] bg-[#1c1c1c] border border-white/[0.08] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] font-sans select-none">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <span className="text-[13.5px] font-medium text-[#e5e5e5]">{question}</span>
        <div className="flex items-center gap-2">
          {totalQuestions && (
            <span className="text-[11px] text-[#555] flex items-center gap-1">
              <span className="cursor-pointer hover:text-[#888]">‹</span>
              {currentQuestion} of {totalQuestions}
              <span className="cursor-pointer hover:text-[#888]">›</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => onSelectOption?.('__skip__')}
            className="text-[#555] hover:text-[#888] text-[18px] leading-none cursor-pointer transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="divide-y divide-white/[0.05]">
        {options.map((opt, idx) => {
          const label = typeof opt === 'string' ? opt : (opt.label || opt.title || opt.text || opt.value || '');
          const detail = typeof opt === 'object' ? (opt.detail || opt.description || '') : '';
          const isSelected = selectedIndices.includes(idx);
          const isHovered = hoveredIdx === idx;

          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => handleOptionClick(idx)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 text-left transition-colors cursor-pointer ${
                isSelected ? 'bg-white/[0.08]' : isHovered ? 'bg-white/[0.05]' : ''
              }`}
            >
              {/* Number badge */}
              <div className={`w-6 h-6 rounded-[6px] flex items-center justify-center flex-shrink-0 text-[12px] font-semibold transition-colors ${
                isSelected || isHovered
                  ? 'bg-white/[0.15] text-white'
                  : 'bg-white/[0.06] text-[#666]'
              }`}>
                {idx + 1}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className={`text-[13px] font-medium transition-colors ${
                  isSelected ? 'text-white' : isHovered ? 'text-[#e5e5e5]' : 'text-[#c4c4c4]'
                }`}>
                  {label}
                </div>
                {detail && (
                  <div className="text-[11.5px] text-[#666] mt-0.5">{detail}</div>
                )}
              </div>

              {/* Arrow on hover */}
              {(isHovered || isSelected) && (
                <ArrowRight size={14} className="text-[#888] flex-shrink-0" />
              )}
            </button>
          );
        })}

        {/* Something else / Other row */}
        <div className="px-4 py-3">
          {!otherActive ? (
            <button
              type="button"
              onClick={() => setOtherActive(true)}
              className="flex items-center gap-3 text-[13px] text-[#555] hover:text-[#999] transition-colors cursor-pointer w-full"
            >
              <Pencil size={13} className="flex-shrink-0" />
              <span>Something else</span>
              {onSkip && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onSkip?.(); }}
                  className="ml-auto text-[11px] bg-white/[0.06] hover:bg-white/[0.12] px-2.5 py-1 rounded-[6px] text-[#888] hover:text-white transition-colors cursor-pointer"
                >
                  Skip
                </button>
              )}
            </button>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); submit(otherText); }} className="flex items-center gap-2">
              <Pencil size={13} className="text-[#555] flex-shrink-0" />
              <input
                ref={otherInputRef}
                type="text"
                value={otherText}
                onChange={e => setOtherText(e.target.value)}
                placeholder="Type your answer…"
                className="flex-1 bg-transparent outline-none text-[13px] text-[#e5e5e5] placeholder-[#444]"
              />
              <button
                type="submit"
                disabled={!otherText.trim()}
                className="p-1.5 rounded-lg bg-white/[0.1] hover:bg-white/[0.2] text-white disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ArrowRight size={13} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Multi-select confirm */}
      {isMultiSelect && selectedIndices.length > 0 && (
        <div className="px-4 py-3 border-t border-white/[0.06] flex justify-end">
          <button
            type="button"
            onClick={() => {
              const labels = selectedIndices.map(i => {
                const opt = options[i];
                return typeof opt === 'string' ? opt : (opt.label || opt.value || opt.title);
              });
              submit(labels.join(', '));
            }}
            className="px-4 py-2 rounded-full bg-white text-[#0f0f0e] text-[12px] font-semibold transition-colors cursor-pointer hover:bg-[#e5e5e5]"
          >
            Confirm ({selectedIndices.length})
          </button>
        </div>
      )}

      {/* Bottom: "Or reply directly" input — replaces the normal chat input */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-t border-white/[0.06] bg-[#161616]">
        <span className="text-[#444] text-[13px] flex-shrink-0">+</span>
        <form onSubmit={handleDirectSubmit} className="flex-1 flex items-center gap-2">
          <input
            ref={directInputRef}
            type="text"
            value={directText}
            onChange={e => setDirectText(e.target.value)}
            placeholder="Or reply directly…"
            className="flex-1 bg-transparent outline-none text-[13px] text-[#e5e5e5] placeholder-[#444]"
          />
        </form>
        <button
          type="button"
          className="text-[#555] hover:text-[#888] transition-colors cursor-pointer"
          title="Voice input"
        >
          <Mic size={14} />
        </button>
        <button
          type="button"
          onClick={handleDirectSubmit}
          disabled={!directText.trim()}
          className="text-[#555] hover:text-white transition-colors cursor-pointer disabled:opacity-30"
        >
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function extractSelectionQuestion(text) {
  if (!text || typeof text !== 'string') return null;

  const tagMatch = text.match(/<ask_question(?:\s+question="([^"]+)")?(?:\s+multi="([^"]+)")?>([\s\S]*?)<\/ask_question>/i);
  if (tagMatch) {
    const questionAttr = tagMatch[1] || '';
    const isMulti = tagMatch[2] === 'true';
    const innerContent = tagMatch[3];
    const options = [];
    const optionRegex = /<option\s+label="([^"]+)"(?:\s+detail="([^"]+)")?(?:\s+description="([^"]+)")?\s*\/?>/gi;
    let optMatch;
    while ((optMatch = optionRegex.exec(innerContent)) !== null) {
      options.push({ label: optMatch[1], detail: optMatch[2] || optMatch[3] || '' });
    }
    if (options.length > 0) {
      return { question: questionAttr || 'Please select an option:', options, isMultiSelect: isMulti, rawTag: tagMatch[0] };
    }
  }

  try {
    const jsonMatch = text.match(/\{[\s\S]*?"type"\s*:\s*"question"[\s\S]*?\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.question && Array.isArray(parsed.options) && parsed.options.length > 0) {
        return { question: parsed.question, options: parsed.options, isMultiSelect: !!parsed.isMultiSelect, rawTag: jsonMatch[0] };
      }
    }
  } catch {}

  return null;
}
