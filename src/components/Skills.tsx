import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function Skills() {
  const { t, ui } = useLanguage();
  return (
    <motion.section 
      id="skills"
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-12 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:dark:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-slate-300 dark:hover:border-zinc-700/80"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8 transition-colors duration-300">
        <span className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
        {ui.skillsTitle}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.skills.map((skill, i) => (
          <div key={i} className="border border-slate-200 dark:border-zinc-800 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2 transition-colors duration-300">
              <skill.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> {skill.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, j) => (
                <span key={j} className="px-3 py-1.5 bg-slate-100 dark:bg-zinc-800 rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700/80 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-colors">
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
