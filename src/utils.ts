import { ExecException, spawn } from 'node:child_process';
import preferredPM from 'preferred-pm';
import { PackageManager, PackageManagerCommand } from './types';
import fs from 'fs';
import path from 'node:path';
import { PM_LOCK_FILE, SUPPORTED_MANAGERS } from './constants';
import emoji from 'node-emoji';
import inquirer from 'inquirer';

const __dirname = path.dirname('./');

export async function execute(
  command: string | Record<PackageManager, PackageManagerCommand>,
  args: string[] = [],
  manager?: PackageManager,
) {
  let pm: { name: PackageManager; version: string };

  if (!manager) {
    pm = (await preferredPM(__dirname)) as typeof pm;

    if (!pm) {
      await execute(command, args, await promptForPackageManager());
      return;
    }
  } else {
    if (!SUPPORTED_MANAGERS.includes(manager)) {
      await execute(command, args, await promptForPackageManager());
      return;
    } else {
      pm = {
        name: manager,
        version: '-',
      };
    }
  }
  let cmd: string = command as string;
  let flags: string[] = [];

  if (typeof command !== 'string') {
    flags = command[pm.name].flags;
    cmd = command[pm.name].command;
  }

  reportAdditionalManagers(pm.name);
  console.log(
    emoji.emojify(':hourglass:  '),
    'Executing',
    `${pm.name} ${cmd} ${args.join(' ')} ${flags.join(' ')}`,
  );

  const process = spawn(pm.name, [cmd, ...args, ...flags], { shell: true, stdio: 'inherit' });

  process.stdout?.on('data', function (data) {
    console.log(emoji.emojify(':information_source:  '), data.toString());
  });

  process.stderr?.on('data', function (data) {
    console.log(emoji.emojify(':warning:  '), data.toString());
  });

  process.on('exit', function (code) {
    if (code === 0) {
      console.log(emoji.emojify(':white_check_mark:  Done'));
    } else {
      console.log(emoji.emojify(':x:  '), code?.toString());
    }
  });
}

export const execCallback = (error: ExecException | null, stdout: string, stderr: string) => {
  if (error) {
    console.error(`An error occurred during command execution.`, error);
    return;
  }
  console.log(stdout);
  console.error(stderr);
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

export const promptForPackageManager = async () => {
  return (
    await inquirer.prompt([
      {
        type: 'list',
        name: 'pick-pm',
        message: 'Package manager could not be detected. Which one should be used instead?',
        default: 'npm',
        choices: ['npm', 'yarn', 'pnpm'],
      },
    ])
  )?.['pick-pm'];
};
