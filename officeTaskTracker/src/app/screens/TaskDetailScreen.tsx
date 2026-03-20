import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft, MoreVertical, Calendar, Flag, User2, Tag, Paperclip,
  CheckCircle2, Circle, Edit2, Trash2, X, Star
} from 'lucide-react';
import { useApp, Priority, TaskStatus } from '../context/AppContext';

function PriorityBadge({ priority }: { priority: Priority }) {
  const map: Record<Priority, string> = {
    High: 'bg-red-100 text-red-600 border border-red-200',
    Med: 'bg-amber-100 text-amber-600 border border-amber-200',
    Low: 'bg-green-100 text-green-600 border border-green-200',
  };
  return (
    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${map[priority]}`}>
      {priority} Priority
    </span>
  );
}

function StatusBadge({ status }: { status: TaskStatus }) {
  const map: Record<TaskStatus, { label: string; cls: string }> = {
    'in-progress': { label: 'In Progress', cls: 'bg-amber-100 text-amber-700 border border-amber-200' },
    pending: { label: 'Pending', cls: 'bg-blue-100 text-blue-700 border border-blue-200' },
    completed: { label: 'Completed', cls: 'bg-green-100 text-green-700 border border-green-200' },
  };
  const { label, cls } = map[status];
  return (
    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  );
}

export function TaskDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask, toggleSubtask, toggleFavorite } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);

  const task = tasks.find(t => t.id === id);

  const [editForm, setEditForm] = useState(task ? {
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority as Priority,
    category: task.category,
    status: task.status as TaskStatus,
  } : null);

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-20 gap-4">
        <p className="text-gray-500">Task not found.</p>
        <button onClick={() => navigate('/home')} className="text-[#1B2235] font-medium text-sm underline">
          Go back home
        </button>
      </div>
    );
  }

  const handleSave = () => {
    if (!editForm) return;
    updateTask(task.id, editForm);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/home');
  };

  const completedSubtasks = task.subtasks.filter(s => s.completed).length;

  return (
    <div className="flex flex-col min-h-full bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h1 className="text-base font-semibold text-[#1B2235]">Task Detail</h1>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
          >
            <MoreVertical size={18} className="text-gray-600" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-10 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-10 w-40">
              <button
                onClick={() => { setShowMenu(false); setEditing(true); }}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit2 size={15} /> Edit Task
              </button>
              <button
                onClick={() => { toggleFavorite(task.id); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Star size={15} className={task.favorite ? 'text-amber-400 fill-amber-400' : ''} />
                {task.favorite ? 'Unfavorite' : 'Favorite'}
              </button>
              <button
                onClick={() => { setShowMenu(false); handleDelete(); }}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
              >
                <Trash2 size={15} /> Delete Task
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {/* Status & Priority */}
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
          {task.favorite && (
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1">
              <Star size={10} className="fill-amber-500" /> Favorite
            </span>
          )}
        </div>

        {/* Title & Date */}
        <div>
          <h2 className="text-xl font-bold text-[#1B2235]">{task.title}</h2>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <Calendar size={11} /> Created {task.createdAt}
          </p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-4">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Description</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {task.description || 'No description provided.'}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-3.5">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1.5">
              <Calendar size={9} /> Due Date
            </p>
            <p className="text-sm font-semibold text-[#1B2235]">{task.dueDate || '—'}</p>
          </div>
          <div className="bg-white rounded-2xl p-3.5">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1.5">
              <Flag size={9} /> Priority
            </p>
            <p className="text-sm font-semibold text-[#1B2235]">{task.priority}</p>
          </div>
          <div className="bg-white rounded-2xl p-3.5">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1.5">
              <User2 size={9} /> Assignee
            </p>
            <p className="text-sm font-semibold text-[#1B2235]">{task.assignee}</p>
          </div>
          <div className="bg-white rounded-2xl p-3.5">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1.5">
              <Tag size={9} /> Category
            </p>
            <p className="text-sm font-semibold text-[#1B2235]">{task.category}</p>
          </div>
        </div>

        {/* Subtasks */}
        {task.subtasks.length > 0 && (
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                Subtasks
              </p>
              <span className="text-xs text-gray-400">{completedSubtasks}/{task.subtasks.length}</span>
            </div>
            {/* Progress */}
            <div className="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-[#1B2235] rounded-full"
                style={{ width: task.subtasks.length ? `${(completedSubtasks / task.subtasks.length) * 100}%` : '0%' }}
              />
            </div>
            <div className="space-y-2">
              {task.subtasks.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => toggleSubtask(task.id, sub.id)}
                  className="w-full flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-gray-50 transition"
                >
                  {sub.completed ? (
                    <CheckCircle2 size={18} className="text-[#1B2235] shrink-0" />
                  ) : (
                    <Circle size={18} className="text-gray-300 shrink-0" />
                  )}
                  <span className={`text-sm ${sub.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {sub.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Attachment Area */}
        <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Paperclip size={16} className="text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-600">Attachment Area</p>
                <p className="text-xs text-gray-400">Files, images, links</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300" />
              <div className="w-10 h-10 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pb-2">
          <button
            onClick={() => setEditing(true)}
            className="flex items-center justify-center gap-2 py-3 bg-[#1B2235] rounded-2xl text-white text-sm font-semibold hover:bg-[#252f47] transition"
          >
            <Edit2 size={15} /> Edit Task
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 py-3 bg-red-50 rounded-2xl text-red-500 text-sm font-semibold hover:bg-red-100 transition"
          >
            <Trash2 size={15} /> Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && editForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[430px] rounded-t-3xl p-6 pb-10 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-[#1B2235]">Edit Task</h2>
              <button onClick={() => setEditing(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={e => setEditForm(p => ({ ...p!, title: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={e => setEditForm(p => ({ ...p!, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm focus:outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Due Date</label>
                  <input
                    type="text"
                    value={editForm.dueDate}
                    onChange={e => setEditForm(p => ({ ...p!, dueDate: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Priority</label>
                  <select
                    value={editForm.priority}
                    onChange={e => setEditForm(p => ({ ...p!, priority: e.target.value as Priority }))}
                    className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm focus:outline-none"
                  >
                    <option>High</option>
                    <option>Med</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Category</label>
                  <select
                    value={editForm.category}
                    onChange={e => setEditForm(p => ({ ...p!, category: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm focus:outline-none"
                  >
                    {['Work', 'Design', 'Development', 'Planning', 'Team', 'Writing'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={e => setEditForm(p => ({ ...p!, status: e.target.value as TaskStatus }))}
                    className="w-full px-3 py-2.5 bg-[#F5F6FA] rounded-xl text-sm focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleSave}
                className="w-full py-3 bg-[#1B2235] text-white rounded-xl font-semibold text-sm hover:bg-[#252f47] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
