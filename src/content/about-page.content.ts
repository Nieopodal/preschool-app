import { Content } from '../types';

interface AboutPageContent extends Content {
  h2: string;
  mainPromotion: {
    title: string;
    paragraph: string;
  };
  advantages: {
    title: string;
    listItems: string[];
  }[];
}

export const aboutPageContent: AboutPageContent = {
  advantages: [],
  h2: '',
  mainPromotion: { paragraph: '', title: '' },
  h1: 'O przedszkolu',
  breadcrumbs: {
    routeUrl: '/o-przedszkolu',
    routeName: 'O przedszkolu',
  },
};
