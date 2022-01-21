import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

export function executeCommand(name: string) {
  const file = fs.readFileSync(path.join(__dirname, '..', '..', 'commands.json'));
  const stringText = file.toString();

  const commands: any = JSON.parse(stringText);

  const [command] = commands.filter((command: any) => command.name === name);

  switch (command.type) {
    case "shell":
      exec(command.content);
      break;
  
    default:
      break;
  }

  return command;
}