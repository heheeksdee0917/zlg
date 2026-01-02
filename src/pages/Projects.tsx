import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Projects() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < projects.length && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 4, projects.length));
            setLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, loading]);

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <div className={`min-h-screen pt-20 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <section className="max-w-screen-2xl mx-auto px-8 py-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-6">projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            our portfolio represents a diverse range of architectural typologies, from intimate residences to large-scale urban interventions. each project is a unique response to site, program, and client aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {visibleProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group block transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2"
            >
              <div className="overflow-hidden mb-6 bg-gray-200">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-[500px] object-cover transition-opacity duration-700"
                  loading="lazy"
                />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-light tracking-wide relative inline-block">
                  {project.title}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-500 ease-out group-hover:w-full"></span>
                </h2>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.category}</span>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Intersection Observer Target */}
        <div ref={observerRef} className="h-20 flex items-center justify-center mt-12">
          {loading && (
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}