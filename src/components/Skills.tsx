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
      className="font-editorial bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      <motion.div variants={staggerItem} className="flex flex-col gap-3">
        <div className="text-caption uppercase text-[#666666]">{ui.skillsTitle}</div>
        <div className="text-heading max-w-[22ch]">{ui.skillsSubtitle}</div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
      >
        {t.skills.map((skill: (typeof t.skills)[number] & { mobileOnly?: boolean; desktopOnly?: boolean }, i) => {
          const visibility = skill.mobileOnly ? "flex md:hidden" : skill.desktopOnly ? "hidden md:flex" : "flex";
          return (
            <motion.div key={i} variants={staggerItem} className={`${visibility} flex-col gap-4`}>
              <div className="flex items-center gap-2 text-subheading">
                <skill.icon className="w-4 h-4 shrink-0" />
                {skill.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, j) => (
                  <span
                    key={j}
                    className="text-caption uppercase border border-[#aaaaaa] rounded-full px-3 py-1.5"
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
