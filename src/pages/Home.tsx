import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { newsItems } from '../data/news';
import React, { useState, useEffect } from 'react';


export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const featuredProjects = projects.slice(0, 3);
  const latestNews = newsItems.slice(0, 2);

  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Signature architectural project"
            className="w-full h-[620px] md:h-[720px] lg:h-[820px] object-cover"
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
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-screen-2xl mx-auto px-4 pt-8 pb-32">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-medium tracking-wider mb-4">featured Projects</h2>
          <p className="text-gray-600 max-w-2xl font-light mx-auto">
            explore our portfolio of transformative architectural works that blend innovation, sustainability, and timeless elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group block transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2"
            >
              <div className="overflow-hidden mb-4">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-96 object-cover transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-light tracking-wide mb-2 relative inline-block">
                {project.title}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-500 ease-out group-hover:w-full"></span>
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

      {/* Philosophy Section */}
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

      {/* Latest News Section */}
      <section className="bg-white py-32">
        <div className="max-w-screen-2xl mx-auto px-8">
          <h2 className="text-3xl font-medium tracking-wider mb-16 text-center">latest news</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestNews.map((news) => (
              <Link
                key={news.id}
                to={`/news/${news.slug}`}
                className="group"
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
      <section className="max-w-screen-2xl mx-auto px-2 py-32 text-center">
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