import styled from 'styled-components/native';
import { NormalText, TitleText } from '../../styles.global';

export const TopContainer = styled.View`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const IconContainer = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.Image`
  margin-top: -450px;
`;

export const Lines = styled.ImageBackground`
  display: flex;
  flex-direction: column;
  width: 290px;
  height: 437px;
  margin-top: 20px;
  align-items: center;
`;

export const ActionButtons = styled.View`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-end;
  margin-left: 50px;
  justify-content: space-between;
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const TitleTextLeft = styled(TitleText)`
  text-align: left;
`;

export const NormalTextLeft = styled(NormalText)`
  text-align: left;
`;
