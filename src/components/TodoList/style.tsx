import styled from 'styled-components';
import { defaultBorderR, defaultMargin } from '../../styles/global';

export const TodoListStyle = styled.div``;

export const ItemStyle = styled.div<{ completed: boolean }>`
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  ${defaultBorderR};
  ${defaultMargin};

  background-color: ${(props) => (props.completed ? props.theme.colors.bgColor : '#fff')};
  opacity: ${(props) => (props.completed ? 0.5 : 1)};

  .group {
    display: flex;
    gap: 1rem;
  }

  .group__right {
    width: 100%;
  }

  .titleAndDeadline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem; //
    span {
      font-size: ${(props) => props.theme.fontSize.title};
    }
  }

  .desc {
    white-space: pre-line;
  }

  .createdAndModifiedAt {
    display: flex;
    gap: 0.3rem;
    color: ${(props) => props.theme.colors.gray};
    font-size: ${(props) => props.theme.fontSize.sub};
    margin: 0.3rem 0;
  }

  ul {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

interface TagStyleProp {
  color: string;
  bgColor: string;
}

export const TagStyle = styled.li<TagStyleProp>`
  width: auto;
  height: 2rem;
  text-align: center;
  padding: 0.3rem 0.8rem;
  color: ${(props) => props.color || '#fff'};
  background-color: ${(props) => props.bgColor || '#78a8da'};
  ${defaultBorderR};
  cursor: pointer;
`;

export const ItemButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
  button {
    padding: 0.5rem 1rem;
  }
`;
