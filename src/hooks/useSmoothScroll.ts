import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisInstance = lenis;
    return () => {
      lenisInstance = null;
      lenis.destroy();
    };
  }, []);
}

/** Scrolls the page by a delta, staying in sync with Lenis' own target position. */
export function scrollByY(delta: number) {
  if (lenisInstance) {
    lenisInstance.scrollTo(lenisInstance.targetScroll + delta, { duration: 0.8 });
  } else {
    window.scrollBy({ top: delta, behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
