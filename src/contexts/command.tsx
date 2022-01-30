import { createContext, FC, useContext, useState } from 'react'

type Command = {
  id: string
  name: string
  type: 'shell' | 'program' | 'Website'
  content: any
  default: boolean
}

interface CommandContextProps {
  commands: any[]
  setCommands: (commands: Command[]) => void
}

const CommandContext = createContext({} as CommandContextProps)

export const CommandProvider: FC = ({ children }) => {
  const [commands, setCommands] = useState<Command[]>([])

  return (
    <CommandContext.Provider
      value={{
        commands,
        setCommands,
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
