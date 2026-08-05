import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    name: 'Aurelle Lipstick',
    category: 'Beauty / Cosmetics',
    image: '/Beauty - Aurelle/lipstick.png',
    video: '/Beauty - Aurelle/lipstick_ad.mp4',
  },
  {
    name: "UK's Fizzi",
    category: 'Beverage / FMCG',
    image: "/UK's fizzi/UK's fizzi.png",
    video: "/UK's fizzi/UK's fizzi ad.mp4",
  },
  {
    name: 'Aurelle Kit',
    category: 'Beauty / Skincare',
    image: '/Beauty - Aurelle/aurelle kit.png',
    video: '/Beauty - Aurelle/aurelle kit ad.mp4',
  },
  {
    name: 'Elvia Juice',
    category: 'Beverage / Health',
    image: '/Juice/Elvia juice.png',
    video: '/Juice/juice_ad.mp4',
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

  // Touch: tap to play/pause on mobile
  const handleTap = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="project-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
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

        {/* Arrow hint — big & centered */}
        <motion.div
          className="arrow-hint"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <img src="/arrow.png" alt="Explore projects" />
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

      {/* See Our Work button */}
      <motion.div
        className="projects-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <a href="/all-work" className="see-work-btn">
          See Our Work
          <svg viewBox="0 0 12 12">
            <path d="M2 10L10 2M10 2H3M10 2V9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
