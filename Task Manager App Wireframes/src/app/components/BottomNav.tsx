import { Home, Heart, Bell, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: Bell, label: "Alerts", path: "/notifications" },
  { icon: Settings, label: "Settings", path: "/settings-menu" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex-shrink-0 border-t border-gray-200 bg-white">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 px-4 py-1"
            >
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  isActive ? "bg-gray-900 text-white" : "text-gray-400"
                }`}
              >
                <Icon size={18} />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
