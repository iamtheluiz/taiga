import { CommandsRepository } from '../repositories/CommandsRepository'

export class GetCommandList {
  // eslint-disable-next-line no-useless-constructor
  constructor(private commandsRepository: CommandsRepository) {}

  async execute() {
    const commands = await this.commandsRepository.list()

    return commands
  }
}
