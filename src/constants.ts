import { PackageManager, PackageManagerCommand } from './types';

export const SUPPORTED_MANAGERS: PackageManager[] = ['npm', 'yarn', 'pnpm', 'bun'];

export const PM_LOCK_FILE: Record<PackageManager, string> = {
  npm: 'package-lock.json',
  yarn: 'yarn.lock',
  pnpm: 'pnpm-lock.yaml',
  bun: 'bun.lockb'
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
  bun: {
    command: 'install',
    flags: [],
  }
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
  bun: {
    command: 'install',
    flags: ['--save-dev'],
  },
};

export const MAP_REMOVE_DEV_COMMAND: Record<PackageManager, PackageManagerCommand> = {
  npm: {
    command: 'uninstall',
    flags: ['--save-dev'],
  },
  yarn: {
    command: 'remove',
    flags: ['-D'],
  },
  pnpm: {
    command: 'uninstall',
    flags: ['--save-dev'],
  },
  bun: {
    command: 'uninstall',
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
  bun: {
    command: 'uninstall',
    flags: [],
  },
};

export const MAP_UPDATE_COMMAND: Record<PackageManager, PackageManagerCommand> = {
  npm: {
    command: 'update',
    flags: [],
  },
  yarn: {
    command: 'upgrade',
    flags: [],
  },
  pnpm: {
    command: 'update',
    flags: [],
  },
  bun: {
    command: 'update',
    flags: [],
  },
};

export const MAP_LIST_COMMAND: Record<PackageManager, PackageManagerCommand> = {
  npm: {
    command: 'list',
    flags: [],
  },
  yarn: {
    command: 'list',
    flags: [],
  },
  pnpm: {
    command: 'list',
    flags: [],
  },
  bun: {
    command: 'pm ls',
    flags: [],
  },
};