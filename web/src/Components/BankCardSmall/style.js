import styled from 'styled-components';

export const Text = styled.text`
  font-family: Futura;
  font-style: normal;
  font-size: 12px;
`;

export const Container = styled.div`
  border-radius: 12px;
  width: 100%;
  display: flex;
  flex: 1;
`;

export const CardContainer = styled.div`
  width: 100%;
  height: 100px;
  background: rgba( 255, 255, 255, 0.6 );
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid rgba( 255, 255, 255, 0.6 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );

  &:hover {
    background: rgba( 255, 255, 255, 0.9 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 15px );
    -webkit-backdrop-filter: blur( 15px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
