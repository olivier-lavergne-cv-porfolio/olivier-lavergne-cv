import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function Skills() {
  const { t, ui } = useLanguage();
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-12 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8">
        <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
        {ui.skillsTitle}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.skills.map((skill, i) => (
          <div key={i} className="border border-slate-200 dark:border-zinc-800 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <skill.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> {skill.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, j) => (
                <span key={j} className="px-3 py-1.5 bg-slate-100 dark:bg-zinc-800 rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700/80">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
