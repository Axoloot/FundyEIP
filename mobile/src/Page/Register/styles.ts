import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
  background-color: white;
`;

export const ErrorText = styled.Text`
  text-align: center;
  font-family: Open;
  color: #FF0000;
`;

export const InputText = styled.Text`
  font-weight: bold;
  font-family: Futura;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ActionText = styled.Text`
  font-family: Open;
  color: #EB8682;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Already = styled.View`
  flex-direction: row;
  justify-content: center;
  align-content: center;
`;

export const BottomActions = styled.View`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LangContainer = styled.View`
  display: flex;
  marginTop: 10px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
