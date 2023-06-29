import * as fs from 'fs/promises';
import * as path from 'path';
import { InternalServerErrorException } from '@nestjs/common';

export const getPagesDataHandler = async (pageName: string) => {
  try {
    const destination = path.join(__dirname, process.env.CONTENT_PATCH);
    const data = await fs.readFile(destination, {
      encoding: 'utf-8',
    });
    const encoded = await JSON.parse(data);
    if (!encoded[pageName])
      throw new InternalServerErrorException(
        `Static data "${pageName}" not found!`,
      );
    return encoded[pageName];
  } catch (e) {
    throw new InternalServerErrorException(e);
  }
};
