import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const lineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer className="footer" id="footer" ref={ref}>
      <div className="footer-top">
        <div>
          <motion.div
            className="footer-cta-claim"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span className="line" custom={0} variants={lineVariants} style={{ display: 'block' }}>
              Want ads that
            </motion.span>
            <motion.span className="line" custom={1} variants={lineVariants} style={{ display: 'block' }}>
              <em>actually convert?</em>
            </motion.span>
            <motion.span className="line" custom={2} variants={lineVariants} style={{ display: 'block' }}>
              Let's make it happen.
            </motion.span>
          </motion.div>

          <motion.a
            href="mailto:support.bealive.studio@gmail.com"
            className="footer-cta-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Start Your Project
            <svg viewBox="0 0 12 12">
              <path d="M2 10L10 2M10 2H3M10 2V9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>

        <motion.div
          className="footer-contact-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>
            <a href="mailto:support.bealive.studio@gmail.com">support.bealive.studio@gmail.com</a>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            {' · '}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X / Twitter</a>
            {' · '}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </motion.div>
      </div>

      <div className="footer-bottom">
        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#showreel">Work</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="/all-work">All Work</a>
          <a href="#footer">Contact</a>
        </div>
        <span className="footer-copy">© 2026 BeAliive Studio. All rights reserved.</span>
      </div>
    </footer>
  );
}
