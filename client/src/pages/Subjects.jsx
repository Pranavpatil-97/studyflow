import { useState } from "react";
import { Plus } from "lucide-react";
import { useData } from "../context/DataContext";
import SyllabusCard from "../components/SyllabusCard";
import { COLORS } from "../lib/colors";

export default function Subjects() {
  const { subjects, addSubject, loading } = useData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", code: "", color: "blue" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addSubject(form);
      setForm({ name: "", code: "", color: "blue" });
      setOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Could not create the subject.");
    }
  };

  const field = "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand";

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light sm:text-3xl">Subjects</h1>
          <p className="mt-1 text-sm text-slate-400">Track your syllabus one unit at a time.</p>
        </div>
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white">
          <Plus size={16} /> <span className="hidden sm:inline">New</span> subject
        </button>
      </div>

      {open && (
        <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={field} placeholder="Subject name (e.g. Mathematics)" value={form.name} maxLength={60}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={field} placeholder="Code (e.g. MATH 201)" value={form.code} maxLength={20}
              onChange={(e) => setForm({ ...form, code: e.target.value })} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-500">Color</span>
            {Object.entries(COLORS).map(([key, c]) => (
              <button type="button" key={key} aria-label={c.label} onClick={() => setForm({ ...form, color: key })}
                className={`h-7 w-7 rounded-full ${c.dot} ${form.color === key ? "ring-2 ring-slate-800 ring-offset-2" : ""}`} />
            ))}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white">Save subject</button>
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm">Cancel</button>
          </div>
        </form>
      )}

      {subjects.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {subjects.map((s) => <SyllabusCard key={s._id} subject={s} />)}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-slate-400">{loading ? "Loading..." : "No subjects yet. Add your first one above."}</p>
      )}
    </div>
  );
}