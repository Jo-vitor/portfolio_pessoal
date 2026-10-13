import { Route, Routes } from 'react-router'
import { Sobre } from './view/Sobre'
import { Projetos } from './view/Projetos'
import { Experiencias } from './view/Experiencias'
import { Contato } from './view/Contato'
import { PortfolioShell } from './components/PortfolioShell'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'

function App() {

  const { i18n } = useTranslation();
  const [languageSelected, setLanguageSelected] = useState(i18n.language);

  const handleChangeLanguage = useCallback((language) => {
    i18n.changeLanguage(language);
    setLanguageSelected(language);    
  }, []);

  return (
    <Routes>
      <Route element={<PortfolioShell ls={languageSelected} setls={handleChangeLanguage}/>}>
        <Route path="/" element={<Sobre />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/experiencias" element={<Experiencias />} />
        <Route path="/contato" element={<Contato />} />
      </Route>
    </Routes>
  )
}

export default App
