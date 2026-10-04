import LandingNav from "../components/landing/LandingNav";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowAndBenefits from "../components/landing/HowAndBenefits";
import FaqCta from "../components/landing/FaqCta";
import LandingFooter from "../components/landing/LandingFooter";

export default function Landing() {
  return (
    <div className="bg-white">
      <LandingNav />
      <main>
        <Hero />
        <Features />
        <HowAndBenefits />
        <FaqCta />
      </main>
      <LandingFooter />
    </div>
  );
}