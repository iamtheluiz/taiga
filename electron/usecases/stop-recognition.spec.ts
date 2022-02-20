import { TestCommandExecutionProvider } from '../../tests/providers/TestCommandExecutionProvider'
import { TestCommunicationProvider } from '../../tests/providers/TestCommunicationProvider'
import { TestRecognitionProvider } from '../../tests/providers/TestRecognitionProvider'
import { InMemoryCommandsRepository } from '../infra/repositories/in-memory-commands-repository'

import { StartRecognition } from './start-recognition'
import { StopRecognition } from './stop-recognition'

describe('Stop recognition use case', () => {
  it('should stop recognition', async () => {
    const recognitionProvider = new TestRecognitionProvider()
    const commandsRepository = new InMemoryCommandsRepository()
    const communicationProvider = new TestCommunicationProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(
      () => {},
      recognitionProvider,
      communicationProvider
    )

    // Start recognition
    let currentStatus = await new StartRecognition(
      recognitionProvider,
      commandsRepository,
      commandExecutionProvider
    ).execute()

    expect(currentStatus).toEqual({
      isRecognizing: true,
    })

    const sut = new StopRecognition(recognitionProvider)
    currentStatus = await sut.execute()

    expect(currentStatus).toEqual({
      isRecognizing: false,
    })
  })
})
