import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => (w === "ia" || w === "ai" ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function withNoBreak(str: string) {
  return str.replace(/ /g, " ");
}

/**
 * Kinetic type entrance for the hero title only: every glyph rises out of its own
 * line mask, resolving from a blur and a slight overshoot, cascading left to right
 * across both lines. Timing follows the site easing curve [0.16, 1, 0.3, 1].
 */
const CHAR_STAGGER = 0.032;
const BASE_DELAY = 0.15;

function TitleLine({ text, startIndex, reduced }: { text: string; startIndex: number; reduced: boolean }) {
  const words = text.split(" ");
  let cursor = startIndex;

  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      {words.map((word, wi) => {
        const chars = [...word];
        const node = (
          <span key={wi} className="inline-block whitespace-nowrap">
            {chars.map((char, ci) => {
              const i = cursor + ci;
              return (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={
                    reduced
                      ? { opacity: 0 }
                      : { y: "118%", opacity: 0, filter: "blur(10px)", scaleY: 1.18 }
                  }
                  animate={
                    reduced
                      ? { opacity: 1 }
                      : { y: "0%", opacity: 1, filter: "blur(0px)", scaleY: 1 }
                  }
                  transition={
                    reduced
                      ? { duration: 0.3 }
                      : {
                          duration: 1.1,
                          delay: BASE_DELAY + i * CHAR_STAGGER,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
        cursor += chars.length + 1;
        return wi < words.length - 1 ? (
          <Fragment key={wi}>
            {node}{" "}
          </Fragment>
        ) : (
          node
        );
      })}
    </span>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const reduced = useReducedMotion() ?? false;
  const [titleLine1, titleLine2] = t.title.split(" / ");
  const line1 = toTitleCase(titleLine1);
  const line2 = withNoBreak(toTitleCase(titleLine2));

  return (
    <section className="font-editorial bg-[#fffef7] text-black px-5 sm:px-8 pt-16 sm:pt-24 md:pt-28 pb-16 flex flex-col gap-6">
      <h1 className="text-display m-0">
        <TitleLine text={line1} startIndex={0} reduced={reduced} />
        <TitleLine text={line2} startIndex={line1.length + 1} reduced={reduced} />
      </h1>
      <div className="flex flex-col gap-2">
        <div className="h-px bg-[#aaaaaa]"></div>
        <div className="text-caption uppercase text-[#666666]">{t.subtitle}</div>
      </div>
      <div className="text-subheading max-w-[34ch] text-pretty mt-6">
        {t.description}
      </div>
    </section>
  );
}
