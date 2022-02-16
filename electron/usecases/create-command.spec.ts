import { InMemoryCommandsRepository } from '../../tests/repositories/in-memory-commands-repository'
import { Command } from '../entities/Command'
import { CreateCommand } from './create-command'

describe('Create command use case', () => {
  it('should create a new command', async () => {
    const commandRepository = new InMemoryCommandsRepository()

    const commandData = {
      name: 'taiga open twitch website',
      type: 'website',
      content: 'https://twitch.com/',
    }

    const sut = new CreateCommand(commandRepository)
    const storedCommand = await sut.execute(commandData)

    expect(storedCommand).toBeTruthy()
    expect(storedCommand.name).toBe(commandData.name)
    expect(storedCommand.content).toBe(commandData.content)
    expect(storedCommand.type).toBe(commandData.type)
    expect(storedCommand.id).toBeTruthy()
    expect(storedCommand.default).toBe(false)
  })

  it('should not create a duplicated command', async () => {
    const commandRepository = new InMemoryCommandsRepository()

    const commandData = {
      name: 'taiga open twitch website',
      type: 'website',
      content: 'https://twitch.com/',
      default: false,
    }

    const command = new Command(commandData)
    commandRepository.save(command)

    const sut = new CreateCommand(commandRepository)
    const storedCommand = await sut.execute(commandData).catch(error => {
      expect(error.message).toBe('Command name already exists!')
    })

    expect(storedCommand).toBeUndefined()
  })
})
