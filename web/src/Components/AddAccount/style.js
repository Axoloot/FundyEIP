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

export const Title = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
`;

export const BankListContainer = styled.div`
  width: 100%;
  height: 35vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const SearchInput = styled.input`
  font-family: 'Open Sans';
  padding: 5px 10px;
  border-radius: 22px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 12px;
  width: 90%;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 20px;
`;
