import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const SmallCardContainer = styled.View`

`;

export const Icon = styled(AntDesign)`
  position: absolute;
`;

export const CardContainerFav = styled.View`
display: flex;
align-self: center;
background: white;
height: 150px;
width: 150px;
margin: 10px;
border-radius: 25px;
box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
`;

export const ImageContainerFav = styled.Image`
  border-radius: 25px;
  height: 100%;
  width: 100%;
`;

export const DescriptionContainerFav = styled.View`
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  text-align: justify;
  display: flex;
`;

export const DescriptionTitleFav = styled.Text`
  font-family: 'Futura';
  font-weight: bold;
  font-size: 15px;
`;

export const AssocationNameFav = styled.Text`
  font-family: 'Open';
  font-weight: bold;
  margin-top: 4px;
  font-size: 12px;
`;
