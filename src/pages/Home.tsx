import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: '/poster_1.jpg',
    projectName: 'point 92',
    slug: 'point-92',
  },
  {
    image: '/images/Image2.avif',
    projectName: 'boh visitor centre',
    slug: 'boh-visitor-centre',
  },
  {
    image: '/poster_1.jpg',
    projectName: 'lantern hotel',
    slug: 'lantern-hotel',
  },
];

const SLIDE_DURATION = 5000;

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nameKey, setNameKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setNameKey((k) => k + 1);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }

        .fade-up {
          opacity: 0;
          animation: fadeUp 1s ease forwards;
        }

        .progress-bar {
          animation: progressBar ${SLIDE_DURATION}ms linear forwards;
        }

        .slide-img {
          transition: opacity 1.2s ease, transform 1.2s ease;
        }
      `}</style>

      <div
        className="transition-opacity duration-700"
        style={{ opacity: fadeIn ? 1 : 0 }}
      >
        <section className="relative w-full h-screen overflow-hidden">

          {/* Images */}
          {slides.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 slide-img"
              style={{
                backgroundImage: `url(${s.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: i === currentSlide ? 1 : 0,
                transform: i === currentSlide ? 'scale(1)' : 'scale(1.05)',
                zIndex: i === currentSlide ? 2 : 1,
              }}
            />
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45 z-10" />

          {/* Text — bottom, center-aligned */}
          <div className="absolute z-20 bottom-16 left-0 right-0 flex flex-col items-center text-white text-center px-8">
            <p
              className="fade-up text-xs tracking-[0.3em] lowercase font-light mb-4 opacity-60"
              style={{ animationDelay: '0.2s' }}
            >
              signature projects
            </p>

            <h1
              key={nameKey}
              className="fade-up text-4xl md:text-4xl font-extralight tracking-widest lowercase mb-8"
              style={{ animationDelay: '0.35s' }}
            >
              {slide.projectName}
            </h1>

            <Link
              to={`/projects/${slide.slug}`}
              className="fade-up inline-block text-xs tracking-[0.35em] font-light border-b border-white/50 pb-1 hover:border-white hover:opacity-100 opacity-70 transition-all duration-500 lowercase"
              style={{ animationDelay: '0.55s' }}
            >
              explore
            </Link>
          </div>

          {/* Slide indicators — bottom right */}
          <div className="absolute z-20 bottom-16 right-12 md:right-16 flex flex-col items-end gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentSlide(i); setNameKey((k) => k + 1); }}
                className="flex items-center gap-2 group"
              >
                <span className={`block h-px transition-all duration-700 ease-in-out ${
                  i === currentSlide ? 'w-10 bg-white' : 'w-4 bg-white/30 group-hover:bg-white/60 group-hover:w-6'
                }`} />
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15 z-20">
            <div
              key={`${currentSlide}-progress`}
              className="progress-bar h-full bg-white/50"
            />
          </div>

        </section>
      </div>
    </>
  );
}