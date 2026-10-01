'use client';
import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let ringX = 0, ringY = 0, targetX = 0, targetY = 0;
    const move = (e) => {
      targetX = e.clientX; targetY = e.clientY;
      if (dot.current) { dot.current.style.transform = `translate(${targetX - 5}px, ${targetY - 5}px)`; }
    };
    let raf;
    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(tick);
    const grow = () => ring.current?.style.setProperty('scale', '1.6');
    const shrink = () => ring.current?.style.setProperty('scale', '1');
    document.querySelectorAll('a, button').forEach((el) => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink); });
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return <><div ref={dot} className="cursor-dot hidden lg:block" /><div ref={ring} className="cursor-ring hidden lg:block" style={{ transition: 'scale .3s ease' }} /></>;
}
