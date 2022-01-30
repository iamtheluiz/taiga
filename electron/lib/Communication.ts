import { dialog, ipcMain } from 'electron'

// Lib
import { Command } from './Command'
import { Recognition } from './Recognition'

// Log
import { log } from '../logger'
import { IpcMainEvent } from 'electron/main'

// Log scopes
const comunicationLog = log.scope('Comunication')
const listenerLog = log.scope('Comunication: Listener')
const senderLog = log.scope('Comunication: Sender')

export class Communication {
  static registerListeners() {
    comunicationLog.debug('Registering listeners - start')

    ipcMain.on('message', this.message)
    ipcMain.on('open-dialog', this.openDialog)
    ipcMain.on('get-commands', this.getCommands)
    ipcMain.on('add-new-command', this.addNewCommand)
    ipcMain.on('remove-command', this.removeCommand)
    ipcMain.on('taiga-recognition', this.taigaRecognition)
    ipcMain.on('taiga-recognition-get-status', this.taigaRecognitionGetStatus)

    comunicationLog.debug('Registering listeners - end')
  }

  static message(_: IpcMainEvent, message: any) {
    listenerLog.info('message: ', message)
  }

  static async openDialog(_: IpcMainEvent, message: any) {
    listenerLog.info('open dialog: ', message)
    const selectedFile = await dialog.showOpenDialog({
      properties: ['openFile'],
    })

    _.sender.send('open-dialog-response', selectedFile)
    senderLog.info('open dialog response: ', selectedFile)
  }

  static getCommands(_: IpcMainEvent, message: any) {
    listenerLog.info('get commands: ', message)

    const commands = Command.getCommandList()

    _.sender.send('update-commands', commands)
    senderLog.info('update commands: ', commands)
  }

  static addNewCommand(_: IpcMainEvent, message: any) {
    listenerLog.info('add new command: ', message)

    Command.addNewCommand(message.command)
    const commands = Command.getCommandList()

    _.sender.send('update-commands', commands)
    senderLog.info('update commands: ', commands)

    Recognition.resetRecognition()
  }

  static removeCommand(_: IpcMainEvent, message: any) {
    listenerLog.info('remove command: ', message)

    Command.removeCommand(message.command)

    const commands = Command.getCommandList()
    _.sender.send('update-commands', commands)
    senderLog.info('update commands: ', commands)

    Recognition.resetRecognition()
  }

  static taigaRecognition(_: IpcMainEvent, message: any) {
    if (message.action === 'turn-off') {
      Recognition.stopRecognition()
      _.sender.send('taiga-recognition-status', { isRecognizing: false })
    } else if (message.action === 'turn-on') {
      Recognition.startRecognition()
      _.sender.send('taiga-recognition-status', { isRecognizing: true })
    }
  }

  static taigaRecognitionGetStatus(_: IpcMainEvent) {
    _.sender.send('taiga-recognition-status', {
      isRecognizing: Recognition.isRecognizing,
    })
  }
}
