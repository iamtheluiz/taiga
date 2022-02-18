import { exec } from 'child_process'
import { Command } from '../../entities/Command'
import { CommandExecutionProvider } from '../../providers/CommandExecutionProvider'

export class MainCommandExecutionProvider implements CommandExecutionProvider {
  executeWebsite(command: Command): void {
    exec(command.content)
  }

  executeProgram(command: Command): void {
    exec(command.content)
  }

  executeShell(command: Command): void {
    exec(command.content)
  }
}
