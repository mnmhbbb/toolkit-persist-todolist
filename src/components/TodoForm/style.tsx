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
  border: 1px solid ${(props) => props.theme.colors.border};
  width: 400px;
  height: 100%;
  overflow-y: scroll;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.3rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    button {
      padding: 0.3rem 1rem;
    }
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-bottom: 1rem;
  }

  button[type='submit'] {
    width: 100%;
    padding: 1rem;
    color: #fff;
    background-color: ${(props) => props.theme.colors.main};
    font-size: ${(props) => props.theme.fontSize.title};
  }
`;
