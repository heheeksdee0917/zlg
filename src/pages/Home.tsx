import React, { useState, useEffect } from 'react';

export default function Home() {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Trigger animations after component mounts
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const columns = [
    {
      id: 1,
      title: 'Projects',
      link: '/projects',
      image: '/poster_1.jpg'
    },
    {
      id: 2,
      title: 'Philosophy',
      link: '/philosophy',
      image: '/poster_1.jpg'
    },
    {
      id: 3,
      title: 'People',
      link: '/people',
      image: '/poster_1.jpg'
    },
    {
      id: 4,
      title: 'Partners',
      link: '/partners',
      image: '/poster_1.jpg'
    },
    {
      id: 5,
      title: 'Contact',
      link: '/contact',
      image: '/poster_1.jpg'
    }
  ];

  const getColumnWidth = (index: number) => {
    if (hoveredColumn === null) {
      return '20%';
    }
    if (hoveredColumn === index) {
      return '100%';
    }
    return '0%';
  };

  return (
    <div className="h-screen w-full flex md:flex-row flex-col overflow-hidden">
      {columns.map((column, index) => (
        <a
          key={column.id}
          href={column.link}
          className="relative overflow-hidden"
          style={{ 
            width: isMobile ? '100%' : getColumnWidth(index),
            height: isMobile ? '20%' : '100%',
            transform: isLoaded ? 'translateX(0) translateY(0)' : (isMobile ? 'translateX(-100%)' : 'translateY(-100%)'),
            transition: isLoaded 
              ? `width 500ms ease-in-out, height 500ms ease-in-out` 
              : `transform 800ms ease-in-out ${index * 150}ms`,
          }}
          onMouseEnter={() => !isMobile && setHoveredColumn(index)}
          onMouseLeave={() => !isMobile && setHoveredColumn(null)}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{
              backgroundImage: `url(${column.image})`,
              transform: hoveredColumn === index && !isMobile ? 'scale(1.05)' : 'scale(1)'
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black transition-opacity duration-500"
            style={{ opacity: hoveredColumn === index && !isMobile ? 0.3 : 0.5 }}
          />

          {/* Title - Bottom Left (always visible on mobile) */}
          <div
            className="absolute z-10 transition-all duration-700"
            style={{
              bottom: '2rem',
              left: '2rem',
              opacity: isLoaded && (isMobile || hoveredColumn === null || hoveredColumn !== index) ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${index * 150 + 400}ms`
            }}
          >
            <h2
              className="text-white font-light tracking-wider lowercase"
              style={{
                fontSize: '1.5rem',
                letterSpacing: '0.1em'
              }}
            >
              {column.title}
            </h2>
          </div>

          {/* Title - Center (only on desktop hover) */}
          {!isMobile && (
            <div
              className="absolute z-10 transition-opacity duration-500"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: hoveredColumn === index ? 1 : 0,
                pointerEvents: hoveredColumn === index ? 'auto' : 'none'
              }}
            >
              <h2
                className="text-white font-light tracking-wider lowercase"
                style={{
                  fontSize: '2.5rem',
                  letterSpacing: '0.2em'
                }}
              >
                {column.title}
              </h2>
            </div>
          )}
        </a>
      ))}
    </div>
  );
}