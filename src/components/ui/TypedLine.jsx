import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function TypedLine({
  strings = [],
  typeSpeed = 50,
  deleteSpeed = 30,
  pauseTime = 2000,
  loop = true,
  className = '',
  style = {},
}) {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const blinkInterval = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const currentString = strings[stringIndex];
    const isLastString = stringIndex === strings.length - 1;

    if (!isDeleting) {
      if (text.length < currentString.length) {
        timeoutRef.current = setTimeout(() => {
          setText(currentString.slice(0, text.length + 1));
        }, typeSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setText(currentString.slice(0, text.length - 1));
        }, deleteSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
        }, 0);
        if (loop || !isLastString) {
          timeoutRef.current = setTimeout(() => {
            setStringIndex(prev => (prev + 1) % strings.length);
          }, typeSpeed);
        }
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, stringIndex, isDeleting, strings, typeSpeed, deleteSpeed, pauseTime, loop]);

  return (
    <span className={className} style={style}>
      <motion.span
        style={{ display: 'inline-block', minWidth: '1ch' }}
        animate={{ opacity: cursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        {text}
      </motion.span>
      <span aria-hidden="true" style={{ marginLeft: '2px' }}>_</span>
    </span>
  );
}