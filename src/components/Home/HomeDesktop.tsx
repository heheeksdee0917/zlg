import React, { useState, useEffect } from 'react';

export default function HomeDesktop() {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const columns = [
    {
      id: 1,
      title: 'People',
      link: '/people',
      image: '/images/Image2.avif'
    },
    {
      id: 2,
      title: 'Philosophy',
      link: '/philosophy',
      image: '/poster_1.jpg'
    },
    {
      id: 3,
      title: 'place',
      link: '/place',
      image: '/poster_1.jpg'
    },
    {
      id: 4,
      title: 'projects',
      link: '/projects',
      image: '/poster_1.jpg'
    },
    {
      id: 5,
      title: 'partners',
      link: '/partners',
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
    <div className="h-screen w-full flex overflow-hidden">
      {columns.map((column, index) => (
        <a
          key={column.id}
          href={column.link}
          className="relative overflow-hidden"
          style={{ 
            width: getColumnWidth(index),
            height: '100%',
            transform: isLoaded ? 'translateY(0)' : 'translateY(-100%)',
            transition: isLoaded 
              ? `width 500ms ease-in-out` 
              : `transform 800ms ease-in-out ${index * 150}ms`,
          }}
          onMouseEnter={() => setHoveredColumn(index)}
          onMouseLeave={() => setHoveredColumn(null)}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{
              backgroundImage: `url(${column.image})`,
              transform: hoveredColumn === index ? 'scale(1.05)' : 'scale(1)',
              filter: 'grayscale(100%)' 
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black transition-opacity duration-500"
            style={{ opacity: hoveredColumn === index ? 0.3 : 0.5 }}
          />

          {/* Title - Bottom Left */}
          <div
            className="absolute z-10 transition-all duration-700"
            style={{
              bottom: '2rem',
              left: '2rem',
              opacity: isLoaded && (hoveredColumn === null || hoveredColumn !== index) ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${index * 150 + 400}ms`
            }}
          >
            <h2 className="text-white font-light tracking-wider lowercase text-2xl">
              {column.title}
            </h2>
          </div>

          {/* Title - Center */}
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
            <h2 className="text-white font-light tracking-wider lowercase text-4xl">
              {column.title}
            </h2>
          </div>
        </a>
      ))}
    </div>
  );
}