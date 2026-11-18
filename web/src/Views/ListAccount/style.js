import styled from 'styled-components';

export const Button = styled.button`
  background: #F1CF73;
  width: 160px;
  height: 45px;

  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;

  text-align: center;

  color: #FFFFFF;
  border-radius: 22px;
  outline: none;
  border: none;
`;

export const Text = styled.div`
  font-family: Futura;
  font-style: normal;
  font-size: 16px;
  text-align: center;
  padding-top: 10px;
`;

export const RedButton = styled.button`
  background: #EB8986;
  width: 160px;
  height: 45px;

  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;

  text-align: center;

  color: #FFFFFF;
  border-radius: 22px;
  outline: none;
  border: none;
`;

export const Lines = styled.img`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

export const Title = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;

  text-align: center;
`;

export const MainContainer = styled.div`
  width: 80%;
  height: 75%;
  border-radius: 50px;
  z-index: 2;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba( 255, 255, 255, 0.6 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 15px );
  -webkit-backdrop-filter: blur( 15px );
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

export const BodyContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const RecommandationText = styled.p`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  margin-top: 40px;
  margin-left: 15px;
  background-color: #9CBFFD;
  width: fit-content;
  border-radius: 12px;
  padding: 10px;
  text-align: center;
`;
