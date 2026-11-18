import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  TopContainer,
  IconContainer,
  Icon,
  Lines,
  ActionButtons,
  TitleTextLeft,
  NormalTextLeft,
  Container,
} from './styles';
import { RootStackParamList, RoutesNames } from '../../Router/types';
import MainButton from '../../Component/MainButton';
import OnboardingIndicator from '../../Component/OnboardingIndicator';

const TitleTab = [
  'Gather all your accounts',
  'Round up your payments',
  'Help the community',
];
const FirstTextTab = [
  'With Fundy, all your billing accounts are gathered in the same place.',
  'Each centim counts! Round up your payments to save money.',
  'Be a buddy ! With the money you saved, you can choose projects to help finance.',
];
const SecondTextTab = [
  'You can keep an eye on all your spendings, all within a single app',
  'No worries! You are in full control and can decide whenever you want how to limit your spendings',
  'Fundy is the crowdfunding application to help individuals and associations complete their projects',
];
const ImageTab = [
  { image: require('../../assets/card.png') },
  { image: require('../../assets/wallet.png') },
  { image: require('../../assets/share.png') },
];

const Onboarding = (): JSX.Element => {
  const route = useRoute<RouteProp<RootStackParamList, RoutesNames.ONBOARDING>>();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const itemId = route.params?.itemId ?? 0;
  const value = itemId + 1;
  let onboard: string;

  if (value === 3) {
    onboard = RoutesNames.TAB;
    AsyncStorage.setItem('OnboardingEnded', 'true');
  } else {
    onboard = RoutesNames.ONBOARDING;
  }

  return (
    <Container>
      <TopContainer>
        <Lines source={require('../../assets/Lines.png')} />
        <IconContainer>
          <Icon source={ImageTab[itemId].image} />
        </IconContainer>
      </TopContainer>
      <OnboardingIndicator pageNb={value} />
      <View style={{ paddingRight: 50, paddingLeft: 25 }}>
        <TitleTextLeft>{TitleTab[itemId]}</TitleTextLeft>
        <NormalTextLeft>{FirstTextTab[itemId]}</NormalTextLeft>
        <NormalTextLeft>{SecondTextTab[itemId]}</NormalTextLeft>
      </View>
      <ActionButtons>
        <MainButton
          text={t('next')}
          type="primary"
          onPress={(): void => navigation.navigate(onboard, { itemId: value })}
        />
        <MainButton
          bordered={false}
          text={t('skip')}
          type="secondary"
          onPress={(): void => {
            AsyncStorage.setItem('OnboardingEnded', 'true');
            navigation.navigate(RoutesNames.TAB);
          }}
        />
      </ActionButtons>
    </Container>
  );
};

export default Onboarding;
