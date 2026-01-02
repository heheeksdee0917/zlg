import React, { useState, useEffect, useRef } from 'react';

export default function Partnerships() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const keyPartners = [
    {
      name: 'Huat LIM',
      role: 'Founding Partner',
      image: 'Public/People/huatlimwhiteteeshirt.jpg',
      bio: 'Huat LIM worked for Lord Foster, Zaha Hadid and the late Ron Herron in the eighties in London and then later moved to Nimes and Lyons in France to work for Francois-Jourda Perraudin Architectes in France. Huat trained at the Architectural Association London before moving on to work for Foster in 1984, and is now registered member of the Architect Registration Council of the UK since 1987.',
      experience: 'Huat taught briefly at the Bartlett London, with Sir Peter Cook and David Dunster. Huat LIM has been employed to work on very large and complex buildings, a career spanning over 22 years, principally at Lord Foster London Stansted Airport, the Nimes Mediateque Museum, HKSB HQ at Canary Wharf, the Masterplan for King Cross Redevelopment, and later at Imagination Limited Jubilee Line Extension for London with the late Ron Herron of Archigram fame.',
      asiaWork: 'In Asia, Huat worked on GDP Asia Broadcasting Centre and their NTV7 Radio and Television Studios. Huat was also engaged to work with design teams to win TRHYeang Singapore National Library Competition and LDY entry for the Xian International Airport Competition.',
    },
    {
      name: 'Susanne ZEIDLER',
      role: 'Executive Director & Senior Partner',
      image: 'Public/People/susanne_portrait.jpg',
      bio: 'Susanne ZEIDLER hails from Frankfurt and studied art history before her postgraduate term at the Staedle Schule under the tutorship of Professor Peter COOK, and later at the Bartlett School of Architecture, London. Susanne moved to Malaysia in 1992, and now lives in Kuala Lumpur and is Executive Director and Senior Partner at zlgdesign.',
      contribution: 'Her most significant contribution to zlgdesign is the BOH Visitor Centre which has since won wide public recognition. Susanne is no less of an architect than she is a designer, having delivered most of the interior design projects for the firm, namely the I-Zen, Puncak Dana and the MK Land Interiors and Show Unit designs.',
      style: 'Her training in London after a stint in Germany at the Frankfurtschule under the tutorship of Sir Peter Cook of Archigram fame, has given her an interesting edge through her very broad but yet distinctive cultural style to her work at zlgdesign. Susanne was instrumental in the delivery of the BOH Visitor Centre.',
    },
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Parallax Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wider text-white">
            Partnerships
          </h1>
        </div>
      </section>

      <section 
        ref={setRef('intro')}
        data-section="intro"
        className="relative bg-white z-10 max-w-screen-2xl mx-auto px-8 py-32"
      >
        <div className={`max-w-3xl mx-auto text-center mb-24 transition-all duration-1000 ease-out ${
          visibleSections.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-3xl font-medium tracking-wider mb-8">Key Partners</h2>
          <p className="text-lg text-gray-700 leading-relaxed font-light">
            Our partnerships are built on decades of collaboration with exceptional architects and designers who have shaped the built environment across continents. Together, we bring world-class expertise and a shared vision of design excellence.
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
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''} transition-all duration-1000 ease-out ${
                visibleSections[`partner-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''} transition-all duration-1000 ease-out delay-300 ${
                visibleSections[`partner-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <h3 className="text-3xl font-light tracking-wide mb-2">{partner.name}</h3>
                <p className="text-sm text-gray-600 mb-8 tracking-wide uppercase font-light">{partner.role}</p>

                <div className="space-y-6 text-gray-700 leading-relaxed font-light">
                  <p>{partner.bio}</p>

                  {partner.experience && (
                    <p>{partner.experience}</p>
                  )}

                  {partner.asiaWork && (
                    <p>{partner.asiaWork}</p>
                  )}

                  {partner.contribution && (
                    <p>{partner.contribution}</p>
                  )}

                  {partner.style && (
                    <p>{partner.style}</p>
                  )}
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
        className={`relative h-96 overflow-hidden transition-all duration-1000 ease-out ${
          visibleSections.legacy ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
          <div className={`text-center px-8 transition-all duration-1000 ease-out delay-300 ${
            visibleSections.legacy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-4xl font-medium tracking-wider text-black">
              Legacy of Excellence
            </h2>
          </div>
        </div>
      </section>

      <section 
        ref={setRef('projects')}
        data-section="projects"
        className="relative bg-white z-10 py-32"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-12 mb-16 transition-all duration-1000 ease-out ${
              visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <div>
                <h4 className="text-xl font-light tracking-wide mb-4">Notable Collaborations</h4>
                <ul className="space-y-3 text-gray-700 font-light">
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Lord Foster - London Stansted Airport</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Zaha Hadid - London Projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Ron Herron - Jubilee Line Extension</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Sir Peter Cook - Bartlett London</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-light tracking-wide mb-4">Signature Projects</h4>
                <ul className="space-y-3 text-gray-700 font-light">
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>BOH Visitor Centre</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Nimes Mediateque Museum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>HKSB HQ Canary Wharf</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Singapore National Library Competition</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={`text-center transition-all duration-1000 ease-out delay-300 ${
              visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 font-light">
                With over 22 years of experience working on very large and complex buildings across Europe and Asia, our partners bring unparalleled expertise in architectural design, interior design, and project delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={setRef('cta')}
        data-section="cta"
        className="bg-gray-50 py-32"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ease-out ${
            visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-3xl font-medium tracking-wider mb-8">Become a Partner</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-12 font-light">
              We're always interested in connecting with talented consultants, engineers, contractors, and fabricators who share our values. If you believe in design excellence and collaborative practice, let's talk.
            </p>
            <a
              href="mailto:info@zlgdesign.com"
              className="inline-block text-sm tracking-wide px-12 py-4 border border-black font-light relative overflow-hidden group"
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