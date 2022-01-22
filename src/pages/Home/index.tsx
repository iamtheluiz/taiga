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

  function handleTaigaListen() {
    window.Main.send("taiga-recognition", { action: "start" })

    window.Main.on("taiga-recognition", (_: any, data: any) => {
      console.log(data);
    })
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
        <Button onClick={handleTaigaListen}>Listen</Button>
        <Button onClick={handleRefreshCommands}>Refresh</Button>
      </LeftContent>
      <RightContent>
        <h1>Commands</h1>
        <br />
        <CommandsContainer>
          {commands.map(command => (
            <CommandContainer>
              <BsTerminalFill />
              {command.type} - {command.name}
            </CommandContainer>
          ))}
        </CommandsContainer>
      </RightContent>
    </Container>
  )
}
