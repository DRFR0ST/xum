import { exec } from 'node:child_process';
import { PackageManager } from '../types';
import emoji from 'node-emoji';
import inquirer from 'inquirer';
import { lookpath } from 'lookpath';

export const ensurePackageManagerExists = async (pm: PackageManager) => {
  try {
    const pmPath = await lookpath(pm);

    if (!pmPath) throw new Error(`Package manager (${pm}) is not installed.`);

    return true;
  } catch (err) {
    if (pm !== 'npm') {
      const result = await inquirer.prompt([
        {
          name: 'should-install',
          message: `${emoji.emojify(
            `:warning:  The required package manager is not installed (${pm}).`,
          )} Would you like to install ${pm}? `,
          type: 'confirm',
        },
      ]);

      if (result['should-install']) return await installPackageManager(pm);
    }

    throw err;
  }
};

export const installPackageManager = async (pm: PackageManager) => {
  let cmd = '';

  const isWin = process.platform === 'win32';

  switch (pm) {
    case 'pnpm':
      cmd = 'npm i -g pnpm';
      break;
    case 'yarn':
      cmd = 'npm i -g yarn';
      break;
    case 'bun':
      if (isWin)
        throw new Error(
          'Bun is not yet available for Windows. Use WSL instead and refer to the docs: https://bun.sh/docs',
        );
      cmd = 'curl -fsSL https://bun.sh/install | bash';
      break;
  }

  console.log(`${emoji.emojify(':information_source:  ')} Installing ${pm}...`);
  await execPromise(cmd);
  console.log(`${emoji.emojify(':white_check_mark:  ')} ${pm} installed!\n---\n`);
};
function execPromise(command: string) {
  return new Promise(function (resolve, reject) {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout.trim());
    });
  });
}
