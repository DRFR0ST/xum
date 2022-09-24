import { Command } from 'commander';
import { addHandler, infoHandler, installHandler, removeHandler } from './handlers';

const program = new Command('xum');

program
  .description('Extremely Universal Manager - A cli app that unifies all Node package managers.')
  .version('1.0.0-alpha.0');

program
    .command("info")
    .description("Print detected package manager")
    .action(infoHandler);

program
  .command('install')
  .description('Install dependencies')
  .action(installHandler);
  
program
  .command('add')
  .description('Add dependencies')
  .action(addHandler);
  
program
    .command("remove")
    .description("Remove dependencies")
    .action(removeHandler)

program.parse(process.argv);
