import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import CreditCard from '../CreditCard';
import { CardTitle } from './styles';
import { AuthContext } from '../../Contexts/AuthContext';

const ListCard = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const bankAccounts = user?.bankAccounts || [];

  return (
    <View>
      <CardTitle>{t('Cards')}</CardTitle>
      <ScrollView
        horizontal
        style={{ width: '100%', marginTop: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {bankAccounts?.map((bank) => <CreditCard key={bank.id} bank={bank} />)}
      </ScrollView>
    </View>
  );
};
export default ListCard;
