import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

// Generate video first-frame thumbnail from Cloudinary video URL
function getVideoPoster(videoUrl) {
  return videoUrl
    .replace('/upload/', '/upload/so_0/')
    .replace('.mp4', '.jpg');
}

const projects = [
  {
    name: 'Aurelle Lipstick',
    category: 'Beauty / Cosmetics',
    video: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946840/lipstick_ad_ixtc2a.mp4',
  },
  {
    name: "UK's Fizzi",
    category: 'Beverage / FMCG',
    video: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946856/UK_s_fizzi_ad_jhz7ym.mp4',
  },
  {
    name: 'Elvia Juice',
    category: 'Beverage / Health',
    video: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946911/juice_ad_gbvoa0.mp4',
  },
  {
    name: 'Aurelle Kit',
    category: 'Beauty / Skincare',
    video: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946877/aurelle_kit_ad_rux5yd.mp4',
  },
];

function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const promise = video.play();
          if (promise !== undefined) {
            promise.catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handleTap = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <div
      ref={cardRef}
      className="project-card"
      onClick={handleTap}
    >
      <div className="project-card-media">
        {project.video && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
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

  // Arrow navigation
  const scrollByCard = (direction) => {
    const strip = stripRef.current;
    if (!strip) return;
    const card = strip.querySelector('.project-card');
    if (!card) return;
    const cardWidth = card.offsetWidth + 24;
    strip.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  };

  // Drag scroll (desktop)
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
          className="section-label projects-label"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Featured Projects
        </motion.p>
      </div>

      <div className="projects-stage">
        {/* Left arrow */}
        <button
          className="projects-nav-arrow projects-nav-arrow--left"
          onClick={() => scrollByCard(-1)}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <motion.div
          className="projects-strip"
          ref={stripRef}
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </motion.div>

        {/* Right arrow */}
        <button
          className="projects-nav-arrow projects-nav-arrow--right"
          onClick={() => scrollByCard(1)}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
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
