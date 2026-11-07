import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypedLine({ strings }) {
  const ref = useRef(null);
  useEffect(() => {
    const t = new Typed(ref.current, { strings, typeSpeed: 55, backSpeed: 28, backDelay: 1500, loop: true, smartBackspace: true });
    return () => t.destroy();
  }, [strings]);
  return <span ref={ref} />;
}
