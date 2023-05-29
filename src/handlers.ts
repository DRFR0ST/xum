import { Command } from 'commander';
import {
  MAP_ADD_COMMAND,
  MAP_ADD_DEV_COMMAND,
  MAP_REMOVE_DEV_COMMAND,
  MAP_REMOVE_COMMAND,
  MAP_UPDATE_COMMAND,
  MAP_LIST_COMMAND,
} from './constants';
import { packageManagerInfo } from './commands/pm-info';
import { getScriptsList } from './commands/pkg-json-scripts';
import { execute } from './commands/execute';

export const initHandler = async (e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute('init', [...cmd.args], forcedManager);
};

export const installHandler = async (e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute('install', [...cmd.args], forcedManager);
};

export const runHandler = async (input: string, e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute('run', [...cmd.args], forcedManager);
};

export const addHandler = async (packages: string[], e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_ADD_COMMAND, packages, forcedManager);
};

export const addDevHandler = async (ee: unknown, packages: string[], e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_ADD_DEV_COMMAND, [...cmd.args], forcedManager);
};

export const removeDevHandler = async (
  ee: unknown,
  packages: string[],
  e: unknown,
  cmd: Command,
) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_REMOVE_DEV_COMMAND, [...cmd.args], forcedManager);
};

export const updateHandler = async (packages: string[], e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_UPDATE_COMMAND, [...cmd.args], forcedManager);
};

export const removeHandler = async (packages: string[], e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_REMOVE_COMMAND, [...cmd.args], forcedManager);
};

export const infoHandler = async () => {
  await packageManagerInfo();
};

export const listHandler = async (packages: string[], e: unknown, cmd: Command) => {
  const forcedManager = cmd?.getOptionValue?.('manager')?.replace('=', '');

  execute(MAP_LIST_COMMAND, [...cmd.args], forcedManager);
};

export const scriptsHandler = async (e: unknown, cmd: Command) => {
  await getScriptsList();
};
