import inquirer from 'inquirer';

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
