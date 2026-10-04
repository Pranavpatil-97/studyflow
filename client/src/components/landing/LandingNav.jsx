import { Link } from "react-router-dom";
import { Logo, Container } from "./ui";

const links = [["Features", "#features"], ["How it works", "#how"], ["FAQs", "#faq"]];

export default function LandingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
      <Container className="flex h-[72px] items-center justify-between">
        <Link to="/" aria-label="Studyflow home"><Logo /></Link>
        <nav className="hidden gap-8 text-sm text-slate-500 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-slate-800">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4 sm:gap-5">
          <Link to="/login" className="text-sm font-medium text-slate-800">Sign in</Link>
          <Link to="/login?mode=register" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            Sign up
          </Link>
        </div>
      </Container>
    </header>
  );
}