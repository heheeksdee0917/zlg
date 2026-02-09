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

  return (
    <div className="h-screen w-full flex overflow-visible">
      {columns.map((column, index) => (
        <a
          key={column.id}
          href={column.link}
          className="relative flex-1"
          style={{ 
            height: '100%',
            zIndex: hoveredColumn === index ? 50 : 10,
          }}
          onMouseEnter={() => setHoveredColumn(index)}
          onMouseLeave={() => setHoveredColumn(null)}
        >
          {/* Container - no scaling */}
          <div 
            className="absolute inset-0 overflow-hidden"
          >
            {/* Background Image - scales on hover */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${column.image})`,
                transform: hoveredColumn === index ? 'scale(1.15)' : 'scale(1)',
                filter: hoveredColumn === index ? 'grayscale(0%) brightness(1.1)' : 'grayscale(50%) brightness(0.7)'
              }}
            />

            {/* Overlay - creates stronger contrast */}
            <div className="absolute inset-0 bg-black transition-opacity duration-500"
              style={{ opacity: hoveredColumn === index ? 0.1 : 0.3 }}
            />

            {/* Title - Bottom Left, Fade In */}
            <div
              className="absolute z-20 bottom-8 left-8 transition-opacity duration-700"
              style={{
                opacity: isLoaded ? 1 : 0,
                transitionDelay: `${index * 200}ms`
              }}
            >
              <h2 
                className="text-white font-light tracking-wider lowercase whitespace-nowrap text-2xl"
              >
                {column.title}
              </h2>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}