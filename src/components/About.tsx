import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { staggerContainer, staggerItem } from "../lib/motionVariants";

function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(match ? "0" : value);

  useEffect(() => {
    if (!match || !inView) return;
    const target = parseInt(match[1], 10);
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView]);

  return <span ref={ref}>{match ? display + match[2] : value}</span>;
}

export function About() {
  const { t, ui } = useLanguage();

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="font-editorial font-light bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      <motion.div variants={staggerItem} className="flex flex-col gap-6 max-w-3xl">
        <div className="text-xs font-normal uppercase text-[#666666]">{ui.expertise}</div>
        <div className="text-2xl sm:text-3xl font-light leading-snug tracking-[-0.02em] text-pretty">
          {t.about.paragraphs[0]}
        </div>
        <div className="flex flex-col gap-4 text-base font-light leading-relaxed text-[#666666] max-w-[65ch] text-pretty">
          <p>{t.about.paragraphs[1]}</p>
          <p>{t.about.paragraphs[2]}</p>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:flex sm:flex-wrap gap-8 sm:gap-16">
        {t.stats.map((stat, i) => (
          <motion.div key={i} variants={staggerItem} className="flex flex-col gap-1">
            <div className="text-[clamp(2rem,5vw,3.375rem)] font-light leading-none tracking-[-0.02em]">
              <StatValue value={stat.value} />
            </div>
            <div className="text-xs font-normal uppercase text-[#666666] max-w-[16ch]">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
