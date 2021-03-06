import { TestCommandExecutionProvider } from '../../tests/providers/TestCommandExecutionProvider'
import { TestCommunicationProvider } from '../../tests/providers/TestCommunicationProvider'
import { TestRecognitionProvider } from '../../tests/providers/TestRecognitionProvider'
import { Command } from '../entities/Command'
import { InMemoryCommandsRepository } from '../infra/repositories/in-memory-commands-repository'
import { StartRecognition } from './start-recognition'

describe('Start recognition use case', () => {
  it('should start the recognition', async () => {
    // eslint-disable-next-line no-unused-vars
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

    const sut = new StartRecognition(
      recognitionProvider,
      commandsRepository,
      commandExecutionProvider
    )

    const status = await sut.execute()

    expect(status.isRecognizing).toBeTruthy()
  })

  it('should recognize a command', async () => {
    // eslint-disable-next-line no-unused-vars
    let message = ''

    const communicationProvider = new TestCommunicationProvider()
    const commandsRepository = new InMemoryCommandsRepository()
    const recognitionProvider = new TestRecognitionProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      action => {
        message = action
      },
      recognitionProvider,
      communicationProvider
    )

    const command = new Command({
      name: 'taiga open github',
      content: 'https://github.com',
      type: 'website',
    })
    commandsRepository.save(command)

    const sut = new StartRecognition(
      recognitionProvider,
      commandsRepository,
      commandExecutionProvider
    )

    const status = await sut.execute()

    await recognitionProvider.executeCommand(command.id)

    expect(status.isRecognizing).toBeTruthy()
    expect(message).toBe(`executing ${command.type} command`)
  })
})
