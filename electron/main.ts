import { app, BrowserWindow } from 'electron'
import path from 'path'

import { log } from './logger'

import { Communication } from './lib/Communication'
import { Recognition } from './lib/Recognition'
import { Command } from './lib/Command'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

Command.createCommandsFile()

function createWindow() {
  log.debug('Creating window')

  mainWindow = new BrowserWindow({
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

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    log.debug('Main window closed')
    mainWindow = null
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(() => {
    log.debug('App ready')
    Communication.registerListeners()
  })
  .catch(log.catchErrors)

app.on('window-all-closed', () => {
  log.debug('Taiga windows all closed')

  Recognition.stopRecognition()

  if (process.platform !== 'darwin') {
    app.quit()
    log.debug('Taiga closed')
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
