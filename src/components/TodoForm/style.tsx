import styled from 'styled-components';

export const FormBackground = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  position: fixed;
  z-index: 2;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.3rem;
  left: 50%;
  transform: translate(-50%, 50%);

  .header {
    display: flex;
    justify-content: space-between;
  }
`;
