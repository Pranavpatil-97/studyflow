import { Link } from "react-router-dom";
import { Container, Logo } from "./ui";

const link = "text-sm text-slate-500 hover:text-slate-800";

export default function LandingFooter() {
  return (
    <footer className="bg-slate-50 py-12">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-slate-500">A little focus today, a step closer to your goals.</p>
          </div>
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            <div className="space-y-3">
              <p className="text-xs font-semibold">Explore</p>
              <a href="#features" className={`block ${link}`}>Features</a>
              <a href="#how" className={`block ${link}`}>How it works</a>
              <a href="#faq" className={`block ${link}`}>FAQs</a>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold">Your workspace</p>
              <Link to="/login?mode=register" className={`block ${link}`}>Sign up</Link>
              <Link to="/login" className={`block ${link}`}>Sign in</Link>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold">More</p>
              {["Help", "Privacy", "Terms"].map((t) => <span key={t} className="block text-sm text-slate-400">{t}</span>)}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} Studyflow. All rights reserved.</span>
          <span>Small steps. Steady progress.</span>
        </div>
      </Container>
    </footer>
  );
}