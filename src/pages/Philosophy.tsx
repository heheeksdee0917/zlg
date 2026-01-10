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

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <section className="relative h-screen">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm tracking-wide">image placeholder - hero image</span>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start pb-16 pl-8">
          <div className="text-left text-white">
            <h1 className="text-base font-normal tracking-wider underline lowercase">
              philosophy
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-8 py-16">
        <div className="space-y-16">
          <div 
            ref={setRef('intro')}
            data-section="intro"
            className={`text-left transition-all duration-1000 ease-out ${
              visibleSections.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-base font-normal tracking-wider mb-4 lowercase underline">
              beyond pre-defined architectural pursuit
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6 lowercase">
              in 1992 when susanne and me started thinking of doing competitions our focus was only design and ever since our work revolved around ideas and concepts that go beyond what was then always a pre-defined architectural pursuit or entity. we had simply wanted to do architecture that would not only engage the human spirit, but also something with a deep philosophy behind the work.
            </p>
            <p className="text-base text-gray-700 leading-relaxed lowercase">
              up to this day, there has been a little problem i have to solve in my head, and that is that i think architecture is taking much longer to becoming like what good art is, it is not so generative and it is not always assuming an emotive role, like a good work of art does. we think that it is possible for us to connect to our buildings as easily as we can connect to art, or to our music, or to things that we adore, like our children or our books.
            </p>
          </div>

          <div 
            ref={setRef('image1')}
            data-section="image1"
            className={`relative transition-all duration-1000 ease-out ${
              visibleSections.image1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm tracking-wide">image placeholder</span>
            </div>
          </div>

          <div 
            ref={setRef('intelligence')}
            data-section="intelligence"
            className={`transition-all duration-1000 ease-out ${
              visibleSections.intelligence ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-base font-normal tracking-wide mb-4 lowercase underline">design intelligence</h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4 lowercase text-left">
              zlgdesign's very own approach to design development processes in the organisation is a self-critique on a customised proto-typing and exploration technique. we would call this design intelligence, developed over many years to survive critical investigation and intellectual discourse on all levels of our work.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-4 lowercase text-left">
              they do away with adapting to or embracing mainstream typology in buildings but take their stance and follow artistic directions set down at the onset of the conceptual phase of design, minus the styling. they have always maintained and believe that their architecture is about people, and never about style or about winning beauty contests, although they like competition.
            </p>
            <p className="text-base text-gray-700 leading-relaxed lowercase text-left">
              their work embrace and thereafter adopt and develop to maturity whatever comes in the way of development of their designs, whether this makes sensible methodology or not. these processes are not ends but means to create something new, something unique, specific and exclusive to the project. the duyong project for instance, is definitely of the place, echoing the arts and culture of the fishing village of trengganu, whereas the aar centre contemplates the essence of the site to inform the shape of the built form.
            </p>
          </div>

          <div 
            ref={setRef('image2')}
            data-section="image2"
            className={`relative transition-all duration-1000 ease-out ${
              visibleSections.image2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm tracking-wide">image placeholder</span>
            </div>
          </div>

          <div 
            ref={setRef('typology')}
            data-section="typology"
            className={`transition-all duration-1000 ease-out ${
              visibleSections.typology ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-base font-normal tracking-wide mb-4 lowercase underline">beyond typology</h3>
            <p className="text-base text-gray-700 leading-relaxed lowercase text-left">
              today's buildings are designed to fit within preset parameters largely defined by their typology rather than aesthetics or ethos. fortunately for us, this has become a challenge on zlgdesign's creative processes as it reinforces our idea that buildings can share multiple typologies and encapsulate more than one function or purposefulness. it is in this context we tend to move our designs away from mainstream typological sets, in fact we would actually design ambiguous spaces or third spaces that exhibit or inherit many hybrids in the final execution.
            </p>
          </div>

          <blockquote 
            ref={setRef('quote1')}
            data-section="quote1"
            className={`text-base font-light text-left italic text-gray-800 py-8 border-t border-b border-gray-300 transition-all duration-1000 ease-out lowercase ${
              visibleSections.quote1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            if it doesn't engage or connect with one's emotion, or if it's just not involving enough, we'll probably just throw it out the window. we won't want to take that thing all the way to the end. if it's not intriguing enough, and doesn't hold any mystery or surprises then i guess it really isn't worth developing. the drama isn't going to be there by the time one is finished with it, not enough to sustain the experience.
          </blockquote>

          <div 
            ref={setRef('image3')}
            data-section="image3"
            className={`relative transition-all duration-1000 ease-out ${
              visibleSections.image3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm tracking-wide">image placeholder</span>
            </div>
          </div>

          <div 
            ref={setRef('contrast')}
            data-section="contrast"
            className="grid md:grid-cols-2 gap-16"
          >
            <div className={`transition-all duration-1000 ease-out ${
              visibleSections.contrast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <h3 className="text-base font-normal tracking-wide mb-4 lowercase underline">contrast and tension</h3>
              <p className="text-base text-gray-700 leading-relaxed lowercase text-left">
                zlgdesign's more minimal work belies warmer and more democratic proposals that can still exhibit simpler but more cutting edge ideas. other work gravitate towards using elements from the old world placed inside more modern envelopes.
              </p>
            </div>
            <div className={`transition-all duration-1000 ease-out delay-300 ${
              visibleSections.contrast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <h3 className="text-base font-normal tracking-wide mb-4 lowercase underline">past meets future</h3>
              <p className="text-base text-gray-700 leading-relaxed lowercase text-left">
                the contrast or tension resulting from these associations and juxtapositions in their work is a constant characteristic feature in recent and upcoming projects. these explorations of bringing together things from the past and those brought out of new technology or research has become a constant inspiration.
              </p>
            </div>
          </div>

          <div 
            ref={setRef('image4')}
            data-section="image4"
            className={`relative transition-all duration-1000 ease-out ${
              visibleSections.image4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm tracking-wide">image placeholder</span>
            </div>
          </div>

          <blockquote 
            ref={setRef('quote2')}
            data-section="quote2"
            className={`text-base font-light text-left italic text-gray-800 py-8 border-t border-b border-gray-300 transition-all duration-1000 ease-out lowercase ${
              visibleSections.quote2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            god created paper for the purpose of drawing architecture on it. everything else is, at least for me, an abuse of paper.
            <span className="block text-base not-italic mt-4 text-gray-600">— alvar aalto</span>
          </blockquote>

          <div 
            ref={setRef('imagination')}
            data-section="imagination"
            className={`text-left transition-all duration-1000 ease-out ${
              visibleSections.imagination ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-base font-normal tracking-wide mb-4 lowercase underline">
              the power of imagination
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4 lowercase text-left">
              on what motivates them to design, huat has this to say:
            </p>
            <p className="text-base text-gray-700 leading-relaxed lowercase text-left">
              thought is a form of necessary action, a precursor to a possible work of art. and if you can't imagine it in your head, it's not likely to get built. getting that image in the mind's eye, and then executing it is what it's really all about. we usually start off with a sketch.
            </p>
          </div>

          <div 
            ref={setRef('image5')}
            data-section="image5"
            className={`relative transition-all duration-1000 ease-out ${
              visibleSections.image5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm tracking-wide">image placeholder</span>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={setRef('principles')}
        data-section="principles"
        className="bg-gray-50 py-16"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="max-w-4xl">
            <h2 className={`text-base font-normal tracking-wider mb-8 text-left lowercase underline transition-all duration-1000 ease-out ${
              visibleSections.principles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              core principles
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              <div className={`text-left transition-all duration-1000 ease-out ${
                visibleSections.principles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`} style={{ transitionDelay: '200ms' }}>
                <h4 className="text-base font-normal tracking-wide mb-4 lowercase underline">emotion over style</h4>
                <p className="text-base text-gray-700 leading-relaxed lowercase">
                  architecture must engage the human spirit and connect emotionally, transcending mere aesthetics.
                </p>
              </div>

              <div className={`text-left transition-all duration-1000 ease-out ${
                visibleSections.principles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`} style={{ transitionDelay: '400ms' }}>
                <h4 className="text-base font-normal tracking-wide mb-4 lowercase underline">design intelligence</h4>
                <p className="text-base text-gray-700 leading-relaxed lowercase">
                  a customized exploration technique developed through critical investigation and intellectual discourse.
                </p>
              </div>

              <div className={`text-left transition-all duration-1000 ease-out ${
                visibleSections.principles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`} style={{ transitionDelay: '600ms' }}>
                <h4 className="text-base font-normal tracking-wide mb-4 lowercase underline">hybrid spaces</h4>
                <p className="text-base text-gray-700 leading-relaxed lowercase">
                  creating ambiguous third spaces that exhibit multiple typologies and purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}