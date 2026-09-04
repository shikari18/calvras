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

function getInitialRoute() {
  try {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    // Explicit URL-based route detection
    if (path.startsWith('/pricing')) return 'pricing';
    if (path.startsWith('/auth') || path.startsWith('/login') || path.startsWith('/signup') ||
        hash.includes('login') || hash.includes('auth')) return 'auth';
    if (path.startsWith('/chat') || path.startsWith('/app') || hash.includes('chat')) {
      const savedUser = localStorage.getItem('coded_user');
      return savedUser ? 'chat' : 'landing';
    }
    if (path.startsWith('/landing') || hash.includes('landing')) return 'landing';

    // For root "/" or unknown paths — restore from last saved route
    const saved = localStorage.getItem('malvos_current_route');
    if (saved === 'pricing') return 'pricing';
    if (saved === 'chat') {
      const savedUser = localStorage.getItem('coded_user');
      return savedUser ? 'chat' : 'landing';
    }
    if (saved === 'auth') {
      const savedUser = localStorage.getItem('coded_user');
      return savedUser ? 'chat' : 'auth';
    }

    // First visit — if user is logged in go to chat, else landing
    const savedUser = localStorage.getItem('coded_user');
    return savedUser ? 'chat' : 'landing';
  } catch {
    return 'landing';
  }
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);
  const [pendingUser, setPendingUser] = useState(() => {
    try {
      const saved = localStorage.getItem('coded_pending_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const navigateTo = (route) => {
    setCurrentRoute(route);
    try {
      localStorage.setItem('malvos_current_route', route);
      const url = route === 'chat' ? '/' : `/${route}`;
      window.history.pushState(null, '', url);
    } catch {}
  };

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
      const currentUser = (() => {
        try {
          const s = localStorage.getItem('coded_user');
          return s ? JSON.parse(s) : null;
        } catch { return null; }
      })();
      const email = (currentUser?.email || 'guest').toLowerCase().trim().replace(/[^a-z0-9_]/g, '_');
      const activeId = localStorage.getItem(`calvras_active_session_${email}`) || localStorage.getItem('coded_active_session');
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
    const currentUser = (() => {
      try {
        const s = localStorage.getItem('coded_user');
        return s ? JSON.parse(s) : null;
      } catch { return null; }
    })();
    const email = (currentUser?.email || 'guest').toLowerCase().trim().replace(/[^a-z0-9_]/g, '_');
    return localStorage.getItem(`calvras_active_session_${email}`) || localStorage.getItem('coded_active_session') || null;
  });

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
    if (activeSession && messages.length > 0) {
      setSessions(prev => prev.map(s => s.id === activeSession ? { ...s, messages } : s));
    }
  }, [messages, activeSession]);

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
    localStorage.removeItem('malvos_active_messages');
    localStorage.removeItem('coded_active_session');
    localStorage.removeItem('malvos_active_workspace');
    localStorage.removeItem('malvos_active_workspace_files');
    localStorage.removeItem('malvos_active_file_name');
    localStorage.removeItem('malvos_split_screen');
    window.dispatchEvent(new CustomEvent('malvos_reset_workspace'));
  };

  const handleSelectSession = (sessionId) => {
    const sess = sessions.find(s => s.id === sessionId);
    if (sess) {
      setActiveSession(sessionId);
      setMessages(sess.messages || []);
      setSidebarCollapsed(true);
    }
  };

  const handleDeleteSession = (sessionId) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSession === sessionId) {
      handleNewChat();
    }
  };

  const handleUserMessage = (query) => {
    setSidebarCollapsed(true);
    if (!activeSession) {
      const newSessionId = `session-${Date.now()}`;
      const title = query.slice(0, 30) + (query.length > 30 ? '...' : '');
      const newSession = {
        id: newSessionId,
        title: title || 'New Conversation',
        messages: []
      };
      setSessions(prev => [newSession, ...prev]);
      setActiveSession(newSessionId);
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

  // ─── 0. Standalone Landing Page ───
  if (currentRoute === 'landing' || (!user && currentRoute !== 'auth' && currentRoute !== 'pricing')) {
    return (
      <LandingPage
        onSignUp={() => navigateTo('auth')}
        onSignIn={() => navigateTo('auth')}
        onNavigatePricing={() => navigateTo('pricing')}
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
          navigateTo('chat');
        }}
      />
    );
  }

  // ─── 3. Initial Workspace Loading Skeleton ───
  if (isInitialLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0f0f0e] text-[#ececed]">
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
          onSignOut={handleSignOut}
          sessions={sessions}
          activeSession={activeSession}
          setActiveSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
          user={user}
        />
      </div>

      {/* Main Chat / Projects / Developer Frame */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0 p-2 sm:py-2.5 sm:pr-2.5 sm:pl-0 bg-[#0d0d0f]">
        <div className="relative flex flex-col flex-1 h-full overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#1c1c1c] shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
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
            />
          ) : activeNav === 'developer' ? (
            <DeveloperPage />
          ) : (
            <MainChat
              messages={messages}
              setMessages={setMessages}
              sidebarCollapsed={sidebarCollapsed}
              setSidebarCollapsed={setSidebarCollapsed}
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0e] text-white p-6 text-center">
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
