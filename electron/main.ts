import { app, BrowserWindow } from 'electron'
import { WebsocketServer } from './infra/server/websocket'

import { log } from './lib/logger'

import { Window } from './lib/Window'

const websocket = new WebsocketServer()

websocket.listen()

app
  .on('ready', Window.createWindow)
  .whenReady()
  .then(() => {
    log.debug('App ready')
  })
  .catch(log.catchErrors)

app.on('window-all-closed', () => {
  log.debug('Taiga windows all closed')

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
