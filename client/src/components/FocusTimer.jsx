import { Headphones, Pause, Play, RotateCcw } from "lucide-react";
import { useData } from "../context/DataContext";
import { LABELS, useFocus } from "../context/FocusContext";
import { fmtClock } from "../lib/focusStats";
import { toDateStr } from "../lib/dates";
import SubjectTag from "./SubjectTag";

const R = 46;
const C = 2 * Math.PI * R;

export default function FocusTimer({ sessionsToday }) {
  const { tasks } = useData();
  const { mode, running, remaining, total, taskId, setTaskId, start, pause, reset, switchMode } = useFocus();

  const today = toDateStr();
  const pending = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => (a.dueDate === today ? -1 : 0) - (b.dueDate === today ? -1 : 0));
  const selected = pending.find((t) => t._id === (taskId || pending[0]?._id));
  const untouched = remaining === total;
  const caption = mode !== "focus" ? "Take a breather" : running ? "Stay with it" : untouched ? "Let's do this" : "Paused";

  const onStart = () => {
    if (!taskId && selected) setTaskId(selected._id);
    start();
  };

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <h2 className="flex items-center gap-2 text-lg font-light">
        <Headphones size={16} className="text-brand" /> Time to focus
      </h2>

      <div className="mt-4 grid grid-cols-3 rounded-xl bg-slate-100 p-1 text-center text-xs">
        {Object.entries(LABELS).map(([key, label]) => (
          <button key={key} onClick={() => switchMode(key)}
            className={`rounded-lg py-1.5 ${mode === key ? "bg-white font-medium text-brand shadow-sm" : "text-slate-500"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-6 h-48 w-48">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="#e8effd" strokeWidth="6" />
          <circle cx="50" cy="50" r={R} fill="none" stroke="#4175f0" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C * (1 - remaining / total)} className="transition-[stroke-dashoffset] duration-200" />
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <p className="text-4xl font-light tabular-nums text-slate-800">{fmtClock(remaining)}</p>
          <p className="text-[10px] uppercase tracking-wide text-slate-400">{caption}</p>
        </div>
      </div>

      {mode === "focus" && (
        <div className="mt-5 rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] uppercase tracking-wide text-slate-400">Focusing on</p>
          {pending.length ? (
            <>
              <select value={selected?._id || ""} onChange={(e) => setTaskId(e.target.value)} disabled={running}
                className="mt-1 w-full truncate bg-transparent text-sm outline-none disabled:opacity-70">
                {pending.map((t) => <option key={t._id} value={t._id}>{t.title}</option>)}
              </select>
              <div className="mt-1"><SubjectTag subject={selected?.subject} /></div>
            </>
          ) : (
            <p className="mt-1 text-sm text-slate-400">No open tasks. You can still start a session.</p>
          )}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button onClick={running ? pause : onStart}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-medium text-white hover:opacity-90">
          {running ? <><Pause size={14} /> Pause</> : <><Play size={14} /> {untouched ? "Start focus session" : "Resume"}</>}
        </button>
        {!untouched && (
          <button onClick={reset} aria-label="Reset timer" className="grid w-12 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50">
            <RotateCcw size={16} />
          </button>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        {sessionsToday > 0 ? `${sessionsToday} focus session${sessionsToday > 1 ? "s" : ""} today` : "Finish a session and it counts toward your week."}
      </p>
    </section>
  );
}