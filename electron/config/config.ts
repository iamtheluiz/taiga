import { app } from 'electron'
import path from 'path'

export const commandsFilePath =
  process.env.NODE_ENV === 'production'
    ? path.join(process.resourcesPath, 'commands.json')
    : path.join(__dirname, '..', '..', 'commands.json')

export const logFilePath = path.join(
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath(),
  'logs/main.log'
)
