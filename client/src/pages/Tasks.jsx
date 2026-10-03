import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useData } from "../context/DataContext";
import TaskRow from "../components/TaskRow";

const TABS = [["all", "All"], ["todo", "To do"], ["done", "Completed"]];

export default function Tasks() {
  const { tasks, loading } = useData();
  const [tab, setTab] = useState("todo");
  const shown = tasks.filter((t) => tab === "all" || (tab === "todo" ? !t.completed : t.completed));

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light sm:text-3xl">My tasks</h1>
          <p className="mt-1 text-sm text-slate-400">Everything on your plate, sorted by due date.</p>
        </div>
        <Link to="/tasks/new" className="hidden items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white sm:flex">
          <Plus size={16} /> Add task
        </Link>
      </div>

      <section className="mt-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex w-full rounded-xl bg-slate-100 p-1 text-xs sm:w-fit">
            {TABS.map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex-1 rounded-lg px-4 py-1.5 sm:flex-none ${tab === key ? "bg-white font-medium shadow-sm" : "text-slate-500"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        {shown.length ? (
          <ul className="divide-y divide-slate-100">{shown.map((t) => <TaskRow key={t._id} task={t} showDate />)}</ul>
        ) : (
          <p className="p-10 text-center text-sm text-slate-400">{loading ? "Loading..." : "No tasks here."}</p>
        )}
      </section>
    </div>
  );
}