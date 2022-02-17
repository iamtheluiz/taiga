import { v4 as uuidv4 } from 'uuid'
import { RemoveCommand } from './remove-command'
import { InMemoryCommandsRepository } from '../../tests/repositories/in-memory-commands-repository'
import { Command } from '../entities/Command'

describe('Remove command use case', () => {
  it('should remove a command', async () => {
    const commandRepository = new InMemoryCommandsRepository()

    const sut = new RemoveCommand(commandRepository)

    // Create a command to test
    const commandData = {
      name: 'Just a example',
      type: 'website',
      content: 'https://github.com/',
      default: false,
    }

    const command = new Command(commandData)
    await commandRepository.save(command)

    await sut.execute(command.id)

    expect(await commandRepository.findById(command.id)).toBeNull()
  })

  it('should return a id format error', async () => {
    const commandRepository = new InMemoryCommandsRepository()

    const sut = new RemoveCommand(commandRepository)

    await sut.execute('1').catch(error => {
      expect(error.message).toBe('ID needs to be a uuid string')
    })
  })

  it('should return a not found id error', async () => {
    const commandRepository = new InMemoryCommandsRepository()

    const sut = new RemoveCommand(commandRepository)

    await sut.execute(uuidv4()).catch(error => {
      expect(error.message).toBe('Command does not exists')
    })
  })
})
