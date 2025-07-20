import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({ value, duration = 420, format, className = "" }) {
  const [display, setDisplay] = useState(value);
  const raf = useRef();
  const startValue = useRef(value);

  useEffect(() => {
  
    if (display === value) return;

    const start = display;      
    const end = value;
    startValue.current = start;

    const startTime = performance.now();

    function step(now) {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const val = Math.round(start + (end - start) * elapsed);
      setDisplay(val);
      if (elapsed < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        setDisplay(end);
      }
    }
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(step);

  
    return () => cancelAnimationFrame(raf.current);
    
  }, [value]); 

  return (
    <span className={className}>
      {typeof format === "function"
        ? format(display)
        : display.toLocaleString("ru-RU")}
    </span>
  );
}
