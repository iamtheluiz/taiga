import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { v4 as uuidv4 } from 'uuid'

import { log } from '../logger'

// JSON with commands
const commandsFilePath = process.env.NODE_ENV === 'production'
  ? path.join(process.resourcesPath, 'commands.json')
  : path.join(__dirname, '..', '..', 'commands.json')

const commandLog = log.scope('Command')

export class Command {
  static addNewCommand(command: any) {
    commandLog.info('addNewCommand - received input:', command)
  
    // Generate command ID and set default attribute
    command = {
      id: uuidv4(),
      ...command,
      default: false
    }
    commandLog.info('addNewCommand - command:', command)

    // Get JSON content
    const commands = this.getCommandList()
    const newCommands = [...commands, command]

    // Write new command list to JSON file
    try {
      fs.writeFileSync(commandsFilePath, JSON.stringify(newCommands))
      commandLog.info('addNewCommand - writing command list to file:', {
        file: commandsFilePath,
        commands: newCommands
      })
    } catch (error) {
      commandLog.error('addNewCommand - error writing command list to file:', error)
    }
  }

  static getCommandList() {
    commandLog.debug('getCommandList')

    const file = fs.readFileSync(commandsFilePath);
    const stringText = file.toString();
    commandLog.info('getCommandList - file content: ', stringText)

    const commands = JSON.parse(stringText)
    commandLog.info('getCommandList - converted commands: ', commands)

    return commands;
  }

  static executeCommand(name: string) {
    commandLog.info('executeCommand - command name: ', name)

    const commands = this.getCommandList() 
  
    const [command] = commands.filter((command: any) => command.name === name);
    commandLog.info('executeCommand - command content: ', command)
  
    switch (command.type) {
      case "shell":
        commandLog.debug('executeCommand - running "shell" command')
        exec(command.content);
        break;
  
      case "program":
        commandLog.debug('executeCommand - running "program" command')
        exec(command.content);
        break;
  
      case "website":
        commandLog.debug('executeCommand - running "website" command')
        exec(`start \"\" \"${command.content}\"`);
        break;
    
      default:
        commandLog.debug(`executeCommand - no command type "${command.type}" found`)
        break;
    }
  
    return command;
  }

  static removeCommand(command: any) {
    commandLog.info('removeCommand - command: ', command)

    let commands = this.getCommandList()
    commands = commands.filter((item: any) => command.id !== item.id)
    commandLog.info('removeCommand - new command list without removed command: ', commands)
  
    // Write new command list to JSON file
    fs.writeFileSync(commandsFilePath, JSON.stringify(commands))
    commandLog.debug('removeCommand - write new command list to file')
  }
}