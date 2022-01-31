import { FC } from 'react'

import { taigaImages } from '../../utils/taigaImages'

// Components
import Modal from '../../components/Modal'

import { ModalBody } from './styles'
import { Image } from '../../styles/GlobalComponents'

interface TaigaImagesModalProps {
  setIsOpen: (status: boolean) => void
  setImage: (image: string) => void
}

export const TaigaImagesModal: FC<TaigaImagesModalProps> = ({
  setIsOpen,
  setImage,
}) => {
  function handleChangeImage(key: string) {
    setImage(key)
    setIsOpen(false)
  }

  return (
    <Modal title="Select a Image" setIsOpen={setIsOpen}>
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
  )
}
