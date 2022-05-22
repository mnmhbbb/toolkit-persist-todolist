import { useSearchParams } from 'react-router-dom';
import TodoList from '../components/TodoList';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Tag = () => {
  const [searchParams] = useSearchParams();
  const tagName = searchParams.get('name');
  let todos = useTypedSelector((state) => state.todoSlice.items);
  todos = todos.filter((tag) => {
    return tag.tagNameArr.includes(tagName as string);
  });

  return (
    <>
      <h1>Tag</h1>
      <TodoList todos={todos} />
    </>
  );
};

export default Tag;
