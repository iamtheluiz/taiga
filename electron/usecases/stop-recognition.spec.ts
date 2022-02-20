import { TestCommandExecutionProvider } from '../../tests/providers/TestCommandExecutionProvider'
import { TestRecognitionProvider } from '../../tests/providers/TestRecognitionProvider'
import { InMemoryCommandsRepository } from '../infra/repositories/in-memory-commands-repository'

import { StartRecognition } from './start-recognition'
import { StopRecognition } from './stop-recognition'

describe('Stop recognition use case', () => {
  it('should stop recognition', async () => {
    const commandsRepository = new InMemoryCommandsRepository()
    const recognitionProvider = new TestRecognitionProvider()
    const commandExecutionProvider = new TestCommandExecutionProvider(() => {})

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
