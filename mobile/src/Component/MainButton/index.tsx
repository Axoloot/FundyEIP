import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ButtonContainer, ButtonText } from './styles';

export interface ButtonProps {
  width?: string,
  type?: 'primary' | 'secondary' | 'delete';
  bordered?: boolean,
  text?: string,
  onPress?: () => void,
}

const MainButton = ({
  width = '160px',
  type = 'primary',
  bordered = true,
  text = '',
  onPress,
}: ButtonProps): JSX.Element => (
  <TouchableOpacity onPress={onPress}>
    <ButtonContainer width={width} type={type} bordered={bordered}>
      <ButtonText type={type}>{text}</ButtonText>
    </ButtonContainer>
  </TouchableOpacity>
);

export default MainButton;
