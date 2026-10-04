import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Check, ChevronRight, Clock, Flag, Headphones, Leaf, MoreHorizontal, Play, Plus, Sigma, BookOpen } from "lucide-react";
import { Container, Eyebrow, H2, TimerRing } from "./ui";
import { colorOf } from "../../lib/colors";

/* ---------- 1. Task planning ---------- */
const Field = ({ label, icon: Icon, children, className = "" }) => (
  <div className={className}>
    <p className="mb-1.5 text-xs font-medium text-slate-700">{label}</p>
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700">
      {Icon && <Icon size={14} className="text-slate-400" />} {children}
    </div>
  </div>
);

function TaskPlanning() {
  const subjects = [["Mathematics", "MATH 201", true], ["Biology", "BIO 101"], ["Literature", "ENG 204"]];
  return (
    <section id="features" className="scroll-mt-20 bg-slate-50 py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>Make a plan</Eyebrow>
          <H2 className="mt-4">A full semester.<br />One clear next step.</H2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
            From a calculus problem set to an essay outline, give every assignment a place and every study session a purpose.
          </p>
          <ul className="mt-6 space-y-3 text-slate-500">
            {["Organize tasks by subject", "Set a due date and study time", "Keep priorities and notes close by"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm"><Check size={18} className="text-brand" /> {t}</li>
            ))}
          </ul>
          <Link to="/login?mode=register" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand">
            Give your next session a direction <ArrowRight size={14} />
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <div className="flex items-baseline justify-between">
            <p className="text-xl font-light">Add task</p><span className="text-[10px] text-slate-400">* Required</span>
          </div>
          <Field label="Task title *" className="mt-5">Review integration techniques</Field>
          <p className="mb-1.5 mt-5 text-xs font-medium text-slate-700">Subject *</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {subjects.map(([name, code, on]) => (
              <div key={name} className={`rounded-xl border px-3 py-2.5 ${on ? "border-brand bg-blue-50" : "border-slate-200"}`}>
                <p className={`text-xs ${on ? "text-brand" : ""}`}>{name}</p><p className="text-[10px] text-slate-400">{code}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Due date" icon={Calendar}>Mon, October 5</Field>
            <Field label="Estimated study time" icon={Clock}>45 minutes</Field>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-700">Notes <span className="font-normal text-slate-400">(optional)</span></p>
            <span className="flex items-center gap-1 text-[10px] text-orange-500"><Flag size={10} /> High priority</span>
          </div>
          <div className="mt-1.5 rounded-xl border border-slate-200 px-3.5 py-3 text-xs leading-relaxed text-slate-500">
            Review substitution and integration by parts. Work through examples in Unit 7 before the calculus problem set.
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-[10px] text-slate-400">One clear task. Ready when you are.</p>
            <span className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-xs font-medium text-white"><Plus size={14} /> Create task</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- 2. Syllabus ---------- */
const syllabus = [
  { name: "Mathematics", code: "MATH 201", color: "blue", done: 6, total: 10, unit: 7, next: "Integration techniques", Icon: Sigma },
  { name: "Biology", code: "BIO 101", color: "green", done: 4, total: 8, unit: 5, next: "Cell division", Icon: Leaf },
  { name: "Literature", code: "ENG 204", color: "orange", done: 7, total: 12, unit: 8, next: "Modern American fiction", Icon: BookOpen },
];

function Syllabus() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <Eyebrow>See the bigger picture</Eyebrow>
        <H2 className="mt-4">Your syllabus, one unit at a time.</H2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500">
          See what you've covered and what's coming next. Small steps stay visible, even when the semester feels big.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {syllabus.map(({ name, code, color, done, total, unit, next, Icon }) => {
            const c = colorOf(color);
            return (
              <div key={name} className="rounded-3xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl ${c.chip}`}><Icon size={18} /></span>
                  <div><p className="text-sm font-medium">{name}</p><p className="text-[10px] text-slate-400">{code}</p></div>
                </div>
                <div className="mt-6 flex items-baseline justify-between">
                  <span className="text-4xl font-light">{done}</span>
                  <span className="text-xs text-slate-400">of {total} units complete</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {Array.from({ length: total }, (_, i) => (
                    <span key={i} className={`grid h-6 w-6 place-items-center rounded-md ${i < done ? `${c.fill} text-white` : "bg-slate-100"}`}>
                      {i < done && <Check size={13} />}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-wide text-slate-400">Up next · Unit {unit}</p>
                <p className="mt-1 text-sm">{next}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ---------- 3. Focus timer ---------- */
function FocusTimer() {
  return (
    <section className="bg-[#ecf2fe] py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-[400px] rounded-3xl bg-white p-5 shadow-xl shadow-blue-900/5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-lg font-light"><Headphones size={16} className="text-brand" /> Time to focus</p>
            <MoreHorizontal size={16} className="text-slate-400" />
          </div>
          <div className="mt-4 grid grid-cols-3 rounded-xl bg-slate-100 p-1 text-center text-[11px] text-slate-500">
            <span className="rounded-lg bg-white py-1.5 font-medium text-brand shadow-sm">Focus</span>
            <span className="py-1.5">Short break</span><span className="py-1.5">Long break</span>
          </div>
          <div className="mt-6 flex justify-center"><TimerRing size={210} text="text-5xl" /></div>
          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">Focusing on</p>
            <p className="mt-1 text-sm">Practice integration problems</p>
            <span className="mt-2 inline-block rounded-md bg-blue-100/70 px-2.5 py-1 text-[11px] text-brand">Mathematics</span>
          </div>
          <span className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-medium text-white">
            <Play size={14} /> Start focus session
          </span>
        </div>

        <div>
          <Eyebrow>Find your focus</Eyebrow>
          <H2 className="mt-4">One task.<br />A little time.<br />A fresh start.</H2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-500">
            You don't have to tackle everything at once. Choose a task, start a focused session, and give yourself space to get into it.
          </p>
          <div className="mt-6 flex items-center gap-4">
            {[["25 min", "Time to focus"], ["5 min", "Time to reset"]].map(([big, small], i) => (
              <div key={big} className="flex items-center gap-4">
                {i === 1 && <ArrowRight size={16} className="text-brand" />}
                <div className="rounded-xl bg-white px-4 py-3 shadow-sm"><p className="text-xl text-brand">{big}</p><p className="text-[11px] text-slate-500">{small}</p></div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">Focus, short break, long break. A simple rhythm that leaves room to pause, too.</p>
        </div>
      </Container>
    </section>
  );
}

/* ---------- 4. Deadlines + weekly insights ---------- */
const upcoming = [
  ["OCT", "05", "Calculus problem set", "Monday · 11:59 PM", "Mathematics", "blue"],
  ["OCT", "07", "Cell biology quiz", "Wednesday · 10:00 AM", "Biology", "green"],
  ["OCT", "09", "The Great Gatsby essay", "Friday · 5:00 PM", "Literature", "orange"],
];
const week = [["Mon", 60], ["Tue", 85], ["Wed", 50], ["Thu", 100], ["Fri", 75], ["Sat", 92], ["Sun", 14]];

function Deadlines() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <Eyebrow>Stay in the loop</Eyebrow>
        <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <H2>A view of what's ahead.<br />And how far you've come.</H2>
          <p className="max-w-sm text-base leading-relaxed text-slate-500">
            Keep upcoming deadlines in sight, then look back at your week to see where your study time went.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <div className="flex items-baseline justify-between"><p className="text-xl font-light">Coming up next</p><span className="text-xs text-slate-400">October</span></div>
              <ul className="mt-5 space-y-4">
                {upcoming.map(([mon, day, title, when, subject, key]) => (
                  <li key={title} className="flex items-center gap-4">
                    <div className={`w-14 shrink-0 rounded-xl py-2 text-center ${colorOf(key).chip}`}>
                      <p className="text-[9px] font-medium">{mon}</p><p className="text-2xl font-light leading-none">{day}</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{title}</p>
                      <p className="text-xs text-slate-400">{when}</p>
                      <p className={`text-[11px] ${colorOf(key).chip.split(" ")[1]}`}>{subject}</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-300" />
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-lg font-light">Plan before the due date.</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">Keep assignments, quizzes, and essays together, so you can decide what needs your attention next.</p>
          </div>

          <div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <div className="flex items-baseline justify-between"><p className="text-xl font-light">This week</p><span className="text-xs text-slate-400">Sep 28 – Oct 4</span></div>
              <p className="mt-4 text-5xl font-light">12.5 <span className="text-xs font-normal text-slate-400">hours of focused study</span></p>
              <div className="mt-6 flex h-36 items-end gap-3">
                {week.map(([d, h]) => (
                  <div key={d} className="flex h-full flex-1 flex-col justify-end gap-2 text-center">
                    <div className={`rounded-md ${d === "Sat" ? "bg-brand" : d === "Sun" ? "bg-slate-200/70" : "bg-blue-200"}`} style={{ height: `${h}%` }} />
                    <span className={`text-[10px] ${d === "Sat" ? "text-brand" : "text-slate-400"}`}>{d}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-slate-400">Example activity from Alex's study planner</p>
            </div>
            <p className="mt-5 text-lg font-light">Notice your study rhythm.</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">Reflect on your focused study time throughout the week and make a little room for the next one.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function Features() {
  return (
    <>
      <TaskPlanning />
      <Syllabus />
      <FocusTimer />
      <Deadlines />
    </>
  );
}