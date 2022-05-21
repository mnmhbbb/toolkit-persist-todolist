import TodoList from '../components/TodoList';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Deadline = () => {
  const todos = useTypedSelector((state) => state.todoSlice.items);
  const sort = [...todos].sort((a, b) => {
    return a.dday - b.dday;
  });

  return (
    <>
      <h1>마감순</h1>
      <TodoList todos={sort} />
    </>
  );
};

export default Deadline;
