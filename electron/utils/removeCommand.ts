import fs from 'fs'
import path from 'path'
import { getCommandList } from './getCommandList';

export function removeCommand(command: any) {
  // JSON with commands
  const commandsFilePath = path.join(__dirname, '..', '..', 'commands.json')

  // Get JSON content
  let commands = getCommandList()

  // Filter command
  commands = commands.filter((item: any) => command.id !== item.id)

  // Write new command list to JSON file
  fs.writeFileSync(commandsFilePath, JSON.stringify(commands))
}