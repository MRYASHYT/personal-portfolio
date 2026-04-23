import { useEffect, useRef, useState } from "react";

export function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.01 }
    );

    // Safety fallback: force visibility after 1.5 seconds if observer fails
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return { ref, isVisible };
}
