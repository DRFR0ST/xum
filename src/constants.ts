import { PackageManager, PackageManagerCommand } from './types';

export const SUPPORTED_MANAGERS: PackageManager[] = ['npm', 'yarn', 'pnpm'];

export const PM_LOCK_FILE: Record<PackageManager, string> = {
  npm: 'package-lock.json',
  yarn: 'yarn.lock',
  pnpm: 'pnpm-lock.yaml',
};

export const MAP_ADD_COMMAND: Record<PackageManager, PackageManagerCommand> = {
  npm: {
    command: 'install',
    flags: [],
  },
  yarn: {
    command: 'add',
    flags: [],
  },
  pnpm: {
    command: 'install',
    flags: [],
  },
};

export const MAP_ADD_DEV_COMMAND: Record<PackageManager, PackageManagerCommand> = {
  npm: {
    command: 'install',
    flags: ['--save-dev'],
  },
  yarn: {
    command: 'add',
    flags: ['-D'],
  },
  pnpm: {
    command: 'install',
    flags: ['--save-dev'],
  },
};

export const MAP_REMOVE_COMMAND: Record<PackageManager, PackageManagerCommand> = {
  npm: {
    command: 'uninstall',
    flags: [],
  },
  yarn: {
    command: 'remove',
    flags: [],
  },
  pnpm: {
    command: 'uninstall',
    flags: [],
  },
};
