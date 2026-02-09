import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import LazyLoading from '../components/LazyLoading';

export default function Projects() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen pt-28 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <section className="max-w-screen-2xl mx-auto px-8 py-8">
        <div className="mb-8 text-left">
          <h1 className="text-base font-normal tracking-wider mb-4 lowercase">projects</h1>
          <p className="text-base text-gray-600 lowercase text-left">
            our portfolio represents a diverse range of architectural typologies, from intimate residences to large-scale urban interventions. each project is a unique response to site, program, and client aspirations.
          </p>
        </div>

        <LazyLoading
          items={projects}
          initialCount={8}
          loadMoreCount={8}
          visibleSections={{}}
          threshold={0.1}
        >
          {(visibleProjects) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {visibleProjects.map((project, index) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group block transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2"
                  style={{
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    animationDelay: `${(index % 8) * 0.05}s`,
                    opacity: 0
                  }}
                >
                  <div className="overflow-hidden mb-6 bg-gray-200">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full aspect-[2/3] object-cover transition-opacity duration-700 object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="space-y-3 text-left">
                    <h2 className="text-base font-normal tracking-wide relative inline-block lowercase">
                      {project.title}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-500 ease-out group-hover:w-full"></span>
                    </h2>

                    <div className="flex items-center space-x-4 text-base text-gray-600 lowercase">
                      <span>{project.year}</span>
                      <span>•</span>
                      <span>{project.location}</span>
                    </div>

                    <p className="text-base text-gray-700 leading-relaxed lowercase text-left">
                      {project.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </LazyLoading>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}