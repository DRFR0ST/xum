import fs from 'fs';
import emoji from 'node-emoji';
import { findNearestPackageJson } from 'find-nearest-package-json';
import chalk from 'chalk';

export const getScriptsList = async () => {
  try {
    const pkgJsonNearest = await findNearestPackageJson();

    let rawdata = fs.readFileSync(pkgJsonNearest.path);
    let pkgJson = JSON.parse(rawdata as unknown as string);

    const scriptKeys = Object.keys(pkgJson?.scripts ?? {});

    if (scriptKeys.length > 0) {
      console.log(
        emoji.emojify(':information_source:  '),
        'Scripts found in the nearest package.json:\n',
      );

      scriptKeys.forEach(key => {
        const scriptCmd = pkgJson.scripts[key];

        console.log(emoji.emojify(':arrow_right:  '), chalk.bold(key), chalk.dim(`${scriptCmd}`));
      });
    } else {
      console.warn(
        emoji.emojify(':warning:  '),
        'No scripts were found in the nearest package.json.',
      );
      return;
    }
  } catch (err) {
    throw new Error('An error occurred while reading the package.json file.');
  }
};
