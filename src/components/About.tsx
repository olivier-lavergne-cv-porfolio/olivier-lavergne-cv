import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function About() {
  const { t, ui } = useLanguage();

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="font-editorial font-light bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      <div className="flex flex-col gap-6 max-w-3xl">
        <div className="text-xs font-normal uppercase text-[#666666]">{ui.expertise}</div>
        <div className="text-2xl sm:text-3xl font-light leading-snug tracking-[-0.02em] text-pretty">
          {t.about.paragraphs[0]}
        </div>
        <div className="flex flex-col gap-4 text-base font-light leading-relaxed text-[#666666] max-w-[65ch] text-pretty">
          <p>{t.about.paragraphs[1]}</p>
          <p>{t.about.paragraphs[2]}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-8 sm:gap-16">
        {t.stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="text-[clamp(2rem,5vw,3.375rem)] font-light leading-none tracking-[-0.02em]">
              {stat.value}
            </div>
            <div className="text-xs font-normal uppercase text-[#666666] max-w-[16ch]">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
