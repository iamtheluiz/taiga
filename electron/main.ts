import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import path from 'path'

import { log } from './logger'

import { Command } from './lib/Command'
import { Recognition } from './lib/Recognition'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

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

async function registerListeners() {
  log.debug('Registering listeners')

  const listenerLog = log.scope('Listener')
  const senderLog = log.scope('Sender')

  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    listenerLog.info('message: ', message)
  })

  ipcMain.on('open-dialog', async (_, message) => {
    listenerLog.info('open dialog: ', message)
    const selectedFile = await dialog.showOpenDialog({
      properties: ['openFile'],
    })

    _.sender.send('open-dialog-response', selectedFile)
    senderLog.info('open dialog response: ', selectedFile)
  })

  ipcMain.on('get-commands', (_, message) => {
    listenerLog.info('get commands: ', message)

    const commands = Command.getCommandList()

    _.sender.send('update-commands', commands)
    senderLog.info('update commands: ', commands)
  })

  ipcMain.on('add-new-command', (_, message) => {
    listenerLog.info('add new command: ', message)

    Command.addNewCommand(message.command)
    const commands = Command.getCommandList()

    _.sender.send('update-commands', commands)
    senderLog.info('update commands: ', commands)

    Recognition.resetRecognition()
  })

  ipcMain.on('remove-command', (_, message) => {
    listenerLog.info('remove command: ', message)

    Command.removeCommand(message.command)

    const commands = Command.getCommandList()
    _.sender.send('update-commands', commands)
    senderLog.info('update commands: ', commands)

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
    _.sender.send('taiga-recognition-status', {
      isRecognizing: Recognition.isRecognizing,
    })
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(() => {
    log.debug('App ready')
    registerListeners()
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
