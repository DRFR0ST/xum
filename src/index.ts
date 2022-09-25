import { Command } from 'commander';
import { addHandler, infoHandler, installHandler, removeHandler, wildHandler } from './handlers';

const program = new Command('xum');

program
  .description('Extremely Universal Manager - A cli app that unifies all Node package managers.')
  .version('1.0.0-alpha.2');

program.command('info').description('Print detected package manager').action(infoHandler);

program
  .command('install')
  .option('-m, --manager <manager>', 'Force using a specified package manager.')
  .description('Install dependencies')
  .action(installHandler);

program
  .command('add')
  .option('-m, --manager <manager>', 'Force using a specified package manager.')
  .description('Add dependencies')
  .action(addHandler);

program
  .command('remove')
  .option('-m, --manager <manager>', 'Force using a specified package manager.')
  .description('Remove dependencies')
  .action(removeHandler);

program
  .command('wild')
  .option('-m, --manager <manager>', 'Force using a specified package manager.')
  .description('Run wildcard commands on your own risk.\nExample: xum wild pack')
  .action(wildHandler);

program.parse(process.argv);
