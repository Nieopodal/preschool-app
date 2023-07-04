import slugify from 'slugify';

export const generateSlugHandler = (title: string): string =>
  slugify(title, { lower: true, remove: /[*+~.()'"#$%^&_{}<>/:@]/g });
