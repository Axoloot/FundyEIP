import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';

interface TabBarIconProps {
  name: string;
  size: number;
  color: string;
  focused: boolean;
}

const Circle = styled.View<{ color: string }>`
  padding: 5px;
  border-radius: 20px;
  border: 1px ${({ color }): string => color};
`;

const TabBarIcon = (props: TabBarIconProps): JSX.Element => {
  const {
    name, color, focused, size,
  } = props;

  if (focused) {
    return (
      <Circle color={color}>
        <AntDesign size={size} name={name} color={color} />
      </Circle>
    );
  }
  return <AntDesign size={size} name={name} color={color} />;
};

export default TabBarIcon;
