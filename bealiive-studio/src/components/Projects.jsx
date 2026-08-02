import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    name: "UK's Fizzi",
    category: 'Beverage / FMCG',
    image: "/UK's fizzi/ChatGPT Image Aug 1, 2026, 02_38_34 PM.png",
    video: "/UK's fizzi/hf_20260801_090312_00bda75b-3a8b-490e-94a3-0ba938e67e95.mp4",
  },
  {
    name: 'Aurelle',
    category: 'Beauty / Skincare',
    image: '/Beauty - Aurelle/hf_20260731_131423_ee3c5ecc-d21a-4e96-a983-92a615c06378.png',
    video: '/Beauty - Aurelle/hf_20260731_134654_ff3a3c25-c759-4c89-af6d-72154e8280b9.mp4',
  },
  {
    name: 'Hair Serum',
    category: 'Beauty / Haircare',
    image: '/Beauty - hair serum/ChatGPT Image Aug 1, 2026, 12_31_28 PM.png',
    video: '/Beauty - hair serum/hf_20260801_071821_ce9e2d18-1c13-43bc-9cb8-c7c0d60620ca.mp4',
  },
  {
    name: 'Bonkers',
    category: 'Fashion / Streetwear',
    image: '/Bonkers/ChatGPT Image Aug 2, 2026, 01_29_33 PM.png',
    video: '/Bonkers/hf_20260802_081241_1dfd7022-633f-44f9-bc00-7e62007aa4c8.mp4',
  },
  {
    name: 'Maxx Protein',
    category: 'Fitness / Supplements',
    image: '/Protein/Maxx Protein Product Shot.png',
    video: null,
  },
];

function ProjectCard({ project }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="project-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card-media">
        <img src={project.image} alt={project.name} loading="lazy" />
        {project.video && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={project.image}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="project-card-info">
        <div className="project-card-name">{project.name}</div>
        <div className="project-card-category">{project.category}</div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Drag scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const handleMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - strip.offsetLeft;
      scrollLeft.current = strip.scrollLeft;
      strip.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      strip.style.cursor = 'grab';
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - strip.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      strip.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      strip.style.cursor = 'grab';
    };

    strip.addEventListener('mousedown', handleMouseDown);
    strip.addEventListener('mouseup', handleMouseUp);
    strip.addEventListener('mousemove', handleMouseMove);
    strip.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      strip.removeEventListener('mousedown', handleMouseDown);
      strip.removeEventListener('mouseup', handleMouseUp);
      strip.removeEventListener('mousemove', handleMouseMove);
      strip.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects-head">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Featured Projects
        </motion.p>

        {/* Fun swipe/scroll hint */}
        <motion.div
          className="swipe-hint"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <span className="swipe-hint-hand"></span>
          <span className="swipe-hint-text">
            <span className="swipe-hint-desktop">Hover for magic</span>
            <span className="swipe-hint-mobile">click for magic</span>
          </span>
          <motion.span
            className="swipe-hint-arrow"
            animate={{ x: [0, 12, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </motion.div>
      </div>

      <div className="projects-stage">
        <motion.div
          className="projects-strip"
          ref={stripRef}
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </motion.div>
      </div>

      <div className="drag-badge">
        <svg viewBox="0 0 10 10">
          <path d="M7 2L3 5l4 3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        DRAG
        <svg viewBox="0 0 10 10">
          <path d="M3 2l4 3-4 3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </section>
  );
}
