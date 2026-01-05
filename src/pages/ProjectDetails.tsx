import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setShowFullDescription(false);
    setCurrentImageIndex(0);
    setLightboxOpen(false);
    setZoom(1);
    setFadeIn(false);
    setVisibleSections({});
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [slug]);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  if (!project) {
    return (
      <div className="min-h-screen pt-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-wider mb-4">project not found</h1>
          <Link to="/projects" className="text-sm border-b border-black hover:border-gray-400 font-light">
            return to projects
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
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
  };

  const navigatePrevious = () => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setLightboxImage(project.images[newIndex]);
      setZoom(1);
    }
  };

  const navigateNext = () => {
    if (currentImageIndex < project.images.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setLightboxImage(project.images[newIndex]);
      setZoom(1);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const detailContent = project.detailContent || [];
  const hasContent = detailContent.length > 0;
  const shouldShowToggle = detailContent.length > 3;

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
    <div className={`min-h-screen pt-10 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <section className="grid md:grid-cols-3 gap-0">
        <div className="md:col-span-2 overflow-y-auto md:h-screen" ref={scrollContainerRef}>
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
                key={`${slug}-${index}`}
              />
            </div>
          ))}
        </div>

        <div className="bg-white md:sticky md:top-20 md:h-screen overflow-y-auto custom-scrollbar">
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-wider mb-2 lowercase">
                {project.title}
              </h1>
              <p className="text-sm text-gray-600 font-light lowercase">
                {project.location}, {project.year}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xs tracking-wider mb-4 font-light">project write-up</h3>
              {hasContent && (
                <>
                  {showFullDescription ? (
                    detailContent.map((block, index) => (
                      <div key={index} className="mb-6">
                        {block.heading && (
                          <h4 className="text-xl font-semibold tracking-wide mb-4 lowercase">
                            {block.heading}
                          </h4>
                        )}
                        <p className="text-gray-700 leading-relaxed font-light lowercase">
                          {block.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <>
                      {detailContent.slice(0, 3).map((block, index) => (
                        <div key={index} className="mb-6">
                          {block.heading && (
                            <h4 className="text-xl font-semibold tracking-wide mb-4 lowercase">
                              {block.heading}
                            </h4>
                          )}
                          <p className="text-gray-700 leading-relaxed font-light lowercase">
                            {block.content}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                  {shouldShowToggle && (
                    <button
                      onClick={toggleDescription}
                      className="mt-2 text-sm text-black border-b border-black hover:border-gray-400 transition-colors font-light"
                    >
                      {showFullDescription ? 'show less' : 'show more'}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={setRef('related')}
        data-section="related"
        className="bg-gray-50 py-32"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <h2 className={`text-3xl font-medium tracking-wider mb-16 transition-all duration-1000 ease-out ${
            visibleSections.related ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            related projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((relatedProject, index) => (
              <Link
                key={relatedProject.id}
                to={`/projects/${relatedProject.slug}`}
                className={`group transition-all duration-1000 ease-out ${
                  visibleSections.related ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="overflow-hidden mb-4">
                  <img
                    src={relatedProject.heroImage}
                    alt={relatedProject.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-light tracking-wide mb-2 group-hover:border-b border-black inline-block lowercase">
                  {relatedProject.title}
                </h3>
                <p className="text-sm text-gray-600 font-light lowercase">
                  {relatedProject.location} • {relatedProject.year}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
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

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-light text-sm z-10">
            {currentImageIndex + 1} / {project.images.length}
          </div>

          <div className="overflow-auto w-full h-full flex items-center justify-center p-4 md:p-8">
            <img
              src={lightboxImage}
              alt="Full size view"
              className="select-none transition-transform duration-200"
              style={{
                transform: `scale(${zoom})`,
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
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