import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Plus, Trash2 } from "lucide-react";
import api from "../services/api";
import { useData } from "../context/DataContext";
import { colorOf } from "../lib/colors";

export default function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { subjects, loading, loadSubjects, removeSubject } = useData();
  const subject = subjects.find((s) => s._id === id);

  const [units, setUnits] = useState([]);
  const [title, setTitle] = useState("");

  const loadUnits = useCallback(async () => {
    setUnits((await api.get(`/subjects/${id}/units`)).data);
  }, [id]);

  useEffect(() => { loadUnits(); }, [loadUnits]);

  const refresh = () => Promise.all([loadUnits(), loadSubjects()]);

  const addUnit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await api.post(`/subjects/${id}/units`, { title });
    setTitle("");
    refresh();
  };
  const toggle = async (u) => { await api.patch(`/units/${u._id}`, { done: !u.done }); refresh(); };
  const removeUnit = async (u) => { await api.delete(`/units/${u._id}`); refresh(); };
  const removeThis = async () => {
    if (!window.confirm("Delete this subject, its units and its tasks?")) return;
    await removeSubject(id);
    navigate("/subjects");
  };

  if (!subject) {
    return (
      <p className="text-sm text-slate-400">
        {loading ? "Loading..." : "Subject not found."} <Link to="/subjects" className="font-medium text-brand">Back to subjects</Link>
      </p>
    );
  }

  const c = colorOf(subject.color);
  const pct = subject.totalUnits ? Math.round((subject.doneUnits / subject.totalUnits) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/subjects" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600">
        <ArrowLeft size={14} /> All subjects
      </Link>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`grid h-12 w-12 place-items-center rounded-xl text-lg font-semibold ${c.chip}`}>{subject.name[0]}</span>
          <div>
            <h1 className="text-2xl font-light">{subject.name}</h1>
            <p className="text-sm text-slate-400">{subject.code || "No code"}</p>
          </div>
        </div>
        <button onClick={removeThis} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-500">
          <Trash2 size={15} /> <span className="hidden sm:inline">Delete</span>
        </button>
      </div>

      <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-slate-500">{subject.doneUnits} of {subject.totalUnits} units complete</p>
          <p className="text-2xl font-light">{pct}%</p>
        </div>
        <div className="mt-3 h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full transition-all ${c.fill}`} style={{ width: `${pct}%` }} /></div>
      </section>

      <section className="mt-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <form onSubmit={addUnit} className="flex gap-3 border-b border-slate-100 p-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a unit, e.g. Integration techniques" maxLength={120}
            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand" />
          <button type="submit" className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white"><Plus size={16} /> Add</button>
        </form>
        {units.length ? (
          <ul className="divide-y divide-slate-100">
            {units.map((u, i) => (
              <li key={u._id} className="flex items-center gap-3 px-4 py-3">
                <button onClick={() => toggle(u)} aria-label="Toggle unit"
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${u.done ? `${c.fill} border-transparent text-white` : "border-slate-300"}`}>
                  {u.done && <Check size={13} />}
                </button>
                <span className="w-14 shrink-0 text-xs text-slate-400">Unit {i + 1}</span>
                <span className={`min-w-0 flex-1 truncate text-sm ${u.done ? "text-slate-400 line-through" : ""}`}>{u.title}</span>
                <button onClick={() => removeUnit(u)} aria-label="Delete unit" className="text-slate-300 hover:text-red-500"><Trash2 size={15} /></button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-8 text-center text-sm text-slate-400">No units yet. Add the first one above.</p>
        )}
      </section>
    </div>
  );
}