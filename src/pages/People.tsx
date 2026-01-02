import React, { useState, useEffect, useRef } from 'react';

export default function People() {
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

  const team = [
    {
      id: 1,
      name: 'Huat Lim',
      role: 'Founding Principal',
      bio: 'With over 20 years of experience, Zara leads the firm design vision and strategic direction. Her work has been recognized with numerous international awards, including the Pritzker Prize nomination. She believes architecture should serve both people and planet.',
      image: 'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      name: 'Lucas Grant',
      role: 'Design Director',
      bio: 'Lucas brings a passion for sustainable innovation and material research. He oversees the firm design development process, ensuring every project meets the highest standards of craftsmanship and environmental responsibility. His expertise spans residential, cultural, and commercial typologies.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 3,
      name: 'Grace Torres',
      role: 'Project Architect',
      bio: 'Grace leads project teams from concept through construction, coordinating consultants and ensuring design intent is realized. Her attention to detail and collaborative approach have made her invaluable to the firm most complex projects.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 4,
      name: 'Michael Chen',
      role: 'Senior Architect',
      bio: 'Michael specializes in adaptive reuse and historic preservation, bringing sensitivity and creativity to projects that honor existing structures. His work demonstrates that old and new can coexist beautifully.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 5,
      name: 'Sophia Andersson',
      role: 'Sustainability Consultant',
      bio: 'Sophia ensures every project meets rigorous environmental standards through energy modeling, material selection, and certification processes. Her technical expertise enables the firm to push boundaries in sustainable design.',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 6,
      name: 'David Okafor',
      role: 'Architectural Designer',
      bio: 'David innovative approach to digital fabrication and parametric design expands the firm capabilities. He bridges traditional craft with cutting-edge technology, exploring new possibilities in form and construction.',
      image: 'https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <section className="relative h-96">
        <img
          src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="ZLG Design team"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-wider text-white">
            People
          </h1>
        </div>
      </section>

      <section 
        ref={setRef('intro')}
        data-section="intro"
        className="max-w-screen-2xl mx-auto px-8 py-32"
      >
        <div className={`max-w-3xl mx-auto text-center mb-24 transition-all duration-1000 ease-out ${
          visibleSections.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-3xl font-light tracking-wider mb-8">Our Team</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
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
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <h3 className="text-xl font-light tracking-wide mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-4 tracking-wide">{member.role}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{member.bio}</p>
            </div>
          ))}
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
            <h2 className="text-3xl font-light tracking-wider mb-8">Join Our Team</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              We are always seeking talented architects and designers who share our commitment to excellence, sustainability, and thoughtful design. If you are passionate about creating spaces that matter, we would love to hear from you.
            </p>
            <a
              href="mailto:info@zlgdesign.com"
              className="inline-block text-sm tracking-wide px-12 py-4 border border-black font-light relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">join the team</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}