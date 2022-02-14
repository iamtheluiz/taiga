import { dialog } from 'electron'
import { Socket } from 'socket.io'
import { Command as CommandType } from '../../types/index'

// Lib
import { Command } from './Command'
import { Recognition } from './Recognition'

// Log
import { log } from '../logger'

// Log scopes
// const comunicationLog = log.scope('Comunication')
const listenerLog = log.scope('Comunication: Listener')
const senderLog = log.scope('Comunication: Sender')

export class Communication {
  public message(message: any) {
    listenerLog.info('message: ', message)
  }

  public async openDialog(data: any) {
    listenerLog.info('open dialog: ', data)

    // @ts-ignore
    const socket: Socket = this

    const selectedFile = await dialog.showOpenDialog({
      properties: ['openFile'],
    })

    socket.emit('open-dialog-response', selectedFile)
    senderLog.info('open dialog response: ', selectedFile)
  }

  public getCommands(data: any) {
    listenerLog.info('get commands: ', data)

    // @ts-ignore
    const socket: Socket = this

    const commands = Command.getCommandList()

    socket.emit('update-commands', commands)
    senderLog.info('update commands: ', commands)
  }

  public addNewCommand(data: { command: CommandType }) {
    listenerLog.info('add new command: ', data)

    // @ts-ignore
    const socket: Socket = this

    Command.addNewCommand(data.command)
    const commands = Command.getCommandList()

    socket.broadcast.emit('update-commands', commands)
    senderLog.info('update commands: ', commands)

    Recognition.resetRecognition()
    socket.broadcast.emit('taiga-recognition-status', {
      isRecognizing: true,
    })
  }

  public removeCommand(message: any) {
    listenerLog.info('remove command: ', message)

    // @ts-ignore
    const socket: Socket = this

    Command.removeCommand(message.command)

    const commands = Command.getCommandList()
    socket.broadcast.emit('update-commands', commands)
    senderLog.info('update commands: ', commands)

    Recognition.resetRecognition()
  }

  public taigaRecognition(message: any) {
    // @ts-ignore
    const socket: Socket = this

    if (message.action === 'turn-off') {
      Recognition.stopRecognition()
      socket.broadcast.emit('taiga-recognition-status', {
        isRecognizing: false,
      })
    } else if (message.action === 'turn-on') {
      Recognition.startRecognition()
      socket.broadcast.emit('taiga-recognition-status', {
        isRecognizing: true,
      })
    }
  }

  public taigaRecognitionGetStatus() {
    // @ts-ignore
    const socket: Socket = this

    socket.broadcast.emit('taiga-recognition-status', {
      isRecognizing: Recognition.isRecognizing,
    })
  }
}
