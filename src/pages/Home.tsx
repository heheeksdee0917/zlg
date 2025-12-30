import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="relative h-screen">
        <img
          src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Signature architectural project"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-wider mb-6">
              zlg design
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide">
              crafting timeless spaces
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-8 py-32">
        <div className="mb-16">
          <h2 className="text-3xl font-medium tracking-wider mb-4">featured Projects</h2>
          <p className="text-gray-600 max-w-2xl font-light">
            explore our portfolio of transformative architectural works that blend innovation, sustainability, and timeless elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group"
            >
              <div className="overflow-hidden mb-4">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-light tracking-wide mb-2 group-hover:border-b border-black inline-block">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 font-light">
                {project.location} • {project.year}
              </p>
              <p className="text-sm text-gray-700 line-clamp-2 font-light">
                {project.shortDescription}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-sm tracking-wide border-b border-black hover:border-gray-400 transition-colors font-light"
          >
            <span>view all projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="relative h-screen">
        <img
          src="https://images.pexels.com/photos/1707823/pexels-photo-1707823.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Philosophy visualization"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
          <div className="max-w-3xl text-center px-8">
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

      <section className="bg-gray-50 py-32">
        <div className="max-w-screen-2xl mx-auto px-8">
          <h2 className="text-3xl font-medium tracking-wider mb-16 text-center">latest news</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group cursor-pointer">
              <div className="overflow-hidden mb-4">
                <img
                  src="https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=1920"
                  alt="Award announcement"
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-gray-500 mb-2 font-light">october 15, 2024</p>
              <h3 className="text-xl font-light tracking-wide mb-2">
                zlg wins awards
              </h3>
              <p className="text-sm text-gray-700 font-light">
                our urban tower project has been recognized with the prestigious International Architecture Excellence Award for sustainable design.
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="overflow-hidden mb-4">
                <img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920"
                  alt="New project announcement"
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-gray-500 mb-2 font-light">September 28, 2024</p>
              <h3 className="text-xl font-light tracking-wide mb-2">
                breaking Ground on Coastal Innovation Hub
              </h3>
              <p className="text-sm text-gray-700 font-light">
                Construction begins on our largest project to date—a 200,000 sq ft research and innovation center on the California coast.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-8 py-32 text-center">
        <h2 className="text-4xl font-medium tracking-wider mb-8">start your project</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 font-light">
          let's collaborate to create spaces that inspire, endure, and transform. reach out to discuss your vision.
        </p>
        <a
          href="mailto:info@zlgdesign.com"
          className="inline-block text-sm tracking-wide px-12 py-4 border border-black hover:bg-black hover:text-white transition-colors font-light"
        >
          contact us
        </a>
      </section>
    </div>
  );
}