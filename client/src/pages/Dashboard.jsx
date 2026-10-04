import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, CalendarDays, Target, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import TaskRow from "../components/TaskRow";
import SyllabusCard from "../components/SyllabusCard";
import UpcomingList from "../components/UpcomingList";
import FocusTimer from "../components/FocusTimer";
import WeeklyChart from "../components/WeeklyChart";
import { useFocus } from "../context/FocusContext";
import { weekStats, fmtMinutes } from "../lib/focusStats";
import { toDateStr } from "../lib/dates";

const TABS = [["all", "All tasks"], ["todo", "To do"], ["done", "Completed"]];

export default function Dashboard() {
  const { user } = useAuth();
  const { subjects, tasks, loading } = useData();
  const { sessions } = useFocus();
  const navigate = useNavigate();
  const [tab, setTab] = useState("all");

  const today = toDateStr();
  const todays = tasks.filter((t) => t.dueDate === today);
  const done = todays.filter((t) => t.completed);
  const left = todays.length - done.length;
  const pct = todays.length ? Math.round((done.length / todays.length) * 100) : 0;
  const stats = weekStats(sessions);
  const diff = stats.todayMinutes - stats.yesterdayMinutes;
  const shown = todays.filter((t) => tab === "all" || (tab === "todo" ? !t.completed : t.completed));
  const upcoming = tasks.filter((t) => !t.completed && t.dueDate > today).slice(0, 4);
  const overdue = tasks.filter((t) => !t.completed && t.dueDate < today).length;
  const dateLabel = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-light sm:text-3xl">Let's make today count, {user?.name?.split(" ")[0]}.</h1>
          <p className="mt-1 text-sm text-slate-400">A little focus today, a step closer to your goals.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-sm text-slate-400"><CalendarDays size={16} /> {dateLabel}</span>
          <button
            onClick={() => navigate("/tasks/new")}
            className="hidden items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white sm:flex"
          >
            <Plus size={16} /> Add task
          </button>
        </div>
      </div>

      {/* Daily progress */}
      <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blue-50 text-brand"><Target size={24} /></div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-lg font-light">
                Your daily progress
                {pct >= 50 && <span className="ml-2 rounded-md bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600">Looking good!</span>}
              </p>
              <p className="text-sm text-slate-400">{done.length} of {todays.length} tasks completed</p>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>
                {todays.length === 0 ? "No tasks planned for today." : left === 0 ? "All done for today. Nice work!" : `Just ${left} more to go!`}
              </span>
              <span className="font-medium text-brand">Daily goal: {user?.dailyGoal} tasks</span>
            </div>
          </div>
          <div className="flex gap-8 border-t border-slate-100 pt-4 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <div><p className="text-3xl font-light">{pct}%</p><p className="text-xs text-slate-400">complete</p></div>
            <div>
              <p className="flex items-center gap-1 text-xs text-slate-400"><Clock size={12} /> Study time</p>
              <p className="text-xl font-light">{fmtMinutes(stats.todayMinutes)}</p>
              {diff !== 0 && (
                <p className={`text-[10px] ${diff > 0 ? "text-emerald-600" : "text-orange-500"}`}>
                  {diff > 0 ? "+" : "-"}{fmtMinutes(Math.abs(diff))} from yesterday
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Today's tasks */}
          <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <h2 className="text-lg font-light">
                Today's Tasks <span className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{todays.length}</span>
              </h2>
              <div className="flex rounded-xl bg-slate-100 p-1 text-xs">
                {TABS.map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`flex-1 rounded-lg px-3 py-1.5 sm:flex-none ${tab === key ? "bg-white font-medium shadow-sm" : "text-slate-500"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {shown.length ? (
              <ul className="divide-y divide-slate-100">{shown.map((t) => <TaskRow key={t._id} task={t} />)}</ul>
            ) : (
              <div className="p-8 text-center text-sm text-slate-400">
                {loading ? "Loading..." : (
                  <>Nothing here yet. <Link to="/tasks/new" className="font-medium text-brand">Add a task</Link></>
                )}
              </div>
            )}
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs">
              <span className="text-orange-500">{overdue > 0 ? `${overdue} overdue task${overdue > 1 ? "s" : ""}` : ""}</span>
              <Link to="/tasks" className="font-medium text-brand">View all tasks →</Link>
            </div>
          </section>

          {/* Syllabus */}
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-light">Your syllabus, at a glance</h2>
                <p className="text-xs text-slate-400">One unit at a time. You're making real progress.</p>
              </div>
              <Link to="/subjects" className="text-xs font-medium text-brand">View subjects →</Link>
            </div>
            {subjects.length ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {subjects.slice(0, 3).map((s) => <SyllabusCard key={s._id} subject={s} />)}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                No subjects yet. <Link to="/subjects" className="font-medium text-brand">Add your first subject</Link>
              </p>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <FocusTimer sessionsToday={stats.sessionsToday} />
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h2 className="mb-4 text-lg font-light">Coming up next</h2>
            <UpcomingList tasks={upcoming} />
          </section>
          <WeeklyChart stats={stats} />
        </aside>
      </div>
    </div>
  );
}