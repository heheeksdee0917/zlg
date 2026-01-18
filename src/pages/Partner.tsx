import React, { useState, useEffect, useRef } from 'react';

export default function partners() {
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
      role: ' Managing Director',
      image: 'People/huatsolo.jpeg',
      bio: [
        'Huat Lim studied at the Architectural Association in London from 1981 to 1984. He has been a member of the Architects Registration Board and the Royal Institute of British Architects since 1987. Among his tutors at the AA were Peter Cook, Christine Hawley, Peter Salter, Ron Herron, Rodrigo Pérez de Arce and Gordon Pask, probably his most influential mentor.',
        'Huat taught briefly at the Bartlett London, with Sir Peter Cook and David Dunster. Huat LIM has been employed to work on very large and complex buildings, a career spanning over 22 years, principally at Lord Foster London Stansted Airport, the Nimes Mediateque Museum, HKSB HQ at Canary Wharf, the Masterplan for King Cross Redevelopment, and later at Imagination Limited Jubilee Line Extension for London with the late Ron Herron of Archigram fame.',
        'In Asia, Huat worked on GDP Asia Broadcasting Centre and their NTV7 Radio and Television Studios. Huat was also engaged to work with design teams to win TRHYeang Singapore National Library Competition and LDY entry for the Xian International Airport Competition.',
      ],
    },
    {
      name: 'Susanne ZEIDLER',
      role: 'Executive Director',
      image: 'People/susannesolo.jpeg',
      bio: [
        'Susanne ZEIDLER hails from Frankfurt and studied art history before her postgraduate term at the Staedle Schule under the tutorship of Professor Peter COOK, and later at the Bartlett School of Architecture, London. Susanne moved to Malaysia in 1992, and now lives in Kuala Lumpur and is Executive Director and Senior Partner at zlgdesign.',
        'Her most significant contribution to zlgdesign is the BOH Visitor Centre which has since won wide public recognition. Susanne is no less of an architect than she is a designer, having delivered most of the interior design projects for the firm, namely the I-Zen, Puncak Dana and the MK Land Interiors and Show Unit designs.',
        'Her training in London after a stint in Germany at the Frankfurtschule under the tutorship of Sir Peter Cook of Archigram fame, has given her an interesting edge through her very broad but yet distinctive cultural style to her work at zlgdesign. Susanne was instrumental in the delivery of the BOH Visitor Centre.',
      ],
    },
  ];

  const companyTimeline = [
    {
      year: '1981',
      events: [
        'Huat leaves for the Architectural Association (AA), London',
        'First introduction to the work of Christo and Jeanne-Claude, Running Fence, and Richard Long',
        'Huat visits Saint-Malo, Mont-Saint-Michel and Stonehenge with tutors Andrew Minchin and Athanasios Spanomaridis',
      ],
    },
    {
      year: '1982',
      events: [
        'Huat receives Royal Institute of British Architects, Part 1',
        'Huat wins the Intermediate School Prize at the Architectural Association',
      ],
    },
    {
      year: '1983',
      events: [
        'Huat travels to Málaga, Seville and Ronda and visits the Generalife summer palace in Granada',
        'Huat visits Maison de Verre (House of Glass), La Coupole, Villa La Roche, Paris',
      ],
    },
    {
      year: '1990',
      events: [
        'Huat meets the French architects Odile Decq and Benoit Cornette at the YMCA, London',
      ],
    },
    {
      year: '1991',
      events: [
        'Susanne‘s third year of postgraduate studies at the Bartlett School of Architecture with a one-year scholarship from the Evangelisches Studienwerk, Germany',
        'Huat works at Imagination Limited, London, and meets Gary Withers',
        'Huat works at Zaha Hadid Architects, London, on the Vitra Fire Station, Weil am Rhein, Germany',
      ],
    },
    {
      year: '1992',
      events: [
        'Huat and Susanne set up Zeidler&Lim Architects at Gloucester Avenue, Primrose Hill, London',
        'ZLGDesign enters the Glasgow Tower competition in collaboration with Chris Wise of Ove Arup',
      ],
    },
    {
      year: '1993',
      events: [
        'Huat and Susanne return to Malaysia',
        'Huat interviews with BBC Radio at the Petronas Twin Towers construction site, Kuala Lumpur',
      ],
    },
    {
      year: '1994',
      events: [
        'Huat and Susanne set up ZLGDesign in Kuala Lumpur',
        'ZLGDesign presents KL LinearCity master plan to the prime minister of Malaysia, Mahathir Mohamad',
        'Huat meets Peter Cook, Ron Herron and Tony Fitzpatrick to Kuala Lumpur to work on KL LinearCity',
      ],
    },
    {
      year: '1995',
      events: [
        'ZLGDesign completes design for Hotel Capitol, Kuala Lumpur',
      ],
    },
    {
      year: '1997',
      events: [
        'Huat works as project architect on the NTV7 broadcasting studio, Kuala Lumpur',
      ],
    },
    {
      year: '1999',
      events: [
        'Hotel Capitol wins the Malaysian Interior Design Award',
      ],
    },
    {
      year: '2001',
      events: [
        'Huat lectures at the second edition of the Transportable Environments Conference on portable architecture, organised by the National University of Singapore)',
      ],
    },
    {
      year: '2002',
      events: [
        'ZLGDesign renovates Duta Plaza which is renamed Avenue K, Kuala Lumpur',
        'Huat meets the interior designer and architect Christian Liaigre, the interior designer and president of Glamorous, Japan, Yasumichi Morita, and the interior designer Ann Li Koh of Perception Design, Hong Kong',
      ],
    },
    {
      year: '2003',
      events: [
        'Jurong Town Corporation Singapore appoints ZLGDesign for construction drawings, detail and design for Zaha Hadid‘s Biopolis master plan, Singapore',
      ],
    },
    {
      year: '2004',
      events: [
        'Huat and Bernice Chauly lecture and present their work at the Architectural Association as part of the Asia@AA Lecture Symposium organised by Ken Yeang',
        'Huat meets Lei Fu and Kengo Kuma for a joint collaboration on Z58, Shanghai',
      ],
    },
    {
      year: '2005',
      events: [
        'ZLGDesign exhibits at the Lille (2004) and Cork (2005) European Capital of Culture exhibitions',
        'ZLGDesign completes the BOH Visitor Centre, Cameron Highlands',
      ],
    },
    {
      year: '2006',
      events: [
        'Avenue K and K Residence mixed development in Kuala Lumpur completes ZLGDesign collaborates with Anne Militello, Christian Liaigre, James Gibson of Denton Corker Marshall and Conran Design Group for Avenue K and K Residence, Kuala Lumpur',
      ],
    },
    {
      year: '2007',
      events: [
        'Huat and Susanne travel to Padua and meet with the Cappochin family',
      ],
    },
    {
      year: '2008',
      events: [
        'Huat lectures on ‘Durability‘ at the Ong Siew May Distinguished Lectures Series on ‘Sustain/Ability‘, National University of Singapore',
        'BOH Visitor Centre wins the Cityscape Asia Real Estate Awards, Singapore',
        'Huat joins Hani Rashid, Matthias Sauerbruch, Enrique Browne, Michel Langrand, Francis Nordeman and Eva Jiřičná at the International VELUX Award on the theme ‘The Light of Tomorrow‘, Venice',
      ],
    },
    {
      year: '2009',
      events: [
        'Huat and Susanne set up ZLGEvents',
        'ZLGEvents invites Peter Cook to lecture at Kuala Lumpur Convention Centre',
        'Huat meets Thomas Heatherwick, Zaha Hadid, Terence Conran and David Adjaye in London',
      ],
    },
    {
      year: '2010',
      events: [
        'ZLGDesign wins contract to work on Avenue K refurbishment Phase 2, Kuala Lumpur, Malaysia',
      ],
    },
    {
      year: '2011',
      events: [
        'ZLGDesign starts work on Tepian Tunku residence, Kuala Lumpur, Malaysia',
      ],
    },
    {
      year: '2012',
      events: [
        'ZLGDesign moves to Bangunan Perdagangan D7, Jalan Sentul, Kuala Lumpur',
        'ZLGEvents organises Peter Cook and Gavin Robotham of CRAB Studio for a lecture at DoubleTree by Hilton, Kuala Lumpur',
        'ZLGEvents organises a children‘s art workshop with Syahidah Osman at D7, Kuala Lumpur',
      ],
    },
    {
      year: '2013',
      events: [
        'ZLGEvents organises Thomas Fagernes of Snøhetta to lecture at Kuala Lumpur Convention Centre',
        'ZLGDesign invites Nike Bätzner, Roland Stratmann, Lucien den Arend, Stephen Maas and Nina Freedman for the Nilai Memorial Arts Centre project master plan, Kuala Lumpur',
        'ZLGEvents collaborates with photographers Chuan Lim, Sanjit Das and Suzanne Lee, writer Bernice Chauly, and artists Hayati Mokhtar and Ian Davies for the ‘Live through Many Lenses‘ event at D7, Kuala Lumpur',
      ],
    },
    {
      year: '2014',
      events: [
        'Huat and Susanne visit Susanne Isa and Simon Herron, London',
        'ZLGEvents brings Susanne Isa and Simon Herron of the University of Greenwich for their lecture ‘I‘m Not A Dinosaur‘ at D7, Kuala Lumpur',
        'ZLGEvents brings Ken Shuttleworth (MAKE architects) for his lecture at Kuala Lumpur Convention Centre',
      ],
    },
    {
      year: '2015',
      events: [
        'ZLGEvents organises ‘The Fantastic World of M.C. Escher: Film Screening and Readings‘ with Priscilla Ho, Helan Pereira and Arisha Akhir, Kuala Lumpur',
        'Art Fest: ‘Voice of the Heart‘ discourse and readings with the artist Elena Kravchenko, D7 Studio, Kuala Lumpur',
        'Thomas Fagernes of Snøhetta visits ZLGDesign, Kuala Lumpur',
        'Lantern Hotel opens to the public in Chinatown, Kuala Lumpur',
      ],
    },
    {
      year: '2016',
      events: [
        'ZLGDesign completes Phoebe House, Bukit Tunku, Kuala Lumpur',
        'ZLGEvents hosts Janet Lee music performance at D7, Kuala Lumpur for a jazz musical',
      ],
    },
    {
      year: '2017',
      events: [
        'ZLGDesign works on BOH Visitor Centre second phase, Cameron Highlands',
        'ZLGDesign organises a lecture by Florentine Sack and Open House 2: Design Criteria for a New Architecture book launch at D7, Kuala Lumpur Huat and Susanne visit Florentine at the Blue House, Heiligenhafen, Germany',
        'Viktor designs the bottle brush tree insignia for the house at Wangsa Ukay and the publishing company Zeidler&Lim',
      ],
    },
    {
      year: '2018',
      events: [
        'Susanne accepts the AIT German Award for Lantern Hotel in Frankfurt',
        'ZLGDesign starts work on Sierramas residence, Kuala Lumpur',
        'Huat and family visit Christo and Jeanne-Claude‘s The London Mastaba installation on the River Thames and at the Serpentine Gallery, London',
      ],
    },
    {
      year: '2019',
      events: [
        'Huat and Susanne visit the farmhouse at Le Maine Bas',
        'Huat and Susanne visit Le Couvent Sainte-Marie de La Tourette, Éveux, France',
        'Huat and Susanne visit Hof Gimbach, near Frankfurt',
        'Huat and Susanne attend the Golden Pin Design Award Forum in Taiwan, meeting with the interior designer Tony Chi of tonychi studios, New York',
      ],
    },
    {
      year: '2020',
      events: [
        'Huat and Susanne complete the manuscript for the biographical essays in Ethos',
      ],
    },
    {
      year: '2021',
      events: [
        'Huat teaches design theory at UCSI University, Kuala Lumpur',
      ],
    },
    {
      year: '2022',
      events: [
        'ZLGDesign presents ‘Point92: Architecture of Resilience‘ for Zak World of Façades Conference, Kuala Lumpur',
        'Suburbia and Zeidler&Lim Publishing publish Automatism (edited by Gareth Richards and Eryn Tan)',
        'Huat meets with the artist Jonathan C. Vaultman at his studio, Kuala Lumpur',
        'SC Shekar shares his book Grit & Grace: The Grandeur of Monochrome Malaysia and work philosophy at ZLGDesign Studio',
        'Huat and Susanne meet Bettina Chua Abdullah at the launch of her book To Nourish with Love, Hikayat, Penang',
        'Huat meets Gareth Richards at his Gerakbudaya Bookshop located in the Hikayat arts space, Penang',
      ],
    },
  ];

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
              Legacy of Excellence
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
                <h4 className="text-base font-normal tracking-wide mb-4 lowercase underline">Notable Collaborations</h4>
                <ul className="space-y-3 text-gray-700 font-light lowercase text-left">
                  <li className="flex items-start text-base">
                    <span className="mr-3">•</span>
                    <span>Lord Foster - London Stansted Airport</span>
                  </li>
                  <li className="flex items-start text-base">
                    <span className="mr-3">•</span>
                    <span>Zaha Hadid - London Projects</span>
                  </li>
                  <li className="flex items-start text-base">
                    <span className="mr-3">•</span>
                    <span>Ron Herron - Jubilee Line Extension</span>
                  </li>
                  <li className="flex items-start text-base">
                    <span className="mr-3">•</span>
                    <span>Sir Peter Cook - Bartlett London</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-normal tracking-wide mb-4 lowercase underline">Signature Projects</h4>
                <ul className="space-y-3 text-gray-700 font-light lowercase text-left">
                  <li className="flex items-start text-base">
                    <span className="mr-3">•</span>
                    <span>BOH Visitor Centre</span>
                  </li>
                  <li className="flex items-start text-base">
                    <span className="mr-3">•</span>
                    <span>Nimes Mediateque Museum</span>
                  </li>
                  <li className="flex items-start text-base">
                    <span className="mr-3">•</span>
                    <span>HKSB HQ Canary Wharf</span>
                  </li>
                  <li className="flex items-start text-base">
                    <span className="mr-3">•</span>
                    <span>Singapore National Library Competition</span>
                  </li>
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