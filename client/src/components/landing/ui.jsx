import { BookOpen } from "lucide-react";

export const Logo = () => (
  <span className="flex items-center gap-3">
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">
      <BookOpen size={18} />
    </span>
    <span className="text-2xl font-light tracking-tight text-slate-800">studyflow</span>
  </span>
);

export const Container = ({ className = "", children }) => (
  <div className={`mx-auto max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>
);

export const Eyebrow = ({ children }) => (
  <p className="text-xs font-medium uppercase tracking-wide text-brand">{children}</p>
);

export const H2 = ({ children, className = "" }) => (
  <h2 className={`text-3xl font-light leading-tight tracking-tight text-slate-800 sm:text-4xl md:text-[44px] ${className}`}>
    {children}
  </h2>
);

// Static focus-timer ring used in the hero preview and the focus section
export function TimerRing({ size = 160, text = "text-3xl" }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e8effd" strokeWidth="6" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="#4175f0" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * 0.15} />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <p className={`${text} font-light text-slate-800`}>25:00</p>
        <p className="text-[9px] uppercase tracking-wide text-slate-400">Let's do this</p>
      </div>
    </div>
  );
}