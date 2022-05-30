import Checkbox from '../Checkbox';
import { useDispatch } from 'react-redux';
import { editMode, remove, Todo } from '../../slices/todoSlice';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ItemStyle, TodoListStyle, ItemButtons, TagStyle } from './style';

interface TodosProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodosProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeItem = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        const id = (e.target as HTMLButtonElement).dataset.id;
        dispatch(remove({ id } as Todo));
      }
    },
    [dispatch]
  );

  const onModify = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const id = (e.target as HTMLButtonElement).dataset.id;
      dispatch(editMode({ id } as Todo));
    },
    [dispatch]
  );

  const searchTag = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const tagName = (e.target as HTMLElement).textContent;
      navigate(`/tag/${tagName}`);
    },
    [navigate]
  );

  return (
    <TodoListStyle>
      <ul>
        {todos?.map((todo: Todo) => (
          <ItemStyle key={todo.id} completed={todo.completed}>
            <div className='group'>
              <Checkbox id={todo.id} isCompleted={todo.completed} />
              <div className='group__right'>
                <div className='titleAndDeadline'>
                  <span>
                    {todo.dday < 4 ? <strong>[긴급] </strong> : null}
                    {todo.title}
                  </span>
                  <strong>{todo.deadline}까지</strong>
                </div>
                <div className='desc'>{todo.description}</div>
                <div className='createdAndModifiedAt'>
                  <span>생성일: {todo.createdAt}</span>
                  <span>{todo.modifiedAt && '(수정일: ' + todo.modifiedAt + ')'}</span>
                </div>
                <div>
                  <ul>
                    {todo.tags.map((tag) => {
                      return (
                        <TagStyle onClick={searchTag} key={tag.id} color={tag.color} bgColor={tag.bgColor}>
                          {tag.name}
                        </TagStyle>
                      );
                    })}
                  </ul>
                </div>

                <ItemButtons>
                  <button data-id={todo.id} onClick={onModify}>
                    수정
                  </button>
                  <button data-id={todo.id} onClick={removeItem}>
                    삭제
                  </button>
                </ItemButtons>
              </div>
            </div>
          </ItemStyle>
        ))}
      </ul>
    </TodoListStyle>
  );
};

export default TodoList;
