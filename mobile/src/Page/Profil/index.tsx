import React, { useContext, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import ListCard from '../../Component/ListCard';
import RoundingSettings from '../../Component/Settings/RoundingSettings';
import MainButton from '../../Component/MainButton';
import { AuthContext } from '../../Contexts/AuthContext';
import { RoutesNames } from '../../Router/types';
import {
  CenteredChild,
  darkBackground,
  whiteBackground,
  whiteText,
  blackText,
  FullView,
  FullWebView,
} from '../../styles.global';
import { BackgroundView, ScrollContainer } from './styles';
import AppSettings from '../../Component/Settings/AppSettings';
import ProfilInfo from '../../Component/ProfilInfo';
import PiggyBank from '../../Component/PiggyBank';
import GoBack from '../../Component/GoBack';

const Profil = (): JSX.Element => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { signout, user } = useContext(AuthContext);
  const [forgot, setforgot] = useState(false);

  const theme = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteText : blackText,
  };

  if (forgot) {
    return (
      <SafeAreaView>
        <GoBack extraFunction={(): void => setforgot(false)} />
        <FullView>
          <FullWebView
            source={{ uri: 'https://fundy.cf/forgot' }}
          />
        </FullView>
      </SafeAreaView>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <BackgroundView>
        <ScrollContainer
          showsVerticalScrollIndicator={false}
        >
          <ProfilInfo />
          <PiggyBank />
          <ListCard />
          <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 15 }}>
            <MainButton
              text={t('add_account')}
              onPress={(): void => navigate(RoutesNames.ACCOUNT)}
            />
          </View>

          <RoundingSettings />
          <AppSettings fct={(): void => setforgot(true)} />
          <CenteredChild>
            <MainButton
              text="Disconnect"
              type="secondary"
              onPress={(): void => {
                signout().then(() => navigate(RoutesNames.LOGIN));
              }}
            />
          </CenteredChild>
        </ScrollContainer>
      </BackgroundView>
    </ThemeProvider>
  );
};

export default Profil;
