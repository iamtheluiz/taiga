import { TestCommandExecutionProvider } from '../../tests/providers/TestCommandExecutionProvider'
import { Command } from '../entities/Command'
import { InMemoryCommandsRepository } from '../infra/repositories/in-memory-commands-repository'
import { ExecuteCommand } from './execute-command'

describe('Execute command use case', () => {
  it('should throw a invalid command type error', async () => {
    let message = ''

    const commandsRepository = new InMemoryCommandsRepository()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      }
    )

    // Create a test command
    const command = new Command({
      name: 'taiga open github',
      type: 'coffee',
      content: 'https://github.com',
      default: false,
    })
    await commandsRepository.save(command)

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id).catch(error => {
      expect(error.message).toBe('Invalid command type')
    })
    expect(message).toBe('')
  })

  it('should throw a command not found error', async () => {
    let message = ''

    const commandsRepository = new InMemoryCommandsRepository()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      }
    )

    // Create a test command
    const command = new Command({
      name: 'taiga open github',
      type: 'website',
      content: 'https://github.com',
      default: false,
    })

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id).catch(error => {
      expect(error.message).toBe('Command not found')
    })
    expect(message).toBe('')
  })

  it('should run a website command', async () => {
    let message = ''

    const commandsRepository = new InMemoryCommandsRepository()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      }
    )

    // Create a test command
    const command = new Command({
      name: 'taiga open github',
      type: 'website',
      content: 'https://github.com',
      default: false,
    })
    await commandsRepository.save(command)

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id)

    expect(message).toBe('executing website command')
  })

  it('should run a program command', async () => {
    let message = ''

    const commandsRepository = new InMemoryCommandsRepository()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      }
    )

    // Create a test command
    const command = new Command({
      name: 'taiga open chrome',
      type: 'program',
      content: 'chrome.exe',
      default: false,
    })
    await commandsRepository.save(command)

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id)

    expect(message).toBe('executing program command')
  })

  it('should run a shell command', async () => {
    let message = ''

    const commandsRepository = new InMemoryCommandsRepository()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      }
    )

    // Create a test command
    const command = new Command({
      name: 'taiga open workspace',
      type: 'shell',
      content: 'code . | yarn start',
      default: false,
    })
    await commandsRepository.save(command)

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id)

    expect(message).toBe('executing shell command')
  })
})
