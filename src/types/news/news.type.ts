export interface News {
  id: string;
  title: string;
  article: string;
  createdAt: Date;
}

export interface NewsResponse extends Omit<News, 'createdAt'> {
  createdAt: string;
}
