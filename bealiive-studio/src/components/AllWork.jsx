import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// All media from every folder — sorted by category
const allWork = [
  // Beauty - Aurelle
  { type: 'video', src: '/Beauty - Aurelle/lipstick_ad.mp4',       poster: '/Beauty - Aurelle/lipstick.png',      title: 'Lipstick Ad',        category: 'Beauty' },
  { type: 'image', src: '/Beauty - Aurelle/lipstick.png',                                                         title: 'Lipstick',            category: 'Beauty' },
  { type: 'video', src: '/Beauty - Aurelle/aurelle kit ad.mp4',     poster: '/Beauty - Aurelle/aurelle kit.png',   title: 'Aurelle Kit Ad',     category: 'Beauty' },
  { type: 'image', src: '/Beauty - Aurelle/aurelle kit.png',                                                      title: 'Aurelle Kit',         category: 'Beauty' },
  { type: 'video', src: '/Beauty - Aurelle/aurelle lipstick ad 2.mp4', poster: '/Beauty - Aurelle/lipstick.png',  title: 'Lipstick Ad 2',      category: 'Beauty' },
  { type: 'video', src: '/Beauty - Aurelle/hyper motion.mp4',       poster: '/Beauty - Aurelle/aurelle kit.png',  title: 'Hyper Motion',       category: 'Beauty' },
  { type: 'video', src: '/Beauty - Aurelle/ugc.mp4',                poster: '/Beauty - Aurelle/lipstick.png',     title: 'UGC',                category: 'Beauty' },
  { type: 'video', src: '/Beauty - Aurelle/ugc 2.mp4',              poster: '/Beauty - Aurelle/lipstick.png',     title: 'UGC 2',              category: 'Beauty' },
  { type: 'video', src: '/Beauty - Aurelle/ugc 3.mp4',              poster: '/Beauty - Aurelle/aurelle kit.png',  title: 'UGC 3',              category: 'Beauty' },

  // Hair Serum
  { type: 'video', src: '/Beauty - hair serum/hair serum ad.mp4',   poster: '/Beauty - hair serum/ChatGPT Image Aug 5, 2026, 07_26_49 PM.png', title: 'Hair Serum Ad', category: 'Beauty' },
  { type: 'image', src: '/Beauty - hair serum/ChatGPT Image Aug 5, 2026, 07_26_49 PM.png',                       title: 'Hair Serum',         category: 'Beauty' },

  // UK's Fizzi
  { type: 'video', src: "/UK's fizzi/UK's fizzi ad.mp4",            poster: "/UK's fizzi/UK's fizzi.png",         title: "UK's Fizzi Ad",      category: 'Beverage' },
  { type: 'image', src: "/UK's fizzi/UK's fizzi.png",                                                             title: "UK's Fizzi",          category: 'Beverage' },

  // Juice
  { type: 'video', src: '/Juice/juice_ad.mp4',                      poster: '/Juice/Elvia juice.png',             title: 'Elvia Juice Ad',     category: 'Beverage' },
  { type: 'video', src: '/Juice/hf_20260804_005622_94ce7344-84d5-4db2-b4d7-bce4b4d6e399 (1).mp4', poster: '/Juice/Elvia juice.png', title: 'Elvia Juice HF', category: 'Beverage' },
  { type: 'image', src: '/Juice/Elvia juice.png',                                                                 title: 'Elvia Juice',         category: 'Beverage' },

  // Sneakers
  { type: 'video', src: '/Sneakers/sneakers_unboxing.mp4',           poster: '/Sneakers/female sneakers.png',     title: 'Sneakers Unboxing',  category: 'Fashion' },
  { type: 'image', src: '/Sneakers/female sneakers.png',                                                          title: 'Female Sneakers',    category: 'Fashion' },

  // BeALive Merch
  { type: 'video', src: '/BeALive merch/bealive merch ad.mp4',       poster: '/BeALive merch/bealive merch.png',  title: 'BeALive Merch Ad',   category: 'Brand' },
  { type: 'image', src: '/BeALive merch/bealive merch.png',                                                       title: 'BeALive Merch',      category: 'Brand' },
];

const categories = ['All', 'Beauty', 'Beverage', 'Fashion', 'Brand'];

function MediaCard({ item, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => { });
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
      setPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.div
      className="work-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 6) * 0.06 }}
      onMouseEnter={item.type === 'video' ? handleMouseEnter : undefined}
      onMouseLeave={item.type === 'video' ? handleMouseLeave : undefined}
      onClick={item.type === 'video' ? toggle : undefined}
    >
      <div className="work-card-media">
        {item.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              poster={item.poster}
            >
              <source src={item.src} type="video/mp4" />
            </video>
            <div className={`work-play-icon ${playing ? 'hidden' : ''}`}>▶</div>
          </>
        ) : (
          <img src={item.src} alt={item.title} loading="lazy" />
        )}
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
          Every frame we've crafted — hover to play, tap to explore.
        </motion.p>

        {/* Filter tabs */}
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
          <MediaCard key={item.src} item={item} index={i} />
        ))}
      </main>

      <footer className="all-work-footer">
        <p>© 2026 BeAliive Studio · <a href="mailto:support.bealive.studio@gmail.com">support.bealive.studio@gmail.com</a></p>
      </footer>
    </div>
  );
}
