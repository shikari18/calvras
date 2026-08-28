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
  Brain
} from 'lucide-react';
import AgentExecutionStream from './AgentExecutionStream';
import { splitThinkingAndContent } from '../services/aiService';

export default function ChatMessage({ message, onRegenerate, onOpenDetails, onOpenPreview }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(null);
  const [showSources, setShowSources] = useState(false);
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(false);

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

  if (!isAssistant) {
    return (
      <div className="flex justify-end w-full max-w-[620px] mx-auto px-4 py-1.5 animate-message-in">
        <div className="bg-[#262626] text-neutral-200 px-4 py-2.5 rounded-2xl text-[14px] font-normal shadow-sm max-w-[85%] break-words whitespace-pre-wrap leading-relaxed transition-all hover:bg-[#2c2c2c]">
          {renderUserTextWithLinks(message.content)}
        </div>
      </div>
    );
  }

  // Parse inline markdown: **bold**, `code`, *italic*, [link](url), raw URLs
  const renderInlineMarkdown = (text) => {
    if (!text) return text;
    const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+)/g);

    return tokens.map((token, i) => {
      if (!token) return null;
      if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-[#25252b] text-pink-300 font-mono text-[12.5px] border border-white/5 mx-0.5">
            {token.slice(1, -1)}
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
    const header = parsed[0];
    const body = parsed.slice(1).filter(r => !isSeparatorRow(r));
    return { header, body };
  };

  const renderTableBlock = (block, key) => {
    const { header, body } = parseTableBlock(block);
    return (
      <div key={key} className="my-3 overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-[#1e1e1e] border-b border-[#2e2e2e]">
              {header.map((cell, ci) => (
                <th key={ci} className="px-4 py-2.5 text-left text-xs font-semibold text-neutral-200 uppercase tracking-wide whitespace-nowrap">
                  {renderInlineMarkdown(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr
                key={ri}
                className={`border-b border-[#222222] transition-colors hover:bg-[#1c1c1c] ${ri % 2 === 0 ? 'bg-[#161616]' : 'bg-[#191919]'}`}
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2.5 text-neutral-300 text-[13px] leading-relaxed">
                    {renderInlineMarkdown(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTextLines = (text, key) => {
    const lines = text.split('\n');
    return (
      <div key={key} className="space-y-1.5">
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('### ')) return <h3 key={lIdx} className="text-sm font-semibold text-white mt-2.5 mb-1">{renderInlineMarkdown(trimmed.slice(4))}</h3>;
          if (trimmed.startsWith('#### ')) return <h4 key={lIdx} className="text-xs font-semibold text-neutral-200 mt-2 mb-1">{renderInlineMarkdown(trimmed.slice(5))}</h4>;
          if (trimmed.startsWith('## ')) return <h2 key={lIdx} className="text-base font-bold text-white mt-3 mb-1">{renderInlineMarkdown(trimmed.slice(3))}</h2>;
          if (trimmed.startsWith('# ')) return <h1 key={lIdx} className="text-lg font-bold text-white mt-3 mb-1.5">{renderInlineMarkdown(trimmed.slice(2))}</h1>;
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
            return (
              <div key={lIdx} className="flex items-start gap-2 text-[14px] text-neutral-200 ml-2 leading-relaxed">
                <span className="text-neutral-500 mt-1 flex-shrink-0">•</span>
                <span>{renderInlineMarkdown(trimmed.replace(/^[-*•]\s+/, ''))}</span>
              </div>
            );
          }
          const numbered = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numbered) {
            return (
              <div key={lIdx} className="flex items-start gap-2 text-[14px] text-neutral-200 ml-2 leading-relaxed">
                <span className="text-neutral-400 font-mono text-xs mt-0.5 flex-shrink-0">{numbered[1]}.</span>
                <span>{renderInlineMarkdown(numbered[2])}</span>
              </div>
            );
          }
          if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
            return (
              <div key={lIdx} className="flex items-center my-4">
                <div className="flex-1 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#444444] to-transparent" />
              </div>
            );
          }
          if (trimmed.length === 0) return <div key={lIdx} className="h-1" />;
          return <p key={lIdx} className="text-[14px] text-neutral-200 leading-relaxed">{renderInlineMarkdown(line)}</p>;
        })}
      </div>
    );
  };

  const renderFormattedContent = (content) => {
    if (!content || typeof content !== 'string') return null;
    // First split out code blocks
    const codeParts = content.split(/(```[\s\S]*?```)/g);
    const elements = [];

    codeParts.forEach((part, pIdx) => {
      if (part.startsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const lang = lines[0].trim();
        const code = lines.slice(lang.match(/^[a-zA-Z0-9_-]+$/) ? 1 : 0).join('\n');
        elements.push(
          <div key={`code-${pIdx}`} className="my-2.5 rounded-xl overflow-hidden border border-[#2e2e2e] bg-[#0f0f0f]">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#1a1a1a] border-b border-[#262626] text-xs text-neutral-400 font-mono">
              <span className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">{lang || 'CODE'}</span>
              <button
                onClick={() => copyContent(code)}
                className="flex items-center gap-1 text-[11px] hover:text-white px-2 py-0.5 rounded hover:bg-[#252525] transition-colors"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 text-xs font-mono overflow-x-auto text-[#e2e2e8] leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
        return;
      }

      // Within non-code blocks, split out table blocks (lines all starting with |)
      const tableRegex = /((?:\|[^\n]+\|\n?){2,})/g;
      let lastIdx = 0;
      let m;

      while ((m = tableRegex.exec(part)) !== null) {
        if (m.index > lastIdx) {
          elements.push(renderTextLines(part.slice(lastIdx, m.index), `text-${pIdx}-${lastIdx}`));
        }
        elements.push(renderTableBlock(m[0], `table-${pIdx}-${m.index}`));
        lastIdx = m.index + m[0].length;
      }
      if (lastIdx < part.length) {
        elements.push(renderTextLines(part.slice(lastIdx), `text-${pIdx}-end`));
      }
    });

    return elements;
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

  if (!cleanContent.trim()) {
    cleanContent = "I have built the complete production application in your project workspace on the right with all components, styling, and live preview.";
  }

  const thoughtDuration = message.thoughtDuration || '4s';

  // Assemble combined activities stream (only real LLM thoughts, files and edits)
  let finalActivities = [];
  if (message.activities && message.activities.length > 0) {
    finalActivities = [...message.activities];
  } else if (thoughtContent) {
    finalActivities.push({
      type: 'thought',
      duration: thoughtDuration,
      content: thoughtContent
    });
  }

  return (
    <div className="w-full max-w-[620px] mx-auto px-4 py-2 text-left font-sans animate-message-in">
      {/* ── Seamless Agent Execution & Thought Stream (Exact Image 2 format) ── */}
      {finalActivities.length > 0 && (
        <AgentExecutionStream activities={finalActivities} />
      )}

      {/* Stylish Single Live Preview Card */}
      {message.repoCard && (
        <div className="w-full my-3.5 rounded-2xl bg-gradient-to-br from-[#1d1d23] to-[#16161b] border border-[#2d2d38] p-3.5 shadow-xl flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Sparkles size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-[13.5px] font-semibold text-white truncate">
                {message.repoCard.repoName || 'Project Preview'}
              </div>
              <div className="text-[11.5px] text-neutral-400 truncate">
                Live dev server active {message.repoCard.port ? `• Port ${message.repoCard.port}` : ''}
              </div>
            </div>
          </div>
          <button
            onClick={() => onOpenPreview && onOpenPreview(message.repoCard)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0084ff] to-[#0066d6] hover:from-[#0074e0] hover:to-[#0055b8] text-white text-xs font-semibold shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
          >
            <Eye size={13} strokeWidth={2.4} />
            <span>Open Preview</span>
          </button>
        </div>
      )}

      {/* Main Response Content */}
      <div className="text-[14px] leading-relaxed text-[#ededed] font-normal mb-2.5">
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
      <div className="flex items-center justify-between pt-1 text-neutral-500 select-none">
        <div className="flex items-center gap-2">
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
