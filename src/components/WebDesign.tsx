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
      className="font-editorial bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      <motion.div variants={staggerItem} className="text-caption uppercase text-[#666666]">
        {ui.webDesignTitle}
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid gap-12 items-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}
      >
        <a
          href={webDesignItem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full overflow-hidden bg-[#101731]"
          style={{ aspectRatio: "594 / 1024", maxHeight: "640px" }}
        >
          <img
            src={thumbUrl(webDesignItem, BASE)}
            alt={t.webDesign.title}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </a>

        <div className="flex flex-col gap-4">
          <div className="text-heading-sm">{t.webDesign.title}</div>
          <p className="text-body text-[#666666] max-w-[50ch] text-pretty">{t.webDesign.description}</p>
          <a
            href={webDesignItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body border border-[#aaaaaa] hover:border-black rounded-full px-6 py-3 w-fit"
          >
            {ui.visitSite}
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
