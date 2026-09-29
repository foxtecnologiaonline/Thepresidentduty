import { useEffect, useRef, useState } from "react";

const DURATION_MS = 450;

/** Anima um número inteiro até `target` sempre que ele mudar, em vez de saltar direto. */
export function useCountUp(target: number): number {
  const [displayed, setDisplayed] = useState(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const start = displayed;
    const delta = target - start;
    if (delta === 0) return;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / DURATION_MS);
      // ease-out
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplayed(Math.round(start + delta * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return displayed;
}
