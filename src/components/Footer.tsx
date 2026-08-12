import { motion } from "motion/react";
import { Mail, Linkedin, Github } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t, ui } = useLanguage();
  return (
    <footer 
      id="contact"
      className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 pb-12"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-1 md:col-span-8 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl text-center md:text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:dark:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-slate-300 dark:hover:border-zinc-700/80"
      >
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight transition-colors duration-300">
            {t.name}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1 transition-colors duration-300">
            {t.title} - {t.subtitle}
          </p>
          <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium transition-colors duration-300">
            {t.contact.phone}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href={`mailto:${t.contact.email}`} className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 border border-slate-200 dark:border-zinc-700 hover:border-indigo-500 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white transition-all shadow-md dark:shadow-lg">
            <Mail className="w-5 h-5" />
          </a>
          <a href={t.contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 border border-slate-200 dark:border-zinc-700 hover:border-indigo-500 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white transition-all shadow-md dark:shadow-lg">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={t.contact.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 border border-slate-200 dark:border-zinc-700 hover:border-indigo-500 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white transition-all shadow-md dark:shadow-lg">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="col-span-1 md:col-span-4 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center font-bold text-white dark:text-black gap-2 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-slate-800 dark:hover:bg-slate-200 cursor-pointer group py-8 md:py-0"
      >
        <a href={`mailto:${t.contact.email}`} className="flex items-center gap-2 w-full h-full justify-center">
          <span className="text-xl">{ui.letsTalk}</span>
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
        </a>
      </motion.div>
    </footer>
  );
}
