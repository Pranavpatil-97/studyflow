import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, Check, Headphones, LayoutGrid, ListChecks, Play, Target } from "lucide-react";
import { Container, TimerRing } from "./ui";
import { colorOf } from "../../lib/colors";

const nav = [["Overview", LayoutGrid], ["My tasks", ListChecks], ["Subjects", BookOpen], ["Calendar", CalendarDays], ["Focus", Headphones]];
const subjects = [
  ["Mathematics", "blue", 60, "6 of 10 units complete"],
  ["Biology", "green", 50, "4 of 8 units complete"],
  ["Literature", "orange", 58, "7 of 12 units complete"],
];
const tasks = [
  ["Practice integration problems", "Mathematics", "blue", "45 min", false],
  ["Review cell division & make flashcards", "Biology", "green", "30 min", false],
  ["Draft essay outline for The Great Gatsby", "Literature", "orange", "40 min", false],
  ["Complete limits & continuity worksheet", "Mathematics", "blue", "35 min", true],
];

function Preview() {
  return (
    <div className="mx-auto mt-14 max-w-[1100px] overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-2xl shadow-blue-900/10">
      <div className="flex">
        <aside className="hidden w-[150px] shrink-0 bg-sidebar p-3 text-white md:block">
          <div className="mb-5 flex items-center gap-2 px-1">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-brand"><BookOpen size={13} /></span>
            <span className="text-sm">Studyflow</span>
          </div>
          <p className="mb-1.5 px-1 text-[8px] uppercase tracking-wider text-sidebar-muted">Workspace</p>
          {nav.map(([label, Icon], i) => (
            <div key={label} className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] ${i === 0 ? "bg-sidebar-active" : "text-sidebar-muted"}`}>
              <Icon size={11} /> {label}
            </div>
          ))}
          <p className="mb-1.5 mt-5 px-1 text-[8px] uppercase tracking-wider text-sidebar-muted">My subjects</p>
          {subjects.map(([name, key]) => (
            <div key={name} className="flex items-center gap-2 px-2 py-1 text-[10px] text-slate-300">
              <span className={`h-1.5 w-1.5 rounded-full ${colorOf(key).dot}`} /> {name}
            </div>
          ))}
        </aside>

        <div className="min-w-0 flex-1 bg-slate-50 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-light sm:text-xl">Let's make today count, Alex.</p>
              <p className="text-[10px] text-slate-400">A little focus today, a step closer to your goals.</p>
            </div>
            <span className="shrink-0 rounded-lg bg-brand px-3 py-1.5 text-[10px] font-medium text-white">Add task</span>
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-brand"><Target size={16} /></span>
            <div className="flex-1">
              <div className="flex justify-between text-[10px]"><span>Your daily progress</span><span className="text-slate-400">5 of 8 tasks completed</span></div>
              <div className="mt-1.5 h-1.5 rounded-full bg-slate-100"><div className="h-1.5 w-[63%] rounded-full bg-brand" /></div>
              <p className="mt-1 text-[9px] text-slate-400">You're over halfway there. Just 3 more tasks to go!</p>
            </div>
            <span className="text-xl font-light">63%</span>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_200px]">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="mb-2 text-xs">Today's Tasks</p>
              {tasks.map(([title, subject, key, mins, done]) => (
                <div key={title} className="flex items-center gap-2 border-t border-slate-100 py-2">
                  <span className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded border ${done ? "border-brand bg-brand text-white" : "border-slate-300"}`}>
                    {done && <Check size={9} />}
                  </span>
                  <span className={`min-w-0 flex-1 truncate text-[10px] ${done ? "text-slate-400 line-through" : ""}`}>{title}</span>
                  <span className={`hidden rounded px-1.5 py-0.5 text-[9px] sm:inline ${colorOf(key).chip}`}>{subject}</span>
                  <span className="hidden text-[9px] text-slate-400 sm:inline">{mins}</span>
                </div>
              ))}
            </div>
            <div className="hidden flex-col items-center rounded-xl bg-white p-3 shadow-sm lg:flex">
              <p className="mb-2 self-start text-xs">Time to focus</p>
              <TimerRing size={110} text="text-xl" />
              <span className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand py-1.5 text-[10px] font-medium text-white">
                <Play size={10} /> Start focus session
              </span>
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {subjects.map(([name, key, pct, label]) => (
              <div key={name} className="rounded-xl bg-white p-3 shadow-sm">
                <p className="text-[10px]">{name}</p>
                <div className="mt-1.5 h-1.5 rounded-full bg-slate-100"><div className={`h-1.5 rounded-full ${colorOf(key).fill}`} style={{ width: `${pct}%` }} /></div>
                <p className="mt-1 text-[9px] text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50/70 pb-16 pt-14 text-center sm:pt-16">
      <Container>
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> A little structure. A lot more clarity.
        </span>
        <h1 className="mt-6 text-4xl font-light leading-[1.1] tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
          Your studies,<br />in a calmer flow.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
          Bring tasks, subjects, and focus time into one clear study planner. Know what's next.
          Make progress, one session at a time.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link to="/login?mode=register" className="flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white hover:opacity-90">
            Create your study planner <ArrowRight size={16} />
          </Link>
          <a href="#features" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50">
            Explore the features
          </a>
        </div>
        <p className="mt-5 text-xs text-slate-400">Built around your subjects, your schedule, and your pace.</p>

        <Preview />
        <p className="mt-5 text-xs text-slate-400">A day in Studyflow · Example workspace with Mathematics, Biology, and Literature</p>
      </Container>
    </section>
  );
}