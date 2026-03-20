import { useNavigate } from 'react-router';
import { ChevronRight, User, Bell, Sliders, Zap, LogOut, Menu, CheckSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function SettingsMenuScreen() {
  const navigate = useNavigate();
  const { logout, user } = useApp();

  const menuGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile',
          desc: 'Manage your personal info',
          path: '/profile',
          color: 'bg-blue-100 text-blue-600',
        },
        {
          icon: Bell,
          label: 'Notifications',
          desc: 'Alerts and reminders',
          path: '/notifications',
          color: 'bg-purple-100 text-purple-600',
        },
      ],
    },
    {
      title: 'App',
      items: [
        {
          icon: Sliders,
          label: 'App Preferences',
          desc: 'Dark mode, language & more',
          path: '/settings/preferences',
          color: 'bg-green-100 text-green-600',
        },
        {
          icon: Zap,
          label: 'API Integration',
          desc: 'Real-time task sync',
          path: '/api',
          color: 'bg-amber-100 text-amber-600',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-[#1B2235] px-5 pt-12 pb-8">
        {/* Top row: menu icon + title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <Menu size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Settings</h1>
            <p className="text-[#9BA8BD] text-xs">Manage your account &amp; app</p>
          </div>
        </div>

        {/* User card */}
        <div className="bg-white/10 rounded-2xl px-4 py-3.5 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{user.username}</p>
            <p className="text-[#9BA8BD] text-xs">{user.email}</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckSquare size={13} className="text-amber-400" />
            <span className="text-amber-400 text-xs font-medium">{user.isPro ? 'Pro' : 'Free'}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-5 space-y-5">
        {menuGroups.map(group => (
          <div key={group.title}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
              {group.title}
            </p>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {group.items.map(({ icon: Icon, label, desc, path, color }, i) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition ${i < group.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-gray-800">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full flex items-center gap-4 px-4 py-4 hover:bg-red-50 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <LogOut size={20} className="text-red-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-red-500">Log Out</p>
                <p className="text-xs text-gray-400 mt-0.5">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>

        {/* App version */}
        <p className="text-center text-xs text-gray-400">officeTaskTracker v1.0.0</p>
      </div>
    </div>
  );
}