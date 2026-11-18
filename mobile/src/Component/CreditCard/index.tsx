import React, { useState, useContext } from 'react';
import { Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  CardContainer,
  Container,
  DeleteAccount,
  DeleteText,
  RoundingInfos,
  RoundingText,
} from './styles';
import { LinkedBank } from '../../Hooks/types';
import { TextOpen } from '../../styles.global';
import useNordigen from '../../Hooks/useNordigen';
import { AuthContext } from '../../Contexts/AuthContext';

interface CreditCardProps {
  bank: LinkedBank;
}

const CreditCard = (props: CreditCardProps): JSX.Element => {
  const { getUser } = useContext(AuthContext);
  const { bank } = props;
  const [isEnabled, setIsEnabled] = useState(bank.status === 'ACTIVE');
  const { t } = useTranslation();
  const { toggleRounding, deleteAccount } = useNordigen();

  return (
    <Container>
      <CardContainer>
        <TextOpen>{bank.institution}</TextOpen>
        <TextOpen>{bank.iban}</TextOpen>
        <RoundingInfos>
          <Switch
            trackColor={{ false: '#EB8682', true: '#6FCF97' }}
            ios_backgroundColor="#EB8682"
            onValueChange={(): Promise<void> => toggleRounding(
              `${bank.id}/${isEnabled ? 'disable' : 'active'}`,
              setIsEnabled,
            )}
            value={isEnabled}
          />
          <RoundingText>
            {t('rounding')}
            {isEnabled ? t('enabled') : t('disabled')}
          </RoundingText>
        </RoundingInfos>
        <DeleteAccount
          onPress={(): Promise<void> => deleteAccount(bank.id).finally(getUser)}
        >
          <DeleteText>
            Supprimer
          </DeleteText>
        </DeleteAccount>
      </CardContainer>
    </Container>
  );
};

export default CreditCard;
