import fs from 'fs'
import { exec } from 'child_process'
import { v4 as uuidv4 } from 'uuid'
import { Command as CommandType } from '../../types'

import { log } from '../logger'

import { Recognition } from './Recognition'

// Config files
import { commandsFilePath } from '../config/config'
import { defaultCommands } from '../config/defaultCommands'

const commandLog = log.scope('Command')

export class Command {
  static createCommandsFile() {
    commandLog.debug('createCommandsFile - start')

    if (!fs.existsSync(commandsFilePath)) {
      commandLog.debug("createCommandsFile - command file doesn't exist")

      try {
        const newFileContent = JSON.stringify(defaultCommands)

        commandLog.debug("createCommandsFile - creating 'commands.json' file")
        fs.writeFileSync(commandsFilePath, newFileContent)

        commandLog.debug('createCommandsFile - success')
      } catch (error) {
        commandLog.error('createCommandsFile - error creating file', error)
      }
    } else {
      commandLog.debug('createCommandsFile - command file already exist')
    }

    commandLog.debug('createCommandsFile - end')
  }

  static addNewCommand(command: any) {
    commandLog.info('addNewCommand - received input:', command)

    // Generate command ID and set default attribute
    command = {
      id: uuidv4(),
      ...command,
      default: false,
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
        commands: newCommands,
      })
    } catch (error) {
      commandLog.error(
        'addNewCommand - error writing command list to file:',
        error
      )
    }
  }

  static getCommandList(): CommandType[] {
    commandLog.debug('getCommandList')

    const file = fs.readFileSync(commandsFilePath)
    const stringText = file.toString()
    commandLog.info('getCommandList - file content: ', stringText)

    const commands: CommandType[] = JSON.parse(stringText)
    commandLog.info('getCommandList - converted commands: ', commands)

    return commands
  }

  static executeCommand(name: string) {
    commandLog.info('executeCommand - command name: ', name)

    const commands = this.getCommandList()

    const [command] = commands.filter((command: any) => command.name === name)
    commandLog.info('executeCommand - command content: ', command)

    // Is a default command
    if (command.default) {
      commandLog.debug('executeCommand - default command')
      this.handleDefaultCommand(command)
      return command
    }

    switch (command.type) {
      case 'shell':
        commandLog.debug('executeCommand - running "shell" command')
        exec(command.content)
        break

      case 'program':
        commandLog.debug('executeCommand - running "program" command')
        exec(command.content)
        break

      case 'website':
        commandLog.debug('executeCommand - running "website" command')
        exec(`start "" "${command.content}"`)
        break

      default:
        commandLog.debug(
          `executeCommand - no command type "${command.type}" found`
        )
        break
    }

    return command
  }

  static removeCommand(command: any) {
    commandLog.info('removeCommand - command: ', command)

    let commands = this.getCommandList()
    commands = commands.filter((item: any) => command.id !== item.id)
    commandLog.info(
      'removeCommand - new command list without removed command: ',
      commands
    )

    // Write new command list to JSON file
    fs.writeFileSync(commandsFilePath, JSON.stringify(commands))
    commandLog.debug('removeCommand - write new command list to file')
  }

  static handleDefaultCommand(command: CommandType) {
    switch (command.content) {
      case 'stop':
        Recognition.stopRecognition()
        break

      default:
        break
    }
  }
}
