import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

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
        className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
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
                className={`text-sm tracking-wide transition-all font-light text-black ${
                  isActive('/') ? 'border-b border-current' : 'hover:border-b hover:border-gray-400'
                }`}
              >
                home
              </Link>
              <Link
                to="/philosophy"
                className={`text-sm tracking-wide transition-all font-light text-black ${
                  isActive('/philosophy') ? 'border-b border-current' : 'hover:border-b hover:border-gray-400'
                }`}
              >
                philosophy
              </Link>
              <Link
                to="/projects"
                className={`text-sm tracking-wide transition-all font-light text-black ${
                  isActive('/projects') ? 'border-b border-current' : 'hover:border-b hover:border-gray-400'
                }`}
              >
                projects
              </Link>
              <Link
                to="/people"
                className={`text-sm tracking-wide transition-all font-light text-black ${
                  isActive('/people') ? 'border-b border-current' : 'hover:border-b hover:border-gray-400'
                }`}
              >
                people
              </Link>
              <Link
                to="/partnerships"
                className={`text-sm tracking-wide transition-all font-light text-black ${
                  isActive('/partnerships') ? 'border-b border-current' : 'hover:border-b hover:border-gray-400'
                }`}
              >
                partnerships
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="mailto:info@zlgdesign.com"
              className="hidden md:inline-block text-sm tracking-wide px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors font-light text-black"
            >
              contact us
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
              className={`text-2xl tracking-wide font-light text-black ${
                isActive('/') ? 'border-b-2 border-black' : ''
              }`}
            >
              home
            </Link>
            <Link
              to="/philosophy"
              onClick={closeMobileMenu}
              className={`text-2xl tracking-wide font-light text-black ${
                isActive('/philosophy') ? 'border-b-2 border-black' : ''
              }`}
            >
              philosophy
            </Link>
            <Link
              to="/projects"
              onClick={closeMobileMenu}
              className={`text-2xl tracking-wide font-light text-black ${
                isActive('/projects') ? 'border-b-2 border-black' : ''
              }`}
            >
              projects
            </Link>
            <Link
              to="/people"
              onClick={closeMobileMenu}
              className={`text-2xl tracking-wide font-light text-black ${
                isActive('/people') ? 'border-b-2 border-black' : ''
              }`}
            >
              people
            </Link>
            <Link
              to="/partnerships"
              onClick={closeMobileMenu}
              className={`text-2xl tracking-wide font-light text-black ${
                isActive('/partnerships') ? 'border-b-2 border-black' : ''
              }`}
            >
              partnerships
            </Link>
            <a
              href="mailto:info@zlgdesign.com"
              className="text-lg tracking-wide px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors font-light text-black mt-8"
              onClick={closeMobileMenu}
            >
              contact us
            </a>
          </div>
        </div>
      )}
    </>
  );
}