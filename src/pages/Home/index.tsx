import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCommand } from '../../contexts/command'

import { taigaImages } from '../../utils/taigaImages'

// Components
import { Button } from '../../components/Button'
import { CommandItem } from '../../components/CommandItem'
import { TaigaImagesModal } from '../../components/TaigaImagesModal'

import { Container, LeftContent, RightContent, CommandList } from './styles'
import { Image } from '../../styles/GlobalComponents'

export function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [image, setImage] = useState('taiga-surprise')

  const { commands, refreshCommands, socket, isRecognizing } = useCommand()

  const navigate = useNavigate()

  function handleOpenChangeImageModal() {
    setModalIsOpen(true)
  }

  function handleTaigaStart() {
    socket.emit('recognition:start')
  }

  function handleTaigaStop() {
    socket.emit('recognition:stop')
  }

  function handleNavigateToNewCommand() {
    socket.emit('recognition:stop')
    navigate('/new_command')
  }

  return (
    <Container>
      {modalIsOpen && (
        <TaigaImagesModal setIsOpen={setModalIsOpen} setImage={setImage} />
      )}
      <LeftContent>
        <Image
          style={{
            backgroundImage: `url(${taigaImages[image].default})`,
          }}
          onClick={handleOpenChangeImageModal}
        />
        <strong>Welcome!</strong>
        {isRecognizing ? (
          <Button
            onClick={handleTaigaStop}
            style={{ backgroundColor: '#c53434' }}
            fullWidth
          >
            Stop Listening
          </Button>
        ) : (
          <Button
            onClick={handleTaigaStart}
            style={{ backgroundColor: '#34c534' }}
            fullWidth
          >
            Start Listening
          </Button>
        )}
        <Button onClick={refreshCommands} fullWidth>
          Refresh Commands
        </Button>
      </LeftContent>
      <RightContent>
        <h1>Commands</h1>
        <br />
        <CommandList>
          {commands.length === 0 && <strong>0 commands found</strong>}
          {commands.map(command => (
            <CommandItem key={command.id} command={command} />
          ))}
        </CommandList>
        <Button onClick={handleNavigateToNewCommand} fullWidth>
          Add Command
        </Button>
      </RightContent>
    </Container>
  )
}
