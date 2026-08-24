import { useState } from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { staggerContainer, staggerItem } from "../lib/motionVariants";

export function Skills() {
  const { t, ui } = useLanguage();
  const [open, setOpen] = useState(true);

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="font-editorial bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      {/* Tout l'en-tête est le bouton : le rond +/− n'est qu'une affordance visuelle */}
      <motion.button
        variants={staggerItem}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="skills-panel"
        aria-label={open ? ui.hideSkills : ui.showSkills}
        className="group flex items-end justify-between gap-6 text-left cursor-pointer"
      >
        <span className="flex flex-col gap-3">
          <span className="text-caption uppercase text-fluo">{ui.skillsTitle}</span>
          <span className="text-heading max-w-[22ch] block">{ui.skillsSubtitle}</span>
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 w-12 h-12 rounded-full border border-[#aaaaaa] group-hover:border-black flex items-center justify-center transition-colors"
        >
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </motion.button>

      {/* grid-template-rows 1fr → 0fr : replie une hauteur inconnue sans la mesurer,
          et laisse la propagation des variants d'entrée intacte */}
      <div
        id="skills-panel"
        className={`-mt-12 grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr] opacity-100 pt-12" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
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
        </div>
      </div>
    </motion.section>
  );
}
