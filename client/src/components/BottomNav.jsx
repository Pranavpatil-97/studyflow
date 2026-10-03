import { NavLink, Link, useLocation } from "react-router-dom";
import { LayoutGrid, CheckCircle2, BookOpen, Menu, Plus } from "lucide-react";

const items = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/tasks", label: "Tasks", icon: CheckCircle2 },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
];

export default function BottomNav({ onMore }) {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/tasks/new" && (
        <Link
          to="/tasks/new"
          aria-label="Add task"
          className="fixed bottom-20 right-4 z-20 grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-lg md:hidden"
        >
          <Plus size={22} />
        </Link>
      )}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] ${isActive ? "text-brand" : "text-slate-400"}`
            }
          >
            <Icon size={20} strokeWidth={1.6} />
            {label}
          </NavLink>
        ))}
        <button onClick={onMore} className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] text-slate-400">
          <Menu size={20} strokeWidth={1.6} />
          More
        </button>
      </nav>
    </>
  );
}