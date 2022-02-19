import { registerCommandHandlers } from './handlers/CommandHandler'
import { registerElectronHandlers } from './handlers/ElectronHandler'

import { MainCommandExecutionProvider } from './providers/MainCommandExecutionProvider'
import { WebsocketCommunicationProvider } from './providers/WebsocketCommunicationProvider'

import { InMemoryCommandsRepository } from './repositories/in-memory-commands-repository'

import { SocketType, WebsocketServer } from './server/websocket'

export class Infra {
  static initialize() {
    const websocket = new WebsocketServer()

    const commandsRepository = new InMemoryCommandsRepository()
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
      registerElectronHandlers(communicationProvider)
    }

    websocket.start()
    websocket.listen()
  }
}
