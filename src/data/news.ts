export interface NewsItem {
    id: string;
    slug: string;
    date: string;
    title: string;
    description: string;
    image: string; // Cloudinary public ID
    category?: string;
  }
  
  export const newsItems: NewsItem[] = [
    {
      id: '1',
      slug: 'zlg-wins-awards',
      date: 'October 15, 2024',
      title: 'zlg wins awards',
      description: 'Our urban tower project has been recognized with the prestigious International Architecture Excellence Award for sustainable design.',
      image: 'News/award-announcement',
      category: 'Awards',
    },
    {
      id: '2',
      slug: 'coastal-innovation-hub',
      date: 'September 28, 2024',
      title: 'Breaking Ground on Coastal Innovation Hub',
      description: 'Construction begins on our largest project to date—a 200,000 sq ft research and innovation center on the California coast.',
      image: 'News/coastal-innovation-hub',
      category: 'Projects',
    },
  ];