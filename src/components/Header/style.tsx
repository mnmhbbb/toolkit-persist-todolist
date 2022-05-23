import styled from 'styled-components';
import { defaultMargin } from '../../styles/global';

export const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  ${defaultMargin}

  > h1 {
    font-size: 2rem;
    letter-spacing: -3px;
  }

  > button {
    padding: 0.3rem 1rem;
    font-size: 1rem;
  }
`;
