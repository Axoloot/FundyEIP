import styled from 'styled-components/native';
import { StyledTextInput } from '../Search/styles';

export const TouchableContainer = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

export const BankLogo = styled.Image`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const BankName = styled.Text`
  text-align: center;
  flex: 1;
`;

export const SearchBank = styled(StyledTextInput)`
  margin-top: 15px;
`;
