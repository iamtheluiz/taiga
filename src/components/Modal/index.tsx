import { FC } from 'react'
import { Button } from '../Button'

import { Container, Footer, Title } from './styles'

interface ModalProps {
  title: string
  setIsOpen: (isOpen: boolean) => void
  showFooter?: boolean
}

const Modal: FC<ModalProps> = ({
  title,
  children,
  setIsOpen,
  showFooter = false,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
      {showFooter && (
        <Footer>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Footer>
      )}
    </Container>
  )
}

export default Modal
