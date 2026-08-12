import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function Experience() {
  const { t, ui } = useLanguage();
  return (
    <motion.section 
      id="experience"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-12 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:dark:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-slate-300 dark:hover:border-zinc-700/80"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8 transition-colors duration-300">
        <span className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
        {ui.experienceTitle}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {t.experience.map((exp, i) => (
          <div key={i} className="bg-slate-50 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/80 rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:dark:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xs mb-3 bg-indigo-50 dark:bg-indigo-500/10 inline-block px-3 py-1 rounded-full uppercase tracking-wider transition-colors duration-300">{exp.period}</div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1 transition-colors duration-300">{exp.title}</h4>
            <div className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-3 transition-colors duration-300">{exp.company} <span className="opacity-50 mx-1">•</span> {exp.location}</div>
            <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed transition-colors duration-300">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
