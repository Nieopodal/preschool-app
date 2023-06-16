import * as bcrypt from 'bcrypt';

export const hashPwd = async (data: string): Promise<string> => {
  return await bcrypt.hash(data, 12);
};
