import { registerCommandHandlers } from './handlers/CommandHandler'
import { registerElectronHandlers } from './handlers/ElectronHandler'
import { registerRecognitionHandlers } from './handlers/RecognitionHandler'

import { MainCommandExecutionProvider } from './providers/MainCommandExecutionProvider'
import { TaigaRecognitionProvider } from './providers/TaigaRecognitionProvider'
import { WebsocketCommunicationProvider } from './providers/WebsocketCommunicationProvider'

import { JsonCommandsRepository } from './repositories/json-commands-repository'

import { SocketType, WebsocketServer } from './server/websocket'

export class Infra {
  static initialize() {
    const websocket = new WebsocketServer()

    const commandsRepository = new JsonCommandsRepository()
    const recognitionProvider = new TaigaRecognitionProvider()
    const commandExecutionProvider = new MainCommandExecutionProvider()

    websocket.onConnection = (socket: SocketType) => {
      const communicationProvider = new WebsocketCommunicationProvider(
        WebsocketServer.io,
        socket
      )

      registerCommandHandlers(
        commandsRepository,
        communicationProvider,
        commandExecutionProvider
      )
      registerRecognitionHandlers(
        commandsRepository,
        recognitionProvider,
        communicationProvider,
        commandExecutionProvider
      )
      registerElectronHandlers(communicationProvider)
    }

    websocket.start()
    websocket.listen()
  }
}
