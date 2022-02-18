import { Command } from '../../electron/entities/Command'
import { CommandExecutionProvider } from '../../electron/providers/CommandExecutionProvider'

type TestLog = (message: string) => void

export class TestCommandExecutionProvider implements CommandExecutionProvider {
  // eslint-disable-next-line no-useless-constructor
  constructor(private log: TestLog) {}

  executeWebsite(command: Command): void {
    this.log('executing website command')
  }

  executeProgram(command: Command): void {
    this.log('executing program command')
  }

  executeShell(command: Command): void {
    this.log('executing shell command')
  }
}
