import { Command } from 'commander';
import {
  addDevHandler,
  addHandler,
  infoHandler,
  initHandler,
  installHandler,
  removeHandler,
  runHandler,
  wildHandler,
} from './handlers';

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

program.parse(process.argv);
