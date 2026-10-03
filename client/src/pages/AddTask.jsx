import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Flag, Check, Plus, Headphones, Lightbulb } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import UpcomingList from "../components/UpcomingList";
import { colorOf } from "../lib/colors";
import { toDateStr, longDate } from "../lib/dates";

const TIMES = [15, 25, 30, 45, 60, 90, 120];
const PRIORITIES = [
  { key: "low", label: "Low", hint: "When you have time", sel: "border-slate-400 bg-slate-50 text-slate-700", text: "text-slate-500" },
  { key: "medium", label: "Medium", hint: "Keep it on your radar", sel: "border-blue-400 bg-blue-50 text-blue-600", text: "text-blue-600" },
  { key: "high", label: "High", hint: "Make it a focus", sel: "border-orange-400 bg-orange-50 text-orange-600", text: "text-orange-500" },
];

export default function AddTask() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subjects, tasks, addTask } = useData();
  const today = toDateStr();

  const [form, setForm] = useState({ title: "", subject: "", dueDate: today, minutes: 45, priority: "medium", notes: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const subjectId = form.subject || subjects[0]?._id || "";
  const subject = subjects.find((s) => s._id === subjectId);
  const priority = PRIORITIES.find((p) => p.key === form.priority);
  const upcoming = tasks.filter((t) => !t.completed && t.dueDate >= today).slice(0, 3);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) return setError("Please give your task a title.");
    if (!subjectId) return setError("Create a subject first, then add your task.");
    setBusy(true);
    try {
      await addTask({ ...form, subject: subjectId });
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create the task.");
      setBusy(false);
    }
  };

  const label = "mb-2 block text-sm font-medium";
  const field = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand";

  return (
    <div className="mx-auto max-w-6xl">
      <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600">
        <ArrowLeft size={14} /> Back to overview
      </Link>
      <h1 className="mt-3 text-2xl font-light sm:text-3xl">Add task</h1>
      <p className="mt-1 text-sm text-slate-400">One clear task, one step closer to your goals, {user?.name?.split(" ")[0]}.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <form onSubmit={submit} className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 lg:col-span-2">
          <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-light">Task details</h2>
              <p className="text-sm text-slate-400">Give your next study session a clear direction.</p>
            </div>
            <span className="text-xs text-slate-400">* Required</span>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            <div>
              <label className={label}>Task title *</label>
              <input className={field} value={form.title} maxLength={120} placeholder="e.g. Review integration techniques"
                onChange={(e) => set("title", e.target.value)} />
              <p className="mt-2 text-xs text-slate-400">Keep it specific so you know exactly where to start.</p>
            </div>

            <div>
              <label className={label}>Subject *</label>
              {subjects.length ? (
                <div className="grid gap-3 sm:grid-cols-3">
                  {subjects.map((s) => {
                    const selected = s._id === subjectId;
                    return (
                      <button type="button" key={s._id} onClick={() => set("subject", s._id)}
                        className={`flex items-center gap-3 rounded-xl border p-3 text-left ${selected ? colorOf(s.color).sel : "border-slate-200"}`}>
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm font-semibold ${colorOf(s.color).chip}`}>{s.name[0]}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">{s.name}</span>
                          <span className="block text-xs text-slate-400">{s.code || "No code"}</span>
                        </span>
                        <span className={`h-4 w-4 rounded-full border ${selected ? "border-4 border-brand" : "border-slate-300"}`} />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-400">
                  You have no subjects yet. <Link to="/subjects" className="font-medium text-brand">Create one first</Link>.
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={label}>Due date</label>
                <div className="relative">
                  <Calendar size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="date" className={`${field} pl-11`} value={form.dueDate} onChange={(e) => set("dueDate", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={label}>Estimated study time</label>
                <div className="relative">
                  <Clock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select className={`${field} pl-11`} value={form.minutes} onChange={(e) => set("minutes", Number(e.target.value))}>
                    {TIMES.map((m) => <option key={m} value={m}>{m} minutes</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className={label}>Priority</label>
              <div className="grid gap-3 sm:grid-cols-3">
                {PRIORITIES.map((p) => (
                  <button type="button" key={p.key} onClick={() => set("priority", p.key)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left ${form.priority === p.key ? p.sel : "border-slate-200"}`}>
                    <Flag size={16} />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{p.label}</span>
                      <span className="block text-xs text-slate-400">{p.hint}</span>
                    </span>
                    {form.priority === p.key && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className={label}>Notes <span className="font-normal text-slate-400">(optional)</span></label>
                <span className="mb-2 text-xs text-slate-400">{form.notes.length} / 500</span>
              </div>
              <textarea rows={4} maxLength={500} className={field} value={form.notes}
                placeholder="Anything that will help you get started..." onChange={(e) => set("notes", e.target.value)} />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="text-xs text-slate-400">This task will appear on your overview.</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => navigate(-1)}
                className="flex-1 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium sm:flex-none">Cancel</button>
              <button type="submit" disabled={busy}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60 sm:flex-none">
                <Plus size={16} /> {busy ? "Creating..." : "Create task"}
              </button>
            </div>
          </div>
        </form>

        <aside className="space-y-6">
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-light">Your task, at a glance</h2>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-400">Draft</span>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              {subject && <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${colorOf(subject.color).chip}`}>{subject.name}</span>}
              <p className={`mt-3 text-lg ${form.title ? "" : "text-slate-300"}`}>{form.title || "Your task title"}</p>
              <p className={`mt-2 flex items-center gap-1.5 text-xs ${priority.text}`}><Flag size={12} /> {priority.label} priority</p>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-slate-400">Due date</dt><dd>{form.dueDate ? longDate(form.dueDate) : "Not set"}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Study time</dt><dd>{form.minutes} minutes</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Status</dt><dd>To do</dd></div>
            </dl>
            <div className="mt-4 flex gap-3 border-t border-slate-100 pt-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-brand"><Headphones size={16} /></span>
              <div>
                <p className="text-sm font-medium">A little focus goes a long way.</p>
                <p className="text-xs text-slate-400">Try two focused sessions with a short break in between.</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-lg font-light">Coming up next</h2>
            <p className="mb-4 text-xs text-slate-400">Keep your upcoming deadlines in mind.</p>
            <UpcomingList tasks={upcoming} />
          </section>

          <p className="flex items-center gap-2 px-1 text-xs text-slate-400">
            <Lightbulb size={14} /> Small, specific tasks are easier to start, and more satisfying to finish.
          </p>
        </aside>
      </div>
    </div>
  );
}