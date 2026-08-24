import { useState } from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { staggerContainer, staggerItem } from "../lib/motionVariants";

type Skill = { icon: React.ComponentType<{ className?: string }>; category: string; items: string[] };

/**
 * Une carte par domaine, repliée au départ : l'en-tête (icône + intitulé) est
 * le bouton, le rond +/− à droite n'est qu'une affordance. Le repli passe par
 * grid-template-rows 1fr → 0fr, ce qui anime une hauteur inconnue sans avoir à
 * la mesurer. À l'impression les panneaux sont rouverts (cf. index.css).
 */
function SkillCard({ skill, className }: { skill: Skill; className: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div variants={staggerItem} className={`${className} flex-col gap-4`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="skills-toggle group flex items-start justify-between gap-3 text-subheading text-left cursor-pointer"
      >
        <span className="flex items-baseline gap-2">
          <skill.icon className="w-4 h-4 shrink-0 translate-y-0.5" />
          {skill.category}
        </span>
        <span
          aria-hidden="true"
          className="skills-symbol shrink-0 w-8 h-8 rounded-full border border-[#aaaaaa] group-hover:border-black flex items-center justify-center transition-colors"
        >
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <div
        className={`skills-panel -mt-4 grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr] opacity-100 pt-4" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
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
        </div>
      </div>
    </motion.div>
  );
}

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
        <div className="text-caption uppercase text-fluo">{ui.skillsTitle}</div>
        <div className="text-heading max-w-[22ch]">{ui.skillsSubtitle}</div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
      >
        {t.skills.map((skill: (typeof t.skills)[number] & { mobileOnly?: boolean; desktopOnly?: boolean }, i) => {
          const visibility = skill.mobileOnly ? "flex md:hidden" : skill.desktopOnly ? "hidden md:flex" : "flex";
          return <SkillCard key={i} skill={skill} className={visibility} />;
        })}
      </motion.div>
    </motion.section>
  );
}
