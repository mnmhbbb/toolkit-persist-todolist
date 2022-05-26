import styled from 'styled-components';
import { defaultBorderR, defaultMargin, flexCenter } from '../../styles/global';

export const NavStyle = styled.nav`
  border: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: space-around;
  ${defaultMargin};
  ${defaultBorderR};
`;

export const NavItem = styled.div<{ selected: boolean }>`
  width: 100%;
  transition: ${(props) => props.theme.transition.default};

  a {
    font-weight: ${(props) => (props.selected ? 900 : 400)};
    padding: 1rem;
    width: 100%;
    ${flexCenter};
    cursor: pointer;
    white-space: nowrap;
  }

  &:hover {
    opacity: 0.8;
    background-color: ${(props) => props.theme.colors.border} !important;
  }
`;
