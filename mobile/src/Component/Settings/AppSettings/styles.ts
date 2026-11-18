import styled from 'styled-components/native';
import { blackText } from '../../../styles.global';

export const SettingsTitle = styled.Text`
  font-family: 'Futura';
  font-weight: bold;
  font-size: 25px;
  margin-left: 25px;
  margin-top: 15px;
  color: ${(props) : string => props.theme.mainTextColor ?? 'black'};
`;

SettingsTitle.defaultProps = {
  theme: {
    mainTextColor: blackText,
  },
};

export const SettingsContainer = styled.View`
  flex-direction: row;
  margin-top: 15px;
  margin-left: 15px;
`;

export const SettingsBorderContainer = styled.View`
  margin: 10px 15px;
  padding-bottom: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  width: 90%;
  background-color: ${(props) : string => props.theme.mainBackgroundColor ?? 'black'};
`;

export const RoundingTitle = styled.Text`
  font-family: 'Futura';
  font-weight: bold;
  font-size: 20px;
  margin-left: 25px;
  margin-top: 15px;
`;

export const MaxRoundingText = styled.Text`
  font-family: 'Open';
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
`;

export const SubCategory = styled.View`
  flex-direction: column;
  width: 300px;
  margin-left: 15px;
  flex: 1;
`;

export const SubTitle = styled(SubCategory)`
  justify-content: flex-end;
  margin-bottom: 5px;
`;

export const EmailButton = styled.View`
  margin-top: 10px;
  padding: 10px;
  margin-left: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  background-color: ${(props) : string => props.theme.mainBackgroundColor ?? 'black'};
  align-self: center;
`;
