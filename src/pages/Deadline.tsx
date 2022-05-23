import TodoList from '../components/TodoList';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Deadline = () => {
  const todos = useTypedSelector((state) => state.todoSlice.items);
  const sort = [...todos].sort((a, b) => {
    return a.dday - b.dday;
  });

  return (
    <>
      <TodoList todos={sort} />
    </>
  );
};

export default Deadline;
