import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BeAlive.Studio
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

        {/* Hamburger button */}
        <button
          className={`nav-menu-btn ${menuOpen ? 'active' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <button className="mobile-nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          ✕
        </button>
        <button className="mobile-nav-link" onClick={() => scrollTo('showreel')}>Work</button>
        <button className="mobile-nav-link" onClick={() => scrollTo('about')}>About</button>
        <button className="mobile-nav-link" onClick={() => scrollTo('projects')}>Projects</button>
        <button className="mobile-nav-link" onClick={() => scrollTo('footer')}>Contact</button>
      </div>
    </>
  );
}
