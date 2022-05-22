import { useTypedSelector } from '../hooks/useTypedSelector';
import TodoList from '../components/TodoList/index';

const Created = () => {
  const todos = useTypedSelector((state) => state.todoSlice);

  return (
    <>
      <h1>생성순</h1>
      <TodoList todos={todos.items} />
    </>
  );
};

export default Created;
