import { PackageManager } from '../types';
import { PM_LOCK_FILE } from '../constants';
import emoji from 'node-emoji';
import { fileExists } from './file-exists';

export const reportAdditionalManagers = (manager: PackageManager) => {
  (Object.keys(PM_LOCK_FILE) as PackageManager[]).forEach((pm: PackageManager) => {
    if (manager !== pm && fileExists('./' + PM_LOCK_FILE[pm]))
      console.warn(
        emoji.emojify(':warning:  '),
        ` Using ${manager} but a ${PM_LOCK_FILE[pm]} file was found.`,
      );
  });
};
