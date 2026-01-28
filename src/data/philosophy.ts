export interface PhilosophySection {
    id: string;
    title: string;
    type: 'text-image' | 'quote-contrast' | 'text-only' | 'publications';
    zIndex: number;
    content: {
      text?: string[];
      image?: string;
      imagePosition?: 'left' | 'right';
      quotes?: Array<{
        quote: string;
        author?: string;
      }>;
      columns?: Array<{
        title: string;
        text: string;
      }>;
      publications?: Array<{
        title: string;
        description: string;
      }>;
    };
  }
  
  export const philosophySections: PhilosophySection[] = [
    {
      id: 'intro',
      title: "zlgdesign's Philosophy",
      type: 'text-image',
      zIndex: 10,
      content: {
        text: [
          "In 1992 when susanne and me started thinking of doing competitions our focus was only design and ever since our work revolved around ideas and concepts that go beyond what was then always a pre-defined architectural pursuit or entity. We had simply wanted to do architecture that would not only engage the human spirit, but also something with a deep philosophy behind the work.",
          "I think architecture is taking much longer to becoming like what good art is, it is not so generative and it is not always assuming an emotive role, like a good work of art does. We think that it is possible for us to connect to our buildings as easily as we can connect to art, or to our music, or to things that we adore, like our children or our books."
        ],
        image: '/poster_1.jpg',
        imagePosition: 'right'
      }
    },
    {
      id: 'intelligence',
      title: 'The Shock of the New',
      type: 'text-image',
      zIndex: 20,
      content: {
        text: [
          "Architecture is a creative profession in which knowledge of science and the arts, especially visual arts and history, has to come into balance before you can embark with confidence on a project. At the same time, in an age increasingly dominated by transformative AI and digital technologies, we surely have to accept their significance in how we work, express ourselves and solve complex problems. For better or worse, this applies not only to the built environment but also to all forms of creativity.",
          "Among the new generation of architects very few can actually express themselves without relying on digital technology and, increasingly, AI. This obviously changes the way we need to perceive creativity. What if digital tablets, AI tools and algorithms completely replace the traditional use of rulers, pencils and the drawing board? Perhaps AI and digital technologies will soon be able to emulate the qualities seen in the very best design … or music or fine art or ceramics. Time will tell.",
          "It is no longer necessary for an architect or designer to fully grasp the craft aspects of creating a new building—that practice where design, material and construction intersect, focusing on the skilled, hands-on and human-centric aspects of a building. So what is left is to merely arrange and compose walls and spaces enclosed by structures. The separation between the craft and the creator has become accepted as the new norm."
        ],
        image: '/poster_1.jpg',
        imagePosition: 'left'
      }
    },
    {
      id: 'ourethos',
      title: 'Our Ethos',
      type: 'text-image',
      zIndex: 30,
      content: {
        text: [
          "ZLG is committed to a practice that combines the best of craft practices with the possibilities offered by technological innovation. We strive to encompass sustainability and ecology in all aspects of our design projects. We deliberately embrace nature to be a part of the experience, and deliver this optimally with available resources.",
          "ZLG has an enormous well of experience gained through more than thirty years of working in various built environments at different scales. This means we are very versatile and responsive in the way we interpret each unique brief. Whether working to a house design or a masterplan, we always develop strategic ways to make each project special in its own way.",
          "Bioclimatic design and ecological architecture are a major thrust of our practice—integrating environmental sensibility with building design to create structures that minimise negative impacts. At the same time, we continue to search for durable building typologies that coexist harmoniously with nature."
        ],
        image: '/poster_1.jpg',
        imagePosition: 'right'
      }
    },
    {
      id: 'quotes-contrast',
      title: '',
      type: 'quote-contrast',
      zIndex: 40,
      content: {
        quotes: [
          {
            quote: "if it doesn't engage or connect with one's emotion, or if it's just not involving enough, we'll probably just throw it out the window. we won't want to take that thing all the way to the end. if it's not intriguing enough, and doesn't hold any mystery or surprises then i guess it really isn't worth developing."
          },
          {
            quote: "god created paper for the purpose of drawing architecture on it. everything else is, at least for me, an abuse of paper.",
            author: "— alvar aalto"
          }
        ],
        columns: [
          {
            title: 'Contrast and tension',
            text: "Zlgdesign's more minimal work belies warmer and more democratic proposals that can still exhibit simpler but more cutting edge ideas. Other work gravitate towards using elements from the old world placed inside more modern envelopes."
          },
          {
            title: 'Past meets future',
            text: "The contrast or tension resulting from these associations and juxtapositions in their work is a constant characteristic feature in recent and upcoming projects."
          }
        ]
      }
    },
    {
      id: 'imagination',
      title: 'The power of imagination',
      type: 'text-only',
      zIndex: 50,
      content: {
        text: [
          "On what motivates them to design, huat has this to say:",
          "Thought is a form of necessary action, a precursor to a possible work of art. And if you can't imagine it in your head, it's not likely to get built. Getting that image in the mind's eye, and then executing it is what it's really all about.",
          "We usually start off with a sketch."
        ]
      }
    },
    {
      id: 'publications',
      title: 'Publications',
      type: 'publications',
      zIndex: 60,
      content: {
        publications: [
          {
            title: 'ethos: biographical essays 2015-2023',
            description: "The essays are generously illustrated with photographs, making the book both a theoretical and visual exploration of his experiences, ideas, and the people who have influenced him."
          },
          {
            title: 'Typology: The Genealogy of Buildings and Their Emergent Types, 2025',
            description: "a personal study and reflection on building types. The book is structured as a series of interconnected essays that reflect on type as more than just form or function."
          },
          {
            title: 'automatism: in philosophy art and culture, 2022',
            description: "It's an essay exploring the concept of automatism — a term often linked with creative processes where intuition and subconscious processes play a role."
          }
        ]
      }
    }
  ];