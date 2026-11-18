import styled from 'styled-components/native';

export const CardTitle = styled.Text`
  font-family: 'Futura';
  font-weight: bold;
  font-size: 25px;
  margin-left: 25px;
  margin-top: 20px;
  color: ${(props): string => props.theme.mainTextColor ?? 'black'};
`;

export const toremove = '';
