import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Share2, 
  GitFork, 
  ThumbsUp, 
  ThumbsDown, 
  MoreHorizontal, 
  FileCode,
  Bookmark,
  Sparkles,
  Eye,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Pencil,
  Code,
  ExternalLink,
  Terminal,
  BookOpen,
  Clock,
  ChevronUp,
  Layout
} from 'lucide-react';
import { splitThinkingAndContent } from '../services/aiService';
import { generateLivePreviewSrcdoc } from './ProjectWorkspacePane';

export default function ChatMessage({ message, onRegenerate, onOpenDetails, onOpenPreview, onEditMessage }) {
  const [copied, setCopied] = useState(false);
  const [showRawCode, setShowRawCode] = useState(false);
  const [isUserExpanded, setIsUserExpanded] = useState(false);
  const [liked, setLiked] = useState(null);
  const [showSources, setShowSources] = useState(false);
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(false);
  const [isComparisonCollapsed, setIsComparisonCollapsed] = useState(false);

  const isAssistant = message.role === 'assistant';

  const copyContent = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sources = [];

  // Helper to render user message text with underlined URLs
  const renderUserTextWithLinks = (text) => {
    if (!text) return text;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, idx) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 text-white hover:text-blue-400 transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const userBubbleRef = React.useRef(null);

  React.useEffect(() => {
    if (!isUserExpanded) return;
    const handleOutsideClick = (e) => {
      if (userBubbleRef.current && !userBubbleRef.current.contains(e.target)) {
        setIsUserExpanded(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [isUserExpanded]);

  if (!isAssistant) {
    const isLongMessage = (message.content || '').length > 130 || (message.content || '').split('\n').length > 3;

    return (
      <div className="flex justify-end w-full max-w-[660px] mx-auto px-4 py-1.5 animate-message-in group">
        <div className="flex flex-col items-end gap-1.5 max-w-[85%]">
          {/* Render uploaded images outside the text bubble with 100px by 100px thumbnail */}
          {message.files && message.files.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-end select-none">
              {message.files.map((file, idx) => (
                <div key={idx} className="relative w-[100px] h-[100px] rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 shadow-md flex-shrink-0">
                  {file.dataUrl || file.preview ? (
                    <img 
                      src={file.dataUrl || file.preview} 
                      alt={file.name || 'Uploaded image'} 
                      className="w-[100px] h-[100px] object-cover cursor-pointer hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(file.dataUrl || file.preview, '_blank');
                      }}
                      title="Click to view full image"
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] flex flex-col items-center justify-center p-2 text-center text-xs text-neutral-300">
                      <FileCode size={22} className="text-blue-400 mb-1" />
                      <span className="truncate w-full text-[10px]">{file.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Clean User text bubble */}
          {message.content && (
            <div
              ref={userBubbleRef}
              onClick={() => isLongMessage && setIsUserExpanded(p => !p)}
              className={`relative bg-[#262626] text-neutral-200 px-5 py-3.5 rounded-2xl text-[15.5px] font-normal shadow-sm break-words whitespace-pre-wrap leading-relaxed transition-all hover:bg-[#2c2c2c] ${isLongMessage ? 'cursor-pointer select-none' : ''} ${isLongMessage && !isUserExpanded ? 'max-h-[82px] overflow-hidden' : 'max-h-none'}`}
              title={isLongMessage ? (isUserExpanded ? "Click to collapse" : "Click to expand message") : undefined}
            >
              {renderUserTextWithLinks(message.content)}
              {isLongMessage && !isUserExpanded && (
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#262626] via-[#262626]/85 to-transparent pointer-events-none rounded-b-2xl" />
              )}
            </div>
          )}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pr-1 pt-0.5">
            <button
              type="button"
              onClick={() => copyContent(message.content)}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-[#2a2a2e] transition-all cursor-pointer select-none"
              title="Copy message"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-neutral-400" />}
            </button>
            {onEditMessage && (
              <button
                type="button"
                onClick={() => onEditMessage(message)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-[#2a2a2e] transition-all cursor-pointer select-none"
                title="Edit prompt"
              >
                <RotateCcw size={12} className="text-neutral-400" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Parse inline markdown: **bold**, `code`, <think> tags, *italic*, [link](url), raw URLs
  const renderInlineMarkdown = (text) => {
    if (!text) return text;
    const tokens = text.split(/(<think>[\s\S]*?<\/think>|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+)/g);

    return tokens.map((token, i) => {
      if (!token) return null;
      if (token.startsWith('<think>') && token.endsWith('</think>')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded-md bg-[#2d1b22] text-[#f472b6] font-mono text-[12px] border border-pink-500/20 mx-0.5 inline-block">
            {token}
          </code>
        );
      }
      if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
        const inner = token.slice(1, -1);
        const isThinkTag = inner.includes('<think>') || inner.includes('</think>');
        return (
          <code key={i} className={`px-1.5 py-0.5 rounded-md ${isThinkTag ? 'bg-[#2d1b22] text-[#f472b6] border-pink-500/20' : 'bg-[#202025] text-neutral-200 border-white/10'} font-mono text-[12px] border mx-0.5`}>
            {inner}
          </code>
        );
      }
      if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
        return (
          <strong key={i} className="font-semibold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      }
      if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
        return (
          <em key={i} className="italic text-neutral-200">
            {token.slice(1, -1)}
          </em>
        );
      }
      if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
        const match = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          return (
            <a key={i} href={match[2]} target="_blank" rel="noreferrer" className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors">
              {match[1]}
            </a>
          );
        }
      }
      if (token.startsWith('http://') || token.startsWith('https://')) {
        return (
          <a key={i} href={token} target="_blank" rel="noreferrer" className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors">
            {token}
          </a>
        );
      }
      return token;
    });
  };

  // Detect if a row is a markdown separator (e.g. |---|---|)
  const isSeparatorRow = (cells) => cells.every(cell => /^:?-+:?$/.test(cell.trim()));

  // Parse a pipe-delimited table block into header + body rows
  const parseTableBlock = (block) => {
    const rows = block.trim().split('\n').filter(r => r.trim() !== '');
    const parsed = rows.map(r =>
      r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim())
    );
    const header = parsed[0] || [];
    const body = parsed.slice(1).filter(r => !isSeparatorRow(r));
    return { header, body };
  };

  // Render a single table cell value with smart formatting:
  // ✅ / ✓ / true / yes → green tick icon
  // ✗ / ✘ / — / no / false → dash
  // Everything else → inline markdown
  const renderCellValue = (raw) => {
    // Strip surrounding ** bold markers that the AI sometimes wraps section names in
    const v = raw.trim().replace(/^\*\*(.+)\*\*$/, '$1').trim();
    if (/^(✅|✓|true|yes)$/i.test(v)) {
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-emerald-500/20 border border-emerald-500/30">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 5.5L4 8L9.5 2.5" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      );
    }
    if (/^(✗|✘|false|no)$/i.test(v)) {
      return <span className="text-neutral-600 font-medium">—</span>;
    }
    if (v === '—' || v === '-' || v === '') {
      return <span className="text-neutral-600">—</span>;
    }
    return renderInlineMarkdown(v);
  };

  const renderTableBlock = (block, key) => {
    const { header, body } = parseTableBlock(block);
    if (!header || header.length === 0) return null;
    const colCount = header.length;

    // Apple-style: same surface as input, hairline separators only, clean typography
    const BG = 'rgb(22,22,22)';
    const SEP = '1px solid rgba(255,255,255,0.07)';

    return (
      <div key={key} className="my-4 overflow-x-auto" style={{
        borderRadius: 12,
        background: BG,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
      }}>
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: SEP }}>
              {header.map((cell, ci) => (
                <th key={ci} style={{
                  padding: '13px 18px',
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.02em',
                  borderRight: ci < header.length - 1 ? SEP : 'none',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => {
              const firstCellClean = row[0]?.trim().replace(/^\*\*(.+)\*\*$/, '$1').trim();
              const isSectionHeader = row.slice(1).every(c => !c || c.trim() === '—' || c.trim() === '-' || c.trim() === '');
              const isLast = ri === body.length - 1;

              if (isSectionHeader) {
                return (
                  <tr key={ri} style={{ borderBottom: SEP, background: 'rgba(255,255,255,0.03)' }}>
                    <td colSpan={colCount} style={{
                      padding: '10px 18px',
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.35)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>
                      {firstCellClean}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={ri} style={{ borderBottom: isLast ? 'none' : SEP }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: '13px 18px',
                      fontSize: 13,
                      color: ci === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.85)',
                      fontWeight: ci === 0 ? 400 : 400,
                      borderRight: ci < row.length - 1 ? SEP : 'none',
                      lineHeight: 1.55,
                      verticalAlign: 'top',
                    }}>
                      {renderCellValue(cell)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTextLines = (text, key) => {
    const normalisedText = text
      .replace(/([^\n])\s+(\d+\.\s+[A-Z])/g, '$1\n$2')
      .replace(/(\s+-\s+)/g, '\n- ');
    const rawLines = normalisedText.split('\n');

    // Group lines into paragraphs and table blocks
    const elements = [];
    let tableBuffer = [];

    const flushTable = (idx) => {
      if (tableBuffer.length > 0) {
        elements.push(renderTableBlock(tableBuffer.join('\n'), `tbl-${idx}`));
        tableBuffer = [];
      }
    };

    rawLines.forEach((line, lIdx) => {
      const trimmed = line.trim();

      // Table line detection: starts and ends with pipe '|' or contains multiple pipes
      if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 2) {
        tableBuffer.push(trimmed);
        return;
      } else {
        flushTable(lIdx);
      }

      if (!trimmed) return;

      // File header indicator (e.g. tsx file=src/App.tsx)
      if (/^(?:tsx|jsx|js|ts|html|css|json|py|python|bash|sh)\s+file=([^\s]+)/i.test(trimmed)) {
        const match = trimmed.match(/^(?:tsx|jsx|js|ts|html|css|json|py|python|bash|sh)\s+file=([^\s]+)/i);
        elements.push(
          <div key={lIdx} className="my-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#1a1a1a] border border-white/10 font-mono text-[11.5px] text-blue-400 font-medium shadow-sm">
            <span className="text-neutral-500">file:</span>
            <span>{match[1]}</span>
          </div>
        );
        return;
      }

      // Strip solitary orphan backticks or closing artifacts
      if (trimmed === '```' || trimmed === '````' || trimmed === '`' || trimmed === ').') {
        return;
      }

      // Heading 1 (# Title)
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={lIdx} className="text-[17px] sm:text-[18px] font-bold text-white tracking-tight mt-3.5 mb-1.5 border-b border-neutral-800 pb-1.5">
            {renderInlineMarkdown(trimmed.slice(2))}
          </h1>
        );
        return;
      }

      // Heading 2 (## Subtitle)
      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={lIdx} className="text-[14.5px] sm:text-[15px] font-semibold text-neutral-100 tracking-tight mt-3 mb-1">
            {renderInlineMarkdown(trimmed.slice(3))}
          </h2>
        );
        return;
      }

      // Heading 3 (### Section)
      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={lIdx} className="text-[13.5px] font-semibold text-neutral-200 mt-2.5 mb-0.5">
            {renderInlineMarkdown(trimmed.slice(4))}
          </h3>
        );
        return;
      }

      // Heading 4 (#### Sub-section)
      if (trimmed.startsWith('#### ')) {
        elements.push(
          <h4 key={lIdx} className="text-[12.5px] font-semibold text-neutral-300 mt-2 mb-0.5">
            {renderInlineMarkdown(trimmed.slice(5))}
          </h4>
        );
        return;
      }

      // Horizontal divider
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
        elements.push(
          <div key={lIdx} className="py-2">
            <div className="h-[1px] bg-neutral-800/80 w-full" />
          </div>
        );
        return;
      }

      // Numbered section header like "0. OPERATING PRINCIPLES"
      const sectionHeaderMatch = trimmed.match(/^(\d+)\.\s+([A-Z\s\(\)]+.*)$/);
      if (sectionHeaderMatch && sectionHeaderMatch[2] === sectionHeaderMatch[2].toUpperCase() && sectionHeaderMatch[2].length > 4) {
        elements.push(
          <div key={lIdx} className="text-[13.5px] font-bold text-white uppercase tracking-wide mt-3 mb-1.5">
            {sectionHeaderMatch[1]}. {renderInlineMarkdown(sectionHeaderMatch[2])}
          </div>
        );
        return;
      }

      // Numbered list item
      const numbered = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (numbered) {
        elements.push(
          <div key={lIdx} className="flex items-start gap-2.5 text-[13.5px] text-neutral-200 mt-1.5 mb-0.5 leading-relaxed pl-1">
            <span className="text-neutral-400 font-mono text-[12.5px] mt-0.5 flex-shrink-0 font-medium">{numbered[1]}.</span>
            <span className="flex-1">{renderInlineMarkdown(numbered[2])}</span>
          </div>
        );
        return;
      }

      // Bullet items (with nested indent support)
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        const isSubBullet = line.startsWith('   ') || line.startsWith('\t') || line.startsWith('  ');
        elements.push(
          <div key={lIdx} className={`flex items-start gap-2 text-[13px] text-neutral-300 py-0.5 leading-relaxed ${isSubBullet ? 'ml-6 pl-1' : 'ml-2'}`}>
            <span className="text-neutral-500 text-[8px] mt-1.5 flex-shrink-0">●</span>
            <span className="flex-1">{renderInlineMarkdown(trimmed.replace(/^[-*•]\s+/, ''))}</span>
          </div>
        );
        return;
      }

      // Standard paragraph
      elements.push(
        <p key={lIdx} className="text-[13.5px] text-neutral-300 my-0.5 leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    });

    flushTable('end');

    return (
      <div key={key} className="space-y-1.5 text-left leading-relaxed font-sans text-neutral-300">
        {elements}
      </div>
    );
  };

  const renderFormattedContent = (content) => {
    if (!content || typeof content !== 'string') return null;

    let cleanContent = content
      .replace(/\[TOOL_CALL:.*?\]/gs, '')
      .replace(/<tool_call>.*?<\/tool_call>/gs, '')
      .replace(/\[\/?(SEARCH|FILE_WRITE|FILE_EDIT|COMMAND|TERMINAL).*?\]/g, '')
      .trim();

    if (!cleanContent) return null;

    // Check if entire message is explicitly a prompt/system-prompt template
    // (NOT generic code blocks — those are handled by the fenced-block renderer below)
    const isDocumentPrompt =
      cleanContent.startsWith('```prompt') ||
      cleanContent.startsWith('```system_prompt') ||
      cleanContent.startsWith('--- SYSTEM PROMPT') ||
      message.isPromptTemplate;

    if (isDocumentPrompt) {
      let docText = cleanContent;
      // Strip outer backticks if present
      if (docText.startsWith('````') && docText.endsWith('````')) {
        docText = docText.slice(4, -4).trim();
      } else if (docText.startsWith('```') && docText.endsWith('```')) {
        docText = docText.slice(3, -3).trim();
      }
      docText = docText.replace(/^(?:prompt|system_prompt|markdown|md|text)\n/i, '');

      return (
        <div className="relative my-2.5 rounded-2xl border border-[#383838] bg-[#262626] group shadow-sm pt-4 pb-[20px] pl-5 pr-4 text-left transition-all">
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all z-10">
            <button
              type="button"
              onClick={() => setShowRawCode(prev => !prev)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer shadow-md flex items-center gap-1 text-[11px] ${showRawCode ? 'bg-[#3d3d42] text-blue-400 border-blue-500/50' : 'bg-[#303030]/80 hover:bg-[#3d3d3d] text-neutral-400 hover:text-white border-[#444444]'}`}
              title={showRawCode ? "Switch to Formatted view" : "View raw Markdown (##)"}
            >
              <Code size={13} />
            </button>
            <button
              type="button"
              onClick={() => copyContent(docText)}
              className="p-1.5 rounded-lg bg-[#303030]/80 hover:bg-[#3d3d3d] text-neutral-400 hover:text-white border border-[#444444] transition-all cursor-pointer shadow-md flex items-center gap-1 text-[11px]"
              title="Copy prompt"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              {copied && <span className="text-emerald-400 font-mono text-[11px]">Copied</span>}
            </button>
          </div>
          <div className="pl-0.5 pr-14">
            {showRawCode ? (
              <pre className="text-[13px] font-mono text-neutral-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                <code>{docText}</code>
              </pre>
            ) : (
              renderTextLines(docText, 'unified-prompt-doc')
            )}
          </div>
        </div>
      );
    }

    // Split on fenced code blocks so they render as real code blocks
    const fenceRegex = /```(\w*)\n?([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let partIdx = 0;

    while ((match = fenceRegex.exec(cleanContent)) !== null) {
      // Text before this fence
      if (match.index > lastIndex) {
        const before = cleanContent.slice(lastIndex, match.index).trim();
        if (before) {
          parts.push(
            <div key={`text-${partIdx}`} className="text-left my-1">
              {renderTextLines(before, `pre-fence-${partIdx}`)}
            </div>
          );
        }
      }

      const lang = match[1] || 'text';
      const code = match[2];
      parts.push(
        <div key={`fence-${partIdx}`} className="my-3 rounded-xl overflow-hidden border border-[#303038] bg-[#18181f] shadow-md">
          {/* Language label + copy button */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#222230] border-b border-[#303038]">
            <span className="text-[11px] font-mono font-semibold text-neutral-400 uppercase tracking-wider">{lang || 'code'}</span>
            <button
              type="button"
              onClick={() => copyContent(code)}
              className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white px-2 py-0.5 rounded-lg hover:bg-[#2d2d3a] transition-all"
              title="Copy code"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="px-4 py-3.5 text-[12.5px] font-mono text-neutral-200 whitespace-pre overflow-x-auto leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
      partIdx++;
    }

    // Remaining text after last fence
    if (lastIndex < cleanContent.length) {
      const remaining = cleanContent.slice(lastIndex).trim();
      if (remaining) {
        parts.push(
          <div key={`text-end-${partIdx}`} className="text-left my-1">
            {renderTextLines(remaining, `post-fence-${partIdx}`)}
          </div>
        );
      }
    }

    // If we found any fences, return the split render
    if (parts.length > 0) {
      return <div className="space-y-1">{parts}</div>;
    }

    // Otherwise render standard mixed text
    return (
      <div className="text-left my-1">
        {renderTextLines(cleanContent, 'msg-content')}
      </div>
    );
  };

  // Extract thinking content if present in message using robust parser
  let rawContent = message.content || '';
  let thoughtContent = message.thinking || null;
  let cleanContent = rawContent;

  // Fallback: If message has activities containing thought
  if (!thoughtContent && message.activities && message.activities.length > 0) {
    const actThought = message.activities.find(a => a.type === 'thought');
    if (actThought) {
      thoughtContent = actThought.content;
    }
  }

  if (!thoughtContent && rawContent) {
    const parsed = splitThinkingAndContent(rawContent);
    if (parsed.thinking && parsed.content) {
      thoughtContent = parsed.thinking;
      cleanContent = parsed.content;
    }
  }

  // Clean pseudo tool calls if any model returns them
  cleanContent = cleanContent.replace(/\[TOOL_CALL\][\s\S]*?\[\/TOOL_CALL\]/gi, '').trim();
  cleanContent = cleanContent.replace(/<tool_call>[\s\S]*?<\/tool_call>/gi, '').trim();

  // Clean JSON payloads if raw string leaked into message
  if (/^(?:```json|json\s*\{|\{)/i.test(cleanContent.trim())) {
    try {
      const parsedJson = JSON.parse(cleanContent.replace(/^```json\s*/i, '').replace(/^json\s*/i, '').replace(/```$/i, '').trim());
      cleanContent = parsedJson.commentary || parsedJson.description || cleanContent;
    } catch {
      const commMatch = cleanContent.match(/"commentary":\s*"((?:\\.|[^"\\])*)"/);
      if (commMatch) cleanContent = commMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
    }
  }

  const thoughtDuration = message.thoughtDuration || '1s';

  const hasCode = Boolean(rawContent && (rawContent.includes('```tsx') || rawContent.includes('```jsx') || rawContent.includes('```html') || rawContent.includes('export default function')));

  const actionsList = (() => {
    if (message.actions && Array.isArray(message.actions) && message.actions.length > 0) {
      return message.actions;
    }
    const acts = [];
    if (hasCode) {
      acts.push({ icon: '📖', text: 'Opened workspace file scaffold' });
      acts.push({ icon: '>_', text: 'Configured React 18 TypeScript components & imports' });
      acts.push({ icon: '🧠', text: 'Synthesized design layout, color palette & typography' });
      acts.push({ icon: '🛠️', text: 'Wired interactive state, Lucide vector icons & card filters' });
      acts.push({ icon: '✓', text: 'Transpiled bundle & mounted live preview sandbox', highlight: true });
    } else if (thoughtContent) {
      acts.push({ icon: '🧠', text: 'Analyzed query & requirements' });
      acts.push({ icon: '✓', text: 'Synthesized comprehensive solution', highlight: true });
    }
    return acts;
  })();

  const mainActionLabel = message.actionLabel || (
    hasCode 
      ? 'Adapted components into workspace scaffold' 
      : (thoughtContent ? 'Reasoned through response' : null)
  );

  const appName = (() => {
    if (cleanContent) {
      const h1Match = cleanContent.match(/#+\s+([^\n]+)/);
      if (h1Match && h1Match[1].length < 40) return h1Match[1].replace(/[*`_]/g, '').trim();
      const boldMatch = cleanContent.match(/\*\*([^\n*]+)\*\*/);
      if (boldMatch && boldMatch[1].length < 40 && !boldMatch[1].includes('Updated') && !boldMatch[1].includes('Built')) return boldMatch[1].trim();
    }
    return 'Application Workspace';
  })();

  return (
    <div className="w-full max-w-[660px] mx-auto px-4 py-2.5 text-left font-sans animate-message-in">
      {/* ── Lovable/Bolt-style Action & Thinking Accordion ── */}
      {(hasCode || thoughtContent || actionsList.length > 0) && mainActionLabel && (
        <div className="mb-3.5 rounded-xl bg-[#18181c]/70 border border-neutral-800/80 overflow-hidden text-xs select-none shadow-sm">
          <div className="flex items-center justify-between px-3 py-2 bg-[#1f1f24]/60 border-b border-neutral-800/40">
            <div className="flex items-center gap-2 text-neutral-300 font-medium">
              <span className="text-sm">🧠</span>
              <span className="text-[12.5px] text-neutral-200">{mainActionLabel}</span>
            </div>
            <button
              onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1 text-[11px] text-neutral-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
                <Terminal size={10} className="text-blue-400" />
                <BookOpen size={10} className="text-amber-400" />
                <span>{actionsList.length} actions</span>
              </div>
              <span className="text-[11px] font-normal">{isThinkingExpanded ? 'Show less' : 'Show more'}</span>
              {isThinkingExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>

          {isThinkingExpanded && (
            <div className="p-3 space-y-2.5 bg-[#121215]/80">
              <div className="space-y-1.5 pl-1">
                {actionsList.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] text-neutral-400">
                    <span className="text-neutral-500 font-mono text-[11px]">{act.icon}</span>
                    <span className={act.highlight ? 'text-neutral-200 font-medium' : ''}>{act.text}</span>
                  </div>
                ))}
              </div>

              {thoughtContent && (
                <div className="mt-2 pt-2.5 border-t border-neutral-800/60">
                  <div className="text-[11px] font-semibold text-neutral-400 mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-amber-400" />
                    <span>Model Reasoning</span>
                  </div>
                  <div className="text-[12px] text-neutral-300 font-mono leading-relaxed bg-black/40 p-3 rounded-xl border border-neutral-800/60 max-h-48 overflow-y-auto whitespace-pre-wrap">
                    {thoughtContent}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Interactive Artifact Card (Website / Preview link) ── */}
      {hasCode && (
        <div className="mb-3.5 flex items-center justify-between p-3 rounded-xl bg-[#18181f] border border-neutral-800 shadow-md hover:border-neutral-700 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Layout size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">{appName}</p>
              <p className="text-[10px] text-neutral-400">Website • Live Preview</p>
            </div>
          </div>
          <button
            onClick={onOpenPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors border border-neutral-700 cursor-pointer shadow-sm"
          >
            <span>Open</span>
            <ExternalLink size={12} />
          </button>
        </div>
      )}

      {/* Main Response Content */}
      <div className="text-[15px] leading-relaxed text-[#ededed] font-normal mb-2.5 space-y-2.5">
        {renderFormattedContent(cleanContent || rawContent)}
      </div>

      {/* Sources list */}
      {showSources && sources.length > 0 && (
        <div className="mb-3 p-2.5 rounded-xl bg-[#1c1c1c] border border-[#2d2d2d] shadow-lg space-y-1.5 animate-in fade-in duration-150">
          <div className="text-[11px] font-semibold text-neutral-300 mb-0.5">Referenced Sources</div>
          {sources.map((src, i) => (
            <a
              key={i}
              href={src.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-1.5 rounded-lg bg-[#242424] hover:bg-[#2c2c2c] text-xs text-neutral-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileCode size={12} className="text-blue-400" />
                <span className="font-medium truncate max-w-[240px] text-[11px]">{src.title}</span>
              </div>
              <span className="text-[10px] text-neutral-500">{src.domain}</span>
            </a>
          ))}
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between pt-1 text-neutral-500 select-none text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-neutral-400 font-normal text-[11.5px]">
            <Clock size={12} className="text-neutral-500" />
            <span>Worked for {thoughtDuration}</span>
          </div>
          <div className="h-3 w-[1px] bg-neutral-800" />
          <button
            onClick={() => copyContent(message.content)}
            className="p-1 hover:text-neutral-200 transition-colors"
            title="Copy response"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'CODED AI', text: message.content });
              }
            }}
            className="p-1 hover:text-neutral-200 transition-colors"
            title="Share"
          >
            <Share2 size={14} />
          </button>

          <button
            onClick={onRegenerate}
            className="p-1 hover:text-neutral-200 transition-colors"
            title="Fork conversation"
          >
            <GitFork size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {sources.length > 0 && (
            <button
              onClick={() => setShowSources(!showSources)}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors px-2 py-0.5 rounded-full hover:bg-[#222222]"
            >
              <div className="flex items-center -space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-500 border border-[#161616]" />
                <div className="w-3 h-3 rounded-full bg-white border border-[#161616]" />
                <div className="w-3 h-3 rounded-full bg-orange-500 border border-[#161616]" />
              </div>
              <span className="text-[11px]">{sources.length} sources</span>
            </button>
          )}

          <button
            onClick={() => setLiked(liked === 'up' ? null : 'up')}
            className={`p-1 hover:text-neutral-200 transition-colors ${liked === 'up' ? 'text-blue-400' : ''}`}
            title="Helpful"
          >
            <ThumbsUp size={14} />
          </button>

          <button
            onClick={() => setLiked(liked === 'down' ? null : 'down')}
            className={`p-1 hover:text-neutral-200 transition-colors ${liked === 'down' ? 'text-red-400' : ''}`}
            title="Unhelpful"
          >
            <ThumbsDown size={14} />
          </button>

          <button className="p-1 hover:text-neutral-200 transition-colors" title="More">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
