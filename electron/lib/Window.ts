import path from 'path'
import { app, BrowserWindow } from 'electron'
import { log } from './logger'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

export class Window {
  static mainWindow: BrowserWindow | null = null

  static createWindow() {
    log.debug('Creating window')

    this.mainWindow = new BrowserWindow({
      icon: path.join(assetsPath, 'assets', 'icon.ico'),
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

    this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    this.mainWindow.on('closed', () => {
      log.debug('Main window closed')
      this.mainWindow = null
    })
  }
}
