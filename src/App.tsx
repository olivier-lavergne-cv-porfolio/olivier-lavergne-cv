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

export default function App() {
  return (
    <div className="min-h-dvh bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-slate-200 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200 overflow-x-hidden">
      <ScrollProgress />

      <Header />
      <Hero />
      <Showreel />
      <Portfolio />
      <Social />

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
          <About />
          <Skills />
          <Experience />
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
