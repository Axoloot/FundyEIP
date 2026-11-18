import styled from 'styled-components';

export const Header = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  padding: 0 5%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  justify-items: space-betweeen;
  z-index: 10;
  img {
    max-height: 40px;
  }

  button {
    height: 40px;
  }

  background: rgba( 255, 255, 255, 0.6 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 15px );
  -webkit-backdrop-filter: blur( 15px );
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

export const ProfilCard = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 4%;
  margin-right: 5%;
  border-radius: 16px;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 350px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 15px );
  -webkit-backdrop-filter: blur( 15px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

export const ProfilCardTitle = styled.div`
  width: 100%;
  height: 100%;
  background: none;
  font-family: Futura;
  font-size: 16px;
  border: none;
  cursor: pointer;
  color: #000000;
  text-decoration: none;
  margin-top: 10px !important;
  &:hover {
    text-decoration: underline;
  }
`;

export const Avatar = styled.button`
  // border-radius: 24px;
  // border-color: black;
  // border-width: 1px;
  display: flex;
  margin-left: auto;
  // width: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  margin-right: 0;
  padding-right: 0;
  background-color: transparent;
  // background: rgba( 255, 255, 255, 0.6 );
  // box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  // backdrop-filter: blur( 15px );
  // -webkit-backdrop-filter: blur( 15px );
  // border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

export const AvatarBubble = styled.div`
  background-color: #F6CE61;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Futura;
  text-align: center;
  width: 40px;
  height: 40px;
`;

export const Tab =  styled.div`
  background: none;
  margin-right: 14px;
  padding: 5px 10px 5px 10px;
  /*padding-left: 10px;
  padding-right: 10px;*/
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  font-family: Futura;
  font-size: 18px;
  /*text-decoration: ${(props) => props.isActive ? 'underline' : 'none'};*/

  /*
    &:hover {
    background: rgba( 255, 255, 255, 0.6 );
    box-shadow: 0 2px 10px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    cursor: pointer;
  }
   */
`;

export const TabText = styled.p`
  font-family: Futura;
  font-size: 22px;
  color: black;
  text-decoration: ${(props) => props.isActive ? 'underline' : 'none'};
`;

export const ProfilText = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 0px;
  color: #000000;
`;

export const FullScreenModal = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  align-self: center;
  justify-self: center;
`;
