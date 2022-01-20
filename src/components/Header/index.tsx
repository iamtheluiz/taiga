import { FC } from 'react'
import { FiX, FiMinus, FiMaximize } from 'react-icons/fi'

import { Container, DragContainer, Button } from './styles'

const Header: FC = () => {
  console.log(window);
  return (
    <Container>
      <DragContainer>
        <Button onClick={window.Main.handleMinimizeWindow}>
          <FiMinus />
        </Button>
        <Button onClick={window.Main.handleMaximizeWindow}>
          <FiMaximize />
        </Button>
        <Button onClick={window.Main.handleCloseWindow}>
          <FiX />
        </Button>
      </DragContainer>
    </Container>
  )
}

export default Header
