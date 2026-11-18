import React, { useContext } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import { Title } from './styles';
import { AuthContext } from '../../Contexts/AuthContext';
import {
  blackText, darkBackground, whiteBackground, whiteText,
} from '../../styles.global';

const Navigation = (props:{ extraFunction?: () => void }): JSX.Element => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const { user } = useContext(AuthContext);

  const theme = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteText : blackText,
  };
  const { extraFunction } = props;
  return (
    <ThemeProvider theme={theme}>
      <TouchableOpacity onPress={extraFunction ?? goBack}>
        <View style={{ flexDirection: 'row' }}>
          <AntDesign name="left" size={24} color={theme.mainTextColor ?? 'black'} />
          <Title>{t('back')}</Title>
        </View>
      </TouchableOpacity>
    </ThemeProvider>
  );
};

export default Navigation;
