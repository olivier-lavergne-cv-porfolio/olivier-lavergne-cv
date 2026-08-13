import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { t, ui } = useLanguage();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 600], reduce ? [0, 0] : [0, -180]);
  const bgOpacity = useTransform(scrollY, [0, 400], reduce ? [0.03, 0.03] : [0.03, 0]);
  const contentY = useTransform(scrollY, [0, 500], reduce ? [0, 0] : [0, 60]);
  const contentOpacity = useTransform(scrollY, [0, 500], reduce ? [1, 1] : [1, 0.4]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-8 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-center gap-4 shadow-xl dark:shadow-2xl relative overflow-hidden transition duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-slate-300 dark:hover:border-zinc-700/80"
    >
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute top-0 right-0 p-8 text-6xl md:text-8xl font-black text-slate-900 dark:text-white pointer-events-none tracking-tighter"
      >
        EXPERT
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="z-10 relative"
      >
        <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase inline-block mb-4">
          {t.name}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight transition-colors duration-300">
          <span className="text-indigo-600 dark:text-indigo-400 transition-colors duration-300">{t.title}</span><br/>
          {t.subtitle}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mt-4 transition-colors duration-300">
          {t.description}
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#contact" className="group flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 font-bold rounded-full hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors w-max">
            {ui.startProject} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
