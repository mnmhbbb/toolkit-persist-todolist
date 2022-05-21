import { useCallback, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { closeForm, toggleForm } from '../../slices/todoSlice';
import TodoForm from '../TodoForm';

const Header = () => {
  const isOpen = useTypedSelector((state) => state.todoSlice.isOpen);
  const dispatch = useDispatch();
  dispatch(closeForm);

  const onOpen = useCallback(() => {
    dispatch(toggleForm({ isOpen }));
  }, [isOpen, dispatch]);

  return (
    <>
      <h1>To do list</h1>
      <button type='button' onClick={onOpen}>
        +
      </button>
      {isOpen && <TodoForm />}
    </>
  );
};

export default Header;
