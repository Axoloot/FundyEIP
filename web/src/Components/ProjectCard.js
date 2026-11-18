import styled from 'styled-components';

import GreenTag from './utils/GreenTag';
import RedTag from './utils/RedTag';
import BlueTag from './utils/BlueTag';
import Tag from './Tag';

const CardContainer = styled.div`
  width: 100%;
  height: 80%;
  border-radius: 24px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
`;

const imageAddress = 'https://www.francetvinfo.fr/pictures/YVf0pdJE8bDS4GAiVzecX-Fdw-E/752x423/2015/06/19/058_1907450_1.jpg';

export default function ProjectCard() {
  return(
    <CardContainer>
      <img style={{borderRadius: 24}} src={imageAddress}></img>
      <div style={{ paddingLeft: 10}}>
        <p style={{fontWeight: 'bold'}}>
          Kangaroo National Park
        </p>
        <p style={{fontWeight: 'lighter', marginTop: -20}}>
          Wof Association
        </p>
        <Tag name="Association" />
        <Tag name="Nature" />

        <p style={{fontSize: 10, marginTop: -10}}>
          1 030E raised out of 1000E
        </p>
        <p style={{fontSize: 10, marginTop: -15}}>
          You already donated 5,60E
        </p>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <p style={{fontSize: 9, paddingRight: 5, paddingLeft: 15}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus est id ultrices vitae viverra. At massa rutrum turpis facilisi sit feugiat eu amet. Quis leo pharetra erat aenean egestas in scelerisque purus. Ligula consectetur arcu molestie dictumst felis id id.
          </p>
        </div>

      </div>
    </CardContainer>
  );
};
