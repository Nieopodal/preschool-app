import { Content, MainListItems } from '../types';

export interface ImplementedProgramsPageContent extends Content {
  sections: {
    title: string;
    mainListItems: MainListItems;
  }[];
}

export const implementedProgramsPageContent: ImplementedProgramsPageContent = {
  h1: '',
  sections: [],
  breadcrumbs: {
    routeUrl: '/realizowane-programy-certyfikaty',
    routeName: 'Realizowane programy oraz certyfikaty',
  },
};
