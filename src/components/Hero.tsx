import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * Hero « Monté au banc · signal vivant » (piste 4A du canvas Claude Design
 * « Motion design héro title »).
 *
 * L'entrée est faite de trois coupes franches — pas de fondu : chaque étape est
 * tenue puis coupée net (steps(1, end)), comme un montage au banc. Le titre est
 * dédoublé par une aberration chromatique rose fluo / rose clair qui se résorbe,
 * pendant que des blocs de glitch pixelisés et des tranches du bloc entier
 * décrochent brièvement. Le filet, le sur-titre et la description suivent en
 * décalé. Une fois l'entrée finie, le hero reste « vivant » : les glyphes
 * réagissent à la proximité du curseur, les deux lignes se décalent en sens
 * opposés, et un clic redéclenche une coupe.
 *
 * L'animation est pilotée en impératif via les Web Animations API, comme le
 * prototype : motion/react ne sert pas ici.
 */

const PINK_A = "255,32,154"; // #FF209A rose fluo
const PINK_B = "255,166,210"; // #FFA6D2 rose clair
const GRID = 26; // pas de la grille du glitch pixelisé
const CUR = 13; // côté du curseur pixel
const INK = "#000000";
const BG = "#fffef7";
const STEP = "steps(1, end)";

/** Aberration chromatique : décalage `v` en em, opacité `a`. */
const sh = (v: number, a: number) =>
  `${v.toFixed(3)}em 0 0 rgba(${PINK_A},${a}), ${(-v).toFixed(3)}em 0 0 rgba(${PINK_B},${a})`;

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => (w === "ia" || w === "ai" ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function withNoBreak(str: string) {
  return str.replace(/ /g, " ");
}

type FrameProps = { lines: [string, string]; caption: string; description: string };

/**
 * Remonté à chaque changement de langue (`key` côté parent) : l'animation
 * réécrit le DOM du titre glyphe par glyphe, un remontage est le moyen le plus
 * sûr de repartir d'un balisage propre.
 */
function HeroFrame({ lines: titleLines, caption, description }: FrameProps) {
  const frame = useRef<HTMLElement>(null);

  useEffect(() => {
    const f = frame.current;
    if (!f) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const block = f.querySelector<HTMLElement>("[data-block]");
    const cursor = f.querySelector<HTMLElement>("[data-cursor]");
    const flash = f.querySelector<HTMLElement>("[data-flash]");
    const lines = Array.from(f.querySelectorAll<HTMLElement>("[data-line]"));
    if (!block || !cursor || !flash || !lines.length) return;

    const timers: number[] = [];
    const cleanups: (() => void)[] = [];

    // Le viseur n'apparaît qu'une fois l'animation acquise : sous
    // prefers-reduced-motion le hero est inerte, il ne doit rien promettre.
    f.style.cursor = "crosshair";
    cleanups.push(() => {
      f.style.cursor = "";
    });

    /* ---- découpage en glyphes (mots insécables, métriques inchangées) ---- */
    lines.forEach((line) => {
      const words = (line.textContent || "").trim().split(/\s+/);
      line.dataset.txt = words.join(" ");
      line.textContent = "";
      words.forEach((w, wi) => {
        const ws = document.createElement("span");
        ws.style.display = "inline-block";
        ws.style.whiteSpace = "nowrap";
        for (const ch of w) {
          const g = document.createElement("span");
          g.dataset.g = "";
          g.style.display = "inline-block";
          g.style.willChange = "transform, opacity";
          g.textContent = ch;
          ws.appendChild(g);
        }
        line.appendChild(ws);
        if (wi < words.length - 1) line.appendChild(document.createTextNode(" "));
      });
    });
    const glyphs = Array.from(f.querySelectorAll<HTMLElement>("[data-g]"));

    /* ---- glitch pixelisé : blocs sur le titre ---- */
    const pixelBurst = (dur: number, count: number) => {
      f.querySelectorAll("[data-pix]").forEach((el) => el.remove());
      lines.forEach((l) => {
        const r = l.getBoundingClientRect();
        if (!r.width) return;
        const base = l.dataset.txt || "";
        const holder = document.createElement("div");
        holder.dataset.pix = "";
        holder.setAttribute("aria-hidden", "true");
        holder.style.cssText =
          "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none";
        const ls = getComputedStyle(l).letterSpacing;
        const n = Math.max(2, Math.round(count * (r.width > 900 ? 1 : 0.6)));
        for (let i = 0; i < n; i++) {
          const bw = GRID * (1 + ((Math.random() * 4) | 0));
          const bh = GRID * (1 + ((Math.random() * 2) | 0));
          const bx = Math.floor((Math.random() * (r.width - bw)) / GRID) * GRID;
          const by = Math.floor((Math.random() * (r.height - bh)) / GRID) * GRID;
          const dx = (((Math.random() * 5) | 0) - 2) * GRID;
          const kind = Math.random();
          const b = document.createElement("div");
          if (kind < 0.62) {
            b.textContent = base;
            b.style.cssText =
              `position:absolute;top:0;left:0;white-space:nowrap;color:${INK};letter-spacing:${ls};` +
              `clip-path:inset(${by}px ${Math.max(0, r.width - bx - bw)}px ${Math.max(0, r.height - by - bh)}px ${bx}px);` +
              `transform:translateX(${dx}px)`;
          } else {
            b.style.cssText =
              `position:absolute;left:${bx}px;top:${by}px;width:${bw}px;height:${bh}px;` +
              `background:${kind < 0.85 ? BG : `rgb(${PINK_A})`}`;
          }
          holder.appendChild(b);
        }
        l.appendChild(holder);
        timers.push(window.setTimeout(() => holder.remove(), Math.max(30, dur)));
      });
    };

    /* ---- glitch pixelisé : tranches de tout le bloc ---- */
    const blockBurst = (dur: number, count: number) => {
      f.querySelectorAll("[data-slab]").forEach((el) => el.remove());
      const fr = f.getBoundingClientRect();
      const holder = document.createElement("div");
      holder.dataset.slab = "";
      holder.setAttribute("aria-hidden", "true");
      holder.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden";
      for (let i = 0; i < count; i++) {
        const h = GRID * (1 + ((Math.random() * 3) | 0));
        const y = Math.floor((Math.random() * (fr.height - h)) / GRID) * GRID;
        const dx = (((Math.random() * 7) | 0) - 3) * GRID;
        const s = document.createElement("div");
        s.style.cssText =
          `position:absolute;left:0;top:0;width:100%;height:${fr.height}px;overflow:hidden;background:${BG};` +
          `clip-path:inset(${y}px 0 ${Math.max(0, fr.height - y - h)}px 0);transform:translateX(${dx}px)`;
        const c = block.cloneNode(true) as HTMLElement;
        c.querySelectorAll("[data-pix]").forEach((el) => el.remove());
        c.style.transform = "none";
        s.appendChild(c);
        holder.appendChild(s);
        if (Math.random() < 0.4) {
          const t = document.createElement("div");
          t.style.cssText =
            `position:absolute;${dx > 0 ? "left:0" : "right:0"};top:${y}px;` +
            `width:${Math.abs(dx || GRID)}px;height:${h}px;background:rgb(${PINK_A})`;
          holder.appendChild(t);
        }
      }
      f.appendChild(holder);
      timers.push(window.setTimeout(() => holder.remove(), Math.max(30, dur)));
    };

    /* ---- mode vivant : curseur & clic ---- */
    const goLive = () => {
      let gx: number[] = [];
      let lx: [number, number][] = [];
      let fr = f.getBoundingClientRect();
      const measure = () => {
        fr = f.getBoundingClientRect();
        gx = glyphs.map((g) => {
          const r = g.getBoundingClientRect();
          return r.left + r.width / 2;
        });
        lx = lines.map((l) => {
          const r = l.getBoundingClientRect();
          return [r.left + r.width / 2, r.width];
        });
      };
      measure();
      f.style.cursor = "none";
      glyphs.forEach((g) => {
        g.style.transition = "text-shadow 140ms linear, transform 140ms linear";
      });
      lines.forEach((l) => {
        l.style.transition = "transform 200ms cubic-bezier(.16,1,.3,1)";
      });

      let raf = 0;
      let pend = 0;
      let mx: number | null = null;
      let my = 0;
      const write = () => {
        raf = 0;
        glyphs.forEach((g, i) => {
          const near = mx == null ? 0 : Math.max(0, 1 - Math.abs(mx - gx[i]) / 420);
          const s = 0.052 * near * near;
          g.style.textShadow = near < 0.04 ? `0 0 0 rgba(${PINK_A},0)` : sh(s, 0.8 * near);
          g.style.transform = `translateX(${(near * near * 2.6).toFixed(2)}px)`;
        });
        lines.forEach((l, li) => {
          const dx = mx == null ? 0 : (mx - lx[li][0]) / lx[li][1];
          l.style.transform = `translateX(${(dx * 9 * (li ? -1 : 1)).toFixed(2)}px)`;
        });
        if (mx == null) cursor.style.opacity = "0";
        else {
          cursor.style.opacity = "1";
          cursor.style.transform =
            `translate(${Math.round((mx - fr.left) / CUR) * CUR}px,${Math.round((my - fr.top) / CUR) * CUR}px)`;
        }
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(write);
      };
      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        kick();
      };
      const onLeave = () => {
        mx = null;
        kick();
      };
      const onScroll = () => {
        if (!pend)
          pend = requestAnimationFrame(() => {
            pend = 0;
            measure();
          });
      };
      const onDown = () => {
        lines.forEach((l, li) => {
          const d = li ? -1 : 1;
          const held = l.style.transform || "translateX(0)";
          l.animate(
            [
              { transform: held, offset: 0, easing: STEP },
              { transform: `translateX(${30 * d}px)`, offset: 0.12, easing: STEP },
              { transform: `translateX(${-13 * d}px)`, offset: 0.34, easing: STEP },
              { transform: `translateX(${6 * d}px)`, offset: 0.6, easing: "linear" },
              { transform: held, offset: 1 },
            ],
            { duration: 420, easing: "linear" },
          );
        });
        flash.animate([{ opacity: 0.22 }, { opacity: 0 }], { duration: 130, easing: STEP });
        pixelBurst(95, 9);
      };
      f.addEventListener("mousemove", onMove, { passive: true });
      f.addEventListener("mouseleave", onLeave, { passive: true });
      f.addEventListener("mousedown", onDown);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        f.removeEventListener("mousemove", onMove);
        f.removeEventListener("mouseleave", onLeave);
        f.removeEventListener("mousedown", onDown);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });

      // Décrochage rare : tranches -> blocs -> tranches. Le hero étant en haut
      // d'une page longue, on ne le joue que lorsqu'il est réellement à l'écran
      // et l'onglet actif : chaque passe clone tout le bloc, autant ne pas le
      // faire pour personne.
      let onScreen = true;
      const vio = new IntersectionObserver((es) => es.forEach((e) => (onScreen = e.isIntersecting)), {
        threshold: 0,
      });
      vio.observe(f);
      const drop = window.setInterval(() => {
        if (!onScreen || document.hidden) return;
        blockBurst(105, 4);
        timers.push(window.setTimeout(() => pixelBurst(85, 8), 105));
        timers.push(window.setTimeout(() => blockBurst(65, 2), 210));
      }, 12000);
      cleanups.push(() => {
        vio.disconnect();
        clearInterval(drop);
      });
    };

    /* ---- entrée : trois coupes franches ---- */
    const play = () => {
      const waits: Promise<unknown>[] = [];
      glyphs.forEach((g, i) => {
        const j = ((i % 4) - 1.5) * 2.2;
        waits.push(
          g
            .animate(
              [
                { opacity: 0, transform: "translateX(0)", textShadow: sh(0, 0), offset: 0, easing: STEP },
                {
                  opacity: 1,
                  transform: `translateX(${(j * 2).toFixed(1)}px)`,
                  textShadow: sh(0.085, 0.95),
                  offset: 0.001,
                  easing: STEP,
                },
                {
                  opacity: 1,
                  transform: `translateX(${(-j).toFixed(1)}px)`,
                  textShadow: sh(0.032, 0.85),
                  offset: 0.35,
                  easing: STEP,
                },
                {
                  opacity: 1,
                  transform: `translateX(${(j * 0.4).toFixed(1)}px)`,
                  textShadow: sh(0.008, 0.6),
                  offset: 0.7,
                  easing: "linear",
                },
                { opacity: 1, transform: "translateX(0)", textShadow: sh(0, 0), offset: 1 },
              ],
              { duration: 1200, delay: 120, easing: "linear", fill: "both" },
            )
            .finished.catch(() => {}),
        );
      });
      lines.forEach((l, li) => {
        const d = li ? -1 : 1;
        const a = l.animate(
          [
            { transform: "translate(0,0)", offset: 0, easing: STEP },
            { transform: `translate(${26 * d}px, ${-4 * d}px)`, offset: 0.001, easing: STEP },
            { transform: `translate(${-11 * d}px, ${2 * d}px)`, offset: 0.35, easing: STEP },
            { transform: `translate(${4 * d}px, 0)`, offset: 0.7, easing: "linear" },
            { transform: "translate(0,0)", offset: 1 },
          ],
          { duration: 1200, delay: 120, easing: "linear", fill: "both" },
        );
        a.finished
          .then(() => {
            l.style.transform = "none";
          })
          .catch(() => {});
        waits.push(a.finished.catch(() => {}));
      });
      flash.animate(
        [
          { opacity: 0, offset: 0, easing: STEP },
          { opacity: 0.92, offset: 0.02, easing: STEP },
          { opacity: 0, offset: 0.075, easing: STEP },
          { opacity: 0, offset: 0.34, easing: STEP },
          { opacity: 0.3, offset: 0.36, easing: STEP },
          { opacity: 0, offset: 0.395, easing: "linear" },
          { opacity: 0, offset: 1 },
        ],
        { duration: 1250, delay: 100, easing: "linear", fill: "both" },
      );
      f.querySelector("[data-rule]")?.animate(
        [
          { transform: "scaleX(0)", offset: 0, easing: STEP },
          { transform: "scaleX(0.34)", offset: 0.34, easing: STEP },
          { transform: "scaleX(1)", offset: 0.68 },
        ],
        { duration: 620, delay: 1320, easing: "linear", fill: "both" },
      );
      f.querySelector("[data-caption]")?.animate(
        [
          { opacity: 0, transform: "translateX(0)", offset: 0, easing: STEP },
          { opacity: 1, transform: "translateX(14px)", offset: 0.34, easing: STEP },
          { opacity: 1, transform: "translateX(0)", offset: 0.68, easing: STEP },
          { opacity: 1, transform: "translateX(0)", offset: 1 },
        ],
        { duration: 520, delay: 1400, easing: "linear", fill: "both" },
      );
      f.querySelector("[data-desc]")?.animate(
        [
          { opacity: 0, transform: "translateX(0)", offset: 0, easing: STEP },
          { opacity: 1, transform: "translateX(-9px)", offset: 0.3, easing: STEP },
          { opacity: 1, transform: "translateX(0)", offset: 0.62, easing: STEP },
          { opacity: 1, transform: "translateX(0)", offset: 1 },
        ],
        { duration: 560, delay: 1540, easing: "linear", fill: "both" },
      );
      ([[120, 110, 13], [540, 85, 9], [960, 65, 5]] as const).forEach(([t, d, c]) =>
        timers.push(window.setTimeout(() => pixelBurst(d, c), t)),
      );
      ([[150, 90, 3], [575, 70, 2]] as const).forEach(([t, d, c]) =>
        timers.push(window.setTimeout(() => blockBurst(d, c), t)),
      );
      Promise.all(waits).then(() => {
        glyphs.forEach((g) => {
          g.getAnimations().forEach((a) => a.cancel());
          g.style.opacity = "";
        });
        goLive();
      });
    };

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            io.disconnect();
            play();
          }
        }),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(f);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      cleanups.forEach((fn) => fn());
      f.querySelectorAll("[data-pix], [data-slab]").forEach((el) => el.remove());
    };
    // Le composant est remonté par sa `key` quand la langue change : les textes
    // ne peuvent pas bouger sous cet effet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={frame}
      className="font-editorial relative overflow-hidden bg-[#fffef7] text-black"
    >
      <div
        data-block
        className="flex flex-col gap-6 px-5 sm:px-8 pt-16 sm:pt-24 md:pt-28 pb-16"
      >
        <div data-titlewrap className="relative">
          <h1 className="text-display m-0">
            {titleLines.map((line, i) => (
              <span
                key={i}
                data-line
                className="block overflow-hidden pb-[0.12em] -mb-[0.12em]"
                style={{ whiteSpace: i ? "nowrap" : undefined }}
              >
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <div data-rule className="h-px bg-[#aaaaaa]" style={{ transformOrigin: "left center" }} />
          <div className="overflow-hidden">
            <div data-caption className="text-caption uppercase text-[#666666]">
              {caption}
            </div>
          </div>
        </div>

        <p data-desc className="text-subheading max-w-[34ch] text-pretty mt-6 m-0">
          {description}
        </p>
      </div>

      <div
        data-flash
        className="absolute inset-0 pointer-events-none bg-black opacity-0"
        aria-hidden="true"
      />
      <div
        data-cursor
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none opacity-0"
        style={{ width: CUR, height: CUR, background: `rgb(${PINK_A})`, willChange: "transform" }}
      />
    </section>
  );
}

export function Hero() {
  const { t, lang } = useLanguage();
  const [titleLine1, titleLine2] = t.title.split(" / ");

  return (
    <HeroFrame
      key={lang}
      lines={[toTitleCase(titleLine1), withNoBreak(toTitleCase(titleLine2))]}
      caption={t.subtitle}
      description={t.description}
    />
  );
}
