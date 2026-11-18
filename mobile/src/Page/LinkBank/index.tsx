import React, {
  useCallback, useState, useContext, useEffect,
} from 'react';
import { ScrollView, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FullView, FullWebView } from '../../styles.global';
import GoBack from '../../Component/GoBack';
import useNordigen from '../../Hooks/useNordigen';
import { Bank } from '../../Hooks/types';
import { RoutesNames } from '../../Router/types';
import {
  BankLogo,
  BankName,
  SearchBank,
  TouchableContainer,
} from './styles';
import { AuthContext } from '../../Contexts/AuthContext';

const Account = (): JSX.Element => {
  const { getUser } = useContext(AuthContext);
  const { navigate } = useNavigation();
  const [selectedBankUri, setSelectedBankUri] = useState<Bank>();
  const [query, setQuery] = useState('');
  const {
    banks,
    getBankLink,
    saveBankRef,
    getBanks,
    redirectUrl,
    loading,
  } = useNordigen();

  useEffect(() => {
    getBanks();
  }, [getBanks]);

  const Search = useCallback(
    ({ name }) => name.toLowerCase().includes(query.toLowerCase()),
    [query],
  );

  if (!selectedBankUri) {
    return (
      <SafeAreaView>
        <GoBack />
        <SearchBank
          placeholder="Enter a bank name"
          onChangeText={(q: string): void => setQuery(q)}
        />
        <ScrollView>
          {(loading || !banks) && (<Text>Loading banks ...</Text>)}
          {!loading && banks && banks.map((bank) => {
            if (Search(bank)) {
              return (
                <TouchableContainer
                  onPress={(): Promise<void> => getBankLink(bank.id, setSelectedBankUri)}
                  key={bank.id}
                >
                  <BankLogo source={{ uri: bank.logo || 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/edpcfce0c2hesqhznsg7' }} />
                  <BankName>{bank.name}</BankName>
                </TouchableContainer>
              );
            }
            return <></>;
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <FullView>
        <FullWebView
          source={{ uri: `${selectedBankUri}` }}
          onTouchCancel={(): void => navigate(RoutesNames.TAB)}
          onNavigationStateChange={(navState): void => {
            const response = navState.url;
            if (response.startsWith(redirectUrl)) {
              const ref = response.substring(redirectUrl.length + 5);
              saveBankRef(ref)
                .then(() => getUser().then(() => navigate(RoutesNames.TAB)))
                .catch(() => navigate(RoutesNames.TAB));
            }
          }}
        />
      </FullView>
    </SafeAreaView>
  );
};

export default Account;
