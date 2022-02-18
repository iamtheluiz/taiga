import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { registerCommandHandlers } from '../handlers/CommandHandler'
import { WebsocketCommunicationProvider } from '../providers/WebsocketCommunicationProvider'
import { InMemoryCommandsRepository } from '../repositories/in-memory-commands-repository'

type IoType = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

export class WebsocketServer {
  static io: IoType
  private static clients: any[] = []

  constructor() {
    if (WebsocketServer.io === undefined) {
      const commandsRepository = new InMemoryCommandsRepository()

      WebsocketServer.io = new Server({
        cors: {
          origin: '*',
          methods: ['GET', 'POST', 'DELETE'],
        },
      })

      WebsocketServer.io.on('connection', socket => {
        WebsocketServer.clients.push(socket.id)

        const communicationProvider = new WebsocketCommunicationProvider(
          WebsocketServer.io,
          socket
        )

        registerCommandHandlers(communicationProvider, commandsRepository)
      })
    }
  }

  listen(port = 2707) {
    WebsocketServer.io.listen(port)
  }
}
