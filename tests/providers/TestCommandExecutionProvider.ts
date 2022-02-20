import { Command } from '../../electron/entities/Command'
import { CommandExecutionProvider } from '../../electron/providers/CommandExecutionProvider'
import { CommunicationProvider } from '../../electron/providers/CommunicationProvider'
import { RecognitionProvider } from '../../electron/providers/RecognitionProvider'

type TestLog = (message: string) => void

export class TestCommandExecutionProvider implements CommandExecutionProvider {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private log: TestLog,
    private recognitionProvider: RecognitionProvider,
    private communicationProvider: CommunicationProvider
  ) {}

  executeWebsite(command: Command): void {
    this.log('executing website command')
  }

  executeProgram(command: Command): void {
    this.log('executing program command')
  }

  executeShell(command: Command): void {
    this.log('executing shell command')
  }

  executeDefaultCommand(command: Command) {
    switch (command.content) {
      case 'recognition:stop':
        this.communicationProvider.sendMessage(
          'recognition:update-status',
          this.recognitionProvider.stopRecognition()
        )
        break

      default:
        throw new Error('Default command not found')
    }
  }
}
