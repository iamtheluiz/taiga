import { app } from 'electron'
import { exec } from 'child_process'
import { Infra } from './infra/initialize'

import { log } from './lib/logger'
import { createTray } from './lib/tray'
import { createWindow, mainWindow } from './lib/window'

app
  .on('ready', createWindow)
  .whenReady()
  .then(() => {
    log.debug('App ready')

    if (process.env.NODE_ENV === 'production') {
      // Open github page with readme
      exec('start "" "https://github.com/iamtheluiz/taiga#readme"')
    }

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
