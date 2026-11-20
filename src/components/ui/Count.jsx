import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

export default function Count({
  to,
  from = 0,
  duration = 1.5,
  delay = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  style = {},
  triggerOnce = true,
}) {
  const [count, setCount] = useState(from);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: '0px 0px -100px' });

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = from + (to - from) * eased;
      setCount(Number(current.toFixed(decimals)));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(to);
        setHasAnimated(true);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [isInView, hasAnimated, to, from, duration, delay, decimals]);

  const formatted = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className} style={style} aria-live="polite">
      {prefix}{formatted}{suffix}
    </span>
  );
}