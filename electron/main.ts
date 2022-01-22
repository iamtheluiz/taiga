import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

import { ipc } from './recognition'
import { addNewCommand } from './utils/addNewCommand'
import { getCommandList } from './utils/getCommandList'

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

  ipcMain.on('get-commands', (_, message) => {
    _.sender.send('update-commands', getCommandList())
  })

  ipcMain.on('add-new-command', (_, message) => {
    addNewCommand(message.command);
    _.sender.send('update-commands', getCommandList())
  })

  ipcMain.on('taiga-recognition', (_, message) => {
    // if (message.action === 'turn-off') {

    // } else if (message.action === 'turn-on') {
      
    // }
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  ipc.kill();
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
