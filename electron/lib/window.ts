import { BrowserWindow } from 'electron'
import { iconPath } from '../config/config'
import { log } from './logger'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

export let mainWindow: BrowserWindow | null = null

export function createWindow(): BrowserWindow | null {
  log.debug('Creating window')

  mainWindow = new BrowserWindow({
    icon: iconPath,
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    frame: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    log.debug('Main window closed')

    mainWindow = null
  })

  return mainWindow
}
