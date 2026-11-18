import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const StyledAnt = styled(AntDesign)`
  margin-left: 15px;
  margin-top: 10px
  margin-bottom: 15px;
`;

export const EmptyContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackgroundTitle = styled.View`
  background-color: ${(props) : string => props.theme.mainBackgroundColor ?? 'black'};
`;

export const EmptyText = styled.Text`
  font-family: 'Open';
  margin-top: 20px;
`;

export const EmptyImage = styled.Image`
  width: 200px;
  height: 141px;
`;

export const ScrollContainer = styled.ScrollView`
  height: 75%;
  width: 100%;
`;

export const HorizontalScroll = styled.ScrollView`
  width: 100%;
  height: 20%;
  color: ${(props) : string => props.theme.mainTextColor ?? 'black'};
  background-color: ${(props) : string => props.theme.mainBackgroundColor ?? 'black'};
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  font-family: 'Futura';
  margin-top: 20px;
  color: ${(props) : string => props.theme.mainTextColor ?? 'black'};
  background-color: ${(props) : string => props.theme.mainBackgroundColor ?? 'black'};
  padding-top: 20px;
  margin-bottom: 10px;
  margin-left: 50px;
  align-self: flex-start;
`;

export const HomeContainer = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) : string => props.theme.mainBackgroundColor ?? 'black'};
`;

export const SuggestionTitleImage = styled.Text`
text-align: center;
margin-top: 10%;
font-size: 30px;
font-weight: bold;
font-family: 'Futura';
color: white;
text-shadow: 0px 0px black;
text-shadow-radius: 10px;
`;

export const SuggestionDescriptionImage = styled.Text`
  text-align: center;
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
  font-family: 'Futura';
  color: white;
  text-shadow: 0px 0px black;
  text-shadow-radius: 10px;
`;

export const SuggestionBigPicture = styled.Image`
  width: 100%;
  height: 100%;
  backgroundColor: white;
`;
export const BackgroundImg = styled.Image`
  width: 100%;
  height: 100%;
  background-color: white;
`;
