import { Link } from 'react-router-dom';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { projects } from '../data/projects';
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const featuredProjects = projects.slice(0, 3);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsVideoPaused(!isVideoPaused);
    }
  };

  useEffect(() => {
    setFadeIn(false);
    // Set philosophy section as visible immediately
    setVisibleSections({ philosophy: true });
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="relative">
          <video
            ref={videoRef}
            src="/hero_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[820px] md:h-[720px] lg:h-[820px] object-cover"
          />
          <button
            onClick={toggleVideo}
            className="absolute bottom-8 right-8 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full text-sm font-light tracking-wide transition-all"
            aria-label={isVideoPaused ? 'Play video' : 'Pause video'}
          >
            {isVideoPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end justify-start pb-16 pl-8">
            <div className="text-left text-white">
              <h1 className="text-base font-normal tracking-wider mb-2 underline">
                zlg design
              </h1>
              <p className="text-base font-light tracking-wide">
                crafting timeless spaces
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section
        ref={setRef('philosophy')}
        data-section="philosophy"
        className={`bg-white transition-all duration-1000 ease-out ${visibleSections.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="max-w-screen-2xl mx-auto px-8 py-16">
          {/* Description */}
          <div className={`transition-all duration-1000 ease-out ${visibleSections.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
            <p className="text-base text-gray-700 font-light italic leading-relaxed mb-8 lowercase text-left">
              True design connects deeply, like great art or music.
              <br />We nurture only concepts rich in tension, juxtaposition, and poetic resonance, revealing lasting emotional depth in every built form.
            </p>
          </div>

          {/* CTA Button */}
          <div className={`transition-all duration-1000 ease-out ${visibleSections.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
            <Link
              to="/philosophy"
              className="inline-flex items-center space-x-2 text-sm tracking-wide font-light group"
            >
              <span className="relative">
                explore our philosophy
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-500 ease-out group-hover:w-full"></span>
              </span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* People Section */}
      <section
        ref={setRef('people')}
        data-section="people"
        className={`max-w-screen-2xl mx-auto px-8 py-16 transition-all duration-1000 ease-out ${visibleSections.people ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <h2 className="text-base font-normal tracking-wider mb-4 underline">people section</h2>
        <div>
          {/* Description */}
          <div className={`transition-all duration-1000 ease-out ${visibleSections.people ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
            <p className="text-base text-gray-700 font-light italic leading-relaxed lowercase text-left">
              pending info...
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="pt-2 pb-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              ref={index === 0 ? setRef('featured') : undefined}
              data-section={index === 0 ? 'featured' : undefined}
              className={`group block relative overflow-hidden transition-all duration-1000 ease-out ${visibleSections.featured ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative w-full" style={{ aspectRatio: '2/3' }}>
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white lowercase">
                <h3 className="text-base font-light tracking-wide mb-2 relative inline-block">
                  {project.title}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                </h3>
                <p className="text-base mb-2 font-light opacity-90">
                  {project.location} • {project.year}
                </p>
                <p className="text-base line-clamp-2 font-light opacity-80">
                  {project.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mb-12 max-w-screen-2xl mx-auto px-8 mt-12">
          <p className="text-base text-gray-600 font-light text-left mb-8">
            explore our portfolio of transformative architectural works that blend innovation, sustainability, and timeless elegance.
          </p>
        </div>
        {/* Left-aligned button */}
        <div className="max-w-screen-2xl mx-auto px-8">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-sm tracking-wide font-light group"
          >
            <span className="relative">
              our projects
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-500 ease-out group-hover:w-full"></span>
            </span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Publications Section */}
      <section
        ref={setRef('publications')}
        data-section="publications"
        className={`max-w-screen-2xl mx-auto px-8 py-16 transition-all duration-1000 ease-out ${visibleSections.publications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <h2 className="text-base font-normal tracking-wider mb-4 underline">publications section</h2>
        <div>
          {/* Description */}
          <div className={`transition-all mt-4 duration-1000 ease-out ${visibleSections.publications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
            <p className="text-base text-gray-700 font-light italic leading-relaxed lowercase text-left">
              pending info...
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={setRef('contact')}
        data-section="contact"
        className={`max-w-screen-2xl mx-auto px-8 py-16 transition-all duration-1000 ease-out ${visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <h2 className="text-base font-normal tracking-wider mb-4 underline">start your project</h2>
        <p className="text-base text-gray-700 font-light mb-8 text-left">
          let's collaborate to create spaces that inspire, endure, and transform. reach out to discuss your vision.
        </p>
        <div className={`transition-all duration-1000 ease-out ${visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 text-sm tracking-wide font-light group"
            >
              <span className="relative">
                contact us
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-500 ease-out group-hover:w-full"></span>
              </span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
      </section>
    </div>
  );
}