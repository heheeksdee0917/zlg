import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import React from 'react';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Check scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout | null = null;
    const throttledHandleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 100);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-8 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <img
                src="/logo.png"
                alt="ZLG Design"
                className="h-6"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-sm tracking-wide font-light text-black relative group"
              >
                home
                <span
                  className={`absolute bottom-0 left-0 h-px bg-black transition-all duration-300 ease-out ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                ></span>
              </Link>
              <Link
                to="/philosophy"
                className="text-sm tracking-wide font-light text-black relative group"
              >
                philosophy
                <span
                  className={`absolute bottom-0 left-0 h-px bg-black transition-all duration-300 ease-out ${isActive('/philosophy') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                ></span>
              </Link>
              <Link
                to="/projects"
                className="text-sm tracking-wide font-light text-black relative group"
              >
                projects
                <span
                  className={`absolute bottom-0 left-0 h-px bg-black transition-all duration-300 ease-out ${isActive('/projects') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                ></span>
              </Link>
              <Link
                to="/people"
                className="text-sm tracking-wide font-light text-black relative group"
              >
                people
                <span
                  className={`absolute bottom-0 left-0 h-px bg-black transition-all duration-300 ease-out ${isActive('/people') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                ></span>
              </Link>
              <Link
                to="/partnerships"
                className="text-sm tracking-wide font-light text-black relative group"
              >
                partnerships
                <span
                  className={`absolute bottom-0 left-0 h-px bg-black transition-all duration-300 ease-out ${isActive('/partnerships') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                ></span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="mailto:info@zlgdesign.com"
              className="hidden md:inline-block text-sm tracking-wide px-6 py-2 border border-black font-light text-black relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">contact us</span>
            </a>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-black hover:text-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20">
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-8">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-2xl tracking-wide font-light text-black relative group"
            >
              home
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
              ></span>
            </Link>
            <Link
              to="/philosophy"
              onClick={closeMobileMenu}
              className="text-2xl tracking-wide font-light text-black relative group"
            >
              philosophy
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive('/philosophy') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
              ></span>
            </Link>
            <Link
              to="/projects"
              onClick={closeMobileMenu}
              className="text-2xl tracking-wide font-light text-black relative group"
            >
              projects
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive('/projects') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
              ></span>
            </Link>
            <Link
              to="/people"
              onClick={closeMobileMenu}
              className="text-2xl tracking-wide font-light text-black relative group"
            >
              people
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive('/people') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
              ></span>
            </Link>
            <Link
              to="/partnerships"
              onClick={closeMobileMenu}
              className="text-2xl tracking-wide font-light text-black relative group"
            >
              partnerships
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive('/partnerships') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
              ></span>
            </Link>
            <a
              href="mailto:info@zlgdesign.com"
              className="text-lg tracking-wide px-8 py-3 border-2 border-black font-light text-black mt-8 relative overflow-hidden group"
              onClick={closeMobileMenu}
            >
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">contact us</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}