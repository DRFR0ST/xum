import emoji from 'node-emoji';
import preferredPM from '../utils/preferred-pm';
import path from 'node:path';

export const __dirname = path.dirname('./');

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
