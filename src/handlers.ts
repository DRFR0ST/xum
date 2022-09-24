import { exec } from "child_process";
import { Command } from "commander";
import path from 'node:path';
import preferredPM from "preferred-pm";
import { MAP_ADD_COMMAND, MAP_REMOVE_COMMAND } from "./constants";

const __dirname = path.dirname("./");

export const installHandler = async () => {
    const pm = await preferredPM(__dirname);

    exec(`${pm?.name} install`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`${stdout}`);
      console.error(`${stderr}`);
    });
  };
  
  export const addHandler = async (e: unknown, cmd: Command) => {
    const pm = await preferredPM(__dirname);
    
    if(!pm) {
        throw new Error("Package manager could not be identified.");
    }

    exec(`${pm?.name} ${MAP_ADD_COMMAND[pm.name]} ${cmd.args.join(" ")}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`${stdout}`);
      console.error(`${stderr}`);
    });
  };
  
export const removeHandler = async (e: unknown, cmd: Command) => {
    const pm = await preferredPM(__dirname);
    
    if(!pm) {
        throw new Error("Package manager could not be identified.");
    }

    exec(`${pm?.name} ${MAP_REMOVE_COMMAND[pm.name]} ${cmd.args.join(" ")}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`${stdout}`);
      console.error(`${stderr}`);
    });
}

export const infoHandler = async () => {
    const pm = await preferredPM(__dirname);
    
    console.log("Detected package manager: ", pm);
}