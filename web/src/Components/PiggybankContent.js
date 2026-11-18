import styled from 'styled-components';

const PiggybankContent = () => {
  return (
    <Container>
      <TransactionContainer><strong>+XX€</strong> -  Rounded on the XX/XX/XXXX</TransactionContainer>
      <TransactionContainer><strong>+XX€</strong> -  Rounded on the XX/XX/XXXX</TransactionContainer>
      <TransactionContainer><strong>+XX€</strong> -  Rounded on the XX/XX/XXXX</TransactionContainer>
      <TransactionContainer><strong>+XX€</strong> -  Rounded on the XX/XX/XXXX</TransactionContainer>
      <TransactionContainer><strong>+XX€</strong> -  Rounded on the XX/XX/XXXX</TransactionContainer>
      <TransactionContainer><strong>+XX€</strong> -  Rounded on the XX/XX/XXXX</TransactionContainer>
      <TransactionContainer><strong>+XX€</strong> -  Rounded on the XX/XX/XXXX</TransactionContainer>
    </Container>
  );
};

const TransactionContainer = styled.div`
  height: 50px;
  width: 100%;
  background: #D7EFCB;
  border-radius: 20px;
  color: #1E8C67;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 30px;
  position: absolute;
  display: flex;
  flex-direction: column;
`;

export default PiggybankContent;
