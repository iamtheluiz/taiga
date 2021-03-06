import { exec } from 'child_process'
import { Command } from '../../entities/Command'
import { mainWindow } from '../../lib/window'
import { CommandExecutionProvider } from '../../providers/CommandExecutionProvider'
import { CommunicationProvider } from '../../providers/CommunicationProvider'
import { RecognitionProvider } from '../../providers/RecognitionProvider'

export class MainCommandExecutionProvider implements CommandExecutionProvider {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private recognitionProvider: RecognitionProvider,
    private communicationProvider: CommunicationProvider
  ) {}

  executeWebsite(command: Command): void {
    exec(`start "" "${command.content}"`)
  }

  executeProgram(command: Command): void {
    exec(command.content)
  }

  executeShell(command: Command): void {
    exec(command.content)
  }

  executeDefaultCommand(command: Command): void {
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
