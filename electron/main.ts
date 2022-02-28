import { app } from 'electron'
import { Infra } from './infra/initialize'

import { log } from './lib/logger'
import { createTray } from './lib/tray'
import { createWindow, mainWindow } from './lib/window'

app
  .on('ready', createWindow)
  .whenReady()
  .then(() => {
    log.debug('App ready')

    createTray(mainWindow!)
  })
  .catch(log.catchErrors)

app.on('window-all-closed', () => {
  log.debug('Taiga windows all closed')

  if (process.platform !== 'darwin') {
    app.quit()
    log.debug('Taiga closed')
  }
})

// Create application
Infra.initialize()
