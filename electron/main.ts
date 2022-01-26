import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import path from 'path'
import { Recognition } from './lib/Recognition'

import { addNewCommand } from './utils/addNewCommand'
import { getCommandList } from './utils/getCommandList'
import { removeCommand } from './utils/removeCommand'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

function createWindow () {
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
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })

  ipcMain.on('open-dialog', async (_, message) => {
    const selectedFile = await dialog.showOpenDialog({ properties: ['openFile'] })

    _.sender.send('open-dialog-response', selectedFile);
  })

  ipcMain.on('get-commands', (_, message) => {
    _.sender.send('update-commands', getCommandList())
  })

  ipcMain.on('add-new-command', (_, message) => {
    addNewCommand(message.command);
    _.sender.send('update-commands', getCommandList())
    Recognition.resetRecognition()
  })

  ipcMain.on('remove-command', (_, message) => {
    removeCommand(message.command);
    _.sender.send('update-commands', getCommandList())
    Recognition.resetRecognition()
  })

  ipcMain.on('taiga-recognition', (_, message) => {
    if (message.action === 'turn-off') {
      Recognition.stopRecognition()
      _.sender.send('taiga-recognition-status', { isRecognizing: false })
    } else if (message.action === 'turn-on') {
      Recognition.startRecognition()
      _.sender.send('taiga-recognition-status', { isRecognizing: true })
    }
  })

  ipcMain.on('taiga-recognition-get-status', (_, message) => {
    _.sender.send('taiga-recognition-status', { isRecognizing: Recognition.isRecognizing })
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  Recognition.stopRecognition()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
