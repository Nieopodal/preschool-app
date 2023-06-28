import { Content } from '../types';

export interface SitemapPageContent extends Content {
  sites: {
    url: string;
    name: string;
  }[];
}

export const sitemapPageContent: SitemapPageContent = {
  h1: 'Mapa strony',
  sites: [
    {
      url: '/',
      name: 'Strona główna',
    },
    {
      url: '/aktualnosci',
      name: 'Aktualności',
    },
    {
      url: '/pracownicy-przedszkola',
      name: 'Pracownicy przedszkola',
    },
    {
      url: '/grupy-w-przedszkolu',
      name: 'Grupy w przedszkolu',
    },
    {
      url: '/realizowane-programy-certyfikaty',
      name: 'Realizowane programy oraz certyfikaty',
    },
    {
      url: '/organizacja-pracy',
      name: 'Organizacja pracy',
    },
    {
      url: '/album',
      name: 'Album fotograficzny',
    },
    {
      url: '/regulamin-i-procedury',
      name: 'Regulamin i procedury',
    },
    {
      url: '/o-przedszkolu',
      name: 'O przedszkolu',
    },
    {
      url: '/kontakt',
      name: 'Kontakt',
    },
    {
      url: '/statut',
      name: 'Statut',
    },
    {
      url: '/oplaty',
      name: 'Opłaty',
    },
    {
      url: '/ochrona-danych-osobowych',
      name: 'Ochrona danych osobowych',
    },
    {
      url: '/informacje-o-dostepnosci',
      name: 'Informacje o dostępności',
    },
    {
      url: '/auth/login',
      name: 'Panel logowania',
    },
    {
      url: '/mapa-strony',
      name: 'Mapa strony',
    },
  ],
  breadcrumbs: {
    routeUrl: '/mapa-strony',
    routeName: 'Mapa strony',
  },
};
