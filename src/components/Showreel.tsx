import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { mainVideo, thumbUrl } from "../media";

export function Showreel() {
  const { t, ui } = useLanguage();
  const BASE = import.meta.env.BASE_URL;
  const containerRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section className="font-editorial font-light bg-[#fffef7] pb-8">
      <a
        ref={containerRef}
        href={mainVideo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full aspect-video overflow-hidden bg-[#101731]"
        style={{ minHeight: "340px" }}
      >
        <motion.img
          src={thumbUrl(mainVideo, BASE)}
          alt=""
          loading="lazy"
          style={{ y }}
          className="absolute -top-[12%] left-0 w-full h-[124%] object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.68) 100%)" }}
        ></div>

        <div className="absolute left-5 sm:left-8 right-5 sm:right-8 bottom-5 sm:bottom-8 flex flex-col gap-2">
          <div className="text-xs font-normal uppercase text-[#fffef7] opacity-70">{ui.videosLabel}</div>
          <div className="text-2xl sm:text-3xl font-light leading-snug tracking-[-0.02em] text-[#fffef7] max-w-[24ch] text-pretty">
            {t.about.highlight}
          </div>
        </div>

        <div className="absolute right-5 sm:right-8 top-5 sm:top-8 text-xs font-normal uppercase text-[#fffef7] border border-[#fffef799] rounded-full px-6 py-3 group-hover:border-[#fffef7]">
          {ui.play}
        </div>
      </a>
    </section>
  );
}
