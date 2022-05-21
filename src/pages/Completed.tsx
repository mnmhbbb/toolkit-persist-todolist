import TodoList from '../components/TodoList';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeCompleted } from '../slices/todoSlice';

const Completed = () => {
  let todos = useTypedSelector((state) => state.todoSlice.items);
  todos = todos.filter((todo) => todo.completed === true);
  const dispatch = useDispatch();

  const onRemove = useCallback(() => {
    if (window.confirm('완료된 목록을 모두 삭제하시겠습니까?')) {
      dispatch(removeCompleted());
    }
  }, [dispatch]);

  return (
    <>
      <h1>완료된 목록</h1>
      <button onClick={onRemove}>완료 목록 삭제</button>
      <TodoList todos={todos} />
    </>
  );
};

export default Completed;
