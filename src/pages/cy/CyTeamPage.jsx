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
    <div className="flex-1 min-h-screen bg-[#1c1c1c] text-[#f4f4ee] p-6 sm:p-10 font-sans antialiased text-white select-none text-left overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-10 pt-2 sm:pt-4">
        
        {/* Title Header */}
        <div className="space-y-1 border-b border-white/10 pb-5">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
            Team
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal">
            People with access to <strong>{orgName}</strong>. Everyone here shares the same agent, connectors, and history.
          </p>
        </div>

        {/* Section 1: Members */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Members
          </h2>

          {/* Sub-tabs */}
          <div className="flex items-center gap-1.5 border-b border-white/10 pb-3">
            <div className="bg-neutral-100 p-0.5 rounded-xl flex items-center gap-1 text-xs border border-white/10">
              <button 
                onClick={() => setActiveTab('members')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'members' ? 'bg-white text-white font-bold shadow-2xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>Members</span>
                <span className="text-[10px] bg-neutral-200 text-white px-1.5 py-0.2 rounded-full font-bold">{members.length}</span>
              </button>
              <button 
                onClick={() => setActiveTab('invitations')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'invitations' ? 'bg-white text-white font-bold shadow-2xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>Invitations</span>
                <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1.5 py-0.2 rounded-full font-bold">0</span>
              </button>
              <button 
                onClick={() => setActiveTab('requests')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'requests' ? 'bg-white text-white font-bold shadow-2xs' : 'text-neutral-400 hover:text-white'
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
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#282828] border border-white/10 hover:border-neutral-400 focus:border-neutral-900 rounded-xl text-white placeholder:text-neutral-400 focus:outline-none transition"
              />
            </div>

            <button
              onClick={() => setShowInviteModal(true)}
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs active:scale-95"
            >
              Invite Member
            </button>
          </div>

          {/* Members Table */}
          <div className="border border-white/10 rounded-2xl overflow-hidden shadow-2xs bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-white/10 text-[10.5px] font-semibold text-neutral-400 uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">USER</th>
                  <th className="py-2.5 px-4">JOINED</th>
                  <th className="py-2.5 px-4">ROLE</th>
                  <th className="py-2.5 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-white/5 transition">
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
                            <span className="font-semibold text-white">{m.name}</span>
                            {m.isYou && (
                              <span className="text-[10px] text-neutral-400 bg-neutral-100 px-1.5 rounded font-normal">You</span>
                            )}
                          </div>
                          <span className="text-[11px] text-neutral-400 block">{m.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-400">{m.joined}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-neutral-700 bg-neutral-100 border border-white/10 px-2 py-1 rounded-lg w-fit text-xs font-medium cursor-pointer">
                        <span>{m.role}</span>
                        <ChevronDown size={11} className="text-neutral-400 ml-0.5" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Organization Settings */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Organization Settings
          </h2>

          <div className="bg-[#282828] border border-white/10 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-white/10 flex items-center justify-center text-neutral-700 shadow-2xs">
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Display Name</h3>
                  <p className="text-[11px] text-neutral-400">The visible name of this organization across Calvras workspace.</p>
                </div>
              </div>

              {isEditingOrg ? (
                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="text-xs bg-white border border-neutral-300 px-3 py-1.5 rounded-xl text-white focus:outline-none focus:border-neutral-900"
                  />
                  <button 
                    onClick={() => setIsEditingOrg(false)}
                    className="text-xs font-bold bg-neutral-900 text-white px-3 py-1.5 rounded-xl cursor-pointer shadow-xs"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-white">{orgName}</span>
                  <button 
                    onClick={() => setIsEditingOrg(true)}
                    className="text-xs text-neutral-600 hover:text-white border border-white/10 bg-neutral-50 hover:bg-white/10 px-2.5 py-1 rounded-xl transition cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Leave Organization */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-t border-white/10 pt-3">
              <div className="text-xs font-medium text-neutral-400">
                Leave organization
              </div>
              <div>
                <button 
                  onClick={() => alert('Leaving organization')}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                >
                  Leave organization
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <form onSubmit={handleInvite} className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-white/10 space-y-4 animate-in zoom-in-95 duration-150 text-white text-left">
            <div>
              <h3 className="text-base font-bold text-white">Invite Team Member</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Share access to your marketing campaigns, connectors, and workspace.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Email address</label>
                <input 
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-[#282828] border border-white/10 rounded-xl p-3 text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Role permission</label>
                <select 
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-[#282828] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-neutral-900 cursor-pointer"
                >
                  <option value="Admin">Admin (Full Workspace Access)</option>
                  <option value="Member">Member (Standard Access)</option>
                  <option value="Viewer">Viewer (Read Only)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button 
                type="button" 
                onClick={() => setShowInviteModal(false)}
                className="text-xs text-neutral-400 hover:text-white px-3 py-2 cursor-pointer transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs active:scale-95"
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
