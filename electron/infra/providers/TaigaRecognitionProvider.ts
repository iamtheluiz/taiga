import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { taigaRecognitionApplicationPath } from '../../config/config'

import { RecognitionProvider } from '../../providers/RecognitionProvider'

export class TaigaRecognitionProvider implements RecognitionProvider {
  ipc: ChildProcessWithoutNullStreams | null = null
  isRecognizing: boolean = false

  async executeCommand(id: string) {}

  startRecognition() {
    if (!this.isRecognizing) {
      this.ipc = spawn(taigaRecognitionApplicationPath)

      this.ipc.stdin.setDefaultEncoding('utf8')

      this.ipc.stdout.on('data', async data => {
        const out = data
          .toString()
          .split('Recognized command id: ')[1]
          .replace(/(\r\n|\n|\r)/gm, '')

        await this.executeCommand(out)
      })

      this.isRecognizing = true
    }

    return {
      isRecognizing: true,
    }
  }

  stopRecognition() {
    if (this.isRecognizing) {
      this.ipc?.kill()
      this.ipc = null

      this.isRecognizing = false
    }

    return {
      isRecognizing: false,
    }
  }

  resetRecognition() {
    this.stopRecognition()
    this.startRecognition()

    this.isRecognizing = true

    return {
      isRecognizing: true,
    }
  }
}
