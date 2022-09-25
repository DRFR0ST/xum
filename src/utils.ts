import { exec, ExecException } from 'node:child_process';
import preferredPM from 'preferred-pm';
import { PackageManager } from './types';
import fs from 'fs';
import path from 'node:path';
import { PM_LOCK_FILE } from './constants';

const __dirname = path.dirname('./');

export async function execute(
  command: string | Record<PackageManager, string>,
  args: string[] = [],
  manager?: PackageManager,
) {
  let pm: { name: PackageManager; version: string };

  if (!manager) {
    pm = (await preferredPM(__dirname)) as typeof pm;

    if (!pm) throw new Error('Package manager could not be identified.');
  } else {
    pm = {
      name: manager,
      version: '-',
    };
  }

  if (typeof command !== 'string') command = command[pm.name];

  reportAdditionalManagers(pm.name);
  console.log('Executing', `${pm.name} ${command} ${args.join(' ')}`);
  return exec(`${pm.name} ${command} ${args.join(' ')}`, execCallback);
}

export const execCallback = (error: ExecException | null, stdout: string, stderr: string) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`${stdout}`);
  console.error(`${stderr}`);
};

export const packageManagerInfo = async () => {
  const pm = await preferredPM(__dirname);

  if (!pm) {
    console.log('No package manager detected!');
    return;
  }
  console.log('Package manager: ', pm?.name);
  console.log('Version: ', pm?.version);
};

export const reportAdditionalManagers = (manager: PackageManager) => {
  (Object.keys(PM_LOCK_FILE) as PackageManager[]).forEach((pm: PackageManager) => {
    if (manager !== pm && fileExists('./' + PM_LOCK_FILE[pm]))
      console.warn(`Using ${manager} but a ${PM_LOCK_FILE[pm]} file was found.`);
  });
};

export const fileExists = (path: string) => {
  return fs.existsSync(path);
};
