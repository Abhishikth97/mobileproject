import { useNavigate } from "react-router";
import { WireframeAvatar } from "../components/WireframeBox";
import { BottomNav } from "../components/BottomNav";
import {
  Plus,
  CheckCircle2,
  Clock,
  Bell,
  ChevronRight,
  Calendar,
  AlertCircle,
  BarChart2,
} from "lucide-react";

const tasks = [
  { id: 1, title: "Design homepage mockup", priority: "High", due: "Today", done: false },
  { id: 2, title: "Review pull requests", priority: "Med", due: "Tomorrow", done: false },
  { id: 3, title: "Update documentation", priority: "Low", due: "Mar 22", done: true },
  { id: 4, title: "Team standup meeting", priority: "High", due: "Today", done: false },
];

const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-600 border-red-200",
  Med: "bg-yellow-100 text-yellow-600 border-yellow-200",
  Low: "bg-green-100 text-green-600 border-green-200",
};

export function HomeScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-3 pb-4 bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400">Good morning,</p>
            <h1 className="text-base font-bold text-white">Alex Johnson</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/notifications")} className="relative">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <Bell size={15} color="white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border border-gray-900" />
            </button>
            <WireframeAvatar size={32} />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-2">
          {[
            { label: "Total", value: "12", color: "bg-gray-700" },
            { label: "Pending", value: "7", color: "bg-gray-700" },
            { label: "Done", value: "5", color: "bg-gray-700" },
          ].map((s) => (
            <div key={s.label} className={`flex-1 ${s.color} rounded-xl p-2.5 text-center`}>
              <p className="text-base font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 py-4">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
          Quick Actions
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Plus, label: "Add Task", color: "bg-gray-900 text-white", action: "/detail" },
            { icon: CheckCircle2, label: "Completed", color: "bg-gray-100 text-gray-700", action: "/home" },
            { icon: Clock, label: "Pending", color: "bg-gray-100 text-gray-700", action: "/home" },
          ].map(({ icon: Icon, label, color, action }) => (
            <button
              key={label}
              onClick={() => navigate(action)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border-2 border-gray-200 ${color} active:scale-95 transition-transform`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-semibold text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 mb-4">
        <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <BarChart2 size={13} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">Weekly Progress</span>
            </div>
            <span className="text-xs font-bold text-gray-900">42%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 rounded-full" style={{ width: "42%" }} />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">5 of 12 tasks completed this week</p>
        </div>
      </div>

      {/* Task List */}
      <div className="px-5 flex-1">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Recent Tasks
          </p>
          <button className="flex items-center gap-0.5 text-[10px] text-gray-400">
            See all <ChevronRight size={10} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => navigate("/detail")}
              className="w-full text-left bg-white border-2 border-gray-200 rounded-2xl p-3 flex items-center gap-3 active:scale-[0.98] transition-transform"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  task.done ? "border-gray-900 bg-gray-900" : "border-gray-300"
                }`}
              >
                {task.done && <CheckCircle2 size={10} color="white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-semibold truncate ${
                    task.done ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Calendar size={9} className="text-gray-400" />
                  <span className="text-[10px] text-gray-400">{task.due}</span>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}
              >
                {task.priority}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Annotation */}
      <div className="mx-5 mt-3 mb-2 border border-dashed border-blue-300 rounded-lg p-1.5 bg-blue-50">
        <p className="text-[10px] text-blue-500 text-center font-medium">
          ③ Home Screen — Dashboard Overview
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
