import { NavLink } from "react-router-dom";
import {
  Layers, LayoutGrid, CheckCircle2, BookOpen, CalendarDays,
  NotebookPen, BarChart3, Flame, SlidersHorizontal, HelpCircle, ChevronsUpDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const nav = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/tasks", label: "My tasks", icon: CheckCircle2 },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/planner", label: "Study planner", icon: CalendarDays },
  { to: "/notes", label: "My notes", icon: NotebookPen },
  { to: "/insights", label: "Insights", icon: BarChart3 },
];

// Placeholder until the Subjects module (step 2) provides real data
const subjectsDemo = [
  { name: "Mathematics", color: "bg-subject-blue" },
  { name: "Biology", color: "bg-subject-green" },
  { name: "Literature", color: "bg-subject-orange" },
];

const week = ["M", "T", "W", "T", "F", "S", "S"];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const initials = user?.name?.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-sidebar px-4 py-6 text-white">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand">
          <Layers size={18} />
        </div>
        <span className="text-xl font-light tracking-tight">studyflow</span>
      </div>

      <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-muted">Workspace</p>
      <nav className="space-y-1">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                isActive ? "bg-sidebar-active font-medium text-white" : "text-sidebar-muted hover:bg-white/5"
              }`
            }
          >
            <Icon size={18} strokeWidth={1.5} />
            <span className="flex-1">{label}</span>
          </NavLink>
        ))}
      </nav>

      <p className="mb-2 mt-8 px-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-muted">My subjects</p>
      <ul className="space-y-1">
        {subjectsDemo.map((s) => (
          <li key={s.name} className="flex items-center gap-3 px-3 py-1.5 text-sm text-slate-300">
            <span className={`h-2 w-2 rounded-full ${s.color}`} />
            {s.name}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="mb-4 rounded-2xl bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Flame size={16} className="text-subject-orange" /> 7-day streak
          </div>
          <p className="mt-1 text-xs text-sidebar-muted">Small steps. Big progress.</p>
          <div className="mt-3 flex justify-between">
            {week.map((d, i) => (
              <span
                key={i}
                className={`grid h-6 w-6 place-items-center rounded-md text-[10px] ${
                  i === 6 ? "bg-brand text-white" : "bg-white/10 text-slate-300"
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-sidebar-muted hover:text-white">
          <SlidersHorizontal size={16} /> Settings
        </button>
        <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-sidebar-muted hover:text-white">
          <HelpCircle size={16} /> Help &amp; resources
        </button>

        <div className="mt-3 flex items-center gap-3 border-t border-white/10 px-1 pt-4">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <button onClick={logout} className="text-xs text-sidebar-muted hover:text-white">Log out</button>
          </div>
          <ChevronsUpDown size={14} className="text-sidebar-muted" />
        </div>
      </div>
    </aside>
  );
}
