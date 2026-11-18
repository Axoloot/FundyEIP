import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Transaction as TransactionType } from '../../Hooks/types';
import {
  ContainerText,
  PaymentContainer,
  RoundedText,
  RoundingContainer,
  TransactionContainer,
} from './styles';

interface TransactionProps {
  transaction: TransactionType,
}

const Transaction = ({ transaction }: TransactionProps): JSX.Element => {
  const { amount, roundAmount, initialAmount , type} = transaction;
  const { t } = useTranslation();

  return (
    <TransactionContainer>

      <PaymentContainer>
        <AntDesign name={!!initialAmount ? "right" : "left"} size={24} color="white" />
        <ContainerText>
          {amount / 100}
          €
        </ContainerText>
      </PaymentContainer>
      <RoundingContainer>
        {!!initialAmount ?
          <RoundedText>
            <ContainerText>{`0.${roundAmount ?? 0}€`}</ContainerText>
            {t('added_to_wallet')}
          </RoundedText> :
          <RoundedText>
            {type}
          </RoundedText>
        }
      </RoundingContainer>
    </TransactionContainer>
  );
};

export default Transaction;
