import React, { useContext } from 'react';

import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  Container,

} from './styles';
import { AuthContext } from '../../Contexts/AuthContext';
import { blackText, darkBackground, whiteBackground } from '../../styles.global';
import UndetailledProjectList from '../../Component/UndetailledProjectList';
import { RootStackParamList, RoutesNames } from '../../Router/types';
import GoBack from '../../Component/GoBack';

const SearchResult = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  const passedValue = useRoute<RouteProp<RootStackParamList, RoutesNames.SEARCHRESULT>>()
    .params.query;
  const validator = useRoute<RouteProp<RootStackParamList, RoutesNames.SEARCHRESULT>>()
    .params.fctTab;

  const theme = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteBackground : blackText,
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={{ backgroundColor: theme.mainBackgroundColor }}>
        <Container>
          <GoBack />
          <UndetailledProjectList query={passedValue} page="search" fctvalidator={validator} />
        </Container>
      </View>
    </ThemeProvider>
  );
};

export default SearchResult;
