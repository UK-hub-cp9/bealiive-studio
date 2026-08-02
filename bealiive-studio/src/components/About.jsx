import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const words = [
  { text: 'We create ', accent: false },
  { text: 'AI-powered ads that stop the scroll.', accent: true },
  { text: ' From concept to conversion — beauty, fashion, fitness, beverages, and beyond. We bring brands to life with cinematic visuals powered by the latest in generative AI.', accent: false },
];

const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="about" id="about" ref={ref}>
      <motion.p
        className="about-text"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {words.map((w, i) => (
          <motion.span key={i} custom={i} variants={lineVariants}>
            {w.accent ? <em>{w.text}</em> : w.text}
          </motion.span>
        ))}
      </motion.p>

      <motion.a
        href="#projects"
        className="about-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        See Our Work
        <svg viewBox="0 0 10 10">
          <path d="M2 8L8 2M8 2H3M8 2V7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}
