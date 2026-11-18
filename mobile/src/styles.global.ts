/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';

export const whiteBackground = '#ffffff';
export const darkBackground = '#505b6b';
export const whiteText = '#ffffff';
export const blackText = '#000000';

export const FullWidthView = styled.View`width: 100%;`;

export const FullView = styled.View`
  width: 100%;
  height: 100%;
`;

export const FullWebView = styled(WebView)`
  width: 100%;
  height: 100%;
`;

export const FundyText = styled.Text`
  font-family: OpenBold;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const TitleText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
  font-family: Futura;
`;

export const NormalText = styled.Text`
  text-align: center;
  font-family: Open;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  marginLeft: 2px;
  marginRight: 2px;
  height: 40px;
  border-color: grey;
  border-width: 1px;
  border-radius: 30px;
  text-align: center;
  font-family: Open;
  background-color: white;
`;

export const SuggestionImageContainer = styled.Image`
  border-radius: 25px;
  height: 100%;
  width: 100%;
`;

export const ImageContainer = styled.Image`
  border-radius: 25px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  height: 250px;
  width: 100%;
`;

export const RaisedPercentText = styled.Text`
  align-self: flex-end;
  padding-top: 10px;
  padding-right: 20px;
  color: #7CD6B7;
  font-family: 'OpenBold';
  font-weight: bold;
  font-size: 11px;
`;

export const DescriptionContainerText = styled.Text`
  justify-content: center;
  align-content: flex-start;
  padding-left: 20px;
  text-align: justify;
  display: flex;
`;

export const DescriptionContainer = styled.View`
  display: flex;
  width: 150px;
  padding: 10px;
  align-items: center;
`;

export const CardContainer = styled.View`
  align-self: center;
  background-color: white;
  height: 100%;
  width: 350px;
  border-radius: 25px;
  margin-left: 20px;
  margin-right: 10px;
`;

export const SmallCardContainer = styled.View`
  display: flex;
  flex: 1;
  align-self: center;
  background-color: white;
  height: 500px;
  width: 350px;
  border-radius: 25px;
  border-width: 1px;
  border-color: grey;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const SmallTitleText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin-top: 15px;
  font-family: 'Futura';
  margin-top: 25px;
  color: ${(props) => props.theme.mainTextColor ?? 'black'};
`;

SmallTitleText.defaultProps = {
  theme: {
    mainTextColor: blackText,
  },
};

export const SmallTitleTextInput = styled.TextInput`
  font-size: 30px;
  font-weight: bold;
  margin-top: 15px;
  font-family: 'Futura';
  margin-top: 25px;
  color: ${(props) => props.theme.mainTextColor ?? 'black'};
`;

SmallTitleTextInput.defaultProps = {
  theme: {
    mainTextColor: blackText,
  },
};
export const SmallImageContainer = styled.Image`
  border-radius: 25px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  height: 200px;
  width: 100%;
`;

export const DescriptionTitle = styled.Text`
  flex: 1;
  flex-wrap: wrap;
  font-family: 'Futura';
  font-weight: bold;
  font-size: 15px;
  padding-left: 10px;
  color: ${(props) => props.theme.mainTextColor ?? 'black'};
`;

DescriptionTitle.defaultProps = {
  theme: {
    mainTextColor: blackText,
  },
};

export const AssocationName = styled.Text`
  font-family: 'Open';
  font-weight: bold;
  margin-top: 4px;
  font-size: 12px;
  padding-left: 10px;
  color: ${(props) => props.theme.mainTextColor ?? 'black'};
`;

AssocationName.defaultProps = {
  theme: {
    mainTextColor: blackText,
  },
};

export const FundRaised = styled.Text`
  font-family: 'OpenBold';
  margin-top: 15px;
  font-size: 15px;
  color: ${(props) => props.theme.mainTextColor ?? 'black'};
`;

export const DescriptionText = styled.Text`
  margin: 20px;
  font-family: 'Open';
  text-align: justify;
  min-height: 150px;
  font-size: 12px;
  color: ${(props) => props.theme.mainTextColor ?? 'black'};
`;

DescriptionText.defaultProps = {
  theme: {
    mainTextColor: blackText,
  },
};

export const TextBoldWhite = styled.Text`
  font-weight: bold;
  color: white;
`;

export const TextFuturaBold = styled.Text`
  font-family: 'Futura';
  font-weight: bold;
  color: ${(props) => props.theme.mainTextColor ?? 'black'};
`;

TextFuturaBold.defaultProps = {
  theme: {
    mainTextColor: blackText,
  },
};

export const TextOpen = styled.Text`
  font-family: 'Open';
  color: ${(props) => props.theme.mainTextColor ?? 'black'};
`;

TextOpen.defaultProps = {
  theme: {
    mainTextColor: blackText,
  },
};

export const CenteredChild = styled.View`
  display: flex;
  align-items: center;
`;

export const CenteredRow = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const FavTextButton = styled.Button`
  color: palevioletred;
  font-size: 16px;
  margin: 10px;
  padding: 5px;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const TagColor = {
  SPORT: '#BF0603',
  ALCOOL: '#32a852',
  VIDEOGAME: '#A7CAB1',
  GAME: '#847996 ',
  CLOTHES: '#4287f5',
  PHONE: '#708D81',
};
