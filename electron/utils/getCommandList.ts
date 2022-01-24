import fs from 'fs'
import path from 'path'

export function getCommandList() {
  const file = fs.readFileSync(path.join(__dirname, '..', '..', 'commands.json'));
  const stringText = file.toString();
  const commands = JSON.parse(stringText)

  return commands;
}