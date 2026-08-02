import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        BeAliive.Studio
      </a>

      <div className="nav-links">
        <button className="nav-pill" onClick={() => scrollTo('showreel')}>
          Work
          <svg viewBox="0 0 10 10"><path d="M2 8L8 2M8 2H3M8 2V7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className="nav-pill" onClick={() => scrollTo('about')}>
          About
          <svg viewBox="0 0 10 10"><path d="M2 8L8 2M8 2H3M8 2V7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className="nav-pill" onClick={() => scrollTo('projects')}>
          Projects
          <svg viewBox="0 0 10 10"><path d="M2 8L8 2M8 2H3M8 2V7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className="nav-pill" onClick={() => scrollTo('footer')}>
          Contact
          <svg viewBox="0 0 10 10"><path d="M2 8L8 2M8 2H3M8 2V7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <button className="nav-menu-btn" aria-label="Open menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
