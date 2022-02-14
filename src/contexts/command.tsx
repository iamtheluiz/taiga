import { createContext, FC, useContext, useEffect, useState } from 'react'
import { OpenDialogReturnValue } from 'electron/main'
import io, { Socket } from 'socket.io-client'

import { Command } from '../../types'

interface CommandContextProps {
  newCommand: Omit<Command, 'id'>
  setNewCommand: (content: Omit<Command, 'id'>) => void
  commands: Command[]
  setCommands: (commands: Command[]) => void
  isRecognizing: boolean
  setIsRecognizing: (isRecognizing: boolean) => void
  removeCommand: (command: Command) => void
  refreshCommands: () => void
  socket: Socket
}

const CommandContext = createContext({} as CommandContextProps)

export const CommandProvider: FC = ({ children }) => {
  const [commands, setCommands] = useState<Command[]>([])
  const [isRecognizing, setIsRecognizing] = useState(false)

  // New Command
  const [newCommand, setNewCommand] = useState<Omit<Command, 'id'>>({
    name: '',
    content: '',
    type: 'shell',
    default: false,
  })

  const socket = io('http://localhost:2707')

  useEffect(() => {
    socket.emit('get-commands', null)
    socket.emit('taiga-recognition-get-status', null)

    socket.on('update-commands', (data: any) => {
      setCommands(data)
    })

    socket.on('taiga-recognition-status', (data: any) => {
      console.log(data)
      setIsRecognizing(data.isRecognizing)
    })

    socket.on('open-dialog-response', (data: OpenDialogReturnValue) => {
      if (!data.canceled) {
        setNewCommand({
          ...newCommand,
          content: data.filePaths[0],
        })
      }
    })
  }, [])

  function refreshCommands() {
    socket.emit('get-commands', null)
  }

  function removeCommand(command: Command) {
    socket.emit('remove-command', { command })
  }

  return (
    <CommandContext.Provider
      value={{
        newCommand,
        setNewCommand,
        commands,
        setCommands,
        isRecognizing,
        setIsRecognizing,
        refreshCommands,
        removeCommand,
        socket,
      }}
    >
      {children}
    </CommandContext.Provider>
  )
}

export function useCommand() {
  const context = useContext(CommandContext)

  if (!context) {
    throw new Error('useCommand must be used within a CommandProvider')
  }

  return context
}
