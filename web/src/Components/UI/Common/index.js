import { css } from 'styled-components';

export const content = (defaultValue) => ({ content = defaultValue }) => (content && css`
  justify-content: ${content};
`);

export const background = (defaultValue) => ({ bg = defaultValue }) => (bg && css`
  background: no-repeat center/cover ${bg};
`);

export const backgroundImage = (defaultValue) => ({ bgImage = defaultValue }) => (bgImage && css`
  background-image: url(${bgImage});
`);

export const width = (defaultValue) => ({ width = defaultValue }) => (width && css`
  width: ${width};
`);

export const minWidth = (defaultValue) => ({ minWidth = defaultValue }) => (minWidth && css`
  min-width: ${minWidth};
`);

export const maxWidth = (defaultValue) => ({ maxWidth = defaultValue }) => (maxWidth && css`
  max-width: ${maxWidth};
`);

export const height = (defaultValue) => ({ height = defaultValue }) => (height && css`
  height: ${height};
`);

export const minHeight = (defaultValue) => ({ minHeight = defaultValue }) => (minHeight && css`
  min-height: ${minHeight};
`);

export const maxHeight = (defaultValue) => ({ maxHeight = defaultValue }) => (maxHeight && css`
  max-height: ${maxHeight};
`);

export const margin = (defaultValue) => ({ margin = defaultValue }) => (margin && css`
  margin: ${margin};
`);

export const padding = (defaultValue) => ({ padding = defaultValue }) => (padding && css`
  padding: ${padding};
`);
