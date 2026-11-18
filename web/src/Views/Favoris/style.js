import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 60px;
  }

  padding: 0px 30px;
`;

export const NoContent = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  margin-top: 40px;
`;

export const Button = styled.button`
  background: ${(props) => props.isActive ? '#F1CF73' : '#ccc'};
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
  cursor: pointer;
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

export const LoadingText = styled.div`
  height: 100%;
  width: 100%;
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

export const SearchBar = styled.input`
  font-family: 'Futura';
  padding: 10px;
  border-radius: 22px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 12px;
  width: 90%;
  height: 40px;
  position: fixed;
  top: 7%;
  left: 5%;
  text-align: center;
`;

export const BackContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  margin-top: 10%;
  margin-left: 5%;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 7px;

  &:hover {
    background-color: #F6CE61;
    border-radius: 12px;
  }
`;

export const BackText = styled.p`
  font-size: 24px;
  font-family: Futura;
  font-weight: normal;
`;
