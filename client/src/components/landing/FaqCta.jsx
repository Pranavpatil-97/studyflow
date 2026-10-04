import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Container, Eyebrow, H2 } from "./ui";

const faqs = [
  ["What can I organize in Studyflow?", "Keep study tasks, subjects, syllabus progress, and upcoming deadlines in one workspace. The focus timer and weekly activity view help you make time for your plan."],
  ["Can I plan for more than one subject?", "Yes. Add every course you're taking, each with its own color, units, and tasks, and see them side by side on your overview."],
  ["How does the focus timer work?", "Pick a task and start a 25-minute focus session, then take a 5-minute break. After a few rounds, treat yourself to a longer one."],
  ["How do I track syllabus progress?", "Add the units for each subject and tick them off as you finish. Progress shows as filled squares on each subject card, with your next unit highlighted."],
];

export default function FaqCta() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <section id="faq" className="scroll-mt-20 bg-white py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Eyebrow>A little more clarity</Eyebrow>
            <H2 className="mt-4">Good questions.<br />Simple answers.</H2>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-slate-500">Get to know the tools that bring your study week together.</p>
          </div>
          <div className="border-t border-slate-200">
            {faqs.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={q} className="border-b border-slate-200">
                  <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left">
                    <span className="text-base">{q}</span>
                    {isOpen ? <Minus size={18} className="shrink-0 text-brand" /> : <Plus size={18} className="shrink-0 text-slate-400" />}
                  </button>
                  {isOpen && <p className="pb-5 pr-8 text-sm leading-relaxed text-slate-500">{a}</p>}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white pb-16 sm:pb-24">
        <Container>
          <div className="rounded-3xl bg-[#ecf2fe] px-6 py-14 text-center sm:py-16">
            <h2 className="text-3xl font-light tracking-tight text-slate-800 sm:text-4xl md:text-5xl">Make room for a calmer study week.</h2>
            <p className="mt-4 text-base text-slate-500">Start with your subjects. Add one clear task. Let the next step follow.</p>
            <Link to="/login?mode=register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white hover:opacity-90">
              Create your study planner <ArrowRight size={16} />
            </Link>
            <p className="mt-5 text-xs text-slate-400">
              Already have an account? <Link to="/login" className="hover:text-slate-600">Sign in →</Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}