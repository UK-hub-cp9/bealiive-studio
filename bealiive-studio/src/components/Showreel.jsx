import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Showreel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="showreel" id="showreel" ref={ref}>
      <motion.div
        className="reel-wrap"
        initial={{ opacity: 0, scale: 0.95, borderRadius: '32px' }}
        animate={isInView ? { opacity: 1, scale: 1, borderRadius: '16px' } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/Beauty - Aurelle/aurelle kit.png"
          >
            <source
              src="https://res.cloudinary.com/qllilxks/video/upload/v1785946799/hyper_motion_cfjudn.mp4"
              type="video/mp4"
            />
          </video>
        <div className="reel-tag">BeAliive® — Showreel</div>
        <div className="reel-year">©2026</div>
      </motion.div>
    </section>
  );
}
