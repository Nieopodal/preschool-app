import { Content } from '../types';

export interface OrganizationPageContent extends Content {
  hoursDescription: string;
  hours: string;
  h2: string;
  classes: {
    years: string;
    name: string;
  }[];
}

export const organizationPageContent: OrganizationPageContent = {
  classes: [],
  h2: '',
  hours: '',
  hoursDescription: '',
  h1: 'Organizacja pracy',
  breadcrumbs: {
    routeUrl: '/organizacja-pracy',
    routeName: 'Organizacja pracy',
  },
};
