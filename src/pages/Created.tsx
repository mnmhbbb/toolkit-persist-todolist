import { useTypedSelector } from '../hooks/useTypedSelector';
import TodoList from '../components/TodoList/index';

const Created = () => {
  const todos = useTypedSelector((state) => state.todoSlice);

  return (
    <>
      <TodoList todos={todos.items} />
    </>
  );
};

export default Created;
