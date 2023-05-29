import fs from 'fs';

export const fileExists = (path: string) => {
  return fs.existsSync(path);
};
