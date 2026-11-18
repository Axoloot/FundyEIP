import React from 'react';

import {
  Text,
  Container,
  CardContainer,
  ImageContainer
} from './style';

export default function BankSmallCard({data, manageBank}) {
  console.log(data);
  return(
    <Container onClick={() => manageBank(data)}>
      <CardContainer style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {data.logo && <ImageContainer style={{backgroundImage: `url("${data.logo}")`}} />}
        <div style={{ width: '100%', marginLeft: 5 }}>
          <Text style={{ maxWidth: 20 }}>{data.name}</Text>
        </div>
      </CardContainer>
    </Container>
  )
}
