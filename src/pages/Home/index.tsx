import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { taigaImages } from '../../utils/taigaImages'

// Icons
import { BsTerminalFill } from 'react-icons/bs'
import { FaLaptop, FaTrash } from 'react-icons/fa'

// Components
import { Button } from '../../components/Button'
import Modal from '../../components/Modal'

import {
  Container,
  ModalBody,
  Image,
  LeftContent,
  RightContent,
  CommandsContainer,
  CommandContainer
} from './styles'
import { FiGlobe } from 'react-icons/fi'

export function Home() {
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [image, setImage] = useState('taiga-surprise')
  const [commands, setCommands] = useState<any[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    window.Main.send("get-commands", null)
    window.Main.send("taiga-recognition-get-status", null)

    window.Main.on("update-commands", (data: any) => {
      setCommands(data)
    })
    window.Main.on("taiga-recognition-status", (data: any) => {
      setIsRecognizing(data.isRecognizing)
    })
  }, [])

  function handleOpenChangeImageModal() {
    setModalIsOpen(true)
  }

  function handleRefreshCommands() {
    window.Main.send("get-commands", null)
  }

  function handleChangeImage(key: string) {
    setImage(key)
    setModalIsOpen(false)
  }

  function handleTaigaStart() {
    window.Main.send("taiga-recognition", { action: "turn-on" })
  }

  function handleTaigaStop() {
    window.Main.send("taiga-recognition", { action: "turn-off" })
  }

  function handleAddCommand() {
    window.Main.send("taiga-recognition", { action: "turn-off" })
    navigate('/new_command')
  }

  function handleRemoveCommand(command: any) {
    window.Main.send("remove-command", { command })
  }

  return (
    <Container>
      {modalIsOpen && (
        <Modal title="Select a Image" setIsOpen={setModalIsOpen}>
          <ModalBody>
            {Object.keys(taigaImages).map(key => (
              <Image
                style={{
                  backgroundImage: `url(${taigaImages[key].default})`,
                }}
                onClick={() => handleChangeImage(key)}
              />
            ))}
          </ModalBody>
        </Modal>
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
          <Button onClick={handleTaigaStop} style={{ backgroundColor: '#c53434'}} fullWidth>Stop Listening</Button>
        ) : (
          <Button onClick={handleTaigaStart} style={{ backgroundColor: '#34c534'}} fullWidth>Start Listening</Button>
        )}
        <Button onClick={handleRefreshCommands} fullWidth>Refresh Commands</Button>
      </LeftContent>
      <RightContent>
        <h1>Commands</h1>
        <br />
        <CommandsContainer>
          {commands.length === 0 && (
            <strong>0 commands found</strong>
          )}
          {commands.map(command => (
            <CommandContainer key={command.name}>
              {command.type === 'website' && <FiGlobe />}
              {command.type === 'shell' && <BsTerminalFill />}
              {command.type === 'program' && <FaLaptop />}
              <span style={{ flex: 1 }}>
                {command.type} - {command.name}
              </span>
              {command.default === false && (
                <Button
                  onClick={() => handleRemoveCommand(command)}
                  style={{
                    backgroundColor: '#c53434',
                    width: 38,
                    height: 38,
                    padding: 0
                  }}
                >
                  <FaTrash size={18} />
                </Button>
              )}
            </CommandContainer>
          ))}
        </CommandsContainer>
        <Button onClick={handleAddCommand} fullWidth>Add Command</Button>
      </RightContent>
    </Container>
  )
}
