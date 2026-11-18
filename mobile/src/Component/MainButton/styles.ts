/* eslint-disable no-nested-ternary */
import styled from 'styled-components/native';

interface ButtonTextProps {
  type: 'primary' | 'secondary' | 'delete';
}

interface ButtonContainerProps {
  width: string;
  type: 'primary' | 'secondary' | 'delete';
  bordered: boolean;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${(props): string => (props.type === 'secondary' ? '#000' : '#fff')};
  font-family: 'Futura';
  font-size: 14px;
  text-align: center;
  font-weight: bold;
`;

export const ButtonContainer = styled.View<ButtonContainerProps>`
  width: ${({ width }): string => width};
  height: 40px;
  background: ${({ type }): string => (type === 'primary' ? '#F1CF73' : (type === 'secondary' ? 'white' : '#EB8682'))};
  ${({ bordered, type }): string => (bordered
    ? `border-radius: 20px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      box-shadow: ${(type === 'secondary' ? '0 0 4px rgba(0, 0, 0, 0.2)' : '0px 0px 0px rgba(0, 0, 0, 0)')};
  `
    : '')};
  display: flex;
  justify-content: center;
  align-items: center;
`;
