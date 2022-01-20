import { Button } from '../Button'
import { Container, Image, LeftContent, RightContent } from './styles'

export function Home() {
  return (
    <Container>
      <LeftContent>
        <Image 
          src="https://i.pinimg.com/564x/97/52/bf/9752bfab3df02f402135b784a1710a56.jpg"
        />
      </LeftContent>
      <RightContent>
        <Button>Start</Button>
      </RightContent>
    </Container>
  )
}
 
