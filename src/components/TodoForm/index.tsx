import { useCallback, useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { add, dday, modified, Tags, Todo, toggleForm } from '../../slices/todoSlice';
import Tag from '../Tag';
import { Container, FormBackground } from './style';

const TodoForm = () => {
  const { isOpen, isEdit, editValue } = useTypedSelector((state) => state.todoSlice);
  let titleValue = '';
  let descValue = '';
  let deadlineValue = '';
  let tagsValue: Tags[] = [];

  if (isEdit) {
    titleValue = editValue[0].title;
    descValue = editValue[0].description;
    deadlineValue = editValue[0].deadline;
    editValue[0].tags.map((item) => {
      return tagsValue.push(item);
    });
  }

  const [title, onChangeTitle] = useInput(titleValue);
  const [description, onChangeDescription] = useInput(descValue);
  const [deadline, onChangeDeadline] = useInput(deadlineValue);
  const [tags, setTags] = useState<Array<Tags>>([]);
  const [tagNameArr, setTagNameArr] = useState<Array<string>>([]);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      titleInputRef.current?.focus();
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', preventGoBack);
      window.addEventListener('beforeunload', preventRefresh);
    })();
    return () => {
      window.removeEventListener('popstate', preventGoBack);
      window.removeEventListener('beforeunload', preventRefresh);
    };
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
        tags,
        tagNameArr,
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
        tags,
        tagNameArr,
      };
      dispatch(add(obj as Todo));
      dispatch(dday());
    }
  }, [dispatch, title, description, deadline, isEdit, editValue, tags, tagNameArr]);

  const onCloseForm = useCallback(() => {
    if (window.confirm('작성을 중단하시겠습니까?')) {
      dispatch(toggleForm({ isOpen }));
    }
  }, [isOpen, dispatch]);

  const tagHandler = useCallback((tags: Tags[], tagNameArr: string[]) => {
    setTags(tags);
    setTagNameArr(tagNameArr);
  }, []);

  const preventRefresh = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const preventGoBack = () => {
    window.history.pushState(null, '', window.location.href);
    console.log('prevent go back!');
  };

  return (
    <>
      <FormBackground onClick={onCloseForm} />
      <Container>
        <div className='header'>
          <h2>{isEdit ? '수정하기' : '할 일 추가'}</h2>
          <button onClick={onCloseForm}>닫기</button>
        </div>
        <form onSubmit={onSubmit}>
          <div className='group'>
            <label htmlFor='title'>제목</label>
            <input type='text' id='title' value={title} onChange={onChangeTitle} required ref={titleInputRef} />
          </div>
          <div className='group'>
            <label htmlFor='description'>상세설명</label>
            <textarea id='description' value={description} onChange={onChangeDescription} required />
          </div>
          <div className='group'>
            <label htmlFor='deadline'>마감일자</label>
            <input type='date' id='deadline' value={deadline} onChange={onChangeDeadline} min={getToday()} required />
          </div>
          <div className='group'>
            <Tag tagHandler={tagHandler} editTags={tagsValue} />
          </div>
          <button type='submit'>{isEdit ? '수정' : '등록'}</button>
        </form>
      </Container>
    </>
  );
};

export default TodoForm;

export function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ('0' + (1 + date.getMonth())).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}
