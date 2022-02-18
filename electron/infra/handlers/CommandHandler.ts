import { CommunicationProvider } from '../../providers/CommunicationProvider'
import { CommandsRepository } from '../../repositories/CommandsRepository'

import { CreateCommand } from '../../usecases/create-command'
import { GetCommandList } from '../../usecases/get-command-list'
import { RemoveCommand } from '../../usecases/remove-command'

type CreateCommandDTO = {
  name: string
  type: string
  content: string
  default: boolean
}

export function registerCommandHandlers(
  communicationProvider: CommunicationProvider,
  commandsRepository: CommandsRepository
) {
  communicationProvider.onMessage('command:list', handleGetCommands)
  communicationProvider.onMessage('command:remove', handleDeleteCommand)
  communicationProvider.onMessage('command:create', handleCreateCommand)

  async function handleGetCommands() {
    const commands = await new GetCommandList(commandsRepository).execute()

    communicationProvider.sendMessage('command:update-list', commands)
    communicationProvider.sendMessageToSender('command:update-list', commands)
  }

  async function handleDeleteCommand(id: string) {
    await new RemoveCommand(commandsRepository).execute(id)
    const commands = await new GetCommandList(commandsRepository).execute()

    communicationProvider.sendMessage('command:update-list', commands)
  }

  async function handleCreateCommand(data: CreateCommandDTO) {
    await new CreateCommand(commandsRepository).execute(data)

    const commands = await new GetCommandList(commandsRepository).execute()
    communicationProvider.sendMessage('command:update-list', commands)
  }
}
