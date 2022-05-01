import { contextBridge, ipcRenderer, remote } from 'electron'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */
  greetingText: process.env.RELEASE_GREETING_MESSAGE
    ? process.env.RELEASE_GREETING_MESSAGE
    : 'Welcome!',
  defaultImage: process.env.TAIGA_DEFAULT_IMAGE
    ? process.env.TAIGA_DEFAULT_IMAGE
    : 'taiga-surprise',

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  send: (channel: string, message: any) => {
    ipcRenderer.send(channel, message)
  },

  handleCloseWindow() {
    const window = remote.getCurrentWindow()

    window.close()
  },

  handleMaximizeWindow() {
    const window = remote.getCurrentWindow()

    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  },

  handleMinimizeWindow() {
    const window = remote.getCurrentWindow()

    // window.minimize()
    window.hide()
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
}

contextBridge.exposeInMainWorld('Main', api)
