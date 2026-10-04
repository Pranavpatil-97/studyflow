import { BookOpen, ListChecks, CheckCircle2, TrendingUp, Timer } from "lucide-react";
import { Container, Eyebrow, H2 } from "./ui";

const steps = [
  ["01", BookOpen, "Bring in your subjects", "Start with the courses you're taking. Keep each syllabus and its units in one place."],
  ["02", ListChecks, "Plan your next steps", "Add specific tasks, choose a subject, and set a due date and estimated study time."],
  ["03", CheckCircle2, "Focus. Finish. Reflect.", "Start a focus session, check off what's done, and see your progress take shape."],
];

const benefits = [
  [ListChecks, "A clear place to start", "Turn assignments and revision into specific tasks, so your next step is always in sight."],
  [TrendingUp, "Progress you can see", "Keep track of completed tasks and syllabus units across every subject you're studying."],
  [Timer, "Room for real focus", "Set aside time for one thing at a time, with a focus timer and breaks built into your rhythm."],
];

export default function HowAndBenefits() {
  return (
    <>
      <section id="how" className="scroll-mt-20 bg-slate-50 py-16 sm:py-20">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <H2 className="mt-4">From a busy week to a simple plan.</H2>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {steps.map(([num, Icon, title, text]) => (
              <div key={num}>
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <span className="text-3xl font-light text-brand">{num}</span>
                  <Icon size={20} className="text-brand" strokeWidth={1.5} />
                </div>
                <p className="mt-6 text-lg">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="text-2xl font-light text-slate-800 sm:text-3xl">Less juggling. More room to learn.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12">
            {benefits.map(([Icon, title, text]) => (
              <div key={title}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-brand"><Icon size={18} /></span>
                <p className="mt-5 text-lg">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}