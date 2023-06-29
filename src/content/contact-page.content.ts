import { ContactContent, contactContent } from './contact.content';
import { Content } from '../types';

export interface ContactPageContent extends Content {
  contactDetails: ContactContent;
  mapSrc: string;
}

export const contactPageContent: ContactPageContent = {
  h1: 'Kontakt',
  contactDetails: contactContent,
  mapSrc: '',
  breadcrumbs: {
    routeUrl: '/kontakt',
    routeName: 'Kontakt',
  },
};
