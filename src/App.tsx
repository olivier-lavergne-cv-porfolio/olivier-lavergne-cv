import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Showreel } from "./components/Showreel";
import { WebDesign } from "./components/WebDesign";
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
    // overflow-x-clip (not -hidden) so the pinned Social section's position:sticky keeps working
    <div className="min-h-dvh bg-[#fffef7] flex flex-col selection:bg-black/10 overflow-x-clip">
      <ScrollProgress />

      <Header />
      <Hero />
      <Showreel />
      <WebDesign />
      <Social />
      <About />
      <Skills />
      <Experience />
      <Footer />

      <BackToTop />
    </div>
  );
}
