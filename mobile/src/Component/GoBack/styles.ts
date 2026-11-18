import styled from 'styled-components/native';

export const Title = styled.Text`
  font-weight: bold;
  font-family: 'Futura';
  color: black;
  align-self: center;
  color: ${(props): string => props.theme.mainTextColor ?? 'black'};
`;

export const toremove = '';
