import { Command } from '../entities/Command'
import { GetCommandList } from './get-command-list'
import { InMemoryCommandsRepository } from '../infra/repositories/in-memory-commands-repository'

describe('Get command list use case', () => {
  it('should return a empty array', async () => {
    const commandsRepository = new InMemoryCommandsRepository()

    const sut = new GetCommandList(commandsRepository)
    const commands = await sut.execute()

    expect(commands).toEqual([])
  })

  it('should not return deleted commands', async () => {
    const commandsRepository = new InMemoryCommandsRepository()

    const figmaCommand = new Command({
      name: 'taiga open figma',
      type: 'website',
      content: 'https://figma.com/',
      default: false,
    })

    await commandsRepository.save(figmaCommand)

    const sut = new GetCommandList(commandsRepository)
    const commands = await sut.execute()

    expect(commands).toEqual([figmaCommand])

    await commandsRepository.removeById(figmaCommand.id)
    const removedFigmaCommandList = await sut.execute()

    expect(removedFigmaCommandList).toEqual([])
  })

  it('should return all commands', async () => {
    const commandsRepository = new InMemoryCommandsRepository()

    const githubCommand = new Command({
      name: 'taiga open github',
      type: 'website',
      content: 'https://github.com/',
      default: false,
    })
    const twitchCommand = new Command({
      name: 'taiga open twitch',
      type: 'website',
      content: 'https://twitch.tv/',
      default: false,
    })

    await commandsRepository.save(githubCommand)
    await commandsRepository.save(twitchCommand)

    const sut = new GetCommandList(commandsRepository)
    const commands = await sut.execute()

    expect(commands).toEqual([githubCommand, twitchCommand])
  })
})
