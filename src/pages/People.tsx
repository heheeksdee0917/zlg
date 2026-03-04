import React, { useState, useEffect, useRef } from 'react';
import { keyPartners, team } from '../data/partner';
import type { Team } from '../data/partner';
import LazyLoading from '../components/LazyLoading';

export default function People() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    intro: true
  });
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

  return (
    <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>

      {/* Hero Intro — Rolex-style pinned scroll */}
      <section className="relative h-[200vh]">

        {/* Sticky pinned image — stays in place while text scrolls over */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/People/zlg_group.jpeg')`,
              marginTop: '32px',
              transform: 'scale(0.88)',
            }}
          />
          {/* Subtle dark overlay always present */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Text block — scrolls up naturally over the pinned image */}
        <div className="relative z-10 -mt-[40vh] px-8 pt-24 pb-24 max-w-screen-2xl mx-auto">
          <div
            className="inline-block px-10 py-12 max-w-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <h2 className="text-base font-normal tracking-wider mb-4 lowercase underline text-white">Our Team</h2>
            <p className="text-base text-white/90 leading-relaxed lowercase text-left">
              ZLG Design is a collective of architects, designers, and thinkers united by a shared passion for creating meaningful spaces. Our diverse backgrounds and expertise enable us to approach each project with fresh perspectives and rigorous craft.
            </p>
          </div>
        </div>

      </section>

      {/* Key Partners + Team Grid */}
      <section
        ref={setRef('intro')}
        data-section="intro"
        className="max-w-screen-2xl mx-auto px-8 pb-16"
      >
        {/* Key Partners Section */}
        {keyPartners.map((partner, index) => (
          <React.Fragment key={partner.name}>
            <section
              ref={setRef(`partner-${index}`)}
              data-section={`partner-${index}`}
              className="bg-white flex items-center py-8 md:py-16"
            >
              <div className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center w-full transition-all duration-1000 ease-out ${visibleSections[`partner-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}>
                {index % 2 === 0 ? (
                  <>
                    <div className="w-full overflow-hidden">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full aspect-[2/3] object-cover object-center"
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
                    <div className="w-full overflow-hidden order-1 md:order-2">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full aspect-[2/3] object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </>
                )}
              </div>
            </section>
          </React.Fragment>
        ))}

        {/* Team Grid */}
        <LazyLoading
          items={team}
          initialCount={4}
          loadMoreCount={4}
          visibleSections={visibleSections}
        >
          {(displayedTeam) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {displayedTeam.map((member: Team, index: number) => (
                <div
                  key={member.id}
                  ref={index === 0 ? setRef('team') : undefined}
                  data-section={index === 0 ? 'team' : undefined}
                  className={`group transition-all duration-1000 ease-out ${visibleSections.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="overflow-hidden mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-[2/3] object-cover"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  <h3 className="text-base font-normal tracking-wide mb-1 lowercase">{member.name}</h3>
                  <p className="text-base text-gray-600 mb-4 tracking-wide">{member.role}</p>
                </div>
              ))}
            </div>
          )}
        </LazyLoading>
      </section>

      {/* CTA */}
      <section
        ref={setRef('cta')}
        data-section="cta"
        className="bg-gray-50 py-16"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className={`text-left transition-all duration-1000 ease-out ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <h2 className="text-base font-normal tracking-wider mb-4 lowercase underline">Join Our Team</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-8 lowercase text-left">
              We are always seeking talented architects and designers who share our commitment to excellence, sustainability, and thoughtful design. If you are passionate about creating spaces that matter, we would love to hear from you.
            </p>
            <a
              href="mailto:info@zlgdesign.com"
              className="inline-block text-sm tracking-wide px-12 py-4 border border-black font-light relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 lowercase">join the team</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}