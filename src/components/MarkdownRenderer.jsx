import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cleanAiResponse } from '../services/aiService';
import { Download, ExternalLink, Check, Copy, Loader2, Sparkles, Terminal, CheckCircle2, ChevronRight } from 'lucide-react';

const CompactImageCard = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(25);
  const [copied, setCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    if (loaded) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          clearInterval(interval);
          setLoaded(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 80);

    const timeout = setTimeout(() => {
      setLoaded(true);
      setProgress(100);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [loaded]);

  const handleImageLoad = () => {
    setProgress(100);
    setLoaded(true);
  };

  const handleImageError = () => {
    setLoaded(true);
    setProgress(100);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = imgSrc;
    link.target = '_blank';
    link.download = `Calvras_Ad_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(imgSrc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden border border-neutral-200 shadow-2xs bg-neutral-900 text-white w-full aspect-square flex flex-col justify-between transition-all hover:shadow-md hover:border-neutral-300">
      
      {/* Thinking / Progress Percentage Indicator */}
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-950/95 flex flex-col items-center justify-center p-3 text-center space-y-2 z-10">
          <Loader2 size={22} className="text-purple-400 animate-spin" />
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-neutral-300 block">Thinking...</span>
            <span className="text-[10px] font-mono text-purple-400 font-bold">{progress}%</span>
          </div>
        </div>
      )}

      {/* Top Right Action Overlay */}
      <div className="absolute top-2 right-2 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-150">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-neutral-950/85 hover:bg-neutral-900 text-white backdrop-blur-md border border-white/20 transition cursor-pointer"
          title="Copy Image URL"
        >
          {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
        </button>

        <a
          href={imgSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-neutral-950/85 hover:bg-neutral-900 text-white backdrop-blur-md border border-white/20 transition cursor-pointer"
          title="Full Resolution"
        >
          <ExternalLink size={11} />
        </a>

        <button
          onClick={handleDownload}
          className="p-1.5 rounded-lg bg-neutral-950/85 hover:bg-neutral-900 text-white backdrop-blur-md border border-white/20 transition cursor-pointer"
          title="Download"
        >
          <Download size={11} />
        </button>
      </div>

      {/* The Image */}
      <img
        src={imgSrc}
        alt={alt || "Marketing Creative"}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover bg-neutral-900 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
      />

      {/* Bottom Caption Bar */}
      {alt && (
        <div className="absolute bottom-0 inset-x-0 px-2.5 py-1.5 bg-neutral-950/90 backdrop-blur-xs border-t border-white/10 text-[10px] text-neutral-300 truncate z-10">
          <span className="truncate block font-medium">{alt}</span>
        </div>
      )}

    </div>
  );
};

// Clean Code Snippet / Badge Component
const CodeBlock = ({ inline, children }) => {
  const [copied, setCopied] = useState(false);
  const textContent = String(children || '').trim();

  // If text is short (< 40 chars) or single-line code snippet (like ACCRA24, #AccraVibes, coupon codes), render as inline badge
  const isShortOrSingleLine = inline || (textContent.length < 50 && !textContent.includes('\n'));

  if (isShortOrSingleLine) {
    return (
      <code className="inline-flex items-center gap-1 font-mono text-[11.5px] font-semibold text-purple-900 bg-purple-50/90 border border-purple-200/80 px-2 py-0.5 rounded-md align-baseline shadow-2xs">
        {textContent}
      </code>
    );
  }

  // Multi-line code block with copy button
  const handleCopyCode = () => {
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-2xl overflow-hidden border border-neutral-800 bg-[#121214] text-neutral-100 shadow-sm">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#1a1a1e] border-b border-neutral-800/80 text-[10.5px] text-neutral-400 font-mono">
        <span className="flex items-center gap-1.5">
          <Terminal size={11} className="text-purple-400" />
          <span>Code / Payload</span>
        </span>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1 text-[10.5px] text-neutral-400 hover:text-white px-2 py-0.5 rounded hover:bg-neutral-800 transition cursor-pointer"
        >
          {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-3.5 text-[11.5px] font-mono leading-relaxed overflow-x-auto text-neutral-200">
        <code>{textContent}</code>
      </pre>
    </div>
  );
};

export const MarkdownRenderer = ({ content }) => {
  if (!content) return null;
  const clean = typeof content === 'string' ? content : String(content);

  // Extract consecutive images to group into a 3-in-a-row grid
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const matches = [...clean.matchAll(imageRegex)];

  if (matches.length >= 2) {
    const textWithoutImages = clean.replace(imageRegex, '').trim();

    return (
      <div className="text-[13px] sm:text-[13.5px] text-neutral-800 leading-[1.65] space-y-3.5 text-left select-text font-sans">
        
        {/* Intro text if exists */}
        {textWithoutImages.split('\n\n###')[0] && (
          <p className="text-[13px] sm:text-[13.5px] text-neutral-900 font-medium leading-relaxed">
            {textWithoutImages.split('\n\n###')[0].trim()}
          </p>
        )}

        {/* 3-IN-A-ROW RESPONSIVE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-3 w-full max-w-4xl">
          {matches.map((m, idx) => (
            <CompactImageCard key={idx} alt={m[1]} src={m[2]} />
          ))}
        </div>

        {/* Rest of the markdown guidance */}
        {textWithoutImages.includes('###') && (
          <div className="pt-2 border-t border-neutral-100">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {'### ' + textWithoutImages.split('###')[1]}
            </ReactMarkdown>
          </div>
        )}

      </div>
    );
  }

  // Standard Single Image / General Markdown Renderer
  return (
    <div className="text-[13px] sm:text-[13.5px] text-[#f4f4ee] leading-[1.65] space-y-3 text-left select-text font-sans antialiased">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="text-base font-bold text-white pt-3 pb-1 border-b border-white/10 tracking-tight">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="text-sm font-bold text-white pt-2 pb-0.5 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 inline-block shrink-0" />
              <span>{children}</span>
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-[13.5px] font-bold text-white pt-2 pb-0.5">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-[13px] sm:text-[13.5px] text-[#f4f4ee] leading-[1.65] my-2">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-neutral-300 font-normal">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 my-2 pl-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 my-2 pl-1 list-decimal list-inside text-[#f4f4ee]">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-[13px] sm:text-[13.5px] text-[#f4f4ee] flex items-start gap-2 leading-relaxed">
              <span className="text-purple-400 font-bold text-xs mt-0.5 shrink-0">•</span>
              <div className="flex-1">{children}</div>
            </li>
          ),
          img: ({ src, alt }) => (
            <div className="w-52 sm:w-60 aspect-square my-2.5">
              <CompactImageCard src={src} alt={alt} />
            </div>
          ),
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-2xl border border-white/10 shadow-lg bg-[#282828]">
              <table className="w-full text-left text-xs border-collapse divide-y divide-white/10">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-white/5">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/5 bg-[#282828] text-[#e4e4dd]">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/5 transition">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3.5 py-2.5 font-bold text-[11px] text-white tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3.5 py-2.5 text-xs text-[#e4e4dd] align-top">
              {children}
            </td>
          ),
          blockquote: ({ children }) => (
            <div className="border-l-2 border-purple-500 pl-3.5 py-2 bg-purple-950/20 rounded-r-xl my-2.5 text-[12.5px] text-neutral-300 shadow-2xs">
              {children}
            </div>
          ),
          code: CodeBlock,
          hr: () => <hr className="border-white/10 my-3" />
        }}
      >
        {clean}
      </ReactMarkdown>
    </div>
  );
};
