import styled from 'styled-components/native';
import { blackText } from '../../styles.global';

export const Container = styled.View`
  flex-direction: row;
  flex: 1;
  display: flex;
`;

export const ProfilImage = styled.Image`
  height: 140px;
  width: 140px;
  align-self: center;
  border-radius: 70px;
  border-style: solid;
  border-color: black;
  border-width: 5px;
`;

export const EditButton = styled.TouchableOpacity<{ isEditing: boolean }>`
  position: absolute;
  top: 20px;
  left: -70px;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${({ isEditing }): string => (isEditing ? 'red' : 'black')};
  padding: 10px;
`;

export const InputCardContainer = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 25px;
  padding: 5px;
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  background-color: ${(props): string => props.theme.mainBackgroundColor ?? 'black'};
`;

export const SmallTitleTextInput = styled.TextInput`

  font-size: ${(props): string => props.font ?? '30px'};
  font-weight: bold;
  font-family: 'Futura';
  color: ${(props): string => props.theme.mainTextColor ?? 'black'};
`;

SmallTitleTextInput.defaultProps = {
  theme: {
    mainTextColor: blackText,
  },
};

export const ChangeProfilPicture = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 100px;
  right: 120px;
  border-radius: 15px;
  background: lightgrey;
`;
