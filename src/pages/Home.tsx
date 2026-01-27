import React, { useState } from 'react';

export default function Home() {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

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
      return '20%'; // Equal distribution when no hover
    }
    if (hoveredColumn === index) {
      return '100%'; // Full screen expansion
    }
    return '0%'; // Hide other columns
  };

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {columns.map((column, index) => (
        <a
          key={column.id}
          href={column.link}
          className="relative overflow-hidden transition-all duration-500 ease-in-out"
          style={{ width: getColumnWidth(index) }}
          onMouseEnter={() => setHoveredColumn(index)}
          onMouseLeave={() => setHoveredColumn(null)}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{
              backgroundImage: `url(${column.image})`,
              transform: hoveredColumn === index ? 'scale(1.05)' : 'scale(1)'
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black transition-opacity duration-500"
            style={{ opacity: hoveredColumn === index ? 0.3 : 0.5 }}
          />

          {/* Title - Bottom Left (visible when not hovered or when no column is hovered) */}
          <div
            className="absolute z-10 transition-opacity duration-500"
            style={{
              bottom: '2rem',
              left: '2rem',
              opacity: hoveredColumn === null || hoveredColumn !== index ? 1 : 0
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

          {/* Title - Center (fades in only when THIS column is hovered) */}
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
        </a>
      ))}
    </div>
  );
}