import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useState } from 'react';

export default function Projects() {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages(prev => new Set(prev).add(imageUrl));
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="max-w-screen-2xl mx-auto px-8 py-16">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-6">projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            our portfolio represents a diverse range of architectural typologies, from intimate residences to large-scale urban interventions. each project is a unique response to site, program, and client aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group"
            >
              <div className="overflow-hidden mb-6 relative bg-gray-200">
                {!loadedImages.has(project.heroImage) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse flex space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className={`w-full h-[500px] object-cover transition-all duration-700 group-hover:scale-105 ${
                    loadedImages.has(project.heroImage) ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(project.heroImage)}
                />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-light tracking-wide group-hover:border-b border-black inline-block">
                  {project.title}
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
      </section>
    </div>
  );
}