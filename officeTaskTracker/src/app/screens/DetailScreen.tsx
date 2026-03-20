import { useNavigate } from "react-router";
import { WireframeButton } from "../components/WireframeBox";
import {
  ArrowLeft,
  Calendar,
  Flag,
  Tag,
  User,
  Paperclip,
  Edit2,
  Trash2,
  Clock,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";

export function DetailScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90"
        >
          <ArrowLeft size={16} className="text-gray-700" />
        </button>
        <h2 className="text-sm font-bold text-gray-900">Task Detail</h2>
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <MoreVertical size={16} className="text-gray-700" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-yellow-100 text-yellow-700 border border-yellow-200 text-[10px] font-bold px-3 py-1 rounded-full">
            IN PROGRESS
          </span>
          <span className="bg-red-100 text-red-600 border border-red-200 text-[10px] font-bold px-3 py-1 rounded-full">
            HIGH PRIORITY
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-snug">
            Design Homepage Mockup
          </h1>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <Clock size={10} /> Created Mar 18, 2026
          </p>
        </div>

        {/* Description */}
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-3 bg-gray-50">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Description
          </p>
          <div className="flex flex-col gap-1.5">
            <div className="h-2.5 bg-gray-200 rounded-full w-full" />
            <div className="h-2.5 bg-gray-200 rounded-full w-5/6" />
            <div className="h-2.5 bg-gray-200 rounded-full w-4/6" />
            <div className="h-2.5 bg-gray-200 rounded-full w-full" />
            <div className="h-2.5 bg-gray-200 rounded-full w-3/4" />
          </div>
        </div>

        {/* Meta Info Grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Calendar, label: "Due Date", value: "March 22, 2026" },
            { icon: Flag, label: "Priority", value: "High" },
            { icon: User, label: "Assignee", value: "Alex Johnson" },
            { icon: Tag, label: "Category", value: "Design" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="border-2 border-gray-200 rounded-xl p-2.5 bg-white"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={11} className="text-gray-400" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">
                  {label}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Subtasks
          </p>
          <div className="flex flex-col gap-1.5">
            {[
              { label: "Gather requirements", done: true },
              { label: "Create wireframe sketches", done: true },
              { label: "Build high-fidelity mockup", done: false },
              { label: "Get team approval", done: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl border border-gray-200 bg-gray-50"
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    item.done ? "border-gray-900 bg-gray-900" : "border-gray-300"
                  }`}
                >
                  {item.done && <CheckCircle2 size={8} color="white" />}
                </div>
                <span
                  className={`text-xs flex-1 ${
                    item.done ? "line-through text-gray-400" : "text-gray-700 font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Attachment Placeholder */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 flex items-center gap-3 bg-gray-50">
          <Paperclip size={16} className="text-gray-400" />
          <div>
            <p className="text-xs font-semibold text-gray-600">Attachment Area</p>
            <p className="text-[10px] text-gray-400">Files, images, links</p>
          </div>
          <div className="ml-auto flex gap-1">
            <div className="w-8 h-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100" />
            <div className="w-8 h-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 bg-white text-xs font-semibold text-gray-700 active:scale-95">
            <Edit2 size={13} /> Edit Task
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-200 bg-red-50 text-xs font-semibold text-red-600 active:scale-95">
            <Trash2 size={13} /> Delete
          </button>
        </div>

        {/* Mark Complete */}
        <WireframeButton label="Mark as Complete" variant="primary" />

        {/* Annotation */}
        <div className="border border-dashed border-blue-300 rounded-lg p-2 bg-blue-50">
          <p className="text-[10px] text-blue-500 text-center font-medium">
            ④ Detail Screen — Task Info, Edit & Delete
          </p>
        </div>
      </div>
    </div>
  );
}
