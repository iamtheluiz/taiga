import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { getCommandList } from './getCommandList';

export function addNewCommand(command: any) {
  // Generate command ID
  command.id = uuidv4();
  command.default = false;  // Set default attribute

  // JSON with commands
  const commandsFilePath = path.join(__dirname, '..', '..', 'commands.json')

  // Get JSON content
  const commands = getCommandList()

  // Write new command list to JSON file
  fs.writeFileSync(commandsFilePath, JSON.stringify([...commands, command]))
}