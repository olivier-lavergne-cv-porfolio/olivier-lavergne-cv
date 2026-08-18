import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Showreel } from "./components/Showreel";
import { Portfolio } from "./components/Portfolio";
import { Social } from "./components/Social";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { ScrollProgress } from "./components/ScrollProgress";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();

  return (
    <div className="min-h-dvh bg-[#fffef7] flex flex-col selection:bg-black/10 overflow-x-hidden">
      <ScrollProgress />

      <Header />
      <Hero />
      <Showreel />
      <Portfolio />
      <Social />
      <About />
      <Skills />
      <Experience />
      <Footer />

      <BackToTop />
    </div>
  );
}
