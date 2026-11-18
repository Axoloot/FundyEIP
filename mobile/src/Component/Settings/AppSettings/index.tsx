import React, {
  useState, useContext, useCallback,
} from 'react';
import {
  View, Switch, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import SelectDropdown from 'react-native-select-dropdown';

import { AuthContext } from '../../../Contexts/AuthContext';
import { CenteredChild, TextFuturaBold } from '../../../styles.global';
import {
  EmailButton,
  SettingsBorderContainer,
  SettingsContainer,
  SettingsTitle,
  SubTitle,
} from './styles';
import getFlag from '../../../utils/getFlag';

const availableLanguages: Record<string, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
};

const LangWithFlag = (lang: string): string => `${getFlag(lang)} ${availableLanguages[lang]}`;

interface AppSetings {
  fct: () => void;
}
const AppSettings = ({ fct }: AppSetings): JSX.Element => {
  const { t } = useTranslation();
  const { user, setUser, editUser } = useContext(AuthContext);
  const [darkmode, toggleDarkmode] = useState(false);
  const [lang, setlang] = useState(user ? user.lang : 'fr');

  const Translate = useCallback(async (newLang: string) => {
    if (!user) return;
    setlang(newLang);
    i18next.changeLanguage(newLang);
    await editUser({ edited: true, lang: newLang });
  }, [user, editUser]);

  const Darkmode = useCallback(async () => {
    if (!user) return;
    setUser({ ...user, darkmode: !user.darkmode });
    await AsyncStorage.setItem('darkmode', `${user.darkmode}`);
    toggleDarkmode(!darkmode);
  }, [user, darkmode, setUser]);

  return (
    <View>
      <SettingsTitle>{t('app_settings')}</SettingsTitle>
      <SettingsBorderContainer>
        <SettingsContainer>
          <Switch
            trackColor={{ false: '#EB8682', true: '#6FCF97' }}
            ios_backgroundColor="#EB8682"
            onValueChange={Darkmode}
            value={darkmode}
            style={{ marginTop: 20 }}
          />
          <SubTitle>
            <TextFuturaBold>
              {t('darkmode_toggle')}
              {darkmode ? t('enabled') : t('disabled')}
            </TextFuturaBold>
          </SubTitle>
        </SettingsContainer>
        <TouchableOpacity onPress={fct}>
          <EmailButton color={user?.isVerified}>
            <TextFuturaBold>
              change your password here
            </TextFuturaBold>
          </EmailButton>
        </TouchableOpacity>
        <CenteredChild style={{ marginTop: 15 }}>
          <TextFuturaBold>{t('current_language')}</TextFuturaBold>
          <SelectDropdown
            data={Object.keys(availableLanguages)}
            defaultValue={lang}
            onSelect={(newLang): Promise<void> => Translate(newLang)}
            buttonTextAfterSelection={LangWithFlag}
            rowTextForSelection={LangWithFlag}
          />
        </CenteredChild>
      </SettingsBorderContainer>
    </View>
  );
};

export default AppSettings;
