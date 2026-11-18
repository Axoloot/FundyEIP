import styled from 'styled-components';

export const InputTitle = styled.div`

  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;

  color: #000000;
  margin-top: 20px;
  text-transform: uppercase;
  margin-left: 20px;
  margin-bottom: 10px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -30px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Subtext = styled.div`
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  color: #000000;
  a {
    color: #EB8682;
    font-weight: bold;
  }
  margin-top: 20px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormInput = styled.input`
  text-align: center;
  padding: 5px 10px;
  border-radius: 22px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 14px;
  width: 300px;
  height: 40px;

`;

export const Lines = styled.img`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

export const Description = styled.p`
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  text-align: center;

  color: #000000;
  margin-top: 10px;

@media (prefers-color-scheme: dark) {
  color: #8a8a8a;
}
`;

export const Title = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;

  text-align: center;

  color: #000000;

@media (prefers-color-scheme: dark) {
  color: #8a8a8a;
}
`;

export const Header = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  z-index: 3;

  img {
    max-height: 40px;
    margin-left: 40px;
  }

@media (prefers-color-scheme: dark) {
  background: #434343;
  color: #8a8a8a;
}
`;

export const MainContainer = styled.div`
  width: 750px;
  height: 75%;
  border-radius: 50px;
  z-index: 3;
  border-color: black;
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
  background-color: white;
`;
