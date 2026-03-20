import { useNavigate } from "react-router";
import { WireframeAvatar } from "../components/WireframeBox";
import { BottomNav } from "../components/BottomNav";
import {
  User,
  Bell,
  Sliders,
  ChevronRight,
  Shield,
  HelpCircle,
  LogOut,
  Star,
  Menu,
} from "lucide-react";

const menuGroups = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile", sub: "Edit your personal info", path: "/favorites" },
      { icon: Bell, label: "Notifications", sub: "Alerts & reminders", path: "/notifications" },
      { icon: Sliders, label: "App Preferences", sub: "Theme, language & more", path: "/settings" },
    ],
  },
  {
    title: "More",
    items: [
      { icon: Shield, label: "Privacy & Security", sub: "Manage permissions", path: "/settings" },
      { icon: HelpCircle, label: "Help & Support", sub: "FAQs, contact us", path: "/settings" },
      { icon: Star, label: "Rate the App", sub: "Leave us a review", path: "/settings" },
    ],
  },
];

export function SettingsMenuScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <Menu size={16} className="text-gray-700" />
          <h2 className="text-sm font-bold text-gray-900">Settings Menu</h2>
        </div>
        <p className="text-[11px] text-gray-400">Manage your app settings</p>
      </div>

      {/* Profile Summary */}
      <div className="mx-5 mt-4 bg-gray-900 rounded-2xl p-4 flex items-center gap-3">
        <WireframeAvatar size={44} />
        <div className="flex-1">
          <p className="text-sm font-bold text-white">Alex Johnson</p>
          <p className="text-[10px] text-gray-400">alex@example.com</p>
          <div className="mt-1 flex items-center gap-1">
            <div className="h-1.5 w-16 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-green-400 rounded-full" />
            </div>
            <span className="text-[9px] text-gray-500">Pro Plan</span>
          </div>
        </div>
        <button
          onClick={() => navigate("/favorites")}
          className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center"
        >
          <ChevronRight size={14} color="white" />
        </button>
      </div>

      {/* Menu Groups */}
      <div className="flex-1 px-5 py-4 flex flex-col gap-5 overflow-y-auto">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              {group.title}
            </p>
            <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
              {group.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50 transition-colors ${
                      idx < group.items.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-800">{item.label}</p>
                      <p className="text-[10px] text-gray-400">{item.sub}</p>
                    </div>
                    <ChevronRight size={13} className="text-gray-300" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-red-200 bg-red-50 text-xs font-semibold text-red-600 active:scale-95">
          <LogOut size={14} />
          Log Out
        </button>

        {/* App Version */}
        <p className="text-[10px] text-gray-400 text-center">Version 1.0.0 · officeTaskTracker</p>

        {/* Annotation */}
        <div className="border border-dashed border-blue-300 rounded-lg p-1.5 bg-blue-50">
          <p className="text-[10px] text-blue-500 text-center font-medium">
            ⑥ Settings Menu — Navigation Hub
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}