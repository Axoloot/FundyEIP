import styled from 'styled-components';

export const ArrowLeft = styled.div`
  position: absolute;
  margin-left: -600px;
`;

export const ArrowRight = styled.div`
  position: absolute;
  margin-right: -600px;
`;

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

@media (prefers-color-scheme: dark) {
  background: #b65f35;
  color: #dadada;
}
`;

export const Indexes = styled.div`
  display: flex;
  flex-direction: row;
  width: 140px;
  justify-content: space-between;
  margin-top: 100px;
`;

export const Index = styled.div`
  background: ${(props) => props.isActive ? '#A2BFF8' : '#E5ECF9'};
  border-radius: 4px;
  width: 40px;
  height: 5px;

`;

export const Lines = styled.img`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

export const Description = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-align: center;

  width: 400px;
  line-height: 2;
  margin-top: 30px;
`;

export const Title = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;

  text-align: center;

  width: 400px;
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
  width: 750px;
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
