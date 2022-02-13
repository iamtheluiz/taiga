import { app, BrowserWindow } from 'electron'

import { log } from './logger'

import { Communication } from './lib/Communication'
import { Recognition } from './lib/Recognition'
import { Command } from './lib/Command'
import { Window } from './lib/Window'

Command.createCommandsFile()

app
  .on('ready', Window.createWindow)
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
    Window.createWindow()
  }
})
