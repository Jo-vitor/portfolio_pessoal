import { Route, Routes } from 'react-router'
import { Sobre } from './view/Sobre'
import { Projetos } from './view/Projetos'
import { Experiencias } from './view/Experiencias'
import { Contato } from './view/Contato'
import { PortfolioShell } from './components/PortfolioShell'

function App() {
  return (
    <Routes>
      <Route element={<PortfolioShell />}>
        <Route path="/" element={<Sobre />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/experiencias" element={<Experiencias />} />
        <Route path="/contato" element={<Contato />} />
      </Route>
    </Routes>
  )
}

export default App
