import { app, BrowserWindow } from 'electron'
import { Server } from 'socket.io'

import { log } from './logger'

import { Communication } from './lib/Communication'
import { Recognition } from './lib/Recognition'
import { Command } from './lib/Command'
import { Window } from './lib/Window'

Command.createCommandsFile()

// Websocket
export const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
  },
})
io.listen(2707)
const clients: Communication[] = []

io.on('connection', socket => {
  const clientCommunication = new Communication()
  clients.push(clientCommunication)

  socket.on('message', clientCommunication.message)
  socket.on('open-dialog', clientCommunication.openDialog)
  socket.on('get-commands', clientCommunication.getCommands)
  socket.on('add-new-command', clientCommunication.addNewCommand)
  socket.on('remove-command', clientCommunication.removeCommand)
  socket.on('taiga-recognition', clientCommunication.taigaRecognition)
  socket.on(
    'taiga-recognition-get-status',
    clientCommunication.taigaRecognitionGetStatus
  )
})

app
  .on('ready', Window.createWindow)
  .whenReady()
  .then(() => {
    log.debug('App ready')
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
