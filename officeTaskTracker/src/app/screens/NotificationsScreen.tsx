import { useNavigate } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { ArrowLeft, Bell, CheckCircle2, AlertTriangle, Clock, Calendar, Info, Settings } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "due",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    bg: "bg-red-50",
    title: "Task Overdue!",
    sub: '"Design homepage mockup" was due yesterday',
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    type: "done",
    icon: CheckCircle2,
    iconColor: "text-green-500",
    bg: "bg-green-50",
    title: "Task Completed",
    sub: '"Update documentation" marked complete by you',
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    type: "remind",
    icon: Clock,
    iconColor: "text-yellow-500",
    bg: "bg-yellow-50",
    title: "Reminder",
    sub: '"Client presentation deck" is due tomorrow',
    time: "3h ago",
    unread: false,
  },
  {
    id: 4,
    type: "calendar",
    icon: Calendar,
    iconColor: "text-blue-500",
    bg: "bg-blue-50",
    title: "Upcoming Deadline",
    sub: '"Q1 planning document" due in 3 days',
    time: "6h ago",
    unread: false,
  },
  {
    id: 5,
    type: "info",
    icon: Info,
    iconColor: "text-gray-500",
    bg: "bg-gray-50",
    title: "App Update",
    sub: "officeTaskTracker v1.1.0 is available for download",
    time: "1d ago",
    unread: false,
  },
];

const alertSettings = [
  { label: "Push Notifications", enabled: true },
  { label: "Due Date Alerts", enabled: true },
  { label: "Weekly Summary", enabled: false },
  { label: "Team Mentions", enabled: false },
];

export function NotificationsScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={16} className="text-gray-700" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Notifications</h2>
            <p className="text-[10px] text-gray-400">2 unread</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/settings")}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <Settings size={15} className="text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {/* Notification List */}
        <div>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Recent
          </p>
          <div className="flex flex-col gap-2">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 p-3 rounded-2xl border-2 ${
                    notif.unread
                      ? "border-gray-900 bg-white"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl ${notif.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon size={14} className={notif.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-800">{notif.title}</p>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        {notif.unread && (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                        )}
                        <span className="text-[10px] text-gray-400">{notif.time}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{notif.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alert Settings */}
        <div>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Bell size={10} /> Alert Settings
          </p>
          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
            {alertSettings.map(({ label, enabled }, idx) => (
              <div
                key={label}
                className={`flex items-center justify-between px-4 py-3 ${
                  idx < alertSettings.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <p className="text-xs font-medium text-gray-700">{label}</p>
                <div
                  className={`w-9 rounded-full flex items-center transition-colors ${
                    enabled ? "bg-gray-900" : "bg-gray-300"
                  }`}
                  style={{ height: "20px", width: "36px" }}
                >
                  <span
                    className="bg-white rounded-full shadow flex-shrink-0"
                    style={{
                      width: "16px",
                      height: "16px",
                      marginLeft: enabled ? "18px" : "2px",
                      transition: "margin-left 0.2s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clear All */}
        <button className="w-full text-xs text-gray-400 underline text-center py-1">
          Clear all notifications
        </button>

        {/* Annotation */}
        <div className="border border-dashed border-blue-300 rounded-lg p-2 bg-blue-50">
          <p className="text-[10px] text-blue-500 text-center font-medium">
            ⑧ Notifications Screen — Alerts & Settings
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}