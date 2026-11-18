import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text} !important;
    transition: background-color 0.4s ease-in, color 0.4s ease-in !important;
  }

  .hide-mobile {
    @media (max-width: 768px) {
      display: none !important;
    }
  }

  .hide-desktop {
    @media (min-width: 768px) {
      display: none !important;
    }
  }

  .text-align-mobile: {
    @media (max-width: 768px) {
      text-align: center !important;
    }
  }
  .full-width-mobile {
    @media (max-width: 768px) {
      width: 100% !important;
    }
  }
`;
export const lightTheme = {
  body: '#f1f1f1',
  text: '#121620'
};
export const darkTheme = {
  body: '#121620',
  text: '#f1f1f1'
};
