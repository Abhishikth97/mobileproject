import { useNavigate } from "react-router";
import { ArrowLeft, RefreshCw, Wifi, Server, Database, Activity, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";

const apiLogs = [
  { id: 1, method: "GET", endpoint: "/api/tasks", status: 200, time: "42ms", ok: true },
  { id: 2, method: "POST", endpoint: "/api/tasks/create", status: 201, time: "118ms", ok: true },
  { id: 3, method: "PUT", endpoint: "/api/tasks/7/update", status: 200, time: "87ms", ok: true },
  { id: 4, method: "GET", endpoint: "/api/notifications", status: 200, time: "55ms", ok: true },
  { id: 5, method: "DELETE", endpoint: "/api/tasks/3", status: 500, time: "203ms", ok: false },
];

const liveItems = [
  { id: 1, title: "Design homepage mockup", event: "Updated", time: "just now" },
  { id: 2, title: "Review pull requests", event: "Assigned", time: "2m ago" },
  { id: 3, title: "Team standup meeting", event: "Added", time: "5m ago" },
];

export function ApiScreen() {
  const navigate = useNavigate();
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1500);
  };

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
            <h2 className="text-sm font-bold text-gray-900">API Integration</h2>
            <p className="text-[10px] text-gray-400">Real-time task sync</p>
          </div>
        </div>
        <button
          onClick={handleSync}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <RefreshCw
            size={15}
            className={`text-gray-600 ${syncing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {/* Connection Status */}
        <div className="bg-gray-900 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Connected</span>
            </div>
            <div className="flex items-center gap-1">
              <Wifi size={12} className="text-gray-400" />
              <span className="text-[10px] text-gray-400">api.officetasktracker.io</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Server, label: "Server", value: "Online" },
              { icon: Database, label: "DB", value: "Synced" },
              { icon: Activity, label: "Latency", value: "42ms" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-gray-800 rounded-xl p-2 text-center">
                <Icon size={11} className="text-gray-400 mx-auto mb-0.5" />
                <p className="text-[9px] text-gray-400">{label}</p>
                <p className="text-xs font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Task Updates */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Live Task Updates
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {liveItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-2xl"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Activity size={13} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{item.title}</p>
                  <span className="text-[10px] text-green-600 font-medium">{item.event}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Clock size={9} className="text-gray-400" />
                  <span className="text-[10px] text-gray-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Request Log */}
        <div>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Request Log
          </p>
          <div className="bg-gray-900 rounded-2xl overflow-hidden">
            <div className="flex px-3 py-1.5 border-b border-gray-700">
              {["Method", "Endpoint", "Status", "Time"].map((h) => (
                <p key={h} className="text-[9px] font-bold text-gray-500 uppercase" style={{ flex: h === "Endpoint" ? 2 : 1 }}>
                  {h}
                </p>
              ))}
            </div>
            {apiLogs.map((log, idx) => (
              <div
                key={log.id}
                className={`flex items-center px-3 py-2 ${
                  idx < apiLogs.length - 1 ? "border-b border-gray-800" : ""
                }`}
              >
                <span
                  className={`text-[9px] font-bold flex-1 ${
                    log.method === "GET"
                      ? "text-blue-400"
                      : log.method === "POST"
                      ? "text-green-400"
                      : log.method === "PUT"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {log.method}
                </span>
                <span className="text-[9px] text-gray-400 truncate" style={{ flex: 2 }}>
                  {log.endpoint}
                </span>
                <div className="flex-1 flex items-center gap-1">
                  {log.ok ? (
                    <CheckCircle2 size={9} className="text-green-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle size={9} className="text-red-400 flex-shrink-0" />
                  )}
                  <span className={`text-[9px] font-bold ${log.ok ? "text-green-400" : "text-red-400"}`}>
                    {log.status}
                  </span>
                </div>
                <span className="text-[9px] text-gray-500 flex-1 text-right">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder Banner */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <Server size={13} className="text-gray-400" />
            <p className="text-xs font-semibold text-gray-600">API Endpoint Config</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-2 bg-gray-200 rounded-full w-full" />
            <div className="h-2 bg-gray-200 rounded-full w-4/5" />
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 h-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100" />
            <div className="h-8 px-3 bg-gray-900 rounded-lg flex items-center">
              <span className="text-[10px] text-white font-medium">Test</span>
            </div>
          </div>
        </div>

        {/* Annotation */}
        <div className="border border-dashed border-blue-300 rounded-lg p-2 bg-blue-50">
          <p className="text-[10px] text-blue-500 text-center font-medium">
            ⑨ API Integration Screen — Real-time Updates Placeholder
          </p>
        </div>
      </div>
    </div>
  );
}