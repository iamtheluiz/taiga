import { log as logger } from '../lib/logger'

import { CommandExecutionProvider } from '../providers/CommandExecutionProvider'
import { RecognitionProvider } from '../providers/RecognitionProvider'
import { CommandsRepository } from '../repositories/CommandsRepository'
import { ExecuteCommand } from './execute-command'

const log = logger.scope('StartRecognition')

export class StartRecognition {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private recognitionProvider: RecognitionProvider,
    private commandsRepository: CommandsRepository,
    private commandExecutionProvider: CommandExecutionProvider
  ) {}

  async execute() {
    log.debug('Starting recognition')
    const executeCommand = new ExecuteCommand(
      this.commandsRepository,
      this.commandExecutionProvider
    )

    this.recognitionProvider.executeCommand = async (id: string) => {
      log.debug('Defining on recognized action')
      executeCommand.execute(id)
    }

    const status = this.recognitionProvider.startRecognition()
    log.info(`isRecognizing: ${status.isRecognizing}`)

    return status
  }
}
