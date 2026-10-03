export const COLORS = {
  blue:   { label: "Blue",   dot: "bg-blue-500",    chip: "bg-blue-50 text-blue-600",       fill: "bg-blue-500",    sel: "border-blue-500 bg-blue-50" },
  green:  { label: "Green",  dot: "bg-emerald-500", chip: "bg-emerald-50 text-emerald-600", fill: "bg-emerald-500", sel: "border-emerald-500 bg-emerald-50" },
  orange: { label: "Orange", dot: "bg-orange-400",  chip: "bg-orange-50 text-orange-600",   fill: "bg-orange-400",  sel: "border-orange-400 bg-orange-50" },
  purple: { label: "Purple", dot: "bg-violet-500",  chip: "bg-violet-50 text-violet-600",   fill: "bg-violet-500",  sel: "border-violet-500 bg-violet-50" },
  rose:   { label: "Rose",   dot: "bg-rose-500",    chip: "bg-rose-50 text-rose-600",       fill: "bg-rose-500",    sel: "border-rose-500 bg-rose-50" },
};

export const colorOf = (key) => COLORS[key] || COLORS.blue;