import { colorOf } from "../lib/colors";
import { fromDateStr } from "../lib/dates";

export default function UpcomingList({ tasks }) {
  if (!tasks.length) return <p className="text-sm text-slate-400">Nothing coming up. Enjoy the calm.</p>;

  return (
    <ul className="space-y-3">
      {tasks.map((t) => {
        const d = fromDateStr(t.dueDate);
        return (
          <li key={t._id} className="flex items-center gap-3">
            <div className={`w-12 shrink-0 rounded-xl py-1.5 text-center ${colorOf(t.subject?.color).chip}`}>
              <div className="text-[10px] font-medium uppercase">
                {d.toLocaleDateString("en-US", { month: "short" })}
              </div>
              <div className="text-lg leading-none">{d.getDate()}</div>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{t.title}</p>
              <p className="text-xs text-slate-400">
                {d.toLocaleDateString("en-US", { weekday: "long" })} · {t.subject?.name}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}