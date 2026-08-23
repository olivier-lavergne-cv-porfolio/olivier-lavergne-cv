import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { staggerContainer, staggerItem } from "../lib/motionVariants";
import { webDesignItem, thumbUrl } from "../media";

export function WebDesign() {
  const { t, ui } = useLanguage();
  const BASE = import.meta.env.BASE_URL;

  return (
    <motion.section
      id="webdesign"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="font-editorial bg-[#fffef7] text-black py-16"
    >
      <motion.div variants={staggerItem} className="px-5 sm:px-8 flex flex-col gap-3 mb-8">
        <div className="text-caption uppercase text-[#666666]">{ui.webDesignTitle}</div>
        <div className="text-heading max-w-[22ch]">{t.webDesign.title}</div>
      </motion.div>

      <motion.a
        variants={staggerItem}
        href={webDesignItem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full aspect-video overflow-hidden bg-[#101731]"
        style={{ minHeight: "340px" }}
      >
        <img
          src={thumbUrl(webDesignItem, BASE)}
          alt={t.webDesign.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute right-5 sm:right-8 top-5 sm:top-8 text-caption uppercase text-black bg-[#fffef7] border border-black rounded-full px-6 py-3">
          {ui.visitSite}
        </div>
      </motion.a>

      <motion.div variants={staggerItem} className="px-5 sm:px-8 mt-8 max-w-[65ch]">
        <p className="text-body text-[#666666] text-pretty">{t.webDesign.description}</p>
      </motion.div>
    </motion.section>
  );
}
