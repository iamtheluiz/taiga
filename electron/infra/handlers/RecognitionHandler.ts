import { CommandExecutionProvider } from '../../providers/CommandExecutionProvider'
import { CommunicationProvider } from '../../providers/CommunicationProvider'
import { RecognitionProvider } from '../../providers/RecognitionProvider'
import { CommandsRepository } from '../../repositories/CommandsRepository'
import { StartRecognition } from '../../usecases/start-recognition'

export function registerRecognitionHandlers(
  commandsRepository: CommandsRepository,
  recognitionProvider: RecognitionProvider,
  communicationProvider: CommunicationProvider,
  commandExecutionProvider: CommandExecutionProvider
) {
  communicationProvider.onMessage('recognition:start', handleStartRecognition)

  async function handleStartRecognition() {
    const status = await new StartRecognition(
      recognitionProvider,
      commandsRepository,
      commandExecutionProvider
    ).execute()

    communicationProvider.sendMessage('recognition:update-status', status)
  }
}
