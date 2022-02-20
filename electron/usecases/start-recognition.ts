import { CommandExecutionProvider } from '../providers/CommandExecutionProvider'
import { RecognitionProvider } from '../providers/RecognitionProvider'
import { CommandsRepository } from '../repositories/CommandsRepository'
import { ExecuteCommand } from './execute-command'

export class StartRecognition {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private recognitionProvider: RecognitionProvider,
    private commandsRepository: CommandsRepository,
    private commandExecutionProvider: CommandExecutionProvider
  ) {}

  async execute() {
    const executeCommand = new ExecuteCommand(
      this.commandsRepository,
      this.commandExecutionProvider,
      this.recognitionProvider
    )

    this.recognitionProvider.executeCommand = async (id: string) => {
      executeCommand.execute(id)
    }
    const status = this.recognitionProvider.startRecognition()

    return status
  }
}
