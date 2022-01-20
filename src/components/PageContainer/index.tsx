import { FC } from 'react'
import { Container } from './styles'

export const PageContainer: FC = ({ children }) => {
  return <Container>{children}</Container>
}
