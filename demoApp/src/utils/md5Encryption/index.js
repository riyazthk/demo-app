/* eslint-disable prettier/prettier */
import md5 from 'md5';

export const generateMd5Encryption = payloadValue => {
  return md5(payloadValue);
};
