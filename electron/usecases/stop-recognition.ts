import { log as logger } from '../lib/logger'

import { RecognitionProvider } from '../providers/RecognitionProvider'

const log = logger.scope('StopRecognition')

export class StopRecognition {
  // eslint-disable-next-line no-useless-constructor
  constructor(private recognitionProvider: RecognitionProvider) {}

  async execute() {
    log.debug('Stopping recognition')
    const status = this.recognitionProvider.stopRecognition()

    if (!status) {
      throw new Error('Error stopping the recognition')
    }

    log.info(`isRecognizing: ${status.isRecognizing}`)
    return status
  }
}
