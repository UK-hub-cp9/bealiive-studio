import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Videos only — no separate images. Browser shows first frame via preload="metadata".
// orientation: 'v' = vertical (9:16), 'h' = horizontal (16:9)
const allWork = [
  // Beauty - Aurelle
  { src: '/Beauty - Aurelle/lipstick_ad.mp4',           title: 'Lipstick Ad',          category: 'Beauty',   orientation: 'v' },
  { src: '/Beauty - Aurelle/aurelle kit ad.mp4',         title: 'Aurelle Kit Ad',       category: 'Beauty',   orientation: 'v' },
  { src: '/Beauty - Aurelle/aurelle lipstick ad 2.mp4',  title: 'Lipstick Ad 2',        category: 'Beauty',   orientation: 'v' },
  { src: '/Beauty - Aurelle/hyper motion.mp4',           title: 'Hyper Motion',         category: 'Beauty',   orientation: 'h' },
  { src: '/Beauty - Aurelle/ugc.mp4',                    title: 'UGC',                  category: 'Beauty',   orientation: 'v' },
  { src: '/Beauty - Aurelle/ugc 2.mp4',                  title: 'UGC 2',                category: 'Beauty',   orientation: 'v' },
  { src: '/Beauty - Aurelle/ugc 3.mp4',                  title: 'UGC 3',                category: 'Beauty',   orientation: 'v' },

  // Hair Serum
  { src: '/Beauty - hair serum/hair serum ad.mp4',       title: 'Hair Serum Ad',        category: 'Beauty',   orientation: 'v' },

  // UK's Fizzi
  { src: "/UK's fizzi/UK's fizzi ad.mp4",                title: "UK's Fizzi Ad",        category: 'Beverage', orientation: 'v' },

  // Juice
  { src: '/Juice/juice_ad.mp4',                          title: 'Elvia Juice Ad',       category: 'Beverage', orientation: 'v' },
  { src: '/Juice/hf_20260804_005622_94ce7344-84d5-4db2-b4d7-bce4b4d6e399 (1).mp4', title: 'Elvia Juice HF', category: 'Beverage', orientation: 'v' },

  // Sneakers
  { src: '/Sneakers/sneakers_unboxing.mp4',              title: 'Sneakers Unboxing',    category: 'Fashion',  orientation: 'v' },

  // BeALive Merch
  { src: '/BeALive merch/bealive merch ad.mp4',          title: 'BeALive Merch Ad',     category: 'Brand',    orientation: 'v' },
];

const categories = ['All', 'Beauty', 'Beverage', 'Fashion', 'Brand'];

function VideoCard({ item, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
    }
  };

  const handleTap = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.div
      className={`work-card work-card--${item.orientation}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.07 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      <div className="work-card-media">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={item.src} type="video/mp4" />
        </video>
        {/* Play overlay — fades out when playing */}
        <div className={`work-play-icon ${playing ? 'hidden' : ''}`}>
          <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="work-card-info">
        <span className="work-card-title">{item.title}</span>
        <span className="work-card-category">{item.category}</span>
      </div>
    </motion.div>
  );
}

export default function AllWork() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? allWork
    : allWork.filter(item => item.category === activeCategory);

  return (
    <div className="all-work-page">
      {/* Back to home */}
      <a href="/" className="all-work-back">
        ← BeAliive Studio
      </a>

      <header className="all-work-header">
        <motion.h1
          className="all-work-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          All Work
        </motion.h1>
        <motion.p
          className="all-work-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          Every frame we've crafted — hover to play, tap on mobile.
        </motion.p>

        <motion.div
          className="all-work-filters"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </header>

      <main className="all-work-grid">
        {filtered.map((item, i) => (
          <VideoCard key={item.src} item={item} index={i} />
        ))}
      </main>

      <footer className="all-work-footer">
        <p>© 2026 BeAliive Studio · <a href="mailto:support.bealive.studio@gmail.com">support.bealive.studio@gmail.com</a></p>
      </footer>
    </div>
  );
}
