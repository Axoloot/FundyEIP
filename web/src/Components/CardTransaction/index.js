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

export const CardTransaction = ({data}) => {
  return(
    <Container status={data.processed}>
      <ColContainer>
        <div>
          <TextDonated>{getAmountFromDB(data.roundAmount)}</TextDonated>
          <TextOrigin>{t('transaction.on_transaction')} {getAmountFromDB(data.initialAmount)}</TextOrigin>
        </div>
        <div>
          <Text>{t('transaction.bank_account')}</Text>
          <Text>{data.bankAccountId}</Text>
        </div>
      </ColContainer>
    </Container>
  );
}
