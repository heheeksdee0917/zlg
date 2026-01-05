import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { newsItems } from '../data/news';
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  const featuredProjects = projects.slice(0, 3);
  const latestNews = newsItems.slice(0, 2);

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
            className="absolute top-8 right-8 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded text-sm font-light tracking-wide transition-all"
            aria-label={isVideoPaused ? 'Play video' : 'Pause video'}
          >
            {isVideoPaused ? 'play' : 'pause'}
          </button>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end justify-center pb-16">
            <div className="text-center text-white px-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-wider mb-4">
                zlg design
              </h1>
              <p className="text-base md:text-lg font-light tracking-wide">
                crafting timeless spaces
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="pt-16 pb-32">
        <div className="mb-12 text-center max-w-screen-2xl mx-auto px-4">
          <h2 className="text-3xl font-medium tracking-wider mb-4">featured projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              ref={index === 0 ? setRef('featured') : undefined}
              data-section={index === 0 ? 'featured' : undefined}
              className={`group block relative overflow-hidden transition-all duration-1000 ease-out ${
                visibleSections.featured ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-xl font-light tracking-wide mb-2 relative inline-block">
                  {project.title}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                </h3>
                <p className="text-sm mb-2 font-light opacity-90">
                  {project.location} • {project.year}
                </p>
                <p className="text-sm line-clamp-2 font-light opacity-80">
                  {project.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className={`text-center mt-32 max-w-screen-2xl mx-auto px-4 transition-all duration-1000 ease-out delay-500 ${
          visibleSections.featured ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-3xl font-medium tracking-wider mb-4">our collections</h2>
          <p className="text-gray-600 max-w-2xl font-light mx-auto mb-8">
            explore our portfolio of transformative architectural works that blend innovation, sustainability, and timeless elegance.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-sm tracking-wide border-b border-black hover:border-gray-400 transition-colors font-light"
          >
            <span>view all projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section 
        ref={setRef('philosophy')}
        data-section="philosophy"
        className={`relative h-screen transition-all duration-1000 ease-out ${
          visibleSections.philosophy ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <img
          src="https://images.pexels.com/photos/1707823/pexels-photo-1707823.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Philosophy visualization"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
          <div className={`max-w-3xl text-center px-8 transition-all duration-1000 ease-out delay-300 ${
            visibleSections.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-4xl font-medium tracking-wider mb-8">our philosophy</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-light">
              we believe architecture is an act of transformation—a dialogue between instinct and intention, tradition and innovation. Each project is a narrative crafted through sustainable design, material authenticity, and spatial poetry.
            </p>
            <Link
              to="/philosophy"
              className="inline-flex items-center space-x-2 text-sm tracking-wide border-b border-black hover:border-gray-400 transition-colors font-light"
            >
              <span>our approach</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section 
        ref={setRef('news')}
        data-section="news"
        className="bg-white py-32"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <h2 className={`text-3xl font-medium tracking-wider mb-16 text-center transition-all duration-1000 ease-out ${
            visibleSections.news ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            latest news
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestNews.map((news, index) => (
              <Link
                key={news.id}
                to={`/news/${news.slug}`}
                className={`group transition-all duration-1000 ease-out ${
                  visibleSections.news ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="overflow-hidden mb-4">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-2 font-light lowercase">{news.date}</p>
                <h3 className="text-xl font-light tracking-wide mb-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-700 font-light">
                  {news.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={setRef('contact')}
        data-section="contact"
        className={`max-w-screen-2xl mx-auto px-2 py-32 text-center transition-all duration-1000 ease-out ${
          visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <h2 className="text-4xl font-medium tracking-wider mb-8">start your project</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 font-light">
          let's collaborate to create spaces that inspire, endure, and transform. reach out to discuss your vision.
        </p>
        <a
          href="mailto:info@zlgdesign.com"
          className="inline-block text-sm tracking-wide px-12 py-4 border border-black font-light relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">contact us</span>
        </a>
      </section>
    </div>
  );
}