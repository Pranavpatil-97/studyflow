import { toDateStr } from "./dates";

const short = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

// Turns raw focus sessions into everything the dashboard needs
export function weekStats(sessions, now = new Date()) {
  const byDay = {};
  sessions.forEach((s) => {
    const key = toDateStr(new Date(s.createdAt));
    byDay[key] = (byDay[key] || 0) + s.minutes;
  });

  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
  const dayAt = (start, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = dayAt(monday, i);
    const key = toDateStr(d);
    return {
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      minutes: byDay[key] || 0,
      today: key === toDateStr(now),
    };
  });
  const total = days.reduce((sum, d) => sum + d.minutes, 0);

  const lastMonday = dayAt(monday, -7);
  let previous = 0;
  for (let i = 0; i < 7; i++) previous += byDay[toDateStr(dayAt(lastMonday, i))] || 0;

  const yesterday = toDateStr(dayAt(now, -1));

  return {
    days,
    total,
    change: previous > 0 ? Math.round(((total - previous) / previous) * 100) : null,
    range: `${short(monday)} – ${short(dayAt(monday, 6))}`,
    todayMinutes: byDay[toDateStr(now)] || 0,
    yesterdayMinutes: byDay[yesterday] || 0,
    sessionsToday: sessions.filter((s) => toDateStr(new Date(s.createdAt)) === toDateStr(now)).length,
  };
}

export const fmtMinutes = (m) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`);
export const fmtClock = (ms) => {
  const s = Math.ceil(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};