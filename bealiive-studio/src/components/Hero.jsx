import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Sticker definitions — curated selection from portfolio
// Back layer: behind the text (z-index 2)
const backStickers = [
  {
    src: '/Beauty - Aurelle/hf_20260731_130948_7ffd91ed-6c39-4102-9446-b90daf52632a.png',
    x: 8, y: 20, w: 14, r: '-6deg', speed: 0.18,
  },
  {
    src: '/Protein/Maxx Protein Product Shot.png',
    x: 85, y: 25, w: 12, r: '4deg', speed: 0.25,
  },
  {
    src: "/UK's fizzi/ChatGPT Image Aug 1, 2026, 02_38_34 PM.png",
    x: 25, y: 75, w: 10, r: '-3deg', speed: 0.12,
  },
  {
    src: '/Bonkers/ChatGPT Image Aug 2, 2026, 01_35_35 PM.png',
    x: 70, y: 78, w: 11, r: '2deg', speed: 0.3,
  },
];

// Front layer: on top of the text (z-index 8)
const frontStickers = [
  {
    src: '/Beauty - Aurelle/hf_20260731_131423_ee3c5ecc-d21a-4e96-a983-92a615c06378.png',
    x: 18, y: 45, w: 15, r: '3deg', speed: 0.2,
  },
  {
    src: '/Bonkers/ChatGPT Image Aug 2, 2026, 01_29_33 PM.png',
    x: 78, y: 50, w: 13, r: '-4deg', speed: 0.14,
  },
  {
    src: '/Beauty - hair serum/ChatGPT Image Aug 1, 2026, 12_31_28 PM.png',
    x: 50, y: 15, w: 11, r: '5deg', speed: 0.22,
  },
  {
    src: '/Protein/ChatGPT Image Aug 1, 2026, 10_47_56 AM.png',
    x: 55, y: 82, w: 10, r: '-2deg', speed: 0.16,
  },
];

function Sticker({ src, x, y, w, r, speed, mousePos }) {
  const offsetX = (mousePos.x - 0.5) * speed * 80;
  const offsetY = (mousePos.y - 0.5) * speed * 80;

  return (
    <span
      className="hsticker"
      style={{
        '--x': x,
        '--y': y,
        '--w': w,
        '--r': r,
        transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${r})`,
      }}
    >
      <img src={src} alt="" draggable={false} loading="lazy" />
    </span>
  );
}

export default function Hero() {
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const stickerRefs = useRef([]);
  const rafId = useRef(null);
  const heroRef = useRef(null);
  const currentPos = useRef({ x: 0.5, y: 0.5 });

  const animate = useCallback(() => {
    // Smooth lerp
    currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.08;
    currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.08;

    const allStickers = [...backStickers, ...frontStickers];
    stickerRefs.current.forEach((el, i) => {
      if (!el) return;
      const sticker = allStickers[i];
      const offsetX = (currentPos.current.x - 0.5) * sticker.speed * 120;
      const offsetY = (currentPos.current.y - 0.5) * sticker.speed * 120;
      el.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${sticker.r})`;
    });

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX / window.innerWidth;
      mousePos.current.y = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  const allStickers = [...backStickers, ...frontStickers];

  return (
    <section className="hero" ref={heroRef} id="hero">
      <h1 className="sr-only">BeAliive Studio — AI-Powered Ads Agency</h1>

      {/* Back stickers — behind text */}
      <div className="hero-stickers hero-stickers-back" aria-hidden="true">
        {backStickers.map((s, i) => (
          <span
            key={`back-${i}`}
            className="hsticker"
            ref={(el) => (stickerRefs.current[i] = el)}
            style={{
              '--x': s.x,
              '--y': s.y,
              '--w': s.w,
              '--r': s.r,
            }}
          >
            <img src={s.src} alt="" draggable={false} loading="eager" />
          </span>
        ))}
      </div>

      {/* Giant text */}
      <motion.div
        className="hero-text-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="hero-title">
          BeAliive<span className="dot">.</span>
        </div>
        <div className="hero-subtitle">AI-Powered Creative Studio</div>
      </motion.div>

      {/* Front stickers — on top of text */}
      <div className="hero-stickers hero-stickers-front" aria-hidden="true">
        {frontStickers.map((s, i) => (
          <span
            key={`front-${i}`}
            className="hsticker"
            ref={(el) => (stickerRefs.current[backStickers.length + i] = el)}
            style={{
              '--x': s.x,
              '--y': s.y,
              '--w': s.w,
              '--r': s.r,
            }}
          >
            <img src={s.src} alt="" draggable={false} loading="eager" />
          </span>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.span
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        (SCROLL)
      </motion.span>
    </section>
  );
}
