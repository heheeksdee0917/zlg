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
  const [carouselSlide, setCarouselSlide] = useState(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { title: 'home', link: '/' },
    { title: 'philosophy', link: '/philosophy' },
    { title: 'projects', link: '/projects' },
    { title: 'people', link: '/people' },
    { title: 'partners', link: '/partner' },
  ];

  const carouselImages = [
    '/general/HomeCP_point92.avif',
    '/projects/boh-visitor/CP.avif',
    '/general/HomeCP_Lantern.avif',
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const timer = setInterval(() => {
      setCarouselSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [menuOpen]);

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
            <span className="text-sm font-regular text-white lowercase">zlgdesign</span>
          </div>

          {/* Hamburger */}
          <button onClick={toggleMenu} className="text-white hover:text-gray-200 transition-colors" aria-label="Toggle menu">
            <div className="relative w-6 h-6">
              <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
              <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* ── DESKTOP OVERLAY — 60/40 split ── */}
      <div
        className="hidden md:flex fixed inset-0 z-[499] transition-opacity duration-500 ease-in-out"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        {/* LEFT — 60% navigation links */}
        <div
          className="w-[60%] h-full flex flex-col justify-center px-20"
          style={{ background: 'linear-gradient(to right, #336138 0%, #5a9d63 100%)' }}
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.title}
                to={item.link}
                onClick={closeMenu}
                className="group flex items-center gap-6 py-4 border-b border-white/10 last:border-none"
                onMouseEnter={() => setHoveredColumn(index)}
                onMouseLeave={() => setHoveredColumn(null)}
              >
                <span className="text-white/30 text-xs  font-light w-6">
                  0{index + 1}
                </span>
                <span
                  className="text-4xl md:text-5xl font-extralight  lowercase text-white transition-all duration-300"
                  style={{ opacity: hoveredColumn === null || hoveredColumn === index ? 1 : 0.3 }}
                >
                  {item.title}
                </span>
                {isActive(item.link) && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-white opacity-70" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT — 40% carousel */}
        <div className="w-[40%] h-full relative overflow-hidden">
          {carouselImages.map((img, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
              style={{
                backgroundImage: `url(${img})`,
                opacity: carouselSlide === index ? 1 : 0,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/20" />

          {/* Dot indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselSlide(i)}
                className={`h-px transition-all duration-500 ${
                  i === carouselSlide ? 'w-8 bg-white' : 'w-4 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE OVERLAY — text only ── */}
      <div
        className="md:hidden fixed inset-0 z-[499] transition-opacity duration-500 ease-in-out"
        style={{
          background: 'linear-gradient(to right, #336138 0%, #5a9d63 100%)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col items-start justify-center h-full space-y-6 px-10">
          {navItems.map((item, index) => (
            <Link
              key={item.title}
              to={item.link}
              onClick={closeMenu}
              className="group flex items-center gap-4"
            >
              <span className="text-white/30 text-xs  font-light">
                0{index + 1}
              </span>
              <span
                className={`text-3xl  font-extralight lowercase transition-opacity duration-300 ${
                  isActive(item.link) ? 'text-white' : 'text-white/80'
                }`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}