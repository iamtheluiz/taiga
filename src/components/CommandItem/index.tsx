import { FC } from 'react'
import { Command, useCommand } from '../../contexts/command'

// Icons
import { FiGlobe } from 'react-icons/fi'
import { BsTerminalFill } from 'react-icons/bs'
import { FaLaptop, FaTrash } from 'react-icons/fa'
import { Container } from './styles'
import { Button } from '../Button'

interface CommandItemProps {
  command: Command
}

export const CommandItem: FC<CommandItemProps> = ({ command }) => {
  const iconSize = 20
  const { removeCommand } = useCommand()

  return (
    <Container key={command.name}>
      {command.type === 'website' && <FiGlobe size={iconSize} />}
      {command.type === 'shell' && <BsTerminalFill size={iconSize} />}
      {command.type === 'program' && <FaLaptop size={iconSize} />}
      <span style={{ flex: 1 }}>
        {command.type} - {command.name}
      </span>
      {command.default === false && (
        <Button
          onClick={() => removeCommand(command)}
          style={{
            backgroundColor: '#c53434',
            width: 38,
            height: 38,
            padding: 0,
          }}
        >
          <FaTrash size={18} />
        </Button>
      )}
    </Container>
  )
}
