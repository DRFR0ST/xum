import { Command } from 'commander';
import emoji from 'node-emoji';
import {
  addHandler,
  infoHandler,
  initHandler,
  installHandler,
  removeHandler,
  runHandler,
  updateHandler,
  listHandler,
  scriptsHandler,
} from './handlers';
import { PackageManager } from './types';
import { execute } from './commands/execute';

const program = new Command('xum');

program
  .description('Extremely Universal Manager - A cli app that unifies all Node package managers.')
  .version('1.0.0-alpha.10 (05/29/2023)');

program.command('info').description('Print detected package manager').action(infoHandler);

program
  .command('init')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .allowUnknownOption()
  .description('Create a new package.json file')
  .action(initHandler);

program
  .command('install')
  .alias('i')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .allowUnknownOption()
  .description('Install dependencies')
  .action(installHandler);

program
  .command('run <command>')
  .alias('r')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .allowUnknownOption()
  .description('Run a command defined in package.json')
  .action(runHandler);

program
  .command('add <packages...>')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .allowUnknownOption()
  .description('Add dependencies')
  .action(addHandler);

// program
//   .command('dev add <packages...>')
//   .option(
//     '-m, --manager <manager>',
//     'Force using a specified package manager.\nExample: xum install -m pnpm',
//   )
//   .allowUnknownOption()
//   .description('Add dev dependencies')
//   .action(addDevHandler)

// program
//   .command('dev remove <packages...>')
//   .option(
//     '-m, --manager <manager>',
//     'Force using a specified package manager.\nExample: xum install -m pnpm',
//   )
//   .allowUnknownOption()
//   .description('Remove dev dependencies')
//   .action(removeDevHandler);

program
  .command('update <packages...>')
  .alias('up')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .allowUnknownOption()
  .description('Update dependencies')
  .action(updateHandler);

program
  .command('remove <packages...>')
  .alias('rm')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .allowUnknownOption()
  .description('Remove dependencies')
  .action(removeHandler);

program
  .command('list [packages...]')
  .alias('ls')
  .option(
    '-m, --manager <manager>',
    'Force using a specified package manager.\nExample: xum install -m pnpm',
  )
  .allowUnknownOption()
  .description('List dependencies')
  .action(listHandler);

program
  .command('scripts')
  .allowUnknownOption()
  .description('List scripts available in package.json.')
  .action(scriptsHandler);

// program
//   .command('*')
//   .option(
//     '-m, --manager <manager>',
//     'Force using a specified package manager.\nExample: xum install -m pnpm',
//   )
//   .allowUnknownOption()
// .description('Run wildcard commands on your own risk.\nExample: xum wild list')
//   .action(wildHandler);

program
  .on('command:*', async function (args: string[], flags: string[]) {
    const forcedManager = (
      args.includes('-m') || args.includes('--manager')
        ? args[args.indexOf('-m') + 1] || args[args.indexOf('--manager') + 1]
        : ''
    ) as PackageManager;
    const skipPrompt = args.includes('-s') || args.includes('--skip-prompt');

    console.warn(emoji.emojify(':warning:  '), 'Running an unsupported wildcard command.');

    execute('', args, forcedManager, !skipPrompt);
  })
  // .option(
  //   '-m, --manager <manager>',
  //   'Force using a specified package manager.\nExample: xum install -m pnpm',
  // )
  // .option(
  //   "-s, --skip-prompt",
  //   "Skip the warning prompt.\nExample: xum install -s"
  // )
  .addHelpCommand('*', 'Run wildcard commands on your own risk.\nExample: xum audit -- -s -m=npm')
  .parse(process.argv);
