import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Portfolio } from "./components/Portfolio";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { ScrollProgress } from "./components/ScrollProgress";
import { Download, Sun, Moon } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { lang, setLang, ui } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-dvh bg-slate-50 dark:bg-[#09090b] text-slate-800 dark:text-slate-200 p-4 md:p-6 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200 overflow-x-hidden">
      <ScrollProgress />
      <header className="flex justify-between items-center gap-2 sm:gap-4 mb-6 max-w-7xl mx-auto w-full shrink-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg"></div>
          <span className="font-bold tracking-tight text-xl text-slate-900 dark:text-white">OL.</span>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          <a href="#about" className="hover:text-slate-900 dark:hover:text-white">{ui.expertise}</a>
          <a href="#portfolio" className="hover:text-slate-900 dark:hover:text-white">{ui.portfolio}</a>
          <a href="#experience" className="hover:text-slate-900 dark:hover:text-white">{ui.experience}</a>
          <a href="#contact" className="hover:text-slate-900 dark:hover:text-white">{ui.contact}</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-zinc-800/50 border border-slate-300 dark:border-zinc-700/50 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-1 bg-slate-200 dark:bg-zinc-800/50 rounded-full p-1 border border-slate-300 dark:border-zinc-700/50">
            <button
              onClick={() => setLang('fr')}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold ${lang === 'fr' ? 'bg-indigo-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              FR
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              EN
            </button>
          </div>

          <a
            href={`${import.meta.env.BASE_URL}Olivier_Lavergne_CV.pdf`}
            download="Olivier_Lavergne_CV.pdf"
            aria-label={ui.download}
            className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white p-2 sm:px-4 sm:py-2 rounded-full border border-indigo-200 dark:border-indigo-500/30"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">{ui.download}</span>
          </a>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
          <Hero />
          <About />
          <Portfolio />
          <Skills />
          <Experience />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
