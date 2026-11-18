import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';


export const BackgroundView = styled.View`  
  background-color: ${(props): string => props.theme.mainBackgroundColor ?? 'black'};
`;


export const CardContainer = styled.View`
  align-self: center;
  width: 320px;
  border-radius: 25px;
  margin: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  background-color: ${(props): string => props.theme.mainBackgroundColor ?? 'black'};
  `;

export const StyledAnt = styled(AntDesign)`
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

export const MapContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;


export const ActionContainer = styled.View`
  align-self: center;
  border-radius: 25px;
  margin: 20px;
  padding: 10px;
  width: 80%;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  background-color: ${(props): string => props.theme.mainBackgroundColor ?? 'black'};
`;

export const ActionText = styled.Text`
  font-family: 'Futura';
  font-size: 17px;
  color: black;
`;