import styled from 'styled-components';

export const AssociationInfos = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 8%;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const  ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: center;
`;

export const BackText = styled.p`
  font-size: 24px;
  font-family: Futura;
  font-weight: normal;
`;

export const RecommandationRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;
