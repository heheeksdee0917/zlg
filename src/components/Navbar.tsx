import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { title: 'home',       link: '/',           image: '/images/Image2.avif' },
    { title: 'philosophy', link: '/philosophy',  image: '/poster_1.jpg' },
    { title: 'projects',   link: '/projects',    image: '/poster_1.jpg' },
    { title: 'people',     link: '/people',      image: '/images/Image2.avif' },
    { title: 'partners',   link: '/partner',     image: '/poster_1.jpg' },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) { setIsVisible(true); setLastScrollY(currentScrollY); return; }
      if (currentScrollY > lastScrollY) setIsVisible(false);
      else setIsVisible(true);
      setLastScrollY(currentScrollY);
    };

    const handleInnerScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollHeight > target.clientHeight) {
        setIsVisible(target.scrollTop <= 50);
      }
    };

    let timeoutId: NodeJS.Timeout | null = null;
    const throttled = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => { handleScroll(); timeoutId = null; }, 100);
    };

    window.addEventListener('scroll', throttled, { passive: true });
    document.addEventListener('scroll', handleInnerScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener('scroll', throttled);
      document.removeEventListener('scroll', handleInnerScroll, { capture: true });
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  return (
    <>
      {/* Navbar Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] transition-transform duration-300 shadow-md ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ background: 'linear-gradient(to right, #336138 0%, #5a9d63 100%)' }}
      >
        <div className="max-w-screen-2xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <img src="/logo(white).png" alt="ZLG Design" className="h-6" />
            </Link>
            <span className="text-sm tracking-wide font-light text-white lowercase">zlgdesign</span>
          </div>

          {/* Hamburger — always visible */}
          <button onClick={toggleMenu} className="text-white hover:text-gray-200 transition-colors" aria-label="Toggle menu">
            <div className="relative w-6 h-6">
              <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
              <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* ── DESKTOP OVERLAY — 5 columns, fade in ── */}
      <div
        className="hidden md:flex fixed inset-0 z-[499] transition-opacity duration-500 ease-in-out pointer-events-none"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        {navItems.map((item, index) => (
          <Link
            key={item.title}
            to={item.link}
            onClick={closeMenu}
            className="relative flex-1 h-full overflow-hidden"
            style={{ zIndex: hoveredColumn === index ? 50 : 10 }}
            onMouseEnter={() => setHoveredColumn(index)}
            onMouseLeave={() => setHoveredColumn(null)}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${item.image})`,
                transform: hoveredColumn === index ? 'scale(1.15)' : 'scale(1)',
                filter: hoveredColumn === index ? 'grayscale(0%) brightness(1.1)' : 'grayscale(50%) brightness(0.7)',
              }}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black transition-opacity duration-500"
              style={{ opacity: hoveredColumn === index ? 0.1 : 0.3 }}
            />

            {/* Active page indicator */}
            {isActive(item.link) && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-white z-20" />
            )}

            {/* Title */}
            <div className="absolute z-20 bottom-8 left-8">
              <h2 className="text-white font-light tracking-wider lowercase whitespace-nowrap text-2xl">
                {item.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {/* ── MOBILE OVERLAY — vertical list, fade in ── */}
      <div
        className="md:hidden fixed inset-0 z-[499] transition-opacity duration-500 ease-in-out"
        style={{
          background: 'linear-gradient(to right, #336138 0%, #5a9d63 100%)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col items-start justify-start h-full space-y-8 px-8 py-24">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              onClick={closeMenu}
              className="text-2xl tracking-wide font-light text-white relative group"
            >
              {item.title}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ease-out ${
                  isActive(item.link) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="text-lg tracking-wide px-8 py-3 border-2 border-white font-light text-white mt-8 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">contact us</span>
          </Link>
        </div>
      </div>
    </>
  );
}