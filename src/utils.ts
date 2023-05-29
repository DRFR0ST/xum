import { ExecException, exec, spawn } from 'node:child_process';
import { PackageManager, PackageManagerCommand } from './types';
import fs from 'fs';
import path from 'node:path';
import { PM_LOCK_FILE, SUPPORTED_MANAGERS } from './constants';
import emoji from 'node-emoji';
import inquirer from 'inquirer';
import { lookpath } from 'lookpath';
import preferredPM from './preferred-pm';
import {
  findNearestPackageJson,
} from 'find-nearest-package-json'

const __dirname = path.dirname('./');

export async function execute(
  command: string | Record<PackageManager, PackageManagerCommand>,
  args: string[] = [],
  manager?: PackageManager,
  warn: boolean = false
) {
  let pm: { name: PackageManager; version: string };

  if (!manager) {
    pm = (await preferredPM(__dirname)) as typeof pm;

    if (!pm) {
      await execute(command, args, await promptForPackageManager());
      return;
    }
  } else {
    if (!SUPPORTED_MANAGERS.includes(manager)) {
      await execute(command, args, await promptForPackageManager());
      return;
    } else {
      pm = {
        name: manager,
        version: '-',
      };
    }
  }
  await ensurePackageManagerExists(pm.name);
  let cmd: string = command as string;
  let flags: string[] = [];

  if (typeof command !== 'string') {
    flags = command[pm.name].flags;
    cmd = command[pm.name].command;
  }

  const cmdRoot = `${pm.name} ${cmd}`.replace('  ', ' ');

  // Warn the user of the command that is going to be executed.
  if (warn) {
    const result = await inquirer.prompt([
      {
        name: 'warning',
        message: `Are you sure, you want to run the following command:\n${emoji.emojify(":arrow_right:")}  ${cmdRoot} ${args.join(' ')} ${flags.join(' ')} ${emoji.emojify(":arrow_left:")} `,
        type: 'confirm'
      }
    ]);

    if (!result.warning) {
      console.log(emoji.emojify(':x:  Aborting'));
      return;
    }
  }

  reportAdditionalManagers(pm.name);

  console.log(
    emoji.emojify(':hourglass:  '),
    'Executing',
    `${cmdRoot} ${args.join(' ')} ${flags.join(' ')}`,
  );
  console.time('Execution time');
  const process = spawn(pm.name, [cmd, ...args, ...flags], { shell: true, stdio: 'inherit' });

  process.stdout?.on('data', function (data) {
    console.log(emoji.emojify(':information_source:  '), data.toString());
  });

  process.stderr?.on('data', function (data) {
    console.log(emoji.emojify(':warning:  '), data.toString());
  });

  process.on('exit', function (code) {
    if (code === 0) {
      console.log(emoji.emojify(':white_check_mark:  Done'));
    } else {
      console.log(emoji.emojify(':x:  '), `Crashed with code ${code?.toString()}`);
    }
    console.timeEnd('Execution time');
  });
}

export const execCallback = (error: ExecException | null, stdout: string, stderr: string) => {
  if (error) {
    console.error(emoji.emojify(':x:  '), `An error occurred during command execution.`, error);
    return;
  }
  console.log(stdout);
  console.error(stderr);
};

export const packageManagerInfo = async () => {
  const pm = await preferredPM(__dirname);

  if (!pm) {
    console.log(emoji.emojify(':warning:  '), 'No package manager detected!');
    return;
  }
  console.log('Package manager: ', pm?.name);
  console.log('Version: ', pm?.version);
  console.log('Path: ', pm?.path);
};

export const getScriptsList = async () => {
  try {
    const pkgJsonNearest = await findNearestPackageJson();
  
    let rawdata = fs.readFileSync(pkgJsonNearest.path);
    let pkgJson = JSON.parse(rawdata as unknown as string);
  
    const scriptKeys = Object.keys(pkgJson?.scripts ?? {});

    if(scriptKeys.length > 0) {
      console.log(emoji.emojify(":information_source:  "), "Scripts found in the nearest package.json:");

      scriptKeys.forEach((key) => {
        const scriptCmd = pkgJson.scripts[key];

        console.log(emoji.emojify(":arrow_right:  "), `${key}: ${scriptCmd}`);
      });
    } else {
      console.warn(emoji.emojify(":warning:  "), "No scripts were found in the nearest package.json.");
      return;
    }
  } catch(err) {
    throw new Error("An error occurred while reading the package.json file.");
  }
}

export const reportAdditionalManagers = (manager: PackageManager) => {
  (Object.keys(PM_LOCK_FILE) as PackageManager[]).forEach((pm: PackageManager) => {
    if (manager !== pm && fileExists('./' + PM_LOCK_FILE[pm]))
      console.warn(
        emoji.emojify(':warning:  '),
        `Using ${manager} but a ${PM_LOCK_FILE[pm]} file was found.`,
      );
  });
};

export const fileExists = (path: string) => {
  return fs.existsSync(path);
};

export const promptForPackageManager = async () => {
  return (
    await inquirer.prompt([
      {
        type: 'list',
        name: 'pick-pm',
        message: 'Package manager could not be detected. Which one should be used instead?',
        default: 'npm',
        choices: ['npm', 'yarn', 'pnpm', 'bun'],
      },
    ])
  )?.['pick-pm'];
};

export const ensurePackageManagerExists = async (pm: PackageManager) => {
  try {
    return await lookpath(pm);
  } catch(err) {
    if(pm !== "npm"){
      const result = await inquirer.prompt([
        {
          name: "should-install",
          message: `${emoji.emojify(`:warning:  The required package manager is not installed (${pm}).`)} Would you like to install ${pm}? `,
          type: "confirm"
        }
      ])
  
      if(result['should-install']) 
        return await installPackageManager(pm);
    }

    throw new Error(`Package manager (${pm}) is not installed.`)
  }
}

export const installPackageManager = async (pm: PackageManager) => {
  let cmd = "";

  const isWin = process.platform === "win32";

  switch(pm) {
    case "pnpm":
      cmd = "npm i -g pnpm";
      break;
    case "yarn":
      cmd = "npm i -g yarn";
      break;
    case "bun":
      if(isWin)
        throw new Error("Bun is not yet available for Windows. Use WSL instead and refer to the docs: https://bun.sh/docs");
      cmd = 'curl -fsSL https://bun.sh/install | bash';
      break;
  }

  console.log(`${emoji.emojify(":information_source:  ")} Installing ${pm}...`);
  await execPromise(cmd);
  console.log(`${emoji.emojify(":white_check_mark:  ")} ${pm} installed!`);
}

function execPromise(command: string) {
  return new Promise(function(resolve, reject) {
      exec(command, (error, stdout, stderr) => {
          if (error) {
              reject(error);
              return;
          }

          resolve(stdout.trim());
      });
  });
}