import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { staggerContainer, staggerItem } from "../lib/motionVariants";

export function Experience() {
  const { t, ui } = useLanguage();

  return (
    <motion.section
      id="experience"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="font-editorial bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      <motion.div variants={staggerItem} className="text-caption uppercase text-[#666666]">
        {ui.experienceTitle}
      </motion.div>

      <motion.div variants={staggerContainer} className="flex flex-col">
        {t.experience.map((exp, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-2 sm:gap-8 py-8 border-t border-[#aaaaaa] first:border-t-0 first:pt-0"
          >
            <div className="text-caption uppercase text-[#666666] sm:w-40 shrink-0">{exp.period}</div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="text-subheading">{exp.title}</div>
              <div className="text-body-sm text-[#666666]">
                {exp.company} · {exp.location}
              </div>
              <p className="text-body-sm text-[#666666] max-w-[60ch] text-pretty">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
