import React, { useState, useEffect, useRef } from 'react';

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

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <section className="max-w-screen-2xl mx-auto px-8 py-16">
        <div className="space-y-16">
          <div
            ref={setRef('intro')}
            data-section="intro"
            className={`text-left transition-all duration-1000 ease-out ${visibleSections.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <h2 className="text-base font-normal tracking-wider mb-4">
              zlgdesign's Philosophy
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              In 1992 when susanne and me started thinking of doing competitions our focus was only design and ever since our work revolved around ideas and concepts that go beyond what was then always a pre-defined architectural pursuit or entity. We had simply wanted to do architecture that would not only engage the human spirit, but also something with a deep philosophy behind the work.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              I think architecture is taking much longer to becoming like what good art is, it is not so generative and it is not always assuming an emotive role, like a good work of art does. We think that it is possible for us to connect to our buildings as easily as we can connect to art, or to our music, or to things that we adore, like our children or our books.
            </p>
          </div>


          <div
            ref={setRef('intelligence')}
            data-section="intelligence"
            className={`transition-all duration-1000 ease-out ${visibleSections.intelligence ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <h3 className="text-base font-normal tracking-wide mb-4">
              The Shock of the New
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4 text-left">
              Architecture is a creative profession in which knowledge of science and the arts, especially visual arts and history, has to come into balance before you can embark with confidence on a project. At the same time, in an age increasingly dominated by transformative AI and digital technologies, we surely have to accept their significance in how we work, express ourselves and solve complex problems. For better or worse, this applies not only to the built environment but also to all forms of creativity.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-4 text-left">
              Among the new generation of architects very few can actually express themselves without relying on digital technology and, increasingly, AI. This obviously changes the way we need to perceive creativity. What if digital tablets, AI tools and algorithms completely replace the traditional use of rulers, pencils and the drawing board? Perhaps AI and digital technologies will soon be able to emulate the qualities seen in the very best design … or music or fine art or ceramics. Time will tell.
            </p>
            <p className="text-base text-gray-700 leading-relaxed text-left">
              It is no longer necessary for an architect or designer to fully grasp the craft aspects of creating a new building—that practice where design, material and construction intersect, focusing on the skilled, hands-on and human-centric aspects of a building. So what is left is to merely arrange and compose walls and spaces enclosed by structures. The separation between the craft and the creator has become accepted as the new norm. Current methods of work do not demand an architect to be intimate with the sources of their core materials, but merely to specify them. Only the bricklayer on site appreciates the true quality of what they lay with their hands; only the roofer understands the intrinsic nature of timber and tiles. In the end, automation eases traditional skilled craftspeople out of the work sequence. The only time the architect might actually see the work is when they climb the roof or examine the walls during a site inspection.
            </p>
          </div>
          <div
            ref={setRef('ourethos')}
            data-section="ourethos"
            className={`transition-all duration-1000 ease-out ${visibleSections.ourethos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <h3 className="text-base font-normal tracking-wide mb-4">
              Our Ethos
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4 text-left">
              ZLG is committed to a practice that combines the best of craft practices with the possibilities offered by technological innovation. We strive to encompass sustainability and ecology in all aspects of our design projects. We deliberately embrace nature to be a part of the experience, and deliver this optimally with available resources. Awakening to the call for greener buildings and more sustainable forms of development gives us an ethos to produce designs that are both aesthetically exciting and socially and environmentally responsible, created for the benefit of future generations.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-4 text-left">
              ZLG has an enormous well of experience gained through more than thirty years of working in various built environments at different scales. This means we are very versatile and responsive in the way we interpret each unique brief. Whether working to a house design or a masterplan, we always develop strategic ways to make each project special in its own way. We act sensitively to site specificity and locality, as well as the character and vision of the client. We reinvent, redefine and look at every opportunity with a renewed sense of wonder.
            </p>
            <p className="text-base text-gray-700 leading-relaxed text-left">
              Bioclimatic design and ecological architecture are a major thrust of our practice—integrating environmental sensibility with building design to create structures that minimise negative impacts. At the same time, we continue to search for durable building typologies that coexist harmoniously with nature.
            </p>
            <p className="text-base text-gray-700 leading-relaxed text-left">
              And so we come full circle. By no means do we deny the efficacy of smart technology its rightful place. At the same time, we believe in the value of age-old craft knowledge, skills and experience. As with everything, the goal is to achieve just the right balance.
            </p>
          </div>


          <blockquote
            ref={setRef('quote1')}
            data-section="quote1"
            className={`text-base font-light text-left italic text-gray-800 py-8 border-t border-b border-gray-300 transition-all duration-1000 ease-out lowercase ${visibleSections.quote1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            if it doesn't engage or connect with one's emotion, or if it's just not involving enough, we'll probably just throw it out the window. we won't want to take that thing all the way to the end. if it's not intriguing enough, and doesn't hold any mystery or surprises then i guess it really isn't worth developing. the drama isn't going to be there by the time one is finished with it, not enough to sustain the experience.
          </blockquote>

          <div
            ref={setRef('contrast')}
            data-section="contrast"
            className="grid md:grid-cols-2 gap-16"
          >
            <div className={`transition-all duration-1000 ease-out ${visibleSections.contrast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
              <h3 className="text-base font-normal tracking-wide mb-4">Contrast and tension</h3>
              <p className="text-base text-gray-700 leading-relaxed text-left">
                Zlgdesign's more minimal work belies warmer and more democratic proposals that can still exhibit simpler but more cutting edge ideas. Other work gravitate towards using elements from the old world placed inside more modern envelopes.
              </p>
            </div>
            <div className={`transition-all duration-1000 ease-out delay-300 ${visibleSections.contrast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
              <h3 className="text-base font-normal tracking-wide mb-4">Past meets future</h3>
              <p className="text-base text-gray-700 leading-relaxed text-left">
                The contrast or tension resulting from these associations and juxtapositions in their work is a constant characteristic feature in recent and upcoming projects. These explorations of bringing together things from the past and those brought out of new technology or research has become a constant inspiration.
              </p>
            </div>
          </div>

          <blockquote
            ref={setRef('quote2')}
            data-section="quote2"
            className={`text-base font-light text-left italic text-gray-800 py-8 border-t border-b border-gray-300 transition-all duration-1000 ease-out lowercase ${visibleSections.quote2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            god created paper for the purpose of drawing architecture on it. everything else is, at least for me, an abuse of paper.
            <span className="block text-base not-italic mt-4 text-gray-600">— alvar aalto</span>
          </blockquote>

          <div
            ref={setRef('imagination')}
            data-section="imagination"
            className={`text-left transition-all duration-1000 ease-out ${visibleSections.imagination ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <h3 className="text-base font-normal tracking-wide mb-4 ">
              The power of imagination
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4 text-left">
              On what motivates them to design, huat has this to say:
            </p>
            <p className="text-base text-gray-700 leading-relaxed text-left">
              Thought is a form of necessary action, a precursor to a possible work of art. And if you can't imagine it in your head, it's not likely to get built. Getting that image in the mind's eye, and then executing it is what it's really all about.
            </p>
            <p>We usually start off with a sketch.</p>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section
        ref={setRef('publications')}
        data-section="publications"
        className={`max-w-screen-2xl mx-auto px-8 py-16 transition-all duration-1000 ease-out bg-white relative z-40 ${visibleSections.publications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <h2 className="text-base font-normal tracking-wider mb-4">Publications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Publication 1 */}
          <div className={`border border-gray-200 p-6 transition-all duration-1000 ease-out hover:shadow-lg flex flex-col ${visibleSections.publications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
            <h3 className="text-sm font-normal tracking-wide mb-2 lowercase">ethos: biographical essays 2015-2023</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed text-left">
              The essays are generously illustrated with photographs, making the book both a theoretical and visual exploration of his experiences, ideas, and the people who have influenced him.
            </p>
          </div>

          {/* Publication 2 */}
          <div className={`border border-gray-200 p-6 transition-all duration-1000 ease-out hover:shadow-lg flex flex-col ${visibleSections.publications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '300ms' }}>
            <h3 className="text-sm font-normal tracking-wide mb-2 lowercase">Typology: The Genealogy of Buildings and Their Emergent Types, 2025</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed text-left">
              a personal study and reflection on building types. The book is structured as a series of interconnected essays that reflect on type as more than just form or function; it's a way to see buildings as part of a genealogy of forms, linked with history, culture, and human activity.
            </p>
          </div>

          {/* Publication 3 */}
          <div className={`border border-gray-200 p-6 transition-all duration-1000 ease-out hover:shadow-lg flex flex-col ${visibleSections.publications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
            <h3 className="text-sm font-normal tracking-wide mb-2 lowercase">automatism: in philosophy art and culture, 2022</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed text-left">
              It's an essay exploring the concept of automatism — a term often linked with creative processes where intuition and subconscious processes play a role, rather than strict rational control.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}