import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { v4 as uuidv4 } from 'uuid'

// JSON with commands
const commandsFilePath = path.join(__dirname, '..', '..', 'commands.json')

export class Command {
  static addNewCommand(command: any) {
    // Generate command ID
    command.id = uuidv4();
    command.default = false;  // Set default attribute

    // Get JSON content
    const commands = this.getCommandList()

    // Write new command list to JSON file
    fs.writeFileSync(commandsFilePath, JSON.stringify([...commands, command]))
  }

  static getCommandList() {
    const file = fs.readFileSync(commandsFilePath);
    const stringText = file.toString();
    const commands = JSON.parse(stringText)
  
    return commands;
  }

  static executeCommand(name: string) {
    const file = fs.readFileSync(commandsFilePath);
    const stringText = file.toString();
  
    const commands: any = JSON.parse(stringText);
  
    const [command] = commands.filter((command: any) => command.name === name);
  
    switch (command.type) {
      case "shell":
        exec(command.content);
        break;
  
      case "program":
        exec(command.content);
        break;
  
      case "website":
        exec(`start \"\" \"${command.content}\"`);
        break;
    
      default:
        break;
    }
  
    return command;
  }

  static removeCommand(command: any) {
    // Get JSON content
    let commands = this.getCommandList()
  
    // Filter command
    commands = commands.filter((item: any) => command.id !== item.id)
  
    // Write new command list to JSON file
    fs.writeFileSync(commandsFilePath, JSON.stringify(commands))
  }
}