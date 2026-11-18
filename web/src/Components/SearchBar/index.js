import styled from 'styled-components';

export const Button = styled.button`
  background-color: #A3BFF7;
  width: 160px;
  height: 45px;

  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;

  text-align: center;

  color: #FFFFFF;
  border-radius: 22px;
  outline: none;
  border: none;
  margin-top: 40px;
  cursor: pointer;

  @media (prefers-color-scheme: dark) {
    background: #A3BFF7;
    color: #dadada;
  }
`;
