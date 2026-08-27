import React, { useState } from 'react';
import { X, Clock, Play, Calendar, CheckCircle2 } from 'lucide-react';

export default function ScheduleModal({ isOpen, onClose }) {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Daily Codebase Health & Dependency Audit', schedule: 'Every day at 09:00 AM', status: 'Active' },
    { id: 2, name: 'Weekly Deep Competitor Tech Radar', schedule: 'Every Monday at 08:00 AM', status: 'Active' },
    { id: 3, name: 'PR Auto-Reviewer & Lint Fixer Swarm', schedule: 'On new Pull Request', status: 'Active' },
  ]);
  const [taskName, setTaskName] = useState('');
  const [scheduleTime, setScheduleTime] = useState('Daily at 9:00 AM');

  if (!isOpen) return null;

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    setTasks([...tasks, { id: Date.now(), name: taskName.trim(), schedule: scheduleTime, status: 'Active' }]);
    setTaskName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#131318] border border-[#2b2b3a] rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#1c1c24] hover:bg-[#252533] transition-colors"
        >
          <X size={18} />
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="text-blue-400" size={20} />
            <span>Scheduled Autonomous Tasks</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Configure recurring background jobs and trigger cron schedules for CODED agents.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAddTask} className="space-y-3 mb-5 p-4 rounded-2xl bg-[#171720] border border-[#262633]">
          <div>
            <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Task Description</label>
            <input
              type="text"
              placeholder="e.g. Scrape latest AI papers and post summary"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#1a1a24] border border-[#2e2e3e] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 items-center">
            <select
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-[#1a1a24] border border-[#2e2e3e] text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Daily at 9:00 AM">Daily at 9:00 AM</option>
              <option value="Hourly">Hourly</option>
              <option value="Every 6 hours">Every 6 hours</option>
              <option value="Weekly (Mondays)">Weekly (Mondays)</option>
              <option value="Every 5 minutes">Every 5 minutes (Dev/Testing)</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Add Schedule
            </button>
          </div>
        </form>

        {/* Existing Tasks */}
        <div className="space-y-2 max-h-56 overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#171720] border border-[#242432]"
            >
              <div>
                <div className="text-xs font-semibold text-white">{task.name}</div>
                <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                  <Calendar size={12} className="text-neutral-500" />
                  <span>{task.schedule}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 size={12} />
                <span>{task.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
