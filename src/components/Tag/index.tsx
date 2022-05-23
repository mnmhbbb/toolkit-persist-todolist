import { useCallback, useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { removeTagList, Tags } from '../../slices/todoSlice';
import { useDispatch } from 'react-redux';
import TagGenerator from '../TagGenerator';

interface Props {
  tagHandler: (tags: Tags[], tagNameArr: string[]) => void;
  editTags: Tags[];
}

const Tag = ({ tagHandler, editTags }: Props) => {
  const tagList = useTypedSelector((state) => state.todoSlice.tagList);
  const [selectedtag, setSelectedTag] = useState<Array<Tags>>(editTags);
  const [selectedTagName, setSeletecTagName] = useState<Array<string>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    tagHandler(selectedtag, selectedTagName);
  }, [selectedtag, selectedTagName, tagHandler]);

  const addCurrentTag = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const name = (e.target as HTMLElement).dataset.name;
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
      setSeletecTagName((prev: any) => {
        return [...prev, name];
      });
    },
    [tagList, selectedtag]
  );

  const removeCurrentTag = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const name = (e.target as HTMLButtonElement).dataset.name;
      setSelectedTag(selectedtag.filter((item) => item.name !== name));
      setSeletecTagName(selectedTagName.filter((item) => item !== name));
    },
    [selectedtag, selectedTagName]
  );

  const onRemoveTagList = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm('전체 태그 목록에서 해당 태그를 삭제하시겠습니까?')) {
        const name = (e.target as any).previousSibling.dataset.name;
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
