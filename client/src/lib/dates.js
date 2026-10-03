const z = (n) => String(n).padStart(2, "0");

// Local date as "YYYY-MM-DD" (matches how dueDate is stored)
export const toDateStr = (d = new Date()) =>
  `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;

export const fromDateStr = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const prettyDate = (s) =>
  fromDateStr(s).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

export const longDate = (s) =>
  fromDateStr(s).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" });