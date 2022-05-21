import { useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { add, dday, modified, Todo, toggleForm } from '../../slices/todoSlice';
import { Container, FormBackground } from './style';

function getToday() {
  // return YYYY-MM-DD
  const date = new Date().toISOString().slice(0, 10);
  return date;
}

const TodoForm = () => {
  const { isOpen, isEdit, editValue } = useTypedSelector((state) => state.todoSlice);
  let titleValue = '';
  let descValue = '';
  let deadlineValue = '';

  if (isEdit) {
    titleValue = editValue[0].title;
    descValue = editValue[0].description;
    deadlineValue = editValue[0].deadline;
  }

  const [title, onChangeTitle] = useInput(titleValue);
  const [description, onChangeDescription] = useInput(descValue);
  const [deadline, onChangeDeadline] = useInput(deadlineValue);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const onSubmit = useCallback(() => {
    if (isEdit) {
      const obj = {
        id: editValue[0].id,
        title,
        description,
        completed: false,
        createdAt: editValue[0].createdAt,
        modifiedAt: getToday(),
        deadline,
      };
      dispatch(modified(obj as Todo));
      dispatch(dday());
    } else {
      const obj = {
        title,
        description,
        completed: false,
        createdAt: getToday(),
        deadline,
      };
      dispatch(add(obj as Todo));
      dispatch(dday());
    }
  }, [dispatch, title, description, deadline, isEdit, editValue]);

  const onCloseForm = useCallback(() => {
    dispatch(toggleForm({ isOpen }));
  }, [isOpen, dispatch]);

  return (
    <div>
      <FormBackground onClick={onCloseForm} />
      <Container>
        <div className='header'>
          <h1>{isEdit ? '수정' : '할 일  추가'}</h1>
          <button onClick={onCloseForm}>X</button>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='title'>제목</label>
            <input type='text' id='title' value={title} onChange={onChangeTitle} required ref={titleInputRef} />
          </div>
          <div>
            <label htmlFor='description'>상세설명</label>
            <input type='text' id='description' value={description} onChange={onChangeDescription} required />
          </div>
          <div>
            <label htmlFor='deadline'>마감일자</label>
            <input type='date' id='deadline' value={deadline} onChange={onChangeDeadline} min={getToday()} required />
          </div>
          <button type='submit'>{isEdit ? '수정' : '등록'}</button>
        </form>
      </Container>
    </div>
  );
};

export default TodoForm;
