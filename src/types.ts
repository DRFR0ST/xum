export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export type PackageManagerCommand = {
  command: string;
  flags: string[];
};
