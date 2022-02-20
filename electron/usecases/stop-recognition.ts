import { RecognitionProvider } from '../providers/RecognitionProvider'

export class StopRecognition {
  // eslint-disable-next-line no-useless-constructor
  constructor(private recognitionProvider: RecognitionProvider) {}

  async execute() {
    const status = this.recognitionProvider.stopRecognition()

    if (!status) {
      throw new Error('Error stopping the recognition')
    }

    return status
  }
}
