import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, ChevronDown, Check, Building2, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CyTeamPage = ({ userName = 'SHIKARI Ogar', userEmail = 'zenithzone18@gmail.com' }) => {
  const [activeTab, setActiveTab] = useState('members');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');
  const [orgName, setOrgName] = useState("SHIKARI's Organization");
  const [isEditingOrg, setIsEditingOrg] = useState(false);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: userName,
      isYou: true,
      email: userEmail,
      joined: '8/20/2026',
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    }
  ]);

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember = {
      id: Date.now(),
      name: inviteEmail.split('@')[0],
      isYou: false,
      email: inviteEmail,
      joined: new Date().toLocaleDateString('en-US'),
      role: inviteRole,
      avatar: null
    };

    setMembers([...members, newMember]);
    setInviteEmail('');
    setShowInviteModal(false);
    try { confetti({ particleCount: 50, spread: 60 }); } catch (err) {}
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-6 sm:p-10 font-sans antialiased text-neutral-900 select-none text-left overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-10 pt-2 sm:pt-4">
        
        {/* Title Header */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
            Team
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            People with access to <strong>{orgName}</strong>. Everyone here shares the same agent, connectors, and history.
          </p>
        </div>

        {/* Section 1: Members */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Members
          </h2>

          {/* Sub-tabs */}
          <div className="flex items-center gap-1.5 border-b border-neutral-100 pb-3">
            <div className="bg-[#f0f0f2] p-0.5 rounded-xl flex items-center gap-1 text-xs">
              <button 
                onClick={() => setActiveTab('members')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'members' ? 'bg-white text-neutral-900 font-semibold shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <span>Members</span>
                <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1.5 py-0.2 rounded-full font-bold">{members.length}</span>
              </button>
              <button 
                onClick={() => setActiveTab('invitations')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'invitations' ? 'bg-white text-neutral-900 font-semibold shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <span>Invitations</span>
                <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1.5 py-0.2 rounded-full font-bold">0</span>
              </button>
              <button 
                onClick={() => setActiveTab('requests')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'requests' ? 'bg-white text-neutral-900 font-semibold shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <span>Requests</span>
                <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1.5 py-0.2 rounded-full font-bold">0</span>
              </button>
            </div>
          </div>

          {/* Search and Invite */}
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#e5e5e7] hover:border-neutral-400 focus:border-neutral-900 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition"
              />
            </div>

            <button
              onClick={() => setShowInviteModal(true)}
              className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs"
            >
              Invite
            </button>
          </div>

          {/* Members Table */}
          <div className="border border-[#e5e5e7] rounded-2xl overflow-hidden shadow-2xs bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[10.5px] font-semibold text-neutral-400 uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">USER</th>
                  <th className="py-2.5 px-4">JOINED</th>
                  <th className="py-2.5 px-4">ROLE</th>
                  <th className="py-2.5 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-neutral-50/60 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden">
                          {m.avatar ? (
                            <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                          ) : (
                            m.name.slice(0, 1).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-neutral-900">{m.name}</span>
                            {m.isYou && (
                              <span className="text-[10px] text-neutral-400 bg-neutral-100 px-1.5 rounded font-normal">You</span>
                            )}
                          </div>
                          <span className="text-[11px] text-neutral-400 block">{m.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-500">{m.joined}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-neutral-700 bg-neutral-100/80 px-2 py-1 rounded-lg w-fit text-xs font-medium cursor-pointer">
                        <span>{m.role}</span>
                        <ChevronDown size={11} className="text-neutral-400 ml-0.5" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-neutral-400 hover:text-neutral-700 p-1 transition cursor-pointer">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: General Organization Settings */}
        <div className="space-y-6 pt-4 border-t border-neutral-200">
          <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            General
          </h2>

          {/* Profile Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-neutral-100">
            <div className="w-32 text-xs font-medium text-neutral-500">
              Profile
            </div>
            <div className="flex-1 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Building2 size={16} />
              </div>
              <div>
                {isEditingOrg ? (
                  <input 
                    type="text" 
                    value={orgName} 
                    onChange={(e) => setOrgName(e.target.value)} 
                    onBlur={() => setIsEditingOrg(false)}
                    className="text-xs font-semibold text-neutral-900 border border-neutral-300 rounded px-2 py-1"
                    autoFocus
                  />
                ) : (
                  <span className="text-xs font-semibold text-neutral-900 block">{orgName}</span>
                )}
              </div>
            </div>
            <button 
              onClick={() => setIsEditingOrg(!isEditingOrg)}
              className="text-xs font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer"
            >
              Update profile
            </button>
          </div>

          {/* Verified Domains */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 py-2 border-b border-neutral-100">
            <div className="w-32 text-xs font-medium text-neutral-500">
              Verified domains
            </div>
            <div className="flex-1 space-y-1">
              <button 
                onClick={() => alert('Domain verification: add DNS TXT record')} 
                className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus size={12} />
                <span>Add domain</span>
              </button>
              <p className="text-[11px] text-neutral-400">
                Allow users to join the organization automatically or request to join based on a verified email domain.
              </p>
            </div>
          </div>

          {/* Leave Organization */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
            <div className="w-32 text-xs font-medium text-neutral-500">
              Leave organization
            </div>
            <div className="flex-1">
              <button 
                onClick={() => alert('Leaving organization')}
                className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
              >
                Leave organization
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleInvite} className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-neutral-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div>
              <h3 className="text-sm font-bold text-neutral-950">Invite Team Member</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Share access to your agents, connectors, and workspaces.</p>
            </div>

            <div className="space-y-3 text-xs">
              <input 
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                required
              />

              <select 
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="Admin">Admin (Full Access)</option>
                <option value="Member">Member (Standard Access)</option>
                <option value="Viewer">Viewer (Read Only)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => setShowInviteModal(false)}
                className="text-xs text-neutral-500 hover:text-neutral-800 px-3 py-2 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
