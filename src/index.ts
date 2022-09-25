import { Command } from 'commander';
import {
  addHandler,
  infoHandler,
  installHandler,
  removeHandler,
  runHandler,
  wildHandler,
} from './handlers';

const program = new Command('xum');

program
  .description('Extremely Universal Manager - A cli app that unifies all Node package managers.')
  .version('1.0.0-alpha.4');

program.command('info').description('Print detected package manager').action(infoHandler);

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
