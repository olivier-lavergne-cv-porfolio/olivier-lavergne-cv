import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function Experience() {
  const { t, ui } = useLanguage();
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-12 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8">
        <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
        {ui.experienceTitle}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {t.experience.map((exp, i) => (
          <div key={i} className="bg-slate-50 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/80 rounded-[2rem] p-6">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xs mb-3 bg-indigo-50 dark:bg-indigo-500/10 inline-block px-3 py-1 rounded-full uppercase tracking-wider">{exp.period}</div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">{exp.title}</h4>
            <div className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-3">{exp.company} <span className="opacity-50 mx-1">•</span> {exp.location}</div>
            <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
