import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      cursor.style.transform = `translate(${pos.current.x - cursor.offsetWidth / 2}px, ${pos.current.y - cursor.offsetHeight / 2}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    const onHoverIn = () => cursor.classList.add('hovering');
    const onHoverOut = () => cursor.classList.remove('hovering');

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, .nav-pill, .project-card, .about-cta, .footer-cta-btn');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
      return interactives;
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    // Observe DOM changes to re-attach hover listeners
    const observer = new MutationObserver(() => addHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });
    const interactives = addHoverListeners();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, []);

  return <div id="custom-cursor" ref={cursorRef} />;
}
