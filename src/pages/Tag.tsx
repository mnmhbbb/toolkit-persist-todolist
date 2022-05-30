import { useParams } from 'react-router';
import TodoList from '../components/TodoList';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Tag = () => {
  const { tagName } = useParams();
  console.log(tagName);

  let todos = useTypedSelector((state) => state.todoSlice.items);
  todos = todos.filter((tag) => {
    return tag.tagNameArr.includes(tagName as string);
  });

  return (
    <>
      <TodoList todos={todos} />
    </>
  );
};

export default Tag;
