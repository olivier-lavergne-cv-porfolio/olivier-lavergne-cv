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
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-800 dark:text-slate-200 p-4 md:p-6 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200 overflow-x-hidden transition-colors duration-300">
      <ScrollProgress />
      <header className="flex justify-between items-center mb-6 max-w-7xl mx-auto w-full shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)]"></div>
          <span className="font-bold tracking-tight text-xl text-slate-900 dark:text-white transition-colors duration-300">OL.</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">{ui.expertise}</a>
          <a href="#portfolio" className="hover:text-slate-900 dark:hover:text-white transition-colors">{ui.portfolio}</a>
          <a href="#experience" className="hover:text-slate-900 dark:hover:text-white transition-colors">{ui.experience}</a>
          <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">{ui.contact}</a>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-zinc-800/50 border border-slate-300 dark:border-zinc-700/50 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <div className="flex items-center gap-1 bg-slate-200 dark:bg-zinc-800/50 rounded-full p-1 border border-slate-300 dark:border-zinc-700/50 transition-colors duration-300">
            <button 
              onClick={() => setLang('fr')}
              className={`px-3 py-1 rounded-full transition-all text-xs font-bold ${lang === 'fr' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              FR
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full transition-all text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              EN
            </button>
          </div>

          <a 
            href={`${import.meta.env.BASE_URL}Olivier_Lavergne_CV.pdf`}
            download="Olivier_Lavergne_CV.pdf"
            className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white px-4 py-2 rounded-full transition-all duration-300 border border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
          >
            <Download className="w-4 h-4" />
            <span>{ui.download}</span>
          </a>
        </nav>
      </header>
      
      <main className="flex-1 w-full max-w-7xl mx-auto pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Experience />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
