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
  communicationProvider.onMessage('recognition:get-status', handleGetStatus)

  async function handleStartRecognition() {
    const status = await new StartRecognition(
      recognitionProvider,
      commandsRepository,
      commandExecutionProvider
    ).execute()

    communicationProvider.sendMessage('recognition:update-status', status)
  }

  async function handleGetStatus() {
    const status = {
      isRecognizing: recognitionProvider.isRecognizing,
    }

    communicationProvider.sendMessage('recognition:update-status', status)
    communicationProvider.sendMessageToSender(
      'recognition:update-status',
      status
    )
  }
}
