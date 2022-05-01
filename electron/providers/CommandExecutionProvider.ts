import { Command } from '../entities/Command'

export interface CommandExecutionProvider {
  executeWebsite: (command: Command) => void
  executeProgram: (command: Command) => void
  executeShell: (command: Command) => void
  executeDefaultCommand: (command: Command) => void
}
