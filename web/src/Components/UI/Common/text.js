import { css } from 'styled-components';

export const textAlign = (defaultValue) => ({ textAlign = defaultValue }) => (textAlign && css`
  text-align: ${textAlign};
`);

export const fontSize = (defaultValue) => ({ fontSize = defaultValue }) => (fontSize && css`
  font-size: ${fontSize};
`);

export const color = (defaultValue) => ({ color = defaultValue }) => (color && css`
  color: ${color};
`);
