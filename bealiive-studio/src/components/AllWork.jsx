import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Generate video first-frame thumbnail from Cloudinary video URL
function getVideoPoster(videoUrl) {
  return videoUrl
    .replace('/upload/', '/upload/so_0/')
    .replace('.mp4', '.jpg');
}

// All work items arranged by ad type, with Cloudinary video URLs
const allWork = [
  // Luxury Ads
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1786036695/hf_20260804_000956_11bb5daa-e13f-4300-9993-5b977d1cabf0_2_1_mjwin4.mp4',
    //poster: 'https://res.cloudinary.com/qllilxks/video/upload/so_0/v1786036078/hf_20260804_000956_11bb5daa-e13f-4300-9993-5b977d1cabf0_2_y5hgjy.jpg',
    title: 'Luxury Ad',
    category: 'Luxury Ads',
    orientation: 'v',
  },

  // Unboxing
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947284/sneakers_unboxing_e3axjh.mp4',
    title: 'Sneakers Unboxing',
    category: 'Unboxing',
    orientation: 'v',
  },

  // UGC (vertical)
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947247/hair_serum_ad_sznob4.mp4',
    title: 'Hair Serum UGC',
    category: 'UGC',
    orientation: 'v',
  },
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947240/bealive_merch_ad_ot3cqt.mp4',
    title: 'BeALive Merch UGC',
    category: 'UGC',
    orientation: 'v',
  },

  // Cinematic
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1786036794/cinematic_aurelle_lipstick_ad_2_db28gj.mp4',
    title: 'Aurelle Cinematic',
    category: 'Cinematic',
    orientation: 'v',
  },

  // UGC (vertical)
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947232/ugc_gaar5m.mp4',
    title: 'UGC',
    category: 'UGC',
    orientation: 'v',
  },

  // UGC (horizontal)
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947232/ugc_2_xouuti.mp4',
    title: 'UGC Horizontal',
    category: 'UGC',
    orientation: 'h',
  },
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785947232/ugc_3_gub3ak.mp4',
    title: 'UGC Horizontal 2',
    category: 'UGC',
    orientation: 'h',
  },

  // Hyper Motion
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946911/juice_ad_gbvoa0.mp4',
    title: 'Elvia Juice',
    category: 'Hyper Motion',
    orientation: 'v',
  },

  // UGC (vertical)
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946877/aurelle_kit_ad_rux5yd.mp4',
    title: 'Aurelle Kit UGC',
    category: 'UGC',
    orientation: 'v',
  },

  // TV Shot
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946856/UK_s_fizzi_ad_jhz7ym.mp4',
    title: "UK's Fizzi",
    category: 'TV Shot',
    orientation: 'v',
  },

  // Premium Try-On
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946840/lipstick_ad_ixtc2a.mp4',
    title: 'Lipstick Try-On',
    category: 'Premium Try-On',
    orientation: 'v',
  },

  // Hyper Motion
  {
    type: 'video',
    src: 'https://res.cloudinary.com/qllilxks/video/upload/v1785946799/hyper_motion_cfjudn.mp4',
    title: 'Hyper Motion',
    category: 'Hyper Motion',
    orientation: 'h',
  },

  // Still images
  {
    type: 'image',
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033521/lipstick_ggkafb.png',
    title: 'Lipstick Still',
    category: 'Cinematic',
    orientation: 'v',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033544/female_sneakers_pjcfbz.png',
    title: 'Female Sneakers',
    category: 'Unboxing',
    orientation: 'v',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033535/ChatGPT_Image_Aug_5_2026_07_26_49_PM_iaoob7.png',
    title: 'Hair Serum',
    category: 'UGC',
    orientation: 'v',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033555/UK_s_fizzi_pjamoq.png',
    title: "UK's Fizzi",
    category: 'TV Shot',
    orientation: 'v',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033493/Elvia_juice_pb69vg.png',
    title: 'Elvia Juice',
    category: 'Hyper Motion',
    orientation: 'v',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033506/bealive_merch_civ2uv.png',
    title: 'BeALive Merch',
    category: 'UGC',
    orientation: 'v',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/qllilxks/image/upload/v1786033520/aurelle_kit_lijoqr.png',
    title: 'Aurelle Kit',
    category: 'UGC',
    orientation: 'v',
  },
];

const categories = ['All', 'Luxury Ads', 'UGC', 'Cinematic', 'Hyper Motion', 'Unboxing', 'TV Shot', 'Premium Try-On'];

function MediaCard({ item, index }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);
  const isVisible = useRef(false);

  const posterUrl = item.type === 'video' ? getVideoPoster(item.src) : null;

  // Auto-play when card scrolls into view, pause when out
  const startPlay = useCallback(() => {
    if (!isVisible.current || item.type !== 'video') return;
    timerRef.current = setTimeout(() => {
      if (videoRef.current && isVisible.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => { });
        setPlaying(true);
      }
    }, 800 + (index % 4) * 200); // small stagger
  }, [index, item.type]);

  useEffect(() => {
    if (item.type !== 'video') return;
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startPlay();
        } else {
          if (timerRef.current) clearTimeout(timerRef.current);
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(card);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startPlay, item.type]);

  return (
    <motion.div
      ref={cardRef}
      className={`work-card work-card--${item.orientation}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.07 }}
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
              poster={posterUrl}
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
          Every frame we've crafted — videos auto-play as you scroll.
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
