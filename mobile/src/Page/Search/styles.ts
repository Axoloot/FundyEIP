/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-parens */
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-content: center;
  margin-top: 50px;
  background-color: ${props => props.theme.mainBackgroundColor ?? 'black'};
  `;


export const StyledTextInput = styled.TextInput`
  width: 90%;
  height: 40px;
  border-width: 2px;
  border-radius: 20px;
  align-self: center;
  text-align: center;
  background-color: white;
`;

export const SearchText = styled.Text`
  font-family: Futura;
  font-weight: bold;
  font-size: 30px;
  margin-left: 50px;
  margin-top: 20px;
  color: ${props => props.theme.mainTextColor ?? 'black'};
`;
export const CategorieImageContainer = styled.ImageBackground`
  
  border-radius: 25px;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const CategorieCardContainer = styled.View`
  align-self: center; 
  border-radius: 25px;
  background-color: white;
  height: 100%;
  width: 200px;
  margin-left: 20px;
  margin-right: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
`;

export const CategorieHorizontalScroll = styled.ScrollView`
  margin-top: 20px;
  width: 100%;
  height: 20%;
  background: ${props => props.theme.mainBackgroundColor ?? 'black'};
`;

export const CategorieTitle = styled.Text`
  font-size: 30px;
  font-family: 'Futura';
  color: white;
  font-weight: bold;
  margin-top: 120px;
  text-align: center;
  justify-content: center;
  
`;

export const SearchButtonContainer = styled.View`    
justify-content: center;
  align-items: center;
  top: 300;
  margin-top: 10px;
`;

export const SearchButton = styled.TouchableOpacity`

height: 70px;
width: 350px;
border-radius: 50px
border-width: 2px;
background-color: white;
border-color: black;
`;

export const SearchButtonText = styled.Text`
    margin-top: 15px;
  font-weight: bold;
  text-align: center;
  color: black;
    font-size: 30px;
`;
