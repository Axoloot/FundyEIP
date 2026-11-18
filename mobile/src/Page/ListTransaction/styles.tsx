import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: white;
  height: 100%;
  width: 100%;
`;

export const CategoryTitle = styled.View`
  margin-top: 50px;
  width: 100%;
  height: 100%;
  background-color: ${(props): string => props.theme.mainBackgroundColor ?? 'white'};
`;

export const Icon = styled(AntDesign)`
  position: absolute;
  /* left: 20px; */
  /* top: 20px; */
`;

export const Title = styled.Text`
  font-family: 'Futura';
  font-weight: bold;
  font-size: 25px;
  margin-left: 15%;
  color: ${(props): string => props.theme.mainTextColor ?? 'black'};
`;

export const TransactionsContainer = styled.View`
  width: 90%;
  height: 80%;
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  background-color: ${(props): string => props.theme.mainBackgroundColor ?? 'white'};
  
`;
