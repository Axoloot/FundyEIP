import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { AuthContext } from '../../Contexts/AuthContext';
import {
  blackText, darkBackground, whiteBackground, whiteText,
} from '../../styles.global';
import UndetailledProjectList from '../../Component/UndetailledProjectList';
import { Container, SearchText, StyledTextInput } from './styles';

const Favorite = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const theme = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteText : blackText,
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={{ backgroundColor: theme.mainBackgroundColor }}>
        <Container>
          <StyledTextInput
            placeholder="Search a project, an association ..."
            onChangeText={(q: string): void => setQuery(q)}
          />
          <SearchText>{t('Favorite')}</SearchText>
          <View style={{ height: '75%' }}>
            <UndetailledProjectList query={query} page="favorite" />
          </View>
        </Container>
      </View>
    </ThemeProvider>
  );
};

export default Favorite;
