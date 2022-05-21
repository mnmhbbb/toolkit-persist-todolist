import { useTypedSelector } from '../hooks/useTypedSelector';
import TodoList from '../components/TodoList/index';

const Main = () => {
  const todos = useTypedSelector((state) => state.todoSlice);
  if (todos.items[0]?.title === '') todos.items.splice(0, 1);
  console.log('전체', todos);

  return (
    <>
      <h1>main</h1>
      <TodoList todos={todos.items} />
    </>
  );
};

export default Main;
