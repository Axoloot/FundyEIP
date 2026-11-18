import styled from 'styled-components/native';
import { Input } from '../../styles.global';

export const DonationText = styled.Text`
  margin-left: 15px;
  font-family: 'Futura';
  font-weight: bold;
  font-size: 16px;
`;

export const CloseContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const DonationContainer = styled.View`
  width: 80%;
  padding: 20px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DonationBG = styled.View`
  width: 100%;
  height: 120%;
  background: rgba(0, 0 ,0, 0.2);
  border-radius: 20px;
  position: absolute;
  left: 0;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DonateInput = styled(Input)`
  width: 50%;
`;
