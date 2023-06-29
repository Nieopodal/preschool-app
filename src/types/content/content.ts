export interface Content {
  h1: string;
  breadcrumbs: {
    routeUrl: string;
    routeName: string;
  };
}

export interface MainListItem {
  text: string;
  smallListItems?: string[];
}

export type MainListItems = MainListItem[];
