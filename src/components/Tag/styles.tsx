import styled from 'styled-components';
import { TagStyle } from '../TodoList/style';

export const CurrentTagUl = styled.ul`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;
    cursor: default;
  }
  button {
    padding: 0.2rem 0.4rem;
    border: none;
    background-color: ${(props) => props.theme.colors.border};
  }
`;

export const TagAllUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const AllTagList = styled(TagStyle)`
  height: 2.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    background-color: ${(props) => props.theme.colors.border};
    padding: 0.3rem;
  }
`;

export const ExplainStyle = styled.p`
  color: ${(props) => props.theme.colors.gray};
  font-size: ${(props) => props.theme.fontSize.sub};
  margin-bottom: 0.5rem;
`;
