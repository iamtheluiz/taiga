import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { CommunicationProvider } from '../../providers/CommunicationProvider'

type IoType = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
type SocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>

export class WebsocketCommunicationProvider implements CommunicationProvider {
  // eslint-disable-next-line no-useless-constructor
  constructor(private io: IoType, private socket: SocketType) {}

  sendMessage<T>(communicationChannel: string, message: T): void {
    this.socket.broadcast.emit(communicationChannel, message)
  }

  sendMessageToSender<T>(communicationChannel: string, message: T): void {
    this.socket.emit(communicationChannel, message)
  }

  onMessage(
    communicationChannel: string,
    action: (...args: any[]) => void
  ): void {
    this.socket.on(communicationChannel, action)
  }
}
