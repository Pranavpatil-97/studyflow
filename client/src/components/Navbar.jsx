import { Search, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const titles = {
  "/": "Overview", "/tasks": "My tasks", "/subjects": "Subjects",
  "/planner": "Study planner", "/notes": "My notes", "/insights": "Insights",
};

export default function Navbar() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const initials = user?.name?.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div className="text-sm text-slate-400">
        Workspace <span className="mx-2">›</span>
        <span className="font-medium text-slate-800">{titles[pathname] ?? "Overview"}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex w-80 items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-400">
          <Search size={16} /> Search tasks, notes, subjects...
        </div>
        <Bell size={18} className="text-slate-400" />
        <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
          {initials}
        </div>
      </div>
    </header>
  );
}
