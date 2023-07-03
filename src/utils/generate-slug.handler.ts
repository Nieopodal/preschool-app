import slugify from 'slugify';
import * as short from 'short-uuid';

export const generateSlugHandler = (title: string): string =>
  slugify(title, { lower: true, remove: /[*+~.()'"#$%^&_{}<>/:@]/g }) +
  '-' +
  short.generate();
