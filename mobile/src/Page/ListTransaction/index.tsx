import React, {
  useCallback, useEffect, useState, useContext,
} from 'react';
import {
  View, ScrollView, Text, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { AuthContext } from '../../Contexts/AuthContext';
import {
  CategoryTitle,
  Container,
  Icon,
  Title,
  TransactionsContainer,
} from './styles';
import useTransactions from '../../Hooks/useTransactions';
import Transaction from '../../Component/Transaction';
import { Transaction as TransactionType } from '../../Hooks/types';
import {
  blackText, darkBackground, whiteBackground, whiteText,
} from '../../styles.global';

const ListTransaction = (): JSX.Element => {
  const { goBack } = useNavigation();
  const { getTransactions } = useTransactions();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionType[]>();
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  const theme = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteText : blackText,
  };

  const renderTransactions = (): JSX.Element | JSX.Element[] => {
    if (loading || !transactions) return <Text>loading</Text>;

    if (transactions.length <= 0) {
      return (
        <View>
          <Text>No transactions yet.</Text>
        </View>
      );
    }
    return transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(
      (transaction, index) => <Transaction key={index.toString()} transaction={transaction} />,
    );
  };

  const fetchData = useCallback(async () => {
    const fetchedTransactions = await getTransactions();

    setTransactions([...fetchedTransactions, ...user.Donations]);
    setLoading(false);
  }, [getTransactions]);

  useEffect(() => {
    if (loading) fetchData();
  }, [fetchData, loading]);

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ backgroundColor: theme.mainBackgroundColor }}>
        <CategoryTitle>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={(): void => goBack()}
              style={{ marginLeft: 15 }}
            >
              <Icon name="leftcircleo" size={34} color="black" />
            </TouchableOpacity>
            <Title>{t('transactions')}</Title>
          </View>
          <TransactionsContainer>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {renderTransactions()}
            </ScrollView>
          </TransactionsContainer>
        </CategoryTitle>
      </Container>
    </ThemeProvider>
  );
};

export default ListTransaction;
