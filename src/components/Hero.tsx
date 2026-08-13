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

  return (
    <section className="col-span-1 md:col-span-8 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-center gap-4 shadow-xl dark:shadow-2xl relative overflow-hidden">
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute top-0 right-0 p-8 text-6xl md:text-8xl font-black text-slate-900 dark:text-white pointer-events-none tracking-tighter"
      >
        EXPERT
      </motion.div>

      <motion.div style={{ y: contentY }} className="z-10 relative">
        <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase inline-block mb-4">
          {t.name}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
          <span className="text-indigo-600 dark:text-indigo-400">{t.title}</span><br/>
          {t.subtitle}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mt-4">
          {t.description}
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#contact" className="group flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 font-bold rounded-full hover:bg-slate-800 dark:hover:bg-zinc-200 w-max">
            {ui.startProject} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
