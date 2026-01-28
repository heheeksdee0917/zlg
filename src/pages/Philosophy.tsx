import React, { useState, useEffect, useRef } from 'react';
import { philosophySections } from '../data/philosophy';

export default function Philosophy() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
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

  const renderSection = (section: typeof philosophySections[0], index: number) => {
    const isVisible = visibleSections[section.id];
    const isLastSection = index === philosophySections.length - 1;
  
    switch (section.type) {
      case 'text-image':
        return (
          <>
            <section
              ref={setRef(section.id)}
              data-section={section.id}
              className={`md:sticky md:top-0 md:h-screen bg-white flex items-center py-8 md:py-0`}
              style={{ zIndex: section.zIndex }}
            >
              <div className="max-w-screen-2xl mx-auto px-8 w-full">
                <div className={`grid md:grid-cols-2 gap-8`}>
                  {section.content.imagePosition === 'left' ? (
                    <>
                      <div className={`flex items-center justify-center transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        <div className="w-full" style={{ aspectRatio: '2/3' }}>
                          <img src={section.content.image} alt={section.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className={`flex flex-col justify-center transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`} style={{ transitionDelay: '200ms' }}>
                        <h3 className="text-base font-normal tracking-wide mb-4">{section.title}</h3>
                        {section.content.text?.map((paragraph, i) => (
                          <p key={i} className="text-base text-gray-700 leading-relaxed mb-4 last:mb-0">{paragraph}</p>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`flex flex-col justify-center transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        <h2 className="text-base font-normal tracking-wider mb-4">{section.title}</h2>
                        {section.content.text?.map((paragraph, i) => (
                          <p key={i} className="text-base text-gray-700 leading-relaxed mb-6 last:mb-0">{paragraph}</p>
                        ))}
                      </div>
                      <div className={`flex items-center justify-center transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`} style={{ transitionDelay: '200ms' }}>
                        <div className="w-full" style={{ aspectRatio: '2/3' }}>
                          <img src={section.content.image} alt={section.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
            {!isLastSection && <div className="h-32 md:h-64"></div>}
          </>
        );
  
      case 'quote-contrast':
        return (
          <>
            <section
              ref={setRef(section.id)}
              data-section={section.id}
              className={`md:sticky md:top-0 md:h-screen bg-white flex items-center py-8 md:py-0`}
              style={{ zIndex: section.zIndex }}
            >
              <div className="max-w-screen-2xl mx-auto px-8 w-full">
                <div className="space-y-16">
                  {/* First Quote */}
                  <blockquote className={`text-base font-light text-left italic text-gray-800 py-8 border-t border-b border-gray-300 transition-all duration-1000 ease-out lowercase ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    {section.content.quotes?.[0].quote}
                  </blockquote>
  
                  {/* Contrast Columns */}
                  <div className="grid md:grid-cols-2 gap-16">
                    {section.content.columns?.map((col, i) => (
                      <div key={i} className={`transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`} style={{ transitionDelay: `${(i + 2) * 100}ms` }}>
                        <h3 className="text-base font-normal tracking-wide mb-4">{col.title}</h3>
                        <p className="text-base text-gray-700 leading-relaxed text-left">{col.text}</p>
                      </div>
                    ))}
                  </div>
  
                  {/* Second Quote */}
                  <blockquote className={`text-base font-light text-left italic text-gray-800 py-8 border-t border-b border-gray-300 transition-all duration-1000 ease-out lowercase ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`} style={{ transitionDelay: '400ms' }}>
                    {section.content.quotes?.[1].quote}
                    {section.content.quotes?.[1].author && (
                      <span className="block text-base not-italic mt-4 text-gray-600">{section.content.quotes?.[1].author}</span>
                    )}
                  </blockquote>
                </div>
              </div>
            </section>
            {!isLastSection && <div className="h-32 md:h-64"></div>}
          </>
        );
  
      case 'text-only':
        return (
          <>
            <section
              ref={setRef(section.id)}
              data-section={section.id}
              className={`md:sticky md:top-0 md:h-screen bg-white flex items-center py-8 md:py-0`}
              style={{ zIndex: section.zIndex }}
            >
              <div className="max-w-screen-2xl mx-auto px-8 w-full">
                <div className={`text-left transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h3 className="text-base font-normal tracking-wide mb-4">{section.title}</h3>
                  {section.content.text?.map((paragraph, i) => (
                    <p key={i} className="text-base text-gray-700 leading-relaxed mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
            {!isLastSection && <div className="h-32 md:h-64"></div>}
          </>
        );
  

      case 'publications':
        return (
          <section
            ref={setRef(section.id)}
            data-section={section.id}
            className={`relative bg-white py-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            style={{ zIndex: section.zIndex }}
          >
            <div className="max-w-screen-2xl mx-auto px-8">
              <h2 className="text-base font-normal tracking-wider mb-4">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.content.publications?.map((pub, i) => (
                  <div key={i} className={`border border-gray-200 p-6 transition-all duration-1000 ease-out hover:shadow-lg flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`} style={{ transitionDelay: `${(i + 2) * 100}ms` }}>
                    <h3 className="text-sm font-normal tracking-wide mb-2 lowercase">{pub.title}</h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed text-left">{pub.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {philosophySections.map((section, index) => (
        <React.Fragment key={section.id}>
          {renderSection(section, index)}
        </React.Fragment>
      ))}
    </div>
  );
}