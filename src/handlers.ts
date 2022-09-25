import { Command } from 'commander';
import { MAP_ADD_COMMAND, MAP_REMOVE_COMMAND } from './constants';
import { execute, packageManagerInfo } from './utils';

export const installHandler = async (e: unknown, cmd: Command) => {
  const forcedManager = cmd.getOptionValue('manager');

  execute('install', undefined, forcedManager);
};

export const addHandler = async (e: unknown, cmd: Command) => {
  const forcedManager = cmd.getOptionValue('manager');

  execute(MAP_ADD_COMMAND, cmd.args, forcedManager);
};

export const removeHandler = async (e: unknown, cmd: Command) => {
  const forcedManager = cmd.getOptionValue('manager');

  execute(MAP_REMOVE_COMMAND, cmd.args, forcedManager);
};

export const infoHandler = async () => {
  packageManagerInfo();
};

export const wildHandler = async (e: unknown, cmd: Command) => {
  const forcedManager = cmd.getOptionValue('manager');

  execute('', cmd.args, forcedManager);
};
