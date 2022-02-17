import { Command } from '../entities/Command'

export interface CommandsRepository {
  findById(id: string): Promise<Command | null>
  findByName(name: string): Promise<Command | null>
  list(): Promise<Command[]>
  save(command: Command): Promise<void>
  removeById(id: string): Promise<void>
}
