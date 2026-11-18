import styled from 'styled-components';
import Tag from './Tag';

import { useTranslation } from 'react-i18next';

const BigCard = (props) => {
  const imageUrl = `url('${props.data.image}')`;
  const percentage = `${props.data.raisedPercentage}%`;

  const { t } = useTranslation();

  return (
    <Container onClick={props.onClick}>
      <ImageHeader bg={imageUrl} />
      <PercentageBar percent={percentage}><div></div></PercentageBar>
      <PercentageNb>{props.data.raisedPercentage}% {t('raised')}</PercentageNb>
      <Title>{props.data.title}</Title>
      <Author>{props.data.email}</Author>
      <Row>
        {props.data.tags.map((tag) => {
          return(
            <Tag name={tag} key={tag}/>
          );
        })}
      </Row>
      <Desc>
        <strong>{props.data.raisedCurrently}€ {t('raised out')} {props.data.goal}€</strong><br />
        {t('You already donated')}<strong>xxxx€</strong><br /><br />
        <p>{props.data.description}</p>
      </Desc>
    </Container>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;

  color: #000000;

  @media (prefers-color-scheme: dark) {
    color: #8a8A8A;
  }
`;

const Author = styled.div`

font-family: 'Open Sans';
font-style: italic;
font-weight: normal;
font-size: 10px;
margin-bottom: 10px;
`;

const Desc = styled.div`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  text-align: justify;
  box-sizing: border-box;
  padding: 20px;

  p {
    max-height: 100px;
    overflow: auto;
  }
`;

const PercentageNb = styled.div`
  width: 90%;
  text-align: right;

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  margin-top: 5px;

  color: #7CD6B7;
`;

const PercentageBar = styled.div`
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

const ImageHeader = styled.div`
  width: 300px;
  height: 250px;
  background: ${(props) => props.bg} center;
  background-size: cover;
  border-radius: 20px 20px 0px 0px;
`;

const Container = styled.div`
  width: 300px;
  height: 490px;

  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  margin-top: 20px;

  @media (prefers-color-scheme: dark) {
    background: #343434;
    color: #8a8a8a;
  }
`;

export default BigCard;
