import { GlobalStyle } from './styles/GlobalStyle'

// Components
import Header from './components/Header'
import { PageContainer } from './components/PageContainer'

// Pages
import { Home } from './pages/Home'

export function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <PageContainer>
        <Home />
      </PageContainer>
    </>
  )
}
