import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function About() {
  const { t, lang } = useLanguage();
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-2 overflow-hidden relative flex flex-col min-h-[300px]"
    >
      <div className="flex-1 w-full rounded-[2rem] bg-slate-50 dark:bg-zinc-800 flex flex-col items-center justify-center border border-slate-200 dark:border-zinc-700 p-8 text-center relative z-10">
        <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4 border-4 border-white dark:border-zinc-900 shadow-xl flex items-center justify-center text-4xl">
          🎥
        </div>
        <div className="font-bold text-slate-900 dark:text-white text-xl mb-1">{t.contact.location}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">{t.stats[0].value} {lang === 'en' ? 'of experience' : "d'expérience"}</div>

        <div className="grid grid-cols-2 gap-4 w-full mt-auto">
          {t.stats.slice(1, 3).map((stat, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900/50 rounded-2xl p-4 border border-slate-200 dark:border-zinc-700/50 shadow-sm dark:shadow-none">
              <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
