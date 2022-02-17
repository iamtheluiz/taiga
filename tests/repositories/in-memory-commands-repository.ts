import { Command } from '../../electron/entities/Command'
import { CommandsRepository } from '../../electron/repositories/CommandsRepository'

export class InMemoryCommandsRepository implements CommandsRepository {
  public commands: Command[] = []

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

  async save(command: Command): Promise<void> {
    this.commands.push(command)
  }

  async removeById(id: string): Promise<void> {
    const filteredCommands = this.commands.filter(command => command.id !== id)

    this.commands = filteredCommands
  }
}
