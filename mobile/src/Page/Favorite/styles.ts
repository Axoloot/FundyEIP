import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-content: center;
  margin-top: 50px;
  background-color: ${(props): string => props.theme.mainBackgroundColor ?? 'black'};
  `;

export const StyledTextInput = styled.TextInput`
  width: 90%;
  height: 40px;
  border-color: grey;
  border-width: 2px;
  border-radius: 20px;
  align-self: center;
  text-align: center;
  margin-top: 20px;
  background-color: white;
`;

export const SearchText = styled.Text`
  font-family: Futura;
  font-weight: bold;
  font-size: 30px;
  margin-left: 50px;
  margin-top: 20px;
  color: ${(props) : string => props.theme.mainTextColor ?? 'black'};
`;
