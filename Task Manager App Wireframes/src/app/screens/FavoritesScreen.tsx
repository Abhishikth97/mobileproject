import { useNavigate } from "react-router";
import { WireframeAvatar } from "../components/WireframeBox";
import { BottomNav } from "../components/BottomNav";
import { Heart, Star, ChevronRight, Edit2, Award, CheckCircle2 } from "lucide-react";

const favTasks = [
  { id: 1, title: "Design homepage mockup", category: "Design", starred: true, done: false },
  { id: 2, title: "Q1 planning document", category: "Planning", starred: true, done: true },
  { id: 3, title: "Client presentation deck", category: "Work", starred: true, done: false },
  { id: 4, title: "Weekly retrospective notes", category: "Team", starred: true, done: true },
];

const stats = [
  { label: "Tasks Done", value: "24", icon: CheckCircle2 },
  { label: "Favorites", value: "4", icon: Heart },
  { label: "Streak", value: "7d", icon: Award },
];

export function FavoritesScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col">
      {/* Profile Header */}
      <div className="bg-gray-900 px-5 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white">Profile</h2>
          <button className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
            <Edit2 size={12} color="white" />
          </button>
        </div>

        {/* Avatar + Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <WireframeAvatar size={56} />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400 border-2 border-gray-900" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Alex Johnson</h3>
            <p className="text-xs text-gray-400">alex@example.com</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={10} className="text-yellow-400" fill="currentColor" />
              <span className="text-[10px] text-gray-400">Pro Member</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2 mt-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex-1 bg-gray-800 rounded-xl p-2 text-center">
              <div className="flex items-center justify-center mb-0.5">
                <Icon size={12} className="text-gray-400" />
              </div>
              <p className="text-sm font-bold text-white">{value}</p>
              <p className="text-[9px] text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Tasks */}
      <div className="flex-1 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Heart size={13} className="text-red-500" fill="currentColor" />
            <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
              Favorite Tasks
            </p>
          </div>
          <button className="flex items-center gap-0.5 text-[10px] text-gray-400">
            See all <ChevronRight size={10} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {favTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => navigate("/detail")}
              className="w-full text-left bg-white border-2 border-gray-200 rounded-2xl p-3 flex items-center gap-3 active:scale-[0.98] transition-transform"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  task.done ? "bg-gray-100" : "bg-yellow-50"
                }`}
              >
                <Star
                  size={15}
                  className={task.done ? "text-gray-400" : "text-yellow-500"}
                  fill="currentColor"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-semibold truncate ${
                    task.done ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </p>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full mt-0.5 inline-block">
                  {task.category}
                </span>
              </div>
              {task.done && (
                <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
              )}
              <ChevronRight size={13} className="text-gray-300 flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Bio / About Section */}
        <div className="mt-4 border-2 border-dashed border-gray-200 rounded-2xl p-3 bg-gray-50">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">About</p>
          <div className="flex flex-col gap-1.5">
            <div className="h-2.5 bg-gray-200 rounded-full w-full" />
            <div className="h-2.5 bg-gray-200 rounded-full w-4/5" />
            <div className="h-2.5 bg-gray-200 rounded-full w-3/5" />
          </div>
        </div>
      </div>

      {/* Annotation */}
      <div className="mx-5 mb-2 border border-dashed border-blue-300 rounded-lg p-1.5 bg-blue-50">
        <p className="text-[10px] text-blue-500 text-center font-medium">
          ⑤ Favorites / Profile Screen
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
