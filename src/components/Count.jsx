import { useEffect, useRef } from "react";
import { CountUp } from "countup.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Count({ to, suffix = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = new CountUp(ref.current, to, { duration: 2.2, suffix });
    const st = ScrollTrigger.create({ trigger: ref.current, start: "top 92%", once: true, onEnter: () => c.start() });
    return () => st.kill();
  }, [to, suffix]);
  return <span ref={ref}>0</span>;
}
