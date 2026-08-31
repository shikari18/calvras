import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, Plus, Check } from 'lucide-react';

const CONNECTORS = [
  {
    id: 'google-drive', name: 'Google Drive', category: 'Top',
    desc: 'Search, read, and upload files instantly',
    logo: (
      <svg viewBox="0 0 87.3 78" className="w-7 h-7">
        <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0a15.6 15.6 0 001.95 7.85z" fill="#0066da"/>
        <path d="M43.65 25L29.9 1.2a15.8 15.8 0 00-3.3 3.3L1.95 49.5A15.6 15.6 0 000 57.35h27.5z" fill="#00ac47"/>
        <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25a15.6 15.6 0 001.95-7.85H59.8L73.55 76.8z" fill="#ea4335"/>
        <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
        <path d="M59.8 57.35H27.5L13.75 81.15c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.4 4.5-1.2z" fill="#2684fc"/>
        <path d="M73.4 26.45l-13.5-23.4c-1.35-.8-2.9-1.05-4.5-1.05H52.9l-9.25 16 16.15 27.9 27.5.05a15.6 15.6 0 00-1.95-7.85z" fill="#ffba00"/>
      </svg>
    ),
  },
  {
    id: 'gmail', name: 'Gmail', category: 'Top',
    desc: 'Draft replies, summarize threads, & search your inbox',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: 'google-calendar', name: 'Google Calendar', category: 'Top',
    desc: 'Manage your schedule and coordinate meetings',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect x="3" y="4" width="18" height="17" rx="2" fill="#fff" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M3 9h18" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M8 2v4M16 2v4" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="12" y="19" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1967D2">31</text>
      </svg>
    ),
  },
  {
    id: 'canva', name: 'Canva', category: 'Top',
    desc: 'Search, create, autofill, and export Canva designs',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#00C4CC"/>
        <path d="M16.4 8.4a4.1 4.1 0 00-4.1 0 4.1 4.1 0 00-2.1 3.6 4.1 4.1 0 002.1 3.6 4.3 4.3 0 001.5 1.4 1 1 0 001.4-.4 1 1 0 00-.4-1.4 2.4 2.4 0 01-.8-.8 2.1 2.1 0 01-.3-1.1 2.1 2.1 0 01.3-1.1 2.1 2.1 0 011.9-1 2.1 2.1 0 011.9 3l-.7 1.8a1 1 0 00.6 1.3 1 1 0 001.3-.6l.7-1.8a4.1 4.1 0 00-3.3-6.5z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'microsoft-365', name: 'Microsoft 365', category: 'Top',
    desc: "Access your company's SharePoint, OneDrive, and Teams",
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M0 0h11.5v11.5H0z" fill="#F25022"/>
        <path d="M12.5 0H24v11.5H12.5z" fill="#7FBA00"/>
        <path d="M0 12.5h11.5V24H0z" fill="#00A4EF"/>
        <path d="M12.5 12.5H24V24H12.5z" fill="#FFB900"/>
      </svg>
    ),
  },
  {
    id: 'notion', name: 'Notion', category: 'Top',
    desc: 'Connect your Notion workspace to search and edit pages',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933z"/>
      </svg>
    ),
  },
  {
    id: 'figma', name: 'Figma', category: 'Top',
    desc: 'Generate diagrams and better code from Figma designs',
    logo: (
      <svg viewBox="0 0 38 57" className="w-6 h-6">
        <path d="M19 28.5a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 019.5 38H19v9.5a9.5 9.5 0 01-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 000-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 009.5 19H19V0H9.5A9.5 9.5 0 000 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 009.5 38H19V19H9.5A9.5 9.5 0 000 28.5z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    id: 'slack', name: 'Slack', category: 'Top',
    desc: 'Send messages, create canvases, and fetch conversations',
    logo: (
      <svg viewBox="0 0 54 54" className="w-7 h-7">
        <path d="M19.712.133a5.381 5.381 0 00-5.376 5.387 5.381 5.381 0 005.376 5.386h5.376V5.52A5.381 5.381 0 0019.712.133zm0 14.365H5.376A5.381 5.381 0 000 19.884a5.381 5.381 0 005.376 5.387h14.336a5.381 5.381 0 005.376-5.387 5.381 5.381 0 00-5.376-5.386z" fill="#36C5F0"/>
        <path d="M53.76 19.884a5.381 5.381 0 00-5.376-5.386 5.381 5.381 0 00-5.376 5.386v5.387h5.376a5.381 5.381 0 005.376-5.387zm-14.336 0V5.52A5.381 5.381 0 0034.048.133a5.381 5.381 0 00-5.376 5.387v14.364a5.381 5.381 0 005.376 5.387 5.381 5.381 0 005.376-5.387z" fill="#2EB67D"/>
        <path d="M34.048 54a5.381 5.381 0 005.376-5.387 5.381 5.381 0 00-5.376-5.386h-5.376v5.386A5.381 5.381 0 0034.048 54zm0-14.365h14.336a5.381 5.381 0 005.376-5.386 5.381 5.381 0 00-5.376-5.387H34.048a5.381 5.381 0 00-5.376 5.387 5.381 5.381 0 005.376 5.386z" fill="#ECB22E"/>
        <path d="M0 34.249a5.381 5.381 0 005.376 5.386 5.381 5.381 0 005.376-5.386v-5.387H5.376A5.381 5.381 0 000 34.249zm14.336 0v14.364A5.381 5.381 0 0019.712 54a5.381 5.381 0 005.376-5.387V34.249a5.381 5.381 0 00-5.376-5.387 5.381 5.381 0 00-5.376 5.387z" fill="#E01E5A"/>
      </svg>
    ),
  },
  {
    id: 'jira', name: 'Atlassian Rovo', category: 'Top',
    desc: 'Access Jira & Confluence from your workspace',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <defs>
          <linearGradient id="jg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052CC"/>
            <stop offset="100%" stopColor="#2684FF"/>
          </linearGradient>
        </defs>
        <path d="M11.75.07L.33 11.5a1.11 1.11 0 000 1.57l10.45 10.45a1.11 1.11 0 001.57 0l10.45-10.45c.43-.43.43-1.13 0-1.57L13.32.07a1.11 1.11 0 00-1.57 0z" fill="url(#jg)"/>
      </svg>
    ),
  },
  {
    id: 'hubspot', name: 'HubSpot', category: 'Top',
    desc: 'CRM context for every answer, insight, and action',
    logo: (
      <svg viewBox="0 0 100 100" className="w-7 h-7">
        <circle cx="50" cy="50" r="50" fill="#FF7A59"/>
        <circle cx="50" cy="38" r="12" fill="white"/>
        <path d="M38 62a12 12 0 0124 0" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'asana', name: 'Asana', category: 'Top',
    desc: 'Connect to Asana to coordinate tasks and projects',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="6" r="4.5" fill="#F06A6A"/>
        <circle cx="5" cy="16" r="4.5" fill="#F06A6A"/>
        <circle cx="19" cy="16" r="4.5" fill="#F06A6A"/>
      </svg>
    ),
  },
  {
    id: 'linear', name: 'Linear', category: 'Top',
    desc: 'Manage issues, projects & team workflows in Linear',
    logo: (
      <svg viewBox="0 0 100 100" className="w-7 h-7">
        <circle cx="50" cy="50" r="50" fill="#5E6AD2"/>
        <path d="M20 65L65 20M20 50L50 20M35 65L65 35M20 65L65 65" stroke="white" strokeWidth="8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'github', name: 'GitHub', category: 'Trending',
    desc: 'Sync repos, create PRs, and manage your codebase',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 'stripe', name: 'Stripe', category: 'Trending',
    desc: 'Handle payments, webhooks, and billing directly',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#635BFF"/>
        <path d="M11.11 9.12c0-.64.52-.88 1.4-.88 1.25 0 2.83.38 4.08 1.06V5.82A10.85 10.85 0 0012.5 5c-3.63 0-6.04 1.9-6.04 5.06 0 4.93 6.8 4.14 6.8 6.27 0 .75-.65 1-1.57 1-1.36 0-3.1-.56-4.48-1.32v3.54c1.52.65 3.06 1 4.48 1 3.71 0 6.27-1.84 6.27-5.04-.03-5.32-6.85-4.37-6.85-6.39z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'zapier', name: 'Zapier', category: 'Trending',
    desc: 'Trigger and run 6,000+ app automations with AI',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#FF4A00"/>
        <path d="M7 8l5 4-5 4M17 8l-5 4 5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'discord', name: 'Discord', category: 'Trending',
    desc: 'Read and send messages to Discord servers and DMs',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#5865F2"/>
        <path d="M16.5 7.5s-1.5-.5-3-.5c-.1.3-.3.7-.4 1a10 10 0 00-2.2 0C10.8 7.7 10.6 7.3 10.5 7c-1.5 0-3 .5-3 .5S5.5 10.5 5.5 13c0 0 1 1.5 3 1.5l.7-1a6 6 0 01-1-.5c.1-.1.2-.1.3-.2a7 7 0 006 0c.1.1.2.1.3.2a6 6 0 01-1 .5l.7 1c2 0 3-1.5 3-1.5 0-2.5-2-5.5-2-5.5zm-6.5 4a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'airtable', name: 'Airtable', category: 'Trending',
    desc: 'Read, write, and sync Airtable bases and records',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 1L2 6.5v11L12 23l10-5.5v-11L12 1zm0 2.3l7.5 4.1-7.5 4.2L4.5 7.4 12 3.3zM3.5 8.8l7.5 4.2v8.5l-7.5-4.1V8.8zm9.5 12.7V13l7.5-4.2v8.6l-7.5 4.1z" fill="#FCB400"/>
      </svg>
    ),
  },
  {
    id: 'webflow', name: 'Webflow', category: 'Trending',
    desc: 'Manage CMS, publish pages, and update site content',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#4353FF"/>
        <path d="M17.82 7.71s-2.16 6.63-2.32 7.18c-.05-.53-.81-7.18-.81-7.18H11.3s-2.2 6.67-2.35 7.2c-.04-.54-.79-7.2-.79-7.2H4.5L7.14 17h3.63l2.24-6.58L15.2 17h3.63l2.67-9.29z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'higgsfield', name: 'Higgsfield AI', category: 'Trending',
    desc: 'Generate cinematic AI videos with custom motion control',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#0a0a0a" stroke="#333" strokeWidth="0.5"/>
        <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="2" fill="white"/>
        <circle cx="12" cy="5" r="1.2" fill="white"/>
        <circle cx="12" cy="19" r="1.2" fill="white"/>
        <circle cx="5" cy="12" r="1.2" fill="white"/>
        <circle cx="19" cy="12" r="1.2" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'suno', name: 'Suno', category: 'Trending',
    desc: 'Generate full songs and music with AI from a prompt',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#1a1a2e"/>
        <path d="M8 8v8M11 6v12M14 9v6M17 7v10" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'runwayml', name: 'Runway', category: 'Trending',
    desc: 'Create and edit AI-generated videos, images & effects',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#0f0f0f"/>
        <path d="M6 8h7a4 4 0 010 8H6V8z" fill="white"/>
        <circle cx="17" cy="16" r="2" fill="#00E5FF"/>
      </svg>
    ),
  },
  {
    id: 'eleven-labs', name: 'ElevenLabs', category: 'Trending',
    desc: 'Generate lifelike voiceovers and clone any voice with AI',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#111"/>
        <rect x="8" y="6" width="3" height="12" rx="1.5" fill="white"/>
        <rect x="13" y="9" width="3" height="9" rx="1.5" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'midjourney', name: 'Midjourney', category: 'Trending',
    desc: 'Generate stunning images from text prompts via AI',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
        <circle cx="12" cy="12" r="12" fill="#1a1a1a"/>
        <path d="M4 17l4-8 2.5 5L13 9l3 5.5L19 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'perplexity', name: 'Perplexity', category: 'Trending',
    desc: 'Run real-time AI-powered web searches and research',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#1a1a2e"/>
        <path d="M12 4v16M4 12h16M7 7l10 10M17 7L7 17" stroke="#20B2AA" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'shopify', name: 'Shopify', category: 'Trending',
    desc: 'Manage your store, products, orders and customers',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#96BF48"/>
        <path d="M15.5 7.5c-.1-.7-.7-1-1.2-1.1l-1.2-.1c0 0-.8-2.3-2.6-2.3-.1 0-.3 0-.4.1-.1-.1-.4-.5-.8-.5-1.5 0-2.3 1.9-2.5 2.9l-1.5.5c-.4.1-.5.2-.5.6L4 17l9.5 1.8L19 17 15.5 7.5zm-4 .5c-.7.2-1.4.4-2.1.7.2-.8.7-2.4 1.7-2.6.3.6.4 1.4.4 1.9zm-1.1-3c.1 0 .2.1.3.1-.9.4-1.4 1.8-1.7 2.7l-1.3.4c.3-1.2 1.1-3.2 2.7-3.2zm.7 13.1L5.8 16.7l1.3-9.3 1.1-.3V8c0 .4.3.5.5.5s.5-.2.5-.5V7l2-.7v9.8l.9.5z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'salesforce', name: 'Salesforce', category: 'Trending',
    desc: 'Access CRM data, leads, contacts, and opportunities',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#00A1E0"/>
        <path d="M10 8.5a3.5 3.5 0 016.5 1.8A2.5 2.5 0 0118 15H7a3 3 0 01-.5-5.95A3.5 3.5 0 0110 8.5z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'twilio', name: 'Twilio', category: 'Trending',
    desc: 'Send SMS, WhatsApp messages, and make voice calls',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="12" fill="#F22F46"/>
        <circle cx="9" cy="9" r="2" fill="white"/>
        <circle cx="15" cy="9" r="2" fill="white"/>
        <circle cx="9" cy="15" r="2" fill="white"/>
        <circle cx="15" cy="15" r="2" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'vercel', name: 'Vercel', category: 'Trending',
    desc: 'Deploy projects, check builds and manage deployments',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
        <circle cx="12" cy="12" r="12" fill="#000"/>
        <path d="M12 5l8 14H4L12 5z" fill="white"/>
      </svg>
    ),
  },
];

