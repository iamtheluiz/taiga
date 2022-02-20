import fs from 'fs'
import { commandsFilePath } from '../../config/config'
import { defaultCommands } from '../../config/defaultCommands'

import { Command } from '../../entities/Command'
import { CommandsRepository } from '../../repositories/CommandsRepository'

export class JsonCommandsRepository implements CommandsRepository {
  public commands: Command[] = []

  constructor() {
    if (fs.existsSync(commandsFilePath)) {
      const jsonRawContent = fs.readFileSync(commandsFilePath)
      const jsonStringContent = jsonRawContent.toString()
      const content = JSON.parse(jsonStringContent)

      this.commands = content
    } else {
      fs.writeFileSync(commandsFilePath, JSON.stringify(defaultCommands))

      this.commands = defaultCommands
    }
  }

  async findById(id: string): Promise<Command | null> {
    const command = this.commands.find(command => command.id === id)

    if (!command) {
      return null
    }

    return command
  }

  async findByName(name: string): Promise<Command | null> {
    const command = this.commands.find(command => command.name === name)

    if (!command) {
      return null
    }

    return command
  }

  async list(): Promise<Command[]> {
    return this.commands
  }

  async save(command: Command): Promise<void> {
    this.commands.push(command)

    fs.writeFileSync(commandsFilePath, JSON.stringify(this.commands))
  }

  async removeById(id: string): Promise<void> {
    const filteredCommands = this.commands.filter(command => command.id !== id)

    this.commands = filteredCommands

    fs.writeFileSync(commandsFilePath, JSON.stringify(this.commands))
  }
}
