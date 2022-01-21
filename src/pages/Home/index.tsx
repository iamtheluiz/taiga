import { Button } from '../../components/Button'
import { taigaImages } from '../../utils/taigaImages'
import { Container, Image, LeftContent, RightContent } from './styles'

export function Home() {
  function handleNavigateToVoice() {}

  console.log(taigaImages["taiga-shy"]);

  return (
    <Container>
      <LeftContent>
        <Image src={taigaImages["taiga-shy"].default} />
        <Button onClick={handleNavigateToVoice}>Talk</Button>
      </LeftContent>
      <RightContent>

      </RightContent>
    </Container>
  )
}
