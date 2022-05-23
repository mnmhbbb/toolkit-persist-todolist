import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import { ThemeType } from './theme';

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  ${reset};

  *{
        box-sizing:border-box;
    }
  body {
    line-height: 1.5;
    letter-spacing: -1.14px;
  }

  input, button {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: .3rem;
    outline: none;
    padding: .5rem;
    transition: ${(props) => props.theme.transition.default};
    &:hover {
      opacity: 0.6;
    }
  }

  button {
    cursor: pointer;
  }

  button:active {
    border: 1px solid ${(props) => props.theme.colors.main};
  }

  input[type=checkbox] {
    -ms-transform: scale(1.5); /* IE */
    -moz-transform: scale(1.5); /* FF */
    -webkit-transform: scale(1.5); /* Safari and Chrome */
    -o-transform: scale(1.5); /* Opera */
    cursor: pointer;
    margin-top: .5rem
}

  input:focus {
    border: 1px solid${(props) => props.theme.colors.main};
  }

  ol, ul, li {
    list-style: none;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: #000;
  }

  strong,
  h1, h2, h3, h4, h5, h6 {
    font-weight: 900;
  }

  h1 {
    font-size: 2em;
  }
  
  h2 {
    font-size: 1.5rem;
  }


  label {
    font-weight: 500;
  }
  
  p {
    font-size: 1rem;
  }
`;

export default GlobalStyle;

export const defaultBorderR = css`
  border-radius: 0.3rem;
`;

export const defaultMargin = css`
  margin-bottom: 1rem;
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
