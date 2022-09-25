import { exec, ExecException } from 'node:child_process';
import preferredPM from 'preferred-pm';
import { PackageManager } from './types';
import path from 'node:path';

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
