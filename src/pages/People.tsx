import React, { useState, useEffect, useRef } from 'react';

export default function People() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    intro: true
  });
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

  const team = [
    {
      id: 1,
      name: 'Huat Lim & SUSANNE ZEIDLER',
      role: 'Managing Director & Executive Director',
      image: '/People/HuatandSusanne.jpeg',
    },
    {
      id: 2,
      name: 'shu herng',
      role: 'BA Arch. (Hons) ESALA, RIBA Part I',
      image: 'People/shu.jpeg',
    },
    {
      id: 3,
      name: 'REVATHY SIVA',
      role: 'B. Arch (Hons) UMK, LAM Part I',
      image: 'People/revathy.jpeg',
    },
    {
      id: 4,
      name: 'Hester Chang',
      role: 'BSc. Arch (Hons) Taylor’s, LAM Part I',
      image: 'People/hester.jpeg',
    },
    {
      id: 5,
      name: 'Ahirah Yen',
      role: 'LAM AG/A 678, BSc. Arch (Hons) Taylor’s, M. Arch UM, LAM/RIBA PART II',
      image: 'People/athirah.jpeg',
    },
    {
      id: 6,
      name: 'daphne wee',
      role: 'B Arch. (Hons) SEGi, LAM Part I',
       image: 'People/daphne.jpeg',
    },
    {
      id: 7,
      name: 'haziqah ngasri',
      role: 'B. Arch (Hons) UITM, LAM/RIBA Part I',
      image: 'People/haziqah.jpeg',
    },
    {
      id: 6,
      name: 'yusof hafiz',
      role: 'BSc. Arch (Hons), MSc. Applied Arch. & Design QUEENS, RIBA/ARB/LAM Part II',
      image: 'People/yusof.jpeg',
    },
    {
      id: 8,
      name: '',
      role: 'Architectural Designer',
      image: 'People/.jpeg',
    },
    {
      id: 9,
      name: '',
      role: 'Architectural Designer',
      image: 'People/.jpeg',
    },

  ];

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <section 
        ref={setRef('intro')}
        data-section="intro"
        className="max-w-screen-2xl mx-auto px-8 py-16"
      >
        <div className={`mb-16 transition-all duration-1000 ease-out ${
          visibleSections.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-base font-normal tracking-wider mb-4 lowercase underline">Our Team</h2>
          <p className="text-base text-gray-700 leading-relaxed lowercase text-left">
            ZLG Design is a collective of architects, designers, and thinkers united by a shared passion for creating meaningful spaces. Our diverse backgrounds and expertise enable us to approach each project with fresh perspectives and rigorous craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <div 
              key={member.id} 
              ref={index === 0 ? setRef('team') : undefined}
              data-section={index === 0 ? 'team' : undefined}
              className={`group transition-all duration-1000 ease-out ${
                visibleSections.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="overflow-hidden mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <h3 className="text-base font-normal tracking-wide mb-1 lowercase underline">{member.name}</h3>
              <p className="text-base text-gray-600 mb-4 tracking-wide lowercase">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section 
        ref={setRef('cta')}
        data-section="cta"
        className="bg-gray-50 py-16"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className={`text-left transition-all duration-1000 ease-out ${
            visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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