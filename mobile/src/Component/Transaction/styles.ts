import styled from 'styled-components/native';

export const RoundedText = styled.Text`
  font-family: 'OpenBold';
  color: white;
  font-size: 16px;
  text-transform: uppercase;
`;

export const ContainerText = styled.Text`
  font-family: 'Futura';
  font-weight: bold;
  font-size: 17px;
  color: white;
  margin-left: 15px;
`;

export const PaymentContainer = styled.View`
  background: #F1CF73;
  width: 35%;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const DonationContainer = styled.View<{ idx: number }>`
  background: ${({ idx }): string => idx % 2 ? '#F1CF73' : '#f4d88b'};
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%
  justify-content: space-around;
`;


/* border: 1px solid rgba.0, 0, 0, 0.2); */
export const RoundingContainer = styled.View`
  background: #A2BFF8;
  border-radius: 10px;
  width: 60%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TransactionContainer = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
  // /* border: 1px solid rgba.0, 0, 0, 0.2); /
