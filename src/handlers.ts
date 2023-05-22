import { Command } from 'commander';
import {
  MAP_ADD_COMMAND,
  MAP_ADD_DEV_COMMAND,
  MAP_REMOVE_COMMAND,
  MAP_UPDATE_COMMAND,
  MAP_LIST_COMMAND,
} from './constants';
import { execute, packageManagerInfo } from './utils';

export const initHandler = async (e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute('init', undefined, forcedManager);
};

export const installHandler = async (e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute('install', undefined, forcedManager);
};

export const runHandler = async (input: string, e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute('run', [input], forcedManager);
};

export const addHandler = async (packages: string[], e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_ADD_COMMAND, packages, forcedManager);
};

export const addDevHandler = async (ee: unknown, packages: string[], e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_ADD_DEV_COMMAND, packages, forcedManager);
};

export const updateHandler = async (packages: string[], e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_UPDATE_COMMAND, packages, forcedManager);
};

export const removeHandler = async (packages: string[], e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_REMOVE_COMMAND, packages, forcedManager);
};

export const infoHandler = async () => {
  packageManagerInfo();
};

export const listHandler = async (packages: string[], e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_LIST_COMMAND, packages, forcedManager)
};

export const wildHandler = async (e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute('', cmd.args, forcedManager, true);
};
