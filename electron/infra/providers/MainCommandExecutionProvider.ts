import { exec } from 'child_process'

import { log as logger } from '../../lib/logger'

import { Command } from '../../entities/Command'
import { mainWindow } from '../../lib/window'
import { CommandExecutionProvider } from '../../providers/CommandExecutionProvider'
import { CommunicationProvider } from '../../providers/CommunicationProvider'
import { RecognitionProvider } from '../../providers/RecognitionProvider'

const log = logger.scope('MainCommandExecutionProvider')

export class MainCommandExecutionProvider implements CommandExecutionProvider {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private recognitionProvider: RecognitionProvider,
    private communicationProvider: CommunicationProvider
  ) {}

  execute(command: Command): void {}

  executeWebsite(command: Command): void {
    log.info(`opening website "${command.content}"`)
    exec(`start "" "${command.content}"`)
  }

  executeProgram(command: Command): void {
    log.info(`opening program path "${command.content}"`)
    exec(command.content)
  }

  executeShell(command: Command): void {
    log.info(`executing shell "${command.content}"`)
    exec(command.content)
  }

  executeDefaultCommand(command: Command): void {
    log.info(`executing default "${command.content}"`)

    switch (command.content) {
      case 'recognition:stop':
        this.communicationProvider.sendMessage(
          'recognition:update-status',
          this.recognitionProvider.stopRecognition()
        )
        break

      case 'electron:go-to-tray':
        mainWindow?.hide()
        break

      case 'electron:return-to-window':
        mainWindow?.show()
        break

      default:
        throw new Error('Default command not found')
    }
  }
}
