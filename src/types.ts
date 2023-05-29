export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

export type PackageManagerCommand = {
  command: string;
  flags: string[];
};

export type PackageManagerInfo = {
  name: PackageManager;
  version: string;
  path: string;
};
