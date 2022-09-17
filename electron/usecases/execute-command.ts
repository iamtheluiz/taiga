import { log as logger } from '../lib/logger'

import { CommandExecutionProvider } from '../providers/CommandExecutionProvider'
import { CommandsRepository } from '../repositories/CommandsRepository'

const log = logger.scope('ExecuteCommand')

export class ExecuteCommand {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private commandsRepository: CommandsRepository,
    private commandExecutionProvider: CommandExecutionProvider
  ) {}

  async execute(id: string) {
    log.info(`received id ${id}`)
    const command = await this.commandsRepository.findById(id)

    if (!command) {
      throw new Error('Command not found')
    }

    log.info(`trying to find command type "${command.type}"`)

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

      case 'default':
        this.commandExecutionProvider.executeDefaultCommand(command)
        break

      default:
        throw new Error(`Invalid command type ${command.type}`)
    }
  }
}
