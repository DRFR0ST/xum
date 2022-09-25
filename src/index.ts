import { Command } from 'commander';
import emoji from 'node-emoji';
import {
  addDevHandler,
  addHandler,
  infoHandler,
  initHandler,
  installHandler,
  removeHandler,
  runHandler,
  updateHandler,
  wildHandler,
} from './handlers';
import { PackageManager } from './types';
import { execute } from './utils';

const program = new Command('xum');

program
  .description('Extremely Universal Manager - A cli app that unifies all Node package managers.')
  .version('1.0.0-alpha.5');

program.command('info').description('Print detected package manager').action(infoHandler);

program
  .command('init')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .description('Create a new package.json file')
  .action(initHandler);

program
  .command('install')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .description('Install dependencies')
  .action(installHandler);

program
  .command('run <command>')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .description('Run a command defined in package.json')
  .action(runHandler);

program
  .command('add packages...')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .description('Add dependencies')
  .action(addHandler);

program
  .command('dev add packages...')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .description('Add dev dependencies')
  .action(addDevHandler);

program
  .command('update packages...')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .description('Update dependencies')
  .action(updateHandler);

program
  .command('remove packages...')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .description('Remove dependencies')
  .action(removeHandler);

program
  .command('wild')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .description('Run wildcard commands on your own risk.\nExample: xum wild pack')
  .action(wildHandler);

program
  .on('command:*', async function (cmd: string[], flags: string[]) {
    const forcedManager = (flags.filter((flag, i, arr) => {
      return (
        flag === '--manager' || flag === '-m' || arr[i - 1] === '--manager' || arr[i - 1] === '-m'
      );
    })[1] ?? undefined) as PackageManager;

    console.warn(
      emoji.emojify(':warning:  '),
      'Running an unsupported wildcard command. Make sure to specify the package manager using --manager <npm|yarn|pnpm> flag.',
    );

    execute('', [...cmd, ...flags], forcedManager);
  })
  .parse(process.argv);
