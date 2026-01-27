import React, { useState, useEffect, useRef } from 'react';
import { keyPartners, companyTimeline, journeyPartners, signatureProjects } from '../data/partner';

export default function Partners() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    intro: true,
    timeline: true
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
    <div className={`min-h-screen transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <section
        ref={setRef('intro')}
        data-section="intro"
        className="relative bg-white max-w-screen-2xl mx-auto px-8 py-16"
      >
        <div className={`mb-16 transition-all duration-1000 ease-out ${visibleSections.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          <h2 className="text-base font-normal tracking-wider mb-4 lowercase underline">Key Partners</h2>
          <p className="text-base text-gray-700 leading-relaxed font-light lowercase text-left">
            Our partners are built on decades of collaboration with exceptional architects and designers who have shaped the built environment across continents. Together, we bring world-class expertise and a shared vision of design excellence.
          </p>
          <br />
          <p className="text-base">
            zlg partners with a number of universities and design colleges among them the one academy and taylor's university. we believe in continuous research and lairing all practical work sharpened through a deep understanding of ongoing issues such as carbon storage and climate change, and global conservation efforts.
          </p>
          <br />
          <p className="text-base">
            our partners include individuals who share similar interests, often clients. among them are artists and artisans alike, and furniture makers and retailers such as atmos, bnr, TMOG and GTA interior designers.
          </p>
          <br />
          <p className="text-base">
            zlg also works closely with researchers and specialists often working together on life long relationships on projects. among them are scientists such as dr daniel cicuzza, dr brandon chee and dr nike baetzner.
          </p>
        </div>

        <div className="space-y-32">
          {keyPartners.map((partner, index) => (
            <div
              key={partner.name}
              ref={setRef(`partner-${index}`)}
              data-section={`partner-${index}`}
              className={`grid md:grid-cols-2 gap-16 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''} transition-all duration-1000 ease-out ${visibleSections[`partner-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}>
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="aspect-[2/3] w-full h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''} transition-all duration-1000 ease-out delay-300 ${visibleSections[`partner-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}>
                <h3 className="text-base font-normal tracking-wide mb-2 lowercase underline">{partner.name}</h3>
                <p className="text-base text-gray-600 mb-8 tracking-wide font-light lowercase">{partner.role}</p>

                <div className="space-y-6 text-gray-700 leading-relaxed font-light lowercase text-left">
                  {partner.bio.map((paragraph, i) => (
                    <p key={i} className="text-base">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parallax Middle Section */}
      <section
        ref={setRef('legacy')}
        data-section="legacy"
        className={`relative h-96 overflow-hidden transition-all duration-1000 ease-out ${visibleSections.legacy ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(/poster_1.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-start pl-8">
          <div className={`text-left px-8 transition-all duration-1000 ease-out delay-300 ${visibleSections.legacy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <h2 className="text-base font-normal tracking-wider text-black lowercase underline">
              break section (refresh purpose)....
            </h2>
          </div>
        </div>
      </section>

      {/* Company Timeline Section */}
      <section
        ref={setRef('timeline')}
        data-section="timeline"
        className="relative bg-white py-16"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className={`mb-12 transition-all duration-1000 ease-out ${visibleSections.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <h2 className="text-base font-normal tracking-wider mb-4 lowercase underline">Our Journey</h2>
            <p className="text-base text-gray-700 leading-relaxed font-light lowercase text-left">
              four decades of architectural innovation and creative collaboration
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gray-200"></div>

            <div className="space-y-12">
              {companyTimeline.map((milestone, index) => (
                <div
                  key={milestone.year}
                  ref={setRef(`timeline-${index}`)}
                  data-section={`timeline-${index}`}
                  className={`relative transition-all duration-1000 ease-out ${visibleSections[`timeline-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                >
                  <div className={`flex flex-col md:flex-row gap-4 items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}>
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-4' : 'md:text-left md:pl-4'}`}>
                      <div className="space-y-3">
                        {milestone.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-700 leading-relaxed font-light lowercase">
                              {event}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Year marker - centered on timeline with border */}
                    <div className="relative flex-shrink-0 flex justify-center items-center">
                      <span className="text-base font-normal tracking-wider lowercase border border-black px-3 py-1 bg-white">
                        {milestone.year}
                      </span>
                    </div>

                    {/* Spacer for alignment */}
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                </div>
              ))}

              {/* Present marker at the end */}
              <div className="relative flex justify-center items-center pt-8">
                <span className="text-base font-normal tracking-wider lowercase border border-black px-3 py-1 bg-white">
                  present
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={setRef('projects')}
        data-section="projects"
        className="relative bg-white py-16"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="max-w-4xl">
            <div className={`grid md:grid-cols-2 gap-12 mb-16 transition-all duration-1000 ease-out ${visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
              <div>
                <h4 className="text-base font-normal tracking-wide mb-4 lowercase underline">partners along the journey</h4>
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
                <h4 className="text-base font-normal tracking-wide mb-4 lowercase underline">Signature Projects</h4>
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

            <div className={`text-left transition-all duration-1000 ease-out delay-300 ${visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
              <p className="text-base text-gray-700 leading-relaxed mb-8 font-light lowercase">
                With over 22 years of experience working on very large and complex buildings across Europe and Asia, our partners bring unparalleled expertise in architectural design, interior design, and project delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={setRef('cta')}
        data-section="cta"
        className="bg-gray-50 py-16"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className={`text-left transition-all duration-1000 ease-out ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <h2 className="text-base font-normal tracking-wider mb-4 lowercase underline">Become a Partner</h2>
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