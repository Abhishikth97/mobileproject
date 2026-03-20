import { useNavigate } from 'react-router';
import { ArrowLeft, Moon, Bell, Mail, Globe, Lock, Download, RefreshCw, Trash2, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-[#1B2235]' : 'bg-gray-200'}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${on ? 'left-5' : 'left-0.5'}`}
      />
    </button>
  );
}

export function SettingsScreen() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();

  const preferences = [
    {
      icon: Moon,
      label: 'Dark Mode',
      desc: 'Switch to dark theme',
      key: 'darkMode' as const,
    },
    {
      icon: Bell,
      label: 'Push Notifications',
      desc: 'Get task reminders',
      key: 'pushNotifications' as const,
    },
    {
      icon: Mail,
      label: 'Email Notifications',
      desc: 'Receive email alerts',
      key: 'emailNotifications' as const,
    },
    {
      icon: Globe,
      label: 'Auto Language',
      desc: 'Detect system language',
      key: 'autoLanguage' as const,
    },
  ];

  const accountItems = [
    { icon: Lock, label: 'Change Password', desc: 'Update credentials' },
    { icon: Download, label: 'Export Data', desc: 'Download your tasks' },
    { icon: RefreshCw, label: 'Sync Settings', desc: 'Sync across devices' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 flex items-center gap-3 border-b border-gray-100">
        <button
          onClick={() => navigate('/settings')}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h1 className="text-base font-semibold text-[#1B2235]">Settings</h1>
      </div>

      <div className="flex-1 px-5 py-5 space-y-5">
        {/* Preferences */}
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Preferences</p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {preferences.map(({ icon: Icon, label, desc, key }, i) => (
              <div
                key={key}
                className={`flex items-center gap-4 px-4 py-4 ${i < preferences.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon size={17} className="text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <Toggle
                  on={settings[key]}
                  onToggle={() => updateSettings({ [key]: !settings[key] })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Account */}
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Account</p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {accountItems.map(({ icon: Icon, label, desc }, i) => (
              <button
                key={label}
                className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition ${i < accountItems.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon size={17} className="text-gray-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <p className="text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-3">Danger Zone</p>
          <div className="bg-red-50 rounded-2xl overflow-hidden border border-red-100">
            <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-red-100 transition">
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                <Trash2 size={17} className="text-red-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-red-600">Delete Account</p>
                <p className="text-xs text-red-400 mt-0.5">Permanently remove all data</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
