import { useState } from 'react';
import { Bell, Clock, CheckCircle2, AlertTriangle, Info, CheckCheck, Trash2, Zap, Database } from 'lucide-react';
import { useApp, AppNotification } from '../context/AppContext';

function NotifIcon({ type }: { type: AppNotification['type'] }) {
  const map = {
    reminder: { Icon: Clock,         cls: 'bg-amber-100 text-amber-500' },
    success:  { Icon: CheckCircle2,  cls: 'bg-green-100 text-green-500' },
    warning:  { Icon: AlertTriangle, cls: 'bg-red-100 text-red-500'     },
    info:     { Icon: Info,          cls: 'bg-blue-100 text-blue-500'   },
  };
  const { Icon, cls } = map[type];
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${cls}`}>
      <Icon size={18} />
    </div>
  );
}

interface AlertSetting {
  label: string;
  desc: string;
  enabled: boolean;
}

export function NotificationsScreen() {
  const { notifications, markNotificationRead, markAllRead, triggerTestNotification, updateSettings, settings } = useApp();
  const unread = notifications.filter(n => !n.read).length;

  const [alertSettings, setAlertSettings] = useState<AlertSetting[]>([
    { label: 'Task Reminders',   desc: 'Due date alerts',           enabled: true  },
    { label: 'Task Assignments', desc: 'When assigned to a task',   enabled: true  },
    { label: 'Daily Summary',    desc: 'Morning task overview',     enabled: false },
    { label: 'Weekly Report',    desc: 'Progress summary',          enabled: true  },
  ]);

  const [testSent, setTestSent] = useState(false);

  const toggleAlert = (index: number) => {
    setAlertSettings(prev =>
      prev.map((a, i) => i === index ? { ...a, enabled: !a.enabled } : a)
    );
  };

  const handleTestAlert = () => {
    triggerTestNotification();
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const handleClearAll = () => {
    // keeps array but won't work without context — we just mark all as read as proxy
    markAllRead();
  };

  // Get localStorage summary
  const lsSize = (() => {
    try {
      const keys = ['ott_auth', 'ott_user', 'ott_tasks', 'ott_notifications', 'ott_settings'];
      let total = 0;
      keys.forEach(k => { total += (localStorage.getItem(k) || '').length; });
      return (total / 1024).toFixed(1);
    } catch { return '—'; }
  })();

  return (
    <div className="flex flex-col min-h-full bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-[#1B2235] px-5 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-xl">Notifications</h1>
            {unread > 0 && (
              <p className="text-[#9BA8BD] text-sm mt-0.5">{unread} unread</p>
            )}
          </div>
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-xs text-white font-medium"
            >
              <CheckCheck size={13} /> Mark all read
            </button>
          )}
        </div>

        {/* Bell + summary */}
        <div className="flex items-center gap-3 mt-5">
          <div className="relative">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Bell size={24} className="text-white" />
            </div>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                {unread}
              </span>
            )}
          </div>
          <div>
            <p className="text-white font-medium text-sm">Recent Activity</p>
            <p className="text-[#9BA8BD] text-xs">{notifications.length} total · {unread} unread</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-5 space-y-5">

        {/* ── Test Alert button ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Alert Configuration</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <Zap size={18} className="text-amber-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Send Test Notification</p>
              <p className="text-xs text-gray-400 mt-0.5">Trigger a live alert to verify setup</p>
            </div>
            <button
              onClick={handleTestAlert}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${testSent ? 'bg-green-100 text-green-600' : 'bg-[#1B2235] text-white hover:bg-[#252f47]'}`}
            >
              {testSent ? '✓ Sent!' : 'Send'}
            </button>
          </div>
          {testSent && (
            <div className="mt-3 bg-green-50 border border-green-100 rounded-xl p-2.5 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              <p className="text-xs text-green-700">Test notification triggered successfully!</p>
            </div>
          )}
        </div>

        {/* ── Recent Notifications ── */}
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Recent</p>
          <div className="space-y-2.5">
            {notifications.map(notif => (
              <button
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`w-full flex items-start gap-3 bg-white rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition ${!notif.read ? 'ring-1 ring-[#1B2235]/10' : ''}`}
              >
                <NotifIcon type={notif.type} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${notif.read ? 'text-gray-500' : 'text-gray-800'}`}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-[#1B2235] rounded-full shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{notif.message}</p>
                  <p className="text-[10px] text-gray-300 mt-1.5">{notif.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Alert Settings toggles ── */}
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Alert Settings</p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {alertSettings.map(({ label, desc, enabled }, i) => (
              <div
                key={label}
                className={`flex items-center gap-4 px-4 py-3.5 ${i < alertSettings.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => toggleAlert(i)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-[#1B2235]' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${enabled ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Local Storage Persistence badge ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
              <Database size={17} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Local Storage Active</p>
              <p className="text-xs text-gray-400">Data persists across sessions</p>
            </div>
            <span className="ml-auto text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {lsSize} KB
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {['ott_tasks', 'ott_settings', 'ott_notifications'].map(key => (
              <div key={key} className="bg-[#F5F6FA] rounded-xl p-2 text-center">
                <p className="text-[9px] font-mono text-gray-400 truncate">{key.replace('ott_', '')}</p>
                <p className="text-[10px] font-semibold text-gray-700 mt-0.5">
                  {((localStorage.getItem(key) || '').length / 1024).toFixed(1)} KB
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Clear All ── */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={handleClearAll}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-red-50 transition"
          >
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
              <Trash2 size={17} className="text-red-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-red-500">Clear All Notifications</p>
              <p className="text-xs text-gray-400">Mark all as read</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
