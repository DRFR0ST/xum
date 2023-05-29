import findYarnWorkspaceRoot from 'find-yarn-workspace-root2';
import { findUp } from 'find-up';
import path from 'path';
import which from 'which';
import { pathExists } from 'path-exists';
import whichPM from 'which-pm';
import { PackageManagerInfo } from '../types';

/**
 * @description Get the preferred package manager for a given package
 * @param pkgPath The path to the package to check
 * @returns The preferred package manager for the package at `pkgPath`
 * @example
 * ```js
 * const preferredPM = require('preferred-pm');
 *
 * (async () => {
 *  const pm = await preferredPM('/path/to/package');
 *  console.log(pm);
 * })();
 * ```
 */
export default async function preferredPM(
  pkgPath: string,
): Promise<PackageManagerInfo | undefined> {
  if (typeof pkgPath !== 'string') {
    throw new TypeError(`pkgPath should be a string, got ${typeof pkgPath}`);
  }

  if (await pathExists(path.join(pkgPath, 'package-lock.json'))) {
    return {
      name: 'npm',
      version: '>=5',
      path: await which('npm'),
    };
  }

  if (await pathExists(path.join(pkgPath, 'yarn.lock'))) {
    return {
      name: 'yarn',
      version: '*',
      path: await which('yarn'),
    };
  }

  if (await pathExists(path.join(pkgPath, 'pnpm-lock.yaml'))) {
    return {
      name: 'pnpm',
      version: '>=3',
      path: await which('pnpm'),
    };
  }

  if (await pathExists(path.join(pkgPath, 'bun.lockb'))) {
    return {
      name: 'bun',
      version: '*',
      path: await which('bun'),
    };
  }

  if (await pathExists(path.join(pkgPath, 'shrinkwrap.yaml'))) {
    return {
      name: 'pnpm',
      version: '1 || 2',
      path: await which('pnpm'),
    };
  }

  if (await findUp('pnpm-lock.yaml', { cwd: pkgPath })) {
    return {
      name: 'pnpm',
      version: '>=3',
      path: await which('pnpm'),
    };
  }

  try {
    if (typeof findYarnWorkspaceRoot(pkgPath) === 'string') {
      return {
        name: 'yarn',
        version: '*',
        path: await which('yarn'),
      };
    }
  } catch (err) {}

  const pm = await whichPM(pkgPath);
  // @ts-ignore
  return pm && { name: pm.name, version: pm.version || '*', path: await which(pm.name) };
}
