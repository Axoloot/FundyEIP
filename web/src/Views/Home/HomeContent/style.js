import styled from 'styled-components';

export const Title = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  width: fit-content;
  border-radius: 7px;
  font-family: 'Open Sans', sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    font-size: 35px;
  }
`;

export const SubTitle = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-size: 24px;
  width: 100%;
  text-align: center;
  border-radius: 7px;
  font-weight: normal;
  color: #3e3e3e;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 20px;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

export const ExplorationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
`;

export const LoadingText = styled.h2`
  text-align: center;
`;

export const RecommandationRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

export const CategorieRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

export const BackContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  margin-top: 10%;
  margin-left: 5%;
`;

export const StatCard = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #f3f2f2;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-left: 30px;
  @media (max-width: 768px) {
    margin-left: 0px !important;
    margin-top: 10px;
  }
`;

export const StatNumber = styled.p`
  font-size: 40px;
  font-weight: bold;
  font-family: Futura;
`;

export const StatTitle = styled.h4`
  font-size: 20px;
  font-weight: bold;
  font-family: Futura;
  text-align: center;
`;

export const TitleContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 30px;
  display: flex;
  font-size: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 20px !important;
    flex-direction: column;
  }
`

export const VidContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-right: 0px;
    margin-left: 0px;
  }
`;

export const SplitContainer = styled.div`
  width: 40%;
`;

export const SeparatorContainer = styled.div`
  margin-left: 7%;
  width: 93%;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
    margin-top: 0;
    width: 100%;
  }
`;

export const StatContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TextContainer = styled.div`
  margin-right: 7%;
  width: 93%;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


export const LeftTitle = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  width: fit-content;
  border-radius: 7px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  text-align: start;
  justify-content: flex-start;
  align-content: flex-start;

  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }
`;

export const RightTitle = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  width: fit-content;
  border-radius: 7px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  text-align: end;
  justify-content: flex-end;
  align-content: flex-end;

  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }
`;

export const PartContainer = styled.div`
  padding: 5%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const LeftDescription = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-size: 20px;
  width: fit-content;
  border-radius: 7px;
  font-weight: normal;
  text-align: start;
  justify-content: flex-start;
  align-content: flex-start;

  @media (max-width: 1024px) {
    width: 100%;
    text-align: justify;
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

export const RightDescription = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-size: 20px;
  width: fit-content;
  border-radius: 7px;
  font-weight: normal;
  text-align: end;
  justify-content: flex-end;
  align-content: flex-end;

  @media (max-width: 1024px) {
    width: 100%;
    margin-bottom: 20px;
    text-align: justify;
    margin-top: 20px;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 5%;
  margin-left: 5%;
`;
