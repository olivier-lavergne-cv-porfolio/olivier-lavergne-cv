import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function Portfolio() {
  const { t, ui } = useLanguage();
  const latestProject = t.portfolio[0];
  const otherProjects = t.portfolio.slice(1);

  return (
    <section 
      id="portfolio"
      className="col-span-1 md:col-span-8 grid grid-cols-1 md:grid-cols-8 gap-4"
    >
      {/* Highlighted Project - matches the indigo block in the design */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-1 md:col-span-5 bg-indigo-600 rounded-[2.5rem] p-8 flex flex-col justify-between text-white shadow-xl shadow-indigo-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:bg-indigo-500"
      >
        <div className="flex justify-between items-start mb-8">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase opacity-70 tracking-widest">{ui.featured}</span>
            <div className="text-2xl font-bold mt-1">{latestProject.title}</div>
          </div>
        </div>
        <div>
          <p className="text-lg leading-snug opacity-90 mb-6">
            {latestProject.description}
          </p>
          <div className="inline-flex items-center gap-2 font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors cursor-pointer w-max">
            {ui.viewProject} 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Other Projects */}
      <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
        {otherProjects.map((project, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + (i * 0.1) }}
            className="flex-1 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-6 flex flex-col justify-center shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:dark:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-slate-300 dark:hover:border-zinc-700/80 group cursor-pointer"
          >
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-300">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
