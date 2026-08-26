import React, { useState, useEffect } from 'react';
import { CySidebar } from '../../components/cy/CySidebar';
import { CyOverviewPage } from './CyOverviewPage';
import { CyNewChatPage } from './CyNewChatPage';
import { CyChatThreadPage } from './CyChatThreadPage';
import { CyContentsPage } from './CyContentsPage';
import { CyAgentsPage } from './CyAgentsPage';
import { CyFlowsPage } from './CyFlowsPage';
import { CyConnectorsPage } from './CyConnectorsPage';
import { CyTeamPage } from './CyTeamPage';
import { CyBillingPage } from './CyBillingPage';
import { CyAnalyticsPage } from './CyAnalyticsPage';
import { CyDevelopersPage } from './CyDevelopersPage';
import { CyGenericListPage } from './CyGenericListPage';
import { useMarketing } from '../../context/MarketingContext';
import { X } from 'lucide-react';

export const CyLayout = ({ 
  onSignOut, 
  initialTab = 'new-chat',
  userProfile = { name: 'SHIKARI Ogar', email: 'zenithzone18@gmail.com' },
  onOpenLegal
}) => {
  const { createNewChatThread, selectThread, activeThread, activeThreadId, updateThreadTitleInContext } = useMarketing();
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const saved = localStorage.getItem('calvras_active_tab');
      if (saved && typeof saved === 'string') return saved;
    } catch (e) {}
    return initialTab;
  });
  const [threadTitle, setThreadTitle] = useState('Help Making Product Popular');
  const [initialPrompt, setInitialPrompt] = useState('');

  // Persist activeTab on changes
  useEffect(() => {
    try {
      localStorage.setItem('calvras_active_tab', activeTab);
    } catch (e) {}
  }, [activeTab]);
  
  // Desktop sidebar collapse state
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Mobile slide-out drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userName = userProfile?.name || 'SHIKARI Ogar';
  const userEmail = userProfile?.email || 'zenithzone18@gmail.com';

  const handleNewChat = () => {
    setInitialPrompt('');
    setActiveTab('new-chat');
    setMobileMenuOpen(false);
  };

  const handleSelectTab = (tab) => {
    setInitialPrompt('');
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleSelectThread = (threadId) => {
    selectThread(threadId);
    setInitialPrompt('');
    setActiveTab('threads');
    setMobileMenuOpen(false);
  };

  const handleSendMessageFromNewChat = (prompt, attachedImg) => {
    const userMsgId = `user-${Date.now()}`;
    const userMsg = {
      id: userMsgId,
      sender: 'user',
      name: userProfile?.name || userName || 'SHIKARI',
      avatar: userProfile?.picture || null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: prompt || 'What do you think of this image / logo?',
      image: attachedImg || null
    };

    createNewChatThread(prompt, userMsg);
    const shortTitle = prompt.length > 28 ? prompt.slice(0, 28) + '...' : prompt;
    setThreadTitle(shortTitle);
    setInitialPrompt(prompt);
    setActiveTab('threads');
    setMobileMenuOpen(false);
  };

  const currentTitle = activeThread?.title || threadTitle || 'Help Making Product Popular';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#1c1c1c] font-sans text-white antialiased relative">
      
      {/* 1. Desktop Main Left Navigation Sidebar (Hidden on mobile) */}
      <div className="hidden md:flex shrink-0 relative z-30">
        <CySidebar 
          activeTab={activeTab === 'new-chat' ? 'threads' : activeTab}
          onSelectTab={handleSelectTab}
          onSelectThread={handleSelectThread}
          onNewChat={handleNewChat}
          onSignOut={onSignOut}
          threadTitle={currentTitle}
          userProfile={userProfile}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {/* 2. Mobile Slide-Out Drawer (Slides out from left on hamburger click) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex select-none">
          
          {/* Overlay Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 animate-in fade-in duration-150" 
          />

          {/* Slide-out Sidebar Drawer */}
          <div className="relative z-50 w-64 bg-[#1c1c1c] h-full shadow-2xl animate-in slide-in-from-left duration-200 flex flex-col border-r border-white/10">
            
            {/* Mobile Drawer Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition cursor-pointer z-50"
              title="Close Menu"
            >
              <X size={16} />
            </button>

            <CySidebar 
              activeTab={activeTab === 'new-chat' ? 'threads' : activeTab}
              onSelectTab={handleSelectTab}
              onSelectThread={handleSelectThread}
              onNewChat={handleNewChat}
              onSignOut={onSignOut}
              threadTitle={currentTitle}
              userProfile={userProfile}
              isCollapsed={false}
              onToggleCollapse={() => setMobileMenuOpen(false)}
            />
          </div>

        </div>
      )}

      {/* 3. Main Center Canvas View (Clean White Canvas) */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-white relative z-10">
        {activeTab === 'new-chat' && (
          <CyNewChatPage 
            onSendMessage={handleSendMessageFromNewChat}
            userName={userName}
            onToggleSidebar={() => setMobileMenuOpen(!mobileMenuOpen)}
            onNewChat={handleNewChat}
          />
        )}

        {activeTab === 'threads' && (
          <CyChatThreadPage 
            initialPrompt={initialPrompt}
            channelName="general"
            threadTitle={currentTitle}
            userName={userName}
            onToggleSidebar={() => setMobileMenuOpen(!mobileMenuOpen)}
            onUpdateThreadTitle={(title) => {
              setThreadTitle(title);
              updateThreadTitleInContext(title);
            }}
            onNavigateToContents={() => setActiveTab('contents')}
          />
        )}

        {activeTab === 'contents' && (
          <CyContentsPage onNewChat={handleNewChat} />
        )}

        {activeTab === 'overview' && (
          <CyOverviewPage 
            onSelectTab={handleSelectTab}
            userName={userName}
            threadTitle={currentTitle}
          />
        )}

        {activeTab === 'analytics' && (
          <CyAnalyticsPage 
            userName={userName} 
            onNewChat={handleNewChat} 
          />
        )}

        {activeTab === 'agents' && (
          <CyAgentsPage onNewChat={handleNewChat} />
        )}

        {activeTab === 'flows' && (
          <CyFlowsPage onNewChat={handleNewChat} />
        )}

        {activeTab === 'connectors' && (
          <CyConnectorsPage userName={userName} />
        )}

        {activeTab === 'team' && (
          <CyTeamPage userName={userName} userEmail={userEmail} />
        )}

        {activeTab === 'billing' && (
          <CyBillingPage userName={userName} onSelectTab={handleSelectTab} />
        )}

        {['signals', 'artifacts', 'skills', 'runs', 'usage', 'permissions'].includes(activeTab) && (
          <CyGenericListPage 
            tabId={activeTab}
            onNewChat={handleNewChat}
            userName={userName}
          />
        )}
      </div>

    </div>
  );
};
