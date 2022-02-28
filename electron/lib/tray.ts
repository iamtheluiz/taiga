import { app, BrowserWindow, Menu, Tray } from 'electron'

import { iconPath } from '../config/config'

let tray: Tray | null = null

export function createTray(mainWindow: BrowserWindow) {
  tray = new Tray(iconPath)

  tray.on('double-click', () => {
    mainWindow.show()
  })

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        mainWindow.show()
      },
    },
    {
      label: 'Exit',
      click: () => {
        app.quit()
      },
    },
  ])
  tray.setContextMenu(contextMenu)

  tray.setToolTip('Taiga is here!')

  return tray
}
