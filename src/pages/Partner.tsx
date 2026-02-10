import React, { useState, useEffect, useRef } from 'react';
import { keyPartners, journeyPartners, signatureProjects } from '../data/partner';

export default function Partners() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    hero: true
  });
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Split journey partners into those with images and those without
  const partnersWithImages = journeyPartners.filter(p => p.image);
  const partnersTextOnly = journeyPartners.filter(p => !p.image);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
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
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section - Z-10 */}
      <section
        ref={setRef('hero')}
        data-section="hero"
        className="md:sticky md:top-0 h-screen flex items-center justify-center bg-white pt-28 pb-8 md:pt-28 md:pb-0"
        style={{ zIndex: 10 }}
      >
        {/* Blurred Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'blur(2px)',
            transform: 'scale(1.1)'
          }}
          poster="/v2_thumbnail.avif"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/zlg_v2.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className={`relative z-10 text-center px-8 max-w-4xl mx-auto transition-all duration-1000 ease-out ${visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-6 text-white lowercase">
            Key Partners
          </h1>
          <p className="text-lg md:text-xl text-white leading-relaxed font-light lowercase mb-8">
            Our partners are built on decades of collaboration with exceptional architects and designers who have shaped the built environment across continents. Together, we bring world-class expertise and a shared vision of design excellence.
          </p>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-8 md:h-16"></div>

      {/* Introduction Section - Z-20 */}
      <section
        ref={setRef('intro')}
        data-section="intro"
        className="md:sticky md:top-0 md:h-screen bg-white flex items-start py-8 md:py-0 relative"
        style={{ zIndex: 20 }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/langkawi.avif)',
            opacity: 0.2
          }}
        />

        {/* Content */}
        <div className={`relative z-10 w-full pt-8 md:pt-12 px-8 md:px-8 pb-8 transition-all duration-1000 ease-out ${visibleSections.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          <div className="max-w-screen-2xl mx-auto">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-light tracking-wider mb-8 lowercase text-black">Our Partnership Philosophy</h2>
              <div className="space-y-6">
                <p className="text-base text-black leading-relaxed font-light lowercase text-left">
                  zlg partners with a number of universities and design colleges among them the one academy and taylor's university. we believe in continuous research and lairing all practical work sharpened through a deep understanding of ongoing issues such as carbon storage and climate change, and global conservation efforts.
                </p>
                <p className="text-base text-black leading-relaxed font-light lowercase text-left">
                  our partners include individuals who share similar interests, often clients. among them are artists and artisans alike, and furniture makers and retailers such as atmos, bnr, TMOG and GTA interior designers.
                </p>
                <p className="text-base text-black leading-relaxed font-light lowercase text-left">
                  zlg also works closely with researchers and specialists often working together on life long relationships on projects. among them are scientists such as dr daniel cicuzza, dr brandon chee and dr nike baetzner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-8 md:h-16"></div>

      {/* Key Partners Section - Individual cards with sticky */}
      {keyPartners.map((partner, index) => (
        <React.Fragment key={partner.name}>
          <section
            ref={setRef(`partner-${index}`)}
            data-section={`partner-${index}`}
            className="md:sticky md:top-0 md:min-h-screen bg-white flex items-center py-8 md:py-16"
            style={{ zIndex: 30 + index }}
          >
            <div className="max-w-screen-2xl mx-auto px-8 w-full">
              <div className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-1000 ease-out ${visibleSections[`partner-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}>
                {index % 2 === 0 ? (
                  <>
                    <div className="w-full max-h-[70vh] md:max-h-[80vh] flex items-center">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full h-full aspect-[2/3] object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-base font-normal tracking-wide mb-2 lowercase">{partner.name}</h3>
                      <p className="text-base text-gray-600 mb-8 tracking-wide font-light lowercase">{partner.role}</p>
                      <div className="space-y-6 text-gray-700 leading-relaxed font-light lowercase text-left">
                        {partner.bio.map((paragraph, i) => (
                          <p key={i} className="text-base">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col justify-center order-2 md:order-1">
                      <h3 className="text-base font-normal tracking-wide mb-2 lowercase">{partner.name}</h3>
                      <p className="text-base text-gray-600 mb-8 tracking-wide font-light lowercase">{partner.role}</p>
                      <div className="space-y-6 text-gray-700 leading-relaxed font-light lowercase text-left">
                        {partner.bio.map((paragraph, i) => (
                          <p key={i} className="text-base">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                    <div className="w-full max-h-[70vh] md:max-h-[80vh] flex items-center order-1 md:order-2">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full h-full aspect-[2/3] object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
          <div className="h-8 md:h-16"></div>
        </React.Fragment>
      ))}

      {/* Partners Along the Journey & Signature Projects Section - Z-index continues */}
      <section
        ref={setRef('projects')}
        data-section="projects"
        className="md:sticky md:top-0 bg-white py-16"
        style={{ zIndex: 30 + keyPartners.length }}
      >
        <div className="max-w-screen-2xl mx-auto px-8 w-full">
          <div className={`transition-all duration-1000 ease-out ${visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            
            {/* Partners Along the Journey */}
            <div className="mb-16">
              <h4 className="text-base font-normal tracking-wide mb-8 lowercase">partners along the journey</h4>
              
              {/* 4 Partners with Images - 1 row, 4 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {partnersWithImages.map((partner, index) => (
                  <div 
                    key={partner.name}
                    className="transition-all duration-1000 ease-out"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-full aspect-[2/3] bg-gray-100 overflow-hidden mb-4">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h5 className="text-base font-normal tracking-wide mb-1 lowercase">{partner.name}</h5>
                    {partner.title && (
                      <p className="text-sm text-gray-600 font-light lowercase">{partner.title}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Text-only Partners */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                {partnersTextOnly.map((partner, index) => (
                  <div 
                    key={partner.name}
                    className="flex items-start text-base text-gray-700 font-light lowercase"
                  >
                    <span className="mr-3">•</span>
                    <span>{partner.name}{partner.title && `: ${partner.title}`}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Projects */}
            <div>
              <h4 className="text-base font-normal tracking-wide mb-8 lowercase">Signature Projects</h4>
              
              {/* 3 Projects with Images - 1 row, 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {signatureProjects.map((project, index) => (
                  <div 
                    key={project.title}
                    className="transition-all duration-1000 ease-out"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-full aspect-[2/3] bg-gray-100 overflow-hidden mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h5 className="text-base font-normal tracking-wide lowercase">{project.title}</h5>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-base text-gray-700 leading-relaxed font-light lowercase text-left mt-12">
              With over 22 years of experience working on very large and complex buildings across Europe and Asia, our partners bring unparalleled expertise in architectural design, interior design, and project delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-8 md:h-16"></div>

      {/* CTA Section - Final section */}
      <section
        ref={setRef('cta')}
        data-section="cta"
        className="relative bg-gray-50 py-16"
        style={{ zIndex: 30 + keyPartners.length + 1 }}
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className={`text-left transition-all duration-1000 ease-out ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <h2 className="text-base font-normal tracking-wider mb-4 lowercase">Become a Partner</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-8 font-light lowercase text-left">
              We're always interested in connecting with talented consultants, engineers, contractors, and fabricators who share our values. If you believe in design excellence and collaborative practice, let's talk.
            </p>
            <a
              href="mailto:info@zlgdesign.com"
              className="inline-block text-sm tracking-wide px-12 py-4 border border-black font-light relative overflow-hidden group lowercase"
            >
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">contact us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}