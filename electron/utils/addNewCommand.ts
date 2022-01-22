import fs from 'fs'
import path from 'path'

export function addNewCommand(command: any) {
  const commandsFilePath = path.join(__dirname, '..', '..', 'commands.json')

  const file = fs.readFileSync(commandsFilePath)
  const stringText = file.toString()
  const commands = JSON.parse(stringText)

  fs.writeFileSync(commandsFilePath, JSON.stringify([...commands, command]))

  return stringText;
}