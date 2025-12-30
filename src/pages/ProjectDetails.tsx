import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';
import { useState, useEffect } from 'react';


export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);

  if (!project) {
    return (
      <div className="min-h-screen pt-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-wider mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-sm border-b border-black hover:border-gray-400 font-light">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);

  const openLightbox = (image: string, index: number) => {
    setLightboxImage(image);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const navigatePrevious = () => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setLightboxImage(project.images[newIndex]);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const navigateNext = () => {
    if (currentImageIndex < project.images.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setLightboxImage(project.images[newIndex]);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (zoom > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && zoom > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Handle both string and array formats for fullDescription
// Handle both string and array formats for fullDescription
const paragraphs = project.fullDescription 
  ? (Array.isArray(project.fullDescription) 
      ? project.fullDescription 
      : project.fullDescription.split('\n').filter(p => p.trim() !== ''))
  : [];
const firstParagraph = paragraphs[0] || '';
const shouldShowToggle = paragraphs.length > 1;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigatePrevious();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

  return (
    <div className="min-h-screen pt-10">
      <section className="grid md:grid-cols-3 gap-0">
        <div className="md:col-span-2 overflow-y-auto md:h-screen">
          {project.images.map((image, index) => (
            <div 
              key={index}
              className="w-full cursor-pointer mb-[5px]"
              onClick={() => openLightbox(image, index)}
            >
              <img
                src={image}
                alt={`${project.title} - Image ${index + 1}`}
                className="w-full h-auto object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        <div className="bg-white p-8 md:p-12 md:sticky md:top-20 md:h-screen overflow-hidden flex flex-col">
          <h1 className="text-3xl font-bold tracking-wider mb-4">{project.title}</h1>

          <div className="space-y-4 mb-8 text-sm text-gray-600 font-light">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Year</span>
              <span>{project.year}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Location</span>
              <span>{project.location}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Category</span>
              <span>{project.category}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Client</span>
              <span>{project.client}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Area</span>
              <span>{project.area}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider mb-3 font-light">Materials</h3>
            <div className="flex flex-wrap gap-2">
              {project.materials.map((material) => (
                <span
                  key={material}
                  className="text-xs px-3 py-1 border border-gray-300 tracking-wide font-light"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex-1 overflow-hidden flex flex-col">
            <h3 className="text-xs uppercase tracking-wider mb-4 font-light">Project Write-up</h3>
            <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
              {showFullDescription ? (
                paragraphs.map((paragraph, index) => (
                  paragraph === '' ? (
                    <div key={index} className="mb-4"></div>
                  ) : (
                    <p key={index} className="text-gray-700 leading-relaxed font-light mb-4">
                      {paragraph}
                    </p>
                  )
                ))
              ) : (
                <p className="text-gray-700 leading-relaxed font-light mb-4">
                  {firstParagraph}
                </p>
              )}
              {shouldShowToggle && (
                <button
                  onClick={toggleDescription}
                  className="mt-2 text-sm text-black border-b border-black hover:border-gray-400 transition-colors font-light"
                >
                  {showFullDescription ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-32">
        <div className="max-w-screen-2xl mx-auto px-8">
          <h2 className="text-3xl font-medium tracking-wider mb-16">Related Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((relatedProject) => (
              <Link
                key={relatedProject.id}
                to={`/projects/${relatedProject.slug}`}
                className="group"
              >
                <div className="overflow-hidden mb-4">
                  <img
                    src={relatedProject.heroImage}
                    alt={relatedProject.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-light tracking-wide mb-2 group-hover:border-b border-black inline-block">
                  {relatedProject.title}
                </h3>
                <p className="text-sm text-gray-600 font-light">
                  {relatedProject.location} • {relatedProject.year}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="text-white hover:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Zoom out"
            >
              <ZoomOut size={24} />
            </button>
            <span className="text-white font-light">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="text-white hover:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Zoom in"
            >
              <ZoomIn size={24} />
            </button>
          </div>

          {/* Navigation Arrows */}
          {currentImageIndex > 0 && (
            <button
              onClick={navigatePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {currentImageIndex < project.images.length - 1 && (
            <button
              onClick={navigateNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-light text-sm z-10">
            {currentImageIndex + 1} / {project.images.length}
          </div>

          <div className="overflow-hidden w-full h-full flex items-center justify-center p-4 md:p-8">
            <div
              className="transition-transform duration-200"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              }}
            >
              <img
                src={lightboxImage}
                alt="Full size view"
                className="select-none"
                style={{ 
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}