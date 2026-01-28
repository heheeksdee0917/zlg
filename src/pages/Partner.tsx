import React, { useState, useEffect, useRef } from 'react';
import { keyPartners, journeyPartners, signatureProjects } from '../data/partner';

export default function Partners() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    hero: true
  });
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    setFadeIn(false);
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
        className="md:sticky md:top-0 h-screen flex items-center justify-center bg-white py-8 md:py-0"
        style={{ zIndex: 10 }}
      >
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/poster_1.jpg)',
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className={`relative z-10 text-center px-8 max-w-4xl mx-auto transition-all duration-1000 ease-out ${
          visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
      <div className="md:h-screen"></div>

      {/* Introduction Section - Z-20 */}
      <section
        ref={setRef('intro')}
        data-section="intro"
        className="md:sticky md:top-0 md:h-screen bg-white flex items-center py-8 md:py-0"
        style={{ zIndex: 20 }}
      >
        <div className="max-w-screen-2xl mx-auto px-8 w-full">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
            visibleSections.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-2xl font-light tracking-wider mb-8 lowercase">Our Partnership Philosophy</h2>
            <p className="text-base text-gray-700 leading-relaxed font-light lowercase text-left mb-6">
              zlg partners with a number of universities and design colleges among them the one academy and taylor's university. we believe in continuous research and lairing all practical work sharpened through a deep understanding of ongoing issues such as carbon storage and climate change, and global conservation efforts.
            </p>
            <p className="text-base text-gray-700 leading-relaxed font-light lowercase text-left mb-6">
              our partners include individuals who share similar interests, often clients. among them are artists and artisans alike, and furniture makers and retailers such as atmos, bnr, TMOG and GTA interior designers.
            </p>
            <p className="text-base text-gray-700 leading-relaxed font-light lowercase text-left">
              zlg also works closely with researchers and specialists often working together on life long relationships on projects. among them are scientists such as dr daniel cicuzza, dr brandon chee and dr nike baetzner.
            </p>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="md:h-screen"></div>

      {/* Key Partners Section - Individual cards with sticky */}
      {keyPartners.map((partner, index) => (
        <React.Fragment key={partner.name}>
          <section
            ref={setRef(`partner-${index}`)}
            data-section={`partner-${index}`}
            className="md:sticky md:top-0 md:h-screen bg-white flex items-center py-8 md:py-0"
            style={{ zIndex: 30 + index }}
          >
            <div className="max-w-screen-2xl mx-auto px-8 w-full">
              <div className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ease-out ${
                visibleSections[`partner-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                {index % 2 === 0 ? (
                  <>
                    <div>
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full aspect-[2/3] object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
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
                    <div>
                      <h3 className="text-base font-normal tracking-wide mb-2 lowercase">{partner.name}</h3>
                      <p className="text-base text-gray-600 mb-8 tracking-wide font-light lowercase">{partner.role}</p>
                      <div className="space-y-6 text-gray-700 leading-relaxed font-light lowercase text-left">
                        {partner.bio.map((paragraph, i) => (
                          <p key={i} className="text-base">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full aspect-[2/3] object-cover"
                        loading="lazy"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
          <div className="md:h-screen"></div>
        </React.Fragment>
      ))}

      {/* Projects Section - Z-index continues */}
      <section
        ref={setRef('projects')}
        data-section="projects"
        className="md:sticky md:top-0 md:h-screen bg-white flex items-center py-8 md:py-0"
        style={{ zIndex: 30 + keyPartners.length }}
      >
        <div className="max-w-screen-2xl mx-auto px-8 w-full">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
            visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h4 className="text-base font-normal tracking-wide mb-4 lowercase">partners along the journey</h4>
                <ul className="space-y-3 text-gray-700 font-light lowercase text-left">
                  {journeyPartners.map((partner, index) => (
                    <li key={index} className="flex items-start text-base">
                      <span className="mr-3">•</span>
                      <span>{partner.name}{partner.title && `: ${partner.title}`}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-base font-normal tracking-wide mb-4 lowercase">Signature Projects</h4>
                <ul className="space-y-3 text-gray-700 font-light lowercase text-left">
                  {signatureProjects.map((project, index) => (
                    <li key={index} className="flex items-start text-base">
                      <span className="mr-3">•</span>
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-base text-gray-700 leading-relaxed font-light lowercase text-left">
              With over 22 years of experience working on very large and complex buildings across Europe and Asia, our partners bring unparalleled expertise in architectural design, interior design, and project delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="md:h-screen"></div>

      {/* CTA Section - Final section */}
      <section
        ref={setRef('cta')}
        data-section="cta"
        className="relative bg-gray-50 py-16"
        style={{ zIndex: 30 + keyPartners.length + 1 }}
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className={`text-left max-w-4xl mx-auto transition-all duration-1000 ease-out ${
            visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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