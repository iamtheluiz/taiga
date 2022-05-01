export interface CommunicationProvider {
  sendMessage<T>(communicationChannel: string, message: T): void
  sendMessageToSender<T>(communicationChannel: string, message: T): void
  onMessage(
    communicationChannel: string,
    action: (...args: any[]) => void
  ): void
}
