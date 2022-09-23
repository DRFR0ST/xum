// import preferredPM from 'preferred-pm';
import { Command } from 'commander';
// import { exec } from 'child_process';

const program = new Command("xum");

program
    .description("Extremely Universal Manager - A script that unifies all package managers")
    .version("1.0.0-alpha.0");

program
    .command('install')
    .description('install dependencies')
    .action(() => {
        console.log("Install dependencies...");
        // const pm = preferredPM(__dirname);
        // exec(`${pm} install`, (error, stdout, stderr) => {
        //     if (error) {
        //         console.error(`exec error: ${error}`);
        //         return;
        //     }
        //     console.log(`stdout: ${stdout}`);
        //     console.error(`stderr: ${stderr}`);
        // });
    })

// program
//     .command('run')
//     .description('run command')
//     .action((r: any) => {
//         const pm = preferredPM(__dirname);
//         exec(`${pm} ${r}`, (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`exec error: ${error}`);
//                 return;
//             }
//             console.log(`stdout: ${stdout}`);
//             console.error(`stderr: ${stderr}`);
//         });
//     })

program.parse();
