import { HashRouter, Routes, Route } from 'react-router-dom'

import { GlobalStyle } from './styles/GlobalStyle'

// Components
import Header from './components/Header'
import { PageContainer } from './components/PageContainer'

// Pages
import { Home } from './pages/Home'
import { NewCommand } from './pages/NewCommand'

export function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <PageContainer>
        <HashRouter>
          <Routes>
            <Route path="main_window" element={<Home />} />
            <Route path="new_command" element={<NewCommand />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </HashRouter>
      </PageContainer>
    </>
  )
}
