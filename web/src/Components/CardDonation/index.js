import { t } from 'i18next';
import React from 'react';
import { getAmountFromDB } from '../../utils/bank';

import {
  Container,
  ColContainer,
  Text,
  TextDonated,
  TextOrigin,
} from './style';

export const CardDonation = ({data}) => {
  return(
    <Container status={data.processed}>
      <ColContainer>
        <div>
          <TextDonated>{getAmountFromDB(data.amount)}</TextDonated>
          <TextOrigin>{data.type === 'card' ? 'Payé en carte' : 'Payé grâce à la cagnotte'}</TextOrigin>
        </div>
      </ColContainer>
    </Container>
  );
}
