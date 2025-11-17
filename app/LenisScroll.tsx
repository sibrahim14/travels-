"use client"; // keep if you’re using Next.js App Router

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScroll(): null {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // optional cleanup
      // lenis.destroy();  // you can call this if needed
    };
  }, []);

  return null;
}
