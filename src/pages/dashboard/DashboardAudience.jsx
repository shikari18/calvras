import React, { useState } from 'react';
import { Plus, Users, ShoppingBag, MessageSquare, Send, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketing } from '../../context/MarketingContext';

export const DashboardAudience = () => {
  const { businessProfile } = useMarketing();
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Kofi Mensah', phone: '+233 24 123 4567', segment: 'VIP Buyers', spent: 'GHS 2,450', orders: 6, channel: 'WhatsApp' },
    { id: 2, name: 'Akosua Darko', phone: '+233 50 987 6543', segment: 'High Intent', spent: 'GHS 1,200', orders: 3, channel: 'Instagram' },
    { id: 3, name: 'Emmanuel Asante', phone: '+233 20 555 1212', segment: 'New Lead', spent: 'GHS 450', orders: 1, channel: 'TikTok' },
    { id: 4, name: 'Nana Yaw', phone: '+233 24 888 9900', segment: 'VIP Buyers', spent: 'GHS 3,100', orders: 8, channel: 'WhatsApp' },
    { id: 5, name: 'Abena Serwaa', phone: '+233 54 222 3344', segment: 'Repeat Buyer', spent: 'GHS 1,800', orders: 4, channel: 'WhatsApp' },
  ]);

  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustomerName || !newCustomerPhone) return;

    const newC = {
      id: Date.now(),
      name: newCustomerName,
      phone: newCustomerPhone,
      segment: 'New Lead',
      spent: 'GHS 0',
      orders: 0,
      channel: 'WhatsApp'
    };

    setCustomers([newC, ...customers]);
    setNewCustomerName('');
    setNewCustomerPhone('');
    setShowAddModal(false);
    try { confetti({ particleCount: 50, spread: 60 }); } catch (e) {}
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-950 tracking-tight">Audience & CRM</h1>
          <p className="text-sm text-neutral-500 font-normal mt-0.5">
            Customer segments and WhatsApp contacts for <strong>{businessProfile.name}</strong>.
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer">
          <Plus size={15} /><span>Add Contact</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Total Customer Records</span>
          <h3 className="text-2xl font-bold text-neutral-950 mt-1">1,240</h3>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">↑ 48 this week</span>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">VIP Repeat Customers</span>
          <h3 className="text-2xl font-bold text-neutral-950 mt-1">318</h3>
          <span className="text-xs text-purple-700 font-semibold mt-1 inline-block">25.6% of audience</span>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">WhatsApp Broadcast Reach</span>
          <h3 className="text-2xl font-bold text-neutral-950 mt-1">98.4%</h3>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">Delivery Rate</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Active Customer Directory</h3>
          <span className="text-xs font-semibold text-neutral-500">{customers.length} Contacts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 font-medium pb-2">
                <th className="pb-3">Customer</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Segment</th>
                <th className="pb-3">Total Spend</th>
                <th className="pb-3">Orders</th>
                <th className="pb-3">Source</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50 transition">
                  <td className="py-3 font-bold text-neutral-900">{c.name}</td>
                  <td className="py-3 text-neutral-500">{c.phone}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">
                      {c.segment}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-neutral-900">{c.spent}</td>
                  <td className="py-3 text-neutral-600">{c.orders}</td>
                  <td className="py-3 text-neutral-500">{c.channel}</td>
                  <td className="py-3">
                    <button onClick={() => alert(`Opening WhatsApp chat with ${c.name} (${c.phone})`)} className="text-purple-600 font-bold hover:underline cursor-pointer">
                      Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddCustomer} className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-neutral-200 space-y-4">
            <h3 className="text-sm font-bold text-neutral-950">Add Customer Contact</h3>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={newCustomerName}
              onChange={(e) => setNewCustomerName(e.target.value)}
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-900"
              required 
            />
            <input 
              type="text" 
              placeholder="Phone number (+233 ...)" 
              value={newCustomerPhone}
              onChange={(e) => setNewCustomerPhone(e.target.value)}
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-900"
              required 
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="text-xs text-neutral-500 px-3 py-2">Cancel</button>
              <button type="submit" className="bg-purple-600 text-white text-xs font-bold px-4 py-2 rounded-xl">Add Contact</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
