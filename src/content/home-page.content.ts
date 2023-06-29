export interface HomePageContent {
  hero: {
    h1: string;
    headerDescription: string;
    img: {
      src: string;
      alt: string;
    };
  };
  whyUs: {
    h2: string;
    paragraph: string;
    img: {
      src: string;
      alt: string;
    };
  };
  recentNews: {
    h2: string;
  };
}

export const homePageContent: HomePageContent = {
  hero: { h1: '', headerDescription: '', img: { alt: '', src: '' } },
  recentNews: { h2: '' },
  whyUs: { h2: '', img: { alt: '', src: '' }, paragraph: '' },
};
