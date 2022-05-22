import { useCallback, useState } from 'react';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';
import { getToday } from '../TodoForm/index';
import { useDispatch } from 'react-redux';
import { addTagList, Tags } from '../../slices/todoSlice';

interface TagPreviewProp {
  color: string;
  bgColor: string;
  width: string;
}

const TagGenerator = () => {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState('');
  const [color, setColor] = useState('#fff');
  const [bgColor, setBgColor] = useState('#78a8da');
  const [tagWidth, setTagWidth] = useState('100px');
  const [openColor, setOpenColor] = useState(false);
  const [openBgColor, setOpenBgColor] = useState(false);

  const onChangeTagName = useCallback((e: any) => {
    setTagName(e.target.value);
  }, []);

  const onKeyUpTag = useCallback(() => {
    setTagWidth(`${tagName.length * 17}px`);
  }, [tagName]);

  const generateTag = useCallback(
    (e: any) => {
      if (tagName.length === 0) return;
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
      setColor('');
      setBgColor('');
      setTagName('');
    },
    [tagName, color, bgColor, dispatch]
  );

  const toggleColorPicker = useCallback(
    (e: any) => {
      setOpenColor(!openColor);
    },
    [openColor]
  );

  const toggleBgColorPicker = useCallback(
    (e: any) => {
      setOpenBgColor(!openBgColor);
    },
    [openBgColor]
  );

  const colorPicker = useCallback((color: string) => {
    setColor(color);
  }, []);

  const bgColorPicker = useCallback((color: string) => {
    setBgColor(color);
  }, []);

  return (
    <>
      <h1>태그 생성~~~~~~~~~~~~~~~~~</h1>
      <div>
        <input
          type='text'
          value={tagName}
          onChange={onChangeTagName}
          onKeyUp={onKeyUpTag}
          placeholder='태그 이름을 입력하세요'
        />

        <h1>태그 미리보기---</h1>
        <TagPreview color={color} bgColor={bgColor} width={tagWidth}>
          {tagName}
        </TagPreview>

        <strong onClick={toggleColorPicker}>태그 글자색</strong>
        {openColor && <SketchPicker color={color} onChange={(color) => colorPicker(color.hex)} />}
        <strong onClick={toggleBgColorPicker}>태그 배경색</strong>
        {openBgColor && <SketchPicker color={bgColor} onChange={(color) => bgColorPicker(color.hex)} />}

        <button type='button' onClick={generateTag}>
          태그 생성하기
        </button>
      </div>
    </>
  );
};

export default TagGenerator;

export const TagPreview = styled.div<TagPreviewProp>`
  width: ${(props) => props.width || '100px'};
  height: 14px;
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #e5e5e5;
  color: ${(props) => props.color || '#fff'};
  background-color: ${(props) => props.bgColor || '#78a8da'};
`;
