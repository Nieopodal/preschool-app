import { Request } from 'express';
import { CustomBadRequestException } from '../exceptions/custom-bad-request.exception';

const acceptableMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/heif',
];

export const photoFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback,
) => {
  if (!acceptableMimeTypes.includes(file.mimetype)) {
    return callback(new CustomBadRequestException('Błędny typ pliku.'), false);
  }
  if (file.size > 7340032) {
    return callback(
      new CustomBadRequestException('Plik jest zbyt duży.'),
      false,
    );
  }

  return callback(null, true);
};
//@TODO: improve errors
