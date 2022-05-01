import { validate } from 'uuid'

import { CommandsRepository } from '../repositories/CommandsRepository'

export class RemoveCommand {
  // eslint-disable-next-line no-useless-constructor
  constructor(private commandsRepository: CommandsRepository) {}

  async execute(id: string) {
    if (!validate(id)) {
      throw new Error('ID needs to be a uuid string')
    }

    if (!(await this.commandsRepository.findById(id))) {
      throw new Error('Command does not exists')
    }

    await this.commandsRepository.removeById(id)
  }
}
