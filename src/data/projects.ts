export interface Project {
  id: string;
  slug: string;
  title: string;
  year: number;
  location: string;
  category: string;
  shortDescription: string;
  fullDescription: string[];
  heroImage: string;
  images: string[];
  client: string;
  materials: string[];
  area: string;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'phoebe-house',
    title: 'phoebe house',
    year: 2023,
    location: '',
    category: '',
    shortDescription: '',
    fullDescription: [

    ],
    heroImage: 'UrbanTower/UrbanTowerCoverPhoto',
    images: [
      'UrbanTower/1',
      'UrbanTower/2',
      'UrbanTower/3',
      'UrbanTower/4',
      'UrbanTower/5',
    ],
    client: 'Metropolitan Development Corp',
    materials: ['Glass', 'Steel', 'Concrete', 'Bamboo'],
    area: '',
  },
  {
    id: '2',
    slug: 'point-92',
    title: 'point92',
    year: 2022,
    location: '',
    category: '',
    shortDescription: '',
    fullDescription: [
      'Point92 will be seeing some rock blasting activities finally – a very long awaited moment has come to pass. The iconic facade will now be designed to enhance the block much of which will be precast concrete panels arranged in random fashion with a much reduced glazed area to cut back on energy costs. Simply named after the size of the site itself, this formidable building perches on a sloped site, overlooking Damansara Perdana and its ribbons of roads.',
      'The punctuated façade is similar to all of ZLG Design’s works and that is not to say that the appeal is lost. In fact, the play of ambience through the incorporation of day lighting with façade treatment is a tried and true timeless aesthetic, as are the impeccable play of materials the architects are known for. ',
      '“Although the brief called for office development, we had this idea that much of the work place products that are available today had not played creatively on issues the likes of day lighting, ambience and materiality of the façade,” says Huat Lim, Managing Director of zlgdesign. “Instead, nearly all office developments emphasise efficiency and maximum density as overriding concerns and aims over design and aesthetics , let alone their simple functionality in terms of critical ambience and spatial plan.”',
      '',
      'Staying true to their intention of creating an ambience that includes the context to the inside of the building, visitors will get to experience a breathtaking view of Damansara Perdana as they arrive at the lobby through a slowly rising escalating step way above the drop off. The arrival deck allows visitors to drink in the view by providing randomly placed precast concrete benches that encourages respite while wooden lanterns with marine plywood ceilings buttoned tightly against a raw concrete under croft creates a soothing canopy.',
      'The reception desk with a pandomo recessed and undulating rebated wall greets the visitor and reminds them of the graphics and geometry of the building’s façade walls. “As an office plan, the generating feature of the floor plate is in fact a cut-out space which comprises of several levels of voids connected through gardens and meshes of vertical planting. The centre support column is braced to either side with different thickness of beams each corresponding to different floor forces framing the vertical space that is the garden,” explains Huat Lim. There is also a special screen that rises several levels in the façade and made of layers of greenery supported on a series of steel wire ropes pulled between the floors.',
      'The terraces beyond the screen is specially lit and designed grandly to give the viewers from outside a peep into the garden, adding an ethereal touch of a floating mysterious garden within a floating building by the hillside.',
      '',
      'To overcome the problem of building on a slope, the design opted for Lafarge cement to create an in situ concrete wall instead of the usual precast concrete solutions.',
      '“Not only was it necessary to use metal formwork in sets to meet with a target schedule, we were also informed of the uniformity issues if the façade was casted in regular sequences. Hence the randomly casted sequence.” Huat Lim adds. To give better moment connections and easy casting as well as minimise bulging and honey-combing of the surface concrete, part of the floor slabs had to be casted together with the wall elements.',
      'Elegantly rising from the slopes, the slanting walls in the façade continues the natural geometry of the site while the rectangular punctuations complement the ever developing built environment in Damansara Perdana. Light permeating through the punctured façade promises a soothing and safe ambience, highlighted further by the backing hills as well as the warm and raw colours of the chosen materials and finishes. There is no denying that this is a much anticipated addition to the trendy workplaces that seem to centralise upon this hilly area.',
    ],
    heroImage: '/projects/point92/CP.avif',
    images: [
      '/projects/point92/CP.avif',
      '/projects/point92/A1.avif',
      '/projects/point92/A2.avif',
      '/projects/point92/A3.avif',
      '/projects/point92/A4.avif',
      '/projects/point92/A5.avif',
    ],
    client: 'Private Client',
    materials: ['Timber', 'Glass', 'Stone', 'Copper'],
    area: '4,500 sq ft',
  },
  {
    id: '3',
    slug: 'boh-visitor-centre',
    title: 'Boh Visitor Center',
    year: 2023,
    location: '',
    category: '',
    shortDescription: '',
    fullDescription: [],
    heroImage: '/projects/boh-visitor/CP.avif',
    images: [
      '/projects/boh-visitor/CP.avif',
      '/projects/boh-visitor/A1.avif',
      '/projects/boh-visitor/A2.avif',
      '/projects/boh-visitor/A3.avif',
      '/projects/boh-visitor/A4.avif'
    ],
    client: '',
    materials: ['Concrete', 'Glass', 'Wood', 'Steel'],
    area: '',
  },
  {
    id: '4',
    slug: 'sierramas-house',
    title: 'sierramas house ',
    year: 2021,
    location: '',
    category: '',
    shortDescription: '',
    fullDescription: [],
    heroImage: 'AlpineMountainRetreat/AlpineMountainRetreatCoverPhoto',
    images: [
      'AlpineMountainRetreat/1',
      'AlpineMountainRetreat/2',
      'AlpineMountainRetreat/3',
      'AlpineMountainRetreat/4',
      'AlpineMountainRetreat/5',
    ],
    client: 'Private Client',
    materials: ['Stone', 'Timber', 'Glass', 'Zinc'],
    area: '',
  },
  {
    id: '5',
    slug: 'wangsa-ukay-residence',
    title: 'wangsa ukay residence',
    year: 2021,
    location: '',
    category: '',
    shortDescription: '',
    fullDescription: [],
    heroImage: '/projects/wangsa-ukay/CP.avif',
    images: [
      '/projects/wangsa-ukay/A1.avif',
      '/projects/wangsa-ukay/A2.avif',
      '/projects/wangsa-ukay/A3.avif',
    ],
    client: 'Private Client',
    materials: ['Stone', 'Timber', 'Glass', 'Zinc'],
    area: '',
  },
  {
    id: '6',
    slug: 'lantern-hotel',
    title: 'lantern hotel',
    year: 2021,
    location: '',
    category: '',
    shortDescription: '',
    fullDescription: [],
    heroImage: '/projects/lantern-hotel/CP.avif',
    images: [
      '/projects/lantern-hotel/CP.avif',
      '/projects/lantern-hotel/A1.avif',
      '/projects/lantern-hotel/A2.avif',
      '/projects/lantern-hotel/A3.avif',
      '/projects/lantern-hotel/A4.avif',
      '/projects/lantern-hotel/A5.avif',
    ],
    client: 'Private Client',
    materials: ['Stone', 'Timber', 'Glass', 'Zinc'],
    area: '6,200 sq ft',
  },
  {
    id: '7',
    slug: 'tepian-tunku',
    title: 'tepian tunku',
    year: 2021,
    location: '',
    category: '',
    shortDescription: '',
    fullDescription: [],
    heroImage: '/projects/tepian-tunku/CP.avif',
    images: [
      '/projects/tepian-tunku/CP.avif',
      '/projects/tepian-tunku/A1.avif',
      '/projects/tepian-tunku/A2.avif',
      '/projects/tepian-tunku/A3.avif',
      '/projects/tepian-tunku/A4.avif',
      '/projects/tepian-tunku/A5.avif',
    ],
    client: 'Private Client',
    materials: ['Stone', 'Timber', 'Glass', 'Zinc'],
    area: '6,200 sq ft',
  },
];