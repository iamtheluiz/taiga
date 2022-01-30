import path from 'path'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { Command } from './Command'
import { log } from '../logger'

const executablePath =
  process.env.NODE_ENV === 'production'
    ? path.join(process.resourcesPath, 'TaigaRecognition.exe')
    : path.join(
        __dirname,
        '..',
        '..',
        'TaigaRecognition',
        'bin',
        'Release',
        'net6.0',
        'TaigaRecognition.exe'
      )

const recognitionLog = log.scope('Recognition')

export class Recognition {
  static ipc: ChildProcessWithoutNullStreams | null = null
  static isRecognizing: boolean = false

  static startRecognition() {
    recognitionLog.debug('startRecognition - start')

    if (!this.isRecognizing) {
      this.ipc = spawn(executablePath)
      recognitionLog.debug('startRecognition - spawn Taiga Recognition')

      this.ipc.stdin.setDefaultEncoding('utf8')
      recognitionLog.debug('startRecognition - set enconding')

      this.ipc.stdout.on('data', data => {
        recognitionLog.debug('startRecognition - on data:', data)
        const out = data
          .toString()
          .split('Recognized text: ')[1]
          .replace(/(\r\n|\n|\r)/gm, '')
        recognitionLog.info('startRecognition - recognized command name:', out)

        Command.executeCommand(out)
      })
      recognitionLog.debug('startRecognition - define on data receive')

      this.isRecognizing = true
    } else {
      recognitionLog.debug('startRecognition - already started')
    }

    recognitionLog.debug('startRecognition - end')
  }

  static stopRecognition() {
    recognitionLog.debug('stopRecognition - start')

    if (this.isRecognizing) {
      this.ipc?.kill()
      recognitionLog.debug('stopRecognition - kill process')
      this.ipc = null
      recognitionLog.debug('stopRecognition - define process as null')

      this.isRecognizing = false
    } else {
      recognitionLog.debug('stopRecognition - already stopped')
    }

    recognitionLog.debug('stopRecognition - end')
  }

  static resetRecognition() {
    recognitionLog.debug('resetRecognition - start')
    this.stopRecognition()
    this.startRecognition()
    recognitionLog.debug('resetRecognition - end')
  }
}
