import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';

import GoBack from '../../Component/GoBack';
import DetailedProjectCard from '../../Component/DetailedProjectCard';
import { RootStackParamList, RoutesNames } from '../../Router/types';
import { View } from 'react-native';
import { AuthContext } from '../../Contexts/AuthContext';
import { blackText, darkBackground, whiteBackground, whiteText } from '../../styles.global';

const DetailedProject = (): JSX.Element => {
  const route = useRoute<RouteProp<RootStackParamList, RoutesNames.PROJECT>>();
  const { user } = useContext(AuthContext);
  const themes = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteText : blackText,
  };

  return (
    <View style={{ backgroundColor: themes.mainBackgroundColor }}>
      <SafeAreaView>
        <GoBack />
        <DetailedProjectCard project={route.params.project} />
      </SafeAreaView>
    </View>
  );
};

export default DetailedProject;
