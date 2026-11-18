import styled from 'styled-components/native';

export const TagButtonContainer = styled.TouchableOpacity`
margin: 10px;
height: 30px;
min-width: 100px;
border-radius: 40px
background: ${(props): string => props.bgcolor};
`;

export const TagName = styled.Text`
margin-top: 5px;
font-weight: bold;
text-align: center;
`;
