import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

// Nothing OS styled typed line - uses Doto font, accent color
export default function TypedLine({ strings }) {
  const ref = useRef(null);
  useEffect(() => {
    const t = new Typed(ref.current, {
      strings,
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 2000,
      loop: true,
      smartBackspace: true,
      cursorChar: '█',
      showCursor: true,
      autoInsertCss: false,
    });
    return () => t.destroy();
  }, [strings]);
  return (
    <span
      ref={ref}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        color: 'var(--accent)',
        position: 'relative',
      }}
    />
  );
}