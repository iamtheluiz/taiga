import { useState } from 'react'
import { taigaImages } from '../../utils/taigaImages'

import { Button } from '../../components/Button'
import Modal from '../../components/Modal'

import {
  Container,
  ModalBody,
  Image,
  LeftContent,
  RightContent,
} from './styles'

export function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [image, setImage] = useState('animated-taiga-shy')

  function handleOpenChangeImageModal() {
    setModalIsOpen(true)
  }

  function handleChangeImage(key: string) {
    setImage(key)
    setModalIsOpen(false)
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
        <Button>New Command</Button>
      </LeftContent>
      <RightContent></RightContent>
    </Container>
  )
}
