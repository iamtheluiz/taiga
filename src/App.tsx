import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
        <BrowserRouter>
          <Routes>
            <Route path="main_window" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </PageContainer>
    </>
  )
}
