import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Offensive from './pages/Offensive';
import Defensive from './pages/Defensive';
import Healing from './pages/Healing';
import styled from 'styled-components';
import { ExcelProvider } from './context/ExcelContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--background-color);
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  return (
    <ExcelProvider>
      <Router>
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<Offensive />} />
              <Route path="/offensive" element={<Offensive />} />
              <Route path="/defensive" element={<Defensive />} />
              <Route path="/healing" element={<Healing />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </ExcelProvider>
  );
}

export default App;