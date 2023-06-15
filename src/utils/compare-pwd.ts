import * as bcrypt from 'bcrypt';

export const comparePwd = async (
  plainText: string,
  hashedText: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainText, hashedText);
};
