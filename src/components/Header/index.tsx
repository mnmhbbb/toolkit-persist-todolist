import { useCallback } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { toggleForm } from '../../slices/todoSlice';
import TodoForm from '../TodoForm';
import { HeaderStyle } from './style';

const Header = () => {
  const isOpen = useTypedSelector((state) => state.todoSlice.isOpen);
  const dispatch = useDispatch();

  const onOpen = useCallback(() => {
    dispatch(toggleForm({ isOpen }));
  }, [isOpen, dispatch]);

  return (
    <HeaderStyle>
      <h1>To do list</h1>
      <button type='button' onClick={onOpen}>
        + 할 일 추가하기
      </button>
      {isOpen && <TodoForm />}
    </HeaderStyle>
  );
};

export default Header;
