import { useTypedSelector } from '../hooks/useTypedSelector';
import TodoList from '../components/TodoList/index';

const Created = () => {
  const todos = useTypedSelector((state) => state.todoSlice);
  if (todos.items[0]?.title === '') todos.items.splice(0, 1);

  return (
    <>
      <h1>생성순</h1>
      <TodoList todos={todos.items} />
    </>
  );
};

export default Created;
