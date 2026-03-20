import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home, Heart, Bell, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function MobileLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Heart, label: 'Profile', path: '/profile' },
    { icon: Bell, label: 'Alerts', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-[#EAECF0] flex items-start justify-center py-0 sm:py-6">
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-0 bg-[#F5F6FA] flex flex-col sm:rounded-[36px] sm:overflow-hidden sm:shadow-2xl" style={{ minHeight: '100dvh' }}>
        {/* Screen content */}
        <div className="flex-1 overflow-y-auto pb-[72px]">
          <Outlet />
        </div>
        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 flex items-center sm:rounded-b-[36px] z-50" style={{ height: '72px' }}>
          {tabs.map(({ icon: Icon, label, path }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2 relative"
              >
                <div className="relative">
                  <Icon
                    size={22}
                    className={active ? 'text-[#1B2235]' : 'text-gray-400'}
                    strokeWidth={active ? 2.5 : 1.8}
                  />
                  {label === 'Alerts' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white" style={{ fontSize: '9px' }}>
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span
                  className="text-[10px]"
                  style={{ color: active ? '#1B2235' : '#9CA3AF', fontWeight: active ? 600 : 400 }}
                >
                  {label}
                </span>
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#1B2235] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
