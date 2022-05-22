import { useCallback, useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { removeTagList, Tags } from '../../slices/todoSlice';
import { useDispatch } from 'react-redux';
import TagGenerator from '../TagGenerator';

interface Props {
  tagHandler: (data: Tags[]) => void;
  editTags: Tags[];
}

// 상위 컴포넌트에 보내야 할 값
// tag: [{id: '123', name: 'tag1', ... }, {}]
const Tag = ({ tagHandler, editTags }: Props) => {
  const tagList = useTypedSelector((state) => state.todoSlice.tagList);
  const [selectedtag, setSelectedTag] = useState<Array<Tags>>(editTags);
  const dispatch = useDispatch();

  useEffect(() => {
    tagHandler(selectedtag);
  }, [selectedtag, tagHandler]);

  const addCurrentTag = useCallback(
    (e: any) => {
      const name = e.target.dataset.name;
      if (selectedtag.filter((item) => item.name === name).length > 0) {
        alert('이미 추가된 태그입니다.');
        return;
      }
      const thisTag = tagList.filter((tag) => {
        return tag.name === name;
      })[0];
      setSelectedTag((prev) => {
        return [...prev, thisTag];
      });
    },
    [tagList, selectedtag]
  );

  const removeCurrentTag = useCallback(
    (e: any) => {
      const name = e.target.dataset.name;
      setSelectedTag(selectedtag.filter((item) => item.name !== name));
    },
    [selectedtag]
  );

  const onRemoveTagList = useCallback(
    (e: any) => {
      if (window.confirm('전체 태그 목록에서 해당 태그를 삭제하시겠습니까?')) {
        const name = e.target.previousSibling.dataset.name;
        dispatch(removeTagList({ name }));
      }
    },
    [dispatch]
  );

  return (
    <>
      <h1>전체 태그 목록----------------------</h1>
      <ul>
        {tagList.map((tag) => {
          return (
            <li key={tag.id}>
              <span data-name={tag.name} onClick={addCurrentTag}>
                {tag.name}
              </span>
              <button type='button' onClick={onRemoveTagList}>
                태그 삭제
              </button>
            </li>
          );
        })}
      </ul>
      {/* 
      //
      //
      */}
      <h1>현재 적용된 태그:</h1>
      <ul>
        {selectedtag.map((item: Tags) => {
          return (
            <li key={item.id} style={{ color: item.color, backgroundColor: item.bgColor }}>
              <span>{item.name}</span>
              <button type='button' onClick={removeCurrentTag} data-name={item.name}>
                X
              </button>
            </li>
          );
        })}
      </ul>
      <TagGenerator />
    </>
  );
};

export default Tag;