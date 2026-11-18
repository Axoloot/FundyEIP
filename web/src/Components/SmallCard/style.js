import styled from 'styled-components';

export const Title = styled.p`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
  color: #000000;
`;

export const Author = styled.p`
  font-style: italic;
  font-weight: normal;
  font-size: 10px;
  color: #000000;
`;

export const Desc = styled.p`
  font-style: normal;
  font-weight: normal;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  font-size: 10px;
  text-align: justify;
  margin-top: 5px;
  max-height: 100px;
  color: #000000;

`;

export const PercentageNb = styled.p`
  width: 90%;
  text-align: right;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  margin-top: 5px;
  color: #7CD6B7;
`;

export const PercentageBar = styled.div`
  width: 90%;
  height: 7px;
  background: #D3F4E9;
  border-radius: 4px;
  margin-top: 10px;

  div {
    width: ${(props) => props.percent};
    height: 7px;
    border-radius: 4px;
    background: #7CD6B7;
  }
`;

export const ImageHeader = styled.div`
  width: 100%;
  height: 100px;
  background: ${(props) => props.bg} center;
  background-size: cover;
  border-radius: 20px 20px 0px 0px;
`;

export const Container = styled.div`
  width: 100%;
  height: 350px;
  background-color: white;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
