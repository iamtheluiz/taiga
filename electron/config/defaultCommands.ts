import { Command } from '../entities/Command'

const stopCommand = new Command({
  name: 'Taiga stop recognition',
  content: 'recognition:stop',
  type: 'default',
})
const goToTrayCommand = new Command({
  name: 'Taiga go to tray',
  content: 'electron:go-to-tray',
  type: 'default',
})

export const defaultCommands = [stopCommand, goToTrayCommand]
