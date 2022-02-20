import { RecognitionProvider } from '../../electron/providers/RecognitionProvider'

export class TestRecognitionProvider implements RecognitionProvider {
  isRecognizing: boolean = false

  async executeCommand(id: string) {}

  startRecognition() {
    this.isRecognizing = true

    return {
      isRecognizing: true,
    }
  }

  stopRecognition() {
    this.isRecognizing = false

    return {
      isRecognizing: false,
    }
  }

  resetRecognition() {
    this.isRecognizing = true

    return {
      isRecognizing: true,
    }
  }
}
