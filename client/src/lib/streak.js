import { toDateStr } from "./dates";

// Streak = consecutive days (ending today or yesterday) with at least one completed task
export function streakInfo(tasks) {
  const days = new Set(
    tasks.filter((t) => t.completed && t.completedAt).map((t) => toDateStr(new Date(t.completedAt)))
  );

  let streak = 0;
  const d = new Date();
  if (!days.has(toDateStr(d))) d.setDate(d.getDate() - 1);
  while (days.has(toDateStr(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }

  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const week = Array.from({ length: 7 }, (_, i) => {
    const x = new Date(monday);
    x.setDate(monday.getDate() + i);
    return { label: "MTWTFSS"[i], on: days.has(toDateStr(x)), today: toDateStr(x) === toDateStr(now) };
  });

  return { streak, week };
}