import { CommandExecutionProvider } from '../providers/CommandExecutionProvider'
import { CommandsRepository } from '../repositories/CommandsRepository'

export class ExecuteCommand {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private commandsRepository: CommandsRepository,
    private commandExecutionProvider: CommandExecutionProvider
  ) {}

  async execute(id: string) {
    const command = await this.commandsRepository.findById(id)

    if (!command) {
      throw new Error('Command not found')
    }

    switch (command.type) {
      case 'website':
        this.commandExecutionProvider.executeWebsite(command)
        break

      case 'program':
        this.commandExecutionProvider.executeProgram(command)
        break

      case 'shell':
        this.commandExecutionProvider.executeShell(command)
        break

      default:
        throw new Error('Invalid command type')
    }
  }
}
