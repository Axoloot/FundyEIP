import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  /*max-width: 20vw;*/
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  border-radius: 7px;
  border: 1px solid transparent;

  &:hover {
    background: rgba( 255, 255, 255, 0.6 );
    box-shadow: 0 4px 16px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 12px );
    -webkit-backdrop-filter: blur( 12px );
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    cursor: pointer;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const BlackFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  border-radius: 12px;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const ProjectTitle = styled.p`
  font-family: Futura;
  font-weight: bold;
  font-size: 20px;
  color: white;
`;
