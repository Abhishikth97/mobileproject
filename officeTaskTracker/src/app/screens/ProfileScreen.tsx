import { useNavigate } from 'react-router';
import { Edit2, CheckCircle, Star, Flame, ChevronRight, CheckCircle2, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ProfileScreen() {
  const navigate = useNavigate();
  const { user, tasks } = useApp();

  const favoriteTasks = tasks.filter(t => t.favorite);
  const doneTasks = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="flex flex-col min-h-full bg-[#F5F6FA]">
      {/* Dark header */}
      <div className="bg-[#1B2235] px-5 pt-12 pb-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white font-bold text-lg">Profile</h1>
          <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <Edit2 size={16} className="text-white" />
          </button>
        </div>

        {/* Avatar + Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-400 border-2 border-[#1B2235] rounded-full" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">{user.username}</h2>
            <p className="text-[#9BA8BD] text-sm">{user.email}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-amber-400 text-xs">★</span>
              <span className="text-amber-400 text-xs font-medium">
                {user.isPro ? 'Pro Member' : 'Free Member'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white/10 rounded-2xl py-3 text-center">
            <CheckCircle size={16} className="text-[#9BA8BD] mx-auto mb-1" />
            <p className="text-white font-bold text-lg">{doneTasks}</p>
            <p className="text-[#9BA8BD] text-[10px]">Tasks Done</p>
          </div>
          <div className="bg-white/10 rounded-2xl py-3 text-center">
            <Star size={16} className="text-[#9BA8BD] mx-auto mb-1" />
            <p className="text-white font-bold text-lg">{favoriteTasks.length}</p>
            <p className="text-[#9BA8BD] text-[10px]">Favorites</p>
          </div>
          <div className="bg-white/10 rounded-2xl py-3 text-center">
            <Flame size={16} className="text-[#9BA8BD] mx-auto mb-1" />
            <p className="text-white font-bold text-lg">{user.streak}d</p>
            <p className="text-[#9BA8BD] text-[10px]">Streak</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-5 space-y-5">
        {/* Favorite Tasks */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-base">❤</span>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Favorite Tasks</p>
            </div>
            <button className="text-xs text-[#1B2235] font-medium flex items-center gap-1">
              See all <ChevronRight size={12} />
            </button>
          </div>

          {favoriteTasks.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center text-gray-400 text-sm">
              No favorite tasks yet. Star a task to add it here.
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteTasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => navigate(`/task/${task.id}`)}
                  className="w-full bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm hover:shadow-md transition"
                >
                  <Star
                    size={18}
                    className={task.status === 'completed' ? 'text-gray-300' : 'text-amber-400 fill-amber-400'}
                  />
                  <div className="flex-1 text-left min-w-0">
                    <p className={`text-sm font-medium truncate ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{task.category}</p>
                  </div>
                  {task.status === 'completed' && (
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  )}
                  <ChevronRight size={16} className="text-gray-300 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl p-4">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">About</p>
          <div className="space-y-2">
            <div className="h-2.5 bg-gray-100 rounded-full w-full" />
            <div className="h-2.5 bg-gray-100 rounded-full w-4/5" />
            <div className="h-2.5 bg-gray-100 rounded-full w-3/5" />
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Productivity enthusiast using officeTaskTracker to stay on top of daily work tasks, deadlines, and team collaborations.
          </p>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {[
            { label: 'Edit Profile', path: '/settings/preferences' },
            { label: 'App Settings', path: '/settings' },
            { label: 'Notifications', path: '/notifications' },
          ].map(({ label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-50 last:border-none hover:bg-gray-50 transition"
            >
              <span className="text-sm text-gray-700">{label}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
