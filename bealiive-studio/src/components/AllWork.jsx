import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Mix of images and videos from Cloudinary and local assets
const allWork = [
  // 1st and 2nd specifically requested
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947240/bealive_merch_ad_ot3cqt.mp4', title: 'BeALive Merch Ad', category: 'Brand', orientation: 'v' },
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947233/aurelle_lipstick_ad_2_gkmxjj.mp4', title: 'Aurelle Lipstick Ad 2', category: 'Beauty', orientation: 'v' },
  
  // Mixed content
  { type: 'image', src: '/Beauty - Aurelle/lipstick.png', title: 'Lipstick', category: 'Beauty', orientation: 'v' },
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947232/ugc_2_xouuti.mp4', title: 'UGC 2', category: 'Beauty', orientation: 'h' },
  { type: 'image', src: '/Sneakers/female sneakers.png', title: 'Female Sneakers', category: 'Fashion', orientation: 'v' },
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947284/sneakers_unboxing_e3axjh.mp4', title: 'Sneakers Unboxing', category: 'Fashion', orientation: 'v' },
  
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946799/hyper_motion_cfjudn.mp4', title: 'Hyper Motion', category: 'Beauty', orientation: 'h' },
  { type: 'image', src: '/Beauty - Aurelle/aurelle kit.png', title: 'Aurelle Kit', category: 'Beauty', orientation: 'v' },
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946840/lipstick_ad_ixtc2a.mp4', title: 'Lipstick Ad', category: 'Beauty', orientation: 'v' },
  
  { type: 'image', src: '/Beauty - hair serum/ChatGPT Image Aug 5, 2026, 07_26_49 PM.png', title: 'Hair Serum', category: 'Beauty', orientation: 'v' },
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947247/hair_serum_ad_sznob4.mp4', title: 'Hair Serum Ad', category: 'Beauty', orientation: 'v' },
  
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947232/ugc_3_gub3ak.mp4', title: 'UGC 3', category: 'Beauty', orientation: 'h' },
  { type: 'image', src: "/UK's fizzi/UK's fizzi.png", title: "UK's Fizzi", category: 'Beverage', orientation: 'v' },
  { type: 'video', src: "https://res.cloudinary.com/qllilxks/video/upload/v1785946856/UK_s_fizzi_ad_jhz7ym.mp4", title: "UK's Fizzi Ad", category: 'Beverage', orientation: 'v' },

  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946877/aurelle_kit_ad_rux5yd.mp4', title: 'Aurelle Kit Ad', category: 'Beauty', orientation: 'v' },
  { type: 'image', src: '/Juice/Elvia juice.png', title: 'Elvia Juice', category: 'Beverage', orientation: 'v' },
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946911/juice_ad_gbvoa0.mp4', title: 'Elvia Juice Ad', category: 'Beverage', orientation: 'v' },
  
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947491/hf_20260804_000956_11bb5daa-e13f-4300-9993-5b977d1cabf0_1_zw1s14.mp4', title: 'Elvia Juice HF', category: 'Beverage', orientation: 'v' },
  { type: 'video', src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947232/ugc_gaar5m.mp4', title: 'UGC', category: 'Beauty', orientation: 'v' },
  { type: 'image', src: '/BeALive merch/bealive merch.png', title: 'BeALive Merch', category: 'Brand', orientation: 'v' },
];

const categories = ['All', 'Beauty', 'Beverage', 'Fashion', 'Brand'];

function MediaCard({ item, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
    }
  };

  const handleTap = () => {
    if (item.type === 'video' && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
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
        {item.type === 'video' ? (
          <>
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
          <MediaCard key={item.src} item={item} index={i} />
        ))}
      </main>

      <footer className="all-work-footer">
        <p>© 2026 BeAliive Studio · <a href="mailto:support.bealive.studio@gmail.com">support.bealive.studio@gmail.com</a></p>
      </footer>
    </div>
  );
}
