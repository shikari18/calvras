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

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [messages, setMessages] = useState([]);

  // Sessions
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('coded_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeSession, setActiveSession] = useState(null);

  // User profile — pulled from localStorage, no hardcoded values
  const [user] = useState(() => {
    try {
      const saved = localStorage.getItem('coded_user');
      return saved ? JSON.parse(saved) : { name: 'User', plan: 'Free plan', avatar: null };
    } catch {
      return { name: 'User', plan: 'Free plan', avatar: null };
    }
  });

  // Modals
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isWorkspacesOpen, setIsWorkspacesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isBrowseAllOpen, setIsBrowseAllOpen] = useState(false);
  const [isCodeStudioOpen, setIsCodeStudioOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('coded_sessions', JSON.stringify(sessions));
    } catch {}
  }, [sessions]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setActiveSession(null);
    setActiveNav('home');
    setSidebarCollapsed(false);
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

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#18181b] text-[#ececed] p-2 pl-0.5 gap-2">
      {/* Sidebar on the left */}
      <div className="h-full flex-shrink-0">
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onNewChat={handleNewChat}
          onOpenUpgrade={() => setIsAccountOpen(true)}
          onOpenComputer={() => setIsCodeStudioOpen(true)}
          onOpenArtifacts={() => setIsCodeStudioOpen(true)}
          onOpenCustomize={() => setIsAccountOpen(true)}
          sessions={sessions}
          activeSession={activeSession}
          setActiveSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
          user={user}
        />
      </div>

      {/* Main Chat Inset Frame with clear top and all-around border */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="relative flex flex-col flex-1 h-full overflow-hidden rounded-[20px] border border-[#52525a] bg-[rgb(30,30,30)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <MainChat
            messages={messages}
            setMessages={setMessages}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            onBrowseAll={() => setIsCodeStudioOpen(true)}
            onUserMessage={handleUserMessage}
          />
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-[rgb(30,30,30)] text-white p-6 text-center">
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
