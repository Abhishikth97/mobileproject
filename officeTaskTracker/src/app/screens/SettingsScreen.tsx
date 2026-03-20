import { useNavigate } from "react-router";
import { ArrowLeft, Moon, Bell, Globe, Lock, Trash2, Download, RefreshCw } from "lucide-react";
import { useState } from "react";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-10 h-5.5 rounded-full relative transition-colors flex-shrink-0 ${
        on ? "bg-gray-900" : "bg-gray-300"
      }`}
      style={{ height: "22px", width: "40px" }}
    >
      <span
        className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-all`}
        style={{
          width: "18px",
          height: "18px",
          left: on ? "20px" : "2px",
          transition: "left 0.2s",
        }}
      />
    </button>
  );
}

const toggleSettings = [
  { key: "darkMode", icon: Moon, label: "Dark Mode", sub: "Switch to dark theme" },
  { key: "pushNotifs", icon: Bell, label: "Push Notifications", sub: "Get task reminders" },
  { key: "emailNotifs", icon: Bell, label: "Email Notifications", sub: "Receive email alerts" },
  { key: "language", icon: Globe, label: "Auto Language", sub: "Detect system language" },
];

export function SettingsScreen() {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    darkMode: false,
    pushNotifs: true,
    emailNotifs: false,
    language: true,
  });

  const flipToggle = (key: string) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-gray-700" />
        </button>
        <h2 className="text-sm font-bold text-gray-900">Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
        {/* Toggles Group */}
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Preferences
          </p>
          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
            {toggleSettings.map(({ key, icon: Icon, label, sub }, idx) => (
              <div
                key={key}
                className={`flex items-center gap-3 px-4 py-3.5 ${
                  idx < toggleSettings.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-800">{label}</p>
                  <p className="text-[10px] text-gray-400">{sub}</p>
                </div>
                <Toggle on={toggles[key]} onToggle={() => flipToggle(key)} />
              </div>
            ))}
          </div>
        </div>

        {/* Account Info */}
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Account
          </p>
          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
            {[
              { icon: Lock, label: "Change Password", sub: "Update credentials" },
              { icon: Download, label: "Export Data", sub: "Download your tasks" },
              { icon: RefreshCw, label: "Sync Settings", sub: "Sync across devices" },
            ].map(({ icon: Icon, label, sub }, idx, arr) => (
              <div
                key={label}
                className={`flex items-center gap-3 px-4 py-3.5 ${
                  idx < arr.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-800">{label}</p>
                  <p className="text-[10px] text-gray-400">{sub}</p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <p className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-2">
            Danger Zone
          </p>
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <Trash2 size={14} className="text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-red-700">Delete Account</p>
                <p className="text-[10px] text-red-400">Permanently remove all data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Annotation */}
        <div className="border border-dashed border-blue-300 rounded-lg p-2 bg-blue-50">
          <p className="text-[10px] text-blue-500 text-center font-medium">
            ⑦ Settings Screen — Toggles & Preferences
          </p>
        </div>
      </div>
    </div>
  );
}
