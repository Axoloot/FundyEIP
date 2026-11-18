import React, { useContext, useState } from 'react';
import {
  View, Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../Contexts/AuthContext';
import {
  TextFuturaBold, TextOpen,
} from '../../../styles.global';
import {
  MaxRoundingText,
  RoundingTitle,
  SettingsBorderContainer,
  SettingsContainer,
  SettingsTitle,
  SubCategory,
} from './styles';

const RoundingSettings = (): JSX.Element => {
  const { user, editUser } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [rounding, setRounding] = useState(false);
  const { t } = useTranslation();
  const [slideValue, setSlide] = useState(user ? user?.roundedTo * 100 : 20);

  return (
    <View>
      <SettingsTitle>{t('title_settings')}</SettingsTitle>
      <SettingsBorderContainer>
        {/* <SettingsContainer>
          <Switch
            trackColor={{ false: '#EB8682', true: '#6FCF97' }}
            ios_backgroundColor="#EB8682"
            onValueChange={setIsEnabled}
            value={isEnabled}
            style={{ marginTop: 20 }}
          />
          <SubCategory>
            <TextFuturaBold>
              {t('rounding')}
              {isEnabled ? t('enabled') : t('disabled')}
            </TextFuturaBold>
            <TextOpen>
              {t('meaning_rounding')}
            </TextOpen>
          </SubCategory>

        </SettingsContainer> */}
        {/* <SettingsContainer>
          <Switch
            trackColor={{ false: '#EB8682', true: '#6FCF97' }}
            ios_backgroundColor="#EB8682"
            onValueChange={setRounding}
            value={rounding}
            style={{ marginTop: 20 }}
          />
          <SubCategory>
            <TextFuturaBold>
              {t('auto_donation')}
              {rounding ? t('enabled') : t('disabled')}
            </TextFuturaBold>
            <TextOpen>
              {t('meaning_auto_donation')}
            </TextOpen>
          </SubCategory>
        </SettingsContainer> */}
        <RoundingTitle>{t('max_rounding')}</RoundingTitle>
        <TextOpen style={{ marginLeft: 25 }}>
          {t('meaning_max')}
        </TextOpen>
        <View style={{ margin: 15, marginBottom: 5 }}>
          <Slider
            minimumValue={20}
            maximumValue={99}
            step={1}
            value={slideValue}
            onValueChange={(sliderValue): void => setSlide(sliderValue)}
            onSlidingComplete={(): void => {
              editUser({ edited: true, roundedTo: slideValue / 100 });
            }}
          />
        </View>
        <MaxRoundingText>
          {t('current_max')}
          {slideValue}
          {' cents'}
        </MaxRoundingText>
      </SettingsBorderContainer>
    </View>
  );
};

export default RoundingSettings;
