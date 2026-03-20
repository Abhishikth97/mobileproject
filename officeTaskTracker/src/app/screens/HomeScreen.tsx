import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, CheckCircle2, Clock, BarChart3, Bell, User, X, Calendar, Flag, Tag, Database, CheckSquare } from 'lucide-react';
import { useApp, Priority, TaskStatus } from '../context/AppContext';

function PriorityBadge({ priority }: { priority: Priority }) {
  const map = {
    High: 'bg-red-100 text-red-600',
    Med: 'bg-amber-100 text-amber-600',
    Low: 'bg-green-100 text-green-600',
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${map[priority]}`}>
      {priority}
    </span>
  );
}

function AddTaskModal({ onClose }: { onClose: () => void }) {
  const { addTask } = useApp();
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Med' as Priority,
    category: 'Work',
    status: 'pending' as TaskStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    addTask({ ...form, assignee: 'Abhishikth', favorite: false, subtasks: [] });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-white w-full max-w-[430px] rounded-t-3xl p-6 pb-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-[#1B2235]">Add New Task</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Task Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              placeholder="Enter task title..."
              className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2235]/20"
              required
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Task description..."
              rows={2}
              className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2235]/20 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Calendar size={10} /> Due Date
              </label>
              <input
                type="text"
                value={form.dueDate}
                onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                placeholder="e.g. Mar 25, 2026"
                className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Flag size={10} /> Priority
              </label>
              <select
                value={form.priority}
                onChange={e => setForm(p => ({ ...p, priority: e.target.value as Priority }))}
                className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm text-gray-700 focus:outline-none"
              >
                <option>High</option>
                <option>Med</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Tag size={10} /> Category
            </label>
            <select
              value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm text-gray-700 focus:outline-none"
            >
              {['Work', 'Design', 'Development', 'Planning', 'Team', 'Writing'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#1B2235] text-white rounded-xl font-semibold text-sm hover:bg-[#252f47] transition"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export function HomeScreen() {
  const navigate = useNavigate();
  const { tasks, user, notifications, toggleTaskComplete } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const unread = notifications.filter(n => !n.read).length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status !== 'completed').length;
  const doneTasks = tasks.filter(t => t.status === 'completed').length;
  const weeklyPercent = Math.round((doneTasks / totalTasks) * 100);

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.status === 'completed';
    if (filter === 'pending') return t.status !== 'completed';
    return true;
  });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // localStorage summary
  const lsTaskCount = (() => {
    try {
      const raw = localStorage.getItem('ott_tasks');
      return raw ? (JSON.parse(raw) as unknown[]).length : 0;
    } catch { return 0; }
  })();

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-[#1B2235] px-5 pt-10 pb-6">
        {/* Logo + app name */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
            <CheckSquare size={15} className="text-white" />
          </div>
          <span className="text-white text-sm font-semibold tracking-wide">officeTaskTracker</span>
        </div>

        {/* User greeting + icons */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#9BA8BD] text-xs">{greeting},</p>
            <h2 className="text-white font-bold text-lg">{user.username}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/notifications')}
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center relative"
            >
              <Bell size={18} className="text-white" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white" style={{ fontSize: '9px' }}>
                  {unread}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
            >
              <User size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total', value: totalTasks },
            { label: 'Pending', value: pendingTasks },
            { label: 'Done', value: doneTasks },
          ].map(stat => (
            <div key={stat.label} className="bg-white/10 rounded-2xl py-4 text-center">
              <p className="text-white text-xl font-bold">{stat.value}</p>
              <p className="text-[#9BA8BD] text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-5 space-y-5 bg-[#F5F6FA]">
        {/* Quick Actions */}
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Quick Actions</p>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#1B2235] rounded-2xl py-4 flex flex-col items-center gap-2 hover:bg-[#252f47] transition active:scale-95"
            >
              <Plus size={22} className="text-white" />
              <span className="text-white text-xs font-medium">Add Task</span>
            </button>
            <button
              onClick={() => setFilter(f => f === 'completed' ? 'all' : 'completed')}
              className={`rounded-2xl py-4 flex flex-col items-center gap-2 transition active:scale-95 ${filter === 'completed' ? 'bg-[#1B2235]' : 'bg-white'}`}
            >
              <CheckCircle2 size={22} className={filter === 'completed' ? 'text-white' : 'text-gray-500'} />
              <span className={`text-xs font-medium ${filter === 'completed' ? 'text-white' : 'text-gray-600'}`}>Completed</span>
            </button>
            <button
              onClick={() => setFilter(f => f === 'pending' ? 'all' : 'pending')}
              className={`rounded-2xl py-4 flex flex-col items-center gap-2 transition active:scale-95 ${filter === 'pending' ? 'bg-[#1B2235]' : 'bg-white'}`}
            >
              <Clock size={22} className={filter === 'pending' ? 'text-white' : 'text-gray-500'} />
              <span className={`text-xs font-medium ${filter === 'pending' ? 'text-white' : 'text-gray-600'}`}>Pending</span>
            </button>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Weekly Progress</span>
            </div>
            <span className="text-sm font-bold text-[#1B2235]">{weeklyPercent}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1B2235] rounded-full transition-all"
              style={{ width: `${weeklyPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {doneTasks} of {totalTasks} tasks completed this week
          </p>
        </div>

        {/* LocalStorage Persistence Badge */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
            <Database size={15} className="text-blue-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-blue-700">Data Persisted to localStorage</p>
            <p className="text-[10px] text-blue-500">{lsTaskCount} tasks saved · key: ott_tasks</p>
          </div>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">LIVE</span>
        </div>

        {/* Recent Tasks */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              {filter === 'all' ? 'Recent Tasks' : filter === 'completed' ? 'Completed Tasks' : 'Pending Tasks'}
            </p>
            {filter !== 'all' && (
              <button onClick={() => setFilter('all')} className="text-xs text-[#1B2235] font-medium">
                See all →
              </button>
            )}
          </div>
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div key={task.id} className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
                <button onClick={() => toggleTaskComplete(task.id)} className="shrink-0">
                  {task.status === 'completed' ? (
                    <CheckCircle2 size={20} className="text-[#1B2235]" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </button>
                <button className="flex-1 text-left min-w-0" onClick={() => navigate(`/task/${task.id}`)}>
                  <p className={`text-sm font-medium text-gray-800 truncate ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Calendar size={11} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{task.dueDate || 'No date'}</span>
                  </div>
                </button>
                <PriorityBadge priority={task.priority} />
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">No tasks found</div>
            )}
          </div>
        </div>
      </div>

      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
}