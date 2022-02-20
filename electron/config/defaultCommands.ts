import { Command } from '../entities/Command'

const stopCommand = new Command({
  name: 'Taiga stop recognition',
  content: 'recognition:stop',
  type: 'default',
})

export const defaultCommands = [stopCommand]
