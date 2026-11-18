import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  align-self: center;
  background-color: ${(props): string => props.theme.mainBackgroundColor ?? 'black'};
`;

export const FullImage = styled.Image`
  width: 100px;
  height: 100px;
`;

export const TextContainer = styled.View`
  flex-direction: column;
  align-items: center; 
  color: ${(props) => props.theme.mainTextColor ?? 'black'};
`;

export const Wallet = styled.Text`
  font-family: 'Futura';
  font-weight: bold;
  font-size: 35px;
  color: ${(props):string => props.theme.mainTextColor ?? 'black'};
`;

export const WalletText = styled.Text`
  font-family: 'Open';
  font-weight: normal;
  font-size: 14px;
  color: ${(props):string => props.theme.mainTextColor ?? 'black'};
`;
