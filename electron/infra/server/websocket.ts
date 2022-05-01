import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

type IoType = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
export type SocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>

export class WebsocketServer {
  static io: IoType
  private static clients: any[] = []

  onConnection(socekt: SocketType) {}

  listen(port = 2707) {
    WebsocketServer.io.listen(port)
  }

  start() {
    if (WebsocketServer.io === undefined) {
      WebsocketServer.io = new Server({
        cors: {
          origin: '*',
          methods: ['GET', 'POST', 'DELETE'],
        },
      })

      WebsocketServer.io.on('connection', socket => {
        WebsocketServer.clients.push(socket.id)

        this.onConnection(socket)
      })
    }
  }
}
