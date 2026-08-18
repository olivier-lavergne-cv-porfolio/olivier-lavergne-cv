import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { staggerContainer, staggerItem } from "../lib/motionVariants";

export function Skills() {
  const { t, ui } = useLanguage();

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="font-editorial font-light bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      <motion.div variants={staggerItem} className="text-xs font-normal uppercase text-[#666666]">
        {ui.skillsTitle}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid gap-12"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
      >
        {t.skills.map((skill: (typeof t.skills)[number] & { mobileOnly?: boolean; desktopOnly?: boolean }, i) => {
          const visibility = skill.mobileOnly ? "flex md:hidden" : skill.desktopOnly ? "hidden md:flex" : "flex";
          return (
            <motion.div key={i} variants={staggerItem} className={`${visibility} flex-col gap-4`}>
              <div className="flex items-center gap-2 text-xl font-light leading-snug">
                <skill.icon className="w-4 h-4 shrink-0" />
                {skill.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, j) => (
                  <span
                    key={j}
                    className="text-xs font-normal uppercase border border-[#aaaaaa] rounded-full px-3 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
