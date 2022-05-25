import Header from './components/Header';
import { Container, LayoutStyle } from './styles/Layout';
import Nav from './components/Nav/index';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Completed from './pages/Completed';
import Created from './pages/Created';
import Deadline from './pages/Deadline';
import Tag from './pages/Tag';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useEffect } from 'react';

function App() {
  const { isOpen, isEdit } = useTypedSelector((state) => state.todoSlice);

  useEffect(() => {
    if (isOpen || isEdit) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'scroll';
    }
  }, [isOpen, isEdit]);

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
