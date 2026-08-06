import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Sticker definitions — curated selection from portfolio
// Back layer: behind the text (z-index 2)
const backStickers = [
  {
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033535/ChatGPT_Image_Aug_5_2026_07_26_49_PM_iaoob7.png',
    x: 26, y: 22, w: 8, r: '-6deg', speed: 0.12,
  },
  {
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033493/Elvia_juice_pb69vg.png',
    x: 74, y: 20, w: 9, r: '5deg', speed: 0.15,
  },
  {
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033520/aurelle_kit_lijoqr.png',
    x: 28, y: 78, w: 9, r: '-4deg', speed: 0.18,
  },
  {
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033506/bealive_merch_civ2uv.png',
    x: 72, y: 76, w: 10, r: '4deg', speed: 0.14,
  },
];

// Front layer: on top of the text (z-index 8)
const frontStickers = [
  {
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033555/UK_s_fizzi_pjamoq.png',
    x: 14, y: 48, w: 8, r: '-8deg', speed: 0.16,
  },
  {
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033544/female_sneakers_pjcfbz.png',
    x: 86, y: 46, w: 10, r: '6deg', speed: 0.2,
  },
  {
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033521/lipstick_ggkafb.png',
    x: 50, y: 16, w: 7, r: '8deg', speed: 0.22,
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
      <h1 className="sr-only">BeAlive Studio — AI-Powered Ads Agency</h1>

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
          BeAlive<span className="dot">.</span>
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
