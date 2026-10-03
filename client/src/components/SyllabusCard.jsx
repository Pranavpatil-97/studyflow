import { Link } from "react-router-dom";
import { colorOf } from "../lib/colors";

export default function SyllabusCard({ subject }) {
  const c = colorOf(subject.color);
  const { totalUnits, doneUnits, unitStates, nextUnit } = subject;

  return (
    <Link
      to={`/subjects/${subject._id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 place-items-center rounded-xl text-sm font-semibold ${c.chip}`}>
          {subject.name[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{subject.name}</p>
          <p className="text-xs text-slate-400">{subject.code || "No code"}</p>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-3xl font-light">{doneUnits}</span>
        <span className="text-xs text-slate-400">of {totalUnits} units complete</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {unitStates.map((done, i) => (
          <span key={i} className={`h-5 w-5 rounded-md ${done ? c.fill : "bg-slate-100"}`} />
        ))}
        {totalUnits === 0 && <span className="text-xs text-slate-400">No units yet. Open to add some.</span>}
      </div>

      {nextUnit && (
        <div className="mt-3 text-xs text-slate-400">
          UP NEXT · UNIT {nextUnit.number}
          <span className="mt-0.5 block truncate text-sm text-slate-800">{nextUnit.title}</span>
        </div>
      )}
    </Link>
  );
}