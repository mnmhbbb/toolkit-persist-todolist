import Header from './components/Header';
import { Container, LayoutStyle } from './styles/Layout';
import Nav from './components/Nav/index';
import { Routes } from 'react-router';
import { Route } from 'react-router';
import Main from './pages/Main';
import Completed from './pages/Completed';
import Created from './pages/Created';
import Deadline from './pages/Deadline';

function App() {
  return (
    <Container>
      <LayoutStyle>
        <Header />
        <Nav />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/completed' element={<Completed />} />
          <Route path='/created' element={<Created />} />
          <Route path='/deadline' element={<Deadline />} />
        </Routes>
      </LayoutStyle>
    </Container>
  );
}

export default App;
