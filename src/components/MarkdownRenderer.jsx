import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cleanAiResponse } from '../services/aiService';
import { Download, ExternalLink, Check, Copy, Loader2, Sparkles, Terminal, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';

// Persistent Browser Image Cache Manager to prevent re-generation on refresh
const IMAGE_CACHE_NAME = 'calvras_generated_images_v1';

async function getCachedImageUrl(url) {
  try {
    if (typeof window !== 'undefined' && 'caches' in window && url && !url.startsWith('blob:')) {
      const cache = await caches.open(IMAGE_CACHE_NAME);
      const match = await cache.match(url);
      if (match) {
        const blob = await match.blob();
        return URL.createObjectURL(blob);
      }
    }
  } catch (e) {}
  return null;
}

async function saveImageToCache(url) {
  try {
    if (typeof window !== 'undefined' && 'caches' in window && url && !url.startsWith('blob:')) {
      const response = await fetch(url, { mode: 'cors' });
      if (response.ok) {
        const cache = await caches.open(IMAGE_CACHE_NAME);
        await cache.put(url, response.clone());
      }
    }
  } catch (e) {}
}

const CompactImageCard = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [isFromCache, setIsFromCache] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const cachedUrl = await getCachedImageUrl(src);
      if (cachedUrl && isMounted) {
        setImgSrc(cachedUrl);
        setLoaded(true);
        setIsFromCache(true);
      } else if (isMounted) {
        setImgSrc(src);
        // Generous 60-second safety timeout
        timeoutRef.current = setTimeout(() => {
          if (!loaded && isMounted) {
            setHasError(true);
            setLoaded(true);
          }
        }, 60000);
      }
    })();

    return () => {
      isMounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [src]);

  const handleImageLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoaded(true);
    setHasError(false);
    if (!isFromCache && src && !src.startsWith('blob:')) {
      saveImageToCache(src);
    }
  };

  const handleImageError = () => {
    // If an initial glitch happens, retry gracefully with new seed without throwing immediate error card
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      const newSeed = Math.floor(Math.random() * 9999999);
      if (imgSrc.includes('pollinations.ai')) {
        const base = imgSrc.replace(/seed=\d+/, `seed=${newSeed}`);
        setTimeout(() => setImgSrc(base), 2000);
        return;
      }
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = imgSrc;
    link.target = '_blank';
    link.download = `Calvras_Creative_${Date.now()}.png`;
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
    <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-[#242424] text-white w-[230px] sm:w-[260px] aspect-square flex flex-col justify-between transition-all hover:border-white/25 shrink-0">
      
      {/* Loading Shimmer State */}
      {!loaded && !hasError && (
        <div className="absolute inset-0 bg-[#1e1e1e] flex flex-col items-center justify-center p-3 text-center space-y-2.5 z-10 animate-pulse">
          <Loader2 size={24} className="text-[#8057ff] animate-spin" />
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-white block">Generating AI Visual...</span>
            <span className="text-[10px] text-neutral-400 font-mono">Rendering high-res diffusion</span>
          </div>
        </div>
      )}

      {/* Error Fallback State */}
      {hasError && (
        <div className="absolute inset-0 bg-[#282828] flex flex-col items-center justify-center p-3 text-center space-y-2 z-10">
          <span className="text-xs text-neutral-400">Rendering took longer than expected</span>
          <button
            onClick={() => {
              setHasError(false);
              setLoaded(false);
              setRetryCount(0);
              const newSeed = Math.floor(Math.random() * 9999999);
              setImgSrc(src.replace(/seed=\d+/, `seed=${newSeed}`));
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition cursor-pointer"
          >
            <RefreshCw size={11} />
            <span>Regenerate</span>
          </button>
        </div>
      )}

      {/* Top Right Action Overlay */}
      {loaded && !hasError && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-150">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 transition cursor-pointer"
            title="Copy Image URL"
          >
            {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
          </button>

          <a
            href={imgSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 transition cursor-pointer"
            title="Full Resolution"
          >
            <ExternalLink size={11} />
          </a>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 transition cursor-pointer"
            title="Download"
          >
            <Download size={11} />
          </button>
        </div>
      )}

      {/* The Image */}
      <img
        src={imgSrc}
        alt={alt || "Marketing Creative"}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover bg-black/40 transition-opacity duration-300 ${loaded && !hasError ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
      />

      {/* Bottom Caption Bar */}
      {alt && loaded && !hasError && (
        <div className="absolute bottom-0 inset-x-0 px-2.5 py-1.5 bg-black/85 backdrop-blur-xs border-t border-white/10 text-[10.5px] text-neutral-200 truncate z-10">
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

  if (inline || (textContent.length < 50 && !textContent.includes('\n'))) {
    return (
      <code className="inline-flex items-center gap-1 font-mono text-[11.5px] font-semibold text-purple-300 bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 rounded-md align-baseline shadow-2xs">
        {textContent}
      </code>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a] text-neutral-100 shadow-md">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#222222] border-b border-white/10 text-[10.5px] text-neutral-400 font-mono">
        <span className="flex items-center gap-1.5">
          <Terminal size={11} className="text-[#8057ff]" />
          <span>Code / Snippet</span>
        </span>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1 text-[10.5px] text-neutral-400 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition cursor-pointer"
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
              <span className="w-2 h-2 rounded-full bg-[#8057ff] inline-block shrink-0" />
              <span>{children}</span>
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-[13.5px] font-bold text-white pt-2 pb-0.5">
              {children}
            </h4>
          ),
          p: ({ children }) => {
            // Check if paragraph contains only image elements to wrap in side-by-side flex container
            const childrenArray = React.Children.toArray(children);
            const isImageContainer = childrenArray.length > 0 && childrenArray.every(
              child => React.isValidElement(child) && (child.type === 'img' || child.props?.src)
            );

            if (isImageContainer) {
              return (
                <div className="flex flex-wrap items-start gap-4 my-3 w-full">
                  {children}
                </div>
              );
            }

            return (
              <p className="text-[13px] sm:text-[13.5px] text-[#f4f4ee] leading-[1.65] my-2 font-normal">
                {children}
              </p>
            );
          },
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
              <span className="text-[#8057ff] font-bold text-xs mt-0.5 shrink-0">•</span>
              <div className="flex-1">{children}</div>
            </li>
          ),
          img: ({ src, alt }) => (
            <CompactImageCard src={src} alt={alt} />
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
            <div className="border-l-2 border-[#8057ff] pl-3.5 py-2 bg-[#8057ff]/10 rounded-r-xl my-2.5 text-[12.5px] text-neutral-200 shadow-2xs">
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
