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
  margin-top: 40px;
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
  margin-top: 40px;
`;

export const FormInput = styled.input`=
  text-align: center;
  padding: 5px 10px;
  border-radius: 22px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 12px;
  width: 300px;
  height: 40px;
  margin-top: 30px;
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

export const Header = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 60px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  z-index: 3;

  img {
    max-height: 40px;
    margin-left: 40px;
  }
`;

export const MainContainer = styled.div`
  overflow: hidden;
  width: 750px;
  margin-top: 5%;
  height: 85%;
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
