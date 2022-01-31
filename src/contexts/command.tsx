import { createContext, FC, useContext, useEffect, useState } from 'react'

export type Command = {
  id: string
  name: string
  type: 'shell' | 'program' | 'website'
  content: any
  default: boolean
}

interface CommandContextProps {
  commands: Command[]
  setCommands: (commands: Command[]) => void
  removeCommand: (command: Command) => void
  refreshCommands: () => void
}

const CommandContext = createContext({} as CommandContextProps)

export const CommandProvider: FC = ({ children }) => {
  const [commands, setCommands] = useState<Command[]>([])

  useEffect(() => {
    window.Main.send('get-commands', null)

    window.Main.on('update-commands', (data: any) => {
      setCommands(data)
    })
  }, [])

  function refreshCommands() {
    window.Main.send('get-commands', null)
  }

  function removeCommand(command: Command) {
    window.Main.send('remove-command', { command })
  }

  return (
    <CommandContext.Provider
      value={{
        commands,
        setCommands,
        refreshCommands,
        removeCommand,
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
