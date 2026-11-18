import styled from 'styled-components';
import Tag from './Tag';
import MapComponent from './MapComponent';

const ProjectInfos = (props) => {
  return (
    <Container>
      <ProjectHeader bg="url('https://i.imgur.com/6C9TycY.jpg')" />
      <PercentageBar percent="58%"><div></div></PercentageBar>
      <PercentageNb>58% raised</PercentageNb>
      <Title>Project title</Title>
      <Author>Project Author</Author>
      <Row><Button>Make a Donation</Button>
      <Button>Add to Favorite ♡</Button></Row>
      <Desc>
        <strong>xxxx€ raised out of xxxx€</strong><br />
        You already donated <strong>xxxx€</strong><br /><br />
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus est id ultrices vitae viverra.
        At massa rutrum turpis facilisi sit feugiat eu amet. Quis leo pharetra erat aenean egestas in scelerisque purus.
        Ligula consectetur arcu molestie dictumst felis id id.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus est id ultrices vitae viverra.
        At massa rutrum turpis facilisi sit feugiat eu amet. Quis leo pharetra erat aenean egestas in scelerisque purus.
        Ligula consectetur arcu molestie dictumst felis id id.
        </p>
      </Desc>
      <Row2>
        <Tag name="Association" />
        <Tag name="Nature" />
      </Row2>
      <MapComponent></MapComponent>
    </Container>
  );
};


const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin-top: -10px;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  align-items: center;
`;

const Button = styled.button`
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
  margin-top: 20px;
  cursor: pointer;
  
  @media (prefers-color-scheme: dark) {
    background: #b65f35;
    color: #dadada;
  }
`;

const Title = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;

  color: #000000;
  
  @media (prefers-color-scheme: dark) {
    color: #dadada;
  }
`;

const Author = styled.div`

font-family: 'Open Sans';
font-style: italic;
font-weight: normal;
font-size: 10px;
`;

const Desc = styled.div`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  text-align: justify;
  box-sizing: border-box;
  padding: 20px;
`;

const ProjectHeader = styled.div`
  width: 100%;
  height: 250px;
  background: ${(props) => props.bg} center;
  background-size: cover;
  border-radius: 20px;
`;

const PercentageBar = styled.div`
  width: 100%;
  height: 10px;
  background: #D3F4E9;
  border-radius: 4px;
  margin-top: 20px;

  div {
    width: ${(props) => props.percent};
    height: 100%;
    border-radius: 4px;
    background: #7CD6B7;
  }
`;

const PercentageNb = styled.div`
  width: 100%;
  text-align: right;

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  margin-top: 5px;

  color: #7CD6B7;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ProjectInfos;
