import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainChat from './components/MainChat';
import ConnectToolsModal from './components/ConnectToolsModal';
import CommandPaletteModal from './components/Modals/CommandPaletteModal';
import WorkspacesModal from './components/Modals/WorkspacesModal';
import AccountSettingsModal from './components/Modals/AccountSettingsModal';
import FeedbackModal from './components/Modals/FeedbackModal';
import BrowseAllModal from './components/Modals/BrowseAllModal';
import CodeStudioModal from './components/Modals/CodeStudioModal';
import DeveloperModal from './components/Modals/DeveloperModal';
import SkeletonLoader from './components/SkeletonLoader';
import AuthPage from './components/AuthPage';
import PricingOnboarding from './components/PricingOnboarding';
import LandingPage from './components/LandingPage';
import ProjectsPage from './components/ProjectsPage';
import DeveloperPage from './components/DeveloperPage';
import SupportCenterPage from './pages/SupportCenterPage';
import LegalDocumentPage from './pages/LegalDocumentPage';

const generateConversationId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

function getSessionIdFromPath() {
  try {
    const match = window.location.pathname.match(/^\/c\/([a-zA-Z0-9_-]+)/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

function getInitialRoute() {
  try {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const savedUser = localStorage.getItem('coded_user');

    // /new always opens chat for logged-in user, or landing for guests
    if (path.startsWith('/new')) {
      return savedUser ? 'chat' : 'landing';
    }

    // Explicit URL-based route detection
    if (path.startsWith('/c/')) {
      return savedUser ? 'chat' : 'auth';
    }
    if (path.startsWith('/pricing')) return 'pricing';
    if (path.startsWith('/auth') || path.startsWith('/login') || path.startsWith('/signup') ||
        hash.includes('login') || hash.includes('auth')) return 'auth';
    if (path.startsWith('/privacy')) return 'privacy';
    if (path.startsWith('/terms')) return 'terms';
    if (path.startsWith('/refund') || path.startsWith('/shipping')) return 'refund';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/help') || path.startsWith('/support')) return 'help';
    if (path.startsWith('/chat') || path.startsWith('/app') || hash.includes('chat')) {
      return savedUser ? 'chat' : 'landing';
    }
    if (path.startsWith('/landing') || hash.includes('landing')) {
      try { window.history.replaceState(null, '', '/'); } catch {}
      return 'landing';
    }

    // For root "/" or unknown paths — if user is logged in, ALWAYS keep them on chat (never redirect to pricing)
    if (savedUser) return 'chat';

    const saved = localStorage.getItem('malvos_current_route');
    if (['privacy', 'terms', 'refund', 'about', 'help'].includes(saved)) return saved;
    if (saved === 'auth') return 'auth';

    // First visit for guest — go to landing
    return 'landing';
  } catch {
    return 'landing';
  }
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);
  const [previousRoute, setPreviousRoute] = useState(() => {
    return localStorage.getItem('coded_user') ? 'chat' : 'pricing';
  });
  const [helpArticleId, setHelpArticleId] = useState(null);
  const [pendingUser, setPendingUser] = useState(() => {
    try {
      const saved = localStorage.getItem('coded_pending_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // User profile — persisted in localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('coded_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const getAccountKey = (key) => {
    const email = (user?.email || 'guest').toLowerCase().trim().replace(/[^a-z0-9_]/g, '_');
    return `calvras_${key}_${email}`;
  };

  const [messages, setMessages] = useState(() => {
    try {
      const pathSessionId = getSessionIdFromPath();
      const currentUser = (() => {
        try {
          const s = localStorage.getItem('coded_user');
          return s ? JSON.parse(s) : null;
        } catch { return null; }
      })();
      const email = (currentUser?.email || 'guest').toLowerCase().trim().replace(/[^a-z0-9_]/g, '_');
      const activeId = pathSessionId || localStorage.getItem(`calvras_active_session_${email}`) || localStorage.getItem('coded_active_session');
      const savedSessions = localStorage.getItem(`calvras_sessions_${email}`) || localStorage.getItem('coded_sessions');
      if (savedSessions) {
        const parsed = JSON.parse(savedSessions);
        if (activeId) {
          const active = parsed.find(s => s.id === activeId);
          if (active && active.messages && active.messages.length > 0) {
            return active.messages;
          }
        }
        if (parsed.length > 0 && parsed[0].messages && parsed[0].messages.length > 0) {
          return parsed[0].messages;
        }
      }
      const savedDirect = localStorage.getItem(`calvras_active_messages_${email}`) || localStorage.getItem('malvos_active_messages');
      return savedDirect ? JSON.parse(savedDirect) : [];
    } catch {
      return [];
    }
  });

  // Sessions
  const [sessions, setSessions] = useState(() => {
    try {
      const currentUser = (() => {
        try {
          const s = localStorage.getItem('coded_user');
          return s ? JSON.parse(s) : null;
        } catch { return null; }
      })();
      const email = (currentUser?.email || 'guest').toLowerCase().trim().replace(/[^a-z0-9_]/g, '_');
      const saved = localStorage.getItem(`calvras_sessions_${email}`) || localStorage.getItem('coded_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeSession, setActiveSession] = useState(() => {
    const pathSessionId = getSessionIdFromPath();
    if (pathSessionId) return pathSessionId;
    const currentUser = (() => {
      try {
        const s = localStorage.getItem('coded_user');
        return s ? JSON.parse(s) : null;
      } catch { return null; }
    })();
    const email = (currentUser?.email || 'guest').toLowerCase().trim().replace(/[^a-z0-9_]/g, '_');
    return localStorage.getItem(`calvras_active_session_${email}`) || localStorage.getItem('coded_active_session') || null;
  });

  const navigateTo = (route, meta = null) => {
    let target = route;
    if (route === 'legal' && meta) {
      target = meta;
    }
    if (target === 'help' && meta) {
      setHelpArticleId(meta);
    } else if (target !== 'help') {
      setHelpArticleId(null);
    }

    if (!['privacy', 'terms', 'refund', 'about', 'help', 'support'].includes(currentRoute)) {
      setPreviousRoute(currentRoute);
    }

    setCurrentRoute(target);
    try {
      localStorage.setItem('malvos_current_route', target);
      if (target === 'chat') {
        const url = (activeSession && messages.length > 0) ? `/c/${activeSession}` : '/';
        window.history.pushState(null, '', url);
      } else if (target === 'landing') {
        window.history.pushState(null, '', '/');
      } else {
        window.history.pushState(null, '', `/${target}`);
      }
    } catch {}
  };

  // Dynamic ChatGPT-Style URL synchronization (/c/:conversationId)
  useEffect(() => {
    try {
      if (currentRoute === 'chat' && user) {
        if (activeSession && messages.length > 0) {
          const targetUrl = `/c/${activeSession}`;
          if (window.location.pathname !== targetUrl) {
            window.history.pushState(null, '', targetUrl);
          }
        } else if (messages.length === 0 && window.location.pathname.startsWith('/c/')) {
          window.history.pushState(null, '', '/');
        }
      }
    } catch {}
  }, [currentRoute, activeSession, messages.length, user]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Reload history whenever active account changes
  useEffect(() => {
    if (!user) return;
    try {
      const email = (user.email || 'guest').toLowerCase().trim().replace(/[^a-z0-9_]/g, '_');
      const savedSessions = localStorage.getItem(`calvras_sessions_${email}`);
      const savedActiveId = localStorage.getItem(`calvras_active_session_${email}`);
      const savedDirect = localStorage.getItem(`calvras_active_messages_${email}`);

      if (savedSessions) {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed);
        if (savedActiveId) {
          const act = parsed.find(s => s.id === savedActiveId);
          setMessages(act?.messages || []);
          setActiveSession(savedActiveId);
        } else if (parsed.length > 0 && parsed[0].messages) {
          setMessages(parsed[0].messages);
          setActiveSession(parsed[0].id);
        }
      } else if (savedDirect) {
        setMessages(JSON.parse(savedDirect));
      }
    } catch {}
  }, [user?.email]);

  // Modals
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isWorkspacesOpen, setIsWorkspacesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isBrowseAllOpen, setIsBrowseAllOpen] = useState(false);
  const [isCodeStudioOpen, setIsCodeStudioOpen] = useState(false);
  const [isDeveloperOpen, setIsDeveloperOpen] = useState(false);

  useEffect(() => {
    try {
      const sKey = getAccountKey('sessions');
      const mKey = getAccountKey('active_messages');
      const aKey = getAccountKey('active_session');

      localStorage.setItem(sKey, JSON.stringify(sessions));
      localStorage.setItem('coded_sessions', JSON.stringify(sessions));
      localStorage.setItem(mKey, JSON.stringify(messages));
      localStorage.setItem('malvos_active_messages', JSON.stringify(messages));
      if (activeSession) {
        localStorage.setItem(aKey, activeSession);
        localStorage.setItem('coded_active_session', activeSession);
      } else {
        localStorage.removeItem(aKey);
        localStorage.removeItem('coded_active_session');
      }
    } catch {}
  }, [sessions, messages, activeSession, user]);

  useEffect(() => {
    if (messages.length > 0) {
      if (activeSession) {
        setSessions(prev => prev.map(s => s.id === activeSession ? { ...s, messages, updatedAt: Date.now() } : s));
      } else {
        const newId = generateConversationId();
        const firstUserMsg = messages.find(m => m.role === 'user');
        const rawContent = firstUserMsg?.content;
        const textSnippet = typeof rawContent === 'string' ? rawContent : (Array.isArray(rawContent) ? rawContent.find(p => p.type === 'text')?.text || 'New Project' : 'New Project');
        const cleanTitle = (textSnippet || 'New Project').replace(/^[#\s*`]+/, '').trim().slice(0, 42) || 'Untitled Project';
        const newSession = {
          id: newId,
          title: cleanTitle,
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          updatedAt: Date.now(),
          messages
        };
        setActiveSession(newId);
        setSessions(prev => [newSession, ...prev]);
        try {
          if (currentRoute === 'chat') {
            window.history.pushState(null, '', `/c/${newId}`);
          }
        } catch {}
      }
    }
  }, [messages, activeSession, currentRoute]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    const handleOpenTools = () => setIsToolsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('calvras_open_tools', handleOpenTools);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('calvras_open_tools', handleOpenTools);
    };
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setActiveSession(null);
    setActiveNav('home');
    setSidebarCollapsed(false);
    try {
      window.history.pushState(null, '', '/new');
    } catch {}
    localStorage.removeItem('malvos_active_messages');
    localStorage.removeItem('coded_active_session');
    localStorage.removeItem('malvos_active_workspace');
    localStorage.removeItem('malvos_active_workspace_files');
    localStorage.removeItem('malvos_active_file_name');
    localStorage.removeItem('malvos_split_screen');
    window.dispatchEvent(new CustomEvent('malvos_reset_workspace'));
  };

  const handleSaveWorkspaceFiles = (files, activeFile) => {
    if (!files || Object.keys(files).length === 0) return;
    if (activeSession) {
      setSessions(prev => prev.map(s => s.id === activeSession ? {
        ...s,
        workspaceFiles: files,
        activeFileName: activeFile || s.activeFileName || 'src/App.tsx',
        updatedAt: Date.now()
      } : s));
      try {
        localStorage.setItem(`calvras_session_files_${activeSession}`, JSON.stringify(files));
        localStorage.setItem('malvos_active_workspace_files', JSON.stringify(files));
      } catch {}
    }
  };

  const handleSelectSession = (sessionId) => {
    const sess = sessions.find(s => s.id === sessionId);
    if (sess) {
      setActiveSession(sessionId);
      setMessages(sess.messages || []);
      setSidebarCollapsed(true);
      try {
        window.history.pushState(null, '', `/c/${sessionId}`);
      } catch {}
      let filesToRestore = sess.workspaceFiles || null;
      if (!filesToRestore) {
        try {
          const raw = localStorage.getItem(`calvras_session_files_${sessionId}`);
          if (raw) filesToRestore = JSON.parse(raw);
        } catch {}
      }
      if (filesToRestore && Object.keys(filesToRestore).length > 0) {
        try {
          localStorage.setItem('malvos_active_workspace_files', JSON.stringify(filesToRestore));
          if (sess.activeFileName) localStorage.setItem('malvos_active_file_name', sess.activeFileName);
        } catch {}
        window.dispatchEvent(new CustomEvent('calvras_restore_workspace', {
          detail: { files: filesToRestore, activeFile: sess.activeFileName || 'src/App.tsx' }
        }));
      }
    }
  };

  const handleDeleteSession = (sessionId) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    try {
      localStorage.removeItem(`calvras_session_files_${sessionId}`);
    } catch {}
    if (activeSession === sessionId) {
      handleNewChat();
    }
  };

  const handleUserMessage = (query) => {
    setSidebarCollapsed(true);
    if (!activeSession) {
      const newSessionId = generateConversationId();
      const title = query.slice(0, 30) + (query.length > 30 ? '...' : '');
      const newSession = {
        id: newSessionId,
        title: title || 'New Conversation',
        messages: []
      };
      setSessions(prev => [newSession, ...prev]);
      setActiveSession(newSessionId);
      try {
        window.history.pushState(null, '', `/c/${newSessionId}`);
      } catch {}
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('coded_user');
    localStorage.removeItem('coded_pending_user');
    localStorage.removeItem('malvos_active_messages');
    localStorage.removeItem('coded_sessions');
    localStorage.removeItem('coded_active_session');
    localStorage.removeItem('malvos_active_workspace');
    localStorage.removeItem('malvos_active_workspace_files');
    localStorage.removeItem('malvos_active_file_name');
    setUser(null);
    setPendingUser(null);
    setMessages([]);
    setActiveSession(null);
    navigateTo('landing');
  };

  // ─── Standalone Editorial Legal Pages (Privacy, Terms, Shipping & Refund, About) ───
  if (['privacy', 'terms', 'refund', 'about'].includes(currentRoute)) {
    return (
      <LegalDocumentPage
        documentType={currentRoute}
        onBack={() => {
          navigateTo(previousRoute || (user ? 'chat' : 'pricing'));
        }}
        onNavigateLegal={(doc) => navigateTo(doc)}
        onNavigatePricing={() => navigateTo('pricing')}
        onSignIn={() => navigateTo(user ? 'chat' : 'auth')}
      />
    );
  }

  // ─── Standalone Support Center Page (/help or /support) ───
  if (currentRoute === 'help' || currentRoute === 'support') {
    return (
      <SupportCenterPage
        initialArticleId={helpArticleId}
        onBack={() => {
          navigateTo(previousRoute || (user ? 'chat' : 'pricing'));
        }}
        onNavigateLegal={(doc) => navigateTo(doc)}
        onNavigatePricing={() => navigateTo('pricing')}
      />
    );
  }

  // ─── 0. Standalone Landing Page ───
  if (currentRoute === 'landing' || (!user && currentRoute !== 'auth' && currentRoute !== 'pricing')) {
    return (
      <LandingPage
        onSignUp={() => navigateTo('auth')}
        onSignIn={() => navigateTo('auth')}
        onNavigatePricing={() => navigateTo('pricing')}
        onNavigateLegal={(doc) => navigateTo(doc)}
      />
    );
  }

  // ─── 1. Standalone Independent Pricing Page ───
  if (currentRoute === 'pricing') {
    return (
      <PricingOnboarding
        user={user || pendingUser}
        onCompletePlan={(updatedUser) => {
          setUser(updatedUser);
          setPendingUser(null);
          localStorage.removeItem('coded_pending_user');
          localStorage.setItem('coded_user', JSON.stringify(updatedUser));
          navigateTo('chat');
        }}
        onSkip={() => {
          const fallback = user || pendingUser || { name: 'Developer', email: 'user@calvras.ai', plan: 'Free' };
          setUser(fallback);
          setPendingUser(null);
          localStorage.removeItem('coded_pending_user');
          localStorage.setItem('coded_user', JSON.stringify(fallback));
          navigateTo('chat');
        }}
        onNavigateLegal={(doc) => navigateTo(doc)}
        onNavigateHelp={(articleId) => navigateTo('help', articleId)}
        onBack={() => navigateTo(previousRoute || 'landing')}
      />
    );
  }

  // ─── 2. Standalone Independent Auth Page (Sign Up / Sign In) ───
  if (currentRoute === 'auth' || !user) {
    return (
      <AuthPage
        onAuthSuccess={(userData) => {
          setUser(userData);
          localStorage.setItem('coded_user', JSON.stringify(userData));
          // Always present the pricing and compliance page directly after onboarding
          navigateTo('pricing');
        }}
        onNavigateLegal={(doc) => navigateTo(doc)}
      />
    );
  }

  // ─── 3. Initial Workspace Loading Skeleton ───
  if (isInitialLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#14120B] text-[#ececed]">
      {/* Mobile sidebar overlay backdrop */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/60 z-40 sm:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar — hidden on mobile unless open, always visible on sm+ */}
      <div className={`
        h-full flex-shrink-0 z-50
        sm:relative sm:translate-x-0 sm:block
        fixed top-0 left-0 bottom-0 transition-transform duration-200
        ${sidebarCollapsed ? '-translate-x-full sm:translate-x-0' : 'translate-x-0'}
      `}>
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onNewChat={handleNewChat}
          onOpenUpgrade={() => navigateTo('pricing')}
          onOpenComputer={() => setIsCodeStudioOpen(true)}
          onOpenArtifacts={() => setIsCodeStudioOpen(true)}
          onOpenCustomize={() => navigateTo('pricing')}
          onOpenDeveloper={() => setActiveNav('developer')}
          onOpenAccount={() => navigateTo('pricing')}
          onOpenCustomerService={() => setIsFeedbackOpen(true)}
          onOpenHelp={() => navigateTo('help')}
          onNavigateLegal={(doc) => navigateTo(doc)}
          onSignOut={handleSignOut}
          sessions={sessions}
          activeSession={activeSession}
          setActiveSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
          user={user}
        />
      </div>

      {/* Main Chat / Projects / Developer Frame — flush connection */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0 bg-[#14120B]">
        <div className="relative flex flex-col flex-1 h-full overflow-hidden border-l border-[#242016] bg-[#14120B]">
          {activeNav === 'projects' ? (
            <ProjectsPage
              sessions={sessions}
              onSelectProject={(p) => {
                if (p.sessionId) {
                  handleSelectSession(p.sessionId);
                } else if (p.prompt) {
                  handleNewChat();
                  setMessages([{
                    id: `msg-${Date.now()}`,
                    role: 'user',
                    content: p.prompt,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }]);
                }
                setActiveNav('home');
              }}
              onCreateProject={() => {
                handleNewChat();
                setActiveNav('home');
              }}
              onDeleteProject={handleDeleteSession}
            />
          ) : activeNav === 'developer' ? (
            <DeveloperPage />
          ) : (
            <MainChat
              messages={messages}
              setMessages={setMessages}
              sidebarCollapsed={sidebarCollapsed}
              setSidebarCollapsed={setSidebarCollapsed}
              activeSessionId={activeSession}
              onSaveWorkspaceFiles={handleSaveWorkspaceFiles}
              onBrowseAll={() => setIsCodeStudioOpen(true)}
              onUserMessage={handleUserMessage}
            />
          )}
        </div>
      </div>

      {/* Modals & Studios */}
      <CodeStudioModal
        isOpen={isCodeStudioOpen}
        onClose={() => setIsCodeStudioOpen(false)}
      />

      <ConnectToolsModal
        isOpen={isToolsOpen}
        onClose={() => setIsToolsOpen(false)}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={() => setIsCodeStudioOpen(true)}
        onStartNew={(prompt) => {
          setMessages([{
            id: `msg-${Date.now()}`,
            role: 'user',
            content: prompt,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }}
      />

      <WorkspacesModal
        isOpen={isWorkspacesOpen}
        onClose={() => setIsWorkspacesOpen(false)}
      />

      <AccountSettingsModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      <BrowseAllModal
        isOpen={isBrowseAllOpen}
        onClose={() => setIsBrowseAllOpen(false)}
        onSelectProject={() => setIsCodeStudioOpen(true)}
      />

      <DeveloperModal
        isOpen={isDeveloperOpen}
        onClose={() => setIsDeveloperOpen(false)}
      />
    </div>
  );
}

// ─── Error Boundary ─────────────────────────────────────────────────────────
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App crashed caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#14120B] text-white p-6 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h2>
          <p className="text-sm text-neutral-400 max-w-md mb-4">{this.state.error?.message || 'Unknown render error'}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
          >
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
