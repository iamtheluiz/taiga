import { CommunicationProvider } from '../../electron/providers/CommunicationProvider'

export class TestCommunicationProvider implements CommunicationProvider {
  sendMessage<T>(communicationChannel: string, message: T): void {
    throw new Error('Method not implemented.')
  }

  sendMessageToSender<T>(communicationChannel: string, message: T): void {
    throw new Error('Method not implemented.')
  }

  onMessage(
    communicationChannel: string,
    action: (...args: any[]) => void
  ): void {
    throw new Error('Method not implemented.')
  }
}
