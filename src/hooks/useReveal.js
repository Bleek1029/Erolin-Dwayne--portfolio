import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Elements marked [data-panel] rise into place once as they enter the viewport.
export default function useReveal() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-panel]", {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.09, clearProps: "transform,opacity" }),
      });
      gsap.set("[data-panel]", { opacity: 0 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}
