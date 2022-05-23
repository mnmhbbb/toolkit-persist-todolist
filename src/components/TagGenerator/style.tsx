import styled from 'styled-components';
import { defaultBorderR } from '../../styles/global';

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.bgColor};
  margin-top: 1rem;
  padding: 1rem;

  input {
    width: 100%;
    margin-bottom: 1rem;
  }

  .group {
    margin-bottom: 1rem;
  }

  .generateButton {
    display: flex;
    justify-content: center;
    button {
      font-size: ${(props) => props.theme.fontSize.title};
      padding: 1rem;
    }
  }
`;

export interface TagPreviewProps {
  color: string;
  bgColor: string;
}

export const TagPreview = styled.div<TagPreviewProps>`
  width: auto;
  height: 2.3rem;
  text-align: center;
  ${defaultBorderR};
  padding: 0.5rem;
  border: 1px solid #e5e5e5;
  color: ${(props) => props.color || '#fff'};
  background-color: ${(props) => props.bgColor || '#78a8da'};
  margin-bottom: 1rem;
`;
