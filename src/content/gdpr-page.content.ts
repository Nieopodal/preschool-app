import { Content } from '../types';

export interface GdprPageContent extends Content {
  sections: {
    title: string;
    subtitle?: string;
    mainListItems: {
      text: string;
      paragraphs?: string[];
      smallListItems?: string[];
    }[];
  }[];
}

export const gdprPageContent: GdprPageContent = {
  h1: 'Polityka prywatności oraz przetwarzanie danych osobowych w mediach społecznościowych',
  sections: [],
  breadcrumbs: {
    routeUrl: '/ochrona-danych-osobowych',
    routeName: 'Ochrona danych osobowych',
  },
};
