import { spawn } from 'node:child_process';
import { PackageManager, PackageManagerCommand } from '../types';
import { SUPPORTED_MANAGERS } from '../constants';
import emoji from 'node-emoji';
import inquirer from 'inquirer';
import preferredPM from '../utils/preferred-pm';
import { promptForPackageManager } from './pm-prompt';
import { ensurePackageManagerExists } from './install-pm';
import { reportAdditionalManagers } from '../utils/report-pm';
import path from 'node:path';

export const __dirname = path.dirname('./');

export async function execute(
  command: string | Record<PackageManager, PackageManagerCommand>,
  args: string[] = [],
  manager?: PackageManager,
  warn: boolean = false,
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
  await ensurePackageManagerExists(pm.name);
  let cmd: string = command as string;
  let flags: string[] = [];

  if (typeof command !== 'string') {
    flags = command[pm.name].flags;
    cmd = command[pm.name].command;
  }

  const cmdRoot = `${pm.name} ${cmd}`.replace('  ', ' ');

  // Warn the user of the command that is going to be executed.
  if (warn) {
    const result = await inquirer.prompt([
      {
        name: 'warning',
        message: `Are you sure, you want to run the following command:\n${emoji.emojify(
          ':arrow_right:',
        )}  ${cmdRoot} ${args.join(' ')} ${flags.join(' ')} ${emoji.emojify(':arrow_left:')} `,
        type: 'confirm',
      },
    ]);

    if (!result.warning) {
      console.log(emoji.emojify(':x:  Aborting'));
      return;
    }
  }

  reportAdditionalManagers(pm.name);

  console.log(
    emoji.emojify(':hourglass:  '),
    'Executing',
    `${cmdRoot} ${args.join(' ')} ${flags.join(' ')}`,
  );
  console.time('Execution time');
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
      console.log(emoji.emojify(':x:  '), `Crashed with code ${code?.toString()}`);
    }
    console.timeEnd('Execution time');
  });
}
