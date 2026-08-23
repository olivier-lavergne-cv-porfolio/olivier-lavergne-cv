import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { staggerContainer, staggerItem } from "../lib/motionVariants";

export function Experience() {
  const { t, ui } = useLanguage();
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <motion.section
      id="experience"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="font-editorial bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      <motion.div variants={staggerItem} className="flex flex-col gap-3">
        <div className="text-caption uppercase text-[#666666]">{ui.experienceTitle}</div>
        <div className="text-heading max-w-[22ch]">{ui.experienceSubtitle}</div>
      </motion.div>

      <motion.div variants={staggerContainer} className="flex flex-col">
        {t.experience.map((exp, i) => {
          const open = openIndices.has(i);
          return (
            <motion.div
              key={i}
              variants={staggerItem}
              className={`border-[#aaaaaa] ${i === 0 ? "" : "border-t"}`}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={open}
                className={`w-full flex flex-col sm:flex-row gap-2 sm:gap-8 py-8 text-left cursor-pointer ${i === 0 ? "pt-0" : ""}`}
              >
                <div className="text-caption uppercase text-[#666666] sm:w-40 shrink-0">{exp.period}</div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-subheading">{exp.title}</div>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-[#666666] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                  </div>
                  <div className="text-body-sm text-[#666666]">
                    {exp.company} · {exp.location}
                  </div>
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open ? "auto" : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="text-body-sm text-[#666666] max-w-[60ch] text-pretty sm:pl-48 pb-8">
                  {exp.description}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