const TOP = CONNECTORS.filter(c => c.category === 'Top');
const TRENDING = CONNECTORS.filter(c => c.category === 'Trending');

export default function ConnectorsOverlay({ onClose, anchorRef }) {
  const [search, setSearch] = useState('');
  const [connected, setConnected] = useState({});

  const toggle = (id) => setConnected(prev => ({ ...prev, [id]: !prev[id] }));

  const filtered = useMemo(() => {
    if (!search) return null;
    const q = search.toLowerCase();
    return CONNECTORS.filter(c =>
      c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    );
  }, [search]);

  const renderCard = (connector) => {
    const isConnected = !!connected[connector.id];
    return (
      <div
        key={connector.id}
        className="flex items-center gap-3 p-3 rounded-[14px] bg-[#1c1c1c] border border-white/[0.06] hover:border-white/[0.12] transition-all group"
      >
        {/* Logo */}
        <div className="w-10 h-10 rounded-[10px] bg-[#252525] flex items-center justify-center flex-shrink-0">
          {connector.logo}
        </div>
        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[12.5px] font-semibold text-[#e5e5e5] truncate">{connector.name}</span>
            {connector.category === 'Trending' && (
              <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-[11px] text-[#666] leading-snug line-clamp-2">{connector.desc}</p>
        </div>
        {/* Button */}
        <button
          type="button"
          onClick={() => toggle(connector.id)}
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            isConnected
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              : 'border-white/[0.15] text-[#888] hover:border-white/40 hover:text-white bg-white/[0.04]'
          }`}
        >
          {isConnected ? <Check size={12} strokeWidth={2.5}/> : <Plus size={12} strokeWidth={2}/>}
        </button>
      </div>
    );
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Floating panel — true center of viewport */}
      <div className="fixed z-[91] inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-[920px] max-h-[700px] bg-[#161616] border border-white/[0.09] rounded-[20px] shadow-[0_32px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-modal-in">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/[0.06] flex-shrink-0">
          <span className="text-[13px] font-semibold text-[#e5e5e5]">Directory</span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={13} className="text-[#888]"/>
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-3 flex-shrink-0">
          <div className="relative">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]"/>
            <input
              autoFocus
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search connectors"
              className="w-full h-[36px] rounded-[10px] bg-white/[0.05] border border-white/[0.08] focus:border-white/20 outline-none pl-9 pr-4 text-[13px] text-[#e5e5e5] placeholder-[#444] transition-colors"
            />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-5">

          {filtered ? (
            /* Search results */
            <div>
              <div className="text-[11px] font-semibold text-[#555] uppercase tracking-wider mb-3">
                Results
              </div>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {filtered.map(renderCard)}
                </div>
              ) : (
                <p className="text-[13px] text-[#555] py-8 text-center">No connectors match "{search}"</p>
              )}
            </div>
          ) : (
            <>
              {/* Top connectors */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-[#e5e5e5]">Top connectors</span>
                  <span className="text-[11.5px] text-blue-400 cursor-pointer hover:underline">Show all 22 →</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {TOP.map(renderCard)}
                </div>
              </div>

              {/* Trending connectors */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-[#e5e5e5]">Trending connectors</span>
                  <span className="text-[11.5px] text-blue-400 cursor-pointer hover:underline">Show all 10 →</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {TRENDING.map(renderCard)}
                </div>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </>,
    document.body
  );
}
