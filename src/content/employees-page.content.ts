import { Content, MainListItems } from '../types';

export interface EmployeesPageContent extends Content {
  paragraph: string;
  sections: {
    title: string;
    mainListItems: MainListItems;
  }[];
}

export const employeesPageContent: EmployeesPageContent = {
  paragraph: '',
  sections: [],
  h1: 'Pracownicy przedszkola',
  breadcrumbs: {
    routeUrl: '/pracownicy-przedszkola',
    routeName: 'Pracownicy przedszkola',
  },
};
