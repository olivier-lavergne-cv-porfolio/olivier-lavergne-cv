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
      className="font-editorial font-light bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      <div className="text-xs font-normal uppercase text-[#666666]">{ui.experienceTitle}</div>

      <div className="flex flex-col">
        {t.experience.map((exp, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row gap-2 sm:gap-8 py-8 border-t border-[#aaaaaa] first:border-t-0 first:pt-0"
          >
            <div className="text-xs font-normal uppercase text-[#666666] sm:w-40 shrink-0">{exp.period}</div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="text-xl font-light leading-snug">{exp.title}</div>
              <div className="text-sm font-normal text-[#666666]">
                {exp.company} · {exp.location}
              </div>
              <p className="text-sm font-normal leading-relaxed text-[#666666] max-w-[60ch] text-pretty">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
