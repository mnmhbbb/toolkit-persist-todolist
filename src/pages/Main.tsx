import { useTypedSelector } from '../hooks/useTypedSelector';
import TodoList from '../components/TodoList/index';

const Main = () => {
  const todos = [...useTypedSelector((state) => state.todoSlice.items)].reverse();

  return (
    <>
      <TodoList todos={todos} />
    </>
  );
};

export default Main;
