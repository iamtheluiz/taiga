type RecognitionInfo = {
  isRecognizing: boolean
}

export interface RecognitionProvider {
  isRecognizing: boolean

  executeCommand(id: string): Promise<void>
  startRecognition(): RecognitionInfo
  stopRecognition(): RecognitionInfo
  resetRecognition(): RecognitionInfo
}
