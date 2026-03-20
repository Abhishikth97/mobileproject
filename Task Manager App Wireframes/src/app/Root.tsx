import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LogIn,
  UserPlus,
  Home,
  FileText,
  Heart,
  Menu,
  Settings,
  Bell,
  Zap,
  CheckSquare,
  ChevronRight,
} from "lucide-react";

const screens = [
  { path: "/login", icon: LogIn, label: "Login Screen", num: "①" },
  { path: "/signup", icon: UserPlus, label: "Sign Up Screen", num: "②" },
  { path: "/home", icon: Home, label: "Home Dashboard", num: "③" },
  { path: "/detail", icon: FileText, label: "Task Detail", num: "④" },
  { path: "/favorites", icon: Heart, label: "Favorites / Profile", num: "⑤" },
  { path: "/settings-menu", icon: Menu, label: "Settings Menu", num: "⑥" },
  { path: "/settings", icon: Settings, label: "Settings Screen", num: "⑦" },
  { path: "/notifications", icon: Bell, label: "Notifications", num: "⑧" },
  { path: "/api", icon: Zap, label: "API Integration", num: "⑨" },
];

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r-2 border-gray-200 flex flex-col shadow-sm flex-shrink-0 hidden md:flex">
        {/* Logo */}
        <div className="p-5 border-b-2 border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
              <CheckSquare size={16} color="white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">TaskManager</p>
              <p className="text-[10px] text-gray-400">Wireframe Preview</p>
            </div>
          </div>
        </div>

        {/* Screen Links */}
        <nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 py-2">
            Screens
          </p>
          {screens.map(({ path, icon: Icon, label, num }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-[10px] font-bold w-5 flex-shrink-0 opacity-60">{num}</span>
                <Icon size={14} className="flex-shrink-0" />
                <span className="text-xs font-medium flex-1">{label}</span>
                {isActive && <ChevronRight size={12} className="flex-shrink-0 opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] font-bold text-gray-700 mb-0.5">9 Screens Total</p>
            <p className="text-[9px] text-gray-400 leading-tight">
              Click any screen to preview it in the mobile frame
            </p>
          </div>
        </div>
      </div>

      {/* Main: Mobile Frame */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Top label */}
        <div className="mb-3 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {screens.find((s) => s.path === location.pathname)?.num}{" "}
            {screens.find((s) => s.path === location.pathname)?.label ?? ""}
          </p>
        </div>

        {/* Phone Frame */}
        <div
          className="relative bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
          style={{
            width: 375,
            height: 780,
            border: "10px solid #1a1a1a",
            flexShrink: 0,
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a1a1a] rounded-b-2xl z-20" />

          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 bg-white z-10 flex-shrink-0" style={{ paddingTop: "10px", paddingBottom: "4px" }}>
            <span className="text-[11px] font-bold text-gray-800">9:41</span>
            <div className="flex items-center gap-1 text-gray-600">
              <div className="flex gap-0.5 items-end h-3">
                <div className="w-1 bg-gray-700 rounded-sm" style={{ height: "5px" }} />
                <div className="w-1 bg-gray-700 rounded-sm" style={{ height: "8px" }} />
                <div className="w-1 bg-gray-700 rounded-sm" style={{ height: "11px" }} />
                <div className="w-1 bg-gray-200 rounded-sm" style={{ height: "11px" }} />
              </div>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M6 2C7.66 2 9.16 2.69 10.24 3.76L11.66 2.34C10.22 0.9 8.21 0 6 0C3.79 0 1.78 0.9 0.34 2.34L1.76 3.76C2.84 2.69 4.34 2 6 2Z" fill="#374151"/>
                <path d="M6 5C7.04 5 7.98 5.42 8.66 6.1L10.08 4.68C9.02 3.63 7.59 3 6 3C4.41 3 2.98 3.63 1.92 4.68L3.34 6.1C4.02 5.42 4.96 5 6 5Z" fill="#374151"/>
                <circle cx="6" cy="9" r="1.5" fill="#374151"/>
              </svg>
              <div className="flex items-center gap-0.5">
                <div className="w-5 h-2.5 border border-gray-600 rounded-sm p-px flex">
                  <div className="bg-gray-700 rounded-sm flex-1" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Screen Outlet */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <Outlet />
          </div>

          {/* Home Indicator */}
          <div className="flex-shrink-0 flex justify-center pb-2 pt-1 bg-white">
            <div className="w-24 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* Mobile navigation (visible on small screens) */}
        <div className="md:hidden mt-4 flex flex-wrap gap-1.5 justify-center max-w-sm">
          {screens.map(({ path, label, num }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`text-[10px] px-2.5 py-1.5 rounded-full border font-medium ${
                location.pathname === path
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {num} {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
