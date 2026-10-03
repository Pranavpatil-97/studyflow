import { Search, Bell, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const titles = {
  "/": "Overview", "/tasks": "My tasks", "/subjects": "Subjects",
  "/planner": "Study planner", "/notes": "My notes", "/insights": "Insights",
};

function crumbs(path) {
  if (path === "/tasks/new") return ["Overview", "Add task"];
  if (path.startsWith("/subjects/")) return ["Subjects", "Details"];
  return [titles[path] ?? "Overview"];
}

export default function Navbar({ onMenu }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const trail = crumbs(pathname);
  const initials = user?.name?.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} aria-label="Open menu" className="text-slate-500 md:hidden">
          <Menu size={22} />
        </button>
        <div className="text-sm text-slate-400">
          <span className="hidden md:inline">Workspace › </span>
          {trail.slice(0, -1).map((t) => (
            <span key={t} className="hidden md:inline">{t} › </span>
          ))}
          <span className="font-medium text-slate-800">{trail[trail.length - 1]}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="hidden w-72 items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-400 lg:flex">
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