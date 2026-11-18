import React from 'react';
import styled from 'styled-components';
import { fourthColor, mainColor } from "../../colors";

export interface ButtonProps {
  text: string,
  onClick?: any,
  lined?: boolean,
  type?: 'button' | 'submit' | 'reset';
}

const Button = ( { text, onClick, type = 'button', lined = false }: ButtonProps): JSX.Element => {
  return (
    <ButtonContainer type={type} lined={lined} onClick={onClick}>
      {text}
    </ButtonContainer>
  )
};

interface ButtonContainerProps {
  lined: boolean,
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  background: ${(props) => props.lined ? 'none' : mainColor};
  padding: 20px;
  color: ${fourthColor};
  border-radius: 30px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${mainColor};
  border-width: ${(props) => props.lined ? '2px' : '0px'};
  width: 230px;
  height: 50px;
  cursor: pointer;
  font-size: 14px;

  :focus {
    outline: none;
  }
`;

export default Button;
