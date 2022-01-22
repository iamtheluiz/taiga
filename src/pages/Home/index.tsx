import { useEffect, useState } from 'react'
import { taigaImages } from '../../utils/taigaImages'

import { BsTerminalFill } from 'react-icons/bs'

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

export function Home() {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [image, setImage] = useState('animated-taiga-shy')
  const [commands, setCommands] = useState<any[]>([]);

  useEffect(() => {
    window.Main.send("get-commands", null)

    window.Main.on("update-commands", (data: any) => {
      setCommands(JSON.parse(data));
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
    setIsRecognizing(true)
  }

  function handleTaigaStop() {
    window.Main.send("taiga-recognition", { action: "turn-off" })
    setIsRecognizing(false)
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
        <Button onClick={handleRefreshCommands} fullWidth>Refresh</Button>
      </LeftContent>
      <RightContent>
        <h1>Commands</h1>
        <br />
        <CommandsContainer>
          {commands.map(command => (
            <CommandContainer key={command.name}>
              <BsTerminalFill />
              {command.type} - {command.name}
            </CommandContainer>
          ))}
        </CommandsContainer>
      </RightContent>
    </Container>
  )
}
