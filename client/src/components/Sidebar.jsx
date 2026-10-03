import { NavLink } from "react-router-dom";
import {
  Layers, LayoutGrid, CheckCircle2, BookOpen, CalendarDays, NotebookPen,
  BarChart3, Flame, SlidersHorizontal, HelpCircle, ChevronsUpDown, X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { colorOf } from "../lib/colors";
import { streakInfo } from "../lib/streak";
import { toDateStr } from "../lib/dates";

const nav = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/tasks", label: "My tasks", icon: CheckCircle2, badge: true },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/planner", label: "Study planner", icon: CalendarDays },
  { to: "/notes", label: "My notes", icon: NotebookPen },
  { to: "/insights", label: "Insights", icon: BarChart3 },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const { subjects, tasks } = useData();
  const { streak, week } = streakInfo(tasks);
  const today = toDateStr();
  const pendingToday = tasks.filter((t) => t.dueDate === today && !t.completed).length;
  const initials = user?.name?.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-64 shrink-0 flex-col overflow-y-auto bg-sidebar px-4 py-6 text-white transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand"><Layers size={18} /></div>
            <span className="text-xl font-light tracking-tight">studyflow</span>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="text-sidebar-muted md:hidden"><X size={20} /></button>
        </div>

        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-muted">Workspace</p>
        <nav className="space-y-1">
          {nav.map(({ to, label, icon: Icon, end, badge }) => (
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
              {badge && pendingToday > 0 && (
                <span className="rounded-lg bg-white/10 px-2 py-0.5 text-xs">{pendingToday}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <p className="mb-2 mt-8 px-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-muted">My subjects</p>
        <ul className="space-y-1">
          {subjects.map((s) => (
            <li key={s._id}>
              <NavLink to={`/subjects/${s._id}`} className="flex items-center gap-3 px-3 py-1.5 text-sm text-slate-300 hover:text-white">
                <span className={`h-2 w-2 rounded-full ${colorOf(s.color).dot}`} />
                <span className="truncate">{s.name}</span>
              </NavLink>
            </li>
          ))}
          {subjects.length === 0 && <li className="px-3 py-1.5 text-sm text-sidebar-muted">No subjects yet</li>}
        </ul>

        <div className="mt-auto pt-6">
          <div className="mb-4 rounded-2xl bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Flame size={16} className="text-orange-400" /> {streak}-day streak
            </div>
            <p className="mt-1 text-xs text-sidebar-muted">Small steps. Big progress.</p>
            <div className="mt-3 flex justify-between">
              {week.map((d, i) => (
                <span
                  key={i}
                  className={`grid h-6 w-6 place-items-center rounded-md text-[10px] ${
                    d.on ? "bg-brand text-white" : d.today ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
                  }`}
                >
                  {d.label}
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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">{initials}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <button onClick={logout} className="text-xs text-sidebar-muted hover:text-white">Log out</button>
            </div>
            <ChevronsUpDown size={14} className="text-sidebar-muted" />
          </div>
        </div>
      </aside>
    </>
  );
}