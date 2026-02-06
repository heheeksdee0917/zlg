import React, { useState, useEffect } from 'react';

export default function HomeMobile() {
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
      image: '/images/Image2.avif'
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
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {columns.map((column, index) => (
        <a
          key={column.id}
          href={column.link}
          className="relative overflow-hidden"
          style={{ 
            width: '100%',
            height: '20%',
            transform: isLoaded ? 'translateX(0)' : 'translateX(-100%)',
            transition: `transform 800ms ease-in-out ${index * 150}ms`,
          }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${column.image})`,
              filter: 'grayscale(100%)' 
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50" />

          {/* Title */}
          <div
            className="absolute z-10"
            style={{
              bottom: '2rem',
              left: '2rem',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 700ms, transform 700ms`,
              transitionDelay: `${index * 150 + 400}ms`
            }}
          >
            <h2 className="text-white font-light tracking-wider lowercase text-xl">
              {column.title}
            </h2>
          </div>
        </a>
      ))}
    </div>
  );
}