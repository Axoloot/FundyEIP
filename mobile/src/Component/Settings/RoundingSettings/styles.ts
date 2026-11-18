import styled from 'styled-components/native';

export const SettingsTitle = styled.Text`
  font-family: 'Futura';
  font-weight: bold;
  font-size: 25px;
  margin-left: 25px;
  margin-top: 15px;
  color: ${(props) : string => props.theme.mainTextColor ?? 'black'};
`;

export const SettingsContainer = styled.View`
  flex-direction: row;
  margin-top: 15px;
  margin-left: 15px;
  background-color: ${(props) : string => props.theme.mainBackgroundColor ?? 'black'};
`;

export const SettingsBorderContainer = styled.View`
  margin: 10px 15px;
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  width: 90%;
  background-color: ${(props) : string => props.theme.mainBackgroundColor ?? 'black'};
`;

export const RoundingTitle = styled.Text`
  font-family: 'Futura';
  font-weight: bold;
  font-size: 20px;
  margin-left: 25px;
  margin-top: 15px;
  color: ${(props) : string => props.theme.mainTextColor ?? 'black'};
`;

export const MaxRoundingText = styled.Text`
  font-family: 'Open';
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
  color: ${(props) : string => props.theme.mainTextColor ?? 'black'};
`;

export const SubCategory = styled.View`
  flex-direction: column;
  width: 300px;
  margin-left: 15px;
  flex: 1;
  color: ${(props) : string => props.theme.mainTextColor ?? 'black'};
`;
