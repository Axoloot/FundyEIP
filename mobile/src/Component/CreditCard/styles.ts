import styled from 'styled-components/native';
import { TextOpen } from '../../styles.global';

export const Container = styled.View`
  padding: 10px;
`;

export const CardContainer = styled.View`
  width: 250px;
  height: 150px;
  margin-left: 15px;
  padding: 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  background-color: ${(props): string => props.theme.mainBackgroundColor ?? 'black'};
`;

export const RoundingText = styled.Text`
  margin-left: 15px;
  font-family: 'Futura';
  font-weight: bold;
  color: ${(props): string => props.theme.mainTextColor ?? 'black'};
`;

export const RoundingInfos = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;

export const DeleteAccount = styled.TouchableOpacity`
  margin-top: 5px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const DeleteText = styled(TextOpen)`
  color: red;
`;
