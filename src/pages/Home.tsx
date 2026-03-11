import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: '/general/HomeCP_point92.avif',
    projectName: 'point 92',
    slug: 'point-92',
  },
  {
    image: '/projects/boh-visitor/CP.avif',
    projectName: 'boh visitor centre',
    slug: 'boh-visitor-centre',
  },
  {
    image: '/general/HomeCP_Lantern.avif',
    projectName: 'lantern hotel',
    slug: 'lantern-hotel',
  },
];

const SLIDE_DURATION = 3000;

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
          <div className="absolute inset-0 bg-black/25 z-10" />

          {/* Text — bottom, center-aligned */}
          <div className="absolute z-20 bottom-16 left-0 right-0 flex flex-col items-center text-white text-center px-8">
            <p
              className="fade-up text-xs tracking-[0.3em] lowercase font-light mb-1 opacity-60"
              style={{ animationDelay: '0.2s' }}
            >
              signature projects
            </p>

            <h1
              key={nameKey}
              className="fade-up text-4xl md:text-4xl font-bold tracking-widest lowercase mb-8"
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
                <span className={`block h-px transition-all duration-700 ease-in-out ${i === currentSlide ? 'w-10 bg-white' : 'w-4 bg-white/30 group-hover:bg-white/60 group-hover:w-6'
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

        {/* Philosophy Section */}
        <section className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row">

          {/* Video — full width on mobile, left half on desktop */}
          <video
            className="w-full h-1/2 md:w-1/2 md:h-full object-cover"
            style={{ opacity: 0.8, objectPosition: '10% center' }}
            src="/general/Philosophy_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/general/HomeCP_Philosophy.avif"
          />

          {/* Bottom half on mobile, right half on desktop — white background */}
          <div className="w-full h-1/2 md:w-1/2 md:h-full bg-white" />

          {/* Text — bottom center on mobile, overlaps on desktop */}
          <div className="absolute inset-0 z-10 flex items-end md:items-center pb-[50%] md:pb-0 px-8 md:px-0">
            <div className="md:ml-[45%] max-w-lg">
              <p className="text-2xl md:text-3xl font-normal leading-relaxed lowercase tracking-wide text-gray-900 mb-3">
                Thought is a form of necessary action,{' '}
                <br />a precursor to a possible work of art.
                <span className="text-xs tracking-widest font-light text-gray-500 ml-1 align-middle">
                  huat lim
                </span>
              </p>
              <a
                href="/philosophy"
                className="inline-block text-xs tracking-[0.25em] font-light border-b border-gray-400 pb-0.5 hover:border-gray-800 transition-all duration-300 lowercase text-gray-600 hover:text-gray-900 mt-4"
              >
                explore the mind
              </a>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}