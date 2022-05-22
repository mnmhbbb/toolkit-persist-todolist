import Checkbox from '../Checkbox';
import { useDispatch } from 'react-redux';
import { editMode, remove, Todo } from '../../slices/todoSlice';
import { useCallback } from 'react';

interface TodosProp {
  todos: Todo[];
}

const TodoList = ({ todos }: TodosProp) => {
  const dispatch = useDispatch();

  const removeItem = useCallback(
    (e: any) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        const id = e.target.dataset.id;
        dispatch(remove({ id }));
      }
    },
    [dispatch]
  );

  const onModified = useCallback(
    (e: any) => {
      const id = e.target.dataset.id;
      dispatch(editMode({ id }));
    },
    [dispatch]
  );

  return (
    <>
      <h3>List</h3>
      <ul>
        {todos?.map((todo: Todo) => (
          <li key={todo.id}>
            <Checkbox id={todo.id} isCompleted={todo.completed} />
            <div>
              제목: {todo.dday < 4 ? <strong>[긴급]</strong> : null}
              {todo.title}
            </div>
            <div>D - {todo.dday === 0 ? 'Day' : todo.dday}</div>
            <div>설명: {todo.description}</div>
            <div>생성일: {todo.createdAt}</div>
            <div>{todo.modifiedAt && '(수정일: ' + todo.modifiedAt + ')'}</div>
            <div>마감일: {todo.deadline}</div>

            <button data-id={todo.id} onClick={onModified}>
              수정
            </button>
            <button data-id={todo.id} onClick={removeItem}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
