import { TestCommandExecutionProvider } from '../../tests/providers/TestCommandExecutionProvider'
import { TestCommunicationProvider } from '../../tests/providers/TestCommunicationProvider'
import { TestRecognitionProvider } from '../../tests/providers/TestRecognitionProvider'
import { Command } from '../entities/Command'
import { InMemoryCommandsRepository } from '../infra/repositories/in-memory-commands-repository'
import { ExecuteCommand } from './execute-command'

describe('Execute command use case', () => {
  it('should throw a invalid command type error', async () => {
    let message = ''

    const recognitionProvider = new TestRecognitionProvider()
    const commandsRepository = new InMemoryCommandsRepository()
    const communicationProvider = new TestCommunicationProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      },
      recognitionProvider,
      communicationProvider
    )

    // Create a test command
    const command = new Command({
      name: 'taiga open github',
      type: 'coffee',
      content: 'https://github.com',
    })
    await commandsRepository.save(command)

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id).catch(error => {
      expect(error.message).toBe(`Invalid command type ${command.type}`)
    })
    expect(message).toBe('')
  })

  it('should throw a command not found error', async () => {
    let message = ''

    const recognitionProvider = new TestRecognitionProvider()
    const commandsRepository = new InMemoryCommandsRepository()
    const communicationProvider = new TestCommunicationProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      },
      recognitionProvider,
      communicationProvider
    )

    // Create a test command
    const command = new Command({
      name: 'taiga open github',
      type: 'website',
      content: 'https://github.com',
    })

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id).catch(error => {
      expect(error.message).toBe('Command not found')
    })
    expect(message).toBe('')
  })

  it('should run a website command', async () => {
    let message = ''

    const recognitionProvider = new TestRecognitionProvider()
    const commandsRepository = new InMemoryCommandsRepository()
    const communicationProvider = new TestCommunicationProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      },
      recognitionProvider,
      communicationProvider
    )

    // Create a test command
    const command = new Command({
      name: 'taiga open github',
      type: 'website',
      content: 'https://github.com',
    })
    await commandsRepository.save(command)

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id)

    expect(message).toBe('executing website command')
  })

  it('should run a program command', async () => {
    let message = ''

    const recognitionProvider = new TestRecognitionProvider()
    const commandsRepository = new InMemoryCommandsRepository()
    const communicationProvider = new TestCommunicationProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      },
      recognitionProvider,
      communicationProvider
    )

    // Create a test command
    const command = new Command({
      name: 'taiga open chrome',
      type: 'program',
      content: 'chrome.exe',
    })
    await commandsRepository.save(command)

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id)

    expect(message).toBe('executing program command')
  })

  it('should run a shell command', async () => {
    let message = ''

    const recognitionProvider = new TestRecognitionProvider()
    const commandsRepository = new InMemoryCommandsRepository()
    const communicationProvider = new TestCommunicationProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      },
      recognitionProvider,
      communicationProvider
    )

    // Create a test command
    const command = new Command({
      name: 'taiga open workspace',
      type: 'shell',
      content: 'code . | yarn start',
    })
    await commandsRepository.save(command)

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id)

    expect(message).toBe('executing shell command')
  })

  it('should run stop recognition default command', async () => {
    let message = ''

    const recognitionProvider = new TestRecognitionProvider()
    const commandsRepository = new InMemoryCommandsRepository()
    const communicationProvider = new TestCommunicationProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      },
      recognitionProvider,
      communicationProvider
    )

    const command = await commandsRepository.findByName(
      'Taiga stop recognition'
    )

    if (!command) {
      throw new Error('Stop recognition default command not found!')
    }

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id)

    expect(message).toBe('executing stop recognition default command')
  })

  it('should run go to tray default command', async () => {
    let message = ''

    const recognitionProvider = new TestRecognitionProvider()
    const commandsRepository = new InMemoryCommandsRepository()
    const communicationProvider = new TestCommunicationProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      },
      recognitionProvider,
      communicationProvider
    )

    const command = await commandsRepository.findByName('Taiga go to tray')

    if (!command) {
      throw new Error('Go to tray default command not found!')
    }

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id)

    expect(message).toBe('executing go to tray default command')
  })

  it('should run return to window default command', async () => {
    let message = ''

    const recognitionProvider = new TestRecognitionProvider()
    const commandsRepository = new InMemoryCommandsRepository()
    const communicationProvider = new TestCommunicationProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      },
      recognitionProvider,
      communicationProvider
    )

    const command = await commandsRepository.findByName(
      'Taiga return to window'
    )

    if (!command) {
      throw new Error('Return to window default command not found!')
    }

    const sut = new ExecuteCommand(commandsRepository, commandExecutionProvider)
    await sut.execute(command.id)

    expect(message).toBe('executing return to window default command')
  })
})
