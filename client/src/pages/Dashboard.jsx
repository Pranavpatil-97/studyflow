import { Plus, CalendarDays } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0];
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-light">Let's make today count, {firstName}.</h1>
          <p className="mt-1 text-sm text-slate-400">A little focus today, a step closer to your goals.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-sm text-slate-400"><CalendarDays size={16} /> {today}</span>
          <button className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white">
            <Plus size={16} /> Add task
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-400">
        Daily progress, Today's Tasks, syllabus cards and the focus timer arrive in the next steps.
      </div>
    </div>
  );
}
