import { app } from 'electron'
import path from 'path'

export const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

export const iconPath = path.join(assetsPath, 'assets', 'icon.ico')

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

export const taigaRecognitionApplicationPath =
  process.env.NODE_ENV === 'production'
    ? path.join(process.resourcesPath, 'TaigaRecognition.exe')
    : path.join(
        __dirname,
        '..',
        '..',
        'TaigaRecognition',
        'bin',
        'Release',
        'net6.0',
        'TaigaRecognition.exe'
      )
