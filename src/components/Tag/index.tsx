import { useCallback, useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { removeTagList, Tags } from '../../slices/todoSlice';
import { useDispatch } from 'react-redux';
import TagGenerator from '../TagGenerator';
import { TagStyle } from '../TodoList/style';
import { AllTagList, CurrentTagUl, TagAllUl, ExplainStyle } from './styles';

interface Props {
  tagHandler: (tags: Tags[], tagNameArr: string[]) => void;
  editTags: Tags[];
}

const Tag = ({ tagHandler, editTags }: Props) => {
  const tagList = useTypedSelector((state) => state.todoSlice.tagList);
  const [selectedtag, setSelectedTag] = useState<Array<Tags>>(editTags);
  const [selectedTagName, setSeletecTagName] = useState<Array<string>>([]);
  const [openGenerator, setOpenGenerator] = useState(false);
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

  const onToggle = useCallback(() => {
    setOpenGenerator(!openGenerator);
  }, [openGenerator]);

  return (
    <>
      <h3>현재 적용된 태그:</h3>
      <CurrentTagUl>
        {selectedtag.map((item: Tags) => {
          return (
            <TagStyle key={item.id} color={item.color} bgColor={item.bgColor}>
              <span>{item.name}</span>
              <button type='button' onClick={removeCurrentTag} data-name={item.name}>
                X
              </button>
            </TagStyle>
          );
        })}
      </CurrentTagUl>
      <h3>전체 태그 목록</h3>
      <ExplainStyle>다음 목록 중에서 태그를 선택할 수 있습니다.</ExplainStyle>
      <TagAllUl>
        {tagList.map((tag) => {
          return (
            <AllTagList key={tag.id} color={tag.color} bgColor={tag.bgColor}>
              <span data-name={tag.name} onClick={addCurrentTag}>
                {tag.name}
              </span>
              <button type='button' onClick={onRemoveTagList}>
                삭제
              </button>
            </AllTagList>
          );
        })}
      </TagAllUl>

      <button type='button' onClick={onToggle}>
        태그 추가하기
      </button>
      {openGenerator && <TagGenerator />}
    </>
  );
};

export default Tag;
