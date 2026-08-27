import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const MarketingContext = createContext();

const BLANK_BUSINESS_PROFILE = {
  name: '',
  industry: '',
  location: '',
  products: '',
  prices: '',
  targetCustomers: '',
  brandVoice: '',
  channels: 'Instagram, WhatsApp, TikTok, Website, Meta Ads',
  goals: '',
  currentOffers: '',
  paymentMethods: ''
};

const DEFAULT_INITIAL_THREAD = {
  id: 'general-help',
  title: 'New Marketing Campaign',
  updatedAt: new Date().toLocaleDateString(),
  messages: []
};

export const MarketingProvider = ({ children, currentUserEmail = 'zenithzone18@gmail.com' }) => {
  const userKey = (key) => `aim_${currentUserEmail}_${key}`;
  const previousEmailRef = useRef(currentUserEmail);

  // User Profile
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('aim_user_profile');
      return saved ? JSON.parse(saved) : { name: 'SHIKARI Ogar', email: currentUserEmail };
    } catch (e) {
      return { name: 'SHIKARI Ogar', email: currentUserEmail };
    }
  });

  // User-scoped Credits: Strictly 100 default for new accounts
  const [credits, setCredits] = useState(() => {
    try {
      const saved = localStorage.getItem(userKey('credits'));
      return saved ? JSON.parse(saved) : { remaining: 100, used: 0, plan: 'Starter' };
    } catch (e) {
      return { remaining: 100, used: 0, plan: 'Starter' };
    }
  });

  // User-scoped Business Profile
  const [businessProfile, setBusinessProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(userKey('business_profile'));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) {
          if (parsed.name === 'My Business') parsed.name = '';
          if (parsed.location === 'Accra, Ghana') parsed.location = '';
          return parsed;
        }
      }
      return BLANK_BUSINESS_PROFILE;
    } catch (e) {
      return BLANK_BUSINESS_PROFILE;
    }
  });

  // User-scoped Multi-Thread Storage (Array of Threads with their own messages)
  const [chatThreads, setChatThreads] = useState(() => {
    try {
      const saved = localStorage.getItem(userKey('chat_threads_v2'));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(thread => ({
            ...thread,
            messages: (thread.messages || []).filter(m => m.id !== 'calvras-init-1' && m.id !== 'radius-init-1')
          }));
        }
      }
      return [DEFAULT_INITIAL_THREAD];
    } catch (e) {
      return [DEFAULT_INITIAL_THREAD];
    }
  });

  // Active Thread ID
  const [activeThreadId, setActiveThreadId] = useState(() => {
    try {
      const saved = localStorage.getItem(userKey('chat_threads_v2'));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0].id;
      }
    } catch (e) {}
    return 'general-help';
  });

  // User-scoped Campaigns
  const [campaigns, setCampaigns] = useState(() => {
    try {
      const saved = localStorage.getItem(userKey('campaigns'));
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // User-scoped Content Assets
  const [contentList, setContentList] = useState(() => {
    try {
      const saved = localStorage.getItem(userKey('content'));
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // User-scoped Tasks
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(userKey('tasks'));
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // User-scoped Customers
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem(userKey('customers'));
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // User-scoped Connected Socials
  const [connectedSocials, setConnectedSocials] = useState(() => {
    try {
      const saved = localStorage.getItem(userKey('connected_socials'));
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Derived: Current Active Thread and its Messages
  const activeThread = chatThreads.find(t => t.id === activeThreadId) || (chatThreads.length > 0 ? chatThreads[0] : null);
  const chatMessages = activeThread?.messages || [];

  // ACCOUNT ISOLATION SYNC: Reload cleanly when currentUserEmail switches
  useEffect(() => {
    if (previousEmailRef.current !== currentUserEmail) {
      previousEmailRef.current = currentUserEmail;
      
      try {
        const savedCredits = localStorage.getItem(userKey('credits'));
        setCredits(savedCredits ? JSON.parse(savedCredits) : { remaining: 100, used: 0, plan: 'Starter' });

        const savedThreads = localStorage.getItem(userKey('chat_threads_v2'));
        const loadedThreads = savedThreads ? JSON.parse(savedThreads) : [DEFAULT_INITIAL_THREAD];
        setChatThreads(loadedThreads);
        setActiveThreadId(loadedThreads[0]?.id || 'general-help');

        const savedBiz = localStorage.getItem(userKey('business_profile'));
        setBusinessProfile(savedBiz ? JSON.parse(savedBiz) : BLANK_BUSINESS_PROFILE);

        const savedSocials = localStorage.getItem(userKey('connected_socials'));
        setConnectedSocials(savedSocials ? JSON.parse(savedSocials) : []);

        const savedCamps = localStorage.getItem(userKey('campaigns'));
        setCampaigns(savedCamps ? JSON.parse(savedCamps) : []);
      } catch (e) {}
    }
  }, [currentUserEmail]);

  // Persist all state per-user to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(userKey('credits'), JSON.stringify(credits));
    } catch (e) {}
  }, [credits, currentUserEmail]);

  useEffect(() => {
    try {
      localStorage.setItem(userKey('chat_threads_v2'), JSON.stringify(chatThreads));
    } catch (e) {}
  }, [chatThreads, currentUserEmail]);

  useEffect(() => {
    try {
      localStorage.setItem(userKey('business_profile'), JSON.stringify(businessProfile));
    } catch (e) {}
  }, [businessProfile, currentUserEmail]);

  useEffect(() => {
    try {
      localStorage.setItem(userKey('campaigns'), JSON.stringify(campaigns));
    } catch (e) {}
  }, [campaigns, currentUserEmail]);

  useEffect(() => {
    try {
      localStorage.setItem(userKey('content'), JSON.stringify(contentList));
    } catch (e) {}
  }, [contentList, currentUserEmail]);

  useEffect(() => {
    try {
      localStorage.setItem(userKey('tasks'), JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks, currentUserEmail]);

  useEffect(() => {
    try {
      localStorage.setItem(userKey('customers'), JSON.stringify(customers));
    } catch (e) {}
  }, [customers, currentUserEmail]);

  useEffect(() => {
    try {
      localStorage.setItem(userKey('connected_socials'), JSON.stringify(connectedSocials));
    } catch (e) {}
  }, [connectedSocials, currentUserEmail]);

  // Credit Management: Deduct 5 credits per prompt
  const deductCredits = (amount = 5) => {
    if (credits && typeof credits.remaining === 'number' && credits.remaining <= 0) {
      return false;
    }
    setCredits(prev => {
      const currentRemaining = prev?.remaining ?? 1000;
      if (currentRemaining <= 0) return prev;
      const remaining = Math.max(0, currentRemaining - amount);
      const used = (prev?.used || 0) + amount;
      return { ...prev, remaining, used };
    });
    return true;
  };

  // Add credits / Upgrade plan (100 Cedis -> 100, 250 Cedis -> 250, 400 Cedis -> 400)
  const addCredits = (amount, planName) => {
    setCredits(prev => ({
      ...prev,
      remaining: (prev.remaining || 0) + amount,
      plan: planName || prev.plan
    }));
  };

  // Keep activeThreadIdRef always synchronized
  const activeThreadIdRef = useRef(activeThreadId);
  useEffect(() => {
    activeThreadIdRef.current = activeThreadId;
  }, [activeThreadId]);

  // Add message to current active thread (never drops or loses a message)
  const addChatMessage = (msg, specificThreadId = null) => {
    const targetId = specificThreadId || activeThreadIdRef.current || activeThreadId;
    setChatThreads(prevThreads => {
      let found = false;
      const updated = prevThreads.map(thread => {
        if (thread.id === targetId) {
          found = true;
          const currentMsgs = thread.messages || [];
          if (currentMsgs.some(m => m.id === msg.id)) {
            return thread;
          }
          
          // Auto-update thread title if it's the first user message
          let newTitle = thread.title;
          if (msg.sender === 'user' && (thread.title === 'Help Making Product Popular' || thread.title === 'New Chat' || thread.title.startsWith('New '))) {
            newTitle = msg.text.length > 28 ? msg.text.slice(0, 28) + '...' : msg.text;
          }

          return {
            ...thread,
            title: newTitle,
            updatedAt: new Date().toLocaleDateString(),
            messages: [...currentMsgs, msg]
          };
        }
        return thread;
      });

      if (!found) {
        if (updated.length > 0) {
          return updated.map((t, idx) => idx === 0 ? { ...t, messages: [...(t.messages || []), msg] } : t);
        }
        return [{
          id: targetId,
          title: 'New Marketing Campaign',
          updatedAt: new Date().toLocaleDateString(),
          messages: [msg]
        }];
      }

      return updated;
    });
  };

  // Create a brand new distinct conversation thread (Creates another item in RECENT)
  const createNewChatThread = (promptText = '', initialUserMsg = null) => {
    const newThreadId = `thread_${Date.now()}`;
    const shortTitle = promptText ? (promptText.length > 28 ? promptText.slice(0, 28) + '...' : promptText) : 'New Chat';
    
    const messages = initialUserMsg ? [initialUserMsg] : [];
    const newThread = {
      id: newThreadId,
      title: shortTitle,
      updatedAt: new Date().toLocaleDateString(),
      messages: messages
    };

    activeThreadIdRef.current = newThreadId;
    setChatThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThreadId);
    return newThreadId;
  };

  // Select/switch active thread from history
  const selectThread = (threadId) => {
    activeThreadIdRef.current = threadId;
    setActiveThreadId(threadId);
  };

  // Delete a specific thread from history
  const deleteThread = (threadId, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setChatThreads(prev => {
      const remaining = prev.filter(t => t.id !== threadId);
      if (remaining.length === 0) {
        setActiveThreadId('');
        return [];
      }
      if (activeThreadId === threadId) {
        setActiveThreadId(remaining[0].id);
      }
      return remaining;
    });
  };

  const updateThreadTitleInContext = (title) => {
    setChatThreads(prev => prev.map(t => t.id === activeThreadId ? { ...t, title, updatedAt: new Date().toLocaleDateString() } : t));
  };

  // Connect Social Account
  const connectSocialAccount = (accountData) => {
    setConnectedSocials(prev => {
      const filtered = prev.filter(a => a.channel !== accountData.channel);
      return [accountData, ...filtered];
    });
  };

  const disconnectSocialAccount = (channel) => {
    setConnectedSocials(prev => prev.filter(a => a.channel !== channel));
  };

  const updateBusinessProfile = (updatedFields) => {
    setBusinessProfile(prev => ({ ...prev, ...updatedFields }));
  };

  const addCampaign = (newCampaign) => {
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  const deleteCampaign = (id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const addContent = (newContent) => {
    setContentList(prev => [newContent, ...prev]);
  };

  const deleteContent = (id) => {
    setContentList(prev => prev.filter(c => c.id !== id));
  };

  const addTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addCustomer = (newCust) => {
    setCustomers(prev => [newCust, ...prev]);
  };

  return (
    <MarketingContext.Provider value={{
      credits,
      deductCredits,
      addCredits,
      businessProfile,
      updateBusinessProfile,
      chatMessages,
      addChatMessage,
      createNewChatThread,
      selectThread,
      deleteThread,
      activeThreadId,
      activeThread,
      chatThreads,
      updateThreadTitleInContext,
      campaigns,
      addCampaign,
      deleteCampaign,
      contentList,
      addContent,
      deleteContent,
      tasks,
      addTask,
      toggleTask,
      deleteTask,
      customers,
      addCustomer,
      connectedSocials,
      connectSocialAccount,
      disconnectSocialAccount,
      userProfile,
      setUserProfile
    }}>
      {children}
    </MarketingContext.Provider>
  );
};

export const useMarketing = () => {
  const context = useContext(MarketingContext);
  if (!context) {
    throw new Error('useMarketing must be used within a MarketingProvider');
  }
  return context;
};
