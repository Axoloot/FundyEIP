import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 20vw;
  height: 125px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  &:hover {
    background: rgba( 255, 255, 255, 0.6 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 15px );
    -webkit-backdrop-filter: blur( 15px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
`;

export const InformationContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: start;
  padding-left: 10px;
`;

export const ImageContainer = styled.div`
  margin-left: 5%;
  width: 30%;
  height: 70%;
  background-position: center;
  background-size: cover;
  border-radius: 12px;
`;

export const ProjectTitle = styled.p`
  font-family: Futura;
  font-weight: bold;
  font-size: 14px;
`;

export const AssociationName = styled.p`
  font-family: Futura;
  font-size: 12px;
`;
