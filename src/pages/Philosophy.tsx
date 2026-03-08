import React, { useState, useEffect, useRef } from 'react';
import { philosophySections } from '../data/philosophy';

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 200);
  const imageBlur = Math.min(10, (scrollY - 100) / 30);
  const overlayOpacity = Math.min(1, (scrollY - 100) / 200) * Math.max(0, 1 - (scrollY - 500) / 200);
  const overlayTranslateY = Math.max(0, 40 - (scrollY - 100) / 10);
  const secondOpacity = Math.min(1, (scrollY - 700) / 300);
  const secondTranslateY = Math.max(0, 40 - (scrollY - 700) / 10);

  return (
    <section className="relative h-[300vh]" style={{ scrollSnapType: 'y mandatory' }}>
      <div style={{ scrollSnapAlign: 'start', height: '100vh' }} />
      <div style={{ scrollSnapAlign: 'start', height: '100vh' }} />
      <div style={{ scrollSnapAlign: 'start', height: '100vh' }} />

      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ marginTop: '-300vh' }}>
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url('/your-philosophy-image-here.jpg')`,
            backgroundPosition: 'center 70%',
            marginTop: '32px',
            filter: `blur(${Math.max(0, imageBlur)}px)`,
            transform: 'scale(1.05)',
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
          style={{ opacity: heroOpacity, transition: 'none' }}
        >
          <p className="text-xs tracking-[0.3em] lowercase font-light text-white/60 mb-4">our thinking</p>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-widest lowercase text-white">philosophy</h1>
        </div>
        <div
          className="absolute inset-0 flex items-center px-8 max-w-screen-2xl mx-auto"
          style={{ opacity: overlayOpacity, transform: `translateY(${overlayTranslateY}px)`, transition: 'none' }}
        >
          <div className="max-w-xl">
            <h2 className="text-base font-normal tracking-wider mb-4 lowercase underline text-white">Our Philosophy</h2>
            <p className="text-base text-white/90 leading-relaxed lowercase text-left">
              In 1992 when susanne and me started thinking of doing competitions our focus was only design and ever since our work revolved around ideas and concepts that go beyond what was then always a pre-defined architectural pursuit or entity. We had simply wanted to do architecture that would not only engage the human spirit, but also something with a deep philosophy behind the work.
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 flex items-center px-8 max-w-screen-2xl mx-auto"
          style={{ opacity: secondOpacity, transform: `translateY(${secondTranslateY}px)`, transition: 'none' }}
        >
          <div className="max-w-xl">
            <p className="text-base text-white/90 leading-relaxed lowercase text-left">
              I think architecture is taking much longer to becoming like what good art is, it is not so generative and it is not always assuming an emotive role, like a good work of art does. We think that it is possible for us to connect to our buildings as easily as we can connect to art, or to our music, or to things that we adore, like our children or our books.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Philosophy() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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

  const renderSection = (section: typeof philosophySections[0], index: number) => {
    const isVisible = visibleSections[section.id];

    switch (section.type) {
      case 'text-image':
        return (
          <section
            key={section.id}
            ref={setRef(section.id)}
            data-section={section.id}
            className="bg-white py-24 "
          >
            <div className="max-w-screen-2xl mx-auto px-8 w-full">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16">

                {/* Title — always left */}
                <div className={`flex flex-col justify-start transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <h2 className="text-4xl font-normal tracking-wider">{section.title}</h2>
                </div>

                {/* Content — always right */}
                <div className={`flex flex-col justify-start transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
                  {section.content.text?.map((p, i) => (
                    <p key={i} className="text-base text-gray-700 leading-relaxed mb-6 last:mb-0">{p}</p>
                  ))}
                </div>

              </div>
            </div>
          </section>
        );

      case 'quote-only':
        return (
          <section
            key={section.id}
            ref={setRef(section.id)}
            data-section={section.id}
            className="bg-white py-24 "
          >
            <div className="max-w-screen-2xl mx-auto px-8">
              <blockquote className={`text-base font-light text-left italic text-gray-800 py-8 border-t border-b border-gray-300 transition-all duration-1000 ease-out lowercase ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {section.content.quote}
                {section.content.quoteAuthor && (
                  <span className="block text-base not-italic mt-4 text-gray-600">{section.content.quoteAuthor}</span>
                )}
              </blockquote>
            </div>
          </section>
        );

      case 'columns-only':
        return (
          <section
            key={section.id}
            ref={setRef(section.id)}
            data-section={section.id}
            className="bg-white py-24 "
          >
            <div className="max-w-screen-2xl mx-auto px-8">
              <div className="grid md:grid-cols-2 gap-16">
                {section.content.columns?.map((col, i) => (
                  <div key={i} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                    <h3 className="text-base font-normal tracking-wide mb-4">{col.title}</h3>
                    <p className="text-base text-gray-700 leading-relaxed text-left">{col.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

        case 'text-only':
          return (
            <section
              key={section.id}
              ref={setRef(section.id)}
              data-section={section.id}
              className="bg-white py-24  relative min-h-[60vh] flex items-center"
              style={{ justifyContent: section.content.layout === 'center' ? 'center' : 'flex-start' }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${section.content.image})`, opacity: 0.5 }} />
              <div className={`relative z-10 transition-all duration-1000 ease-out px-8
                ${section.content.layout === 'center' ? 'max-w-2xl mx-auto text-left' : 'w-full md:pl-28 md:pr-16'}
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}>
                <h3 className="text-2xl font-light tracking-wide mb-6 text-black lowercase">{section.title}</h3>
                {section.content.text?.map((p, i) => (
                  <p key={i} className="text-base text-black leading-relaxed mb-4 last:mb-0 lowercase">{p}</p>
                ))}
              </div>
            </section>
          );

      case 'publications':
        return (
          <section
            key={section.id}
            ref={setRef(section.id)}
            data-section={section.id}
            className={`relative bg-white py-24  transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="max-w-screen-2xl mx-auto px-8">
              <h2 className="text-base font-normal tracking-wider mb-8">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.content.publications?.map((pub, i) => (
                  <div key={i} className={`border border-gray-200 transition-all duration-1000 ease-out hover:shadow-lg flex flex-col overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${(i + 2) * 100}ms` }}>
                    <div className="w-full aspect-[2/3] bg-gray-100 overflow-hidden">
                      <img src={pub.image} alt={pub.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-sm font-normal tracking-wide mb-2 lowercase">{pub.title}</h3>
                      <p className="text-sm text-gray-600 font-light leading-relaxed text-left">{pub.description}</p>
                    </div>
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
      <HeroSection />
      <div className="flex flex-col">
        {philosophySections.map((section, index) => (
          <React.Fragment key={section.id}>
            {renderSection(section, index)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}