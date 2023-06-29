import { Content } from '../types';

export interface StatutePageContent extends Content {
  fileSrc: string;
  ariaLabel: string;
  altText: string;
}

export const statutePageContent: StatutePageContent = {
  altText: '',
  ariaLabel: '',
  fileSrc: '',
  h1: 'Statut',
  breadcrumbs: {
    routeUrl: '/statut',
    routeName: 'Statut',
  },
};
