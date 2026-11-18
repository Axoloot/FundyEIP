import styled from 'styled-components';

export const ProjectInfos = styled.div`
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

export const ButtonContainer = styled.div`
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

export const GoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
`;

export const Goal = styled.p`
  font-size: 16px;
  font-family: Futura;
  font-weight: normal;
`;

export const CreatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
`;

export const CreatorAvatar = styled.img`
  width: 50px;
  border-radius: 50%;
`;

export const CreatorName = styled.p`
  font-size: 16px;
  font-family: Futura;
  font-weight: 300;
  padding-top: 10px;
  padding-left: 10px;
`;
