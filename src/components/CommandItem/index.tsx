import { FC } from 'react'
import { useCommand } from '../../contexts/command'
import { Command } from '../../../types'

// Components
import { Button } from '../Button'

// Icons
import { FiGlobe, FiSettings } from 'react-icons/fi'
import { BsTerminalFill } from 'react-icons/bs'
import { FaLaptop, FaTrash } from 'react-icons/fa'

// Styles
import { Container } from './styles'

interface CommandItemProps {
  command: Command
}

export const CommandItem: FC<CommandItemProps> = ({ command }) => {
  const iconSize = 20
  const { removeCommand } = useCommand()

  return (
    <Container key={command.name} command={command}>
      {command.type === 'default' && <FiSettings size={iconSize} />}
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
