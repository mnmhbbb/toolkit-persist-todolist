import Header from './components/Header';
import { Container, LayoutStyle } from './styles/Layout';
import Nav from './components/Nav/index';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Completed from './pages/Completed';
import Created from './pages/Created';
import Deadline from './pages/Deadline';
import Tag from './pages/Tag';

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
          <Route path='/tag' element={<Tag />} />
        </Routes>
      </LayoutStyle>
    </Container>
  );
}

export default App;
