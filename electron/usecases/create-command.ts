import { Command } from '../entities/Command'
import { CommandsRepository } from '../repositories/CommandsRepository'

type CreateCommandRequest = {
  name: string
  type: string
  content: string
}

export class CreateCommand {
  // eslint-disable-next-line no-useless-constructor
  constructor(private commandsRepository: CommandsRepository) {}

  async execute(commandData: CreateCommandRequest) {
    const commandNameAlreadyExists = await this.commandsRepository.findByName(
      commandData.name
    )

    if (commandNameAlreadyExists) {
      throw new Error('Command name already exists!')
    }

    const command = new Command({
      ...commandData,
      default: false,
    })

    await this.commandsRepository.save(command)

    return command
  }
}
