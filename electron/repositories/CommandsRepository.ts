import { Command } from '../entities/Command'

export interface CommandsRepository {
  findById(id: string): Promise<Command | null>
  findByName(name: string): Promise<Command | null>
  save(command: Command): Promise<void>
}
