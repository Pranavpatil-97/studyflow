import { TrendingUp, TrendingDown } from "lucide-react";

export default function WeeklyChart({ stats }) {
  const { days, total, change, range } = stats;
  const max = Math.max(...days.map((d) => d.minutes), 1);
  const hours = Math.round(total / 6) / 10; // one decimal

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-light">This week</h2>
        {change !== null && (
          <span className={`flex items-center gap-1 text-xs ${change >= 0 ? "text-emerald-600" : "text-orange-500"}`}>
            {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {Math.abs(change)}% vs. last week
          </span>
        )}
      </div>
      <p className="mt-3 text-4xl font-light">
        {hours} <span className="text-xs font-normal text-slate-400">hours of focused study</span>
      </p>
      <p className="text-xs text-slate-400">{range}</p>

      <div className="mt-5 flex h-28 items-end gap-2">
        {days.map((d) => (
          <div key={d.label} className="flex h-full flex-1 flex-col justify-end gap-2 text-center">
            <div
              title={`${d.minutes} min`}
              className={`rounded-md transition-all ${d.today ? "bg-brand" : d.minutes ? "bg-blue-200" : "bg-slate-100"}`}
              style={{ height: `${Math.max((d.minutes / max) * 100, 6)}%` }}
            />
            <span className={`text-[10px] ${d.today ? "font-medium text-brand" : "text-slate-400"}`}>{d.label[0]}</span>
          </div>
        ))}
      </div>
      {total === 0 && <p className="mt-4 text-center text-xs text-slate-400">Finish a focus session to see your week take shape.</p>}
    </section>
  );
}