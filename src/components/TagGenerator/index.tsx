import { useCallback, useState } from 'react';
import { SketchPicker } from 'react-color';
import { getToday } from '../TodoForm/index';
import { useDispatch } from 'react-redux';
import { addTagList, Tags } from '../../slices/todoSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Container, TagPreview } from './style';

const TagGenerator = () => {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState('');
  const [color, setColor] = useState('#fff');
  const [bgColor, setBgColor] = useState('#78a8da');
  const [openColor, setOpenColor] = useState(false);
  const [openBgColor, setOpenBgColor] = useState(false);
  const tagList = useTypedSelector((state) => state.todoSlice.tagList);

  const onChangeTagName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value.trim());
  }, []);

  const generateTag = useCallback(() => {
    if (!tagName) return;
    if (
      tagList.findIndex((tag) => {
        return tag.name === tagName;
      }) >= 0
    ) {
      alert('이미 존재하는 태그명입니다.');
      setTagName('');
      return;
    }
    const generatedTag = {
      name: tagName,
      color,
      bgColor,
      createdAt: getToday(),
    };
    dispatch(addTagList(generatedTag as Tags));
    // 태그 생성 후 초기화
    setOpenColor(false);
    setOpenBgColor(false);
    setColor('#fff');
    setBgColor('#78a8da');
    setTagName('');
  }, [tagName, color, bgColor, dispatch, tagList]);

  const toggleColorPicker = useCallback(() => {
    setOpenColor(!openColor);
  }, [openColor]);

  const toggleBgColorPicker = useCallback(() => {
    setOpenBgColor(!openBgColor);
  }, [openBgColor]);

  const colorPicker = useCallback((color: string) => {
    setColor(color);
  }, []);

  const bgColorPicker = useCallback((color: string) => {
    setBgColor(color);
  }, []);

  return (
    <Container>
      <input type='text' value={tagName} onChange={onChangeTagName} placeholder='태그 이름을 입력하세요' />

      <h3>태그 미리보기</h3>
      <TagPreview color={color} bgColor={bgColor}>
        {tagName}
      </TagPreview>

      <div className='group'>
        <button type='button' onClick={toggleColorPicker}>
          태그 글자색 선택
        </button>
        {openColor && <SketchPicker color={color} onChange={(color) => colorPicker(color.hex)} />}
        <button type='button' onClick={toggleBgColorPicker}>
          태그 배경색 선택
        </button>
        {openBgColor && <SketchPicker color={bgColor} onChange={(color) => bgColorPicker(color.hex)} />}
      </div>

      <div className='generateButton'>
        <button type='button' onClick={generateTag}>
          태그 생성하기
        </button>
      </div>
    </Container>
  );
};

export default TagGenerator;
