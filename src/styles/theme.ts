const colors = {
  main: '#78a8da',
  tag: '#ffffff',
  tagBg: '#78a8da',
  border: '#e5e5e5',
  gray: '#979797',
  bgColor: '#f6f6f6',
};

const fontSize = {
  title: '1.2rem',
  sub: '.8rem',
};

const transition = {
  default: '.3s ease',
};

export const theme = {
  colors,
  transition,
  fontSize,
};

export type ThemeType = typeof theme;
